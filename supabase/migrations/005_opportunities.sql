-- =============================================
-- COSMICO SIGNAL — Opportunities Layer
-- =============================================

-- =============================================
-- OPPORTUNITIES
-- =============================================
CREATE TABLE public.opportunities (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title             TEXT NOT NULL,
  company_name      TEXT,
  description       TEXT,
  opportunity_type  TEXT NOT NULL DEFAULT 'contract',
  -- 'full_time' | 'contract' | 'freelance' | 'advisory'
  required_skills   TEXT[] DEFAULT '{}',
  preferred_skills  TEXT[] DEFAULT '{}',
  role_category     TEXT NOT NULL DEFAULT 'engineer',
  seniority_level   TEXT DEFAULT 'mid',
  rate_min          INT,
  rate_max          INT,
  currency          TEXT DEFAULT 'USD',
  remote_policy     TEXT DEFAULT 'remote',
  -- 'remote' | 'hybrid' | 'onsite'
  is_active         BOOLEAN DEFAULT TRUE,
  posted_at         TIMESTAMPTZ DEFAULT NOW(),
  expires_at        TIMESTAMPTZ
);

CREATE INDEX idx_opportunities_skills ON public.opportunities USING GIN(required_skills);
CREATE INDEX idx_opportunities_active ON public.opportunities(is_active, posted_at DESC);

-- =============================================
-- OPPORTUNITY FITS (precomputed per-user scores)
-- =============================================
CREATE TABLE public.opportunity_fits (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  opportunity_id    UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
  fit_score         DECIMAL NOT NULL DEFAULT 0,
  skill_match       DECIMAL DEFAULT 0,
  signal_match      DECIMAL DEFAULT 0,
  trajectory_match  DECIMAL DEFAULT 0,
  rate_match        DECIMAL DEFAULT 0,
  breakdown         JSONB DEFAULT '{}',
  computed_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, opportunity_id)
);

CREATE INDEX idx_fits_user ON public.opportunity_fits(user_id, fit_score DESC);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_fits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Opportunities are publicly viewable" ON public.opportunities
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Users view own fits" ON public.opportunity_fits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users manage own fits" ON public.opportunity_fits
  FOR ALL USING (auth.uid() = user_id);

-- =============================================
-- SEED: Sample opportunities
-- =============================================
INSERT INTO public.opportunities (title, company_name, description, opportunity_type, required_skills, preferred_skills, role_category, seniority_level, rate_min, rate_max, remote_policy) VALUES
('Senior Frontend Engineer', 'Acme SaaS', 'Build and own the frontend of our B2B dashboard. You will work closely with design and product to ship fast.', 'contract', '{"react","typescript","css"}', '{"next.js","tailwind","figma"}', 'engineer', 'senior', 120, 160, 'remote'),
('Product Designer — Design Systems', 'Flux Design', 'Own our design system used by 3 product teams. You will define tokens, components, and patterns.', 'contract', '{"figma","design systems","ui"}', '{"react","storybook","accessibility"}', 'designer', 'senior', 100, 140, 'remote'),
('Full-Stack Engineer — Early Stage Startup', 'Stealth AI', 'Build 0→1 as the first engineering hire. Own frontend and backend, shape the architecture.', 'full_time', '{"react","node.js","postgresql"}', '{"next.js","supabase","typescript"}', 'engineer', 'mid', 80, 120, 'remote'),
('Data Engineer', 'Quant Co', 'Design and maintain our real-time data pipelines. You will work with petabytes.', 'contract', '{"python","sql","spark"}', '{"dbt","airflow","snowflake"}', 'data', 'senior', 130, 170, 'hybrid'),
('Technical PM — Platform', 'Scale Inc', 'Lead the platform roadmap. You will work across engineering, design, and leadership.', 'full_time', '{"product management","jira","stakeholder management"}', '{"technical background","sql","a/b testing"}', 'pm', 'senior', 110, 150, 'remote'),
('Staff Engineer — Infrastructure', 'Cloud Corp', 'Architect and lead our infrastructure modernization. You will mentor 4 engineers and own the roadmap.', 'full_time', '{"aws","kubernetes","terraform"}', '{"golang","observability","distributed systems"}', 'engineer', 'staff', 180, 220, 'remote');
