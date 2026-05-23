export type TrajectoryPhase = 'establishing' | 'building' | 'specializing' | 'leading' | 'pioneering'

export type MilestoneType =
  | 'phase_transition'
  | 'skill_breakthrough'
  | 'signal_peak'
  | 'role_readiness'
  | 'goal_achieved'
  | 'streak_earned'

export type PatternType =
  | 'technical_deepening'
  | 'reliability_building'
  | 'leadership_emergence'
  | 'plateau'
  | 'specialization'
  | 'acceleration'

export interface DetectedPattern {
  type: PatternType
  confidence: number
  evidence: string[]
  started_at?: string
}

export interface RolePrediction {
  role: string
  confidence: number
  timeframe_months: number
}

export interface TrajectorySnapshot {
  id: string
  user_id: string
  snapshot_date: string
  current_phase: TrajectoryPhase
  growth_velocity: number   // -1 to 1 normalized
  momentum_score: number    // 12-week directional momentum
  detected_patterns: DetectedPattern[]
  role_predictions: RolePrediction[]
  computed_at: string
}

export interface TrajectoryMilestone {
  id: string
  user_id: string
  milestone_type: MilestoneType
  title: string
  description?: string
  achieved_at: string
  metadata: Record<string, unknown>
}

export const PHASE_LABELS: Record<TrajectoryPhase, string> = {
  establishing: 'Establishing',
  building: 'Building',
  specializing: 'Specializing',
  leading: 'Leading',
  pioneering: 'Pioneering',
}

export const PHASE_DESCRIPTIONS: Record<TrajectoryPhase, string> = {
  establishing: 'Building your foundation and proving consistency',
  building: 'Growing across dimensions with increasing momentum',
  specializing: 'Deepening expertise in a focused direction',
  leading: 'Operating at high performance with influence',
  pioneering: 'Shaping the field at an exceptional level',
}

export const PHASE_ORDER: TrajectoryPhase[] = ['establishing', 'building', 'specializing', 'leading', 'pioneering']

export const PHASE_COLORS: Record<TrajectoryPhase, string> = {
  establishing: 'oklch(0.75 0 0)',
  building:     'oklch(0.65 0 0)',
  specializing: 'oklch(0.55 0 0)',
  leading:      'oklch(0.4 0 0)',
  pioneering:   'oklch(0.25 0 0)',
}
