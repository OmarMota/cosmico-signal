'use client'
import { useState, useRef } from 'react'
import { Plus, X, Copy, Check, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useProfileStore } from '@/lib/stores/profile.store'
import { useAuthStore } from '@/lib/stores/auth.store'
import {
  LINK_PLATFORM_LABELS,
  LANGUAGE_LEVEL_LABELS,
} from '@/lib/types/profile.types'
import type {
  ProfileLink,
  Language,
  LanguageLevel,
  WorkplaceType,
} from '@/lib/types/profile.types'
import { useSectionEnter } from '@/lib/gsap/hooks'

const LINK_PLATFORMS = Object.keys(LINK_PLATFORM_LABELS) as ProfileLink['platform'][]
const LANGUAGE_LEVELS = Object.keys(LANGUAGE_LEVEL_LABELS) as LanguageLevel[]

export function SectionBasics() {
  const { profile, updateProfile, isSaving, setSaving } = useProfileStore()
  const { updatePartialProfile } = useAuthStore()
  const sectionRef = useRef<HTMLDivElement>(null)
  useSectionEnter(sectionRef, 'basics')
  const [copied, setCopied] = useState(false)

  const [form, setForm] = useState({
    job_title:     profile?.job_title ?? '',
    email:         profile?.email ?? 'demo@cosmico.io',
    resume_url:    profile?.resume_url ?? '',
    portfolio_url: profile?.portfolio_url ?? '',
    links:         profile?.links ?? [] as ProfileLink[],
    workplace:     profile?.workplace ?? { type: 'remote' as WorkplaceType },
    languages:     profile?.languages ?? [] as Language[],
    referral_code: profile?.referral_code ?? 'CS-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
  })

  // Link management
  const [newLink, setNewLink] = useState<{ platform: ProfileLink['platform']; url: string }>({ platform: 'linkedin', url: '' })

  function addLink() {
    if (!newLink.url.trim()) return
    setForm(f => ({ ...f, links: [...f.links, { ...newLink }] }))
    setNewLink({ platform: 'linkedin', url: '' })
  }

  function removeLink(idx: number) {
    setForm(f => ({ ...f, links: f.links.filter((_, i) => i !== idx) }))
  }

  // Language management
  const [newLang, setNewLang] = useState<Language>({ name: '', level: 'B2' })

  function addLanguage() {
    if (!newLang.name.trim()) return
    setForm(f => ({ ...f, languages: [...f.languages, { ...newLang }] }))
    setNewLang({ name: '', level: 'B2' })
  }

  function removeLang(idx: number) {
    setForm(f => ({ ...f, languages: f.languages.filter((_, i) => i !== idx) }))
  }

  async function handleSave() {
    setSaving(true)
    updateProfile(form)
    updatePartialProfile(form)
    await new Promise(r => setTimeout(r, 400))
    setSaving(false)
  }

  function copyReferral() {
    navigator.clipboard.writeText(`https://cosmico.io/join?ref=${form.referral_code}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div ref={sectionRef} className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-foreground mb-1">Basics</h2>
        <p className="text-sm text-muted-foreground">Role details, links and languages</p>
      </div>

      {/* Job title */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Job title</label>
        <input
          type="text"
          value={form.job_title}
          onChange={e => setForm(f => ({ ...f, job_title: e.target.value }))}
          placeholder="e.g. Senior Frontend Engineer"
        />
      </div>

      {/* Email (disabled) */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">
          Email <span className="text-muted-foreground/40 ml-1 text-[11px]">— cannot be changed here</span>
        </label>
        <div className="relative">
          <input
            type="email"
            value={form.email}
            disabled
            className="opacity-50 cursor-not-allowed bg-muted/20"
          />
        </div>
      </div>

      {/* Resume */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Resume URL</label>
        <input
          type="url"
          value={form.resume_url}
          onChange={e => setForm(f => ({ ...f, resume_url: e.target.value }))}
          placeholder="https://drive.google.com/your-cv"
        />
      </div>

      {/* Portfolio */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Portfolio URL</label>
        <input
          type="url"
          value={form.portfolio_url}
          onChange={e => setForm(f => ({ ...f, portfolio_url: e.target.value }))}
          placeholder="https://yoursite.com"
        />
      </div>

      {/* Links */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-2">Links</label>
        <div className="space-y-2 mb-3">
          {form.links.map((link, idx) => (
            <div key={idx} className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/40 px-3 py-2">
              <span className="text-xs font-medium text-muted-foreground w-20 flex-none">{LINK_PLATFORM_LABELS[link.platform]}</span>
              <span className="text-xs text-foreground flex-1 truncate">{link.url}</span>
              <button onClick={() => removeLink(idx)} className="text-muted-foreground/40 hover:text-destructive transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <select
            value={newLink.platform}
            onChange={e => setNewLink(n => ({ ...n, platform: e.target.value as ProfileLink['platform'] }))}
            className="rounded-[10px] border border-border/50 bg-muted/30 px-2 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-signal/50 w-32"
          >
            {LINK_PLATFORMS.map(p => (
              <option key={p} value={p}>{LINK_PLATFORM_LABELS[p]}</option>
            ))}
          </select>
          <input
            type="url"
            value={newLink.url}
            onChange={e => setNewLink(n => ({ ...n, url: e.target.value }))}
            onKeyDown={e => e.key === 'Enter' && addLink()}
            placeholder="https://…"
            className="flex-1 rounded-[10px] border border-border/50 bg-muted/30 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-signal/50"
          />
          <button
            onClick={addLink}
            className="rounded-xl bg-signal/15 border border-signal/30 px-3 py-2 text-xs text-signal-light hover:bg-signal/25 transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Workplace */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-2">Workplace preference</label>
        <div className="flex gap-2 mb-3">
          {(['remote', 'hybrid', 'onsite'] as WorkplaceType[]).map(type => (
            <button
              key={type}
              type="button"
              onClick={() => setForm(f => ({ ...f, workplace: { ...f.workplace, type } }))}
              className={cn(
                'flex-1 rounded-xl border py-2 text-xs font-medium transition-all capitalize',
                form.workplace.type === type
                  ? 'border-signal/60 bg-signal/10 text-signal-light'
                  : 'border-border/60 text-muted-foreground hover:border-border'
              )}
            >
              {type}
            </button>
          ))}
        </div>
        {(form.workplace.type === 'hybrid' || form.workplace.type === 'onsite') && (
          <input
            type="text"
            value={form.workplace.city ?? ''}
            onChange={e => setForm(f => ({ ...f, workplace: { ...f.workplace, city: e.target.value } }))}
            placeholder="City (e.g. Milan, Rome)"
          />
        )}
      </div>

      {/* Languages */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-2">Languages</label>
        <div className="space-y-2 mb-3">
          {form.languages.map((lang, idx) => (
            <div key={idx} className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/40 px-3 py-2">
              <span className="text-sm text-foreground flex-1">{lang.name}</span>
              <span className="text-xs text-muted-foreground">{LANGUAGE_LEVEL_LABELS[lang.level]}</span>
              <button onClick={() => removeLang(idx)} className="text-muted-foreground/40 hover:text-destructive transition-colors ml-1">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newLang.name}
            onChange={e => setNewLang(n => ({ ...n, name: e.target.value }))}
            onKeyDown={e => e.key === 'Enter' && addLanguage()}
            placeholder="Language (e.g. Italian)"
            className="flex-1 rounded-[10px] border border-border/50 bg-muted/30 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-signal/50"
          />
          <select
            value={newLang.level}
            onChange={e => setNewLang(n => ({ ...n, level: e.target.value as LanguageLevel }))}
            className="rounded-[10px] border border-border/50 bg-muted/30 px-2 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-signal/50 w-28"
          >
            {LANGUAGE_LEVELS.map(l => (
              <option key={l} value={l}>{LANGUAGE_LEVEL_LABELS[l]}</option>
            ))}
          </select>
          <button
            onClick={addLanguage}
            className="rounded-xl bg-signal/15 border border-signal/30 px-3 py-2 text-xs text-signal-light hover:bg-signal/25 transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Referral */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-2">Referral program</label>
        <div className="rounded-xl border border-border/50 bg-card/40 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-muted-foreground">Your referral code</p>
            <button
              onClick={copyReferral}
              className="flex items-center gap-1.5 text-xs text-signal-light hover:text-signal transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy link'}
            </button>
          </div>
          <p className="text-base font-mono font-bold text-foreground tracking-wider">{form.referral_code}</p>
          <p className="text-[11px] text-muted-foreground/50 mt-1">
            cosmico.io/join?ref={form.referral_code}
          </p>
        </div>
      </div>

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
