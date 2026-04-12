'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { Zap, TrendingUp, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useAuthStore } from '@/lib/stores/auth.store'
import { GlowCard } from '@/components/shared/GlowCard'
import { SignalSparkline } from '@/components/signal/SignalSparkline'
import { usePageEnter } from '@/lib/gsap/hooks'
import { MOCK_SIGNAL, MOCK_HISTORY, MOCK_TRAJECTORY, MOCK_LEARNING } from '@/lib/mock/data'
import { DIMENSION_LABELS, DIMENSION_COLORS, PHASE_LABELS, PHASE_DESCRIPTIONS, type SignalDimension } from '@/lib/types/signal.types'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const DIMS: SignalDimension[] = ['reliability', 'performance', 'responsiveness', 'feedback', 'growth']
const TREND_COLORS = { rising: 'text-[hsl(142,71%,45%)]', falling: 'text-[hsl(0,62%,50%)]', stable: 'text-muted-foreground' }
const TREND_LABELS = { rising: '↑ Rising', falling: '↓ Falling', stable: '→ Stable' }

export default function DashboardPage() {
  const { partialProfile } = useAuthStore()
  const containerRef = useRef<HTMLDivElement>(null)
  usePageEnter(containerRef, { stagger: 0.09, selector: '[data-card]' })

  const signal   = MOCK_SIGNAL
  const history  = MOCK_HISTORY
  const traj     = MOCK_TRAJECTORY
  const topLearn = MOCK_LEARNING.slice(0, 2)

  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  })()

  const displayName = partialProfile?.first_name
    ?? partialProfile?.display_name?.split(' ')[0]
    ?? 'there'

  const availabilityColorMap: Record<string, string> = {
    available:   'bg-[hsl(142,71%,45%)]',
    open:        'bg-[hsl(38,92%,50%)]',
    unavailable: 'bg-muted-foreground',
  }
  const availability = partialProfile?.availability ?? 'open'
  const initials = ((partialProfile?.first_name?.[0] ?? '') + (partialProfile?.last_name?.[0] ?? '')).toUpperCase() || '?'

  return (
    <div ref={containerRef} className="space-y-6">

      {/* Greeting + user card */}
      <div data-card className="opacity-0">
        <GlowCard className="p-5">
          <div className="flex items-center gap-4">
            <div className="relative flex-none">
              <div className="absolute inset-0 rounded-full bg-signal/15 blur-md" />
              <div className="relative w-12 h-12 rounded-full border-2 border-signal/40 bg-gradient-to-br from-signal/30 to-trajectory/20 flex items-center justify-center overflow-hidden">
                {partialProfile?.avatar_url ? (
                  <img src={partialProfile.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-base font-bold text-signal-light">{initials}</span>
                )}
              </div>
              <span className={cn('absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card', availabilityColorMap[availability])} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">{greeting}</p>
              <h1 className="text-xl font-bold text-foreground truncate">{displayName}</h1>
              <p className="text-xs text-muted-foreground truncate">{partialProfile?.job_title ?? 'Professional'}</p>
            </div>
            <Link href="/signal" className="flex items-center gap-1.5 text-xs text-signal hover:text-signal-light transition-colors flex-none">
              View Signal <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </GlowCard>
      </div>

      {/* Signal score hero */}
      <div data-card className="opacity-0">
        <GlowCard className="p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">Composite Signal</p>
              <div className="flex items-end gap-2.5">
                <span className="text-5xl font-bold text-foreground tabular-nums">{signal.composite_score.toFixed(1)}</span>
                <div className="mb-1.5">
                  <p className={cn('text-sm font-semibold', TREND_COLORS[signal.score_trend])}>
                    {TREND_LABELS[signal.score_trend]}
                  </p>
                  <p className="text-xs text-muted-foreground">Top {100 - signal.percentile_rank}% of peers</p>
                </div>
              </div>
            </div>
          </div>
          <SignalSparkline data={history} height={130} showGrid />
        </GlowCard>
      </div>

      {/* Dimension mini-cards */}
      <div data-card className="opacity-0">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Signal Dimensions</h2>
        <div className="grid grid-cols-5 gap-2">
          {DIMS.map(d => {
            const score = signal[d]
            const color = DIMENSION_COLORS[d]
            const pct = score
            return (
              <div key={d} className="rounded-xl border border-border/50 bg-card/60 p-3 text-center">
                <p className="text-[10px] text-muted-foreground mb-1.5">{DIMENSION_LABELS[d]}</p>
                {/* Mini arc indicator */}
                <div className="relative flex justify-center mb-1">
                  <svg width="44" height="26" viewBox="0 0 44 26">
                    <path d="M4 24 A18 18 0 0 1 40 24" fill="none" stroke="hsla(224,12%,28%,0.6)" strokeWidth="3" strokeLinecap="round" />
                    <path
                      d="M4 24 A18 18 0 0 1 40 24"
                      fill="none"
                      stroke={color}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${(pct / 100) * 56.5} 56.5`}
                    />
                  </svg>
                </div>
                <p className="text-sm font-bold tabular-nums" style={{ color }}>{score.toFixed(0)}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Two-col: trajectory + next steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Trajectory snapshot */}
        <div data-card className="opacity-0">
          <GlowCard className="p-5 h-full" variant="trajectory">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-0.5">Trajectory</p>
                <h2 className="text-base font-bold text-foreground">{PHASE_LABELS[traj.current_phase]}</h2>
              </div>
              <Link href="/trajectory" className="text-xs text-trajectory hover:text-trajectory/80 transition-colors flex items-center gap-1">
                Details <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mb-4">{PHASE_DESCRIPTIONS[traj.current_phase]}</p>

            {/* Momentum bar */}
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-[11px] text-muted-foreground">Momentum</span>
                <span className="text-[11px] text-trajectory font-semibold">{Math.round(traj.momentum_score * 100)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-trajectory to-intent" style={{ width: `${traj.momentum_score * 100}%` }} />
              </div>
            </div>

            {/* Role predictions */}
            <div className="space-y-2">
              {traj.role_predictions.slice(0, 2).map(p => (
                <div key={p.role} className="flex items-center justify-between rounded-lg border border-trajectory/20 bg-trajectory/5 px-3 py-2">
                  <span className="text-xs font-medium text-foreground">{p.role}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground">{p.timeframe_months}mo</span>
                    <span className="text-[11px] font-semibold text-trajectory">{Math.round(p.confidence * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>

        {/* Recommended next steps */}
        <div data-card className="opacity-0">
          <GlowCard className="p-5 h-full">
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground">Next Steps</h2>
              <Link href="/learn" className="text-xs text-signal hover:text-signal-light transition-colors flex items-center gap-1">
                All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {topLearn.map(rec => {
                const typeIcon = { article: '📄', course: '🎓', video: '▶️' }[rec.content.content_type] ?? '📚'
                return (
                  <div key={rec.id} className="flex items-start gap-3 rounded-xl border border-border/50 bg-card/40 p-3">
                    <span className="text-base flex-none mt-0.5">{typeIcon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{rec.content.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{rec.reason_text}</p>
                    </div>
                    <span className="text-[11px] font-bold text-signal flex-none">{rec.fit_score}%</span>
                  </div>
                )
              })}
            </div>
          </GlowCard>
        </div>
      </div>

      {/* Quick links */}
      <div data-card className="opacity-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { href: '/signal',        icon: Zap,        label: 'My Signal',     sub: 'Full breakdown',           color: 'text-signal',     bg: 'bg-signal/10' },
            { href: '/learn',         icon: BookOpen,   label: 'Learning Feed', sub: 'Curated for you',          color: 'text-trajectory', bg: 'bg-trajectory/10' },
            { href: '/opportunities', icon: TrendingUp, label: 'Opportunities', sub: 'Ranked by match',          color: 'text-intent',     bg: 'bg-intent/10' },
          ].map(({ href, icon: Icon, label, sub, color, bg }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-3 rounded-xl border border-border/50 bg-card/60 hover:border-signal/30 hover:bg-signal/5 transition-all p-4"
            >
              <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center flex-none', bg)}>
                <Icon className={cn('w-4 h-4', color)} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground group-hover:text-signal-light transition-colors">{label}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-signal group-hover:translate-x-0.5 transition-all ml-auto flex-none" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
