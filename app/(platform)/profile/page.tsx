'use client'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useProfileStore } from '@/lib/stores/profile.store'
import { useSignalStore } from '@/lib/stores/signal.store'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { SignalRadar } from '@/components/signal/SignalRadar'
import { SignalTimeline } from '@/components/signal/SignalTimeline'
import { SkillConstellation } from '@/components/profile/SkillConstellation'
import { SignalDimensionCard } from '@/components/signal/SignalDimensionCard'
import { GlowCard } from '@/components/shared/GlowCard'
import { DashboardSkeleton } from '@/components/shared/LoadingSkeleton'
import { staggerContainer, staggerItem } from '@/lib/utils/animation-variants'
import type { SignalDimension } from '@/lib/types/signal.types'

export default function ProfilePage() {
  const { profile, skills, isLoading, fetchProfile } = useProfileStore()
  const { signalProfile, weeklyHistory, fetchSignalProfile, fetchHistory } = useSignalStore()

  useEffect(() => {
    fetchProfile()
    fetchSignalProfile()
    fetchHistory(12)
  }, [fetchProfile, fetchSignalProfile, fetchHistory])

  if (isLoading || !profile) return <DashboardSkeleton />

  const dimensions: SignalDimension[] = ['reliability', 'performance', 'responsiveness', 'feedback', 'growth']

  return (
    <motion.div
      className="space-y-8"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Profile Header with Pulse */}
      <motion.div variants={staggerItem}>
        <GlowCard className="p-6">
          <ProfileHeader profile={profile} signalProfile={signalProfile} />
        </GlowCard>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Signal Radar */}
        {signalProfile && (
          <motion.div variants={staggerItem}>
            <GlowCard className="p-5">
              <h2 className="text-sm font-semibold text-foreground mb-4">Signal Shape</h2>
              <SignalRadar profile={signalProfile} showCohort />
              <p className="text-xs text-muted-foreground/60 text-center mt-1">vs. cohort average (dashed)</p>
            </GlowCard>
          </motion.div>
        )}

        {/* Signal Timeline */}
        {weeklyHistory.length > 0 && (
          <motion.div variants={staggerItem}>
            <GlowCard className="p-5">
              <h2 className="text-sm font-semibold text-foreground mb-4">12-Week Signal</h2>
              <SignalTimeline aggregates={weeklyHistory} showDimensions height={200} />
            </GlowCard>
          </motion.div>
        )}
      </div>

      {/* Dimension breakdown */}
      {signalProfile && (
        <motion.div variants={staggerItem}>
          <h2 className="text-sm font-semibold text-foreground mb-3">Dimension Breakdown</h2>
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
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <motion.div variants={staggerItem}>
          <GlowCard className="p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">Skills</h2>
            <SkillConstellation skills={skills} />
          </GlowCard>
        </motion.div>
      )}

      {/* Bio */}
      {profile.bio && (
        <motion.div variants={staggerItem}>
          <GlowCard className="p-5">
            <h2 className="text-sm font-semibold text-foreground mb-2">About</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{profile.bio}</p>
          </GlowCard>
        </motion.div>
      )}
    </motion.div>
  )
}
