-- Fix critical security issue: Restrict students table access to own data only
-- Currently the policy allows all authenticated users to view all student data (USING true)
-- This needs to be restricted so students can only see their own data

-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Students can view their own data" ON public.students;

-- Create a properly restricted policy that only allows students to view their own data
CREATE POLICY "Students can view their own data" 
ON public.students 
FOR SELECT 
USING (auth.uid() IN ( 
  SELECT profiles.user_id
  FROM profiles
  WHERE profiles.student_id = students.id
));