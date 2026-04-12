'use client'
import { motion } from 'framer-motion'
import type { TrajectorySnapshot } from '@/lib/types/trajectory.types'
import {
  PHASE_LABELS,
  PHASE_DESCRIPTIONS,
  PHASE_COLORS,
  PHASE_ORDER,
} from '@/lib/types/trajectory.types'
import { cn } from '@/lib/utils/cn'

interface TrajectoryPhaseCardProps {
  snapshot: TrajectorySnapshot
  className?: string
}

export function TrajectoryPhaseCard({ snapshot, className }: TrajectoryPhaseCardProps) {
  const { current_phase, growth_velocity, role_predictions } = snapshot
  const phaseIndex = PHASE_ORDER.indexOf(current_phase)
  const phaseColor = PHASE_COLORS[current_phase]
  const topPrediction = role_predictions?.[0]

  const velocityLabel =
    growth_velocity > 0.3
      ? 'Accelerating'
      : growth_velocity > 0.1
      ? 'Growing'
      : growth_velocity < -0.1
      ? 'Declining'
      : 'Steady'

  const velocityColor =
    growth_velocity > 0.3
      ? 'text-emerald-400'
      : growth_velocity > 0
      ? 'text-violet-400'
      : growth_velocity < -0.1
      ? 'text-red-400'
      : 'text-slate-400'

  return (
    <motion.div
      className={cn(
        'rounded-xl border border-border/50 bg-card/60 p-5',
        className
      )}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Phase label */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Current Phase</p>
          <h3 className="text-lg font-bold" style={{ color: phaseColor }}>
            {PHASE_LABELS[current_phase]}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground mb-0.5">Velocity</p>
          <p className={cn('text-sm font-semibold', velocityColor)}>{velocityLabel}</p>
        </div>
      </div>

      {/* Phase description */}
      <p className="text-xs text-muted-foreground mb-4">{PHASE_DESCRIPTIONS[current_phase]}</p>

      {/* Phase progress dots */}
      <div className="flex items-center gap-1.5 mb-4">
        {PHASE_ORDER.map((phase, i) => (
          <div key={phase} className="flex items-center">
            <motion.div
              className={cn(
                'rounded-full transition-all',
                i <= phaseIndex ? 'w-2.5 h-2.5' : 'w-2 h-2 opacity-30'
              )}
              style={{
                background: i <= phaseIndex ? PHASE_COLORS[phase] : '#334155',
              }}
              animate={i === phaseIndex ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {i < PHASE_ORDER.length - 1 && (
              <div
                className={cn(
                  'h-px w-8 mx-0.5 transition-all',
                  i < phaseIndex ? 'opacity-100' : 'opacity-20'
                )}
                style={{ background: PHASE_COLORS[phase] }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Next role prediction */}
      {topPrediction && (
        <div className="rounded-lg bg-violet-500/8 border border-violet-500/15 px-3 py-2">
          <p className="text-xs text-violet-300/70 mb-0.5">Next predicted role</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-violet-200">{topPrediction.role}</span>
            <span className="text-xs text-muted-foreground">~{topPrediction.timeframe_months}mo</span>
          </div>
          <div className="mt-1.5 h-1 rounded-full bg-violet-500/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-violet-500/50"
              initial={{ width: 0 }}
              animate={{ width: `${topPrediction.confidence * 100}%` }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <p className="text-right text-xs text-violet-400/60 mt-0.5">
            {Math.round(topPrediction.confidence * 100)}% confidence
          </p>
        </div>
      )}
    </motion.div>
  )
}
