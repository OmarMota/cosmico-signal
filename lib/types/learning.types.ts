import type { SignalDimension } from './signal.types'

export type ContentType = 'video' | 'course' | 'article' | 'mentor_session' | 'workshop'
export type ContentProvider = 'youtube' | 'udemy' | 'coursera' | 'internal' | 'mentor' | 'other'
export type RecommendReason = 'signal_gap' | 'trajectory_aligned' | 'intent_support' | 'cohort_popular'
export type ProgressStatus = 'not_started' | 'in_progress' | 'completed'

export interface LearningContent {
  id: string
  title: string
  provider: ContentProvider
  content_type: ContentType
  url?: string
  duration_minutes?: number
  price_usd: number
  skill_tags: string[]
  role_tags: string[]
  seniority_level: string[]
  signal_dimension?: SignalDimension
  quality_score: number
  thumbnail_url?: string
  short_description?: string
  created_at: string
}

export interface LearningRecommendation {
  id: string
  user_id: string
  content_id: string
  reason_type: RecommendReason
  reason_text?: string
  fit_score: number
  is_dismissed: boolean
  recommended_at: string
  content?: LearningContent
}

export interface LearningProgress {
  id: string
  user_id: string
  content_id: string
  status: ProgressStatus
  progress_pct: number
  completed_at?: string
  signal_credited: boolean
  created_at: string
}

export const CONTENT_TYPE_ICONS: Record<ContentType, string> = {
  video: '▶',
  course: '📚',
  article: '📄',
  mentor_session: '👤',
  workshop: '🛠',
}

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  video: 'Video',
  course: 'Course',
  article: 'Article',
  mentor_session: 'Mentor Session',
  workshop: 'Workshop',
}

export const REASON_LABELS: Record<RecommendReason, string> = {
  signal_gap: 'Strengthens your signal',
  trajectory_aligned: 'Aligned with your trajectory',
  intent_support: 'Supports your goal',
  cohort_popular: 'Popular in your cohort',
}
