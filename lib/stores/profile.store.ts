'use client'
import { create } from 'zustand'
import type { UserProfile, AvailabilityStatus, UpdateProfileInput } from '../types/profile.types'

export type ProfileSection = 'about' | 'basics' | 'experiences' | 'specialties'

interface ProfileStore {
  profile: UserProfile | null
  skills: UserProfile['skills']
  activeSection: ProfileSection
  isLoading: boolean
  isSaving: boolean
  error: string | null

  fetchProfile: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile> | UpdateProfileInput) => Promise<void>
  setProfile: (profile: UserProfile) => void
  setActiveSection: (section: ProfileSection) => void
  setAvailability: (status: AvailabilityStatus) => void
  setSaving: (saving: boolean) => void
  reset: () => void
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profile: null,
  skills: [],
  activeSection: 'about',
  isLoading: false,
  isSaving: false,
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
    // Optimistic local update
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...updates } as UserProfile : null,
    }))
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

  setProfile: (profile) => set({ profile, skills: profile.skills ?? [] }),

  setActiveSection: (section) => set({ activeSection: section }),

  setAvailability: (status) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, availability: status } : null,
    })),

  setSaving: (saving) => set({ isSaving: saving }),

  reset: () => set({ profile: null, skills: [], error: null }),
}))
