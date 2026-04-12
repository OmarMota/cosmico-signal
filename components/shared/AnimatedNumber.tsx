'use client'
import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  duration?: number
  decimals?: number
  className?: string
  prefix?: string
  suffix?: string
}

export function AnimatedNumber({
  value,
  duration = 0.8,
  decimals = 0,
  className,
  prefix = '',
  suffix = '',
}: AnimatedNumberProps) {
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString()
  )
  const prevValue = useRef(0)

  useEffect(() => {
    const controls = animate(prevValue.current, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => motionValue.set(v),
    })
    prevValue.current = value
    return controls.stop
  }, [value, duration, motionValue])

  return (
    <motion.span className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  )
}
