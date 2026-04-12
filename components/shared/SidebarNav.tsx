'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useRef } from 'react'
import { Zap, LayoutDashboard, User, LogOut, Radio, TrendingUp, BookOpen, Briefcase } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/lib/stores/auth.store'
import { useSidebarReveal } from '@/lib/gsap/hooks'

const NAV_ITEMS = [
  { href: '/dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { href: '/signal',       label: 'My Signal',    icon: Radio },
  { href: '/trajectory',   label: 'Trajectory',   icon: TrendingUp },
  { href: '/learn',        label: 'Learn',        icon: BookOpen },
  { href: '/opportunities',label: 'Opportunities',icon: Briefcase },
  { href: '/profile',      label: 'Profile',      icon: User },
]

export function SidebarNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, partialProfile } = useAuthStore()
  const navRef = useRef<HTMLDivElement>(null)

  useSidebarReveal(navRef)

  function handleLogout() {
    logout()
    router.push('/login')
  }

  const displayName = partialProfile?.display_name
    || (partialProfile?.first_name ? `${partialProfile.first_name} ${partialProfile.last_name ?? ''}`.trim() : 'You')
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <aside className="w-[220px] flex-none flex flex-col border-r border-sidebar-border bg-sidebar min-h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-6 border-b border-sidebar-border">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-signal to-trajectory flex items-center justify-center shadow-lg shadow-signal/20 flex-none">
          <Zap className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="font-semibold text-sm tracking-tight text-foreground">Cosmico Signal</span>
      </div>

      {/* Nav items */}
      <nav ref={navRef} className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              data-sidebar-item
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all duration-150',
                active
                  ? 'bg-signal/10 text-signal-light font-medium border-l-2 border-signal pl-[10px]'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground border-l-2 border-transparent pl-[10px]'
              )}
            >
              <Icon className={cn('w-4 h-4 flex-none', active ? 'text-signal' : '')} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User badge + logout */}
      <div className="px-3 py-4 border-t border-sidebar-border space-y-1">
        <div data-sidebar-item className="flex items-center gap-2.5 px-3 py-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-signal/30 to-trajectory/20 border border-signal/30 flex items-center justify-center flex-none">
            <span className="text-xs font-bold text-signal-light">{initials}</span>
          </div>
          <span className="text-xs text-foreground font-medium truncate">{displayName}</span>
        </div>
        <button
          data-sidebar-item
          onClick={handleLogout}
          className="flex items-center gap-2.5 w-full rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-150 border-l-2 border-transparent pl-[10px]"
        >
          <LogOut className="w-4 h-4 flex-none" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
