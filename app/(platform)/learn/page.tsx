'use client'
import { useRef, useState } from 'react'
import { BookOpen, Clock, ExternalLink } from 'lucide-react'
import { GlowCard } from '@/components/shared/GlowCard'
import { MOCK_LEARNING } from '@/lib/mock/data'
import { DIMENSION_LABELS, DIMENSION_COLORS, type SignalDimension } from '@/lib/types/signal.types'
import type { LearningRecommendation } from '@/lib/types/signal.types'
import { usePageEnter } from '@/lib/gsap/hooks'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const REASON_LABELS = {
  trajectory_aligned: 'Trajectory match',
  signal_gap:         'Fills signal gap',
  intent_support:     'Supports your goal',
}

const REASON_COLORS = {
  trajectory_aligned: 'text-trajectory border-trajectory/30 bg-trajectory/10',
  signal_gap:         'text-intent border-intent/30 bg-intent/10',
  intent_support:     'text-signal-light border-signal/30 bg-signal/10',
}

const TYPE_META = {
  article: { icon: '📄', label: 'Article',  color: 'text-[hsl(38,92%,50%)]' },
  course:  { icon: '🎓', label: 'Course',   color: 'text-signal-light' },
  video:   { icon: '▶️', label: 'Video',    color: 'text-trajectory' },
}

function ContentCard({ rec }: { rec: LearningRecommendation }) {
  const meta = TYPE_META[rec.content.content_type]
  const dimColor = DIMENSION_COLORS[rec.content.signal_dimension]
  const isFree = rec.content.price_usd === 0

  return (
    <GlowCard className="p-5 flex flex-col h-full hover:border-signal/30 transition-all" variant="none">
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className={cn('text-[10px] font-semibold uppercase tracking-wider border rounded-md px-2 py-0.5', REASON_COLORS[rec.reason_type])}>
          {REASON_LABELS[rec.reason_type]}
        </span>
        <span className="text-sm font-bold text-signal flex-none">{rec.fit_score}%</span>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-base">{meta.icon}</span>
        <span className={cn('text-[11px] font-medium', meta.color)}>{meta.label}</span>
        <span className="text-muted-foreground/30">·</span>
        <Clock className="w-3 h-3 text-muted-foreground/50" />
        <span className="text-[11px] text-muted-foreground/60">
          {rec.content.duration_minutes < 60
            ? `${rec.content.duration_minutes}m`
            : `${(rec.content.duration_minutes / 60).toFixed(0)}h`}
        </span>
        <span className="ml-auto text-[11px] font-semibold">
          {isFree ? <span className="text-[hsl(142,71%,45%)]">Free</span> : <span className="text-muted-foreground">${rec.content.price_usd}</span>}
        </span>
      </div>

      <h3 className="text-sm font-semibold text-foreground mb-2 leading-snug">{rec.content.title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed flex-1">{rec.content.short_description}</p>

      {/* Signal dimension tag */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/40">
        <div className="w-1.5 h-1.5 rounded-full flex-none" style={{ background: dimColor }} />
        <span className="text-[10px] text-muted-foreground">
          {DIMENSION_LABELS[rec.content.signal_dimension]} signal
        </span>
        <div className="ml-auto flex flex-wrap gap-1">
          {rec.content.skill_tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] border border-border/40 rounded px-1.5 py-0.5 text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </GlowCard>
  )
}

type Filter = 'all' | 'free' | 'paid'

export default function LearnPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<Filter>('all')
  usePageEnter(containerRef, { stagger: 0.07, selector: '[data-card]' })

  const filtered = MOCK_LEARNING.filter(r => {
    if (filter === 'free') return r.content.price_usd === 0
    if (filter === 'paid') return r.content.price_usd > 0
    return true
  })

  return (
    <div ref={containerRef} className="space-y-6">

      {/* Header */}
      <div data-card className="opacity-0">
        <h1 className="text-2xl font-bold text-foreground mb-0.5">Learning Feed</h1>
        <p className="text-sm text-muted-foreground">Curated for your trajectory — not a catalog, a direction</p>
      </div>

      {/* Filter tabs */}
      <div data-card className="opacity-0 flex gap-2">
        {(['all', 'free', 'paid'] as Filter[]).map(f => (
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
            {f}
          </button>
        ))}
      </div>

      {/* Content grid */}
      {filtered.length === 0 ? (
        <div data-card className="opacity-0">
          <GlowCard className="p-12 text-center">
            <BookOpen className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">No content matches this filter</p>
          </GlowCard>
        </div>
      ) : (
        <div data-card className="opacity-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(rec => (
            <ContentCard key={rec.id} rec={rec} />
          ))}
        </div>
      )}
    </div>
  )
}
