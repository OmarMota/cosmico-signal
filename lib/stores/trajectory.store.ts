'use client'
import { create } from 'zustand'
import type { TrajectorySnapshot, TrajectoryMilestone } from '../types/trajectory.types'

interface TrajectoryStore {
  latestSnapshot: TrajectorySnapshot | null
  milestones: TrajectoryMilestone[]
  historySnapshots: TrajectorySnapshot[]
  isLoading: boolean
  isComputing: boolean
  error: string | null

  fetchTrajectory: () => Promise<void>
  fetchHistory: () => Promise<void>
  triggerDetection: () => Promise<void>
  reset: () => void
}

export const useTrajectoryStore = create<TrajectoryStore>((set, get) => ({
  latestSnapshot: null,
  milestones: [],
  historySnapshots: [],
  isLoading: false,
  isComputing: false,
  error: null,

  fetchTrajectory: async () => {
    set({ isLoading: true, error: null })
    try {
      const res = await fetch('/api/trajectory')
      if (!res.ok) throw new Error('Failed to fetch trajectory')
      const data = await res.json()
      set({
        latestSnapshot: data.snapshot ?? null,
        milestones: data.milestones ?? [],
        isLoading: false,
      })
    } catch (err) {
      set({ error: String(err), isLoading: false })
    }
  },

  fetchHistory: async () => {
    try {
      const res = await fetch('/api/trajectory?history=true')
      if (!res.ok) throw new Error('Failed to fetch trajectory history')
      const data = await res.json()
      set({ historySnapshots: data.snapshots ?? [] })
    } catch (err) {
      set({ error: String(err) })
    }
  },

  triggerDetection: async () => {
    set({ isComputing: true })
    try {
      const res = await fetch('/api/trajectory/detect', { method: 'POST' })
      if (!res.ok) throw new Error('Failed to detect trajectory')
      await get().fetchTrajectory()
    } catch (err) {
      set({ error: String(err) })
    } finally {
      set({ isComputing: false })
    }
  },

  reset: () => set({ latestSnapshot: null, milestones: [], historySnapshots: [], error: null }),
}))
