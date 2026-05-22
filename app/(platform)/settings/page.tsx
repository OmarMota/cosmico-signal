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
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
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

      {/* Left sidebar */}
      <div className="w-52 flex-none">
        <div className="mb-5">
          <h1 className="text-lg font-semibold text-foreground">Profile</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Edit your professional signal</p>
        </div>

        <ProfileSectionNav active={activeSection} onSelect={setActiveSection} />

        <Separator className="my-6" />

        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 mb-2 px-1">
            Account
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="w-full justify-start gap-2.5 text-muted-foreground"
          >
            <LogOut className="w-4 h-4 flex-none" />
            Sign out
          </Button>
        </div>
      </div>

      {/* Right content */}
      <Card className="flex-1 min-w-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base capitalize">{activeSection}</CardTitle>
          <CardDescription>
            {activeSection === 'about'       && 'Your bio and professional identity'}
            {activeSection === 'basics'      && 'Core role and location info'}
            {activeSection === 'experiences' && 'Work history and achievements'}
            {activeSection === 'specialties' && 'Skills and areas of expertise'}
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          {sectionMap[activeSection]}
        </CardContent>
      </Card>
    </div>
  )
}
