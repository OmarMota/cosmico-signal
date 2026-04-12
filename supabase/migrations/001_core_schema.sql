-- =============================================
-- COSMICO SIGNAL — Core Schema
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PROFILES
-- =============================================
CREATE TABLE public.profiles (
  id                        UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name              TEXT NOT NULL,
  headline                  TEXT,
  avatar_url                TEXT,
  role_category             TEXT NOT NULL DEFAULT 'engineer',
  -- 'engineer' | 'designer' | 'pm' | 'data' | 'marketing' | 'ops' | 'other'
  primary_role              TEXT NOT NULL DEFAULT 'Freelancer',
  seniority_level           TEXT NOT NULL DEFAULT 'mid',
  -- 'junior' | 'mid' | 'senior' | 'staff' | 'principal'
  hourly_rate_min           INT,
  hourly_rate_max           INT,
  currency                  TEXT DEFAULT 'USD',
  availability              TEXT NOT NULL DEFAULT 'open',
  -- 'available' | 'open' | 'unavailable'
  availability_hours_per_week INT,
  timezone                  TEXT,
  location                  TEXT,
  bio                       TEXT,
  is_public                 BOOLEAN DEFAULT TRUE,
  onboarding_complete       BOOLEAN DEFAULT FALSE,
  onboarding_step           INT DEFAULT 0,
  created_at                TIMESTAMPTZ DEFAULT NOW(),
  updated_at                TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- SKILLS
-- =============================================
CREATE TABLE public.skills (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  category        TEXT NOT NULL DEFAULT 'technical',
  -- 'technical' | 'soft' | 'domain' | 'tool'
  proficiency     INT DEFAULT 3 CHECK (proficiency BETWEEN 1 AND 5),
  is_primary      BOOLEAN DEFAULT FALSE,
  signal_weight   DECIMAL DEFAULT 1.0,
  added_at        TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, name)
);

CREATE INDEX idx_skills_user ON public.skills(user_id);

-- =============================================
-- MENTORS (extends profiles)
-- =============================================
CREATE TABLE public.mentors (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  specializations TEXT[] DEFAULT '{}',
  rate_per_hour   DECIMAL,
  availability    TEXT DEFAULT 'available',
  bio             TEXT,
  signal_score    DECIMAL DEFAULT 50.0,
  session_count   INT DEFAULT 0,
  avg_rating      DECIMAL DEFAULT 0.0,
  is_verified     BOOLEAN DEFAULT FALSE
);

-- =============================================
-- FEEDBACK SUBMISSIONS
-- =============================================
CREATE TABLE public.feedback_submissions (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  submitter_id          UUID REFERENCES auth.users(id),
  submitter_type        TEXT NOT NULL DEFAULT 'peer',
  -- 'peer' | 'client' | 'mentor' | 'anonymous'
  reliability_score     INT CHECK (reliability_score BETWEEN 1 AND 5),
  quality_score         INT CHECK (quality_score BETWEEN 1 AND 5),
  communication_score   INT CHECK (communication_score BETWEEN 1 AND 5),
  text_feedback         TEXT,
  is_verified           BOOLEAN DEFAULT FALSE,
  submitted_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_feedback_subject ON public.feedback_submissions(subject_user_id, submitted_at DESC);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback_submissions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by all" ON public.profiles
  FOR SELECT USING (is_public = TRUE OR auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Skills policies
CREATE POLICY "Skills viewable if profile is public" ON public.skills
  FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = user_id AND is_public = TRUE)
  );

CREATE POLICY "Users manage own skills" ON public.skills
  FOR ALL USING (auth.uid() = user_id);

-- Mentors policies
CREATE POLICY "Mentors are publicly viewable" ON public.mentors
  FOR SELECT USING (TRUE);

CREATE POLICY "Mentors manage own record" ON public.mentors
  FOR ALL USING (auth.uid() = id);

-- Feedback policies
CREATE POLICY "Subjects can view their feedback" ON public.feedback_submissions
  FOR SELECT USING (auth.uid() = subject_user_id OR auth.uid() = submitter_id);

CREATE POLICY "Authenticated users can submit feedback" ON public.feedback_submissions
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- =============================================
-- TRIGGERS: updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- FUNCTION: Create profile on user signup
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, primary_role, role_category, seniority_level, availability)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    'Freelancer',
    'other',
    'mid',
    'open'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
