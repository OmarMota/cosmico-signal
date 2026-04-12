'use client'
import { create } from 'zustand'
import type { UserProfile, AvailabilityStatus } from '@/lib/types/profile.types'

export type ProfileSection = 'about' | 'basics' | 'experiences' | 'specialties'

interface ProfileStore {
  profile: UserProfile | null
  activeSection: ProfileSection
  editingSection: ProfileSection | null
  isSaving: boolean

  setProfile: (profile: UserProfile) => void
  updateProfile: (data: Partial<UserProfile>) => void
  setActiveSection: (section: ProfileSection) => void
  setEditingSection: (section: ProfileSection | null) => void
  setAvailability: (status: AvailabilityStatus) => void
  setSaving: (saving: boolean) => void
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  activeSection: 'about',
  editingSection: null,
  isSaving: false,

  setProfile: (profile) => set({ profile }),

  updateProfile: (data) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...data } : null,
    })),

  setActiveSection: (section) => set({ activeSection: section }),

  setEditingSection: (section) => set({ editingSection: section }),

  setAvailability: (status) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, availability: status } : null,
    })),

  setSaving: (saving) => set({ isSaving: saving }),
}))
