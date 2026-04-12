import { cn } from '@/lib/utils/cn'

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: 'violet' | 'purple' | 'fuchsia' | 'emerald' | 'amber'
  intensity?: 'low' | 'medium' | 'high'
}

const GLOW_CLASSES = {
  violet: {
    low: 'shadow-violet-500/10',
    medium: 'shadow-violet-500/20',
    high: 'shadow-violet-500/35',
  },
  purple: {
    low: 'shadow-purple-500/10',
    medium: 'shadow-purple-500/20',
    high: 'shadow-purple-500/35',
  },
  fuchsia: {
    low: 'shadow-fuchsia-500/10',
    medium: 'shadow-fuchsia-500/20',
    high: 'shadow-fuchsia-500/35',
  },
  emerald: {
    low: 'shadow-emerald-500/10',
    medium: 'shadow-emerald-500/20',
    high: 'shadow-emerald-500/35',
  },
  amber: {
    low: 'shadow-amber-500/10',
    medium: 'shadow-amber-500/20',
    high: 'shadow-amber-500/35',
  },
}

export function GlowCard({
  className,
  glowColor = 'violet',
  intensity = 'medium',
  children,
  ...props
}: GlowCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border/50 bg-card backdrop-blur-sm',
        'shadow-lg',
        GLOW_CLASSES[glowColor][intensity],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
