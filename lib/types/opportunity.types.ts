export type OpportunityType = 'full_time' | 'contract' | 'freelance' | 'advisory'
export type RemotePolicy = 'remote' | 'hybrid' | 'onsite'

export interface Opportunity {
  id: string
  title: string
  company_name?: string
  description?: string
  opportunity_type: OpportunityType
  required_skills: string[]
  preferred_skills: string[]
  role_category: string
  seniority_level?: string
  rate_min?: number
  rate_max?: number
  currency: string
  remote_policy: RemotePolicy
  is_active: boolean
  posted_at: string
  expires_at?: string
}

export interface OpportunityFit {
  id: string
  user_id: string
  opportunity_id: string
  fit_score: number
  skill_match: number
  signal_match: number
  trajectory_match: number
  rate_match: number
  breakdown: FitBreakdown
  computed_at: string
}

export interface FitBreakdown {
  matching_skills: string[]
  missing_skills: string[]
  signal_notes: string
  trajectory_notes: string
  rate_notes: string
}

export interface OpportunityWithFit extends Opportunity {
  fit?: OpportunityFit
}

export const OPPORTUNITY_TYPE_LABELS: Record<OpportunityType, string> = {
  full_time: 'Full-Time',
  contract: 'Contract',
  freelance: 'Freelance',
  advisory: 'Advisory',
}

export const REMOTE_POLICY_LABELS: Record<RemotePolicy, string> = {
  remote: 'Remote',
  hybrid: 'Hybrid',
  onsite: 'On-Site',
}
