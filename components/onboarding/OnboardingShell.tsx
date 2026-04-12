'use client'
import { useRef, useEffect } from 'react'
import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TOTAL_STEPS, STEP_META } from '@/lib/stores/onboarding.store'
import { fadeUpEnter } from '@/lib/gsap/animations'
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

  // Animate card on step change
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

      {/* Ambient bg */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-signal/6 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-trajectory/5 rounded-full blur-3xl" />
      </div>

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-2 mb-10">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-signal to-trajectory flex items-center justify-center shadow-lg shadow-signal/20">
          <Zap className="w-3.5 h-3.5 text-white" />
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
                state === 'done'   && 'h-2 w-5 bg-signal',
                state === 'active' && 'h-2 w-8 bg-signal/80',
                state === 'future' && 'h-2 w-2 bg-muted/40'
              )}
            />
          )
        })}
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-md rounded-2xl border border-border/50 bg-card/90 backdrop-blur-sm p-8 shadow-2xl shadow-black/30"
      >
        {/* Step label */}
        <p className="text-[10px] text-signal/60 uppercase tracking-widest mb-1 font-medium">
          Step {currentStep} of {TOTAL_STEPS}
        </p>
        <h1 className="text-2xl font-bold text-foreground mb-0.5">{step?.title}</h1>
        <p className="text-sm text-muted-foreground mb-6">{step?.subtitle}</p>

        {/* Step content */}
        <div>{children}</div>

        {/* Footer actions */}
        <div className="mt-8 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              onClick={onBack}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
            >
              ← Back
            </button>
          ) : <div />}

          <button
            onClick={onNext}
            disabled={!canProceed || isLoading}
            className={cn(
              'rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200',
              canProceed && !isLoading
                ? 'bg-signal text-white hover:bg-signal/90 shadow-lg shadow-signal/25'
                : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
            )}
          >
            {isLoading ? 'Saving…' : isLast ? 'Launch My Signal ✦' : 'Continue →'}
          </button>
        </div>
      </div>

      {/* Sub-footnote */}
      <p className="relative z-10 mt-6 text-xs text-muted-foreground/40 text-center">
        Your data is stored locally. Nothing is sent to any server.
      </p>
    </div>
  )
}
