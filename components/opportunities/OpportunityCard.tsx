'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import type { OpportunityWithFit } from '@/lib/types/opportunity.types'
import { OPPORTUNITY_TYPE_LABELS, REMOTE_POLICY_LABELS } from '@/lib/types/opportunity.types'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils/cn'
import { formatRate } from '@/lib/utils/score-formatters'
import { Building2, ArrowRight } from 'lucide-react'

interface OpportunityCardProps {
  opportunity: OpportunityWithFit
  index?: number
}

function FitScorePill({ score }: { score: number }) {
  const color =
    score >= 75 ? '#34d399' : score >= 55 ? '#a78bfa' : score >= 35 ? '#fbbf24' : '#64748b'
  const label = score >= 75 ? 'Strong fit' : score >= 55 ? 'Good fit' : score >= 35 ? 'Partial fit' : 'Weak fit'

  return (
    <div
      className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}
    >
      <motion.div
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: color }}
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {Math.round(score)} — {label}
    </div>
  )
}

export function OpportunityCard({ opportunity, index = 0 }: OpportunityCardProps) {
  const typeLabel = OPPORTUNITY_TYPE_LABELS[opportunity.opportunity_type] ?? opportunity.opportunity_type
  const remoteLabel = REMOTE_POLICY_LABELS[opportunity.remote_policy] ?? opportunity.remote_policy

  return (
    <Link href={`/opportunities/${opportunity.id}`} className="block">
      <motion.div
        className="rounded-xl border border-border/50 bg-card/60 p-5 hover:border-violet-500/30 hover:bg-card transition-all cursor-pointer group"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.06 }}
        whileHover={{ y: -2 }}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-0.5 group-hover:text-violet-300 transition-colors">
              {opportunity.title}
            </h3>
            {opportunity.company_name && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Building2 className="w-3 h-3" />
                {opportunity.company_name}
              </div>
            )}
          </div>
          {opportunity.fit && <FitScorePill score={opportunity.fit.fit_score} />}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <Badge variant="outline">{typeLabel}</Badge>
          <Badge variant="outline">{remoteLabel}</Badge>
          {(opportunity.rate_min || opportunity.rate_max) && (
            <Badge variant="muted">
              {formatRate(opportunity.rate_min, opportunity.rate_max, opportunity.currency)}
            </Badge>
          )}
        </div>

        {/* Skills */}
        {opportunity.required_skills?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {opportunity.required_skills.slice(0, 5).map(skill => {
              const isMatch = opportunity.fit?.breakdown?.matching_skills?.includes(skill)
              return (
                <span
                  key={skill}
                  className={cn(
                    'text-xs rounded px-1.5 py-0.5',
                    isMatch
                      ? 'bg-violet-500/15 text-violet-300'
                      : 'bg-muted/30 text-muted-foreground/60'
                  )}
                >
                  {skill}
                </span>
              )
            })}
          </div>
        )}

        {/* Fit breakdown bar */}
        {opportunity.fit && (
          <div className="mt-3 pt-3 border-t border-border/40">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 rounded-full bg-muted/40 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(to right, #6366f1, #8b5cf6)` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${opportunity.fit.fit_score}%` }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-12 text-right">
                {opportunity.fit.skill_match}% skills
              </span>
            </div>
          </div>
        )}

        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground/60 group-hover:text-violet-400 transition-colors">
          View full breakdown
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </motion.div>
    </Link>
  )
}
