'use client'
import { useRef, useState } from 'react'
import { Briefcase, MapPin, Clock } from 'lucide-react'
import { GlowCard } from '@/components/shared/GlowCard'
import { MOCK_OPPORTUNITIES } from '@/lib/mock/data'
import type { Opportunity } from '@/lib/types/signal.types'
import { usePageEnter } from '@/lib/gsap/hooks'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

function FitRing({ score }: { score: number }) {
  const r = 16
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  const color = score >= 80 ? 'hsl(142,71%,45%)' : score >= 60 ? 'hsl(263,70%,62%)' : 'hsl(38,92%,50%)'

  return (
    <div className="relative w-12 h-12 flex-none">
      <svg width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={r} fill="none" stroke="hsla(224,12%,28%,0.6)" strokeWidth="3" />
        <circle
          cx="24" cy="24" r={r}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          transform="rotate(-90 24 24)"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold" style={{ color }}>
        {score}
      </span>
    </div>
  )
}

function OpportunityCard({ opp }: { opp: Opportunity }) {
  const [expanded, setExpanded] = useState(false)
  const typeColors: Record<string, string> = {
    full_time: 'text-trajectory border-trajectory/30 bg-trajectory/10',
    contract:  'text-signal-light border-signal/30 bg-signal/10',
    freelance: 'text-[hsl(38,92%,50%)] border-[hsl(38,92%,50%)]/30 bg-[hsl(38,92%,50%)]/10',
  }

  return (
    <GlowCard className="p-5 flex flex-col gap-4 hover:border-signal/30 transition-all" variant="none">
      {/* Header */}
      <div className="flex items-start gap-3">
        <FitRing score={opp.fit.fit_score} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-foreground leading-snug">{opp.title}</h3>
            <span className={cn('text-[10px] font-semibold uppercase tracking-wider border rounded-md px-2 py-0.5 flex-none', typeColors[opp.opportunity_type])}>
              {opp.opportunity_type.replace('_', ' ')}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{opp.company_name} · {opp.seniority_level}</p>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          <span className="capitalize">{opp.remote_policy}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>${opp.rate_min}–${opp.rate_max}/hr</span>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{opp.posted_at}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground leading-relaxed">{opp.description}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {opp.required_skills.map(s => {
          const isMatch = opp.fit.breakdown.matching_skills.includes(s)
          return (
            <span
              key={s}
              className={cn(
                'text-[10px] rounded-md border px-2 py-0.5 font-medium',
                isMatch
                  ? 'border-signal/40 bg-signal/10 text-signal-light'
                  : 'border-border/50 text-muted-foreground'
              )}
            >
              {s}
            </span>
          )
        })}
      </div>

      {/* Fit breakdown toggle */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="text-xs text-signal hover:text-signal-light transition-colors text-left"
      >
        {expanded ? '▲ Hide breakdown' : '▼ See fit breakdown'}
      </button>

      {expanded && (
        <div className="rounded-xl border border-border/40 bg-card/40 p-3 space-y-2 text-xs">
          {[
            { label: 'Skill match',      score: opp.fit.skill_match,      note: opp.fit.breakdown.signal_notes },
            { label: 'Signal match',     score: opp.fit.signal_match,     note: opp.fit.breakdown.trajectory_notes },
            { label: 'Trajectory match', score: opp.fit.trajectory_match, note: opp.fit.breakdown.trajectory_notes },
            { label: 'Rate match',       score: opp.fit.rate_match,       note: opp.fit.breakdown.rate_notes },
          ].map(({ label, score, note }) => (
            <div key={label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-muted-foreground">{label}</span>
                <span className={cn('font-semibold', score >= 80 ? 'text-[hsl(142,71%,45%)]' : score >= 60 ? 'text-signal-light' : 'text-[hsl(38,92%,50%)]')}>
                  {score}%
                </span>
              </div>
              <div className="h-1 rounded-full bg-muted/40 overflow-hidden">
                <div
                  className={cn('h-full rounded-full', score >= 80 ? 'bg-[hsl(142,71%,45%)]' : score >= 60 ? 'bg-signal' : 'bg-[hsl(38,92%,50%)]')}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          ))}
          {opp.fit.breakdown.missing_skills.length > 0 && (
            <p className="text-muted-foreground/60 pt-1">
              Missing: {opp.fit.breakdown.missing_skills.join(', ')}
            </p>
          )}
        </div>
      )}
    </GlowCard>
  )
}

type Filter = 'all' | 'full_time' | 'contract' | 'freelance'

export default function OpportunitiesPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<Filter>('all')
  usePageEnter(containerRef, { stagger: 0.07, selector: '[data-card]' })

  const sorted = [...MOCK_OPPORTUNITIES].sort((a, b) => b.fit.fit_score - a.fit.fit_score)
  const filtered = filter === 'all' ? sorted : sorted.filter(o => o.opportunity_type === filter)

  return (
    <div ref={containerRef} className="space-y-6">

      {/* Header */}
      <div data-card className="opacity-0">
        <h1 className="text-2xl font-bold text-foreground mb-0.5">Opportunities</h1>
        <p className="text-sm text-muted-foreground">Ranked by your signal match — not by recency</p>
      </div>

      {/* Filters */}
      <div data-card className="opacity-0 flex gap-2 flex-wrap">
        {(['all', 'full_time', 'contract', 'freelance'] as Filter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-lg px-4 py-1.5 text-sm font-medium transition-all capitalize',
              filter === f
                ? 'bg-signal/20 text-signal-light border border-signal/30'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {f.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div data-card className="opacity-0">
          <GlowCard className="p-12 text-center">
            <Briefcase className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">No opportunities match this filter</p>
          </GlowCard>
        </div>
      ) : (
        <div data-card className="opacity-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map(opp => (
            <OpportunityCard key={opp.id} opp={opp} />
          ))}
        </div>
      )}
    </div>
  )
}
