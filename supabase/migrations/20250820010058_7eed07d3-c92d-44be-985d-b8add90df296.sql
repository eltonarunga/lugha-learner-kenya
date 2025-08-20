-- Add RLS policy for questions table to resolve linter warning
-- Since we removed public access, we need to ensure the table has proper policies
-- The questions table should only be accessible through the secure RPC function

CREATE POLICY "Questions access only through RPC" 
ON public.questions 
FOR SELECT 
USING (false);  -- No direct access allowed, only through get_public_questions RPC