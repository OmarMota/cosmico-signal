'use client'
import { motion } from 'framer-motion'
import { AnimatedNumber } from '../shared/AnimatedNumber'
import { Progress } from '../ui/progress'
import type { SignalDimension } from '@/lib/types/signal.types'
import { DIMENSION_LABELS, DIMENSION_COLORS } from '@/lib/types/signal.types'
import { cn } from '@/lib/utils/cn'

interface SignalDimensionCardProps {
  dimension: SignalDimension
  score: number
  trend?: 'rising' | 'falling' | 'stable'
  className?: string
}

export function SignalDimensionCard({ dimension, score, trend = 'stable', className }: SignalDimensionCardProps) {
  const color = DIMENSION_COLORS[dimension]
  const trendIcon = trend === 'rising' ? '↑' : trend === 'falling' ? '↓' : '→'
  const trendColor =
    trend === 'rising' ? 'text-emerald-400' : trend === 'falling' ? 'text-red-400' : 'text-slate-500'

  return (
    <motion.div
      className={cn('rounded-xl border border-border/50 bg-card/60 p-4', className)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground">{DIMENSION_LABELS[dimension]}</span>
        <span className={cn('text-xs font-medium', trendColor)}>{trendIcon}</span>
      </div>
      <div className="flex items-end gap-1 mb-3">
        <AnimatedNumber value={score} className="text-2xl font-bold text-foreground" />
        <span className="text-xs text-muted-foreground mb-1">/100</span>
      </div>
      <div className="relative h-1.5 rounded-full bg-muted/50 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  )
}
