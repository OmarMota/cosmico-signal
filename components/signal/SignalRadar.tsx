'use client'
import type { SignalProfile } from '@/lib/types/signal.types'
import { DIMENSION_LABELS, DIMENSION_COLORS } from '@/lib/types/signal.types'

const DIMS = ['reliability', 'performance', 'responsiveness', 'feedback', 'growth'] as const

function polarToXY(angleDeg: number, r: number, cx: number, cy: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

interface Props {
  profile: SignalProfile
  size?: number
}

export function SignalRadar({ profile, size = 220 }: Props) {
  const cx = size / 2
  const cy = size / 2
  const maxR = size * 0.38
  const step = 360 / DIMS.length
  const rings = [0.25, 0.5, 0.75, 1]

  // Build polygon points for user score
  const userPoints = DIMS.map((d, i) => {
    const val = profile[d] / 100
    const { x, y } = polarToXY(i * step, val * maxR, cx, cy)
    return `${x},${y}`
  }).join(' ')

  // Cohort average (demo: flat 65%)
  const cohortPoints = DIMS.map((_, i) => {
    const { x, y } = polarToXY(i * step, 0.65 * maxR, cx, cy)
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="Signal radar">
      {/* Grid rings */}
      {rings.map(r => {
        const pts = DIMS.map((_, i) => {
          const { x, y } = polarToXY(i * step, r * maxR, cx, cy)
          return `${x},${y}`
        }).join(' ')
        return (
          <polygon
            key={r}
            points={pts}
            fill="none"
            stroke="hsla(224, 12%, 28%, 0.6)"
            strokeWidth="1"
          />
        )
      })}

      {/* Axis lines */}
      {DIMS.map((_, i) => {
        const { x, y } = polarToXY(i * step, maxR, cx, cy)
        return (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={x} y2={y}
            stroke="hsla(224, 12%, 28%, 0.5)"
            strokeWidth="1"
          />
        )
      })}

      {/* Cohort polygon */}
      <polygon
        points={cohortPoints}
        fill="hsla(263, 70%, 62%, 0.04)"
        stroke="hsla(263, 70%, 62%, 0.25)"
        strokeWidth="1"
        strokeDasharray="3 3"
      />

      {/* User polygon */}
      <polygon
        points={userPoints}
        fill="hsla(263, 70%, 62%, 0.15)"
        stroke="hsl(263, 70%, 62%)"
        strokeWidth="1.5"
      />

      {/* Dots */}
      {DIMS.map((d, i) => {
        const val = profile[d] / 100
        const { x, y } = polarToXY(i * step, val * maxR, cx, cy)
        return (
          <circle
            key={d}
            cx={x} cy={y}
            r={3.5}
            fill="hsl(263, 70%, 62%)"
            stroke="hsl(224, 18%, 9%)"
            strokeWidth="1.5"
          />
        )
      })}

      {/* Labels */}
      {DIMS.map((d, i) => {
        const { x, y } = polarToXY(i * step, maxR + 16, cx, cy)
        const anchor = x < cx - 4 ? 'end' : x > cx + 4 ? 'start' : 'middle'
        return (
          <text
            key={d}
            x={x} y={y + 4}
            textAnchor={anchor}
            fontSize="9"
            fill="hsl(218, 10%, 55%)"
            fontFamily="Inter, sans-serif"
          >
            {DIMENSION_LABELS[d]}
          </text>
        )
      })}
    </svg>
  )
}
