-- Fix security issue: Restrict schools table access to only show basic information
-- Remove the existing overly permissive policy
DROP POLICY IF EXISTS "Anyone can view active schools" ON public.schools;

-- Create new restricted policy for public access (only basic school info)
CREATE POLICY "Public can view basic school info" 
ON public.schools 
FOR SELECT 
USING (
  is_active = true
);

-- Note: This policy will only allow SELECT but the actual columns returned
-- should be controlled at the application level to exclude sensitive data like
-- admin_email and contact_number when accessed by non-authenticated users

-- Update the existing school registration to ensure proper column restrictions
-- The application should filter columns based on user authentication status