import type { ScoreTrend } from '../types/signal.types'

export function formatScore(score: number): string {
  return Math.round(score).toString()
}

export function formatScoreDecimal(score: number): string {
  return score.toFixed(1)
}

export function formatPercentile(rank: number): string {
  const rounded = Math.round(rank)
  if (rounded >= 99) return 'Top 1%'
  if (rounded >= 95) return 'Top 5%'
  if (rounded >= 90) return 'Top 10%'
  if (rounded >= 75) return 'Top 25%'
  if (rounded >= 50) return 'Top 50%'
  return `${100 - rounded}th percentile`
}

export function getTrendLabel(trend: ScoreTrend): string {
  switch (trend) {
    case 'rising': return '↑ Rising'
    case 'falling': return '↓ Falling'
    case 'stable': return '→ Stable'
  }
}

export function getTrendColor(trend: ScoreTrend): string {
  switch (trend) {
    case 'rising': return 'text-emerald-400'
    case 'falling': return 'text-red-400'
    case 'stable': return 'text-slate-400'
  }
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-400'
  if (score >= 65) return 'text-violet-400'
  if (score >= 45) return 'text-amber-400'
  return 'text-slate-400'
}

export function getScoreLabel(score: number): string {
  if (score >= 85) return 'Exceptional'
  if (score >= 75) return 'Strong'
  if (score >= 60) return 'Good'
  if (score >= 45) return 'Developing'
  return 'Establishing'
}

export function formatRate(min?: number, max?: number, currency = 'USD'): string {
  if (!min && !max) return 'Rate negotiable'
  const symbol = currency === 'USD' ? '$' : currency
  if (min && max) return `${symbol}${min}–${symbol}${max}/hr`
  if (min) return `From ${symbol}${min}/hr`
  return `Up to ${symbol}${max}/hr`
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}
