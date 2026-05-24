import * as React from 'react'
import { cn } from '@/lib/utils/cn'

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  glow?: boolean
  variant?: 'default' | 'primary' | 'muted'
}

const variantStyles = {
  default: 'border-border',
  primary: 'border-primary/20',
  muted:   'border-border bg-muted/20',
}

const hoverStyles = {
  default: 'hover:border-primary/30',
  primary: 'hover:border-primary/40',
  muted:   'hover:border-border',
}

export const GlowCard = React.forwardRef<HTMLDivElement, GlowCardProps>(
  ({ className, hover = false, glow = false, variant = 'default', children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-none border bg-card',
        variantStyles[variant],
        hover && ['transition-all duration-200', hoverStyles[variant]],
        glow && 'shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
GlowCard.displayName = 'GlowCard'
