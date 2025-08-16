-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  age TEXT,
  native_language TEXT,
  selected_language TEXT NOT NULL DEFAULT 'swahili',
  total_xp INTEGER NOT NULL DEFAULT 0,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create languages table
CREATE TABLE public.languages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  native_name TEXT NOT NULL,
  flag_emoji TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lessons table
CREATE TABLE public.lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  language_code TEXT NOT NULL REFERENCES public.languages(code),
  title TEXT NOT NULL,
  description TEXT,
  level INTEGER NOT NULL DEFAULT 1,
  order_index INTEGER NOT NULL,
  xp_reward INTEGER NOT NULL DEFAULT 10,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create questions table
CREATE TABLE public.questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  audio_url TEXT,
  image_url TEXT,
  options TEXT[] NOT NULL,
  correct_answer INTEGER NOT NULL,
  explanation TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user progress table
CREATE TABLE public.user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  language_code TEXT NOT NULL REFERENCES public.languages(code),
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  score INTEGER,
  attempts INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  requirement_type TEXT NOT NULL, -- 'xp', 'streak', 'lessons_completed', etc.
  requirement_value INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user achievements table
CREATE TABLE public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for languages (public read)
CREATE POLICY "Languages are publicly readable" 
ON public.languages 
FOR SELECT 
USING (true);

-- Create RLS policies for lessons (public read)
CREATE POLICY "Lessons are publicly readable" 
ON public.lessons 
FOR SELECT 
USING (is_active = true);

-- Create RLS policies for questions (public read)
CREATE POLICY "Questions are publicly readable" 
ON public.questions 
FOR SELECT 
USING (true);

-- Create RLS policies for user progress
CREATE POLICY "Users can view their own progress" 
ON public.user_progress 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own progress" 
ON public.user_progress 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
ON public.user_progress 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for achievements (public read)
CREATE POLICY "Achievements are publicly readable" 
ON public.achievements 
FOR SELECT 
USING (is_active = true);

-- Create RLS policies for user achievements
CREATE POLICY "Users can view their own achievements" 
ON public.user_achievements 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own achievements" 
ON public.user_achievements 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at
    BEFORE UPDATE ON public.lessons
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at
    BEFORE UPDATE ON public.user_progress
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'name', 'New User'),
    NEW.email
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert initial languages
INSERT INTO public.languages (code, name, native_name, flag_emoji) VALUES
('swahili', 'Swahili', 'Kiswahili', '🇰🇪'),
('kikuyu', 'Kikuyu', 'Gĩkũyũ', '🇰🇪'),
('luo', 'Luo', 'Dholuo', '🇰🇪');

-- Insert sample achievements
INSERT INTO public.achievements (name, description, icon, requirement_type, requirement_value) VALUES
('First Steps', 'Complete your first lesson', '🎯', 'lessons_completed', 1),
('Dedicated Learner', 'Maintain a 7-day streak', '🔥', 'streak', 7),
('XP Master', 'Earn 500 XP', '⭐', 'xp', 500),
('Lesson Champion', 'Complete 10 lessons', '🏆', 'lessons_completed', 10),
('Streak Legend', 'Maintain a 30-day streak', '🌟', 'streak', 30);

-- Insert sample lessons for each language
INSERT INTO public.lessons (language_code, title, description, level, order_index, xp_reward) VALUES
-- Swahili lessons
('swahili', 'Basic Greetings', 'Learn essential Swahili greetings', 1, 1, 10),
('swahili', 'Family Words', 'Learn words for family members', 1, 2, 15),
('swahili', 'Numbers 1-10', 'Count from 1 to 10 in Swahili', 1, 3, 10),
('swahili', 'Colors', 'Learn basic color names', 1, 4, 10),
('swahili', 'Days of the Week', 'Learn the days of the week', 2, 5, 15),

-- Kikuyu lessons
('kikuyu', 'Basic Greetings', 'Learn essential Kikuyu greetings', 1, 1, 10),
('kikuyu', 'Family Words', 'Learn words for family members', 1, 2, 15),
('kikuyu', 'Numbers 1-10', 'Count from 1 to 10 in Kikuyu', 1, 3, 10),
('kikuyu', 'Colors', 'Learn basic color names', 1, 4, 10),
('kikuyu', 'Days of the Week', 'Learn the days of the week', 2, 5, 15),

-- Luo lessons
('luo', 'Basic Greetings', 'Learn essential Luo greetings', 1, 1, 10),
('luo', 'Family Words', 'Learn words for family members', 1, 2, 15),
('luo', 'Numbers 1-10', 'Count from 1 to 10 in Luo', 1, 3, 10),
('luo', 'Colors', 'Learn basic color names', 1, 4, 10),
('luo', 'Days of the Week', 'Learn the days of the week', 2, 5, 15);