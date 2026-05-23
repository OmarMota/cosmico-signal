'use client'
import { use } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MOCK_RECOMMENDATIONS } from '@/lib/mock/data'
import { CONTENT_TYPE_LABELS, REASON_LABELS } from '@/lib/types/learning.types'
import { Badge } from '@/components/ui/badge'
import { formatDuration } from '@/lib/utils/score-formatters'
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Tag,
  Zap,
  TrendingUp,
  Target,
  CheckCircle2,
  Play,
  ExternalLink,
} from 'lucide-react'

// ------ helpers ------
const DIMENSION_META: Record<string, { label: string; color: string; description: string }> = {
  reliability:    { label: 'Reliability',    color: 'oklch(0.65 0 0)', description: 'How consistently you deliver on commitments' },
  performance:    { label: 'Performance',    color: 'oklch(0.55 0 0)', description: 'Quality and impact of your work output' },
  responsiveness: { label: 'Responsiveness', color: 'oklch(0.45 0 0)', description: 'Speed and quality of communication' },
  feedback:       { label: 'Feedback',       color: 'oklch(0.35 0 0)', description: 'How clients and collaborators rate your work' },
  growth:         { label: 'Growth',         color: 'oklch(0.25 0 0)', description: 'Your trajectory of learning and improvement' },
}

const REASON_META: Record<string, { icon: typeof Zap; label: string; desc: string }> = {
  signal_gap:        { icon: Zap,       label: 'Signal Gap',         desc: 'This content directly improves a dimension where your signal is below potential' },
  trajectory_aligned: { icon: TrendingUp, label: 'Trajectory Aligned', desc: 'Supports the skills and competencies your trajectory is heading toward' },
  intent_support:    { icon: Target,    label: 'Intent Support',     desc: 'Aligned with a goal you have explicitly set in your profile' },
}

function SignalImpactBar({ dimension }: { dimension: string }) {
  const meta = DIMENSION_META[dimension]
  if (!meta) return null

  return (
    <div className="rounded-none border border-border bg-card p-5">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Signal impact</h3>
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-none flex items-center justify-center flex-none"
          style={{ background: `${meta.color}18`, border: `1px solid ${meta.color}30` }}
        >
          <Zap className="w-4 h-4" style={{ color: meta.color }} />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground mb-1">{meta.label}</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{meta.description}</p>
          <div className="mt-3 h-1.5 w-full rounded-none bg-muted/40 overflow-hidden">
            <motion.div
              className="h-full"
              style={{ background: meta.color }}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <p className="text-xs text-muted-foreground/60 mt-1">Completing this content will contribute to your {meta.label} signal</p>
        </div>
      </div>
    </div>
  )
}

// ------ page ------
export default function LearnDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const rec = MOCK_RECOMMENDATIONS.find(r => r.id === id)

  if (!rec || !rec.content) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
        <BookOpen className="w-12 h-12 text-muted-foreground/30" />
        <p className="text-lg font-semibold text-foreground">Content not found</p>
        <Link href="/learn" className="text-sm text-foreground hover:text-foreground transition-colors">
          ← Back to learning feed
        </Link>
      </div>
    )
  }

  const content = rec.content
  const isFree = content.price_usd === 0
  const typeLabel = CONTENT_TYPE_LABELS[content.content_type] ?? content.content_type
  const reasonMeta = REASON_META[rec.reason_type]
  const dimensionMeta = DIMENSION_META[content.signal_dimension ?? '']

  return (
    <motion.div
      className="space-y-8 max-w-4xl"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to learning feed
      </button>

      {/* Hero */}
      <div className="rounded-none border border-border bg-card p-8">
        <div className="flex items-start gap-6 flex-wrap">
          {/* Icon */}
          <div className="w-16 h-16 rounded-none bg-muted/10 border border-border flex items-center justify-center flex-none">
            {content.content_type === 'video' ? (
              <Play className="w-7 h-7 text-foreground" />
            ) : content.content_type === 'course' ? (
              <TrendingUp className="w-7 h-7 text-foreground" />
            ) : (
              <BookOpen className="w-7 h-7 text-foreground" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge variant={isFree ? 'secondary' : 'outline'}>{isFree ? 'Free' : `$${content.price_usd}`}</Badge>
              <Badge variant="secondary">{typeLabel}</Badge>
              {content.duration_minutes && (
                <Badge variant="secondary">{formatDuration(content.duration_minutes)}</Badge>
              )}
            </div>

            <h1 className="text-2xl font-bold text-foreground mb-3 leading-tight">{content.title}</h1>

            {content.short_description && (
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{content.short_description}</p>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {content.duration_minutes && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-muted-foreground/40" />
                  {formatDuration(content.duration_minutes)}
                </div>
              )}
              {content.provider && (
                <div className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-muted-foreground/40" />
                  {content.provider}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left — Details */}
        <div className="lg:col-span-2 space-y-6">

          {/* Why recommended */}
          {reasonMeta && (
            <div className="rounded-none border border-border bg-card p-6">
              <h2 className="text-sm font-semibold text-foreground mb-4">Why this is recommended for you</h2>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-none bg-muted/10 border border-border flex items-center justify-center flex-none">
                  <reasonMeta.icon className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">{reasonMeta.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">{reasonMeta.desc}</p>
                  {rec.reason_text && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted/60 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{rec.reason_text}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Fit score */}
          {rec.fit_score !== undefined && (
            <div className="rounded-none border border-border bg-card p-6">
              <h2 className="text-sm font-semibold text-foreground mb-4">Recommendation fit</h2>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Match to your profile</span>
                    <span className="text-xs font-bold text-foreground">{rec.fit_score}%</span>
                  </div>
                  <div className="h-2 rounded-none bg-muted/40 overflow-hidden">
                    <motion.div
                      className="h-full bg-foreground/50"
                      initial={{ width: 0 }}
                      animate={{ width: `${rec.fit_score}%` }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Skills covered */}
          {content.skill_tags?.length > 0 && (
            <div className="rounded-none border border-border bg-card p-6">
              <h2 className="text-sm font-semibold text-foreground mb-4">Skills you'll develop</h2>
              <div className="flex flex-wrap gap-2">
                {content.skill_tags.map(skill => (
                  <div
                    key={skill}
                    className="flex items-center gap-1.5 rounded-none px-2.5 py-1.5 text-xs font-medium bg-muted/10 border border-border text-foreground"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suitable for */}
          {content.seniority_level?.length > 0 && (
            <div className="rounded-none border border-border bg-card p-6">
              <h2 className="text-sm font-semibold text-foreground mb-3">Best suited for</h2>
              <div className="flex flex-wrap gap-2">
                {content.seniority_level.map(s => (
                  <span key={s} className="rounded-md px-2.5 py-1 text-xs bg-muted/30 text-muted-foreground capitalize border border-border/50">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — Signal impact + CTA */}
        <div className="space-y-6">

          {/* Signal impact */}
          {content.signal_dimension && <SignalImpactBar dimension={content.signal_dimension} />}

          {/* Quality score */}
          {content.quality_score !== undefined && (
            <div className="rounded-none border border-border bg-card p-5">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Content quality</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Quality score</span>
                <span className="text-sm font-bold text-foreground">{Math.round(content.quality_score * 100)}%</span>
              </div>
              <div className="h-1.5 rounded-none bg-muted/40 overflow-hidden">
                <motion.div
                  className="h-full bg-foreground/50"
                  initial={{ width: 0 }}
                  animate={{ width: `${content.quality_score * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="rounded-none border border-border bg-muted/5 p-5 space-y-3">
            <p className="text-xs text-muted-foreground text-center">
              Prototype mode — content links aren't real yet.
            </p>
            <button
              className="w-full flex items-center justify-center gap-2 rounded-none bg-muted/20 border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted/30 transition-all"
              onClick={() => alert('Coming soon! In the real product, this would open the content and track your progress toward your signal goals.')}
            >
              {content.content_type === 'video' ? (
                <><Play className="w-4 h-4" /> Watch now</>
              ) : content.content_type === 'course' ? (
                <><TrendingUp className="w-4 h-4" /> Start course</>
              ) : (
                <><BookOpen className="w-4 h-4" /> Read article</>
              )}
            </button>
            {content.url && (
              <a
                href={content.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-none border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open external link
              </a>
            )}
          </div>

          {/* Related opportunities */}
          <div className="rounded-none border border-border bg-card p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">After this content</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              Completing this will strengthen your {dimensionMeta?.label ?? 'signal'} dimension and may improve your fit on relevant opportunities.
            </p>
            <Link
              href="/opportunities"
              className="flex items-center gap-1.5 text-xs text-foreground hover:text-foreground transition-colors"
            >
              Browse matched opportunities →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
