'use client'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTrajectoryStore } from '@/lib/stores/trajectory.store'
import { useProfileStore } from '@/lib/stores/profile.store'
import { TrajectoryArc } from '@/components/trajectory/TrajectoryArc'
import { TrajectoryPhaseCard } from '@/components/trajectory/TrajectoryPhaseCard'
import { RoleEvolutionMap } from '@/components/trajectory/RoleEvolutionMap'
import { GlowCard } from '@/components/shared/GlowCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { staggerContainer, staggerItem } from '@/lib/utils/animation-variants'
import { format, parseISO } from 'date-fns'
import { RefreshCw, CheckCircle2 } from 'lucide-react'

export default function TrajectoryPage() {
  const { latestSnapshot, milestones, isLoading, isComputing, fetchTrajectory, triggerDetection } =
    useTrajectoryStore()
  const { profile, fetchProfile } = useProfileStore()

  useEffect(() => {
    fetchTrajectory()
    fetchProfile()
  }, [fetchTrajectory, fetchProfile])

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-72" />
          </div>
          <Skeleton className="h-8 w-28" />
        </div>
        <Skeleton className="h-48 rounded-none" />
        <div className="grid grid-cols-2 gap-6">
          <Skeleton className="h-56 rounded-none" />
          <Skeleton className="h-56 rounded-none" />
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
          className="gap-1.5"
        >
          <RefreshCw className={`w-3 h-3 ${isComputing ? 'animate-spin' : ''}`} />
          {isComputing ? 'Computing…' : 'Recalculate'}
        </Button>
      </motion.div>

      {!latestSnapshot ? (
        <motion.div variants={staggerItem}>
          <Card>
            <CardContent className="p-12 flex flex-col items-center text-center gap-4">
              <p className="text-muted-foreground">
                Not enough signal data yet to compute your trajectory.
              </p>
              <Button variant="outline" onClick={triggerDetection} disabled={isComputing}>
                Compute My Trajectory
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <>
          {/* Arc Visualization */}
          <motion.div variants={staggerItem}>
            <GlowCard variant="default" className="p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-foreground">Trajectory Arc</h2>
                <Badge variant="outline">
                  {latestSnapshot.current_phase}
                </Badge>
              </div>
              <TrajectoryArc snapshot={latestSnapshot} height={160} />
              <p className="text-xs text-muted-foreground/60 text-center mt-2">
                Current phase · momentum score {Math.round((latestSnapshot.momentum_score ?? 0) * 100)}%
              </p>
            </GlowCard>
          </motion.div>

          {/* Phase Card + Patterns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div variants={staggerItem}>
              <TrajectoryPhaseCard snapshot={latestSnapshot} className="h-full" />
            </motion.div>

            <motion.div variants={staggerItem}>
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Detected Patterns</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="pt-4">
                  {latestSnapshot.detected_patterns?.length > 0 ? (
                    <div className="space-y-3">
                      {latestSnapshot.detected_patterns.map((pattern, i) => (
                        <motion.div
                          key={i}
                          className="rounded-none border border-border/40 bg-muted/20 p-3"
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <p className="text-sm font-medium text-foreground capitalize">
                              {pattern.type.replace(/_/g, ' ')}
                            </p>
                            <Badge variant="secondary">
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
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Role Evolution Map */}
          {latestSnapshot.role_predictions?.length > 0 && profile && (
            <motion.div variants={staggerItem}>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Role Evolution</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="pt-4">
                  <RoleEvolutionMap
                    predictions={latestSnapshot.role_predictions}
                    currentRole={profile.primary_role ?? profile.job_title ?? ''}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Milestones */}
          {milestones.length > 0 && (
            <motion.div variants={staggerItem}>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Milestones</CardTitle>
                    <Badge variant="secondary">{milestones.length}</Badge>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="pt-4">
                  <div className="space-y-1">
                    {milestones.map((m, i) => (
                      <div key={m.id}>
                        <div className="flex items-start gap-3 py-2.5">
                          <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{m.title}</p>
                            {m.description && (
                              <p className="text-xs text-muted-foreground mt-0.5">{m.description}</p>
                            )}
                            <p className="text-xs text-muted-foreground/50 mt-0.5">
                              {format(parseISO(m.achieved_at), 'MMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                        {i < milestones.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  )
}
