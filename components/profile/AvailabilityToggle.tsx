'use client'
import { useRef } from 'react'
import { cn } from '@/lib/utils/cn'
import { useAuthStore } from '@/lib/stores/auth.store'
import { useProfileStore } from '@/lib/stores/profile.store'
import type { AvailabilityStatus } from '@/lib/types/profile.types'
import { AVAILABILITY_LABELS, AVAILABILITY_COLORS } from '@/lib/types/profile.types'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

interface AvailabilityToggleProps {
  value: AvailabilityStatus
  onChange: (v: AvailabilityStatus) => void
}

const CYCLE: AvailabilityStatus[] = ['available', 'open', 'unavailable']

const colorMap: Record<AvailabilityStatus, string> = {
  available:   'bg-[hsl(142,71%,45%)] shadow-[0_0_12px_hsla(142,71%,45%,0.50)]',
  open:        'bg-[hsl(38,92%,50%)] shadow-[0_0_12px_hsla(38,92%,50%,0.50)]',
  unavailable: 'bg-muted-foreground',
}

const textMap: Record<AvailabilityStatus, string> = {
  available:   'text-[hsl(142,71%,45%)]',
  open:        'text-[hsl(38,92%,50%)]',
  unavailable: 'text-muted-foreground',
}

export function AvailabilityToggle({ value, onChange }: AvailabilityToggleProps) {
  const dotRef = useRef<HTMLSpanElement>(null)

  function handleClick() {
    const next = CYCLE[(CYCLE.indexOf(value) + 1) % CYCLE.length]
    if (dotRef.current) {
      gsap.fromTo(dotRef.current, { scale: 1.5, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' })
    }
    onChange(next)
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 rounded-full border border-border/50 bg-card/60 hover:border-signal/30 transition-all px-3 py-1.5 group"
      title="Click to cycle availability"
    >
      <span ref={dotRef} className={cn('w-2 h-2 rounded-full flex-none transition-all duration-300', colorMap[value])} />
      <span className={cn('text-xs font-medium transition-colors', textMap[value])}>
        {AVAILABILITY_LABELS[value]}
      </span>
    </button>
  )
}
