'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/lib/stores/auth.store'
import { Zap, ArrowRight, Sparkles, TrendingUp, BookOpen, BarChart2 } from 'lucide-react'
import { LoadingScreen } from '@/components/loading/LoadingScreen'

export default function LoginPage() {
  const router = useRouter()
  const { userMode, onboardingComplete, loginAsAlex, startNewProfile } = useAuthStore()
  const [loadingDone, setLoadingDone] = useState(false)

  useEffect(() => {
    if (userMode === 'alex' && onboardingComplete) router.replace('/dashboard')
    else if (userMode === 'new' && !onboardingComplete) router.replace('/onboarding')
    else if (userMode === 'new' && onboardingComplete) router.replace('/dashboard')
  }, [userMode, onboardingComplete, router])

  function handleLoginAsAlex() {
    loginAsAlex()
    router.push('/dashboard')
  }

  function handleCreateNew() {
    startNewProfile()
    router.push('/onboarding')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">

      <LoadingScreen show={!loadingDone} onComplete={() => setLoadingDone(true)} />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-signal/6 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-trajectory/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <AnimatePresence>
        {loadingDone && (
          <motion.header
            key="header"
            className="relative z-10 flex items-center justify-between px-8 py-6"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-background" />
              </div>
              <span className="font-semibold text-sm tracking-tight text-foreground">Cosmico Signal</span>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Main */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">

        {/* Hero text */}
        <motion.div
          className="text-center max-w-xl mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={loadingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-signal/20 bg-signal/8 px-3 py-1 text-xs text-signal-light mb-5">
            <Sparkles className="w-3 h-3" />
            Prototype — no account required
          </div>
          <h1 className="text-4xl font-bold text-foreground tracking-tight leading-tight mb-4">
            Understand who<br />
            <span className="text-gradient-signal">
              you are becoming
            </span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Cosmico Signal observes how you work, tracks how you evolve,
            and guides you toward the professional you want to become.
          </p>
        </motion.div>

        {/* Two cards */}
        <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Option A — Existing profile */}
          <motion.button
            onClick={handleLoginAsAlex}
            className="group relative text-left rounded-2xl border border-border bg-card p-6 hover:border-signal/30 transition-all duration-300 hover:shadow-lg hover:shadow-signal/8 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={loadingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -2 }}
          >
            {/* Avatar glow */}
            <div className="relative w-14 h-14 mb-5">
              <div className="absolute inset-0 rounded-full bg-signal/15 blur-md" />
              <div className="relative w-14 h-14 rounded-full border-2 border-signal/30 bg-signal/10 flex items-center justify-center">
                <span className="text-xl font-bold text-signal-light">A</span>
              </div>
              <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-card" />
            </div>

            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-0.5">Continue as</p>
              <h3 className="text-lg font-bold text-foreground">Alex Chen</h3>
              <p className="text-sm text-muted-foreground">Sr. Frontend Engineer</p>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-signal" />
                <span className="text-xs text-muted-foreground">Signal 74.8</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-trajectory" />
                <span className="text-xs text-muted-foreground">Specializing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs text-muted-foreground">Rising ↑</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {['12wk history', 'Trajectory', 'Learning recs', 'Opportunities'].map(f => (
                <span key={f} className="text-xs rounded-md bg-accent px-2 py-0.5 text-muted-foreground">{f}</span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-signal-light group-hover:text-signal transition-colors">
              Load full profile
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>

          {/* Option B — New profile */}
          <motion.button
            onClick={handleCreateNew}
            className="group relative text-left rounded-2xl border border-dashed border-border bg-card/50 p-6 hover:border-signal/30 hover:bg-card transition-all duration-300 hover:shadow-lg hover:shadow-signal/8 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={loadingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.18 }}
            whileHover={{ y: -2 }}
          >
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-border group-hover:border-signal/30 bg-accent/50 flex items-center justify-center mb-5 transition-colors">
              <Sparkles className="w-6 h-6 text-muted-foreground group-hover:text-signal transition-colors" />
            </div>

            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-0.5">Start fresh</p>
              <h3 className="text-lg font-bold text-foreground">New Profile</h3>
              <p className="text-sm text-muted-foreground">Build your signal from scratch</p>
            </div>

            <div className="space-y-2 mb-5">
              {[
                { icon: BarChart2, text: 'Define your role and skills' },
                { icon: TrendingUp, text: 'Set your trajectory goals' },
                { icon: BookOpen, text: 'Get personalized learning' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-muted-foreground flex-none" />
                  <span className="text-xs text-muted-foreground">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-signal-light transition-colors">
              Start 7-step onboarding
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>
        </div>

        <motion.p
          className="mt-8 text-xs text-muted-foreground/50 text-center"
          initial={{ opacity: 0 }}
          animate={loadingDone ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4 }}
        >
          Prototype mode — no real data is stored or sent anywhere
        </motion.p>
      </main>
    </div>
  )
}
