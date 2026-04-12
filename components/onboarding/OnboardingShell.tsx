'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const STEPS = [
  { title: 'Your Role', subtitle: 'Who are you professionally?' },
  { title: 'Your Skills', subtitle: 'What do you bring to the table?' },
  { title: 'Your Rate', subtitle: 'How do you value your work?' },
  { title: 'Availability', subtitle: 'When can you work?' },
  { title: 'Your Goals', subtitle: 'Where are you headed?' },
]

interface OnboardingShellProps {
  currentStep: number
  onStepComplete: (data: Record<string, unknown>) => Promise<void>
  children: React.ReactNode
  canProceed?: boolean
  isLoading?: boolean
}

export function OnboardingShell({
  currentStep,
  onStepComplete,
  children,
  canProceed = true,
  isLoading = false,
}: OnboardingShellProps) {
  const router = useRouter()
  const step = STEPS[currentStep - 1]
  const isLast = currentStep === STEPS.length

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-12">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-lg tracking-tight">Cosmico Signal</span>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              'rounded-full transition-all',
              i + 1 < currentStep
                ? 'w-6 h-2 bg-violet-500'
                : i + 1 === currentStep
                ? 'w-8 h-2 bg-violet-400'
                : 'w-2 h-2 bg-muted/50'
            )}
          />
        ))}
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-8 shadow-2xl shadow-violet-500/5">
            <div className="mb-6">
              <p className="text-xs text-violet-400/70 uppercase tracking-widest mb-1">
                Step {currentStep} of {STEPS.length}
              </p>
              <h1 className="text-2xl font-bold text-foreground">{step?.title}</h1>
              <p className="text-sm text-muted-foreground mt-1">{step?.subtitle}</p>
            </div>

            {children}

            <div className="mt-8 flex items-center justify-between">
              {currentStep > 1 ? (
                <Button variant="ghost" size="sm" onClick={() => router.back()}>
                  Back
                </Button>
              ) : <div />}

              <Button
                variant="signal"
                disabled={!canProceed || isLoading}
                onClick={() => onStepComplete({})}
              >
                {isLoading ? 'Saving...' : isLast ? 'Launch My Signal' : 'Continue'}
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
