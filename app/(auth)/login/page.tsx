'use client'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Zap, ArrowRight, Sparkles, BarChart2, TrendingUp, BookOpen } from 'lucide-react'
import { useAuthStore } from '@/lib/stores/auth.store'
import { fadeUpEnter, scaleIn, orbFloat, glowPulse } from '@/lib/gsap/animations'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export default function LoginPage() {
  const router = useRouter()
  const { userMode, onboardingComplete, loginAsAlex, startNewProfile } = useAuthStore()

  const pageRef     = useRef<HTMLDivElement>(null)
  const orb1Ref     = useRef<HTMLDivElement>(null)
  const orb2Ref     = useRef<HTMLDivElement>(null)
  const logoRef     = useRef<HTMLDivElement>(null)
  const heroRef     = useRef<HTMLDivElement>(null)
  const cardsRef    = useRef<HTMLDivElement>(null)
  const footnoteRef = useRef<HTMLParagraphElement>(null)
  const alexBtnRef  = useRef<HTMLButtonElement>(null)

  // Redirect if already logged in
  useEffect(() => {
    if (userMode === 'alex' && onboardingComplete) router.replace('/dashboard')
    else if (userMode === 'new' && !onboardingComplete) router.replace('/onboarding')
    else if (userMode === 'new' && onboardingComplete) router.replace('/dashboard')
  }, [userMode, onboardingComplete, router])

  // GSAP entrance sequence
  useGSAP(() => {
    const tl = gsap.timeline()

    if (orb1Ref.current) orbFloat(orb1Ref.current, { duration: 9, delay: 0 })
    if (orb2Ref.current) orbFloat(orb2Ref.current, { duration: 11, delay: 2 })

    if (logoRef.current)  tl.add(fadeUpEnter(logoRef.current, { duration: 0.4 }))
    if (heroRef.current) {
      const children = heroRef.current.querySelectorAll('[data-hero-el]')
      tl.add(fadeUpEnter(Array.from(children), { stagger: 0.1, duration: 0.45 }), '-=0.1')
    }
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('[data-card]')
      tl.add(scaleIn(Array.from(cards), { stagger: 0.1 }), '-=0.1')
    }
    if (footnoteRef.current) {
      tl.add(fadeUpEnter(footnoteRef.current, { duration: 0.3 }), '-=0.05')
    }
  }, { scope: pageRef })

  // Glow pulse on primary CTA on mount
  useGSAP(() => {
    if (alexBtnRef.current) glowPulse(alexBtnRef.current)
  }, { scope: alexBtnRef })

  function handleLoginAsAlex() {
    loginAsAlex()
    router.push('/dashboard')
  }

  function handleCreateNew() {
    startNewProfile()
    router.push('/onboarding')
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-background flex flex-col overflow-hidden">

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          ref={orb1Ref}
          className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-signal/8 rounded-full blur-3xl"
        />
        <div
          ref={orb2Ref}
          className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-trajectory/6 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <div ref={logoRef} className="flex items-center gap-2.5 opacity-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-signal to-trajectory flex items-center justify-center shadow-lg shadow-signal/20">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-base tracking-tight">Cosmico Signal</span>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">

        {/* Hero */}
        <div ref={heroRef} className="text-center max-w-xl mb-14 space-y-0">
          <div data-hero-el className="opacity-0 inline-flex items-center gap-2 rounded-full border border-signal/20 bg-signal/8 px-3 py-1 text-xs text-signal-light mb-5">
            <Sparkles className="w-3 h-3" />
            Prototype — no account required
          </div>
          <h1 data-hero-el className="opacity-0 text-4xl font-bold tracking-tight leading-tight mb-4">
            Understand who<br />
            <span className="text-gradient-signal">you are becoming</span>
          </h1>
          <p data-hero-el className="opacity-0 text-base text-muted-foreground leading-relaxed">
            Cosmico Signal observes how you work, tracks how you evolve,
            and guides you toward the professional you want to become.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Existing profile — Alex */}
          <button
            ref={alexBtnRef}
            data-card
            onClick={handleLoginAsAlex}
            className="group opacity-0 relative text-left rounded-2xl border border-border bg-card p-6 hover:border-signal/40 transition-all duration-300 cursor-pointer"
            style={{ boxShadow: '0 25px 50px -12px hsla(263,70%,62%,0.05)' }}
          >
            {/* Avatar */}
            <div className="relative w-14 h-14 mb-5">
              <div className="absolute inset-0 rounded-full bg-signal/20 blur-md" />
              <div className="relative w-14 h-14 rounded-full border-2 border-signal/40 bg-gradient-to-br from-signal/30 to-trajectory/20 flex items-center justify-center">
                <span className="text-xl font-bold text-signal-light">A</span>
              </div>
              <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-[hsl(142,71%,45%)] border-2 border-card" />
            </div>

            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-0.5">Continue as</p>
              <h3 className="text-lg font-bold">Alex Chen</h3>
              <p className="text-sm text-muted-foreground">Sr. Frontend Engineer</p>
            </div>

            <div className="flex items-center gap-3 mb-5">
              {[
                { color: 'bg-signal', label: 'Signal 74.8' },
                { color: 'bg-trajectory', label: 'Specializing' },
                { color: 'bg-[hsl(142,71%,45%)]', label: 'Rising ↑' },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {['6 yrs exp', 'Trajectory', 'Freelancer', 'Remote'].map((f) => (
                <span key={f} className="text-xs rounded-md bg-accent px-2 py-0.5 text-muted-foreground">{f}</span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-signal group-hover:text-signal-light transition-colors">
              Load full profile
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* New profile */}
          <button
            data-card
            onClick={handleCreateNew}
            className="group opacity-0 relative text-left rounded-2xl border border-dashed border-border bg-card/50 p-6 hover:border-signal/40 hover:bg-card transition-all duration-300 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-border group-hover:border-signal/40 bg-accent/50 flex items-center justify-center mb-5 transition-colors">
              <Sparkles className="w-6 h-6 text-muted-foreground group-hover:text-signal transition-colors" />
            </div>

            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-0.5">Start fresh</p>
              <h3 className="text-lg font-bold">New Profile</h3>
              <p className="text-sm text-muted-foreground">Build your signal from scratch</p>
            </div>

            <div className="space-y-2 mb-5">
              {[
                { icon: BarChart2, text: 'Define your role and skills' },
                { icon: TrendingUp, text: 'Set your trajectory goals' },
                { icon: BookOpen, text: 'Personalize your specialties' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-muted-foreground flex-none" />
                  <span className="text-xs text-muted-foreground">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-signal transition-colors">
              Start 7-step onboarding
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        <p ref={footnoteRef} className="opacity-0 mt-8 text-xs text-muted-foreground/50 text-center">
          Prototype mode — no real data is stored or sent anywhere
        </p>
      </main>
    </div>
  )
}
