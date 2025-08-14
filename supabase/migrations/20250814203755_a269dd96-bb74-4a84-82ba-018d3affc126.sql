-- Create schools table for storing registered schools
CREATE TABLE public.schools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subdomain TEXT NOT NULL UNIQUE,
  admin_email TEXT NOT NULL,
  contact_number TEXT,
  address TEXT,
  logo_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

-- Create policies for schools table
CREATE POLICY "Anyone can view active schools" 
ON public.schools 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can insert schools" 
ON public.schools 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Only school admins can update their school" 
ON public.schools 
FOR UPDATE 
USING (admin_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_schools_updated_at
BEFORE UPDATE ON public.schools
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update profiles table to include school reference
ALTER TABLE public.profiles 
ADD COLUMN school_id UUID REFERENCES public.schools(id);