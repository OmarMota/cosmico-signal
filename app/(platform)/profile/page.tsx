'use client'
import { useEffect, useRef } from 'react'
import { useAuthStore } from '@/lib/stores/auth.store'
import { useProfileStore } from '@/lib/stores/profile.store'
import type { ProfileSection } from '@/lib/stores/profile.store'
import type { UserProfile, AvailabilityStatus } from '@/lib/types/profile.types'
import { ProfileSectionNav } from '@/components/profile/ProfileSectionNav'
import { AvailabilityToggle } from '@/components/profile/AvailabilityToggle'
import { SectionAbout } from '@/components/profile/sections/SectionAbout'
import { SectionBasics } from '@/components/profile/sections/SectionBasics'
import { SectionExperiences } from '@/components/profile/sections/SectionExperiences'
import { SectionSpecialties } from '@/components/profile/sections/SectionSpecialties'
import { GlowCard } from '@/components/shared/GlowCard'
import { cn } from '@/lib/utils'
import { SENIORITY_LABELS, SITUATION_LABELS } from '@/lib/types/profile.types'
import { fadeUpEnter } from '@/lib/gsap/animations'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export default function ProfilePage() {
  const { partialProfile, updatePartialProfile } = useAuthStore()
  const { profile, setProfile, activeSection, setActiveSection, setAvailability } = useProfileStore()

  const headerRef = useRef<HTMLDivElement>(null)

  // Hydrate profile store from auth store on mount
  useEffect(() => {
    if (partialProfile && !profile) {
      setProfile(partialProfile as UserProfile)
    }
  }, [partialProfile, profile, setProfile])

  // GSAP: fade in header
  useGSAP(() => {
    if (headerRef.current) fadeUpEnter(headerRef.current, { duration: 0.4 })
  }, { scope: headerRef })

  const displayProfile = profile ?? partialProfile
  if (!displayProfile) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground text-sm">Loading profile…</p>
      </div>
    )
  }

  const displayName = displayProfile.display_name
    || `${displayProfile.first_name ?? ''} ${displayProfile.last_name ?? ''}`.trim()
    || 'Your Profile'
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
  const jobTitle = displayProfile.job_title ?? 'Professional'
  const situation = displayProfile.professional_situation
  const seniority = displayProfile.seniority_level

  function handleAvailabilityChange(status: AvailabilityStatus) {
    setAvailability(status)
    updatePartialProfile({ availability: status })
  }

  function handleSectionChange(section: ProfileSection) {
    setActiveSection(section)
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div ref={headerRef} className="opacity-0">
        <GlowCard className="p-5">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative flex-none">
              <div className="absolute inset-0 rounded-full bg-signal/15 blur-md" />
              <div className="relative w-14 h-14 rounded-full border-2 border-signal/40 bg-gradient-to-br from-signal/30 to-trajectory/20 flex items-center justify-center overflow-hidden">
                {displayProfile.avatar_url ? (
                  <img src={displayProfile.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xl font-bold text-signal-light">{initials}</span>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-foreground truncate">{displayName}</h1>
              <p className="text-sm text-muted-foreground truncate">
                {jobTitle}
                {seniority && ` · ${SENIORITY_LABELS[seniority]}`}
                {situation && ` · ${SITUATION_LABELS[situation]}`}
              </p>
            </div>

            {/* Open to work toggle */}
            <div className="flex-none">
              <AvailabilityToggle
                value={displayProfile.availability ?? 'open'}
                onChange={handleAvailabilityChange}
              />
            </div>
          </div>
        </GlowCard>
      </div>

      {/* Body: sidebar + content */}
      <div className="grid grid-cols-[200px_1fr] gap-6 items-start">

        {/* Left sidebar */}
        <div className="sticky top-6">
          <GlowCard className="p-3" variant="none">
            <ProfileSectionNav
              active={activeSection}
              onSelect={handleSectionChange}
            />
          </GlowCard>
        </div>

        {/* Right content */}
        <GlowCard className="p-6 min-h-[480px]">
          {activeSection === 'about'       && <SectionAbout />}
          {activeSection === 'basics'      && <SectionBasics />}
          {activeSection === 'experiences' && <SectionExperiences />}
          {activeSection === 'specialties' && <SectionSpecialties />}
        </GlowCard>
      </div>
    </div>
  )
}
