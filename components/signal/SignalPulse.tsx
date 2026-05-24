'use client'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import { AnimatedNumber } from '../shared/AnimatedNumber'
import { getScoreLabel } from '@/lib/utils/score-formatters'

interface SignalPulseProps {
  score: number
  trend?: 'rising' | 'falling' | 'stable'
  size?: 'sm' | 'md' | 'lg'
}

const SIZE_MAP = {
  sm: { orb: 80,  ring1: 96,  ring2: 112 },
  md: { orb: 120, ring1: 144, ring2: 168 },
  lg: { orb: 160, ring1: 192, ring2: 224 },
}

export function SignalPulse({ score, trend = 'stable', size = 'lg' }: SignalPulseProps) {
  const springScore = useSpring(score, { stiffness: 60, damping: 20 })
  const glowOpacity = useTransform(springScore, [0, 100], [0.06, 0.25])

  useEffect(() => { springScore.set(score) }, [score, springScore])

  const { orb, ring1, ring2 } = SIZE_MAP[size]
  const pulseDuration = 3 - (score / 100) * 1.5

  const trendIcon  = trend === 'rising' ? '↑' : trend === 'falling' ? '↓' : '→'
  const trendColor = trend === 'rising' ? '#34d399' : trend === 'falling' ? '#f87171' : '#94a3b8'

  return (
    <div className="relative flex items-center justify-center" style={{ width: ring2, height: ring2 }}>
      {/* Outer pulse ring */}
      <motion.div
        className="absolute rounded-full border border-border/40"
        style={{ width: ring2, height: ring2 }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: pulseDuration, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Middle ring */}
      <motion.div
        className="absolute rounded-full border border-border/60"
        style={{ width: ring1, height: ring1 }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.1, 0.5] }}
        transition={{ duration: pulseDuration * 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      />

      {/* Glow backdrop */}
      <motion.div
        className="absolute rounded-full bg-foreground"
        style={{ width: orb, height: orb, opacity: glowOpacity, filter: `blur(${size === 'lg' ? 20 : 10}px)` }}
      />

      {/* Core orb */}
      <motion.div
        className="relative rounded-full flex flex-col items-center justify-center bg-card border border-border"
        style={{
          width: orb,
          height: orb,
          boxShadow: `0 0 ${size === 'lg' ? 24 : 12}px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)`,
        }}
        animate={{
          boxShadow: [
            `0 0 ${size === 'lg' ? 16 : 8}px rgba(0,0,0,0.10)`,
            `0 0 ${size === 'lg' ? 32 : 18}px rgba(0,0,0,0.20)`,
            `0 0 ${size === 'lg' ? 16 : 8}px rgba(0,0,0,0.10)`,
          ],
        }}
        transition={{ duration: pulseDuration, repeat: Infinity, ease: 'easeInOut' }}
      >
        {size !== 'sm' && (
          <>
            <AnimatedNumber
              value={score}
              className={`font-bold text-foreground leading-none ${size === 'lg' ? 'text-3xl' : 'text-xl'}`}
            />
            {size === 'lg' && (
              <>
                <span className="text-xs text-muted-foreground mt-1">{getScoreLabel(score)}</span>
                <span className="text-xs mt-0.5" style={{ color: trendColor }}>{trendIcon}</span>
              </>
            )}
          </>
        )}
      </motion.div>
    </div>
  )
}
