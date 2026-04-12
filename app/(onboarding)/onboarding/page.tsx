'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OnboardingShell } from '@/components/onboarding/OnboardingShell'
import { ROLE_CATEGORIES, SENIORITY_LABELS } from '@/lib/types/profile.types'
import { useAuthStore } from '@/lib/stores/auth.store'

// --- STEP COMPONENTS ---

function StepRole({ data, onChange }: any) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-2">Role Category</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(ROLE_CATEGORIES).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => onChange({ ...data, role_category: key })}
              className={`rounded-lg border px-3 py-2 text-sm text-left transition-all ${
                data.role_category === key
                  ? 'border-violet-500/60 bg-violet-500/10 text-violet-200'
                  : 'border-border/50 text-muted-foreground hover:border-border'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Job Title</label>
        <input
          type="text"
          value={data.primary_role ?? ''}
          onChange={e => onChange({ ...data, primary_role: e.target.value })}
          className="w-full rounded-lg border border-border/50 bg-muted/30 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
          placeholder="e.g. Senior Frontend Engineer"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-2">Seniority</label>
        <div className="flex gap-2">
          {Object.entries(SENIORITY_LABELS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => onChange({ ...data, seniority_level: key })}
              className={`flex-1 rounded-lg border px-2 py-1.5 text-xs transition-all ${
                data.seniority_level === key
                  ? 'border-violet-500/60 bg-violet-500/10 text-violet-200'
                  : 'border-border/50 text-muted-foreground hover:border-border'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function StepSkills({ data, onChange }: any) {
  const [input, setInput] = useState('')
  const skills: string[] = data.skills?.map((s: any) => s.name) ?? []

  function addSkill() {
    if (!input.trim() || skills.includes(input.trim())) return
    onChange({
      ...data,
      skills: [...(data.skills ?? []), { name: input.trim(), proficiency: 3, category: 'technical' }],
    })
    setInput('')
  }

  function removeSkill(name: string) {
    onChange({ ...data, skills: (data.skills ?? []).filter((s: any) => s.name !== name) })
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
          className="flex-1 rounded-lg border border-border/50 bg-muted/30 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
          placeholder="e.g. React, TypeScript, Figma..."
        />
        <button
          type="button"
          onClick={addSkill}
          className="rounded-lg bg-violet-500/20 border border-violet-500/30 px-3 py-2 text-sm text-violet-300 hover:bg-violet-500/30 transition-all"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <span
            key={skill}
            className="flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-200"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="text-violet-400/50 hover:text-violet-300 transition-colors"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      {skills.length === 0 && (
        <p className="text-xs text-muted-foreground/50">Add at least 3 skills to continue</p>
      )}
    </div>
  )
}

function StepRate({ data, onChange }: any) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Min Rate ($/hr)</label>
          <input
            type="number"
            value={data.hourly_rate_min ?? ''}
            onChange={e => onChange({ ...data, hourly_rate_min: parseInt(e.target.value) })}
            className="w-full rounded-lg border border-border/50 bg-muted/30 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
            placeholder="80"
            min={0}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Max Rate ($/hr)</label>
          <input
            type="number"
            value={data.hourly_rate_max ?? ''}
            onChange={e => onChange({ ...data, hourly_rate_max: parseInt(e.target.value) })}
            className="w-full rounded-lg border border-border/50 bg-muted/30 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
            placeholder="150"
            min={0}
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground/60">
        Your rate is only shown to matched opportunities. You can update it anytime.
      </p>
    </div>
  )
}

function StepAvailability({ data, onChange }: any) {
  const options = [
    { value: 'available', label: 'Available Now', desc: 'Ready to start immediately' },
    { value: 'open', label: 'Open to Work', desc: 'Considering the right opportunities' },
    { value: 'unavailable', label: 'Not Available', desc: 'Building my signal quietly' },
  ]
  return (
    <div className="space-y-3">
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange({ ...data, availability: opt.value })}
          className={`w-full rounded-xl border p-4 text-left transition-all ${
            data.availability === opt.value
              ? 'border-violet-500/60 bg-violet-500/10'
              : 'border-border/50 hover:border-border'
          }`}
        >
          <p className={`text-sm font-medium mb-0.5 ${data.availability === opt.value ? 'text-violet-200' : 'text-foreground'}`}>
            {opt.label}
          </p>
          <p className="text-xs text-muted-foreground">{opt.desc}</p>
        </button>
      ))}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1.5 mt-2">Hours/week available</label>
        <input
          type="number"
          value={data.hours_per_week ?? ''}
          onChange={e => onChange({ ...data, hours_per_week: parseInt(e.target.value) })}
          className="w-full rounded-lg border border-border/50 bg-muted/30 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
          placeholder="20"
          min={1}
          max={80}
        />
      </div>
    </div>
  )
}

function StepGoals({ data, onChange }: any) {
  const goalTypes = [
    { value: 'seniority_advance', label: 'Advance to a senior role' },
    { value: 'role_change', label: 'Transition to a new role' },
    { value: 'rate_increase', label: 'Increase my rate' },
    { value: 'skill_acquire', label: 'Learn a new skill' },
    { value: 'freelance_launch', label: 'Launch my freelance practice' },
    { value: 'full_time_find', label: 'Find full-time work' },
  ]

  const selected: string[] = (data.intents ?? []).map((i: any) => i.intent_type)

  function toggleGoal(type: string) {
    const current = data.intents ?? []
    const exists = current.find((i: any) => i.intent_type === type)
    if (exists) {
      onChange({ ...data, intents: current.filter((i: any) => i.intent_type !== type) })
    } else {
      onChange({ ...data, intents: [...current, { intent_type: type, priority: 1, status: 'active' }] })
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground/70 mb-3">Select up to 3 goals</p>
      {goalTypes.map(goal => (
        <button
          key={goal.value}
          type="button"
          onClick={() => toggleGoal(goal.value)}
          className={`w-full rounded-lg border px-4 py-3 text-sm text-left transition-all ${
            selected.includes(goal.value)
              ? 'border-violet-500/60 bg-violet-500/10 text-violet-200'
              : 'border-border/50 text-muted-foreground hover:border-border'
          }`}
        >
          {goal.label}
        </button>
      ))}
    </div>
  )
}

// --- MAIN PAGE ---
export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Record<string, unknown>>({
    role_category: '',
    primary_role: '',
    seniority_level: 'mid',
    skills: [],
    availability: 'open',
    intents: [],
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { updateNewProfile, completeOnboarding } = useAuthStore()

  const isStepValid = () => {
    switch (step) {
      case 1: return !!(formData.role_category && formData.primary_role)
      case 2: return Array.isArray(formData.skills) && (formData.skills as any[]).length >= 1
      case 3: return true // rate is optional
      case 4: return !!(formData.availability)
      case 5: return true // goals are optional
      default: return true
    }
  }

  async function handleStepComplete() {
    setLoading(true)
    // Persist partial profile data to auth store on every step
    updateNewProfile(formData as any)

    if (step === 5) {
      // Final step — mark onboarding complete and go to dashboard
      completeOnboarding()
      router.push('/dashboard')
    } else {
      setStep(s => s + 1)
    }
    setLoading(false)
  }

  const STEP_COMPONENTS = [
    <StepRole key={1} data={formData} onChange={setFormData} />,
    <StepSkills key={2} data={formData} onChange={setFormData} />,
    <StepRate key={3} data={formData} onChange={setFormData} />,
    <StepAvailability key={4} data={formData} onChange={setFormData} />,
    <StepGoals key={5} data={formData} onChange={setFormData} />,
  ]

  return (
    <OnboardingShell
      currentStep={step}
      onStepComplete={handleStepComplete}
      canProceed={isStepValid()}
      isLoading={loading}
    >
      {STEP_COMPONENTS[step - 1]}
    </OnboardingShell>
  )
}
