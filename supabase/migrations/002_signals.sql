-- =============================================
-- COSMICO SIGNAL — Signal Layer
-- =============================================

-- =============================================
-- SIGNAL EVENTS (append-only time series)
-- =============================================
CREATE TABLE public.signal_events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type      TEXT NOT NULL,
  -- 'task_completed' | 'feedback_received' | 'response_logged'
  -- | 'availability_updated' | 'goal_updated' | 'skill_demonstrated'
  -- | 'collaboration_logged' | 'delivery_on_time' | 'delivery_late'
  -- | 'mentor_session_completed' | 'learning_completed' | 'review_submitted'
  dimension       TEXT NOT NULL,
  -- 'reliability' | 'performance' | 'responsiveness' | 'feedback' | 'growth'
  raw_value       DECIMAL NOT NULL CHECK (raw_value BETWEEN 0.0 AND 1.0),
  normalized_value DECIMAL,
  weight          DECIMAL DEFAULT 1.0,
  source          TEXT NOT NULL DEFAULT 'platform',
  -- 'self' | 'platform' | 'peer' | 'client' | 'system'
  metadata        JSONB DEFAULT '{}',
  recorded_at     TIMESTAMPTZ DEFAULT NOW(),
  week_bucket     DATE GENERATED ALWAYS AS (date_trunc('week', recorded_at)::DATE) STORED
);

CREATE INDEX idx_signal_events_user_week ON public.signal_events(user_id, week_bucket DESC);
CREATE INDEX idx_signal_events_dimension ON public.signal_events(user_id, dimension, recorded_at DESC);
CREATE INDEX idx_signal_events_recorded ON public.signal_events(recorded_at DESC);

-- =============================================
-- SIGNAL AGGREGATES (materialized weekly scores)
-- =============================================
CREATE TABLE public.signal_aggregates (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  week_start      DATE NOT NULL,
  reliability     DECIMAL DEFAULT 50.0,
  performance     DECIMAL DEFAULT 50.0,
  responsiveness  DECIMAL DEFAULT 50.0,
  feedback        DECIMAL DEFAULT 50.0,
  growth          DECIMAL DEFAULT 50.0,
  composite_score DECIMAL DEFAULT 50.0,
  event_count     INT DEFAULT 0,
  computed_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, week_start)
);

CREATE INDEX idx_signal_agg_user_week ON public.signal_aggregates(user_id, week_start DESC);

-- =============================================
-- SIGNAL PROFILES (current snapshot, fast reads)
-- =============================================
CREATE TABLE public.signal_profiles (
  user_id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  reliability     DECIMAL DEFAULT 50.0,
  performance     DECIMAL DEFAULT 50.0,
  responsiveness  DECIMAL DEFAULT 50.0,
  feedback        DECIMAL DEFAULT 50.0,
  growth          DECIMAL DEFAULT 50.0,
  composite_score DECIMAL DEFAULT 50.0,
  score_trend     TEXT DEFAULT 'stable',
  -- 'rising' | 'falling' | 'stable'
  percentile_rank DECIMAL,
  last_event_at   TIMESTAMPTZ,
  last_computed   TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
ALTER TABLE public.signal_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signal_aggregates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signal_profiles ENABLE ROW LEVEL SECURITY;

-- Signal events: own only by default
CREATE POLICY "Users view own signal events" ON public.signal_events
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own signal events" ON public.signal_events
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Signal aggregates: own, plus public composite for profile viewing
CREATE POLICY "Users view own aggregates" ON public.signal_aggregates
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert aggregates" ON public.signal_aggregates
  FOR ALL USING (auth.uid() = user_id);

-- Signal profiles: composite visible if profile is public
CREATE POLICY "Signal profiles viewable if profile public" ON public.signal_profiles
  FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = user_id AND is_public = TRUE)
  );

CREATE POLICY "Users manage own signal profile" ON public.signal_profiles
  FOR ALL USING (auth.uid() = user_id);

-- =============================================
-- FUNCTION: Init signal profile on new user
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_signal_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.signal_profiles (user_id)
  VALUES (NEW.id)
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_profile_created_init_signal
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_signal_profile();
