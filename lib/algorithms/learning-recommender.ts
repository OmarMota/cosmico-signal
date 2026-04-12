import type { SignalProfile, SignalDimension } from '../types/signal.types'
import type { Intent } from '../types/intent.types'
import type { TrajectorySnapshot } from '../types/trajectory.types'
import type { LearningContent, LearningRecommendation, RecommendReason } from '../types/learning.types'
import type { Profile } from '../types/profile.types'

interface LearningGap {
  type: 'signal_deficit' | 'intent_skill_gap' | 'trajectory_support'
  dimension?: SignalDimension
  skill?: string
  severity: number  // 0.0 to 1.0
  urgency: 'high' | 'medium' | 'low'
}

// =============================================
// STEP 1: Compute gaps
// =============================================
export function computeLearningGaps(
  signalProfile: SignalProfile,
  intents: Intent[],
  trajectory: TrajectorySnapshot | null,
  userSkills: string[],
  cohortAverages: Partial<Record<SignalDimension, number>>
): LearningGap[] {
  const gaps: LearningGap[] = []
  const dimensions: SignalDimension[] = ['reliability', 'performance', 'responsiveness', 'feedback', 'growth']

  // --- Signal Deficit gaps ---
  for (const dim of dimensions) {
    const cohortAvg = cohortAverages[dim] ?? 60
    const userScore = signalProfile[dim]
    const deficit = cohortAvg - userScore

    if (deficit > 10) {
      gaps.push({
        type: 'signal_deficit',
        dimension: dim,
        severity: Math.min(deficit / 100, 1.0),
        urgency: deficit > 20 ? 'high' : 'medium',
      })
    }
  }

  // --- Intent skill gaps ---
  const skillSet = new Set(userSkills.map(s => s.toLowerCase()))
  for (const intent of intents.filter(i => i.status === 'active')) {
    for (const skill of intent.target_skills ?? []) {
      if (!skillSet.has(skill.toLowerCase())) {
        gaps.push({
          type: 'intent_skill_gap',
          skill,
          severity: intent.priority / 3,
          urgency: 'high',
        })
      }
    }
  }

  // --- Trajectory support gaps ---
  if (trajectory?.role_predictions?.length) {
    const topPrediction = trajectory.role_predictions[0]
    const roleSkillMap: Record<string, string[]> = {
      'Staff Engineer': ['systems design', 'mentoring', 'architecture'],
      'Engineering Manager': ['leadership', 'performance management', 'roadmapping'],
      'Senior Designer': ['design systems', 'stakeholder management', 'user research'],
      'Principal Engineer': ['technical strategy', 'cross-team influence', 'systems thinking'],
      'Director of Product': ['strategy', 'okrs', 'stakeholder management'],
    }

    const neededSkills = roleSkillMap[topPrediction.role] ?? []
    for (const skill of neededSkills) {
      if (!skillSet.has(skill.toLowerCase())) {
        gaps.push({
          type: 'trajectory_support',
          skill,
          severity: topPrediction.confidence * 0.8,
          urgency: 'medium',
        })
      }
    }
  }

  // Sort: urgency then severity
  const urgencyOrder = { high: 0, medium: 1, low: 2 }
  return gaps.sort(
    (a, b) =>
      urgencyOrder[a.urgency] - urgencyOrder[b.urgency] ||
      b.severity - a.severity
  )
}

// =============================================
// STEP 2: Score content against gaps
// =============================================
export function scoreContent(
  content: LearningContent,
  gaps: LearningGap[],
  profile: Profile
): { score: number; primaryReason: RecommendReason; reasonText: string } {
  let score = 0
  const reasons: Array<{ reason: RecommendReason; text: string; weight: number }> = []

  // Skill match
  const contentSkills = content.skill_tags.map(s => s.toLowerCase())
  for (const gap of gaps) {
    if (gap.skill && contentSkills.includes(gap.skill.toLowerCase())) {
      const boost = 30 * gap.severity
      score += boost

      const reason: RecommendReason =
        gap.type === 'intent_skill_gap'
          ? 'intent_support'
          : gap.type === 'trajectory_support'
          ? 'trajectory_aligned'
          : 'signal_gap'

      reasons.push({
        reason,
        text: buildReasonText(gap),
        weight: boost,
      })
    }
  }

  // Signal dimension match
  for (const gap of gaps.filter(g => g.type === 'signal_deficit')) {
    if (content.signal_dimension === gap.dimension) {
      const boost = 25 * gap.severity
      score += boost
      reasons.push({
        reason: 'signal_gap',
        text: `Strengthens your ${gap.dimension} signal`,
        weight: boost,
      })
    }
  }

  // Seniority fit
  if (!content.seniority_level.includes(profile.seniority_level)) {
    score *= 0.4
  }

  // Quality multiplier
  score *= 0.5 + content.quality_score * 0.5

  // Price penalty (prefer free for signal deficit)
  if (content.price_usd > 0) {
    score *= 1 - Math.min(content.price_usd / 200, 0.5)
  }

  // Find primary reason
  reasons.sort((a, b) => b.weight - a.weight)
  const primary = reasons[0]

  return {
    score: Math.min(Math.max(Math.round(score), 0), 100),
    primaryReason: primary?.reason ?? 'cohort_popular',
    reasonText: primary?.text ?? 'Recommended for your profile',
  }
}

// =============================================
// STEP 3: Generate final recommendations
// =============================================
export function generateRecommendations(
  userId: string,
  content: LearningContent[],
  gaps: LearningGap[],
  profile: Profile,
  completedIds: string[],
  dismissedIds: string[],
  limit = 10
): Array<Omit<LearningRecommendation, 'id' | 'recommended_at'>> {
  const excludeIds = new Set([...completedIds, ...dismissedIds])

  const scored = content
    .filter(c => !excludeIds.has(c.id))
    .map(c => ({ content: c, ...scoreContent(c, gaps, profile) }))
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)

  // Diversify: max 3 per reason type
  const countByReason: Record<string, number> = {}
  const diversified: typeof scored = []

  for (const item of scored) {
    const count = countByReason[item.primaryReason] ?? 0
    if (count < 3) {
      diversified.push(item)
      countByReason[item.primaryReason] = count + 1
    }
    if (diversified.length >= limit) break
  }

  return diversified.map(item => ({
    user_id: userId,
    content_id: item.content.id,
    reason_type: item.primaryReason,
    reason_text: item.reasonText,
    fit_score: item.score,
    is_dismissed: false,
  }))
}

function buildReasonText(gap: LearningGap): string {
  switch (gap.type) {
    case 'signal_deficit':
      return `Improves your ${gap.dimension} signal`
    case 'intent_skill_gap':
      return `Required for your goal: ${gap.skill}`
    case 'trajectory_support':
      return `Needed for your next role: ${gap.skill}`
    default:
      return 'Recommended for your profile'
  }
}
