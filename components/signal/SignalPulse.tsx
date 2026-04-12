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
  sm: { orb: 80, ring1: 96, ring2: 112 },
  md: { orb: 120, ring1: 144, ring2: 168 },
  lg: { orb: 160, ring1: 192, ring2: 224 },
}

export function SignalPulse({ score, trend = 'stable', size = 'lg' }: SignalPulseProps) {
  const springScore = useSpring(score, { stiffness: 60, damping: 20 })

  // Glow intensity scales with score
  const glowOpacity = useTransform(springScore, [0, 100], [0.15, 0.6])
  const glowSize = useTransform(springScore, [0, 100], [20, 60])

  useEffect(() => {
    springScore.set(score)
  }, [score, springScore])

  const { orb, ring1, ring2 } = SIZE_MAP[size]
  const pulseDuration = 3 - (score / 100) * 1.5 // faster at higher scores

  const trendIcon = trend === 'rising' ? '↑' : trend === 'falling' ? '↓' : '→'
  const trendColor = trend === 'rising' ? '#34d399' : trend === 'falling' ? '#f87171' : '#94a3b8'

  return (
    <div className="relative flex items-center justify-center" style={{ width: ring2, height: ring2 }}>
      {/* Outer pulse ring */}
      <motion.div
        className="absolute rounded-full border border-violet-400/20"
        style={{ width: ring2, height: ring2 }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: pulseDuration, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Middle ring */}
      <motion.div
        className="absolute rounded-full border border-violet-400/30"
        style={{ width: ring1, height: ring1 }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.1, 0.5] }}
        transition={{ duration: pulseDuration * 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      />

      {/* Glow backdrop */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: orb,
          height: orb,
          background: 'radial-gradient(circle, rgba(139,92,246,VAR) 0%, transparent 70%)',
          opacity: glowOpacity,
          filter: `blur(${size === 'lg' ? 16 : 8}px)`,
        }}
      />

      {/* Core orb */}
      <motion.div
        className="relative rounded-full flex flex-col items-center justify-center"
        style={{
          width: orb,
          height: orb,
          background: 'radial-gradient(circle at 35% 35%, rgba(167,139,250,0.3) 0%, rgba(139,92,246,0.15) 60%, rgba(109,40,217,0.1) 100%)',
          boxShadow: `0 0 ${size === 'lg' ? 40 : 20}px rgba(139,92,246,0.3), inset 0 1px 0 rgba(255,255,255,0.1)`,
          border: '1px solid rgba(139,92,246,0.4)',
        }}
        animate={{
          boxShadow: [
            `0 0 ${size === 'lg' ? 30 : 15}px rgba(139,92,246,0.25)`,
            `0 0 ${size === 'lg' ? 55 : 30}px rgba(139,92,246,0.5)`,
            `0 0 ${size === 'lg' ? 30 : 15}px rgba(139,92,246,0.25)`,
          ],
        }}
        transition={{ duration: pulseDuration, repeat: Infinity, ease: 'easeInOut' }}
      >
        {size !== 'sm' && (
          <>
            <AnimatedNumber
              value={score}
              className={`font-bold text-white leading-none ${size === 'lg' ? 'text-3xl' : 'text-xl'}`}
            />
            {size === 'lg' && (
              <>
                <span className="text-xs text-violet-300/70 mt-1">{getScoreLabel(score)}</span>
                <span className="text-xs mt-0.5" style={{ color: trendColor }}>
                  {trendIcon}
                </span>
              </>
            )}
          </>
        )}
      </motion.div>
    </div>
  )
}
