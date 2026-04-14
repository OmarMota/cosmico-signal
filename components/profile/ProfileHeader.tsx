'use client'
import { motion } from 'framer-motion'
import { SignalPulse } from '../signal/SignalPulse'
import { Badge } from '../ui/badge'
import type { Profile } from '@/lib/types/profile.types'
import type { SignalProfile } from '@/lib/types/signal.types'
import { AVAILABILITY_LABELS, AVAILABILITY_COLORS } from '@/lib/types/profile.types'
import { formatRate } from '@/lib/utils/score-formatters'
import { MapPin, Clock } from 'lucide-react'

interface ProfileHeaderProps {
  profile: Profile
  signalProfile?: SignalProfile | null
}

export function ProfileHeader({ profile, signalProfile }: ProfileHeaderProps) {
  const availColor = AVAILABILITY_COLORS[profile.availability] ?? '#6b7280'
  const availLabel = AVAILABILITY_LABELS[profile.availability] ?? profile.availability

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
      {/* Signal Pulse Orb */}
      <div className="relative flex-shrink-0">
        {signalProfile ? (
          <SignalPulse score={signalProfile.composite_score} trend={signalProfile.score_trend} size="md" />
        ) : (
          <div className="w-28 h-28 rounded-full bg-muted/30 border border-border/50" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1">
        <motion.h1
          className="text-2xl font-bold text-foreground mb-0.5"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {profile.display_name}
        </motion.h1>

        <motion.p
          className="text-base text-muted-foreground mb-3"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          {profile.primary_role}
        </motion.p>

        {/* Meta row */}
        <motion.div
          className="flex flex-wrap items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Availability */}
          <Badge variant="outline" className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: availColor, boxShadow: `0 0 4px ${availColor}` }}
            />
            <span style={{ color: availColor }}>{availLabel}</span>
          </Badge>

          {/* Rate */}
          {(profile.hourly_rate_min || profile.hourly_rate_max) && (
            <Badge variant="muted">
              {formatRate(profile.hourly_rate_min, profile.hourly_rate_max, profile.currency)}
            </Badge>
          )}

          {/* Location */}
          {profile.location && (
            <Badge variant="muted" className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {profile.location}
            </Badge>
          )}

          {/* Hours */}
          {profile.hours_per_week && (
            <Badge variant="muted" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {profile.hours_per_week}h/wk
            </Badge>
          )}
        </motion.div>

        {/* Headline */}
        {profile.headline && (
          <motion.p
            className="text-sm text-muted-foreground mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {profile.headline}
          </motion.p>
        )}
      </div>
    </div>
  )
}
