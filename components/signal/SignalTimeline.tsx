'use client'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { format, parseISO } from 'date-fns'
import type { SignalAggregate } from '@/lib/types/signal.types'

interface SignalTimelineProps {
  aggregates: SignalAggregate[]
  showDimensions?: boolean
  height?: number
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border/50 bg-card/90 backdrop-blur-sm px-3 py-2 text-xs shadow-lg">
      <p className="text-muted-foreground mb-1.5">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 mb-0.5">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-foreground font-medium">{Math.round(p.value)}</span>
          <span className="text-muted-foreground">{p.name}</span>
        </div>
      ))}
    </div>
  )
}

export function SignalTimeline({ aggregates, showDimensions = false, height = 200 }: SignalTimelineProps) {
  const data = [...aggregates]
    .sort((a, b) => a.week_start.localeCompare(b.week_start))
    .map(a => ({
      week: format(parseISO(a.week_start), 'MMM d'),
      composite: Math.round(a.composite_score),
      reliability: Math.round(a.reliability),
      performance: Math.round(a.performance),
      responsiveness: Math.round(a.responsiveness),
      feedback: Math.round(a.feedback),
      growth: Math.round(a.growth),
    }))

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
        <defs>
          <linearGradient id="compositeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
        <XAxis
          dataKey="week"
          tick={{ fill: '#64748b', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fill: '#64748b', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        {showDimensions && (
          <>
            <Area type="monotone" dataKey="reliability" name="Reliability" stroke="#6366f1" fill="transparent" strokeWidth={1.5} strokeOpacity={0.5} dot={false} />
            <Area type="monotone" dataKey="performance" name="Performance" stroke="#8b5cf6" fill="transparent" strokeWidth={1.5} strokeOpacity={0.5} dot={false} />
            <Area type="monotone" dataKey="growth" name="Growth" stroke="#e879f9" fill="transparent" strokeWidth={1.5} strokeOpacity={0.5} dot={false} />
          </>
        )}
        <Area
          type="monotone"
          dataKey="composite"
          name="Signal"
          stroke="#8b5cf6"
          fill="url(#compositeGrad)"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 4, fill: '#8b5cf6', strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
