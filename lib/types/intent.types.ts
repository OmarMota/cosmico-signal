export type IntentType =
  | 'role_change'
  | 'skill_acquire'
  | 'rate_increase'
  | 'domain_switch'
  | 'seniority_advance'
  | 'freelance_launch'
  | 'full_time_find'

export type IntentStatus = 'active' | 'achieved' | 'abandoned'

export interface Intent {
  id: string
  user_id: string
  intent_type: IntentType
  target_role?: string
  target_skills: string[]
  target_rate?: number
  target_timeline_weeks?: number
  priority: 1 | 2 | 3
  status: IntentStatus
  created_at: string
  updated_at: string
}

export interface InferredIntent {
  id: string
  user_id: string
  intent_type: IntentType
  confidence: number
  evidence: string[]
  inferred_at: string
  expires_at?: string
  is_surfaced: boolean
}

export interface IntentGap {
  type: string
  description: string
  severity: number
}

export interface IntentAlignment {
  user_id: string
  alignment_score: number
  gaps: IntentGap[]
  last_computed: string
}

export interface CreateIntentInput {
  intent_type: IntentType
  target_role?: string
  target_skills?: string[]
  target_rate?: number
  target_timeline_weeks?: number
  priority?: 1 | 2 | 3
}

export const INTENT_LABELS: Record<IntentType, string> = {
  role_change: 'Change Role',
  skill_acquire: 'Learn New Skill',
  rate_increase: 'Increase Rate',
  domain_switch: 'Switch Domain',
  seniority_advance: 'Advance Seniority',
  freelance_launch: 'Launch Freelance',
  full_time_find: 'Find Full-Time',
}
