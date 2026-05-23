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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
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

  if (isLoading || !profile) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 rounded-none" />
        <div className="grid grid-cols-2 gap-6">
          <Skeleton className="h-56 rounded-none" />
          <Skeleton className="h-56 rounded-none" />
        </div>
        <div className="grid grid-cols-5 gap-3">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-none" />)}
        </div>
      </div>
    )
  }

  const dimensions: SignalDimension[] = ['reliability', 'performance', 'responsiveness', 'feedback', 'growth']

  return (
    <motion.div
      className="space-y-8"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Profile Header */}
      <motion.div variants={staggerItem}>
        <GlowCard variant="default" className="p-6">
          <ProfileHeader profile={profile} signalProfile={signalProfile} />
        </GlowCard>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Signal Radar */}
        {signalProfile && (
          <motion.div variants={staggerItem}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Signal Shape</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                <SignalRadar profile={signalProfile} showCohort />
                <p className="text-xs text-muted-foreground/60 text-center mt-2">
                  vs. cohort average (dashed)
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Signal Timeline */}
        {weeklyHistory.length > 0 && (
          <motion.div variants={staggerItem}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">12-Week Signal</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                <SignalTimeline aggregates={weeklyHistory} showDimensions height={200} />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Dimension Breakdown */}
      {signalProfile && (
        <motion.div variants={staggerItem}>
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-sm font-semibold text-foreground">Dimension Breakdown</h2>
            <Badge variant="secondary">{dimensions.length} signals</Badge>
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
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <motion.div variants={staggerItem}>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Skills</CardTitle>
                <Badge variant="secondary">{skills.length}</Badge>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
              <SkillConstellation skills={skills} />
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Bio */}
      {profile.bio && (
        <motion.div variants={staggerItem}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">About</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{profile.bio}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
