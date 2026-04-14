'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProfile } from '@/lib/types/profile.types'

interface AuthStore {
  userMode: 'alex' | 'new' | null
  onboardingComplete: boolean
  partialProfile: Partial<UserProfile> | null

  loginAsAlex: () => void
  startNewProfile: () => void
  updatePartialProfile: (data: Partial<UserProfile>) => void
  completeOnboarding: (finalProfile?: Partial<UserProfile>) => void
  logout: () => void
}

const ALEX_PROFILE: Partial<UserProfile> = {
  id: 'alex-demo',
  first_name: 'Alex',
  last_name: 'Chen',
  display_name: 'Alex Chen',
  email: 'alex@cosmico.io',
  job_title: 'Senior Frontend Engineer',
  role_category: 'engineer',
  seniority_level: 'senior',
  professional_situation: 'freelancer',
  availability: 'open',
  experience_years: '6-9',
  company_types: ['startup', 'scaleup', 'corporation'],
  industries: ['tech', 'finance', 'media'],
  skills: [
    { name: 'React', proficiency: 5, category: 'technical' },
    { name: 'TypeScript', proficiency: 5, category: 'technical' },
    { name: 'Next.js', proficiency: 4, category: 'technical' },
    { name: 'Node.js', proficiency: 3, category: 'technical' },
    { name: 'System Design', proficiency: 4, category: 'domain' },
  ],
  main_specialization: 'Frontend',
  skill_trajectory: ['Architecture', 'Leadership & Mentoring', 'Product Thinking'],
  goals: ['seniority_advance', 'rate_increase'],
  links: [
    { platform: 'linkedin', url: 'https://linkedin.com/in/alexchen' },
    { platform: 'github', url: 'https://github.com/alexchen' },
  ],
  languages: [
    { name: 'English', level: 'native' },
    { name: 'Mandarin', level: 'B2' },
  ],
  workplace: { type: 'remote' },
  hourly_rate_min: 90,
  hourly_rate_max: 140,
  currency: 'USD',
  hours_per_week: 32,
  onboarding_complete: true,
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      userMode: null,
      onboardingComplete: false,
      partialProfile: null,

      loginAsAlex: () =>
        set({
          userMode: 'alex',
          onboardingComplete: true,
          partialProfile: ALEX_PROFILE,
        }),

      startNewProfile: () =>
        set({
          userMode: 'new',
          onboardingComplete: false,
          partialProfile: {
            skills: [],
            company_types: [],
            industries: [],
            links: [],
            languages: [],
            goals: [],
            skill_trajectory: [],
            currency: 'EUR',
            availability: 'open',
          },
        }),

      updatePartialProfile: (data) =>
        set((state) => ({
          partialProfile: { ...state.partialProfile, ...data } as Partial<UserProfile>,
        })),

      completeOnboarding: (finalProfile) =>
        set((state) => ({
          onboardingComplete: true,
          partialProfile: {
            ...state.partialProfile,
            ...finalProfile,
            onboarding_complete: true,
          },
        })),

      logout: () =>
        set({ userMode: null, partialProfile: null, onboardingComplete: false }),
    }),
    { name: 'cs-auth' }
  )
)

/** Read auth state synchronously from localStorage (safe outside React) */
export function readAuthState(): {
  userMode: 'alex' | 'new' | null
  onboardingComplete: boolean
  partialProfile: Partial<UserProfile> | null
} {
  if (typeof window === 'undefined') {
    return { userMode: null, onboardingComplete: false, partialProfile: null }
  }
  try {
    const raw = localStorage.getItem('cs-auth')
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        userMode: parsed.state?.userMode ?? null,
        onboardingComplete: parsed.state?.onboardingComplete ?? false,
        partialProfile: parsed.state?.partialProfile ?? null,
      }
    }
  } catch {}
  return { userMode: null, onboardingComplete: false, partialProfile: null }
}
