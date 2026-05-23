'use client'
import { useState, useRef } from 'react'
import { cn } from '@/lib/utils/cn'
import { useProfileStore } from '@/lib/stores/profile.store'
import { useAuthStore } from '@/lib/stores/auth.store'
import {
  EXPERIENCE_LABELS,
  COMPANY_TYPE_LABELS,
  INDUSTRY_LABELS,
  INDUSTRY_ICONS,
} from '@/lib/types/profile.types'
import type { ExperienceYears, CompanyType, Industry } from '@/lib/types/profile.types'
import { useSectionEnter } from '@/lib/gsap/hooks'

function Chip({
  label, selected, onClick, icon,
}: { label: string; selected: boolean; onClick: () => void; icon?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-none border px-3 py-2 text-sm text-left transition-all duration-150',
        selected
          ? 'border-primary/40 bg-primary/10 text-primary font-medium'
          : 'border-border/60 text-muted-foreground hover:border-border hover:text-foreground'
      )}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {label}
    </button>
  )
}

export function SectionExperiences() {
  const { profile, updateProfile, isSaving, setSaving } = useProfileStore()
  const { updatePartialProfile } = useAuthStore()
  const sectionRef = useRef<HTMLDivElement>(null)
  useSectionEnter(sectionRef, 'experiences')

  const [form, setForm] = useState({
    experience_years: profile?.experience_years as ExperienceYears | undefined,
    company_types:    profile?.company_types ?? [] as CompanyType[],
    industries:       profile?.industries ?? [] as Industry[],
  })

  function toggleCompany(type: CompanyType) {
    setForm(f => ({
      ...f,
      company_types: f.company_types.includes(type)
        ? f.company_types.filter(c => c !== type)
        : [...f.company_types, type],
    }))
  }

  function toggleIndustry(ind: Industry) {
    setForm(f => ({
      ...f,
      industries: f.industries.includes(ind)
        ? f.industries.filter(i => i !== ind)
        : [...f.industries, ind],
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
        <h2 className="text-base font-semibold text-foreground mb-1">Experiences</h2>
        <p className="text-sm text-muted-foreground">Where and how long you've built your career</p>
      </div>

      {/* Experience years */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-2">Years of professional experience</label>
        <div className="grid grid-cols-4 gap-2">
          {(Object.entries(EXPERIENCE_LABELS) as [ExperienceYears, string][]).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setForm(f => ({ ...f, experience_years: key }))}
              className={cn(
                'rounded-none border py-3 text-sm font-medium text-center transition-all',
                form.experience_years === key
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'border-border/60 text-muted-foreground hover:border-border hover:text-foreground'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Company types */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-2">
          Company types you've worked at
          {form.company_types.length > 0 && (
            <span className="ml-2 text-primary text-[11px]">{form.company_types.length} selected</span>
          )}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(Object.entries(COMPANY_TYPE_LABELS) as [CompanyType, string][]).map(([key, label]) => (
            <Chip key={key} label={label} selected={form.company_types.includes(key)} onClick={() => toggleCompany(key)} />
          ))}
        </div>
      </div>

      {/* Industries */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-2">
          Industries you've worked in
          {form.industries.length > 0 && (
            <span className="ml-2 text-primary text-[11px]">{form.industries.length} selected</span>
          )}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {(Object.entries(INDUSTRY_LABELS) as [Industry, string][]).map(([key, label]) => (
            <Chip
              key={key}
              label={label}
              icon={INDUSTRY_ICONS[key]}
              selected={form.industries.includes(key)}
              onClick={() => toggleIndustry(key)}
            />
          ))}
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-none hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {isSaving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  )
}
