'use client'
import { useRef, useEffect } from 'react'
import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { TOTAL_STEPS, STEP_META } from '@/lib/stores/onboarding.store'
import { Button } from '@/components/ui/button'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

interface OnboardingShellProps {
  currentStep: number
  onNext: () => void
  onBack: () => void
  canProceed: boolean
  isLoading: boolean
  children: React.ReactNode
}

export function OnboardingShell({
  currentStep,
  onNext,
  onBack,
  canProceed,
  isLoading,
  children,
}: OnboardingShellProps) {
  const step = STEP_META[currentStep - 1]
  const isLast = currentStep === TOTAL_STEPS
  const cardRef = useRef<HTMLDivElement>(null)
  const prevStep = useRef(currentStep)

  useEffect(() => {
    if (!cardRef.current) return
    const isForward = currentStep > prevStep.current
    prevStep.current = currentStep

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, x: isForward ? 28 : -28 },
      { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out', clearProps: 'transform' }
    )
  }, [currentStep])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-2 mb-10">
        <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
          <Zap className="w-3.5 h-3.5 text-background" />
        </div>
        <span className="font-semibold text-sm tracking-tight text-foreground">Cosmico Signal</span>
      </div>

      {/* Step pills */}
      <div className="relative z-10 flex items-center gap-2 mb-8">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
          const state = i + 1 < currentStep ? 'done' : i + 1 === currentStep ? 'active' : 'future'
          return (
            <div
              key={i}
              className={cn(
                'rounded-full transition-all duration-300',
                state === 'done'   && 'h-2 w-5 bg-primary',
                state === 'active' && 'h-2 w-8 bg-primary/70',
                state === 'future' && 'h-2 w-2 bg-muted/40'
              )}
            />
          )
        })}
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-md rounded-none border border-border bg-card p-8 shadow-xl"
      >
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 font-medium">
          Step {currentStep} of {TOTAL_STEPS}
        </p>
        <h1 className="text-2xl font-bold text-foreground mb-0.5">{step?.title}</h1>
        <p className="text-sm text-muted-foreground mb-6">{step?.subtitle}</p>

        <div>{children}</div>

        <div className="mt-8 flex items-center justify-between">
          {currentStep > 1 ? (
            <Button variant="outline" size="sm" onClick={onBack}>
              ← Back
            </Button>
          ) : <div />}

          <Button
            onClick={onNext}
            disabled={!canProceed || isLoading}
          >
            {isLoading ? 'Saving…' : isLast ? 'Launch My Signal ✦' : 'Continue →'}
          </Button>
        </div>
      </div>

      <p className="relative z-10 mt-6 text-xs text-muted-foreground/40 text-center">
        Your data is stored locally. Nothing is sent to any server.
      </p>
    </div>
  )
}
