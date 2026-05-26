'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { registry } from '@/lib/component-library/registry'
import type { ComponentMeta, Knob, TokenCategory, ChangelogEntry } from '@/lib/component-library/types'
import { cn } from '@/lib/utils'

// ─── Constants ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'ui', label: 'UI Primitives' },
  { id: 'shared', label: 'Shared' },
  { id: 'signal', label: 'Signal' },
  { id: 'profile', label: 'Profile' },
  { id: 'trajectory', label: 'Trajectory' },
  { id: 'opportunities', label: 'Opportunities' },
  { id: 'onboarding', label: 'Onboarding' },
  { id: 'loading', label: 'Loading' },
] as const

const TOKEN_CATEGORY_STYLES: Record<TokenCategory, string> = {
  color:      'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  spacing:    'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
  radius:     'bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300',
  shadow:     'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300',
  typography: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  animation:  'bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300',
  'z-index':  'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
}

type MainTab = 'docs' | 'code' | 'tokens' | 'request' | 'changelog'
type CodeTab = 'react' | 'html' | 'css'

// ─── Page ───────────────────────────────────────────────────────────────────

export default function LibraryPage() {
  const [selectedId, setSelectedId] = useState(registry[0]?.id ?? '')
  const [selectedStoryId, setSelectedStoryId] = useState(registry[0]?.stories[0]?.id ?? '')
  const [knobValues, setKnobValues] = useState<Record<string, unknown>>(() => {
    const first = registry[0]
    if (!first) return {}
    const initial: Record<string, unknown> = {}
    first.knobs.forEach((k) => { initial[k.name] = k.defaultValue })
    const firstStory = first.stories[0]
    if (firstStory && Object.keys(firstStory.defaultProps).length > 0) {
      Object.assign(initial, firstStory.defaultProps)
    }
    return initial
  })
  const [mainTab, setMainTab] = useState<MainTab>('docs')
  const [codeTab, setCodeTab] = useState<CodeTab>('react')
  const [canvasDark, setCanvasDark] = useState(false)
  const [requestWhat, setRequestWhat] = useState('')
  const [requestWhy, setRequestWhy] = useState('')
  const [copied, setCopied] = useState(false)
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    () => new Set(CATEGORIES.map((c) => c.id))
  )

  const activeMeta = useMemo(() => registry.find((m) => m.id === selectedId), [selectedId])
  const activeStory = useMemo(
    () => activeMeta?.stories.find((s) => s.id === selectedStoryId),
    [activeMeta, selectedStoryId],
  )

  // When component changes, reset to first story + init knobs from defaultValues
  useEffect(() => {
    if (!activeMeta) return
    const first = activeMeta.stories[0]
    setSelectedStoryId(first.id)
    setMainTab('docs')
    const initial: Record<string, unknown> = {}
    activeMeta.knobs.forEach((k) => {
      initial[k.name] = k.defaultValue
    })
    if (Object.keys(first.defaultProps).length > 0) {
      Object.assign(initial, first.defaultProps)
    }
    setKnobValues(initial)
    setRequestWhat('')
    setRequestWhy('')
  }, [selectedId]) // eslint-disable-line react-hooks/exhaustive-deps

  // When story changes, merge its defaultProps into current knob values
  useEffect(() => {
    if (!activeStory || Object.keys(activeStory.defaultProps).length === 0) return
    setKnobValues((prev) => ({ ...prev, ...activeStory.defaultProps }))
  }, [selectedStoryId]) // eslint-disable-line react-hooks/exhaustive-deps

  const updateKnob = useCallback((name: string, value: unknown) => {
    setKnobValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [])

  const copyRequest = useCallback(() => {
    if (!activeMeta) return
    const md = [
      `## Change Request: ${activeMeta.name}`,
      '',
      `**Component:** \`${activeMeta.filePath}\``,
      `**Date:** ${new Date().toISOString().split('T')[0]}`,
      '',
      `### What should change?`,
      requestWhat,
      '',
      `### Why?`,
      requestWhy || '_No reason provided._',
    ].join('\n')
    copyToClipboard(md)
  }, [activeMeta, requestWhat, requestWhy, copyToClipboard])

  const categorized = useMemo(
    () =>
      CATEGORIES.map((cat) => ({
        ...cat,
        components: registry.filter((m) => m.category === cat.id),
      })).filter((cat) => cat.components.length > 0),
    [],
  )

  if (!activeMeta || !activeStory) return null

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden text-xs">
      {/* ── Sidebar ───────────────────────────────────────────────────────── */}
      <aside className="w-52 shrink-0 border-r border-border flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-border shrink-0">
          <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
            Component Library
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {categorized.map((cat) => {
            const isOpen = openCategories.has(cat.id)
            return (
              <div key={cat.id} className="mb-1">
                {/* Collapsible section header */}
                <button
                  onClick={() =>
                    setOpenCategories((prev) => {
                      const next = new Set(prev)
                      next.has(cat.id) ? next.delete(cat.id) : next.add(cat.id)
                      return next
                    })
                  }
                  className="w-full flex items-center justify-between px-2 py-1.5 mb-0.5 hover:bg-muted rounded-none transition-colors group"
                >
                  <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                    {cat.label}
                  </span>
                  {isOpen ? (
                    <ChevronDown className="size-3 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="size-3 text-muted-foreground" />
                  )}
                </button>

                {/* Component list */}
                {isOpen && (
                  <div className="mb-3">
                    {cat.components.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedId(m.id)}
                        className={cn(
                          'w-full text-left px-2 py-1.5 rounded-none transition-colors',
                          selectedId === m.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-muted',
                        )}
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-border shrink-0">
          <p className="text-[10px] text-muted-foreground">
            {registry.length} components
          </p>
        </div>
      </aside>

      {/* ── Main ──────────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Component header bar */}
        <div className="px-6 py-3 border-b border-border flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold">{activeMeta.name}</h1>
            <span className="text-muted-foreground">·</span>
            <span className="font-mono text-muted-foreground text-[10px]">
              {activeMeta.filePath}
            </span>
          </div>
          <button
            onClick={() => setCanvasDark((d) => !d)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 border border-border hover:bg-muted transition-colors rounded-none text-[10px] font-medium uppercase tracking-wide"
          >
            {canvasDark ? '☀ Light' : '☾ Dark'} Canvas
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          {/* Story selector */}
          <div className="px-6 pt-4 flex items-center gap-0 border-b border-border">
            {activeMeta.stories.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStoryId(s.id)}
                title={s.description}
                className={cn(
                  'px-3 py-2 rounded-none transition-colors border-b-2 -mb-px',
                  selectedStoryId === s.id
                    ? 'border-foreground text-foreground font-medium'
                    : 'border-transparent text-muted-foreground hover:text-foreground',
                )}
              >
                {s.name}
              </button>
            ))}
          </div>

          {/* Canvas */}
          <div className="px-6 pt-5">
            <div
              className={cn(
                'border border-border overflow-hidden',
                canvasDark ? 'dark' : '',
              )}
            >
              <div
                className={cn(
                  'bg-background min-h-44 flex items-center justify-center p-10',
                  canvasDark
                    ? '[background-image:linear-gradient(45deg,oklch(0.2_0_0)_25%,transparent_25%),linear-gradient(-45deg,oklch(0.2_0_0)_25%,transparent_25%),linear-gradient(45deg,transparent_75%,oklch(0.2_0_0)_75%),linear-gradient(-45deg,transparent_75%,oklch(0.2_0_0)_75%)] [background-size:16px_16px] [background-position:0_0,0_8px,8px_-8px,-8px_0px] bg-[oklch(0.145_0_0)]'
                    : '[background-image:linear-gradient(45deg,oklch(0.94_0_0)_25%,transparent_25%),linear-gradient(-45deg,oklch(0.94_0_0)_25%,transparent_25%),linear-gradient(45deg,transparent_75%,oklch(0.94_0_0)_75%),linear-gradient(-45deg,transparent_75%,oklch(0.94_0_0)_75%)] [background-size:16px_16px] [background-position:0_0,0_8px,8px_-8px,-8px_0px] bg-white',
                )}
              >
                {activeStory.render(knobValues)}
              </div>
            </div>
            {activeStory.description && (
              <p className="mt-2 text-muted-foreground text-[10px]">{activeStory.description}</p>
            )}
          </div>

          {/* Knobs */}
          {activeMeta.knobs.length > 0 && (
            <div className="px-6 pt-4">
              <div className="flex flex-wrap items-end gap-5 p-4 bg-muted/30 border border-border">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground w-full -mb-2">
                  Controls
                </p>
                {activeMeta.knobs.map((knob) => (
                  <KnobControl
                    key={knob.name}
                    knob={knob}
                    value={knobValues[knob.name]}
                    onChange={(v) => updateKnob(knob.name, v)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Main tabs */}
          <div className="px-6 pt-6">
            <div className="flex border-b border-border">
              {(
                [
                  { id: 'docs', label: 'Docs' },
                  { id: 'code', label: 'Code' },
                  { id: 'tokens', label: 'Token Audit' },
                  { id: 'changelog', label: 'Changelog' },
                  { id: 'request', label: 'Change Request' },
                ] as { id: MainTab; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setMainTab(tab.id)}
                  className={cn(
                    'px-4 py-2 rounded-none transition-colors border-b-2 -mb-px',
                    mainTab === tab.id
                      ? 'border-foreground text-foreground font-medium'
                      : 'border-transparent text-muted-foreground hover:text-foreground',
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="px-6 py-6 pb-12">
            {mainTab === 'docs' && <DocsPanel meta={activeMeta} />}
            {mainTab === 'code' && (
              <CodePanel
                meta={activeMeta}
                codeTab={codeTab}
                onCodeTabChange={setCodeTab}
                onCopy={copyToClipboard}
                copied={copied}
              />
            )}
            {mainTab === 'tokens' && <TokenPanel meta={activeMeta} />}
            {mainTab === 'changelog' && <ChangelogPanel meta={activeMeta} />}
            {mainTab === 'request' && (
              <RequestPanel
                meta={activeMeta}
                what={requestWhat}
                why={requestWhy}
                onWhatChange={setRequestWhat}
                onWhyChange={setRequestWhy}
                onCopy={copyRequest}
                copied={copied}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

// ─── KnobControl ─────────────────────────────────────────────────────────────

function KnobControl({
  knob,
  value,
  onChange,
}: {
  knob: Knob
  value: unknown
  onChange: (v: unknown) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {knob.label ?? knob.name}
      </label>

      {knob.type === 'select' && (
        <select
          value={(value as string) ?? knob.defaultValue}
          onChange={(e) => onChange(e.target.value)}
          className="text-xs border border-border bg-background px-2 py-1.5 rounded-none min-w-[96px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {knob.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}

      {knob.type === 'boolean' && (
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(value ?? knob.defaultValue)}
            onChange={(e) => onChange(e.target.checked)}
            className="cursor-pointer"
          />
          <span className="text-xs text-foreground">
            {Boolean(value ?? knob.defaultValue) ? 'true' : 'false'}
          </span>
        </label>
      )}

      {knob.type === 'text' && (
        <input
          type="text"
          value={(value as string) ?? knob.defaultValue}
          onChange={(e) => onChange(e.target.value)}
          className="text-xs border border-border bg-background px-2 py-1.5 rounded-none min-w-[120px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
      )}
    </div>
  )
}

// ─── DocsPanel ───────────────────────────────────────────────────────────────

function DocsPanel({ meta }: { meta: ComponentMeta }) {
  return (
    <div className="max-w-2xl space-y-8">
      {/* Description */}
      <section>
        <SectionLabel>Description</SectionLabel>
        <p className="text-foreground leading-relaxed">{meta.description}</p>
      </section>

      {/* Guidelines */}
      <section>
        <SectionLabel>Content &amp; General Guidelines</SectionLabel>
        <ul className="space-y-2">
          {meta.guidelines.map((g, i) => (
            <li key={i} className="flex gap-2 text-foreground">
              <span className="text-muted-foreground shrink-0 mt-px">·</span>
              <span className="leading-relaxed">{g}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Variations */}
      <section>
        <SectionLabel>Variations</SectionLabel>
        <div className="border border-border divide-y divide-border">
          <div className="flex gap-4 px-3 py-2 bg-muted/40">
            <span className="font-semibold text-muted-foreground w-28 shrink-0">Name</span>
            <span className="font-semibold text-muted-foreground">Description</span>
          </div>
          {meta.variations.map((v, i) => (
            <div key={i} className="flex gap-4 px-3 py-2">
              <code className="font-mono text-foreground w-28 shrink-0">{v.name}</code>
              <p className="text-muted-foreground leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Behavior */}
      <section>
        <SectionLabel>Component Behaviour</SectionLabel>
        <ul className="space-y-2">
          {meta.behavior.map((b, i) => (
            <li key={i} className="flex gap-2 text-foreground">
              <span className="text-muted-foreground shrink-0 mt-px">·</span>
              <span className="leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

// ─── CodePanel ───────────────────────────────────────────────────────────────

function CodePanel({
  meta,
  codeTab,
  onCodeTabChange,
  onCopy,
  copied,
}: {
  meta: ComponentMeta
  codeTab: CodeTab
  onCodeTabChange: (t: CodeTab) => void
  onCopy: (text: string) => void
  copied: boolean
}) {
  const code = meta.codeSnippet[codeTab]

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-3">
        {/* Code type tabs */}
        <div className="flex gap-1">
          {(
            [
              { id: 'react', label: 'React / JSX' },
              { id: 'html', label: 'HTML' },
              { id: 'css', label: 'CSS' },
            ] as { id: CodeTab; label: string }[]
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => onCodeTabChange(t.id)}
              className={cn(
                'px-3 py-1.5 rounded-none border transition-colors font-medium text-[10px] uppercase tracking-wide',
                codeTab === t.id
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-border text-muted-foreground hover:text-foreground',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => onCopy(code)}
          className="px-2.5 py-1.5 border border-border hover:bg-muted transition-colors rounded-none text-[10px] font-medium uppercase tracking-wide"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>

      <pre className="bg-muted/50 border border-border p-5 font-mono overflow-x-auto whitespace-pre text-foreground leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}

// ─── TokenPanel ──────────────────────────────────────────────────────────────

function TokenPanel({ meta }: { meta: ComponentMeta }) {
  const { inToken, outOfToken } = meta.tokenAudit

  return (
    <div className="max-w-2xl space-y-8">
      {/* In Token */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <SectionLabel className="mb-0">
            In Design System
            <span className="ml-2 text-muted-foreground font-normal normal-case tracking-normal">
              ({inToken.length} token{inToken.length !== 1 ? 's' : ''})
            </span>
          </SectionLabel>
        </div>

        <div className="border border-border divide-y divide-border">
          <div className="flex gap-3 px-3 py-2 bg-muted/40">
            <span className="font-semibold text-muted-foreground w-32 shrink-0">Usage (class)</span>
            <span className="font-semibold text-muted-foreground w-40 shrink-0">Token</span>
            <span className="font-semibold text-muted-foreground w-20 shrink-0">Category</span>
            <span className="font-semibold text-muted-foreground">Notes</span>
          </div>
          {inToken.map((item, i) => (
            <div key={i} className="flex gap-3 px-3 py-2.5 items-start">
              <code className="font-mono text-foreground w-32 shrink-0 break-all">{item.usage}</code>
              <code className="font-mono text-muted-foreground w-40 shrink-0 break-all">{item.token}</code>
              <span
                className={cn(
                  'text-[10px] px-1.5 py-0.5 rounded-none font-medium w-20 shrink-0 text-center',
                  TOKEN_CATEGORY_STYLES[item.category],
                )}
              >
                {item.category}
              </span>
              {item.description && (
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Out of Token */}
      {outOfToken.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <SectionLabel className="mb-0">
              Out of Token Definition
              <span className="ml-2 text-muted-foreground font-normal normal-case tracking-normal">
                ({outOfToken.length} value{outOfToken.length !== 1 ? 's' : ''})
              </span>
            </SectionLabel>
          </div>

          <div className="border border-amber-200 dark:border-amber-900 divide-y divide-amber-100 dark:divide-amber-900/50">
            <div className="flex gap-3 px-3 py-2 bg-amber-50/60 dark:bg-amber-950/40">
              <span className="font-semibold text-muted-foreground w-36 shrink-0">Property / Class</span>
              <span className="font-semibold text-muted-foreground w-20 shrink-0">Category</span>
              <span className="font-semibold text-muted-foreground">Issue &amp; Suggestion</span>
            </div>
            {outOfToken.map((item, i) => (
              <div
                key={i}
                className="flex gap-3 px-3 py-2.5 items-start bg-amber-50/30 dark:bg-amber-950/20"
              >
                <code className="font-mono text-foreground w-36 shrink-0 break-all">
                  {item.property}
                </code>
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.5 rounded-none font-medium w-20 shrink-0 text-center',
                    TOKEN_CATEGORY_STYLES[item.category],
                  )}
                >
                  {item.category}
                </span>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-foreground leading-relaxed">{item.note}</p>
                  {item.suggestion && (
                    <p className="text-muted-foreground leading-relaxed">
                      <span className="font-medium">Suggestion:</span> {item.suggestion}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// ─── RequestPanel ────────────────────────────────────────────────────────────

function RequestPanel({
  meta,
  what,
  why,
  onWhatChange,
  onWhyChange,
  onCopy,
  copied,
}: {
  meta: ComponentMeta
  what: string
  why: string
  onWhatChange: (v: string) => void
  onWhyChange: (v: string) => void
  onCopy: () => void
  copied: boolean
}) {
  return (
    <div className="max-w-xl space-y-5">
      <p className="text-muted-foreground leading-relaxed">
        Describe a change for{' '}
        <strong className="text-foreground font-semibold">{meta.name}</strong>. The output will
        be formatted as a structured Markdown issue ready to paste into GitHub, Linear, or Notion.
      </p>

      <div>
        <label className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground block mb-2">
          What should change?
        </label>
        <textarea
          value={what}
          onChange={(e) => onWhatChange(e.target.value)}
          rows={4}
          placeholder="Describe the visual, behavioral, or API change you want..."
          className="w-full border border-border bg-background px-3 py-2.5 rounded-none resize-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring leading-relaxed"
        />
      </div>

      <div>
        <label className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground block mb-2">
          Why?{' '}
          <span className="text-muted-foreground font-normal normal-case tracking-normal">
            (optional)
          </span>
        </label>
        <textarea
          value={why}
          onChange={(e) => onWhyChange(e.target.value)}
          rows={2}
          placeholder="User feedback, design rationale, accessibility concern..."
          className="w-full border border-border bg-background px-3 py-2.5 rounded-none resize-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring leading-relaxed"
        />
      </div>

      {/* Preview */}
      {what.trim() && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Preview
          </p>
          <pre className="bg-muted/50 border border-border p-4 font-mono whitespace-pre-wrap text-muted-foreground leading-relaxed">
            {[
              `## Change Request: ${meta.name}`,
              '',
              `**Component:** \`${meta.filePath}\``,
              `**Date:** ${new Date().toISOString().split('T')[0]}`,
              '',
              `### What should change?`,
              what,
              '',
              `### Why?`,
              why || '_No reason provided._',
            ].join('\n')}
          </pre>
        </div>
      )}

      <button
        onClick={onCopy}
        disabled={!what.trim()}
        className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-none disabled:opacity-50 disabled:pointer-events-none font-medium uppercase tracking-wide text-[10px]"
      >
        {copied ? '✓ Copied to clipboard' : 'Copy as Markdown'}
      </button>
    </div>
  )
}

// ─── ChangelogPanel ──────────────────────────────────────────────────────────

function ChangelogPanel({ meta }: { meta: ComponentMeta }) {
  const entries: ChangelogEntry[] = meta.changelog ?? []

  function formatDate(iso: string) {
    try {
      const d = new Date(iso)
      return d.toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      })
    } catch {
      return iso
    }
  }

  if (entries.length === 0) {
    return (
      <div className="max-w-2xl">
        <p className="text-muted-foreground text-xs italic">
          No history recorded for <strong className="text-foreground font-semibold">{meta.name}</strong> yet.
        </p>
        <p className="text-muted-foreground text-[10px] mt-2">
          Use the Change Request tab to propose a change — once applied it will be logged here.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl space-y-0">
      <div className="flex items-center justify-between mb-4">
        <SectionLabel className="mb-0">
          Changelog
          <span className="ml-2 text-muted-foreground font-normal normal-case tracking-normal">
            ({entries.length} entr{entries.length !== 1 ? 'ies' : 'y'})
          </span>
        </SectionLabel>
      </div>

      {/* Timeline */}
      <div className="relative border-l border-border ml-2">
        {[...entries].reverse().map((entry, i) => (
          <div key={i} className="relative pl-6 pb-6 last:pb-0">
            {/* Timeline dot */}
            <span className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-background border-2 border-border block" />

            {/* Date + author */}
            <div className="flex items-baseline gap-3 mb-1.5">
              <span className="font-mono text-[10px] text-muted-foreground">{formatDate(entry.date)}</span>
              {entry.author && (
                <span className="text-[10px] text-muted-foreground">by {entry.author}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-foreground leading-relaxed mb-1">{entry.description}</p>

            {/* Reason */}
            <p className="text-muted-foreground leading-relaxed text-[11px]">
              <span className="font-semibold uppercase tracking-wider text-[9px]">Reason</span>{' '}
              {entry.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Shared primitives ───────────────────────────────────────────────────────

function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        'text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3',
        className,
      )}
    >
      {children}
    </p>
  )
}
