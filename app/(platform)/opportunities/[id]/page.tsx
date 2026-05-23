'use client'
import { use } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MOCK_OPPORTUNITIES } from '@/lib/mock/data'
import { OPPORTUNITY_TYPE_LABELS, REMOTE_POLICY_LABELS } from '@/lib/types/opportunity.types'
import { Badge } from '@/components/ui/badge'
import { formatRate } from '@/lib/utils/score-formatters'
import {
  ArrowLeft,
  Building2,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Star,
  Zap,
  BookOpen,
  Target,
} from 'lucide-react'

// ------- helpers -------
function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-xs font-semibold text-foreground">{value}%</span>
      </div>
      <div className="h-1.5 rounded-none bg-muted/40 overflow-hidden">
        <motion.div
          className="h-full bg-foreground/50"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

function FitGauge({ score }: { score: number }) {
  const label =
    score >= 75 ? 'Strong Fit' : score >= 55 ? 'Good Fit' : score >= 35 ? 'Partial Fit' : 'Weak Fit'

  const r = 52
  const circumference = 2 * Math.PI * r
  const progress = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-36 h-36">
        <svg className="w-36 h-36 -rotate-90" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r={r} fill="none" stroke="oklch(0.3 0 0)" strokeWidth="8" />
          <motion.circle
            cx="64" cy="64" r={r}
            fill="none"
            stroke="oklch(0.65 0 0)"
            strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: progress }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-foreground">{score}</span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
      <span className="text-sm font-semibold text-muted-foreground">{label}</span>
    </div>
  )
}

// ------- page -------
export default function OpportunityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const opp = MOCK_OPPORTUNITIES.find(o => o.id === id)

  if (!opp) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
        <Building2 className="w-12 h-12 text-muted-foreground/30" />
        <p className="text-lg font-semibold text-foreground">Opportunity not found</p>
        <Link href="/opportunities" className="text-sm text-foreground hover:text-foreground transition-colors">
          ← Back to opportunities
        </Link>
      </div>
    )
  }

  const fit = opp.fit
  const typeLabel = OPPORTUNITY_TYPE_LABELS[opp.opportunity_type] ?? opp.opportunity_type
  const remoteLabel = REMOTE_POLICY_LABELS[opp.remote_policy] ?? opp.remote_policy

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
        Back to opportunities
      </button>

      {/* Hero */}
      <div className="rounded-none border border-border bg-card p-8">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge variant="outline">{typeLabel}</Badge>
              <Badge variant="outline">{remoteLabel}</Badge>
              {opp.is_active && (
                <Badge variant="secondary">Active</Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">{opp.title}</h1>
            {opp.company_name && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                <Building2 className="w-4 h-4" />
                <span className="font-medium">{opp.company_name}</span>
              </div>
            )}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {(opp.rate_min || opp.rate_max) && (
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-400/60" />
                  {formatRate(opp.rate_min, opp.rate_max, opp.currency)}
                </div>
              )}
              {opp.remote_policy && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  {remoteLabel}
                </div>
              )}
              {opp.posted_at && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-muted-foreground/40" />
                  Posted {new Date(opp.posted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              )}
            </div>
          </div>

          {fit && (
            <div className="flex-none">
              <FitGauge score={fit.fit_score} />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left — Description + Skills */}
        <div className="lg:col-span-2 space-y-6">

          {/* Description */}
          {opp.description && (
            <div className="rounded-none border border-border bg-card p-6">
              <h2 className="text-sm font-semibold text-foreground mb-3">About the role</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{opp.description}</p>
            </div>
          )}

          {/* Skills */}
          <div className="rounded-none border border-border bg-card p-6 space-y-5">
            <h2 className="text-sm font-semibold text-foreground">Skills</h2>

            {opp.required_skills?.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground/70 mb-2 uppercase tracking-wider">Required</p>
                <div className="flex flex-wrap gap-2">
                  {opp.required_skills.map(skill => {
                    const isMatch = fit?.breakdown?.matching_skills?.includes(skill)
                    return (
                      <div
                        key={skill}
                        className={`flex items-center gap-1.5 rounded-none px-2.5 py-1.5 text-xs font-medium ${
                          isMatch
                            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
                            : 'bg-red-500/10 border border-red-500/20 text-red-300/80'
                        }`}
                      >
                        {isMatch
                          ? <CheckCircle2 className="w-3 h-3" />
                          : <XCircle className="w-3 h-3" />
                        }
                        {skill}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {opp.preferred_skills?.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground/70 mb-2 uppercase tracking-wider">Nice to have</p>
                <div className="flex flex-wrap gap-2">
                  {opp.preferred_skills.map(skill => (
                    <span
                      key={skill}
                      className="rounded-none px-2.5 py-1.5 text-xs font-medium bg-muted/40 text-muted-foreground border border-border/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Fit notes */}
          {fit?.breakdown && (
            <div className="rounded-none border border-border bg-card p-6 space-y-4">
              <h2 className="text-sm font-semibold text-foreground">Signal analysis</h2>
              {[
                { icon: Zap, label: 'Signal', note: fit.breakdown.signal_notes },
                { icon: TrendingUp, label: 'Trajectory', note: fit.breakdown.trajectory_notes },
                { icon: Star, label: 'Rate', note: fit.breakdown.rate_notes },
              ].filter(i => i.note).map(({ icon: Icon, label, note }) => (
                <div key={label} className="flex gap-3">
                  <div className="w-7 h-7 rounded-none bg-muted/10 border border-border flex items-center justify-center flex-none mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground mb-0.5">{label}</p>
                    <p className="text-xs text-muted-foreground">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right — Fit breakdown */}
        {fit && (
          <div className="space-y-6">
            <div className="rounded-none border border-border bg-card p-6 space-y-5">
              <h2 className="text-sm font-semibold text-foreground">Fit breakdown</h2>
              <ScoreBar label="Skill match" value={fit.skill_match ?? 0} />
              <ScoreBar label="Signal match" value={fit.signal_match ?? 0} />
              <ScoreBar label="Trajectory" value={fit.trajectory_match ?? 0} />
              <ScoreBar label="Rate match" value={fit.rate_match ?? 0} />
            </div>

            {/* Missing skills */}
            {fit.breakdown?.missing_skills && fit.breakdown.missing_skills.length > 0 && (
              <div className="rounded-none border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-amber-400" />
                  <h2 className="text-sm font-semibold text-foreground">Gap to close</h2>
                </div>
                <div className="space-y-2">
                  {fit.breakdown.missing_skills.map(skill => (
                    <div key={skill} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <XCircle className="w-3 h-3 text-red-400/60 flex-none" />
                      {skill}
                    </div>
                  ))}
                </div>
                <Link
                  href="/learn"
                  className="mt-4 flex items-center gap-1.5 text-xs text-foreground hover:text-foreground transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Find relevant courses →
                </Link>
              </div>
            )}

            {/* CTA */}
            <div className="rounded-none border border-border bg-muted/5 p-5 text-center">
              <p className="text-xs text-muted-foreground mb-3">
                This is a prototype — applications aren't real yet.
              </p>
              <button
                className="w-full rounded-none bg-muted/20 border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted/30 transition-all"
                onClick={() => alert('Coming soon! In the real product, this would submit your signal profile as your application.')}
              >
                Express Interest
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
