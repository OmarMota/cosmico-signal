import type {
  SignalEvent,
  SignalAggregate,
  SignalProfile,
  SignalDimension,
  ScoreTrend,
  CreateSignalEventInput,
} from '../types/signal.types'
import { DIMENSION_WEIGHTS } from '../types/signal.types'

// =============================================
// SOURCE CREDIBILITY MULTIPLIERS
// =============================================
const SOURCE_MULTIPLIERS: Record<string, number> = {
  client: 1.2,
  peer: 1.1,
  platform: 1.0,
  mentor: 1.0,
  system: 1.0,
  self: 0.7,
}

// =============================================
// EVENT TYPE → DIMENSION MAPPING
// =============================================
export const EVENT_DIMENSION_MAP: Record<string, SignalDimension> = {
  task_completed: 'performance',
  delivery_on_time: 'reliability',
  delivery_late: 'reliability',
  feedback_received: 'feedback',
  response_logged: 'responsiveness',
  learning_completed: 'growth',
  mentor_session_completed: 'growth',
  skill_demonstrated: 'growth',
  review_submitted: 'feedback',
  collaboration_logged: 'performance',
  availability_updated: 'reliability',
  goal_updated: 'growth',
}

// =============================================
// PASS 1: Normalize a single signal event
// =============================================
export function normalizeSignalEvent(
  event: CreateSignalEventInput,
  recordedAt: Date = new Date()
): number {
  const sourceMultiplier = SOURCE_MULTIPLIERS[event.source] ?? 1.0

  // Recency boost within 72 hours
  const hoursSince = 0 // newly created — max boost
  const recencyBoost = 1 + 0.1 * (1 - hoursSince / 72)

  const weight = event.weight ?? 1.0
  const normalized = event.raw_value * sourceMultiplier * recencyBoost * weight

  return Math.min(Math.max(normalized, 0), 1)
}

// =============================================
// PASS 2: Compute weekly aggregate from events
// =============================================
export function computeWeeklyAggregate(
  events: SignalEvent[],
  previousAggregates: SignalAggregate[],
  weekStart: Date
): Omit<SignalAggregate, 'id' | 'user_id' | 'computed_at'> {
  const dimensions: SignalDimension[] = ['reliability', 'performance', 'responsiveness', 'feedback', 'growth']
  const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000)

  const scores: Record<SignalDimension, number> = {
    reliability: 50,
    performance: 50,
    responsiveness: 50,
    feedback: 50,
    growth: 50,
  }

  for (const dim of dimensions) {
    const dimEvents = events.filter(e => e.dimension === dim)

    if (dimEvents.length === 0) {
      // Decay previous score by 5% per week with no new data
      const prevScore = getPreviousScore(previousAggregates, dim)
      scores[dim] = prevScore * 0.95
      continue
    }

    // Exponential recency weighting within the week
    const sortedEvents = [...dimEvents].sort(
      (a, b) => new Date(a.recorded_at).getTime() - new Date(b.recorded_at).getTime()
    )

    let weightedSum = 0
    let weightSum = 0

    for (const event of sortedEvents) {
      const eventTime = new Date(event.recorded_at)
      const ageDays = (weekEnd.getTime() - eventTime.getTime()) / (1000 * 60 * 60 * 24)
      const timeWeight = Math.exp(-0.2 * ageDays)
      const eventValue = event.normalized_value ?? event.raw_value
      const eventWeight = event.weight ?? 1.0

      weightedSum += eventValue * timeWeight * eventWeight
      weightSum += timeWeight * eventWeight
    }

    const rawScore = weightSum > 0 ? weightedSum / weightSum : 0.5

    // EWMA smoothing over last 4 weeks
    const prevScores = previousAggregates
      .slice(0, 4)
      .map(a => (a[dim] ?? 50) / 100)

    const alpha = 0.4
    let ewma = rawScore
    if (prevScores.length > 0) {
      const prevEwma = prevScores[0]
      ewma = alpha * rawScore + (1 - alpha) * prevEwma
    }

    scores[dim] = clamp(ewma * 100, 0, 100)
  }

  // Composite score
  const composite = dimensions.reduce(
    (sum, dim) => sum + scores[dim] * DIMENSION_WEIGHTS[dim],
    0
  )

  return {
    week_start: weekStart.toISOString().split('T')[0],
    reliability: round2(scores.reliability),
    performance: round2(scores.performance),
    responsiveness: round2(scores.responsiveness),
    feedback: round2(scores.feedback),
    growth: round2(scores.growth),
    composite_score: round2(composite),
    event_count: events.length,
  }
}

// =============================================
// Compute signal profile from aggregates
// =============================================
export function computeSignalProfile(
  aggregates: SignalAggregate[],
  cohortComposites: number[]
): Omit<SignalProfile, 'user_id' | 'last_event_at'> {
  if (aggregates.length === 0) {
    return {
      reliability: 50,
      performance: 50,
      responsiveness: 50,
      feedback: 50,
      growth: 50,
      composite_score: 50,
      score_trend: 'stable',
      percentile_rank: 50,
      last_computed: new Date().toISOString(),
    }
  }

  const latest = aggregates[0]

  // Trend: compare latest vs 4-week average
  const prev4 = aggregates.slice(1, 5)
  const prev4Avg =
    prev4.length > 0
      ? prev4.reduce((s, a) => s + a.composite_score, 0) / prev4.length
      : latest.composite_score

  let trend: ScoreTrend = 'stable'
  const diff = latest.composite_score - prev4Avg
  if (diff > 2) trend = 'rising'
  else if (diff < -2) trend = 'falling'

  // Percentile rank
  const composite = latest.composite_score
  const below = cohortComposites.filter(c => c < composite).length
  const percentile =
    cohortComposites.length > 0
      ? round2((below / cohortComposites.length) * 100)
      : 50

  return {
    reliability: round2(latest.reliability),
    performance: round2(latest.performance),
    responsiveness: round2(latest.responsiveness),
    feedback: round2(latest.feedback),
    growth: round2(latest.growth),
    composite_score: round2(composite),
    score_trend: trend,
    percentile_rank: percentile,
    last_computed: new Date().toISOString(),
  }
}

// =============================================
// Helpers
// =============================================
function getPreviousScore(aggregates: SignalAggregate[], dim: SignalDimension): number {
  if (aggregates.length === 0) return 50
  return aggregates[0][dim] ?? 50
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function round2(value: number): number {
  return Math.round(value * 100) / 100
}
