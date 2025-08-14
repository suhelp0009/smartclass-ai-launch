-- Insert sample schools for testing
INSERT INTO public.schools (name, subdomain, admin_email, contact_number, address) VALUES
  ('Lincoln High School', 'lincolnhigh', 'admin@lincolnhigh.edu', '+1 (555) 123-4567', '123 Education Blvd, Lincoln, NE 68508'),
  ('Washington Elementary', 'washingtonelemens', 'principal@washington.edu', '+1 (555) 234-5678', '456 Learning Lane, Washington, DC 20001'),
  ('Jefferson Middle School', 'jeffersonmiddle', 'admin@jefferson.edu', '+1 (555) 345-6789', '789 School Street, Jefferson City, MO 65101'),
  ('Roosevelt Academy', 'rooseveltacademy', 'director@roosevelt.edu', '+1 (555) 456-7890', '321 Academy Drive, Roosevelt, NY 11575'),
  ('Kennedy International School', 'kennedyinternational', 'admin@kennedy.edu', '+1 (555) 567-8901', '654 Global Way, Kennedy, TX 78681'),
  ('Class3:5 Demo School', 'class35demo', 'demo@class35.edu', '+1 (555) 678-9012', '987 Innovation Park, Demo City, CA 94000');

-- Create index for better search performance
CREATE INDEX IF NOT EXISTS idx_schools_name_search ON public.schools USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_schools_subdomain ON public.schools (subdomain);
CREATE INDEX IF NOT EXISTS idx_schools_active ON public.schools (is_active) WHERE is_active = true;