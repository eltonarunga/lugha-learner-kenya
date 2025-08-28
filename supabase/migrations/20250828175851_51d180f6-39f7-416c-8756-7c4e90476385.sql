-- Create server-side answer validation RPC
CREATE OR REPLACE FUNCTION public.check_answer(
  p_question_id UUID,
  p_selected_answer INTEGER
)
RETURNS TABLE(
  is_correct BOOLEAN,
  correct_answer INTEGER,
  explanation TEXT,
  xp_earned INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_correct_answer INTEGER;
  v_explanation TEXT;
  v_lesson_id UUID;
  v_xp_reward INTEGER;
BEGIN
  -- Get question details
  SELECT q.correct_answer, q.explanation, q.lesson_id, l.xp_reward
  INTO v_correct_answer, v_explanation, v_lesson_id, v_xp_reward
  FROM questions q
  JOIN lessons l ON q.lesson_id = l.id
  WHERE q.id = p_question_id;
  
  -- Check if question exists
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Question not found';
  END IF;
  
  -- Return result
  RETURN QUERY SELECT 
    (p_selected_answer = v_correct_answer) as is_correct,
    v_correct_answer as correct_answer,
    v_explanation as explanation,
    CASE WHEN p_selected_answer = v_correct_answer THEN 5 ELSE 0 END as xp_earned;
END;
$$;

-- Create lesson completion RPC with server-side XP calculation
CREATE OR REPLACE FUNCTION public.complete_lesson(
  p_lesson_id UUID,
  p_score INTEGER,
  p_language_code TEXT
)
RETURNS TABLE(
  total_xp_earned INTEGER,
  lesson_xp INTEGER,
  success BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_user_id UUID;
  v_lesson_xp INTEGER;
  v_total_xp INTEGER;
  v_existing_progress RECORD;
BEGIN
  -- Get authenticated user
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User not authenticated';
  END IF;
  
  -- Get lesson XP reward
  SELECT xp_reward INTO v_lesson_xp
  FROM lessons 
  WHERE id = p_lesson_id AND is_active = true;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Lesson not found or inactive';
  END IF;
  
  -- Check if already completed
  SELECT * INTO v_existing_progress
  FROM user_progress
  WHERE user_id = v_user_id 
    AND lesson_id = p_lesson_id 
    AND is_completed = true;
  
  -- If already completed, don't award XP again
  IF FOUND THEN
    v_lesson_xp := 0;
  END IF;
  
  -- Update or create progress record
  INSERT INTO user_progress (
    user_id, 
    lesson_id, 
    language_code, 
    score, 
    is_completed, 
    completed_at,
    attempts
  )
  VALUES (
    v_user_id,
    p_lesson_id,
    p_language_code,
    p_score,
    true,
    NOW(),
    1
  )
  ON CONFLICT (user_id, lesson_id)
  DO UPDATE SET
    score = GREATEST(user_progress.score, EXCLUDED.score),
    is_completed = true,
    completed_at = CASE 
      WHEN user_progress.is_completed THEN user_progress.completed_at 
      ELSE NOW() 
    END,
    attempts = user_progress.attempts + 1;
  
  -- Update user XP only if lesson wasn't previously completed
  IF v_lesson_xp > 0 THEN
    UPDATE profiles 
    SET total_xp = total_xp + v_lesson_xp,
        last_activity_date = CURRENT_DATE
    WHERE user_id = v_user_id;
  END IF;
  
  -- Get updated total XP
  SELECT total_xp INTO v_total_xp
  FROM profiles 
  WHERE user_id = v_user_id;
  
  RETURN QUERY SELECT 
    v_total_xp as total_xp_earned,
    v_lesson_xp as lesson_xp,
    true as success;
END;
$$;

-- Create secure leaderboard RPC that respects privacy
CREATE OR REPLACE FUNCTION public.get_public_leaderboard(
  p_limit INTEGER DEFAULT 10
)
RETURNS TABLE(
  rank BIGINT,
  name TEXT,
  total_xp INTEGER,
  current_streak INTEGER
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT 
    ROW_NUMBER() OVER (ORDER BY p.total_xp DESC, p.created_at ASC) as rank,
    p.name,
    p.total_xp,
    p.current_streak
  FROM profiles p
  WHERE p.total_xp > 0  -- Only show users with progress
  ORDER BY p.total_xp DESC, p.created_at ASC
  LIMIT p_limit;
$$;

-- Enable the trigger for new user creation (if not already enabled)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();