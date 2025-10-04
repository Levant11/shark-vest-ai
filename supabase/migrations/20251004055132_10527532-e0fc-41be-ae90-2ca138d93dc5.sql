-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('founder', 'investor', 'admin');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT,
  city TEXT,
  profile_picture_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user_roles table (CRITICAL: separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Trust scores table
CREATE TABLE public.trust_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  score INTEGER NOT NULL DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  badge TEXT DEFAULT 'Starter',
  profile_completeness INTEGER DEFAULT 0,
  verification_level INTEGER DEFAULT 0,
  platform_activity INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.trust_scores ENABLE ROW LEVEL SECURITY;

-- Verification tasks
CREATE TABLE public.verification_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_name TEXT NOT NULL UNIQUE,
  task_description TEXT,
  points INTEGER NOT NULL DEFAULT 5,
  task_order INTEGER NOT NULL
);

ALTER TABLE public.verification_tasks ENABLE ROW LEVEL SECURITY;

-- User verifications
CREATE TABLE public.user_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  task_id UUID REFERENCES public.verification_tasks(id) ON DELETE CASCADE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, task_id)
);

ALTER TABLE public.user_verifications ENABLE ROW LEVEL SECURITY;

-- Projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  founder_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  project_name TEXT NOT NULL,
  project_concept TEXT,
  industry TEXT,
  stage TEXT,
  funding_goal DECIMAL,
  pitch_deck_url TEXT,
  financials_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- AI project scores
CREATE TABLE public.project_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL UNIQUE,
  overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
  team_score INTEGER,
  market_score INTEGER,
  product_score INTEGER,
  traction_score INTEGER,
  swor_analysis JSONB,
  risk_assessment JSONB,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.project_scores ENABLE ROW LEVEL SECURITY;

-- Investor preferences
CREATE TABLE public.investor_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  industries TEXT[],
  stages TEXT[],
  min_ticket_size DECIMAL,
  max_ticket_size DECIMAL,
  preferred_countries TEXT[],
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.investor_preferences ENABLE ROW LEVEL SECURITY;

-- Matches table
CREATE TABLE public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  founder_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  investor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  match_score INTEGER,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(founder_id, investor_id, project_id)
);

ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

-- Messages table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  match_id UUID REFERENCES public.matches(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- Notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Data room documents
CREATE TABLE public.data_room_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  document_name TEXT NOT NULL,
  document_url TEXT NOT NULL,
  document_type TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.data_room_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: users can view and update their own profile
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- User roles: users can view their own roles, admins can manage all
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Trust scores: users can view their own, admins can view all
CREATE POLICY "Users can view their own trust score"
  ON public.trust_scores FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all trust scores"
  ON public.trust_scores FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Verification tasks: all authenticated users can view
CREATE POLICY "Authenticated users can view verification tasks"
  ON public.verification_tasks FOR SELECT
  TO authenticated
  USING (true);

-- User verifications: users can view and manage their own
CREATE POLICY "Users can view their own verifications"
  ON public.user_verifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own verifications"
  ON public.user_verifications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own verifications"
  ON public.user_verifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Projects: founders can manage their own, investors can view matched projects
CREATE POLICY "Founders can manage their own projects"
  ON public.projects FOR ALL
  USING (auth.uid() = founder_id);

CREATE POLICY "Investors can view matched projects"
  ON public.projects FOR SELECT
  USING (
    public.has_role(auth.uid(), 'investor') AND
    EXISTS (
      SELECT 1 FROM public.matches
      WHERE matches.project_id = projects.id
      AND matches.investor_id = auth.uid()
      AND matches.status = 'accepted'
    )
  );

-- Project scores: owners and matched investors can view
CREATE POLICY "Project owners can view their scores"
  ON public.project_scores FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_scores.project_id
      AND projects.founder_id = auth.uid()
    )
  );

CREATE POLICY "Matched investors can view project scores"
  ON public.project_scores FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.matches
      JOIN public.projects ON projects.id = matches.project_id
      WHERE projects.id = project_scores.project_id
      AND matches.investor_id = auth.uid()
      AND matches.status = 'accepted'
    )
  );

-- Investor preferences: investors can manage their own
CREATE POLICY "Investors can manage their preferences"
  ON public.investor_preferences FOR ALL
  USING (auth.uid() = investor_id);

-- Matches: participants can view and manage their matches
CREATE POLICY "Founders can view their matches"
  ON public.matches FOR SELECT
  USING (auth.uid() = founder_id);

CREATE POLICY "Investors can view their matches"
  ON public.matches FOR SELECT
  USING (auth.uid() = investor_id);

CREATE POLICY "Founders can create matches"
  ON public.matches FOR INSERT
  WITH CHECK (auth.uid() = founder_id);

CREATE POLICY "Participants can update match status"
  ON public.matches FOR UPDATE
  USING (auth.uid() = founder_id OR auth.uid() = investor_id);

-- Messages: participants can view and send their messages
CREATE POLICY "Users can view their messages"
  ON public.messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages"
  ON public.messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their received messages"
  ON public.messages FOR UPDATE
  USING (auth.uid() = receiver_id);

-- Notifications: users can view and manage their own
CREATE POLICY "Users can view their notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Data room documents: project owners can manage, matched investors can view
CREATE POLICY "Project owners can manage documents"
  ON public.data_room_documents FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = data_room_documents.project_id
      AND projects.founder_id = auth.uid()
    )
  );

CREATE POLICY "Matched investors can view documents"
  ON public.data_room_documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.matches
      WHERE matches.project_id = data_room_documents.project_id
      AND matches.investor_id = auth.uid()
      AND matches.status = 'accepted'
    )
  );

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email
  );
  
  -- Initialize trust score
  INSERT INTO public.trust_scores (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update profile updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Insert default verification tasks
INSERT INTO public.verification_tasks (task_name, task_description, points, task_order) VALUES
  ('email_verification', 'Verify your email address', 10, 1),
  ('phone_verification', 'Verify your phone number', 15, 2),
  ('profile_completion', 'Complete your profile information', 10, 3),
  ('id_upload', 'Upload government-issued ID', 25, 4),
  ('social_connection', 'Connect your LinkedIn profile', 10, 5),
  ('company_verification', 'Verify company registration', 20, 6);