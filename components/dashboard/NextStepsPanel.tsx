'use client'
import { motion } from 'framer-motion'
import type { SignalProfile } from '@/lib/types/signal.types'
import type { TrajectorySnapshot } from '@/lib/types/trajectory.types'
import type { Intent } from '@/lib/types/intent.types'
import { cn } from '@/lib/utils/cn'
import { DIMENSION_LABELS } from '@/lib/types/signal.types'
import { ArrowRight } from 'lucide-react'

interface NextStep {
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  href?: string
}

interface NextStepsPanelProps {
  signalProfile: SignalProfile | null
  trajectory: TrajectorySnapshot | null
  intents: Intent[]
}

function deriveNextSteps(
  signal: SignalProfile | null,
  trajectory: TrajectorySnapshot | null,
  intents: Intent[]
): NextStep[] {
  const steps: NextStep[] = []

  if (!signal) return []

  // Find weakest dimension
  const dims = ['reliability', 'performance', 'responsiveness', 'feedback', 'growth'] as const
  const weakest = dims.reduce((a, b) => (signal[a] < signal[b] ? a : b))
  if (signal[weakest] < 65) {
    steps.push({
      title: `Strengthen ${DIMENSION_LABELS[weakest]}`,
      description: `Your ${DIMENSION_LABELS[weakest]} score is ${Math.round(signal[weakest])}. Consistent action here will raise your composite signal.`,
      impact: signal[weakest] < 50 ? 'high' : 'medium',
      href: '/learn',
    })
  }

  // Trajectory plateau
  const plateau = trajectory?.detected_patterns?.find(p => p.type === 'plateau')
  if (plateau) {
    steps.push({
      title: 'Break through your plateau',
      description: 'Your signals have been flat. Try learning something new or taking on a different type of project.',
      impact: 'high',
      href: '/learn',
    })
  }

  // Active intent
  const topIntent = intents[0]
  if (topIntent?.target_role) {
    steps.push({
      title: `Move toward ${topIntent.target_role}`,
      description: 'Your declared goal. Take learning steps and projects aligned to this direction.',
      impact: 'high',
      href: '/opportunities',
    })
  }

  // Signal trend is falling
  if (signal.score_trend === 'falling') {
    steps.push({
      title: 'Reverse your signal decline',
      description: 'Your composite signal has been declining. Log activity, collect feedback, or complete a learning module.',
      impact: 'high',
    })
  }

  // Generic growth
  if (steps.length < 2) {
    steps.push({
      title: 'Build your growth signal',
      description: 'Complete a learning module or mentor session to strengthen your growth dimension.',
      impact: 'medium',
      href: '/learn',
    })
  }

  return steps.slice(0, 3)
}

const IMPACT_COLORS = {
  high: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  medium: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  low: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
}

export function NextStepsPanel({ signalProfile, trajectory, intents }: NextStepsPanelProps) {
  const steps = deriveNextSteps(signalProfile, trajectory, intents)

  return (
    <div className="space-y-2.5">
      {steps.map((step, i) => (
        <motion.div
          key={i}
          className="rounded-xl border border-border/50 bg-card/60 p-4 flex items-start gap-3 group cursor-pointer hover:border-border transition-all"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
        >
          <div className="flex-shrink-0 mt-0.5">
            <span className={cn('text-xs px-2 py-0.5 rounded-full border font-medium', IMPACT_COLORS[step.impact])}>
              {step.impact}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground mb-0.5">{step.title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
          </div>
          {step.href && (
            <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground flex-shrink-0 mt-0.5 transition-colors" />
          )}
        </motion.div>
      ))}
    </div>
  )
}
