'use client'
import { create } from 'zustand'
import type { Intent, InferredIntent, IntentAlignment, CreateIntentInput } from '../types/intent.types'

interface IntentStore {
  declaredIntents: Intent[]
  inferredIntents: InferredIntent[]
  alignment: IntentAlignment | null
  isLoading: boolean
  error: string | null

  fetchIntents: () => Promise<void>
  addIntent: (intent: CreateIntentInput) => Promise<void>
  abandonIntent: (id: string) => Promise<void>
  triggerInference: () => Promise<void>
  reset: () => void
}

export const useIntentStore = create<IntentStore>((set, get) => ({
  declaredIntents: [],
  inferredIntents: [],
  alignment: null,
  isLoading: false,
  error: null,

  fetchIntents: async () => {
    set({ isLoading: true })
    try {
      const res = await fetch('/api/intent')
      if (!res.ok) throw new Error('Failed to fetch intents')
      const data = await res.json()
      set({
        declaredIntents: data.declared ?? [],
        inferredIntents: data.inferred ?? [],
        alignment: data.alignment ?? null,
        isLoading: false,
      })
    } catch (err) {
      set({ error: String(err), isLoading: false })
    }
  },

  addIntent: async (intent) => {
    try {
      const res = await fetch('/api/intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(intent),
      })
      if (!res.ok) throw new Error('Failed to add intent')
      await get().fetchIntents()
    } catch (err) {
      set({ error: String(err) })
    }
  },

  abandonIntent: async (id) => {
    try {
      await fetch(`/api/intent/${id}`, { method: 'DELETE' })
      await get().fetchIntents()
    } catch (err) {
      set({ error: String(err) })
    }
  },

  triggerInference: async () => {
    try {
      await fetch('/api/intent/infer', { method: 'POST' })
      await get().fetchIntents()
    } catch (err) {
      set({ error: String(err) })
    }
  },

  reset: () => set({ declaredIntents: [], inferredIntents: [], alignment: null }),
}))
