import type { SignalAggregate, SignalProfile } from '../types/signal.types'
import type {
  TrajectorySnapshot,
  TrajectoryPhase,
  DetectedPattern,
  RolePrediction,
  PatternType,
} from '../types/trajectory.types'

// =============================================
// ROLE GRAPH: career progression edges
// =============================================
const ROLE_GRAPH: Record<string, Record<string, string[]>> = {
  engineer: {
    junior: ['Mid-Level Engineer', 'Full-Stack Engineer'],
    mid: ['Senior Engineer', 'Tech Lead', 'Staff Engineer'],
    senior: ['Staff Engineer', 'Principal Engineer', 'Engineering Manager'],
    staff: ['Principal Engineer', 'Distinguished Engineer', 'VP Engineering'],
    principal: ['Distinguished Engineer', 'CTO', 'Consultant'],
  },
  designer: {
    junior: ['Mid-Level Designer', 'UX Designer'],
    mid: ['Senior Designer', 'Design Lead'],
    senior: ['Staff Designer', 'Design Manager', 'Principal Designer'],
    staff: ['Principal Designer', 'VP Design'],
    principal: ['Chief Design Officer', 'Consultant'],
  },
  pm: {
    junior: ['Product Manager'],
    mid: ['Senior PM', 'Group PM'],
    senior: ['Staff PM', 'Director of Product'],
    staff: ['VP Product', 'CPO'],
    principal: ['CPO', 'Board Advisor'],
  },
  data: {
    junior: ['Data Analyst', 'Data Engineer'],
    mid: ['Senior Data Engineer', 'Analytics Engineer'],
    senior: ['Staff Data Engineer', 'Data Architect'],
    staff: ['Principal Data Engineer', 'Head of Data'],
    principal: ['Chief Data Officer', 'Consultant'],
  },
}

// Score thresholds to reach each next role
const ROLE_COMPOSITE_THRESHOLDS: Record<string, number> = {
  'Mid-Level Engineer': 55,
  'Senior Engineer': 65,
  'Staff Engineer': 75,
  'Principal Engineer': 83,
  'Tech Lead': 70,
  'Engineering Manager': 72,
  'Senior Designer': 65,
  'Staff Designer': 75,
  'Senior PM': 65,
  'Director of Product': 75,
}

const MAX_REALISTIC_SLOPE = 3.0 // max 3 composite points/week

// =============================================
// LINEAR REGRESSION (least squares)
// =============================================
function linearRegressionSlope(y: number[]): number {
  const n = y.length
  if (n < 2) return 0
  const x = y.map((_, i) => i)
  const sumX = x.reduce((a, b) => a + b, 0)
  const sumY = y.reduce((a, b) => a + b, 0)
  const sumXY = x.reduce((a, xi, i) => a + xi * y[i], 0)
  const sumXX = x.reduce((a, xi) => a + xi * xi, 0)
  const denom = n * sumXX - sumX * sumX
  if (denom === 0) return 0
  return (n * sumXY - sumX * sumY) / denom
}

// =============================================
// STEP 1: Growth velocity
// =============================================
export function computeGrowthVelocity(aggregates: SignalAggregate[]): {
  velocity: number
  momentum: number
} {
  if (aggregates.length < 4) return { velocity: 0, momentum: 0 }

  const scores = aggregates.map(a => a.composite_score).reverse() // oldest → newest
  const slope = linearRegressionSlope(scores)
  const velocity = Math.min(Math.max(slope / MAX_REALISTIC_SLOPE, -1), 1)

  // Momentum: recent 4wk slope vs overall slope
  const recentScores = scores.slice(-4)
  const recentSlope = linearRegressionSlope(recentScores)
  const momentum = Math.min(Math.max((recentSlope - slope) / MAX_REALISTIC_SLOPE, -1), 1)

  return {
    velocity: round3(velocity),
    momentum: round3(momentum),
  }
}

// =============================================
// STEP 2: Detect patterns
// =============================================
export function detectPatterns(
  aggregates: SignalAggregate[],
  recentSkillCount = 0
): DetectedPattern[] {
  const patterns: DetectedPattern[] = []
  if (aggregates.length < 4) return patterns

  const recent = aggregates.slice(0, 8).reverse() // oldest to newest in window
  const latest = aggregates[0]

  // --- TECHNICAL DEEPENING ---
  const growthValues = recent.map(a => a.growth)
  const perfValues = recent.map(a => a.performance)
  const growthTrend = linearRegressionSlope(growthValues)
  const perfTrend = linearRegressionSlope(perfValues)

  if (growthTrend > 0.3 && perfTrend > 0.2 && recentSkillCount >= 2) {
    patterns.push({
      type: 'technical_deepening',
      confidence: round3(Math.min(0.4 + Math.abs(growthTrend) * 0.6, 0.95)),
      evidence: ['Growth dimension rising', 'Performance improving', 'New skills added recently'],
    })
  }

  // --- RELIABILITY BUILDING ---
  const reliabilityValues = recent.map(a => a.reliability)
  const streak = consecutiveWeeksAbove(reliabilityValues, 75)
  if (streak >= 6) {
    patterns.push({
      type: 'reliability_building',
      confidence: round3(Math.min(0.5 + streak / 20, 0.95)),
      evidence: [`${streak} consecutive weeks of high reliability`],
    })
  }

  // --- LEADERSHIP EMERGENCE ---
  const feedbackTrend = linearRegressionSlope(recent.map(a => a.feedback))
  if (feedbackTrend > 0.2 && latest.feedback > 65) {
    patterns.push({
      type: 'leadership_emergence',
      confidence: round3(Math.min(0.4 + feedbackTrend * 0.5, 0.9)),
      evidence: ['Feedback dimension rising', 'High feedback score maintained'],
    })
  }

  // --- PLATEAU ---
  const { velocity } = computeGrowthVelocity(aggregates)
  const allFlat = recent.every(a => {
    const dims = [a.reliability, a.performance, a.responsiveness, a.feedback, a.growth]
    const range = Math.max(...dims) - Math.min(...dims)
    return range < 5
  })
  if (Math.abs(velocity) < 0.05 && recent.length >= 8 && allFlat) {
    patterns.push({
      type: 'plateau',
      confidence: 0.85,
      evidence: ['All dimensions flat for 8+ weeks', 'Growth velocity near zero'],
    })
  }

  // --- SPECIALIZATION ---
  const dimScores = [
    latest.reliability,
    latest.performance,
    latest.responsiveness,
    latest.feedback,
    latest.growth,
  ]
  const maxScore = Math.max(...dimScores)
  const avgOthers = (dimScores.reduce((a, b) => a + b, 0) - maxScore) / (dimScores.length - 1)
  if (maxScore - avgOthers > 20) {
    const dimNames = ['reliability', 'performance', 'responsiveness', 'feedback', 'growth']
    const dominantDim = dimNames[dimScores.indexOf(maxScore)]
    patterns.push({
      type: 'specialization',
      confidence: round3(Math.min(0.5 + (maxScore - avgOthers) / 60, 0.9)),
      evidence: [`${dominantDim} significantly above other dimensions`],
    })
  }

  // --- ACCELERATION ---
  const { momentum } = computeGrowthVelocity(aggregates)
  if (momentum > 0.3 && velocity > 0.1) {
    patterns.push({
      type: 'acceleration',
      confidence: round3(Math.min(0.4 + momentum * 0.6, 0.9)),
      evidence: ['Growth rate increasing', 'Recent momentum above trend'],
    })
  }

  return patterns
}

// =============================================
// STEP 3: Determine trajectory phase
// =============================================
export function detectPhase(
  composite: number,
  velocity: number,
  patterns: DetectedPattern[]
): TrajectoryPhase {
  const hasLeadership = patterns.some(p => p.type === 'leadership_emergence')
  const hasSpecialization = patterns.some(p => p.type === 'specialization')

  if (composite < 40) return 'establishing'
  if (composite >= 75 && velocity > 0.3) return 'pioneering'
  if (composite >= 75) return 'leading'
  if (composite >= 40 && composite < 75 && hasLeadership) return 'leading'
  if (composite >= 40 && composite < 75 && hasSpecialization) return 'specializing'
  return 'building'
}

// =============================================
// STEP 4: Predict future roles
// =============================================
export function predictRoles(
  roleCategory: string,
  seniorityLevel: string,
  composite: number,
  velocity: number,
  patterns: DetectedPattern[]
): RolePrediction[] {
  const graph = ROLE_GRAPH[roleCategory] ?? ROLE_GRAPH.engineer
  const adjacentRoles = graph[seniorityLevel] ?? []

  const hasLeadership = patterns.some(p => p.type === 'leadership_emergence')
  const hasSpecialization = patterns.some(p => p.type === 'specialization')

  return adjacentRoles
    .map(role => {
      let base = 0.5

      if (hasLeadership && role.toLowerCase().includes('lead')) base += 0.2
      if (hasLeadership && role.toLowerCase().includes('manager')) base += 0.15
      if (hasSpecialization && role.toLowerCase().includes('staff')) base += 0.15
      if (hasSpecialization && role.toLowerCase().includes('principal')) base += 0.1

      const confidence = clamp(base + velocity * 0.3, 0.05, 0.95)

      // Timeframe estimation
      const threshold = ROLE_COMPOSITE_THRESHOLDS[role] ?? 70
      const pointsNeeded = Math.max(threshold - composite, 5)
      const weeklyGain = velocity * MAX_REALISTIC_SLOPE
      const weeksNeeded = weeklyGain > 0 ? pointsNeeded / weeklyGain : 52
      const timeframeMonths = Math.max(weeksNeeded / 4.33, 3)

      return {
        role,
        confidence: round3(confidence),
        timeframe_months: Math.round(timeframeMonths),
      }
    })
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3)
}

// =============================================
// FULL TRAJECTORY DETECTION
// =============================================
export function detectTrajectory(
  userId: string,
  aggregates: SignalAggregate[],
  roleCategory: string,
  seniorityLevel: string,
  recentSkillCount = 0
): Omit<TrajectorySnapshot, 'id' | 'computed_at'> {
  const { velocity, momentum } = computeGrowthVelocity(aggregates)
  const patterns = detectPatterns(aggregates, recentSkillCount)
  const composite = aggregates[0]?.composite_score ?? 50
  const phase = detectPhase(composite, velocity, patterns)
  const rolePredictions = predictRoles(roleCategory, seniorityLevel, composite, velocity, patterns)

  return {
    user_id: userId,
    snapshot_date: new Date().toISOString().split('T')[0],
    current_phase: phase,
    growth_velocity: velocity,
    momentum_score: momentum,
    detected_patterns: patterns,
    role_predictions: rolePredictions,
  }
}

// =============================================
// Helpers
// =============================================
function consecutiveWeeksAbove(values: number[], threshold: number): number {
  let streak = 0
  for (let i = values.length - 1; i >= 0; i--) {
    if (values[i] >= threshold) streak++
    else break
  }
  return streak
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max)
}

function round3(v: number): number {
  return Math.round(v * 1000) / 1000
}
