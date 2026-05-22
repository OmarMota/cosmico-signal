'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ContentCard } from '@/components/learning/ContentCard'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { staggerContainer, staggerItem } from '@/lib/utils/animation-variants'
import type { LearningRecommendation } from '@/lib/types/learning.types'
import { BookOpen } from 'lucide-react'

export default function LearnPage() {
  const [recommendations, setRecommendations] = useState<LearningRecommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/learning/recommendations')
      .then(r => r.json())
      .then(d => {
        setRecommendations(d.recommendations ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const free = recommendations.filter(r => r.content?.price_usd === 0)
  const paid = recommendations.filter(r => (r.content?.price_usd ?? 0) > 0)

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
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
          <h1 className="text-2xl font-bold text-foreground">Learning Feed</h1>
          <Badge variant="signal">{recommendations.length} curated</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Curated for your trajectory — not a catalog, a direction
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={staggerItem}>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">
              All <Badge variant="muted" className="ml-1.5">{recommendations.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="free">
              Free <Badge variant="muted" className="ml-1.5">{free.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="paid">
              Paid <Badge variant="muted" className="ml-1.5">{paid.length}</Badge>
            </TabsTrigger>
          </TabsList>

          {[
            { value: 'all',  items: recommendations },
            { value: 'free', items: free },
            { value: 'paid', items: paid },
          ].map(({ value, items }) => (
            <TabsContent key={value} value={value} className="mt-6">
              {items.length === 0 ? (
                <Card>
                  <CardContent className="p-12 flex flex-col items-center text-center gap-3">
                    <BookOpen className="w-10 h-10 text-muted-foreground/30" />
                    <p className="text-sm text-muted-foreground">
                      {recommendations.length === 0
                        ? 'Complete your profile to get personalized recommendations'
                        : 'No content matches this filter'}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((rec, i) => (
                    <ContentCard key={rec.id} recommendation={rec} index={i} />
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
