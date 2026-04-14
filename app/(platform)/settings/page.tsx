'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { useAuthStore } from '@/lib/stores/auth.store'
import { useProfileStore } from '@/lib/stores/profile.store'
import { ProfileSectionNav } from '@/components/profile/ProfileSectionNav'
import { SectionAbout } from '@/components/profile/sections/SectionAbout'
import { SectionBasics } from '@/components/profile/sections/SectionBasics'
import { SectionExperiences } from '@/components/profile/sections/SectionExperiences'
import { SectionSpecialties } from '@/components/profile/sections/SectionSpecialties'
import type { ProfileSection } from '@/lib/stores/profile.store'

export default function SettingsPage() {
  const router = useRouter()
  const { logout } = useAuthStore()
  const { activeSection, setActiveSection } = useProfileStore()

  function handleSignOut() {
    logout()
    router.push('/login')
  }

  const sectionMap: Record<ProfileSection, React.ReactNode> = {
    about:       <SectionAbout />,
    basics:      <SectionBasics />,
    experiences: <SectionExperiences />,
    specialties: <SectionSpecialties />,
  }

  return (
    <div className="flex gap-8 max-w-4xl">

      {/* Left sidebar — section nav */}
      <div className="w-52 flex-none">
        <div className="mb-6">
          <h1 className="text-lg font-semibold text-foreground">Profile</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Edit your professional signal</p>
        </div>
        <ProfileSectionNav active={activeSection} onSelect={setActiveSection} />

        {/* Account section */}
        <div className="mt-8 pt-6 border-t border-border/40">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 mb-3 px-1">Account</p>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all"
          >
            <LogOut className="w-4 h-4 flex-none" />
            Sign out
          </button>
        </div>
      </div>

      {/* Right content */}
      <div className="flex-1 min-w-0 rounded-2xl border border-border bg-card p-6">
        {sectionMap[activeSection]}
      </div>
    </div>
  )
}
