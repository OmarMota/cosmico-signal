-- =============================================
-- COSMICO SIGNAL — Learning Layer
-- =============================================

-- =============================================
-- LEARNING CONTENT (curated catalog)
-- =============================================
CREATE TABLE public.learning_content (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title             TEXT NOT NULL,
  provider          TEXT NOT NULL DEFAULT 'internal',
  -- 'youtube' | 'udemy' | 'coursera' | 'internal' | 'mentor' | 'other'
  content_type      TEXT NOT NULL DEFAULT 'article',
  -- 'video' | 'course' | 'article' | 'mentor_session' | 'workshop'
  url               TEXT,
  duration_minutes  INT,
  price_usd         DECIMAL DEFAULT 0,
  skill_tags        TEXT[] DEFAULT '{}',
  role_tags         TEXT[] DEFAULT '{}',
  seniority_level   TEXT[] DEFAULT '{"junior","mid","senior"}',
  signal_dimension  TEXT,
  -- which dimension it primarily strengthens
  quality_score     DECIMAL DEFAULT 0.7 CHECK (quality_score BETWEEN 0.0 AND 1.0),
  thumbnail_url     TEXT,
  short_description TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_learning_skills ON public.learning_content USING GIN(skill_tags);
CREATE INDEX idx_learning_roles ON public.learning_content USING GIN(role_tags);
CREATE INDEX idx_learning_dimension ON public.learning_content(signal_dimension);

-- =============================================
-- LEARNING RECOMMENDATIONS
-- =============================================
CREATE TABLE public.learning_recommendations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_id      UUID REFERENCES public.learning_content(id) ON DELETE CASCADE,
  reason_type     TEXT NOT NULL,
  -- 'signal_gap' | 'trajectory_aligned' | 'intent_support' | 'cohort_popular'
  reason_text     TEXT,
  fit_score       DECIMAL DEFAULT 50.0,
  is_dismissed    BOOLEAN DEFAULT FALSE,
  recommended_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_recs_user ON public.learning_recommendations(user_id, is_dismissed, recommended_at DESC);

-- =============================================
-- LEARNING PROGRESS
-- =============================================
CREATE TABLE public.learning_progress (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_id      UUID REFERENCES public.learning_content(id) ON DELETE CASCADE,
  status          TEXT DEFAULT 'not_started',
  -- 'not_started' | 'in_progress' | 'completed'
  progress_pct    INT DEFAULT 0 CHECK (progress_pct BETWEEN 0 AND 100),
  completed_at    TIMESTAMPTZ,
  signal_credited BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, content_id)
);

CREATE INDEX idx_progress_user ON public.learning_progress(user_id, status);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
ALTER TABLE public.learning_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;

-- Content is publicly readable
CREATE POLICY "Learning content is public" ON public.learning_content
  FOR SELECT USING (TRUE);

CREATE POLICY "Admins manage learning content" ON public.learning_content
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users view own recommendations" ON public.learning_recommendations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users manage own recommendations" ON public.learning_recommendations
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own progress" ON public.learning_progress
  FOR ALL USING (auth.uid() = user_id);

-- =============================================
-- SEED: Sample learning content
-- =============================================
INSERT INTO public.learning_content (title, provider, content_type, url, duration_minutes, price_usd, skill_tags, role_tags, seniority_level, signal_dimension, quality_score, short_description) VALUES
('The Art of Reliable Delivery', 'internal', 'article', NULL, 15, 0, '{"project management","delivery","planning"}', '{"engineer","pm","designer"}', '{"junior","mid","senior"}', 'reliability', 0.9, 'How top freelancers consistently hit deadlines without burning out.'),
('Mastering Client Communication', 'internal', 'video', NULL, 30, 0, '{"communication","client relations","responsiveness"}', '{"engineer","designer","pm"}', '{"junior","mid"}', 'responsiveness', 0.85, 'Frameworks for fast, clear, and trustworthy client communication.'),
('Building Your Technical Trajectory', 'internal', 'course', NULL, 180, 0, '{"career growth","learning","specialization"}', '{"engineer"}', '{"mid","senior"}', 'growth', 0.88, 'A structured path from competent to exceptional.'),
('Getting Remarkable Feedback', 'internal', 'article', NULL, 20, 0, '{"feedback","client success","reputation"}', '{"engineer","designer","pm"}', '{"junior","mid","senior"}', 'feedback', 0.82, 'The exact questions to ask clients that generate powerful testimonials.'),
('Performance Under Pressure', 'internal', 'video', NULL, 45, 0, '{"performance","execution","focus"}', '{"engineer","designer"}', '{"mid","senior"}', 'performance', 0.87, 'How to maintain output quality during tight timelines.'),
('Advanced React Patterns', 'internal', 'course', NULL, 240, 49, '{"react","javascript","frontend"}', '{"engineer"}', '{"mid","senior"}', 'growth', 0.92, 'Compound components, render props, and custom hook architectures.'),
('Design Systems at Scale', 'internal', 'course', NULL, 300, 79, '{"design systems","figma","ui"}', '{"designer"}', '{"senior","staff"}', 'growth', 0.91, 'Building maintainable design systems used by teams of 50+.'),
('Product Thinking for Engineers', 'internal', 'article', NULL, 25, 0, '{"product thinking","strategy","communication"}', '{"engineer","pm"}', '{"mid","senior","staff"}', 'performance', 0.86, 'How to think in outcomes, not outputs — and get promoted faster.'),
('The Freelancer''s Rate Negotiation Playbook', 'internal', 'video', NULL, 60, 0, '{"negotiation","pricing","business"}', '{"engineer","designer","pm"}', '{"mid","senior"}', 'feedback', 0.89, 'How to raise your rates without losing clients.'),
('Systems Thinking for Technical Leaders', 'internal', 'course', NULL, 360, 99, '{"systems thinking","leadership","architecture"}', '{"engineer","pm"}', '{"senior","staff","principal"}', 'growth', 0.93, 'The mental models that separate staff engineers from senior ones.');
