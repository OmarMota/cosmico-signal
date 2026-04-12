'use client'
import { create } from 'zustand'
import type { Profile, Skill, UpdateProfileInput } from '../types/profile.types'

interface ProfileStore {
  profile: Profile | null
  skills: Skill[]
  isLoading: boolean
  error: string | null

  fetchProfile: () => Promise<void>
  updateProfile: (updates: UpdateProfileInput) => Promise<void>
  reset: () => void
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  skills: [],
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    set({ isLoading: true, error: null })
    try {
      const res = await fetch('/api/profile')
      if (!res.ok) throw new Error('Failed to fetch profile')
      const data = await res.json()
      set({ profile: data.profile, skills: data.skills ?? [], isLoading: false })
    } catch (err) {
      set({ error: String(err), isLoading: false })
    }
  },

  updateProfile: async (updates) => {
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (!res.ok) throw new Error('Failed to update profile')
      const data = await res.json()
      set({ profile: data.profile })
    } catch (err) {
      set({ error: String(err) })
    }
  },

  reset: () => set({ profile: null, skills: [], error: null }),
}))
