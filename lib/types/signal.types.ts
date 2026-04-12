export type SignalDimension = 'reliability' | 'performance' | 'responsiveness' | 'feedback' | 'growth'

export type SignalEventType =
  | 'task_completed'
  | 'feedback_received'
  | 'response_logged'
  | 'availability_updated'
  | 'goal_updated'
  | 'skill_demonstrated'
  | 'collaboration_logged'
  | 'delivery_on_time'
  | 'delivery_late'
  | 'mentor_session_completed'
  | 'learning_completed'
  | 'review_submitted'

export type SignalSource = 'self' | 'platform' | 'peer' | 'client' | 'system'

export type ScoreTrend = 'rising' | 'falling' | 'stable'

export interface SignalEvent {
  id: string
  user_id: string
  event_type: SignalEventType
  dimension: SignalDimension
  raw_value: number
  normalized_value?: number
  weight: number
  source: SignalSource
  metadata: Record<string, unknown>
  recorded_at: string
  week_bucket: string
}

export interface CreateSignalEventInput {
  event_type: SignalEventType
  dimension: SignalDimension
  raw_value: number
  weight?: number
  source: SignalSource
  metadata?: Record<string, unknown>
}

export interface SignalAggregate {
  id: string
  user_id: string
  week_start: string
  reliability: number
  performance: number
  responsiveness: number
  feedback: number
  growth: number
  composite_score: number
  event_count: number
  computed_at: string
}

export interface SignalProfile {
  user_id: string
  reliability: number
  performance: number
  responsiveness: number
  feedback: number
  growth: number
  composite_score: number
  score_trend: ScoreTrend
  percentile_rank?: number
  last_event_at?: string
  last_computed: string
}

export const DIMENSION_WEIGHTS: Record<SignalDimension, number> = {
  reliability: 0.30,
  performance: 0.28,
  responsiveness: 0.18,
  feedback: 0.14,
  growth: 0.10,
}

export const DIMENSION_LABELS: Record<SignalDimension, string> = {
  reliability: 'Reliability',
  performance: 'Performance',
  responsiveness: 'Responsiveness',
  feedback: 'Feedback',
  growth: 'Growth',
}

export const DIMENSION_COLORS: Record<SignalDimension, string> = {
  reliability: '#6366f1',
  performance: '#8b5cf6',
  responsiveness: '#a78bfa',
  feedback: '#c084fc',
  growth: '#e879f9',
}
