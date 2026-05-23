import * as React from 'react'
import { cn } from '@/lib/utils/cn'

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  glow?: boolean
  variant?: 'default' | 'signal' | 'trajectory' | 'intent'
}

const variantStyles = {
  default:    'border-border',
  signal:     'border-signal/20 shadow-[0_0_24px_0_hsl(var(--signal)/0.12)]',
  trajectory: 'border-[hsl(var(--trajectory)/0.25)] shadow-[0_0_24px_0_hsl(var(--trajectory)/0.12)]',
  intent:     'border-[hsl(var(--intent)/0.25)] shadow-[0_0_24px_0_hsl(var(--intent)/0.12)]',
}

const hoverStyles = {
  default:    'hover:border-signal/20',
  signal:     'hover:border-signal/40 hover:shadow-[0_0_32px_0_hsl(var(--signal)/0.2)]',
  trajectory: 'hover:border-[hsl(var(--trajectory)/0.4)]',
  intent:     'hover:border-[hsl(var(--intent)/0.4)]',
}

export const GlowCard = React.forwardRef<HTMLDivElement, GlowCardProps>(
  ({ className, hover = false, glow = false, variant = 'default', children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl border bg-card',
        variantStyles[variant],
        hover && ['transition-all duration-200', hoverStyles[variant]],
        glow && variant === 'signal' && 'shadow-[0_0_40px_0_hsl(var(--signal)/0.2)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
GlowCard.displayName = 'GlowCard'
