'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { GlowCard } from '@/components/shared/GlowCard'
import { Button } from '@/components/ui/button'
import { useProfileStore } from '@/lib/stores/profile.store'
import { staggerContainer, staggerItem } from '@/lib/utils/animation-variants'
import { LogOut } from 'lucide-react'

export default function SettingsPage() {
  const { profile, fetchProfile, updateProfile } = useProfileStore()
  const [bio, setBio] = useState('')
  const [headline, setHeadline] = useState('')
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  useEffect(() => {
    if (profile) {
      setBio(profile.bio ?? '')
      setHeadline(profile.headline ?? '')
    }
  }, [profile])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await updateProfile({ bio, headline })
    setSaving(false)
  }

  function handleSignOut() {
    router.push('/login')
  }

  return (
    <motion.div
      className="space-y-8 max-w-2xl"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl font-bold text-foreground mb-1">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your profile and account</p>
      </motion.div>

      <motion.div variants={staggerItem}>
        <GlowCard className="p-6">
          <h2 className="text-base font-semibold text-foreground mb-4">Profile</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Headline</label>
              <input
                type="text"
                value={headline}
                onChange={e => setHeadline(e.target.value)}
                className="w-full rounded-lg border border-border/50 bg-muted/30 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                placeholder="e.g. Building great products at the intersection of design and code"
                maxLength={120}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Bio</label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-border/50 bg-muted/30 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all resize-none"
                placeholder="Tell people what you're about..."
                maxLength={500}
              />
            </div>
            <Button type="submit" variant="signal" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </GlowCard>
      </motion.div>

      <motion.div variants={staggerItem}>
        <GlowCard className="p-6">
          <h2 className="text-base font-semibold text-foreground mb-1">Account</h2>
          <p className="text-xs text-muted-foreground mb-4">Manage your session</p>
          <Button variant="outline" onClick={handleSignOut} className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </GlowCard>
      </motion.div>
    </motion.div>
  )
}
