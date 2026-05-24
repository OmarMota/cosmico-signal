'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/lib/stores/auth.store'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { LoadingScreen } from '@/components/loading/LoadingScreen'
import { Zap, ArrowRight, Sparkles, TrendingUp, BookOpen, BarChart2 } from 'lucide-react'

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

        {/* Hero */}
        <motion.div
          className="text-center max-w-xl mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={loadingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-5 border-border bg-primary/8 text-primary gap-1.5">
            <Sparkles className="w-3 h-3" />
            Prototype — no account required
          </Badge>
          <h1 className="text-4xl font-bold text-foreground tracking-tight leading-tight mb-4">
            Understand who<br />
            <span className="text-foreground">you are becoming</span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Cosmico Signal observes how you work, tracks how you evolve,
            and guides you toward the professional you want to become.
          </p>
        </motion.div>

        {/* Two cards */}
        <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Option A — Existing profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loadingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -2 }}
          >
            <Card
              onClick={handleLoginAsAlex}
              className="group cursor-pointer h-full hover:border-border hover:shadow-lg hover:shadow-black/10 transition-all duration-300"
            >
              <CardContent className="p-6 flex flex-col h-full">
                {/* Avatar */}
                <div className="relative w-14 h-14 mb-5">
                  <div className="absolute inset-0 rounded-full bg-primary/10 blur-md" />
                  <div className="relative w-14 h-14 rounded-full border-2 border-border bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">A</span>
                  </div>
                  <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-card" />
                </div>

                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-0.5">Continue as</p>
                  <h3 className="text-lg font-bold text-foreground">Alex Chen</h3>
                  <p className="text-sm text-muted-foreground">Sr. Frontend Engineer</p>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline" className="gap-1">
                    <span className="w-1 h-1 rounded-full bg-foreground inline-block" />
                    Signal 74.8
                  </Badge>
                  <Badge variant="secondary" className="gap-1">Rising ↑</Badge>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {['12wk history', 'Trajectory', 'Learning', 'Opportunities'].map(f => (
                    <Badge key={f} variant="secondary">{f}</Badge>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-2 text-sm font-medium text-primary group-hover:text-foreground transition-colors">
                  Load full profile
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Option B — New profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loadingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.18 }}
            whileHover={{ y: -2 }}
          >
            <Card
              onClick={handleCreateNew}
              className="group cursor-pointer h-full border-dashed hover:border-border hover:bg-card transition-all duration-300 hover:shadow-lg hover:shadow-black/10 bg-card/50"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-border group-hover:border-border bg-accent/50 flex items-center justify-center mb-5 transition-colors">
                  <Sparkles className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>

                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-0.5">Start fresh</p>
                  <h3 className="text-lg font-bold text-foreground">New Profile</h3>
                  <p className="text-sm text-muted-foreground">Build your signal from scratch</p>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 mb-5">
                  {[
                    { icon: BarChart2,  text: 'Define your role and skills' },
                    { icon: TrendingUp, text: 'Set your trajectory goals' },
                    { icon: BookOpen,   text: 'Get personalized learning' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-muted-foreground flex-none" />
                      <span className="text-xs text-muted-foreground">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  Start 7-step onboarding
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
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
