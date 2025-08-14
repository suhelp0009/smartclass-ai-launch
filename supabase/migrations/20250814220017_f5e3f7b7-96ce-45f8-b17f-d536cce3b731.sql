-- Create a security definer function to get user's role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Public can view basic school info" ON public.schools;

-- Create a new policy that only allows basic school info for public access
CREATE POLICY "Public can view basic school info" 
ON public.schools 
FOR SELECT 
USING (
  is_active = true AND (
    -- For unauthenticated users or regular users, only allow basic columns
    -- This will be enforced at the application level by selecting only specific columns
    auth.uid() IS NULL OR 
    public.get_current_user_role() NOT IN ('admin', 'school_admin')
  )
);

-- Create a policy for school admins to see their own school's full details
CREATE POLICY "School admins can view their own school details" 
ON public.schools 
FOR SELECT 
USING (
  is_active = true AND 
  admin_email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

-- Create a policy for system admins to see all school details
CREATE POLICY "System admins can view all school details" 
ON public.schools 
FOR SELECT 
USING (
  public.get_current_user_role() = 'admin'
);