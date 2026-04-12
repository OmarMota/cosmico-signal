'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Zap, User, TrendingUp, ArrowRight, Sparkles } from 'lucide-react'
import { useAuthStore } from '@/lib/stores/auth.store'
import { GlowCard } from '@/components/shared/GlowCard'
import { usePageEnter } from '@/lib/gsap/hooks'
import { cn } from '@/lib/utils'
import {
  AVAILABILITY_LABELS,
  SENIORITY_LABELS,
  EXPERIENCE_LABELS,
} from '@/lib/types/profile.types'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { fadeUpEnter } from '@/lib/gsap/animations'

gsap.registerPlugin(useGSAP)

export default function DashboardPage() {
  const { partialProfile } = useAuthStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  usePageEnter(containerRef, { stagger: 0.08, selector: '[data-card]' })

  if (!partialProfile) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground text-sm">Loading profile…</p>
      </div>
    )
  }

  const displayName = partialProfile.display_name
    || `${partialProfile.first_name ?? ''} ${partialProfile.last_name ?? ''}`.trim()
    || 'You'
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
  const availability = partialProfile.availability ?? 'open'
  const skillCount = partialProfile.skills?.length ?? 0
  const industryCount = partialProfile.industries?.length ?? 0

  const availabilityColorMap = {
    available:   'bg-[hsl(142,71%,45%)]',
    open:        'bg-[hsl(38,92%,50%)]',
    unavailable: 'bg-muted-foreground',
  }

  return (
    <div ref={containerRef} className="space-y-8">

      {/* Hero welcome */}
      <div data-card className="opacity-0">
        <GlowCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-signal/20 blur-md" />
              <div className="relative w-14 h-14 rounded-full border-2 border-signal/40 bg-gradient-to-br from-signal/30 to-trajectory/20 flex items-center justify-center">
                {partialProfile.avatar_url ? (
                  <img src={partialProfile.avatar_url} alt="avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-lg font-bold text-signal-light">{initials}</span>
                )}
              </div>
              <span className={cn('absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2 border-card', availabilityColorMap[availability])} />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">Welcome back, {partialProfile.first_name ?? displayName} ✦</h1>
              <p className="text-sm text-muted-foreground">
                {partialProfile.job_title ?? 'Professional'} ·{' '}
                {AVAILABILITY_LABELS[availability]}
              </p>
            </div>
          </div>
        </GlowCard>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: 'Experience',
            value: partialProfile.experience_years ? EXPERIENCE_LABELS[partialProfile.experience_years] : '—',
            icon: TrendingUp,
            color: 'text-signal',
          },
          {
            label: 'Skills',
            value: skillCount > 0 ? `${skillCount} skills` : '—',
            icon: Zap,
            color: 'text-trajectory',
          },
          {
            label: 'Industries',
            value: industryCount > 0 ? `${industryCount} sectors` : '—',
            icon: Sparkles,
            color: 'text-intent',
          },
          {
            label: 'Specialization',
            value: partialProfile.main_specialization ?? '—',
            icon: User,
            color: 'text-signal-light',
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            data-card
            className="opacity-0 rounded-xl border border-border/50 bg-card/60 p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon className={cn('w-3.5 h-3.5', color)} />
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-sm font-semibold text-foreground truncate">{value}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div data-card className="opacity-0">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/profile"
            className="group flex items-center justify-between rounded-xl border border-border/50 bg-card/60 hover:border-signal/40 hover:bg-signal/5 transition-all p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-signal/10 flex items-center justify-center">
                <User className="w-4 h-4 text-signal" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Complete your profile</p>
                <p className="text-xs text-muted-foreground">Add resume, links and more</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-signal group-hover:translate-x-1 transition-all" />
          </Link>

          <div className="group flex items-center justify-between rounded-xl border border-dashed border-border/40 bg-card/30 p-4 opacity-60 cursor-not-allowed">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-trajectory/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-trajectory" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Trajectory</p>
                <p className="text-xs text-muted-foreground">Coming soon</p>
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground/40 border border-border/30 rounded px-1.5 py-0.5">Soon</span>
          </div>
        </div>
      </div>

      {/* Skills preview */}
      {(partialProfile.skills?.length ?? 0) > 0 && (
        <div data-card className="opacity-0">
          <GlowCard className="p-5" variant="trajectory">
            <h2 className="text-sm font-semibold text-foreground mb-3">Your Skills</h2>
            <div className="flex flex-wrap gap-2">
              {partialProfile.skills?.map(skill => (
                <span
                  key={skill.name}
                  className="rounded-full border border-signal/25 bg-signal/8 px-3 py-1 text-xs text-signal-light"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </GlowCard>
        </div>
      )}

      {/* Goals preview */}
      {(partialProfile.goals?.length ?? 0) > 0 && (
        <div data-card className="opacity-0">
          <GlowCard className="p-5" variant="intent">
            <h2 className="text-sm font-semibold text-foreground mb-3">Your Goals</h2>
            <div className="space-y-2">
              {partialProfile.goals?.map(goal => (
                <div key={goal} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-intent flex-none" />
                  <span className="text-sm text-muted-foreground capitalize">
                    {goal.replace(/_/g, ' ')}
                  </span>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>
      )}
    </div>
  )
}
