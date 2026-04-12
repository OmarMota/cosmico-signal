'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import {
  LayoutDashboard,
  TrendingUp,
  BookOpen,
  Briefcase,
  Settings,
  Zap,
  LogOut,
} from 'lucide-react'
import { useAuthStore } from '@/lib/stores/auth.store'
import { useRouter } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/dashboard',     label: 'Dashboard',     icon: LayoutDashboard },
  { href: '/profile',       label: 'My Signal',     icon: Zap },
  { href: '/trajectory',    label: 'Trajectory',    icon: TrendingUp },
  { href: '/learn',         label: 'Learn',         icon: BookOpen },
  { href: '/opportunities', label: 'Opportunities', icon: Briefcase },
]

export function SidebarNav() {
  const pathname  = usePathname()
  const router    = useRouter()
  const { logout, userMode } = useAuthStore()

  function handleLogout() {
    logout()
    router.push('/login')
  }

  return (
    /* Not fixed — takes up its own column in the flex parent */
    <aside className="w-60 flex-none h-full flex flex-col border-r border-border bg-background overflow-y-auto">

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-border flex-none">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-sm tracking-tight text-foreground">Cosmico Signal</span>
      </div>

      {/* User badge */}
      {userMode && (
        <div className="px-4 py-3 border-b border-border flex-none">
          <div className="flex items-center gap-2 px-2">
            <div className="w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center flex-none">
              <span className="text-xs text-violet-300 font-medium">
                {userMode === 'alex' ? 'A' : '?'}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                {userMode === 'alex' ? 'Alex Chen' : 'New Profile'}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {userMode === 'alex' ? 'Sr. Frontend Eng.' : 'Setting up…'}
              </p>
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
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-violet-500/15 text-violet-300 shadow-sm'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <item.icon className={cn('w-4 h-4 flex-none', active ? 'text-violet-400' : '')} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-border flex-none space-y-0.5">
        <Link
          href="/settings"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
            pathname === '/settings'
              ? 'bg-violet-500/15 text-violet-300'
              : 'text-muted-foreground hover:bg-accent hover:text-foreground'
          )}
        >
          <Settings className="w-4 h-4 flex-none" />
          Settings
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all"
        >
          <LogOut className="w-4 h-4 flex-none" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
