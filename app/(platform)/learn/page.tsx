'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ContentCard } from '@/components/learning/ContentCard'
import { GlowCard } from '@/components/shared/GlowCard'
import { DashboardSkeleton } from '@/components/shared/LoadingSkeleton'
import { staggerContainer, staggerItem } from '@/lib/utils/animation-variants'
import type { LearningRecommendation } from '@/lib/types/learning.types'
import { BookOpen } from 'lucide-react'

export default function LearnPage() {
  const [recommendations, setRecommendations] = useState<LearningRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'free' | 'paid'>('all')

  useEffect(() => {
    fetch('/api/learning/recommendations')
      .then(r => r.json())
      .then(d => {
        setRecommendations(d.recommendations ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <DashboardSkeleton />

  const filtered = recommendations.filter(r => {
    if (filter === 'free') return r.content?.price_usd === 0
    if (filter === 'paid') return (r.content?.price_usd ?? 0) > 0
    return true
  })

  return (
    <motion.div
      className="space-y-8"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl font-bold text-foreground mb-1">Learning Feed</h1>
        <p className="text-sm text-muted-foreground">
          Curated for your trajectory — not a catalog, a direction
        </p>
      </motion.div>

      {/* Filter tabs */}
      <motion.div variants={staggerItem} className="flex gap-2">
        {(['all', 'free', 'paid'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all capitalize ${
              filter === f
                ? 'bg-violet-500/20 text-violet-200 border border-violet-500/30'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {filtered.length === 0 ? (
        <motion.div variants={staggerItem}>
          <GlowCard className="p-12 text-center">
            <BookOpen className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">
              {recommendations.length === 0
                ? 'Complete your profile to get personalized recommendations'
                : 'No content matches this filter'}
            </p>
          </GlowCard>
        </motion.div>
      ) : (
        <motion.div
          variants={staggerItem}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map((rec, i) => (
            <ContentCard key={rec.id} recommendation={rec} index={i} />
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
