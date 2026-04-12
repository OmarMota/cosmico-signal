export type RoleCategory = 'engineer' | 'designer' | 'pm' | 'data' | 'marketing' | 'ops' | 'other'
export type SeniorityLevel = 'junior' | 'mid' | 'senior' | 'staff' | 'principal'
export type AvailabilityStatus = 'available' | 'open' | 'unavailable'

export interface Profile {
  id: string
  display_name: string
  headline?: string
  avatar_url?: string
  role_category: RoleCategory
  primary_role: string
  seniority_level: SeniorityLevel
  hourly_rate_min?: number
  hourly_rate_max?: number
  currency: string
  availability: AvailabilityStatus
  availability_hours_per_week?: number
  timezone?: string
  location?: string
  bio?: string
  is_public: boolean
  onboarding_complete: boolean
  onboarding_step: number
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  user_id: string
  name: string
  category: 'technical' | 'soft' | 'domain' | 'tool'
  proficiency: number
  is_primary: boolean
  signal_weight: number
  added_at: string
}

export interface UpdateProfileInput {
  display_name?: string
  headline?: string
  avatar_url?: string
  role_category?: RoleCategory
  primary_role?: string
  seniority_level?: SeniorityLevel
  hourly_rate_min?: number
  hourly_rate_max?: number
  currency?: string
  availability?: AvailabilityStatus
  availability_hours_per_week?: number
  timezone?: string
  location?: string
  bio?: string
  is_public?: boolean
}

export const ROLE_CATEGORIES: Record<RoleCategory, string> = {
  engineer: 'Engineer',
  designer: 'Designer',
  pm: 'Product Manager',
  data: 'Data Specialist',
  marketing: 'Marketing',
  ops: 'Operations',
  other: 'Other',
}

export const SENIORITY_LABELS: Record<SeniorityLevel, string> = {
  junior: 'Junior',
  mid: 'Mid-Level',
  senior: 'Senior',
  staff: 'Staff',
  principal: 'Principal',
}

export const AVAILABILITY_LABELS: Record<AvailabilityStatus, string> = {
  available: 'Available Now',
  open: 'Open to Work',
  unavailable: 'Not Available',
}

export const AVAILABILITY_COLORS: Record<AvailabilityStatus, string> = {
  available: '#22c55e',
  open: '#f59e0b',
  unavailable: '#6b7280',
}
