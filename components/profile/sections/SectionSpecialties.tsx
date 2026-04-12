'use client'
import { useState, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useProfileStore } from '@/lib/stores/profile.store'
import { useAuthStore } from '@/lib/stores/auth.store'
import {
  SPECIALIZATIONS_BY_ROLE,
  TRAJECTORY_SKILLS_BY_ROLE,
} from '@/lib/types/profile.types'
import type { RoleCategory } from '@/lib/types/profile.types'
import { useSectionEnter } from '@/lib/gsap/hooks'

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-xl border px-3 py-2 text-sm text-left transition-all duration-150',
        selected
          ? 'border-signal/60 bg-signal/10 text-signal-light font-medium'
          : 'border-border/60 text-muted-foreground hover:border-border hover:text-foreground'
      )}
    >
      {label}
    </button>
  )
}

export function SectionSpecialties() {
  const { profile, updateProfile, isSaving, setSaving } = useProfileStore()
  const { updatePartialProfile, partialProfile } = useAuthStore()
  const sectionRef = useRef<HTMLDivElement>(null)
  useSectionEnter(sectionRef, 'specialties')

  const roleCategory: RoleCategory = (profile?.role_category ?? partialProfile?.role_category ?? 'other') as RoleCategory
  const specializations = SPECIALIZATIONS_BY_ROLE[roleCategory] ?? []
  const trajectorySkills = TRAJECTORY_SKILLS_BY_ROLE[roleCategory] ?? []

  const [form, setForm] = useState({
    main_specialization: profile?.main_specialization ?? partialProfile?.main_specialization ?? '',
    skill_trajectory:    profile?.skill_trajectory ?? partialProfile?.skill_trajectory ?? [] as string[],
  })

  function toggleTrajectory(skill: string) {
    setForm(f => ({
      ...f,
      skill_trajectory: f.skill_trajectory.includes(skill)
        ? f.skill_trajectory.filter(s => s !== skill)
        : f.skill_trajectory.length < 3
          ? [...f.skill_trajectory, skill]
          : f.skill_trajectory,
    }))
  }

  async function handleSave() {
    setSaving(true)
    updateProfile(form)
    updatePartialProfile(form)
    await new Promise(r => setTimeout(r, 400))
    setSaving(false)
  }

  return (
    <div ref={sectionRef} className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-foreground mb-1">Specialties</h2>
        <p className="text-sm text-muted-foreground">Your main focus and where you want to grow</p>
      </div>

      {/* Main specialization */}
      {specializations.length > 0 && (
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-2">Main specialization</label>
          <div className="grid grid-cols-2 gap-2">
            {specializations.map(spec => {
              const isSelected = form.main_specialization === spec
              return (
                <button
                  key={spec}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, main_specialization: spec }))}
                  className={cn(
                    'rounded-xl border px-4 py-3 text-sm text-left transition-all',
                    isSelected
                      ? 'border-signal/60 bg-signal/10'
                      : 'border-border/60 hover:border-border hover:bg-accent/30'
                  )}
                >
                  <p className={cn('font-medium', isSelected ? 'text-signal-light' : 'text-foreground')}>{spec}</p>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Skill trajectory */}
      {trajectorySkills.length > 0 && (
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">
            Where do you want to grow?
            <span className="ml-2 text-muted-foreground/50 text-[11px]">
              {form.skill_trajectory.length}/3 selected
            </span>
          </label>
          <p className="text-[11px] text-muted-foreground/50 mb-3">
            These will shape your personalized recommendations
          </p>
          <div className="flex flex-wrap gap-2">
            {trajectorySkills.map(skill => (
              <Chip
                key={skill}
                label={skill}
                selected={form.skill_trajectory.includes(skill)}
                onClick={() => toggleTrajectory(skill)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Trajectory visualization */}
      {form.skill_trajectory.length > 0 && (
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-3">Your growth trajectory</label>
          <div className="space-y-3 rounded-xl border border-border/40 bg-card/40 p-4">
            {form.skill_trajectory.map(skill => (
              <div key={skill}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-foreground">{form.main_specialization || 'Current'}</span>
                    <ArrowRight className="w-3 h-3 text-muted-foreground/50" />
                    <span className="text-xs font-medium text-signal-light">{skill}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground/40">Goal</span>
                </div>
                <div className="relative h-1.5 bg-muted/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-signal/60 to-signal/30 rounded-full"
                    style={{ width: '35%' }}
                  />
                  <div
                    className="absolute top-0 h-full w-0.5 bg-signal-light/80"
                    style={{ left: '35%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="rounded-xl px-5 py-2.5 text-sm font-semibold bg-signal text-white hover:bg-signal/90 shadow-lg shadow-signal/20 transition-all disabled:opacity-50"
        >
          {isSaving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  )
}
