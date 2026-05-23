'use client'
import { useState, useRef } from 'react'
import { Camera, Plus } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useProfileStore } from '@/lib/stores/profile.store'
import { useAuthStore } from '@/lib/stores/auth.store'
import { SITUATION_LABELS } from '@/lib/types/profile.types'
import type { ProfessionalSituation } from '@/lib/types/profile.types'
import { useSectionEnter } from '@/lib/gsap/hooks'

export function SectionAbout() {
  const { profile, updateProfile, isSaving, setSaving } = useProfileStore()
  const { updatePartialProfile } = useAuthStore()
  const sectionRef = useRef<HTMLDivElement>(null)
  useSectionEnter(sectionRef, 'about')

  const [form, setForm] = useState({
    first_name:              profile?.first_name ?? '',
    last_name:               profile?.last_name ?? '',
    professional_situation:  profile?.professional_situation ?? 'employed' as ProfessionalSituation,
    vat_number:              profile?.vat_number ?? '',
    avatar_url:              profile?.avatar_url ?? '',
  })

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setForm(f => ({ ...f, avatar_url: url }))
  }

  async function handleSave() {
    setSaving(true)
    const patch = {
      ...form,
      display_name: `${form.first_name} ${form.last_name}`.trim(),
    }
    updateProfile(patch)
    updatePartialProfile(patch)
    await new Promise(r => setTimeout(r, 400))
    setSaving(false)
  }

  const isFreelancer = form.professional_situation === 'freelancer'
  const initials = `${form.first_name[0] ?? ''}${form.last_name[0] ?? ''}`.toUpperCase() || '?'

  return (
    <div ref={sectionRef} className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-foreground mb-1">About</h2>
        <p className="text-sm text-muted-foreground">Your identity and professional situation</p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <label className="group relative w-20 h-20 rounded-full cursor-pointer">
          <div className={cn(
            'w-20 h-20 rounded-full border-2 flex items-center justify-center overflow-hidden transition-all',
            form.avatar_url ? 'border-primary/30' : 'border-dashed border-border/60 group-hover:border-primary/30'
          )}>
            {form.avatar_url ? (
              <img src={form.avatar_url} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-bold text-muted-foreground">{initials}</span>
            )}
          </div>
          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-3 h-3 text-white" />
          </div>
          <input type="file" accept="image/*" className="sr-only" onChange={handleAvatarChange} />
        </label>
        <div>
          <p className="text-sm font-medium text-foreground">{form.first_name || form.last_name ? `${form.first_name} ${form.last_name}`.trim() : 'Your name'}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Click avatar to change photo</p>
        </div>
      </div>

      {/* Name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">First name</label>
          <input
            type="text"
            value={form.first_name}
            onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
            placeholder="Marco"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Last name</label>
          <input
            type="text"
            value={form.last_name}
            onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))}
            placeholder="Rossi"
          />
        </div>
      </div>

      {/* Professional situation */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-2">Professional situation</label>
        <div className="grid grid-cols-2 gap-2">
          {(['freelancer', 'employed', 'seeking', 'student'] as ProfessionalSituation[]).map(key => (
            <button
              key={key}
              type="button"
              onClick={() => setForm(f => ({ ...f, professional_situation: key }))}
              className={cn(
                'rounded-none border px-3 py-2.5 text-sm text-left transition-all',
                form.professional_situation === key
                  ? 'border-primary/40 bg-primary/10 text-primary font-medium'
                  : 'border-border/60 text-muted-foreground hover:border-border hover:text-foreground'
              )}
            >
              {SITUATION_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      {/* VAT — freelancers only */}
      {isFreelancer && (
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">
            VAT number <span className="text-muted-foreground/50">(optional)</span>
          </label>
          <input
            type="text"
            value={form.vat_number}
            onChange={e => setForm(f => ({ ...f, vat_number: e.target.value }))}
            placeholder="e.g. IT12345678901"
          />
          <p className="text-[11px] text-muted-foreground/50 mt-1.5">Only needed if you issue invoices as a freelancer</p>
        </div>
      )}

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
