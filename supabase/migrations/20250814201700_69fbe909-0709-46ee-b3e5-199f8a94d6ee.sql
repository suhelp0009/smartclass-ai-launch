-- Fix critical security issue: Add comprehensive RLS policies for students table
-- Currently missing INSERT and DELETE policies, allowing any authenticated user 
-- to potentially add fake records or delete legitimate student data

-- Add restrictive INSERT policy - only allow system/admin level inserts
-- For now, deny all user inserts to prevent malicious additions
CREATE POLICY "Deny user inserts on students table" 
ON public.students 
FOR INSERT 
WITH CHECK (false);

-- Add restrictive DELETE policy - deny all user deletions
-- Student records should only be managed by system administrators
CREATE POLICY "Deny user deletions on students table" 
ON public.students 
FOR DELETE 
USING (false);

-- Note: If admin functionality is needed later, these policies can be updated
-- to check for admin roles using a security definer function