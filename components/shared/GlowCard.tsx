import { cn } from '@/lib/utils'

type GlowVariant = 'signal' | 'trajectory' | 'intent' | 'emerald' | 'amber' | 'none'

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  variant?: GlowVariant
  intensity?: 'low' | 'medium' | 'high'
  as?: React.ElementType
}

const glowStyles: Record<GlowVariant, string> = {
  signal:     'shadow-[0_0_40px_hsla(263,70%,62%,0.12)]',
  trajectory: 'shadow-[0_0_40px_hsla(275,60%,58%,0.12)]',
  intent:     'shadow-[0_0_40px_hsla(290,65%,60%,0.12)]',
  emerald:    'shadow-[0_0_40px_hsla(142,71%,45%,0.12)]',
  amber:      'shadow-[0_0_40px_hsla(38,92%,50%,0.12)]',
  none:       '',
}

export function GlowCard({
  children,
  className,
  variant = 'signal',
  as: Tag = 'div',
}: GlowCardProps) {
  return (
    <Tag
      className={cn(
        'rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm',
        glowStyles[variant],
        className
      )}
    >
      {children}
    </Tag>
  )
}
