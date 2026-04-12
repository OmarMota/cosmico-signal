'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { OpportunityCard } from '@/components/opportunities/OpportunityCard'
import { GlowCard } from '@/components/shared/GlowCard'
import { DashboardSkeleton } from '@/components/shared/LoadingSkeleton'
import { staggerContainer, staggerItem } from '@/lib/utils/animation-variants'
import type { OpportunityWithFit } from '@/lib/types/opportunity.types'
import { Briefcase } from 'lucide-react'

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<OpportunityWithFit[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'full_time' | 'contract' | 'freelance'>('all')

  useEffect(() => {
    fetch('/api/opportunities')
      .then(r => r.json())
      .then(d => {
        // Sort by fit score
        const sorted = (d.opportunities ?? []).sort(
          (a: OpportunityWithFit, b: OpportunityWithFit) =>
            (b.fit?.fit_score ?? 0) - (a.fit?.fit_score ?? 0)
        )
        setOpportunities(sorted)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <DashboardSkeleton />

  const filtered =
    filter === 'all'
      ? opportunities
      : opportunities.filter(o => o.opportunity_type === filter)

  return (
    <motion.div
      className="space-y-8"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl font-bold text-foreground mb-1">Opportunities</h1>
        <p className="text-sm text-muted-foreground">
          Ranked by your signal match — not by recency
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div variants={staggerItem} className="flex gap-2 flex-wrap">
        {(['all', 'full_time', 'contract', 'freelance'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all capitalize ${
              filter === f
                ? 'bg-violet-500/20 text-violet-200 border border-violet-500/30'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {f.replace('_', ' ')}
          </button>
        ))}
      </motion.div>

      {filtered.length === 0 ? (
        <motion.div variants={staggerItem}>
          <GlowCard className="p-12 text-center">
            <Briefcase className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No opportunities match this filter</p>
          </GlowCard>
        </motion.div>
      ) : (
        <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((opp, i) => (
            <OpportunityCard key={opp.id} opportunity={opp} index={i} />
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
