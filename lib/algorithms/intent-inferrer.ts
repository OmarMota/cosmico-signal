import type { SignalEvent, SignalProfile } from '../types/signal.types'
import type { InferredIntent, IntentType } from '../types/intent.types'
import type { Profile } from '../types/profile.types'

interface InferenceRule {
  intentType: IntentType
  check: (events: SignalEvent[], profile: SignalProfile, userProfile: Profile) => number | null
}

// Returns confidence 0-1 or null if rule doesn't apply
const INFERENCE_RULES: InferenceRule[] = [
  {
    intentType: 'seniority_advance',
    check: (events, signal) => {
      const growthEvents = events.filter(
        e => e.dimension === 'growth' && e.recorded_at > threeMonthsAgo()
      )
      if (growthEvents.length < 3) return null
      if (signal.growth < 60) return null
      const avgGrowth = growthEvents.reduce((s, e) => s + e.raw_value, 0) / growthEvents.length
      return avgGrowth > 0.7 ? 0.75 : avgGrowth > 0.5 ? 0.55 : null
    },
  },
  {
    intentType: 'skill_acquire',
    check: (events) => {
      const skillEvents = events.filter(
        e => e.event_type === 'skill_demonstrated' && e.recorded_at > threeMonthsAgo()
      )
      if (skillEvents.length < 2) return null
      return Math.min(0.4 + skillEvents.length * 0.1, 0.85)
    },
  },
  {
    intentType: 'rate_increase',
    check: (events, signal, profile) => {
      if (signal.composite_score < 65) return null
      if (signal.score_trend !== 'rising') return null
      // If they have been consistently delivering and signal is high
      return signal.composite_score > 75 ? 0.7 : 0.55
    },
  },
  {
    intentType: 'freelance_launch',
    check: (events, signal, profile) => {
      if (profile.availability === 'unavailable') return null
      const recentActivity = events.filter(e => e.recorded_at > oneMonthAgo()).length
      if (recentActivity < 5) return null
      return 0.5
    },
  },
]

export function inferIntents(
  userId: string,
  events: SignalEvent[],
  signalProfile: SignalProfile,
  userProfile: Profile
): Array<Omit<InferredIntent, 'id' | 'inferred_at'>> {
  const results: Array<Omit<InferredIntent, 'id' | 'inferred_at'>> = []

  for (const rule of INFERENCE_RULES) {
    const confidence = rule.check(events, signalProfile, userProfile)
    if (confidence !== null && confidence >= 0.5) {
      results.push({
        user_id: userId,
        intent_type: rule.intentType,
        confidence,
        evidence: buildEvidence(rule.intentType, events, signalProfile),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        is_surfaced: false,
      })
    }
  }

  return results.sort((a, b) => b.confidence - a.confidence)
}

function buildEvidence(
  intentType: IntentType,
  events: SignalEvent[],
  signal: SignalProfile
): string[] {
  switch (intentType) {
    case 'seniority_advance':
      return [
        `Growth score: ${Math.round(signal.growth)}`,
        `Consistently demonstrating new skills`,
      ]
    case 'skill_acquire':
      return [`${events.filter(e => e.event_type === 'skill_demonstrated').length} skill events recorded`]
    case 'rate_increase':
      return [
        `Composite score: ${Math.round(signal.composite_score)}`,
        `Trend: ${signal.score_trend}`,
      ]
    case 'freelance_launch':
      return ['High recent activity', 'Available for work']
    default:
      return []
  }
}

function threeMonthsAgo(): string {
  return new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
}

function oneMonthAgo(): string {
  return new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
}
