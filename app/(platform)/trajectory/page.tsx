'use client'
import { useRef } from 'react'
import { GlowCard } from '@/components/shared/GlowCard'
import { MOCK_TRAJECTORY, MOCK_MILESTONES } from '@/lib/mock/data'
import { PHASE_LABELS, PHASE_DESCRIPTIONS } from '@/lib/types/signal.types'
import { usePageEnter } from '@/lib/gsap/hooks'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const PHASE_ORDER = ['building', 'specializing', 'leading', 'pivoting']

function ConfidenceBar({ value, color = 'bg-signal' }: { value: number; color?: string }) {
  return (
    <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
      <div className={cn('h-full rounded-full transition-all duration-700', color)} style={{ width: `${value * 100}%` }} />
    </div>
  )
}

export default function TrajectoryPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  usePageEnter(containerRef, { stagger: 0.09, selector: '[data-card]' })

  const traj = MOCK_TRAJECTORY
  const phaseIdx = PHASE_ORDER.indexOf(traj.current_phase)

  return (
    <div ref={containerRef} className="space-y-6">

      {/* Header */}
      <div data-card className="opacity-0">
        <h1 className="text-2xl font-bold text-foreground mb-0.5">Your Trajectory</h1>
        <p className="text-sm text-muted-foreground">How your signal is shaping your professional evolution</p>
      </div>

      {/* Phase arc */}
      <div data-card className="opacity-0">
        <GlowCard className="p-6" variant="trajectory">
          <h2 className="text-sm font-semibold text-foreground mb-4">Career Phase</h2>

          {/* Phase stepper */}
          <div className="flex items-center gap-0 mb-6">
            {PHASE_ORDER.map((phase, i) => {
              const isCurrent = i === phaseIdx
              const isPast = i < phaseIdx
              return (
                <div key={phase} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={cn(
                      'w-8 h-8 rounded-full border-2 flex items-center justify-center mb-1.5 transition-all',
                      isCurrent ? 'border-trajectory bg-trajectory/20 scale-110' :
                      isPast    ? 'border-trajectory/50 bg-trajectory/10' :
                                  'border-border/50 bg-muted/20'
                    )}>
                      {isPast ? (
                        <svg className="w-3.5 h-3.5 text-trajectory/70" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <div className={cn('w-2 h-2 rounded-full', isCurrent ? 'bg-trajectory' : 'bg-muted-foreground/30')} />
                      )}
                    </div>
                    <span className={cn('text-[10px] text-center font-medium', isCurrent ? 'text-trajectory' : isPast ? 'text-muted-foreground' : 'text-muted-foreground/40')}>
                      {PHASE_LABELS[phase]}
                    </span>
                  </div>
                  {i < PHASE_ORDER.length - 1 && (
                    <div className={cn('h-px flex-1 mx-0 mb-6', i < phaseIdx ? 'bg-trajectory/40' : 'bg-border/40')} />
                  )}
                </div>
              )
            })}
          </div>

          <div className="rounded-xl border border-trajectory/20 bg-trajectory/8 p-4">
            <p className="text-sm font-semibold text-foreground mb-1">
              {PHASE_LABELS[traj.current_phase]} Phase
            </p>
            <p className="text-xs text-muted-foreground">{PHASE_DESCRIPTIONS[traj.current_phase]}</p>
          </div>

          {/* Velocity + momentum */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-xs text-muted-foreground">Growth Velocity</span>
                <span className="text-xs font-semibold text-trajectory">{Math.round(traj.growth_velocity * 100)}%</span>
              </div>
              <ConfidenceBar value={traj.growth_velocity} color="bg-trajectory" />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-xs text-muted-foreground">Momentum</span>
                <span className="text-xs font-semibold text-intent">{Math.round(traj.momentum_score * 100)}%</span>
              </div>
              <ConfidenceBar value={traj.momentum_score} color="bg-intent" />
            </div>
          </div>
        </GlowCard>
      </div>

      {/* Patterns + role predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Detected patterns */}
        <div data-card className="opacity-0">
          <GlowCard className="p-5 h-full">
            <h2 className="text-sm font-semibold text-foreground mb-4">Detected Patterns</h2>
            <div className="space-y-3">
              {traj.detected_patterns.map((p, i) => (
                <div key={i} className="rounded-xl border border-border/40 bg-card/40 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-foreground capitalize">
                      {p.type.replace(/_/g, ' ')}
                    </p>
                    <span className="text-xs font-bold text-trajectory">{Math.round(p.confidence * 100)}%</span>
                  </div>
                  <ConfidenceBar value={p.confidence} color="bg-trajectory" />
                  <div className="mt-2 space-y-0.5">
                    {p.evidence.map((ev, j) => (
                      <p key={j} className="text-[11px] text-muted-foreground">· {ev}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>

        {/* Role predictions */}
        <div data-card className="opacity-0">
          <GlowCard className="p-5 h-full" variant="intent">
            <h2 className="text-sm font-semibold text-foreground mb-4">Role Predictions</h2>
            <p className="text-xs text-muted-foreground mb-4">Based on your current trajectory and signal momentum</p>
            <div className="space-y-4">
              {traj.role_predictions.map(p => (
                <div key={p.role}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{p.role}</p>
                      <p className="text-[11px] text-muted-foreground">~{p.timeframe_months} months</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-bold text-intent">{Math.round(p.confidence * 100)}%</p>
                      <p className="text-[10px] text-muted-foreground">confidence</p>
                    </div>
                  </div>
                  <ConfidenceBar value={p.confidence} color="bg-gradient-to-r from-trajectory to-intent" />
                </div>
              ))}
            </div>
          </GlowCard>
        </div>
      </div>

      {/* Milestones */}
      <div data-card className="opacity-0">
        <GlowCard className="p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Milestones</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-3 top-0 bottom-0 w-px bg-border/40" />
            <div className="space-y-4">
              {MOCK_MILESTONES.map((m, i) => (
                <div key={m.id} className="flex items-start gap-4 pl-8 relative">
                  <div className="absolute left-0 w-6 h-6 rounded-full border-2 border-signal/50 bg-signal/15 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-signal" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{m.title}</p>
                    <p className="text-xs text-muted-foreground">{m.description}</p>
                    <p className="text-[10px] text-muted-foreground/50 mt-0.5">{m.achieved_at}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlowCard>
      </div>
    </div>
  )
}
