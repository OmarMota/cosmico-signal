import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary',
        secondary: 'bg-secondary text-secondary-foreground',
        outline: 'border border-border text-foreground',
        signal: 'bg-violet-500/15 text-violet-300 border border-violet-500/20',
        trajectory: 'bg-purple-500/15 text-purple-300 border border-purple-500/20',
        intent: 'bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/20',
        success: 'bg-emerald-500/15 text-emerald-300',
        warning: 'bg-amber-500/15 text-amber-300',
        muted: 'bg-muted text-muted-foreground',
        free: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20',
        paid: 'bg-amber-500/15 text-amber-300 border border-amber-500/20',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
