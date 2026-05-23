'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import {
  LayoutDashboard,
  TrendingUp,
  BookOpen,
  Briefcase,
  Settings,
  Zap,
  LogOut,
  Sun,
  Moon,
} from 'lucide-react'
import { useAuthStore } from '@/lib/stores/auth.store'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'

const NAV_ITEMS = [
  { href: '/dashboard',     label: 'Dashboard',     icon: LayoutDashboard },
  { href: '/profile',       label: 'My Signal',     icon: Zap },
  { href: '/trajectory',    label: 'Trajectory',    icon: TrendingUp },
  { href: '/learn',         label: 'Learn',         icon: BookOpen },
  { href: '/opportunities', label: 'Opportunities', icon: Briefcase },
]

export function SidebarNav() {
  const pathname = usePathname()
  const router   = useRouter()
  const { logout, userMode, partialProfile } = useAuthStore()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const displayName = partialProfile?.display_name
    ?? (partialProfile?.first_name ? `${partialProfile.first_name} ${partialProfile.last_name ?? ''}`.trim() : null)
    ?? (userMode === 'alex' ? 'Alex Chen' : 'New Profile')

  const displayTitle = partialProfile?.job_title
    ?? (userMode === 'alex' ? 'Sr. Frontend Eng.' : 'Setting up…')

  const initials = displayName
    .split(' ')
    .slice(0, 2)
    .map((n: string) => n[0] ?? '')
    .join('')
    .toUpperCase() || '?'

  function handleLogout() {
    logout()
    router.push('/login')
  }

  function toggleTheme() {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <aside className="w-60 flex-none h-full flex flex-col border-r border-border bg-sidebar overflow-y-auto">

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border flex-none">
        <div className="w-7 h-7 rounded-none bg-foreground flex items-center justify-center">
          <Zap className="w-3.5 h-3.5 text-background" />
        </div>
        <span className="font-semibold text-sm tracking-tight text-foreground">Cosmico Signal</span>
      </div>

      {/* User badge */}
      {userMode && (
        <div className="px-4 py-3 border-b border-border flex-none">
          <div className="flex items-center gap-2.5 px-1">
            <div className="w-7 h-7 rounded-full bg-primary/10 border border-border flex items-center justify-center flex-none">
              <span className="text-xs text-primary font-semibold">{initials}</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground truncate">{displayName}</p>
              <p className="text-[11px] text-muted-foreground truncate">{displayTitle}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-none text-sm font-medium transition-all',
                active
                  ? 'bg-foreground/8 text-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <item.icon className={cn('w-4 h-4 flex-none', active ? 'text-foreground' : 'text-muted-foreground')} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-border flex-none space-y-0.5">
        {/* Settings */}
        <Link
          href="/settings"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-none text-sm font-medium transition-all',
            pathname === '/settings'
              ? 'bg-foreground/8 text-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-foreground'
          )}
        >
          <Settings className="w-4 h-4 flex-none" />
          Settings
        </Link>

        {/* Theme toggle — only render icon after mount to avoid hydration mismatch */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-none text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all"
        >
          {mounted && resolvedTheme === 'dark' ? (
            <Sun className="w-4 h-4 flex-none" />
          ) : (
            <Moon className="w-4 h-4 flex-none" />
          )}
          {mounted ? (resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode') : 'Toggle theme'}
        </button>

        {/* Sign out */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-none text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all"
        >
          <LogOut className="w-4 h-4 flex-none" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
