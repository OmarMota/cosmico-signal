-- =============================================
-- COSMICO SIGNAL — Trajectory + Intent Layer
-- =============================================

-- =============================================
-- TRAJECTORY SNAPSHOTS
-- =============================================
CREATE TABLE public.trajectory_snapshots (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  snapshot_date       DATE NOT NULL,
  current_phase       TEXT NOT NULL DEFAULT 'establishing',
  -- 'establishing' | 'building' | 'specializing' | 'leading' | 'pioneering'
  growth_velocity     DECIMAL DEFAULT 0,
  momentum_score      DECIMAL DEFAULT 0,
  detected_patterns   JSONB DEFAULT '[]',
  role_predictions    JSONB DEFAULT '[]',
  computed_at         TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, snapshot_date)
);

CREATE INDEX idx_trajectory_user_date ON public.trajectory_snapshots(user_id, snapshot_date DESC);

-- =============================================
-- TRAJECTORY MILESTONES
-- =============================================
CREATE TABLE public.trajectory_milestones (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  milestone_type  TEXT NOT NULL,
  -- 'phase_transition' | 'skill_breakthrough' | 'signal_peak'
  -- | 'role_readiness' | 'goal_achieved' | 'streak_earned'
  title           TEXT NOT NULL,
  description     TEXT,
  achieved_at     TIMESTAMPTZ DEFAULT NOW(),
  metadata        JSONB DEFAULT '{}'
);

CREATE INDEX idx_milestones_user ON public.trajectory_milestones(user_id, achieved_at DESC);

-- =============================================
-- INTENTS (declared goals)
-- =============================================
CREATE TABLE public.intents (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  intent_type             TEXT NOT NULL,
  -- 'role_change' | 'skill_acquire' | 'rate_increase' | 'domain_switch'
  -- | 'seniority_advance' | 'freelance_launch' | 'full_time_find'
  target_role             TEXT,
  target_skills           TEXT[] DEFAULT '{}',
  target_rate             INT,
  target_timeline_weeks   INT,
  priority                INT DEFAULT 1 CHECK (priority BETWEEN 1 AND 3),
  status                  TEXT DEFAULT 'active',
  -- 'active' | 'achieved' | 'abandoned'
  created_at              TIMESTAMPTZ DEFAULT NOW(),
  updated_at              TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_intents_user ON public.intents(user_id, status);

-- =============================================
-- INFERRED INTENTS (system-detected)
-- =============================================
CREATE TABLE public.inferred_intents (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  intent_type     TEXT NOT NULL,
  confidence      DECIMAL NOT NULL CHECK (confidence BETWEEN 0.0 AND 1.0),
  evidence        JSONB DEFAULT '[]',
  inferred_at     TIMESTAMPTZ DEFAULT NOW(),
  expires_at      TIMESTAMPTZ,
  is_surfaced     BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_inferred_user ON public.inferred_intents(user_id, inferred_at DESC);

-- =============================================
-- INTENT ALIGNMENT
-- =============================================
CREATE TABLE public.intent_alignment (
  user_id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  alignment_score DECIMAL DEFAULT 50.0,
  gaps            JSONB DEFAULT '[]',
  last_computed   TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
ALTER TABLE public.trajectory_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trajectory_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inferred_intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intent_alignment ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own trajectory" ON public.trajectory_snapshots
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users manage own trajectory" ON public.trajectory_snapshots
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users view own milestones" ON public.trajectory_milestones
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users manage own milestones" ON public.trajectory_milestones
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own intents" ON public.intents
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users view own inferred intents" ON public.inferred_intents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System manages inferred intents" ON public.inferred_intents
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own alignment" ON public.intent_alignment
  FOR ALL USING (auth.uid() = user_id);

-- Triggers
CREATE TRIGGER intents_updated_at
  BEFORE UPDATE ON public.intents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
