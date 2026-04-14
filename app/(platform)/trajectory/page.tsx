'use client'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTrajectoryStore } from '@/lib/stores/trajectory.store'
import { useProfileStore } from '@/lib/stores/profile.store'
import { TrajectoryArc } from '@/components/trajectory/TrajectoryArc'
import { TrajectoryPhaseCard } from '@/components/trajectory/TrajectoryPhaseCard'
import { RoleEvolutionMap } from '@/components/trajectory/RoleEvolutionMap'
import { GlowCard } from '@/components/shared/GlowCard'
import { DashboardSkeleton } from '@/components/shared/LoadingSkeleton'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { staggerContainer, staggerItem } from '@/lib/utils/animation-variants'
import { format, parseISO } from 'date-fns'
import { RefreshCw } from 'lucide-react'

export default function TrajectoryPage() {
  const { latestSnapshot, milestones, isLoading, isComputing, fetchTrajectory, triggerDetection } =
    useTrajectoryStore()
  const { profile, fetchProfile } = useProfileStore()

  useEffect(() => {
    fetchTrajectory()
    fetchProfile()
  }, [fetchTrajectory, fetchProfile])

  if (isLoading) return <DashboardSkeleton />

  return (
    <motion.div
      className="space-y-8"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={staggerItem} className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Your Trajectory</h1>
          <p className="text-sm text-muted-foreground">
            How your signal is shaping your professional evolution
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={triggerDetection}
          disabled={isComputing}
          className="flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3 h-3 ${isComputing ? 'animate-spin' : ''}`} />
          {isComputing ? 'Computing...' : 'Recalculate'}
        </Button>
      </motion.div>

      {!latestSnapshot ? (
        <GlowCard className="p-12 text-center">
          <p className="text-muted-foreground mb-4">
            Not enough signal data yet to compute your trajectory.
          </p>
          <Button variant="signal" onClick={triggerDetection} disabled={isComputing}>
            Compute My Trajectory
          </Button>
        </GlowCard>
      ) : (
        <>
          {/* Arc Visualization */}
          <motion.div variants={staggerItem}>
            <GlowCard className="p-6 overflow-hidden">
              <h2 className="text-sm font-semibold text-foreground mb-4">Trajectory Arc</h2>
              <TrajectoryArc snapshot={latestSnapshot} height={160} />
              <p className="text-xs text-muted-foreground/60 text-center mt-2">
                You are at the <span className="text-violet-400">{latestSnapshot.current_phase}</span> phase
              </p>
            </GlowCard>
          </motion.div>

          {/* Phase Card + Patterns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div variants={staggerItem}>
              <TrajectoryPhaseCard snapshot={latestSnapshot} className="h-full" />
            </motion.div>

            <motion.div variants={staggerItem}>
              <GlowCard className="p-5 h-full">
                <h2 className="text-sm font-semibold text-foreground mb-4">Detected Patterns</h2>
                {latestSnapshot.detected_patterns?.length > 0 ? (
                  <div className="space-y-3">
                    {latestSnapshot.detected_patterns.map((pattern, i) => (
                      <motion.div
                        key={i}
                        className="rounded-lg border border-border/40 bg-card/40 p-3"
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-sm font-medium text-foreground capitalize">
                            {pattern.type.replace(/_/g, ' ')}
                          </p>
                          <Badge variant="trajectory">
                            {Math.round(pattern.confidence * 100)}%
                          </Badge>
                        </div>
                        {pattern.evidence?.map((ev, j) => (
                          <p key={j} className="text-xs text-muted-foreground">· {ev}</p>
                        ))}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground/60">
                    No significant patterns detected yet. Keep logging activity.
                  </p>
                )}
              </GlowCard>
            </motion.div>
          </div>

          {/* Role Evolution Map */}
          {latestSnapshot.role_predictions?.length > 0 && profile && (
            <motion.div variants={staggerItem}>
              <GlowCard className="p-5">
                <h2 className="text-sm font-semibold text-foreground mb-4">Role Evolution</h2>
                <RoleEvolutionMap
                  predictions={latestSnapshot.role_predictions}
                  currentRole={profile.primary_role ?? profile.job_title ?? ''}
                />
              </GlowCard>
            </motion.div>
          )}

          {/* Milestones */}
          {milestones.length > 0 && (
            <motion.div variants={staggerItem}>
              <GlowCard className="p-5">
                <h2 className="text-sm font-semibold text-foreground mb-4">Milestones</h2>
                <div className="space-y-2">
                  {milestones.map((m, i) => (
                    <div key={m.id} className="flex items-start gap-3 py-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{m.title}</p>
                        {m.description && (
                          <p className="text-xs text-muted-foreground">{m.description}</p>
                        )}
                        <p className="text-xs text-muted-foreground/50 mt-0.5">
                          {format(parseISO(m.achieved_at), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlowCard>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  )
}
