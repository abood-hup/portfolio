-- Create enum for admin roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for secure role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles (only admins can view)
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create hero_content table
CREATE TABLE public.hero_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    profile_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view hero content"
ON public.hero_content FOR SELECT USING (true);

CREATE POLICY "Admins can manage hero content"
ON public.hero_content FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create about_content table
CREATE TABLE public.about_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    skills TEXT[],
    experience_years INTEGER,
    projects_count INTEGER,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view about content"
ON public.about_content FOR SELECT USING (true);

CREATE POLICY "Admins can manage about content"
ON public.about_content FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create services table
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view services"
ON public.services FOR SELECT USING (true);

CREATE POLICY "Admins can manage services"
ON public.services FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create projects table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    image_url TEXT,
    demo_images TEXT[],
    technologies TEXT[],
    project_url TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view projects"
ON public.projects FOR SELECT USING (true);

CREATE POLICY "Admins can manage projects"
ON public.projects FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create contact_info table
CREATE TABLE public.contact_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT,
    phone TEXT,
    address TEXT,
    whatsapp TEXT,
    twitter TEXT,
    linkedin TEXT,
    github TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view contact info"
ON public.contact_info FOR SELECT USING (true);

CREATE POLICY "Admins can manage contact info"
ON public.contact_info FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create site_settings table for general settings
CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_name TEXT,
    logo_url TEXT,
    favicon_url TEXT,
    primary_color TEXT,
    secondary_color TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site settings"
ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Admins can manage site settings"
ON public.site_settings FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for all tables
CREATE TRIGGER update_hero_content_updated_at
BEFORE UPDATE ON public.hero_content
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_about_content_updated_at
BEFORE UPDATE ON public.about_content
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_info_updated_at
BEFORE UPDATE ON public.contact_info
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();