export type SignalDimension = 'reliability' | 'performance' | 'responsiveness' | 'feedback' | 'growth'
export type ScoreTrend = 'rising' | 'falling' | 'stable'

export interface SignalAggregate {
  id: string
  week_start: string
  reliability: number
  performance: number
  responsiveness: number
  feedback: number
  growth: number
  composite_score: number
  event_count: number
}

export interface SignalProfile {
  reliability: number
  performance: number
  responsiveness: number
  feedback: number
  growth: number
  composite_score: number
  score_trend: ScoreTrend
  percentile_rank: number
}

export interface TrajectorySnapshot {
  current_phase: 'building' | 'specializing' | 'leading' | 'pivoting'
  growth_velocity: number
  momentum_score: number
  detected_patterns: Array<{
    type: string
    confidence: number
    evidence: string[]
  }>
  role_predictions: Array<{
    role: string
    confidence: number
    timeframe_months: number
  }>
}

export interface TrajectoryMilestone {
  id: string
  title: string
  description: string
  achieved_at: string
}

export interface LearningContent {
  id: string
  title: string
  content_type: 'article' | 'course' | 'video'
  duration_minutes: number
  price_usd: number
  signal_dimension: SignalDimension
  short_description: string
  skill_tags: string[]
  quality_score: number
}

export interface LearningRecommendation {
  id: string
  content_id: string
  reason_type: 'trajectory_aligned' | 'signal_gap' | 'intent_support'
  reason_text: string
  fit_score: number
  content: LearningContent
}

export interface OpportunityFit {
  fit_score: number
  skill_match: number
  signal_match: number
  trajectory_match: number
  rate_match: number
  breakdown: {
    matching_skills: string[]
    missing_skills: string[]
    signal_notes: string
    trajectory_notes: string
    rate_notes: string
  }
}

export interface Opportunity {
  id: string
  title: string
  company_name: string
  description: string
  opportunity_type: 'full_time' | 'contract' | 'freelance'
  required_skills: string[]
  preferred_skills: string[]
  seniority_level: string
  rate_min: number
  rate_max: number
  currency: string
  remote_policy: 'remote' | 'hybrid' | 'onsite'
  posted_at: string
  fit: OpportunityFit
}

export const DIMENSION_LABELS: Record<SignalDimension, string> = {
  reliability:    'Reliability',
  performance:    'Performance',
  responsiveness: 'Responsiveness',
  feedback:       'Feedback',
  growth:         'Growth',
}

export const DIMENSION_DESCRIPTIONS: Record<SignalDimension, string> = {
  reliability:    'Consistency and dependability over time',
  performance:    'Quality and impact of your output',
  responsiveness: 'Speed and clarity of communication',
  feedback:       'Satisfaction and reputation signals',
  growth:         'Learning velocity and skill expansion',
}

export const DIMENSION_COLORS: Record<SignalDimension, string> = {
  reliability:    '#6366f1',
  performance:    '#8b5cf6',
  responsiveness: '#a78bfa',
  feedback:       '#c084fc',
  growth:         '#e879f9',
}

export const PHASE_LABELS: Record<string, string> = {
  building:     'Building',
  specializing: 'Specializing',
  leading:      'Leading',
  pivoting:     'Pivoting',
}

export const PHASE_DESCRIPTIONS: Record<string, string> = {
  building:     'Establishing foundations and demonstrating consistent delivery',
  specializing: 'Deepening expertise in a defined area',
  leading:      'Expanding influence and mentoring others',
  pivoting:     'Deliberately shifting toward a new direction',
}
