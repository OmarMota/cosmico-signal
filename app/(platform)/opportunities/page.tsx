'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { OpportunityCard } from '@/components/opportunities/OpportunityCard'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { staggerContainer, staggerItem } from '@/lib/utils/animation-variants'
import type { OpportunityWithFit } from '@/lib/types/opportunity.types'
import { Briefcase } from 'lucide-react'

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<OpportunityWithFit[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/opportunities')
      .then(r => r.json())
      .then(d => {
        const sorted = (d.opportunities ?? []).sort(
          (a: OpportunityWithFit, b: OpportunityWithFit) =>
            (b.fit?.fit_score ?? 0) - (a.fit?.fit_score ?? 0)
        )
        setOpportunities(sorted)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const byType = (type: string) =>
    opportunities.filter(o => o.opportunity_type === type)

  const tabs = [
    { value: 'all',       label: 'All',       items: opportunities },
    { value: 'full_time', label: 'Full-time',  items: byType('full_time') },
    { value: 'contract',  label: 'Contract',   items: byType('contract') },
    { value: 'freelance', label: 'Freelance',  items: byType('freelance') },
  ]

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-10 w-80" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="space-y-8"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={staggerItem}>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-bold text-foreground">Opportunities</h1>
          <Badge variant="signal">{opportunities.length} matched</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Ranked by your signal match — not by recency
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={staggerItem}>
        <Tabs defaultValue="all">
          <TabsList>
            {tabs.map(t => (
              <TabsTrigger key={t.value} value={t.value}>
                {t.label}
                <Badge variant="muted" className="ml-1.5">{t.items.length}</Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map(({ value, items }) => (
            <TabsContent key={value} value={value} className="mt-6">
              {items.length === 0 ? (
                <Card>
                  <CardContent className="p-12 flex flex-col items-center text-center gap-3">
                    <Briefcase className="w-10 h-10 text-muted-foreground/30" />
                    <p className="text-sm text-muted-foreground">
                      No opportunities match this filter
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {items.map((opp, i) => (
                    <OpportunityCard key={opp.id} opportunity={opp} index={i} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
