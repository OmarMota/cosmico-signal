'use client'
import { useRef } from 'react'
import { useAuthStore } from '@/lib/stores/auth.store'
import { GlowCard } from '@/components/shared/GlowCard'
import { SignalRadar } from '@/components/signal/SignalRadar'
import { SignalSparkline } from '@/components/signal/SignalSparkline'
import { MOCK_SIGNAL, MOCK_HISTORY } from '@/lib/mock/data'
import {
  DIMENSION_LABELS,
  DIMENSION_DESCRIPTIONS,
  DIMENSION_COLORS,
  type SignalProfile,
  type SignalDimension,
} from '@/lib/types/signal.types'
import { usePageEnter } from '@/lib/gsap/hooks'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { fadeUpEnter } from '@/lib/gsap/animations'

gsap.registerPlugin(useGSAP)

const DIMS: SignalDimension[] = ['reliability', 'performance', 'responsiveness', 'feedback', 'growth']

const TREND_LABELS = { rising: '↑ Rising', falling: '↓ Falling', stable: '→ Stable' }
const TREND_COLORS = {
  rising:  'text-[hsl(142,71%,45%)]',
  falling: 'text-[hsl(0,62%,50%)]',
  stable:  'text-muted-foreground',
}

function DimensionBar({ dim, score }: { dim: SignalDimension; score: number }) {
  const color = DIMENSION_COLORS[dim]
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-foreground">{DIMENSION_LABELS[dim]}</span>
        <span className="text-xs font-mono font-semibold" style={{ color }}>{score.toFixed(1)}</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${score}%`, background: color }}
        />
      </div>
      <p className="text-[11px] text-muted-foreground/60">{DIMENSION_DESCRIPTIONS[dim]}</p>
    </div>
  )
}

export default function SignalPage() {
  const { partialProfile } = useAuthStore()
  const containerRef = useRef<HTMLDivElement>(null)
  usePageEnter(containerRef, { stagger: 0.09, selector: '[data-card]' })

  // Use Alex's mock data for existing profile, or neutral data for new users
  const signal: SignalProfile = MOCK_SIGNAL

  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  })()

  const displayName = partialProfile?.first_name ?? partialProfile?.display_name?.split(' ')[0] ?? 'there'

  return (
    <div ref={containerRef} className="space-y-6">

      {/* Header */}
      <div data-card className="opacity-0">
        <p className="text-sm text-muted-foreground mb-0.5">{greeting}, {displayName}</p>
        <h1 className="text-2xl font-bold text-foreground">My Signal</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Your professional signal score and dimension breakdown</p>
      </div>

      {/* Score hero */}
      <div data-card className="opacity-0">
        <GlowCard className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Composite Signal</p>
              <div className="flex items-end gap-3">
                <span className="text-6xl font-bold text-foreground tabular-nums">
                  {signal.composite_score.toFixed(1)}
                </span>
                <div className="mb-2">
                  <p className={cn('text-sm font-semibold', TREND_COLORS[signal.score_trend])}>
                    {TREND_LABELS[signal.score_trend]}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Top {100 - signal.percentile_rank}% of professionals
                  </p>
                </div>
              </div>
            </div>

            {/* Mini dimension pills */}
            <div className="hidden sm:flex flex-col gap-1.5 mt-1">
              {DIMS.map(d => (
                <div key={d} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: DIMENSION_COLORS[d] }} />
                  <span className="text-[11px] text-muted-foreground w-24">{DIMENSION_LABELS[d]}</span>
                  <span className="text-[11px] font-mono text-foreground">{signal[d].toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>
        </GlowCard>
      </div>

      {/* Radar + 12-week sparkline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div data-card className="opacity-0">
          <GlowCard className="p-5">
            <h2 className="text-sm font-semibold text-foreground mb-1">Signal Shape</h2>
            <p className="text-xs text-muted-foreground mb-4">vs. cohort average (dashed)</p>
            <div className="flex justify-center">
              <SignalRadar profile={signal} size={220} />
            </div>
          </GlowCard>
        </div>

        <div data-card className="opacity-0">
          <GlowCard className="p-5">
            <h2 className="text-sm font-semibold text-foreground mb-1">12-Week Trend</h2>
            <p className="text-xs text-muted-foreground mb-4">Composite score over time</p>
            <SignalSparkline data={MOCK_HISTORY} height={140} showGrid />
          </GlowCard>
        </div>
      </div>

      {/* Dimension breakdown */}
      <div data-card className="opacity-0">
        <GlowCard className="p-6">
          <h2 className="text-sm font-semibold text-foreground mb-5">Dimension Breakdown</h2>
          <div className="space-y-5">
            {DIMS.map(d => (
              <DimensionBar key={d} dim={d} score={signal[d]} />
            ))}
          </div>
        </GlowCard>
      </div>

      {/* Percentile card */}
      <div data-card className="opacity-0">
        <GlowCard className="p-5" variant="trajectory">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-foreground mb-1">Percentile Rank</h2>
              <p className="text-xs text-muted-foreground">Compared to professionals in your category</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-trajectory">{signal.percentile_rank}th</p>
              <p className="text-xs text-muted-foreground">percentile</p>
            </div>
          </div>
          <div className="mt-4 h-2 rounded-full bg-muted/40 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-signal to-trajectory"
              style={{ width: `${signal.percentile_rank}%` }}
            />
          </div>
        </GlowCard>
      </div>
    </div>
  )
}
