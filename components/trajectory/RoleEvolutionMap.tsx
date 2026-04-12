'use client'
import { motion } from 'framer-motion'
import type { RolePrediction } from '@/lib/types/trajectory.types'
import { cn } from '@/lib/utils/cn'

interface RoleEvolutionMapProps {
  predictions: RolePrediction[]
  currentRole: string
}

export function RoleEvolutionMap({ predictions, currentRole }: RoleEvolutionMapProps) {
  return (
    <div className="relative">
      <div className="flex items-center gap-4 overflow-x-auto pb-2">
        {/* Current role */}
        <motion.div
          className="flex-shrink-0 rounded-xl border-2 border-violet-500/50 bg-violet-500/10 px-4 py-3 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-xs text-violet-400/70 mb-0.5">Now</p>
          <p className="text-sm font-semibold text-violet-200">{currentRole}</p>
        </motion.div>

        {/* Arrow */}
        <motion.div
          className="flex-shrink-0 text-violet-400/40 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          →
        </motion.div>

        {/* Predictions */}
        <div className="flex gap-3">
          {predictions.map((pred, i) => (
            <motion.div
              key={pred.role}
              className={cn(
                'flex-shrink-0 rounded-xl border px-4 py-3 text-center',
                i === 0
                  ? 'border-purple-500/40 bg-purple-500/8'
                  : 'border-border/40 bg-card/40'
              )}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * (i + 1) }}
            >
              <p className="text-xs text-muted-foreground mb-0.5">~{pred.timeframe_months}mo</p>
              <p className={cn('text-sm font-semibold mb-1', i === 0 ? 'text-purple-200' : 'text-foreground/70')}>
                {pred.role}
              </p>
              <div className="flex items-center justify-center gap-1">
                <div className="h-1 rounded-full bg-muted/40 overflow-hidden" style={{ width: 40 }}>
                  <motion.div
                    className="h-full rounded-full bg-purple-500/60"
                    initial={{ width: 0 }}
                    animate={{ width: `${pred.confidence * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.2 * i }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{Math.round(pred.confidence * 100)}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
