import type { Profile, Skill } from '../types/profile.types'
import type { SignalProfile, SignalAggregate } from '../types/signal.types'
import type { TrajectorySnapshot, TrajectoryMilestone } from '../types/trajectory.types'
import type { Intent, InferredIntent, IntentAlignment } from '../types/intent.types'
import type { LearningContent, LearningRecommendation } from '../types/learning.types'
import type { OpportunityWithFit } from '../types/opportunity.types'

// =============================================
// MOCK PROFILE
// =============================================
export const MOCK_PROFILE: Profile = {
  id: 'mock-user-001',
  first_name: 'Alex',
  last_name: 'Chen',
  display_name: 'Alex Chen',
  email: 'alex@cosmico.io',
  headline: 'Building great products at the intersection of design and engineering',
  avatar_url: undefined,
  role_category: 'engineer',
  job_title: 'Senior Frontend Engineer',
  primary_role: 'Senior Frontend Engineer',
  seniority_level: 'senior',
  professional_situation: 'freelancer',
  hourly_rate_min: 120,
  hourly_rate_max: 160,
  currency: 'USD',
  availability: 'open',
  hours_per_week: 30,
  timezone: 'America/New_York',
  location: 'New York, NY',
  bio: 'I specialize in React and design systems. I care deeply about the craft of building interfaces that feel alive — not just functional. Currently focused on growing toward a Staff Engineer role.',
  links: [],
  languages: [],
  skills: [],
  company_types: [],
  industries: [],
  skill_trajectory: [],
  goals: [],
  workplace: { type: 'remote' },
  is_public: true,
  onboarding_complete: true,
  onboarding_step: 6,
  created_at: '2024-10-01T00:00:00Z',
  updated_at: '2025-02-15T00:00:00Z',
}

export const MOCK_SKILLS: Skill[] = [
  { id: 's1', user_id: 'mock-user-001', name: 'React', category: 'technical', proficiency: 5, is_primary: true, signal_weight: 1.4, added_at: '2024-10-01T00:00:00Z' },
  { id: 's2', user_id: 'mock-user-001', name: 'TypeScript', category: 'technical', proficiency: 5, is_primary: true, signal_weight: 1.3, added_at: '2024-10-01T00:00:00Z' },
  { id: 's3', user_id: 'mock-user-001', name: 'Next.js', category: 'technical', proficiency: 4, is_primary: true, signal_weight: 1.2, added_at: '2024-10-01T00:00:00Z' },
  { id: 's4', user_id: 'mock-user-001', name: 'Design Systems', category: 'domain', proficiency: 4, is_primary: true, signal_weight: 1.2, added_at: '2024-11-01T00:00:00Z' },
  { id: 's5', user_id: 'mock-user-001', name: 'Figma', category: 'tool', proficiency: 4, is_primary: false, signal_weight: 1.0, added_at: '2024-10-01T00:00:00Z' },
  { id: 's6', user_id: 'mock-user-001', name: 'Node.js', category: 'technical', proficiency: 3, is_primary: false, signal_weight: 1.0, added_at: '2024-10-01T00:00:00Z' },
  { id: 's7', user_id: 'mock-user-001', name: 'CSS / Tailwind', category: 'technical', proficiency: 5, is_primary: false, signal_weight: 1.1, added_at: '2024-10-01T00:00:00Z' },
  { id: 's8', user_id: 'mock-user-001', name: 'Communication', category: 'soft', proficiency: 4, is_primary: false, signal_weight: 1.0, added_at: '2024-10-01T00:00:00Z' },
  { id: 's9', user_id: 'mock-user-001', name: 'PostgreSQL', category: 'technical', proficiency: 3, is_primary: false, signal_weight: 0.9, added_at: '2024-12-01T00:00:00Z' },
  { id: 's10', user_id: 'mock-user-001', name: 'Systems Thinking', category: 'soft', proficiency: 3, is_primary: false, signal_weight: 1.0, added_at: '2025-01-01T00:00:00Z' },
]

// =============================================
// MOCK SIGNAL DATA
// =============================================
export const MOCK_SIGNAL_PROFILE: SignalProfile = {
  user_id: 'mock-user-001',
  reliability: 81.5,
  performance: 74.2,
  responsiveness: 68.0,
  feedback: 77.8,
  growth: 62.4,
  composite_score: 74.8,
  score_trend: 'rising',
  percentile_rank: 82,
  last_event_at: '2025-02-10T14:00:00Z',
  last_computed: new Date().toISOString(),
}

function makeWeek(weeksAgo: number): string {
  const d = new Date()
  d.setDate(d.getDate() - weeksAgo * 7)
  const day = d.getDay()
  const monday = new Date(d)
  monday.setDate(d.getDate() - day + (day === 0 ? -6 : 1))
  return monday.toISOString().split('T')[0]
}

export const MOCK_WEEKLY_HISTORY: SignalAggregate[] = [
  { id: 'a1',  user_id: 'mock-user-001', week_start: makeWeek(0),  reliability: 81.5, performance: 74.2, responsiveness: 68.0, feedback: 77.8, growth: 62.4, composite_score: 74.8, event_count: 8,  computed_at: new Date().toISOString() },
  { id: 'a2',  user_id: 'mock-user-001', week_start: makeWeek(1),  reliability: 80.0, performance: 72.5, responsiveness: 67.0, feedback: 76.2, growth: 60.0, composite_score: 73.1, event_count: 6,  computed_at: new Date().toISOString() },
  { id: 'a3',  user_id: 'mock-user-001', week_start: makeWeek(2),  reliability: 79.0, performance: 71.0, responsiveness: 66.5, feedback: 74.5, growth: 59.0, composite_score: 72.0, event_count: 7,  computed_at: new Date().toISOString() },
  { id: 'a4',  user_id: 'mock-user-001', week_start: makeWeek(3),  reliability: 77.5, performance: 69.8, responsiveness: 65.0, feedback: 73.0, growth: 57.5, composite_score: 70.5, event_count: 5,  computed_at: new Date().toISOString() },
  { id: 'a5',  user_id: 'mock-user-001', week_start: makeWeek(4),  reliability: 75.0, performance: 68.0, responsiveness: 63.5, feedback: 71.0, growth: 55.0, composite_score: 68.5, event_count: 9,  computed_at: new Date().toISOString() },
  { id: 'a6',  user_id: 'mock-user-001', week_start: makeWeek(5),  reliability: 73.0, performance: 66.5, responsiveness: 62.0, feedback: 69.5, growth: 53.0, composite_score: 67.0, event_count: 6,  computed_at: new Date().toISOString() },
  { id: 'a7',  user_id: 'mock-user-001', week_start: makeWeek(6),  reliability: 70.5, performance: 64.0, responsiveness: 60.0, feedback: 67.0, growth: 51.5, composite_score: 64.8, event_count: 4,  computed_at: new Date().toISOString() },
  { id: 'a8',  user_id: 'mock-user-001', week_start: makeWeek(7),  reliability: 68.0, performance: 62.5, responsiveness: 58.5, feedback: 65.0, growth: 49.5, composite_score: 62.8, event_count: 7,  computed_at: new Date().toISOString() },
  { id: 'a9',  user_id: 'mock-user-001', week_start: makeWeek(8),  reliability: 66.0, performance: 60.0, responsiveness: 57.0, feedback: 63.0, growth: 48.0, composite_score: 61.0, event_count: 5,  computed_at: new Date().toISOString() },
  { id: 'a10', user_id: 'mock-user-001', week_start: makeWeek(9),  reliability: 64.0, performance: 58.5, responsiveness: 55.5, feedback: 61.0, growth: 46.0, composite_score: 59.2, event_count: 6,  computed_at: new Date().toISOString() },
  { id: 'a11', user_id: 'mock-user-001', week_start: makeWeek(10), reliability: 62.0, performance: 57.0, responsiveness: 54.0, feedback: 59.5, growth: 44.5, composite_score: 57.5, event_count: 3,  computed_at: new Date().toISOString() },
  { id: 'a12', user_id: 'mock-user-001', week_start: makeWeek(11), reliability: 60.0, performance: 55.0, responsiveness: 52.5, feedback: 57.0, growth: 43.0, composite_score: 55.6, event_count: 5,  computed_at: new Date().toISOString() },
]

// =============================================
// MOCK TRAJECTORY
// =============================================
export const MOCK_TRAJECTORY: TrajectorySnapshot = {
  id: 't1',
  user_id: 'mock-user-001',
  snapshot_date: new Date().toISOString().split('T')[0],
  current_phase: 'specializing',
  growth_velocity: 0.38,
  momentum_score: 0.22,
  detected_patterns: [
    {
      type: 'technical_deepening',
      confidence: 0.84,
      evidence: ['Growth dimension rising for 8 weeks', 'Performance consistently above 65', 'New skills added in recent months'],
    },
    {
      type: 'reliability_building',
      confidence: 0.91,
      evidence: ['7 consecutive weeks of reliability above 75'],
    },
    {
      type: 'specialization',
      confidence: 0.72,
      evidence: ['Reliability significantly above other dimensions', 'Focus pattern detected in signal events'],
    },
  ],
  role_predictions: [
    { role: 'Staff Engineer', confidence: 0.71, timeframe_months: 14 },
    { role: 'Principal Engineer', confidence: 0.42, timeframe_months: 28 },
    { role: 'Tech Lead', confidence: 0.55, timeframe_months: 8 },
  ],
  computed_at: new Date().toISOString(),
}

export const MOCK_MILESTONES: TrajectoryMilestone[] = [
  { id: 'm1', user_id: 'mock-user-001', milestone_type: 'signal_peak', title: 'Signal crossed 70', description: 'Composite signal exceeded 70 for the first time', achieved_at: makeWeek(3) + 'T10:00:00Z', metadata: {} },
  { id: 'm2', user_id: 'mock-user-001', milestone_type: 'streak_earned', title: 'Reliability Streak', description: '6 consecutive weeks above 75 reliability', achieved_at: makeWeek(1) + 'T10:00:00Z', metadata: {} },
  { id: 'm3', user_id: 'mock-user-001', milestone_type: 'phase_transition', title: 'Entered Specializing phase', description: 'Your signal patterns shifted from Building to Specializing', achieved_at: makeWeek(5) + 'T10:00:00Z', metadata: {} },
]

// =============================================
// MOCK INTENTS
// =============================================
export const MOCK_INTENTS: Intent[] = [
  {
    id: 'i1',
    user_id: 'mock-user-001',
    intent_type: 'seniority_advance',
    target_role: 'Staff Engineer',
    target_skills: ['systems design', 'mentoring', 'architecture'],
    target_rate: 180,
    target_timeline_weeks: 52,
    priority: 1,
    status: 'active',
    created_at: '2024-10-15T00:00:00Z',
    updated_at: '2024-10-15T00:00:00Z',
  },
  {
    id: 'i2',
    user_id: 'mock-user-001',
    intent_type: 'rate_increase',
    target_skills: [],
    target_rate: 180,
    target_timeline_weeks: 24,
    priority: 2,
    status: 'active',
    created_at: '2024-11-01T00:00:00Z',
    updated_at: '2024-11-01T00:00:00Z',
  },
]

export const MOCK_INFERRED_INTENTS: InferredIntent[] = [
  {
    id: 'ii1',
    user_id: 'mock-user-001',
    intent_type: 'seniority_advance',
    confidence: 0.78,
    evidence: ['Growth score: 62', 'Consistently demonstrating new skills'],
    inferred_at: new Date().toISOString(),
    is_surfaced: false,
  },
  {
    id: 'ii2',
    user_id: 'mock-user-001',
    intent_type: 'rate_increase',
    confidence: 0.65,
    evidence: ['Composite score: 74', 'Trend: rising'],
    inferred_at: new Date().toISOString(),
    is_surfaced: false,
  },
]

export const MOCK_ALIGNMENT: IntentAlignment = {
  user_id: 'mock-user-001',
  alignment_score: 72,
  gaps: [
    { type: 'skill_gap', description: 'Systems design skill not yet demonstrated in signals', severity: 0.6 },
    { type: 'behavior_gap', description: 'Mentoring activity not yet visible in signal events', severity: 0.4 },
  ],
  last_computed: new Date().toISOString(),
}

// =============================================
// MOCK LEARNING CONTENT
// =============================================
export const MOCK_LEARNING_CONTENT: LearningContent[] = [
  { id: 'lc1', title: 'The Art of Reliable Delivery', provider: 'internal', content_type: 'article', duration_minutes: 15, price_usd: 0, skill_tags: ['delivery', 'planning', 'project management'], role_tags: ['engineer', 'pm'], seniority_level: ['junior', 'mid', 'senior'], signal_dimension: 'reliability', quality_score: 0.9, short_description: 'How top freelancers consistently hit deadlines without burning out.', created_at: '2024-01-01T00:00:00Z' },
  { id: 'lc2', title: 'Systems Thinking for Technical Leaders', provider: 'internal', content_type: 'course', duration_minutes: 360, price_usd: 99, skill_tags: ['systems thinking', 'leadership', 'architecture'], role_tags: ['engineer'], seniority_level: ['senior', 'staff', 'principal'], signal_dimension: 'growth', quality_score: 0.93, short_description: 'The mental models that separate staff engineers from senior ones.', created_at: '2024-01-01T00:00:00Z' },
  { id: 'lc3', title: 'Mastering Client Communication', provider: 'internal', content_type: 'video', duration_minutes: 30, price_usd: 0, skill_tags: ['communication', 'client relations', 'responsiveness'], role_tags: ['engineer', 'designer'], seniority_level: ['junior', 'mid'], signal_dimension: 'responsiveness', quality_score: 0.85, short_description: 'Frameworks for fast, clear, and trustworthy client communication.', created_at: '2024-01-01T00:00:00Z' },
  { id: 'lc4', title: 'Getting Remarkable Feedback', provider: 'internal', content_type: 'article', duration_minutes: 20, price_usd: 0, skill_tags: ['feedback', 'client success', 'reputation'], role_tags: ['engineer', 'designer', 'pm'], seniority_level: ['junior', 'mid', 'senior'], signal_dimension: 'feedback', quality_score: 0.82, short_description: 'The exact questions to ask clients that generate powerful testimonials.', created_at: '2024-01-01T00:00:00Z' },
  { id: 'lc5', title: 'Advanced React Patterns', provider: 'internal', content_type: 'course', duration_minutes: 240, price_usd: 49, skill_tags: ['react', 'javascript', 'frontend'], role_tags: ['engineer'], seniority_level: ['mid', 'senior'], signal_dimension: 'growth', quality_score: 0.92, short_description: 'Compound components, render props, and custom hook architectures.', created_at: '2024-01-01T00:00:00Z' },
  { id: 'lc6', title: "The Freelancer's Rate Negotiation Playbook", provider: 'internal', content_type: 'video', duration_minutes: 60, price_usd: 0, skill_tags: ['negotiation', 'pricing', 'business'], role_tags: ['engineer', 'designer'], seniority_level: ['mid', 'senior'], signal_dimension: 'feedback', quality_score: 0.89, short_description: 'How to raise your rates without losing clients.', created_at: '2024-01-01T00:00:00Z' },
  { id: 'lc7', title: 'Performance Under Pressure', provider: 'internal', content_type: 'video', duration_minutes: 45, price_usd: 0, skill_tags: ['performance', 'execution', 'focus'], role_tags: ['engineer', 'designer'], seniority_level: ['mid', 'senior'], signal_dimension: 'performance', quality_score: 0.87, short_description: 'How to maintain output quality during tight timelines.', created_at: '2024-01-01T00:00:00Z' },
  { id: 'lc8', title: 'Building Your Technical Trajectory', provider: 'internal', content_type: 'course', duration_minutes: 180, price_usd: 0, skill_tags: ['career growth', 'learning', 'specialization'], role_tags: ['engineer'], seniority_level: ['mid', 'senior'], signal_dimension: 'growth', quality_score: 0.88, short_description: 'A structured path from competent to exceptional.', created_at: '2024-01-01T00:00:00Z' },
]

export const MOCK_RECOMMENDATIONS: LearningRecommendation[] = [
  { id: 'r1', user_id: 'mock-user-001', content_id: 'lc2', reason_type: 'trajectory_aligned', reason_text: 'Required for your next role: systems design', fit_score: 92, is_dismissed: false, recommended_at: new Date().toISOString(), content: MOCK_LEARNING_CONTENT[1] },
  { id: 'r2', user_id: 'mock-user-001', content_id: 'lc3', reason_type: 'signal_gap', reason_text: 'Improves your responsiveness signal', fit_score: 78, is_dismissed: false, recommended_at: new Date().toISOString(), content: MOCK_LEARNING_CONTENT[2] },
  { id: 'r3', user_id: 'mock-user-001', content_id: 'lc8', reason_type: 'intent_support', reason_text: 'Supports your goal: advance to Staff Engineer', fit_score: 85, is_dismissed: false, recommended_at: new Date().toISOString(), content: MOCK_LEARNING_CONTENT[7] },
  { id: 'r4', user_id: 'mock-user-001', content_id: 'lc6', reason_type: 'intent_support', reason_text: 'Supports your goal: increase your rate', fit_score: 74, is_dismissed: false, recommended_at: new Date().toISOString(), content: MOCK_LEARNING_CONTENT[5] },
  { id: 'r5', user_id: 'mock-user-001', content_id: 'lc7', reason_type: 'signal_gap', reason_text: 'Strengthens your performance signal', fit_score: 70, is_dismissed: false, recommended_at: new Date().toISOString(), content: MOCK_LEARNING_CONTENT[6] },
  { id: 'r6', user_id: 'mock-user-001', content_id: 'lc4', reason_type: 'signal_gap', reason_text: 'Improves your feedback signal', fit_score: 65, is_dismissed: false, recommended_at: new Date().toISOString(), content: MOCK_LEARNING_CONTENT[3] },
]

// =============================================
// MOCK OPPORTUNITIES
// =============================================
export const MOCK_OPPORTUNITIES: OpportunityWithFit[] = [
  {
    id: 'o1', title: 'Senior Frontend Engineer', company_name: 'Acme SaaS',
    description: 'Build and own the frontend of our B2B dashboard.',
    opportunity_type: 'contract', required_skills: ['react', 'typescript', 'css'],
    preferred_skills: ['next.js', 'tailwind', 'figma'], role_category: 'engineer',
    seniority_level: 'senior', rate_min: 120, rate_max: 160, currency: 'USD',
    remote_policy: 'remote', is_active: true, posted_at: makeWeek(1) + 'T00:00:00Z',
    fit: { id: 'f1', user_id: 'mock-user-001', opportunity_id: 'o1', fit_score: 91, skill_match: 95, signal_match: 82, trajectory_match: 88, rate_match: 90, breakdown: { matching_skills: ['react', 'typescript', 'css'], missing_skills: [], signal_notes: 'Composite: 74', trajectory_notes: 'Aligned with Senior trajectory', rate_notes: 'Rate within range' }, computed_at: new Date().toISOString() },
  },
  {
    id: 'o2', title: 'Staff Engineer — Platform', company_name: 'Scale Inc',
    description: 'Architect and lead our platform modernization. Mentor 4 engineers.',
    opportunity_type: 'full_time', required_skills: ['systems design', 'mentoring', 'architecture'],
    preferred_skills: ['typescript', 'distributed systems'], role_category: 'engineer',
    seniority_level: 'staff', rate_min: 160, rate_max: 200, currency: 'USD',
    remote_policy: 'remote', is_active: true, posted_at: makeWeek(0) + 'T00:00:00Z',
    fit: { id: 'f2', user_id: 'mock-user-001', opportunity_id: 'o2', fit_score: 62, skill_match: 45, signal_match: 78, trajectory_match: 85, rate_match: 72, breakdown: { matching_skills: [], missing_skills: ['systems design', 'mentoring', 'architecture'], signal_notes: 'Good signal for growth trajectory', trajectory_notes: 'On the path to Staff — 14 months out', rate_notes: 'Above current rate' }, computed_at: new Date().toISOString() },
  },
  {
    id: 'o3', title: 'Full-Stack Engineer — Early Stage', company_name: 'Stealth AI',
    description: 'Build 0→1 as the first engineering hire. Own frontend and backend.',
    opportunity_type: 'full_time', required_skills: ['react', 'node.js', 'postgresql'],
    preferred_skills: ['next.js', 'typescript'], role_category: 'engineer',
    seniority_level: 'mid', rate_min: 80, rate_max: 120, currency: 'USD',
    remote_policy: 'remote', is_active: true, posted_at: makeWeek(2) + 'T00:00:00Z',
    fit: { id: 'f3', user_id: 'mock-user-001', opportunity_id: 'o3', fit_score: 79, skill_match: 80, signal_match: 74, trajectory_match: 60, rate_match: 70, breakdown: { matching_skills: ['react', 'postgresql'], missing_skills: ['node.js'], signal_notes: 'Strong composite', trajectory_notes: 'Below current trajectory', rate_notes: 'Below your rate range' }, computed_at: new Date().toISOString() },
  },
  {
    id: 'o4', title: 'Product Designer — Design Systems', company_name: 'Flux Design',
    description: 'Own our design system used by 3 product teams.',
    opportunity_type: 'contract', required_skills: ['figma', 'design systems', 'ui'],
    preferred_skills: ['react', 'accessibility'], role_category: 'designer',
    seniority_level: 'senior', rate_min: 100, rate_max: 140, currency: 'USD',
    remote_policy: 'remote', is_active: true, posted_at: makeWeek(1) + 'T00:00:00Z',
    fit: { id: 'f4', user_id: 'mock-user-001', opportunity_id: 'o4', fit_score: 55, skill_match: 50, signal_match: 70, trajectory_match: 40, rate_match: 80, breakdown: { matching_skills: ['figma'], missing_skills: ['design systems (primary)', 'ui focus'], signal_notes: 'Signal solid but different domain', trajectory_notes: 'Outside primary trajectory', rate_notes: 'Rate compatible' }, computed_at: new Date().toISOString() },
  },
  {
    id: 'o5', title: 'Tech Lead — Consumer Product', company_name: 'Vibe Corp',
    description: 'Lead a team of 3 engineers building a consumer app.',
    opportunity_type: 'full_time', required_skills: ['react', 'typescript', 'leadership'],
    preferred_skills: ['next.js', 'product thinking'], role_category: 'engineer',
    seniority_level: 'senior', rate_min: 130, rate_max: 170, currency: 'USD',
    remote_policy: 'hybrid', is_active: true, posted_at: makeWeek(0) + 'T00:00:00Z',
    fit: { id: 'f5', user_id: 'mock-user-001', opportunity_id: 'o5', fit_score: 74, skill_match: 75, signal_match: 78, trajectory_match: 82, rate_match: 75, breakdown: { matching_skills: ['react', 'typescript'], missing_skills: ['leadership (formal)'], signal_notes: 'Rising signal trend', trajectory_notes: 'Tech Lead is in trajectory predictions', rate_notes: 'Slightly above range' }, computed_at: new Date().toISOString() },
  },
]
