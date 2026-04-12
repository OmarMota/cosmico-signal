'use client'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSignalStore } from '@/lib/stores/signal.store'
import { useTrajectoryStore } from '@/lib/stores/trajectory.store'
import { useIntentStore } from '@/lib/stores/intent.store'
import { useProfileStore } from '@/lib/stores/profile.store'
import { SignalTimeline } from '@/components/signal/SignalTimeline'
import { SignalDimensionCard } from '@/components/signal/SignalDimensionCard'
import { TrajectoryPhaseCard } from '@/components/trajectory/TrajectoryPhaseCard'
import { NextStepsPanel } from '@/components/dashboard/NextStepsPanel'
import { DashboardSkeleton } from '@/components/shared/LoadingSkeleton'
import { AnimatedNumber } from '@/components/shared/AnimatedNumber'
import { GlowCard } from '@/components/shared/GlowCard'
import { getTrendColor, getTrendLabel, formatPercentile } from '@/lib/utils/score-formatters'
import { DIMENSION_LABELS } from '@/lib/types/signal.types'
import { staggerContainer, staggerItem } from '@/lib/utils/animation-variants'
import type { SignalDimension } from '@/lib/types/signal.types'
import Link from 'next/link'
import { ArrowRight, BookOpen, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const { signalProfile, weeklyHistory, isLoading: signalLoading, fetchSignalProfile, fetchHistory } = useSignalStore()
  const { latestSnapshot, fetchTrajectory } = useTrajectoryStore()
  const { declaredIntents, fetchIntents } = useIntentStore()
  const { profile, fetchProfile } = useProfileStore()

  useEffect(() => {
    fetchSignalProfile()
    fetchHistory(12)
    fetchTrajectory()
    fetchIntents()
    fetchProfile()
  }, [fetchSignalProfile, fetchHistory, fetchTrajectory, fetchIntents, fetchProfile])

  if (signalLoading || !signalProfile) {
    return <DashboardSkeleton />
  }

  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  })()

  const dimensions: SignalDimension[] = ['reliability', 'performance', 'responsiveness', 'feedback', 'growth']

  return (
    <motion.div
      className="space-y-8"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={staggerItem}>
        <p className="text-sm text-muted-foreground mb-0.5">{greeting}</p>
        <h1 className="text-2xl font-bold text-foreground">
          {profile?.display_name ?? 'Your Signal Dashboard'}
        </h1>
      </motion.div>

      {/* Signal Score Hero */}
      <motion.div variants={staggerItem}>
        <GlowCard className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Composite Signal</p>
              <div className="flex items-end gap-3">
                <AnimatedNumber
                  value={signalProfile.composite_score}
                  className="text-5xl font-bold text-foreground"
                />
                <div className="mb-1.5">
                  <p className={`text-sm font-medium ${getTrendColor(signalProfile.score_trend)}`}>
                    {getTrendLabel(signalProfile.score_trend)}
                  </p>
                  {signalProfile.percentile_rank && (
                    <p className="text-xs text-muted-foreground">
                      {formatPercentile(signalProfile.percentile_rank)}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <Link
              href="/profile"
              className="flex items-center gap-1.5 text-xs text-violet-400/70 hover:text-violet-300 transition-colors"
            >
              View Profile <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Timeline chart */}
          {weeklyHistory.length > 0 && (
            <SignalTimeline aggregates={weeklyHistory} showDimensions height={160} />
          )}
        </GlowCard>
      </motion.div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trajectory */}
        <motion.div variants={staggerItem}>
          {latestSnapshot ? (
            <TrajectoryPhaseCard snapshot={latestSnapshot} className="h-full" />
          ) : (
            <GlowCard className="p-5 h-full flex flex-col items-center justify-center gap-3 text-center">
              <TrendingUp className="w-8 h-8 text-muted-foreground/30" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Trajectory not computed yet</p>
                <p className="text-xs text-muted-foreground/60 mt-0.5">Log more activity to see your trajectory</p>
              </div>
            </GlowCard>
          )}
        </motion.div>

        {/* Next Steps */}
        <motion.div variants={staggerItem}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Next Steps</h2>
            </div>
            <NextStepsPanel
              signalProfile={signalProfile}
              trajectory={latestSnapshot}
              intents={declaredIntents}
            />
          </div>
        </motion.div>
      </div>

      {/* Dimension Cards */}
      <motion.div variants={staggerItem}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">Signal Dimensions</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {dimensions.map(dim => (
            <SignalDimensionCard
              key={dim}
              dimension={dim}
              score={signalProfile[dim]}
              trend={signalProfile.score_trend}
            />
          ))}
        </div>
      </motion.div>

      {/* Quick links */}
      <motion.div variants={staggerItem}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/learn">
            <GlowCard className="p-4 hover:border-violet-500/30 transition-all cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-violet-300 transition-colors">
                    Learning Feed
                  </p>
                  <p className="text-xs text-muted-foreground">Personalized for your trajectory</p>
                </div>
              </div>
            </GlowCard>
          </Link>
          <Link href="/opportunities">
            <GlowCard className="p-4 hover:border-purple-500/30 transition-all cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-purple-300 transition-colors">
                    Opportunities
                  </p>
                  <p className="text-xs text-muted-foreground">Matched to your signal + trajectory</p>
                </div>
              </div>
            </GlowCard>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}
