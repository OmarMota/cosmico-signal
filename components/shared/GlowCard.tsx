import { cn } from '@/lib/utils/cn'

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export function GlowCard({ className, hover = false, children, ...props }: GlowCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-card',
        hover && 'transition-colors hover:border-signal/20',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
