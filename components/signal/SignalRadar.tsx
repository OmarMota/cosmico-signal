'use client'
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts'
import type { SignalProfile } from '@/lib/types/signal.types'
import { DIMENSION_LABELS } from '@/lib/types/signal.types'

interface SignalRadarProps {
  profile: SignalProfile
  showCohort?: boolean
}

const COHORT_AVERAGE = { reliability: 62, performance: 60, responsiveness: 58, feedback: 55, growth: 57 }

export function SignalRadar({ profile, showCohort = false }: SignalRadarProps) {
  const data = [
    { dimension: DIMENSION_LABELS.reliability,    score: Math.round(profile.reliability),    cohort: COHORT_AVERAGE.reliability },
    { dimension: DIMENSION_LABELS.performance,    score: Math.round(profile.performance),    cohort: COHORT_AVERAGE.performance },
    { dimension: DIMENSION_LABELS.responsiveness, score: Math.round(profile.responsiveness), cohort: COHORT_AVERAGE.responsiveness },
    { dimension: DIMENSION_LABELS.feedback,       score: Math.round(profile.feedback),       cohort: COHORT_AVERAGE.feedback },
    { dimension: DIMENSION_LABELS.growth,         score: Math.round(profile.growth),         cohort: COHORT_AVERAGE.growth },
  ]

  return (
    <ResponsiveContainer width="100%" height={240}>
      <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
        <PolarGrid gridType="polygon" stroke="rgba(148,163,184,0.15)" strokeDasharray="3 3" />
        <PolarAngleAxis dataKey="dimension" tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} />
        {showCohort && (
          <Radar
            name="Cohort"
            dataKey="cohort"
            stroke="rgba(148,163,184,0.4)"
            fill="rgba(148,163,184,0.05)"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
        )}
        <Radar
          name="Your Signal"
          dataKey="score"
          stroke="rgba(148,163,184,0.8)"
          fill="rgba(148,163,184,0.15)"
          strokeWidth={2}
          dot={{ fill: '#94a3b8', r: 3, strokeWidth: 0 }}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
