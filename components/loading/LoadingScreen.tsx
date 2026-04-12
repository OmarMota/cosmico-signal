'use client'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  show: boolean
  onComplete: () => void
}

// Floating orb — Framer Motion keyframe loop
function MeshOrb({
  width, height, top, right, bottom, left,
  color, blur, opacity, duration, delay,
}: {
  width: number; height: number
  top?: number | string; right?: number | string
  bottom?: number | string; left?: number | string
  color: string; blur: number; opacity: number
  duration: number; delay: number
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width, height, top, right, bottom, left,
        background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
        filter: `blur(${blur}px)`,
        opacity,
      }}
      animate={{ y: [0, -18, 6, -12, 0], x: [0, 10, -6, 8, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

// SVG logo with liquid-metal gradient + animated shine sweep + turbulence distortion
function LiquidMetalLogo({ size = 108 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Cosmico Signal"
    >
      <defs>
        {/* Clip path — exact logo silhouette */}
        <clipPath id="lm-clip">
          <path d="M8.68667 14.9977C8.68667 11.5524 11.4682 8.75162 14.8858 8.75162V5.83398C9.86326 5.83398 5.79102 9.93714 5.79102 14.9977C5.79102 20.0584 9.86326 24.1615 14.8858 24.1615V21.2439C11.4664 21.2439 8.68667 18.4412 8.68667 14.9977Z" />
          <path d="M21.0878 15.0001C21.0878 11.5509 18.3118 8.75391 14.8887 8.75391V21.2481C18.3118 21.2481 21.0878 18.4511 21.0878 15.002V15.0001Z" />
          <path d="M2.89565 14.9991C2.89565 8.32695 8.26421 2.91763 14.8861 2.91763V0C6.67796 0 0 6.72865 0 14.9991C0 23.2695 6.67796 29.9981 14.8861 29.9981V27.0805C8.26421 27.0805 2.89378 21.6712 2.89378 14.9972L2.89565 14.9991Z" />
        </clipPath>

        {/* Violet-silver chrome gradient */}
        <linearGradient id="lm-metal" x1="0" y1="0" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#1c1430" />
          <stop offset="12%"  stopColor="#52448a" />
          <stop offset="28%"  stopColor="#8c7acc" />
          <stop offset="44%"  stopColor="#c0aef0" />
          <stop offset="50%"  stopColor="#e8e0ff" />
          <stop offset="56%"  stopColor="#b8a6e8" />
          <stop offset="72%"  stopColor="#7260b8" />
          <stop offset="88%"  stopColor="#3c3070" />
          <stop offset="100%" stopColor="#160e28" />
        </linearGradient>

        {/* Specular highlight gradient (sweeps left→right) */}
        <linearGradient id="lm-shine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="white" stopOpacity="0" />
          <stop offset="43%"  stopColor="white" stopOpacity="0" />
          <stop offset="50%"  stopColor="white" stopOpacity="0.9" />
          <stop offset="57%"  stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Liquid distortion — slow turbulence seed animation */}
        <filter id="lm-distort" x="-6%" y="-6%" width="112%" height="112%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.022 0.016"
            numOctaves="4"
            seed="7"
            result="noise"
          >
            <animate attributeName="seed" values="7;19;7" dur="9s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic" in2="noise"
            scale="1.7"
            xChannelSelector="R" yChannelSelector="G"
          />
        </filter>

        {/* Violet bloom */}
        <filter id="lm-bloom" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.8" result="blur" />
          <feColorMatrix
            in="blur" type="matrix"
            values="0.35 0 0 0 0.3   0 0 0.2 0 0.15   0 0 1 0 1   0 0 0 0.42 0"
            result="coloredBlur"
          />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Layer 1: ambient violet bloom */}
      <g fill="url(#lm-metal)" filter="url(#lm-bloom)" opacity="0.5">
        <path d="M8.68667 14.9977C8.68667 11.5524 11.4682 8.75162 14.8858 8.75162V5.83398C9.86326 5.83398 5.79102 9.93714 5.79102 14.9977C5.79102 20.0584 9.86326 24.1615 14.8858 24.1615V21.2439C11.4664 21.2439 8.68667 18.4412 8.68667 14.9977Z" />
        <path d="M21.0878 15.0001C21.0878 11.5509 18.3118 8.75391 14.8887 8.75391V21.2481C18.3118 21.2481 21.0878 18.4511 21.0878 15.002V15.0001Z" />
        <path d="M2.89565 14.9991C2.89565 8.32695 8.26421 2.91763 14.8861 2.91763V0C6.67796 0 0 6.72865 0 14.9991C0 23.2695 6.67796 29.9981 14.8861 29.9981V27.0805C8.26421 27.0805 2.89378 21.6712 2.89378 14.9972L2.89565 14.9991Z" />
      </g>

      {/* Layer 2: logo with liquid distortion */}
      <g fill="url(#lm-metal)" filter="url(#lm-distort)">
        <path d="M8.68667 14.9977C8.68667 11.5524 11.4682 8.75162 14.8858 8.75162V5.83398C9.86326 5.83398 5.79102 9.93714 5.79102 14.9977C5.79102 20.0584 9.86326 24.1615 14.8858 24.1615V21.2439C11.4664 21.2439 8.68667 18.4412 8.68667 14.9977Z" />
        <path d="M21.0878 15.0001C21.0878 11.5509 18.3118 8.75391 14.8887 8.75391V21.2481C18.3118 21.2481 21.0878 18.4511 21.0878 15.002V15.0001Z" />
        <path d="M2.89565 14.9991C2.89565 8.32695 8.26421 2.91763 14.8861 2.91763V0C6.67796 0 0 6.72865 0 14.9991C0 23.2695 6.67796 29.9981 14.8861 29.9981V27.0805C8.26421 27.0805 2.89378 21.6712 2.89378 14.9972L2.89565 14.9991Z" />
      </g>

      {/* Layer 3: specular sweep — Framer Motion animates translateX */}
      <motion.g
        initial={{ translateX: -32 }}
        animate={{ translateX: 62 }}
        transition={{
          duration: 2.6,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 1.2,
        }}
      >
        <rect
          x={0} y={-2} width={32} height={34}
          fill="url(#lm-shine)"
          clipPath="url(#lm-clip)"
        />
      </motion.g>
    </svg>
  )
}

export function LoadingScreen({ show, onComplete }: LoadingScreenProps) {
  // Trigger completion after entrance + hold
  useEffect(() => {
    if (!show) return
    const t = setTimeout(onComplete, 4200)
    return () => clearTimeout(t)
  }, [show, onComplete])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: 'hsl(224,20%,6%)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.85, ease: 'easeInOut' } }}
        >
          {/* ── Mesh gradient background — palette-matched, very subtle ── */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Signal violet — top-left */}
            <MeshOrb
              width={720} height={720} top={-220} left={-220}
              color="hsl(263,70%,62%)" blur={90} opacity={0.038}
              duration={14} delay={0}
            />
            {/* Trajectory purple — right */}
            <MeshOrb
              width={580} height={580} top="28%" right={-180}
              color="hsl(275,60%,58%)" blur={110} opacity={0.028}
              duration={18} delay={2}
            />
            {/* Intent magenta — bottom */}
            <MeshOrb
              width={480} height={480} bottom={-80} left="38%"
              color="hsl(290,65%,60%)" blur={80} opacity={0.024}
              duration={16} delay={4}
            />
            {/* Centred ambient bloom */}
            <div
              className="absolute rounded-full"
              style={{
                width: 1000, height: 1000,
                top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                background: 'radial-gradient(circle, hsl(263,55%,52%) 0%, transparent 52%)',
                filter: 'blur(130px)',
                opacity: 0.018,
              }}
            />
          </div>

          {/* ── Liquid-metal logo ── */}
          <motion.div
            initial={{ scale: 0.52, opacity: 0, filter: 'blur(12px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.05, ease: [0.34, 1.56, 0.64, 1] }}
            className="mb-7"
          >
            {/* Subtle breathe loop after entrance */}
            <motion.div
              animate={{ scale: [1, 1.07, 1] }}
              transition={{ duration: 1.6, delay: 2.2, ease: 'easeInOut' }}
            >
              <LiquidMetalLogo size={108} />
            </motion.div>
          </motion.div>

          {/* ── Brand wordmark ── */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.55, ease: 'easeOut' }}
            className="text-[10px] font-semibold tracking-[0.3em] uppercase select-none"
            style={{ color: 'hsl(215,12%,38%)' }}
          >
            Cosmico Signal
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
