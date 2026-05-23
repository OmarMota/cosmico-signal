'use client'
import { useRef } from 'react'
import { User, Layers, Briefcase, Star, Calendar, Lock } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useSidebarReveal } from '@/lib/gsap/hooks'
import type { ProfileSection } from '@/lib/stores/profile.store'

const SECTIONS: { key: ProfileSection; label: string; icon: React.ElementType; description: string }[] = [
  { key: 'about',       label: 'About',       icon: User,      description: 'Identity & situation' },
  { key: 'basics',      label: 'Basics',      icon: Layers,    description: 'Role, links & language' },
  { key: 'experiences', label: 'Experiences', icon: Briefcase, description: 'History & industries' },
  { key: 'specialties', label: 'Specialties', icon: Star,      description: 'Skills & trajectory' },
]

interface ProfileSectionNavProps {
  active: ProfileSection
  onSelect: (s: ProfileSection) => void
}

export function ProfileSectionNav({ active, onSelect }: ProfileSectionNavProps) {
  const navRef = useRef<HTMLDivElement>(null)
  useSidebarReveal(navRef)

  return (
    <div ref={navRef} className="flex flex-col gap-1">
      {SECTIONS.map(({ key, label, icon: Icon, description }) => {
        const isActive = active === key
        return (
          <button
            key={key}
            data-sidebar-item
            onClick={() => onSelect(key)}
            className={cn(
              'flex items-center gap-3 rounded-none px-3 py-2.5 text-left w-full transition-all duration-150',
              'border-l-2',
              isActive
                ? 'border-primary bg-primary/10 pl-[10px]'
                : 'border-transparent hover:bg-accent/60 pl-[10px]'
            )}
          >
            <div className={cn(
              'w-7 h-7 rounded-none flex items-center justify-center flex-none transition-colors',
              isActive ? 'bg-primary/10' : 'bg-accent'
            )}>
              <Icon className={cn('w-3.5 h-3.5', isActive ? 'text-primary' : 'text-muted-foreground')} />
            </div>
            <div>
              <p className={cn('text-sm font-medium leading-none mb-0.5', isActive ? 'text-primary' : 'text-foreground')}>
                {label}
              </p>
              <p className="text-[11px] text-muted-foreground/60">{description}</p>
            </div>
          </button>
        )
      })}

      {/* Divider */}
      <div className="my-3 border-t border-border/40" />

      {/* Date planning — coming soon */}
      <div
        data-sidebar-item
        className="flex items-center gap-3 rounded-none px-3 py-2.5 border-l-2 border-transparent pl-[10px] opacity-40 cursor-not-allowed"
        title="Available in a future release"
      >
        <div className="w-7 h-7 rounded-none bg-accent flex items-center justify-center flex-none relative">
          <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
          <Lock className="w-2.5 h-2.5 text-muted-foreground absolute -bottom-1 -right-1 bg-background rounded-full p-px" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground leading-none mb-0.5">Planning</p>
          <p className="text-[11px] text-muted-foreground/60">Coming soon</p>
        </div>
      </div>
    </div>
  )
}
