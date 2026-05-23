'use client'
import { useEffect, useRef } from 'react'
import type { TrajectorySnapshot } from '@/lib/types/trajectory.types'
import { PHASE_ORDER, PHASE_LABELS } from '@/lib/types/trajectory.types'

const ARC_PHASE_COLORS: Record<string, string> = {
  establishing: 'rgba(180,180,180,1)',
  building:     'rgba(155,155,155,1)',
  specializing: 'rgba(120,120,120,1)',
  leading:      'rgba(90,90,90,1)',
  pioneering:   'rgba(60,60,60,1)',
}

interface TrajectoryArcProps {
  snapshot: TrajectorySnapshot
  width?: number
  height?: number
}

export function TrajectoryArc({ snapshot, width = 600, height = 200 }: TrajectoryArcProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, width, height)

    const cx = width / 2
    const cy = height + 20
    const radius = height + 20
    const startAngle = Math.PI
    const endAngle = 0

    const phaseIndex = PHASE_ORDER.indexOf(snapshot.current_phase)
    const progress = (phaseIndex + 0.5) / PHASE_ORDER.length

    // Draw background arc track
    ctx.beginPath()
    ctx.arc(cx, cy, radius, startAngle, endAngle, false)
    ctx.strokeStyle = 'rgba(120,120,120,0.15)'
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw phase segments
    for (let i = 0; i < PHASE_ORDER.length; i++) {
      const segStart = Math.PI - (i / PHASE_ORDER.length) * Math.PI
      const segEnd = Math.PI - ((i + 1) / PHASE_ORDER.length) * Math.PI
      const base = ARC_PHASE_COLORS[PHASE_ORDER[i]]

      ctx.beginPath()
      ctx.arc(cx, cy, radius, segStart, segEnd, false)
      ctx.strokeStyle = i <= phaseIndex
        ? base.replace(',1)', i === phaseIndex ? ',1)' : ',0.5)')
        : 'rgba(100,100,100,0.25)'
      ctx.lineWidth = i === phaseIndex ? 3 : 1.5
      ctx.stroke()

      // Phase label
      const midAngle = (segStart + segEnd) / 2
      const labelRadius = radius - 28
      const lx = cx + Math.cos(midAngle) * labelRadius
      const ly = cy + Math.sin(midAngle) * labelRadius

      ctx.font = '9px system-ui, sans-serif'
      ctx.fillStyle = i <= phaseIndex ? base : 'rgba(120,120,120,0.4)'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(PHASE_LABELS[PHASE_ORDER[i]], lx, ly)
    }

    // Draw current position dot
    const currentAngle = Math.PI - progress * Math.PI
    const dotX = cx + Math.cos(currentAngle) * radius
    const dotY = cy + Math.sin(currentAngle) * radius

    // Outer halo
    const gradient = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 14)
    gradient.addColorStop(0, 'rgba(150,150,150,0.4)')
    gradient.addColorStop(1, 'transparent')
    ctx.beginPath()
    ctx.arc(dotX, dotY, 14, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()

    // Dot
    ctx.beginPath()
    ctx.arc(dotX, dotY, 5, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(180,180,180,1)'
    ctx.fill()
    ctx.strokeStyle = 'rgba(255,255,255,0.6)'
    ctx.lineWidth = 1.5
    ctx.stroke()

  }, [snapshot, width, height])

  return (
    <canvas
      ref={canvasRef}
      style={{ width, height }}
      className="w-full"
    />
  )
}
