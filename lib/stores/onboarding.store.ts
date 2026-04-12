'use client'
import { create } from 'zustand'
import type { UserProfile } from '@/lib/types/profile.types'

export const TOTAL_STEPS = 7

export const STEP_META = [
  { title: 'Nice to meet you',       subtitle: 'Let\'s start with who you are' },
  { title: 'Your Role',              subtitle: 'What do you do professionally?' },
  { title: 'Your Situation',         subtitle: 'Tell us about your current status' },
  { title: 'Your Skills',            subtitle: 'What do you bring to the table?' },
  { title: 'Your Experience',        subtitle: 'Where have you built your career?' },
  { title: 'Availability & Rate',    subtitle: 'When and how do you like to work?' },
  { title: 'Goals & Specialties',    subtitle: 'Where are you headed next?' },
] as const

interface OnboardingStore {
  currentStep: number
  stepData: Partial<UserProfile>
  isLoading: boolean

  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  updateStepData: (data: Partial<UserProfile>) => void
  setLoading: (loading: boolean) => void
  reset: () => void
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  currentStep: 1,
  stepData: {
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
  isLoading: false,

  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, TOTAL_STEPS) })),
  prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),
  updateStepData: (data) => set((s) => ({ stepData: { ...s.stepData, ...data } })),
  setLoading: (loading) => set({ isLoading: loading }),
  reset: () =>
    set({
      currentStep: 1,
      stepData: {
        skills: [], company_types: [], industries: [], links: [],
        languages: [], goals: [], skill_trajectory: [], currency: 'EUR', availability: 'open',
      },
    }),
}))
