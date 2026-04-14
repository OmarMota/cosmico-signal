/* =========================================
   Cosmico Signal — Profile types (merged)
   Combines Supabase-facing fields with the
   rich local UserProfile model.
   ========================================= */

export type RoleCategory = 'engineer' | 'designer' | 'pm' | 'data' | 'marketing' | 'ops' | 'other'
export type SeniorityLevel = 'junior' | 'mid' | 'senior' | 'staff' | 'principal'
export type AvailabilityStatus = 'available' | 'open' | 'unavailable'
export type ProfessionalSituation = 'freelancer' | 'employed' | 'seeking' | 'student'
export type ExperienceYears = '1-2' | '3-5' | '6-9' | '10+'
export type LanguageLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'native'
export type WorkplaceType = 'remote' | 'hybrid' | 'onsite'

export type CompanyType =
  | 'sme' | 'startup' | 'scaleup' | 'corporation'
  | 'agency' | 'freelance' | 'nonprofit' | 'public'

export type Industry =
  | 'sports' | 'healthcare' | 'videogames' | 'gdo'
  | 'cosmetics' | 'finance' | 'tech' | 'automotive'
  | 'media' | 'fashion' | 'education' | 'consulting'
  | 'real_estate' | 'food_beverage' | 'travel'

export type GoalType =
  | 'seniority_advance' | 'role_change' | 'rate_increase'
  | 'skill_acquire' | 'freelance_launch' | 'full_time_find'

export interface ProfileLink {
  platform: 'linkedin' | 'github' | 'dribbble' | 'behance' | 'website' | 'other'
  url: string
  label?: string
}

export interface Language {
  name: string
  level: LanguageLevel
}

export interface Skill {
  id?: string
  user_id?: string
  name: string
  category: 'technical' | 'soft' | 'domain' | 'tool'
  proficiency: number
  is_primary?: boolean
  signal_weight?: number
  added_at?: string
}

/** Full user profile — used by auth store, onboarding, and profile editor sections */
export interface UserProfile {
  /* Identity */
  id: string
  first_name: string
  last_name: string
  display_name: string
  avatar_url?: string
  email: string

  /* About */
  professional_situation: ProfessionalSituation
  vat_number?: string
  bio?: string
  headline?: string

  /* Basics */
  job_title: string
  /** Alias kept for Supabase API compatibility */
  primary_role?: string
  role_category: RoleCategory
  seniority_level: SeniorityLevel
  resume_url?: string
  portfolio_url?: string
  links: ProfileLink[]
  workplace: { type: WorkplaceType; city?: string }
  languages: Language[]
  referral_code?: string

  /* Rate & Availability */
  availability: AvailabilityStatus
  hours_per_week?: number
  hourly_rate_min?: number
  hourly_rate_max?: number
  currency: string
  timezone?: string
  location?: string

  /* Experiences */
  experience_years?: ExperienceYears
  company_types: CompanyType[]
  industries: Industry[]

  /* Skills & Specialties */
  skills: Skill[]
  main_specialization?: string
  skill_trajectory: string[]
  goals: GoalType[]

  /* Meta */
  is_public?: boolean
  onboarding_complete: boolean
  onboarding_step?: number
  created_at?: string
  updated_at?: string
}

/** Slim API-facing type (used by Supabase routes) — alias for backward compat */
export type Profile = UserProfile

export interface UpdateProfileInput {
  display_name?: string
  headline?: string
  bio?: string
  avatar_url?: string
  role_category?: RoleCategory
  primary_role?: string
  job_title?: string
  seniority_level?: SeniorityLevel
  hourly_rate_min?: number
  hourly_rate_max?: number
  currency?: string
  availability?: AvailabilityStatus
  hours_per_week?: number
  timezone?: string
  location?: string
  is_public?: boolean
  professional_situation?: ProfessionalSituation
  vat_number?: string
  resume_url?: string
  portfolio_url?: string
  links?: ProfileLink[]
  workplace?: { type: WorkplaceType; city?: string }
  languages?: Language[]
  experience_years?: ExperienceYears
  company_types?: CompanyType[]
  industries?: Industry[]
  main_specialization?: string
  skill_trajectory?: string[]
  goals?: GoalType[]
}

/* ─── Label maps ─────────────────────────────────────────────────────────────── */

export const ROLE_CATEGORIES: Record<RoleCategory, string> = {
  engineer: 'Engineer', designer: 'Designer', pm: 'Product Manager',
  data: 'Data Specialist', marketing: 'Marketing', ops: 'Operations', other: 'Other',
}

export const ROLE_CATEGORY_ICONS: Record<RoleCategory, string> = {
  engineer: '⚙️', designer: '🎨', pm: '📋', data: '📊',
  marketing: '📣', ops: '🔧', other: '✦',
}

export const SENIORITY_LABELS: Record<SeniorityLevel, string> = {
  junior: 'Junior', mid: 'Mid-Level', senior: 'Senior', staff: 'Staff', principal: 'Principal',
}

export const AVAILABILITY_LABELS: Record<AvailabilityStatus, string> = {
  available: 'Available Now', open: 'Open to Work', unavailable: 'Building Quietly',
}

export const AVAILABILITY_DESCRIPTIONS: Record<AvailabilityStatus, string> = {
  available: 'Ready to start immediately',
  open: 'Considering the right opportunities',
  unavailable: 'Not available at the moment',
}

export const AVAILABILITY_COLORS: Record<AvailabilityStatus, string> = {
  available: 'hsl(142, 71%, 45%)',
  open: 'hsl(38, 92%, 50%)',
  unavailable: 'hsl(220, 9%, 46%)',
}

export const SITUATION_LABELS: Record<ProfessionalSituation, string> = {
  freelancer: 'Freelancer', employed: 'Employed',
  seeking: 'Actively Looking', student: 'Student / Learning',
}

export const SITUATION_DESCRIPTIONS: Record<ProfessionalSituation, string> = {
  freelancer: 'Independent professional or contractor',
  employed: 'Currently employed full-time or part-time',
  seeking: 'Available and actively looking for new roles',
  student: 'Still in education or career bootcamp',
}

export const EXPERIENCE_LABELS: Record<ExperienceYears, string> = {
  '1-2': '1–2 years', '3-5': '3–5 years', '6-9': '6–9 years', '10+': '10+ years',
}

export const COMPANY_TYPE_LABELS: Record<CompanyType, string> = {
  sme: 'SME', startup: 'Startup', scaleup: 'Scale-up', corporation: 'Corporation',
  agency: 'Agency', freelance: 'Freelance / Solo', nonprofit: 'Non-profit', public: 'Public Sector',
}

export const INDUSTRY_LABELS: Record<Industry, string> = {
  sports: 'Sports', healthcare: 'Healthcare', videogames: 'Videogames', gdo: 'GDO / Retail',
  cosmetics: 'Cosmetics', finance: 'Finance', tech: 'Tech', automotive: 'Automotive',
  media: 'Media', fashion: 'Fashion', education: 'Education', consulting: 'Consulting',
  real_estate: 'Real Estate', food_beverage: 'Food & Beverage', travel: 'Travel',
}

export const INDUSTRY_ICONS: Record<Industry, string> = {
  sports: '⚽', healthcare: '🏥', videogames: '🎮', gdo: '🛒', cosmetics: '💄',
  finance: '💰', tech: '💻', automotive: '🚗', media: '📺', fashion: '👗',
  education: '📚', consulting: '📐', real_estate: '🏢', food_beverage: '🍽️', travel: '✈️',
}

export const LANGUAGE_LEVEL_LABELS: Record<LanguageLevel, string> = {
  A1: 'A1 — Beginner', A2: 'A2 — Elementary', B1: 'B1 — Intermediate',
  B2: 'B2 — Upper Intermediate', C1: 'C1 — Advanced', C2: 'C2 — Proficient', native: 'Native',
}

export const LINK_PLATFORM_LABELS: Record<ProfileLink['platform'], string> = {
  linkedin: 'LinkedIn', github: 'GitHub', dribbble: 'Dribbble',
  behance: 'Behance', website: 'Personal Website', other: 'Other',
}

export const GOAL_LABELS: Record<GoalType, string> = {
  seniority_advance: 'Advance to a senior role',
  role_change: 'Transition to a new role',
  rate_increase: 'Increase my rate',
  skill_acquire: 'Learn a new skill',
  freelance_launch: 'Launch my freelance practice',
  full_time_find: 'Find full-time work',
}

export const SPECIALIZATIONS_BY_ROLE: Record<RoleCategory, string[]> = {
  engineer: ['Frontend', 'Backend', 'Fullstack', 'Mobile (iOS/Android)', 'DevOps / Platform', 'Embedded Systems', 'Security', 'AI / Machine Learning', 'Blockchain', 'QA / Testing'],
  designer: ['UI Design', 'UX Research', 'Product Design', 'Brand Identity', 'Motion Design', '3D / VFX', 'Illustration', 'Design Systems'],
  pm: ['Product Management', 'Growth & Experimentation', 'Technical PM', 'Platform PM', 'Data PM', 'B2B SaaS', 'Consumer'],
  data: ['Data Analysis', 'Data Science', 'Machine Learning', 'Data Engineering', 'Business Intelligence', 'Analytics Engineering'],
  marketing: ['Performance Marketing', 'Content Marketing', 'SEO / SEM', 'Brand Marketing', 'Growth Marketing', 'Community Management', 'Influencer & PR'],
  ops: ['Operations Management', 'Supply Chain', 'Customer Success', 'Revenue Operations', 'HR & Talent', 'Legal & Compliance', 'Finance & Accounting'],
  other: ['Consulting', 'Entrepreneurship', 'Research', 'Teaching', 'Other'],
}

export const TRAJECTORY_SKILLS_BY_ROLE: Record<RoleCategory, string[]> = {
  engineer: ['System Design', 'Leadership & Mentoring', 'Architecture', 'AI Integration', 'Open Source', 'Public Speaking', 'Entrepreneurship', 'Product Thinking'],
  designer: ['Design Leadership', 'Research Methods', 'Design Engineering', 'AI Tools', 'Business Acumen', 'Product Strategy', 'Client Management'],
  pm: ['Technical Skills', 'Data Literacy', 'Leadership', 'Go-to-Market', 'Fundraising / VC', 'Strategic Vision', 'OKR Management'],
  data: ['MLOps', 'Product Thinking', 'Business Storytelling', 'Leadership', 'Real-time Systems', 'AI / LLMs'],
  marketing: ['Brand Building', 'Data & Analytics', 'Video Production', 'Partnerships', 'International Growth', 'Leadership'],
  ops: ['Strategic Planning', 'P&L Management', 'Digital Transformation', 'Team Leadership', 'Automation & AI'],
  other: ['Leadership', 'Innovation', 'Research', 'Communication', 'Digital Skills'],
}
