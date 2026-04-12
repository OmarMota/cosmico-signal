'use client'
import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, Plus, X, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { OnboardingShell } from '@/components/onboarding/OnboardingShell'
import { useAuthStore } from '@/lib/stores/auth.store'
import { useOnboardingStore } from '@/lib/stores/onboarding.store'
import {
  ROLE_CATEGORIES, ROLE_CATEGORY_ICONS,
  SENIORITY_LABELS,
  SITUATION_LABELS, SITUATION_DESCRIPTIONS,
  EXPERIENCE_LABELS,
  COMPANY_TYPE_LABELS,
  INDUSTRY_LABELS, INDUSTRY_ICONS,
  AVAILABILITY_LABELS, AVAILABILITY_DESCRIPTIONS,
  GOAL_LABELS,
  SPECIALIZATIONS_BY_ROLE, TRAJECTORY_SKILLS_BY_ROLE,
} from '@/lib/types/profile.types'
import type {
  RoleCategory, SeniorityLevel, ProfessionalSituation,
  ExperienceYears, CompanyType, Industry, AvailabilityStatus, GoalType,
  Skill,
} from '@/lib/types/profile.types'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { fadeUpEnter, playSuccessSequence } from '@/lib/gsap/animations'

gsap.registerPlugin(useGSAP)

// ─── Helper: chip select ──────────────────────────────────────────────────────
function Chip({
  label,
  selected,
  onClick,
  icon,
}: {
  label: string
  selected: boolean
  onClick: () => void
  icon?: string
}) {
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
      {icon && <span className="mr-1.5">{icon}</span>}
      {label}
    </button>
  )
}

// ─── Step 1: Welcome ──────────────────────────────────────────────────────────
function StepWelcome({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const greetRef = useRef<HTMLParagraphElement>(null)
  const firstName = data.first_name ?? ''

  useEffect(() => {
    if (greetRef.current && firstName) {
      gsap.fromTo(greetRef.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' })
    }
  }, [firstName])

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    onChange({ ...data, avatar_url: url })
  }

  return (
    <div className="space-y-5">
      {/* Avatar upload */}
      <div className="flex justify-center">
        <label className="group relative w-20 h-20 rounded-full cursor-pointer">
          <div className={cn(
            'w-20 h-20 rounded-full border-2 border-dashed flex items-center justify-center transition-all',
            data.avatar_url
              ? 'border-signal/60'
              : 'border-border/60 group-hover:border-signal/40'
          )}>
            {data.avatar_url ? (
              <img src={data.avatar_url} alt="avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              <Camera className="w-6 h-6 text-muted-foreground group-hover:text-signal transition-colors" />
            )}
          </div>
          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-signal flex items-center justify-center shadow-md">
            <Plus className="w-3 h-3 text-white" />
          </div>
          <input type="file" accept="image/*" className="sr-only" onChange={handleAvatarChange} />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">First name</label>
          <input
            type="text"
            value={data.first_name ?? ''}
            onChange={e => onChange({ ...data, first_name: e.target.value, display_name: `${e.target.value} ${data.last_name ?? ''}`.trim() })}
            placeholder="e.g. Marco"
            autoFocus
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Last name</label>
          <input
            type="text"
            value={data.last_name ?? ''}
            onChange={e => onChange({ ...data, last_name: e.target.value, display_name: `${data.first_name ?? ''} ${e.target.value}`.trim() })}
            placeholder="e.g. Rossi"
          />
        </div>
      </div>

      {firstName && (
        <p ref={greetRef} className="text-sm text-signal-light/80 text-center pt-1">
          ✦ Nice to meet you, {firstName}
        </p>
      )}
    </div>
  )
}

// ─── Step 2: Role ─────────────────────────────────────────────────────────────
function StepRole({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-2">Role Category</label>
        <div className="grid grid-cols-2 gap-2">
          {(Object.entries(ROLE_CATEGORIES) as [RoleCategory, string][]).map(([key, label]) => (
            <Chip
              key={key}
              label={label}
              icon={ROLE_CATEGORY_ICONS[key]}
              selected={data.role_category === key}
              onClick={() => onChange({ ...data, role_category: key, main_specialization: undefined })}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Job Title</label>
        <input
          type="text"
          value={data.job_title ?? ''}
          onChange={e => onChange({ ...data, job_title: e.target.value })}
          placeholder="e.g. Senior Frontend Engineer"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-2">Seniority</label>
        <div className="flex gap-2">
          {(Object.entries(SENIORITY_LABELS) as [SeniorityLevel, string][]).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => onChange({ ...data, seniority_level: key })}
              className={cn(
                'flex-1 rounded-lg border px-2 py-1.5 text-xs transition-all',
                data.seniority_level === key
                  ? 'border-signal/60 bg-signal/10 text-signal-light font-medium'
                  : 'border-border/60 text-muted-foreground hover:border-border'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Step 3: Professional Situation ──────────────────────────────────────────
function StepSituation({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const vatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!vatRef.current) return
    if (data.professional_situation === 'freelancer') {
      gsap.fromTo(vatRef.current, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out' })
    } else {
      gsap.to(vatRef.current, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' })
    }
  }, [data.professional_situation])

  return (
    <div className="space-y-3">
      {(Object.entries(SITUATION_LABELS) as [ProfessionalSituation, string][]).map(([key, label]) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange({ ...data, professional_situation: key })}
          className={cn(
            'w-full rounded-xl border p-4 text-left transition-all',
            data.professional_situation === key
              ? 'border-signal/60 bg-signal/10'
              : 'border-border/50 hover:border-border'
          )}
        >
          <p className={cn('text-sm font-medium mb-0.5', data.professional_situation === key ? 'text-signal-light' : 'text-foreground')}>
            {label}
          </p>
          <p className="text-xs text-muted-foreground">{SITUATION_DESCRIPTIONS[key]}</p>
        </button>
      ))}

      {/* VAT number — only for freelancers */}
      <div ref={vatRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div className="pt-2">
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">VAT Number (optional)</label>
          <input
            type="text"
            value={data.vat_number ?? ''}
            onChange={e => onChange({ ...data, vat_number: e.target.value })}
            placeholder="e.g. IT12345678901"
          />
          <p className="text-[11px] text-muted-foreground/50 mt-1.5">Only required if you issue invoices</p>
        </div>
      </div>
    </div>
  )
}

// ─── Step 4: Skills ───────────────────────────────────────────────────────────
function StepSkills({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const [input, setInput] = useState('')
  const skills: Skill[] = data.skills ?? []

  function addSkill() {
    // Split on commas and semicolons, trim each, deduplicate
    const names = input.split(/[,;]+/).map(s => s.trim()).filter(Boolean)
    if (names.length === 0) return
    const newSkills = names
      .filter(name => !skills.find(s => s.name.toLowerCase() === name.toLowerCase()))
      .map(name => ({ name, proficiency: 3, category: 'technical' as const }))
    if (newSkills.length === 0) return
    onChange({ ...data, skills: [...skills, ...newSkills] })
    setInput('')
  }

  function removeSkill(name: string) {
    onChange({ ...data, skills: skills.filter(s => s.name !== name) })
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
          placeholder="e.g. React, TypeScript, Figma…"
          className="flex-1"
        />
        <button
          type="button"
          onClick={addSkill}
          className="rounded-xl bg-signal/15 border border-signal/30 px-3 py-2 text-sm text-signal-light hover:bg-signal/25 transition-all"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 min-h-[36px]">
        {skills.map(skill => (
          <span
            key={skill.name}
            className="flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 text-xs text-signal-light"
          >
            {skill.name}
            <button type="button" onClick={() => removeSkill(skill.name)} className="text-signal/50 hover:text-signal-light transition-colors">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>

      {skills.length === 0 && (
        <p className="text-xs text-muted-foreground/50">Add at least 1 skill to continue</p>
      )}
      {skills.length > 0 && (
        <p className="text-xs text-muted-foreground/60">{skills.length} skill{skills.length !== 1 ? 's' : ''} added · keep going!</p>
      )}
    </div>
  )
}

// ─── Step 5: Experience ───────────────────────────────────────────────────────
function StepExperience({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const companyTypes: CompanyType[] = data.company_types ?? []
  const industries: Industry[] = data.industries ?? []

  function toggleCompany(type: CompanyType) {
    onChange({
      ...data,
      company_types: companyTypes.includes(type)
        ? companyTypes.filter(c => c !== type)
        : [...companyTypes, type],
    })
  }

  function toggleIndustry(ind: Industry) {
    onChange({
      ...data,
      industries: industries.includes(ind)
        ? industries.filter(i => i !== ind)
        : [...industries, ind],
    })
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-2">Years of experience</label>
        <div className="grid grid-cols-4 gap-2">
          {(Object.entries(EXPERIENCE_LABELS) as [ExperienceYears, string][]).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => onChange({ ...data, experience_years: key })}
              className={cn(
                'rounded-xl border py-2.5 text-xs font-medium text-center transition-all',
                data.experience_years === key
                  ? 'border-signal/60 bg-signal/10 text-signal-light'
                  : 'border-border/60 text-muted-foreground hover:border-border'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-2">Company types you've worked at</label>
        <div className="grid grid-cols-2 gap-2">
          {(Object.entries(COMPANY_TYPE_LABELS) as [CompanyType, string][]).map(([key, label]) => (
            <Chip key={key} label={label} selected={companyTypes.includes(key)} onClick={() => toggleCompany(key)} />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-2">Industries you've worked in</label>
        <div className="grid grid-cols-3 gap-2">
          {(Object.entries(INDUSTRY_LABELS) as [Industry, string][]).map(([key, label]) => (
            <Chip key={key} label={label} icon={INDUSTRY_ICONS[key]} selected={industries.includes(key)} onClick={() => toggleIndustry(key)} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Step 6: Availability & Rate ──────────────────────────────────────────────
function StepAvailabilityRate({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="block text-xs font-medium text-muted-foreground mb-1">Availability</label>
        {(['available', 'open', 'unavailable'] as AvailabilityStatus[]).map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange({ ...data, availability: opt })}
            className={cn(
              'w-full rounded-xl border p-4 text-left transition-all',
              data.availability === opt
                ? 'border-signal/60 bg-signal/10'
                : 'border-border/50 hover:border-border'
            )}
          >
            <p className={cn('text-sm font-medium mb-0.5', data.availability === opt ? 'text-signal-light' : 'text-foreground')}>
              {AVAILABILITY_LABELS[opt]}
            </p>
            <p className="text-xs text-muted-foreground">{AVAILABILITY_DESCRIPTIONS[opt]}</p>
          </button>
        ))}
      </div>

      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Hours / week available</label>
        <input
          type="number"
          value={data.hours_per_week ?? ''}
          onChange={e => onChange({ ...data, hours_per_week: parseInt(e.target.value) || undefined })}
          placeholder="e.g. 32"
          min={1} max={80}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-2">Hourly rate range (optional)</label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] text-muted-foreground/60 mb-1">Min (€/hr)</label>
            <input
              type="number"
              value={data.hourly_rate_min ?? ''}
              onChange={e => onChange({ ...data, hourly_rate_min: parseInt(e.target.value) || undefined })}
              placeholder="80"
              min={0}
            />
          </div>
          <div>
            <label className="block text-[11px] text-muted-foreground/60 mb-1">Max (€/hr)</label>
            <input
              type="number"
              value={data.hourly_rate_max ?? ''}
              onChange={e => onChange({ ...data, hourly_rate_max: parseInt(e.target.value) || undefined })}
              placeholder="150"
              min={0}
            />
          </div>
        </div>
        <p className="text-[11px] text-muted-foreground/50 mt-1.5">Only visible to matched opportunities</p>
      </div>
    </div>
  )
}

// ─── Step 7: Goals & Specialties ─────────────────────────────────────────────
function StepGoalsSpecialties({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const roleCategory: RoleCategory = data.role_category ?? 'other'
  const specializations = SPECIALIZATIONS_BY_ROLE[roleCategory] ?? []
  const trajectorySkills = TRAJECTORY_SKILLS_BY_ROLE[roleCategory] ?? []
  const selectedGoals: GoalType[] = data.goals ?? []
  const selectedTrajectory: string[] = data.skill_trajectory ?? []

  function toggleGoal(g: GoalType) {
    onChange({
      ...data,
      goals: selectedGoals.includes(g)
        ? selectedGoals.filter(x => x !== g)
        : selectedGoals.length < 3 ? [...selectedGoals, g] : selectedGoals,
    })
  }

  function toggleTrajectory(skill: string) {
    onChange({
      ...data,
      skill_trajectory: selectedTrajectory.includes(skill)
        ? selectedTrajectory.filter(x => x !== skill)
        : selectedTrajectory.length < 3 ? [...selectedTrajectory, skill] : selectedTrajectory,
    })
  }

  return (
    <div className="space-y-5">
      {specializations.length > 0 && (
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-2">Main specialization</label>
          <div className="grid grid-cols-2 gap-2">
            {specializations.map(spec => (
              <Chip
                key={spec}
                label={spec}
                selected={data.main_specialization === spec}
                onClick={() => onChange({ ...data, main_specialization: spec })}
              />
            ))}
          </div>
        </div>
      )}

      {trajectorySkills.length > 0 && (
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Where do you want to grow? <span className="text-muted-foreground/50">(pick up to 3)</span></label>
          <div className="flex flex-wrap gap-2 mt-2">
            {trajectorySkills.map(skill => (
              <Chip
                key={skill}
                label={skill}
                selected={selectedTrajectory.includes(skill)}
                onClick={() => toggleTrajectory(skill)}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">Goals <span className="text-muted-foreground/50">(pick up to 3)</span></label>
        <div className="space-y-2 mt-2">
          {(Object.entries(GOAL_LABELS) as [GoalType, string][]).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => toggleGoal(key)}
              className={cn(
                'w-full rounded-lg border px-4 py-3 text-sm text-left flex items-center gap-3 transition-all',
                selectedGoals.includes(key)
                  ? 'border-signal/60 bg-signal/10 text-signal-light'
                  : 'border-border/50 text-muted-foreground hover:border-border hover:text-foreground'
              )}
            >
              {selectedGoals.includes(key) && <CheckCircle2 className="w-4 h-4 text-signal flex-none" />}
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Success screen ───────────────────────────────────────────────────────────
function SuccessScreen() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (ref.current) fadeUpEnter(ref.current, { duration: 0.5 })
  }, { scope: ref })
  return (
    <div ref={ref} className="min-h-screen bg-background flex flex-col items-center justify-center p-6 opacity-0">
      <div className="w-20 h-20 rounded-full bg-signal/20 flex items-center justify-center mb-6 shadow-[0_0_40px_hsla(263,70%,62%,0.30)]">
        <CheckCircle2 className="w-10 h-10 text-signal" />
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Your signal is live.</h1>
      <p className="text-muted-foreground text-center text-sm">Redirecting you to your dashboard…</p>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function OnboardingPage() {
  const router = useRouter()
  const { updatePartialProfile, completeOnboarding } = useAuthStore()
  const { currentStep, stepData, isLoading, nextStep, prevStep, updateStepData, setLoading } = useOnboardingStore()
  const [showSuccess, setShowSuccess] = useState(false)

  function isStepValid(): boolean {
    switch (currentStep) {
      case 1: return !!(stepData.first_name?.trim() && stepData.last_name?.trim())
      case 2: return !!(stepData.role_category && stepData.job_title?.trim())
      case 3: return !!stepData.professional_situation
      case 4: return Array.isArray(stepData.skills) && stepData.skills.length >= 1
      case 5: return true
      case 6: return !!stepData.availability
      case 7: return true
      default: return true
    }
  }

  async function handleNext() {
    if (!isStepValid()) return
    setLoading(true)
    updatePartialProfile(stepData)

    if (currentStep === 7) {
      completeOnboarding(stepData)
      setShowSuccess(true)
      setTimeout(() => router.push('/dashboard'), 2000)
    } else {
      nextStep()
    }
    setLoading(false)
  }

  function handleBack() {
    prevStep()
  }

  const STEPS = [
    <StepWelcome          key={1} data={stepData} onChange={updateStepData} />,
    <StepRole             key={2} data={stepData} onChange={updateStepData} />,
    <StepSituation        key={3} data={stepData} onChange={updateStepData} />,
    <StepSkills           key={4} data={stepData} onChange={updateStepData} />,
    <StepExperience       key={5} data={stepData} onChange={updateStepData} />,
    <StepAvailabilityRate key={6} data={stepData} onChange={updateStepData} />,
    <StepGoalsSpecialties key={7} data={stepData} onChange={updateStepData} />,
  ]

  if (showSuccess) return <SuccessScreen />

  return (
    <OnboardingShell
      currentStep={currentStep}
      onNext={handleNext}
      onBack={handleBack}
      canProceed={isStepValid()}
      isLoading={isLoading}
    >
      {STEPS[currentStep - 1]}
    </OnboardingShell>
  )
}
