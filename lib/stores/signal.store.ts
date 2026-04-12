'use client'
import { create } from 'zustand'
import type { SignalProfile, SignalAggregate, SignalEvent, CreateSignalEventInput } from '../types/signal.types'

interface SignalStore {
  signalProfile: SignalProfile | null
  weeklyHistory: SignalAggregate[]
  recentEvents: SignalEvent[]
  isLoading: boolean
  error: string | null

  fetchSignalProfile: () => Promise<void>
  fetchHistory: (weeks?: number) => Promise<void>
  addSignalEvent: (event: CreateSignalEventInput) => Promise<void>
  reset: () => void
}

export const useSignalStore = create<SignalStore>((set, get) => ({
  signalProfile: null,
  weeklyHistory: [],
  recentEvents: [],
  isLoading: false,
  error: null,

  fetchSignalProfile: async () => {
    set({ isLoading: true, error: null })
    try {
      const res = await fetch('/api/signals/aggregate')
      if (!res.ok) throw new Error('Failed to fetch signal profile')
      const data = await res.json()
      set({ signalProfile: data.profile, isLoading: false })
    } catch (err) {
      set({ error: String(err), isLoading: false })
    }
  },

  fetchHistory: async (weeks = 12) => {
    try {
      const res = await fetch(`/api/signals?weeks=${weeks}`)
      if (!res.ok) throw new Error('Failed to fetch history')
      const data = await res.json()
      set({ weeklyHistory: data.aggregates ?? [] })
    } catch (err) {
      set({ error: String(err) })
    }
  },

  addSignalEvent: async (event) => {
    try {
      const res = await fetch('/api/signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      })
      if (!res.ok) throw new Error('Failed to add signal event')
      // Re-fetch profile after adding event
      await get().fetchSignalProfile()
    } catch (err) {
      set({ error: String(err) })
    }
  },

  reset: () => set({ signalProfile: null, weeklyHistory: [], recentEvents: [], error: null }),
}))
