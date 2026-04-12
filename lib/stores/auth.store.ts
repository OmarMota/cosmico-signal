'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface NewUserProfile {
  display_name: string
  role_category: string
  primary_role: string
  seniority_level: string
  hourly_rate_min?: number
  hourly_rate_max?: number
  currency: string
  availability: string
  hours_per_week?: number
  timezone?: string
  skills: Array<{ name: string; proficiency: number; category: string }>
  intents: Array<{ intent_type: string; target_role?: string; target_skills?: string[]; priority: number }>
}

interface AuthStore {
  userMode: 'alex' | 'new' | null
  newUserProfile: Partial<NewUserProfile> | null
  onboardingComplete: boolean

  loginAsAlex: () => void
  startNewProfile: () => void
  updateNewProfile: (data: Partial<NewUserProfile>) => void
  completeOnboarding: () => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      userMode: null,
      newUserProfile: null,
      onboardingComplete: false,

      loginAsAlex: () =>
        set({ userMode: 'alex', onboardingComplete: true, newUserProfile: null }),

      startNewProfile: () =>
        set({
          userMode: 'new',
          onboardingComplete: false,
          newUserProfile: { skills: [], intents: [], currency: 'USD', availability: 'open' },
        }),

      updateNewProfile: (data) =>
        set((state) => ({
          newUserProfile: { ...state.newUserProfile, ...data } as Partial<NewUserProfile>,
        })),

      completeOnboarding: () => set({ onboardingComplete: true }),

      logout: () =>
        set({ userMode: null, newUserProfile: null, onboardingComplete: false }),
    }),
    { name: 'cs-auth' }
  )
)

/** Read auth state synchronously from localStorage (safe outside React) */
export function readAuthState(): { userMode: 'alex' | 'new' | null; onboardingComplete: boolean; newUserProfile: Partial<NewUserProfile> | null } {
  if (typeof window === 'undefined') return { userMode: null, onboardingComplete: false, newUserProfile: null }
  try {
    const raw = localStorage.getItem('cs-auth')
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        userMode: parsed.state?.userMode ?? null,
        onboardingComplete: parsed.state?.onboardingComplete ?? false,
        newUserProfile: parsed.state?.newUserProfile ?? null,
      }
    }
  } catch {}
  return { userMode: null, onboardingComplete: false, newUserProfile: null }
}
