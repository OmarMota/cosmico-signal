'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Zap, AlertCircle } from 'lucide-react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: name },
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/onboarding')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-signal/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="flex items-center gap-2.5 mb-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
          <Zap className="w-4 h-4 text-background" />
        </div>
        <span className="font-semibold text-base tracking-tight text-foreground">Cosmico Signal</span>
      </motion.div>

      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="shadow-xl shadow-signal/5 border-border/60 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Begin your signal</CardTitle>
            <CardDescription>Join the platform that tracks how you grow</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Display Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Alex Chen"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="8+ characters"
                  minLength={8}
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                variant="signal"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Creating account…' : 'Create Account'}
              </Button>
            </form>

            <Separator className="my-4" />

            <p className="text-xs text-center text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-signal hover:text-signal-light transition-colors font-medium">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
