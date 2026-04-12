'use client'
import type { SignalAggregate } from '@/lib/types/signal.types'

interface Props {
  data: SignalAggregate[]
  height?: number
  width?: number
  showGrid?: boolean
}

export function SignalSparkline({ data, height = 120, width = 400, showGrid = true }: Props) {
  if (data.length < 2) return null

  const scores = data.map(d => d.composite_score)
  const min = Math.min(...scores) - 5
  const max = Math.max(...scores) + 5
  const range = max - min || 1

  const pad = { left: 28, right: 12, top: 10, bottom: 22 }
  const innerW = width - pad.left - pad.right
  const innerH = height - pad.top - pad.bottom

  const toX = (i: number) => pad.left + (i / (data.length - 1)) * innerW
  const toY = (v: number) => pad.top + innerH - ((v - min) / range) * innerH

  // Build SVG path
  const linePath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(d.composite_score).toFixed(1)}`)
    .join(' ')

  // Area fill
  const areaPath = [
    ...data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(d.composite_score).toFixed(1)}`),
    `L ${toX(data.length - 1).toFixed(1)} ${(pad.top + innerH).toFixed(1)}`,
    `L ${toX(0).toFixed(1)} ${(pad.top + innerH).toFixed(1)}`,
    'Z',
  ].join(' ')

  // Y-axis labels
  const yTicks = [min + range * 0.25, min + range * 0.5, min + range * 0.75].map(v => Math.round(v))

  // X-axis labels (show every 3rd)
  const xLabels = data
    .map((d, i) => ({ i, label: d.week_start.slice(5) })) // MM-DD
    .filter((_, i) => i === 0 || i === Math.floor(data.length / 2) || i === data.length - 1)

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-label="Signal timeline"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="hsl(263,70%,62%)" stopOpacity="0.20" />
          <stop offset="100%" stopColor="hsl(263,70%,62%)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {showGrid && yTicks.map(v => (
        <line
          key={v}
          x1={pad.left} y1={toY(v).toFixed(1)}
          x2={pad.left + innerW} y2={toY(v).toFixed(1)}
          stroke="hsla(224,12%,28%,0.5)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
      ))}

      {/* Y-axis labels */}
      {yTicks.map(v => (
        <text
          key={v}
          x={pad.left - 6}
          y={parseFloat(toY(v).toFixed(1)) + 4}
          textAnchor="end"
          fontSize="8"
          fill="hsl(218,10%,40%)"
          fontFamily="Inter,sans-serif"
        >
          {v}
        </text>
      ))}

      {/* Area fill */}
      <path d={areaPath} fill="url(#sparkGrad)" />

      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke="hsl(263,70%,62%)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Dots at each data point */}
      {data.map((d, i) => (
        <circle
          key={i}
          cx={toX(i).toFixed(1)}
          cy={toY(d.composite_score).toFixed(1)}
          r="2.5"
          fill="hsl(263,70%,62%)"
          stroke="hsl(224,18%,9%)"
          strokeWidth="1.2"
        />
      ))}

      {/* Latest score label */}
      <text
        x={toX(data.length - 1)}
        y={toY(scores[scores.length - 1]) - 8}
        textAnchor="middle"
        fontSize="9"
        fontWeight="600"
        fill="hsl(263,70%,72%)"
        fontFamily="Inter,sans-serif"
      >
        {scores[scores.length - 1].toFixed(1)}
      </text>

      {/* X-axis labels */}
      {xLabels.map(({ i, label }) => (
        <text
          key={i}
          x={toX(i)}
          y={height - 4}
          textAnchor="middle"
          fontSize="8"
          fill="hsl(218,10%,38%)"
          fontFamily="Inter,sans-serif"
        >
          {label}
        </text>
      ))}
    </svg>
  )
}
