'use client'

import {usePathname} from 'next/navigation'
import Link from 'next/link'
import {Home, PlusCircle, LogOut, Folder} from 'lucide-react'
import {cn} from '@/lib/utils'
import {signOutServerFunction} from '@/serverFunctions/users' // Pas dit pad aan naar jouw users.ts
import {useTransition} from 'react'

export function Navigation() {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const navItems = [
    {href: '/memos', label: 'Home', icon: Home},
    {href: '/memos/new', label: 'Nieuwe Memo', icon: PlusCircle},
    {href: '/memos/editTagsAndFolders', label: 'map en tag beheer', icon: Folder},
  ] as const

  const handleLogout = () => {
    startTransition(async () => {
      await signOutServerFunction()
    })
  }

  return (
    <nav className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/memos" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">M</span>
            </div>
            <span className="font-semibold text-lg">Memo App</span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon
              const isActive =
                pathname === item.href || ((item.href as string) !== '/' && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
                  )}>
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              )
            })}

            {/* Logout knop */}
            <button
              onClick={handleLogout}
              disabled={isPending}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
                isPending ? 'opacity-50 cursor-not-allowed' : '',
              )}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Uitloggen</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
