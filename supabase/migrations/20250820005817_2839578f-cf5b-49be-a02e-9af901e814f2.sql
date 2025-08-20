-- Fix RLS policies to prevent ownership reassignment
-- Drop existing UPDATE policies
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own progress" ON public.user_progress;

-- Recreate UPDATE policies with WITH CHECK conditions
CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
ON public.user_progress 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Remove public access to quiz answers
DROP POLICY IF EXISTS "Questions are publicly readable" ON public.questions;

-- Create secure RPC function to get questions without answers
CREATE OR REPLACE FUNCTION public.get_public_questions(lesson_id uuid)
RETURNS TABLE (
  id uuid,
  lesson_id uuid,
  question_text text,
  image_url text,
  audio_url text,
  options text[],
  order_index integer
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT 
    q.id,
    q.lesson_id,
    q.question_text,
    q.image_url,
    q.audio_url,
    q.options,
    q.order_index
  FROM public.questions q
  WHERE q.lesson_id = get_public_questions.lesson_id
  ORDER BY q.order_index;
$$;

-- Grant execute permission to authenticated and anonymous users
GRANT EXECUTE ON FUNCTION public.get_public_questions(uuid) TO anon, authenticated;

-- Fix database function search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, pg_temp
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;