'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import type { LearningRecommendation } from '@/lib/types/learning.types'
import { CONTENT_TYPE_LABELS, REASON_LABELS } from '@/lib/types/learning.types'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils/cn'
import { formatDuration } from '@/lib/utils/score-formatters'
import { ArrowRight } from 'lucide-react'

interface ContentCardProps {
  recommendation: LearningRecommendation
  index?: number
}

export function ContentCard({ recommendation, index = 0 }: ContentCardProps) {
  const content = recommendation.content
  if (!content) return null

  const isFree = content.price_usd === 0
  const typeLabel = CONTENT_TYPE_LABELS[content.content_type] ?? content.content_type
  const reasonLabel = REASON_LABELS[recommendation.reason_type] ?? recommendation.reason_text

  return (
    <Link href={`/learn/${recommendation.id}`} className="block">
      <motion.div
        className="rounded-none border border-border bg-card p-4 hover:bg-muted/30 transition-all group cursor-pointer"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.06 }}
        whileHover={{ y: -2 }}
      >
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={isFree ? 'secondary' : 'outline'}>{isFree ? 'Free' : `$${content.price_usd}`}</Badge>
            <Badge variant="secondary">{typeLabel}</Badge>
            {content.duration_minutes && (
              <Badge variant="secondary">{formatDuration(content.duration_minutes)}</Badge>
            )}
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-foreground flex-shrink-0 transition-colors" />
        </div>

        <h3 className="text-sm font-semibold text-foreground mb-1.5 leading-tight group-hover:text-foreground transition-colors">{content.title}</h3>

        {content.short_description && (
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">{content.short_description}</p>
        )}

        {/* Reason chip */}
        {reasonLabel && (
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-muted/60 flex-shrink-0" />
            <span className="text-xs text-muted-foreground">{reasonLabel}</span>
          </div>
        )}

        {/* Skills */}
        {content.skill_tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {content.skill_tags.slice(0, 3).map(skill => (
              <span key={skill} className="text-xs text-muted-foreground/60 bg-muted/30 px-1.5 py-0.5">
                {skill}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </Link>
  )
}
