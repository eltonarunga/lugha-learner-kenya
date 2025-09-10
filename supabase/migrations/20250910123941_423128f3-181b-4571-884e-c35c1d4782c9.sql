-- Fix security vulnerability: Secure leaderboard function to prevent email/name exposure

-- Replace the existing leaderboard function with a privacy-focused version
CREATE OR REPLACE FUNCTION public.get_public_leaderboard(p_limit integer DEFAULT 10)
RETURNS TABLE(rank bigint, name text, total_xp integer, current_streak integer)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $$
  SELECT 
    ROW_NUMBER() OVER (ORDER BY p.total_xp DESC, p.created_at ASC) as rank,
    -- Privacy protection: Only show anonymized display names
    CASE 
      WHEN LENGTH(p.name) > 0 THEN 
        SPLIT_PART(p.name, ' ', 1) || 
        CASE 
          WHEN SPLIT_PART(p.name, ' ', 2) != '' THEN ' ' || LEFT(SPLIT_PART(p.name, ' ', 2), 1) || '.'
          ELSE ''
        END
      ELSE 'Anonymous User'
    END as name,
    p.total_xp,
    p.current_streak
  FROM profiles p
  WHERE p.total_xp > 0  -- Only show users with progress
  ORDER BY p.total_xp DESC, p.created_at ASC
  LIMIT p_limit;
$$;

-- Add additional security: Create explicit policy to block direct profile access
DROP POLICY IF EXISTS "Prevent unauthorized profile access" ON public.profiles;
CREATE POLICY "Block public access to profiles" 
ON public.profiles 
FOR ALL
TO anon
USING (false);

-- Ensure authenticated users can only access their own profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Secure update policy
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Secure insert policy  
DROP POLICY IF EXISTS "Users can create their own profile" ON public.profiles;
CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);