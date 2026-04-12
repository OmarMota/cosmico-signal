import type { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

export const pulseScale: Variants = {
  initial: { scale: 1 },
  pulse: {
    scale: [1, 1.06, 1],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
}

export const orbGlow = (score: number) => ({
  animate: {
    boxShadow: [
      `0 0 ${20 + score * 0.4}px ${4 + score * 0.1}px rgba(139, 92, 246, ${0.2 + score * 0.004})`,
      `0 0 ${40 + score * 0.6}px ${12 + score * 0.15}px rgba(139, 92, 246, ${0.4 + score * 0.005})`,
      `0 0 ${20 + score * 0.4}px ${4 + score * 0.1}px rgba(139, 92, 246, ${0.2 + score * 0.004})`,
    ],
    transition: {
      duration: 3 - score * 0.015, // faster pulse at higher scores
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
})

export const numberTransition = {
  type: 'tween',
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
}
