"use client"

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { 
  Layout, 
  ChartLine, 
  Buildings, 
  Article, 
  SignOut,
  X,
  List,
  House,
  Clock,
  Briefcase,
  ChatCircle
} from '@phosphor-icons/react'
import Link from 'next/link'
import { Toaster } from 'sonner'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Atualizar relógio a cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Allow access to register page without authentication
    if (pathname === '/admin/register') {
      return
    }

    if (!auth) {
      // If auth is not initialized, wait a bit and try again
      const timer = setTimeout(() => {
        if (!auth) {
          router.push('/login')
        }
      }, 1000)
      return () => clearTimeout(timer)
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
      }
    })

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [router, pathname])

  const handleLogout = async () => {
    try {
      if (!auth) {
        router.push('/login')
        return
      }
      await signOut(auth)
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
      router.push('/login')
    }
  }

  const menuItems = [
    {
      icon: ChartLine,
      label: 'Dashboard',
      href: '/admin',
      active: pathname === '/admin',
    },
    {
      icon: Buildings,
      label: 'Properties',
      href: '/admin/properties',
      active: pathname?.startsWith('/admin/properties'),
    },
    {
      icon: Briefcase,
      label: 'Portfolio',
      href: '/admin/portfolio',
      active: pathname?.startsWith('/admin/portfolio'),
    },
    {
      icon: Article,
      label: 'Blog',
      href: '/admin/blog',
      active: pathname?.startsWith('/admin/blog'),
    },
    {
      icon: House,
      label: 'Homepage',
      href: '/admin/homepage',
      active: pathname?.startsWith('/admin/homepage'),
    },
    {
      icon: ChatCircle,
      label: 'Chat',
      href: '/admin/chat',
      active: pathname?.startsWith('/admin/chat'),
    },
  ]

  // Allow register page without authentication
  if (pathname === '/admin/register') {
    return <>{children}</>
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black/60">Loading...</p>
        </div>
      </div>
    )
  }

  // Formatar data e hora
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-white to-gray-50/50 border-r border-black/[0.06] z-40 hidden md:flex flex-col shadow-sm">
        {/* Logo Section */}
        <div className="p-6 border-b border-black/[0.06]">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-black to-black/90 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200">
              <span className="text-white text-sm font-bold tracking-tight">SUL</span>
            </div>
            <div>
              <span className="text-lg font-semibold text-black tracking-tight">Admin</span>
              <p className="text-xs text-black/40 mt-0.5">Dashboard</p>
            </div>
          </Link>
        </div>

        {/* Clock Section */}
        <div className="px-6 py-5 border-b border-black/[0.06] bg-gradient-to-br from-black/5 to-transparent">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-black/5 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-black/60" weight="duotone" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-2xl font-semibold text-black tracking-tight mb-1 font-mono">
                {formatTime(currentTime)}
              </div>
              <div className="text-xs text-black/50 leading-relaxed capitalize">
                {formatDate(currentTime)}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  item.active
                    ? 'bg-black text-white shadow-md shadow-black/10'
                    : 'text-black/60 hover:bg-black/5 hover:text-black'
                }`}
              >
                <Icon 
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                    item.active ? '' : 'group-hover:scale-110'
                  }`} 
                  weight={item.active ? 'fill' : 'regular'} 
                />
                <span className={`text-sm font-medium tracking-tight ${
                  item.active ? 'font-semibold' : ''
                }`}>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* ArcadeSoft Card */}
        <div className="p-4 border-t border-black/[0.06]">
          <div className="px-4 py-4 rounded-xl bg-gradient-to-br from-black/5 to-black/10 border border-black/10 hover:border-black/20 transition-all duration-200 group">
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-black mb-1">ArcadeSoft</h3>
              <p className="text-xs text-black/60 leading-relaxed mb-3">
                Fullstack software & mobile apps agency
              </p>
              <p className="text-xs text-black/50 italic">
                Developed with <span className="text-red-500">♥</span> by ArcadeSoft
              </p>
            </div>
            <a
              href="https://arcadesoft.webflow.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-black/90 transition-all duration-200 group-hover:shadow-md"
            >
              <span>Visit Website</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* User Section */}
        <div className="p-4 border-t border-black/[0.06] bg-white/50 backdrop-blur-sm">
          <div className="px-3 py-3 mb-2 rounded-xl bg-black/5">
            <p className="text-xs text-black/40 mb-1 font-medium">Signed in as</p>
            <p className="text-sm font-semibold text-black truncate">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-black/60 hover:bg-black/5 hover:text-black transition-all duration-200 group"
          >
            <SignOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-white to-gray-50/50 z-50 flex flex-col shadow-xl">
            <div className="p-6 border-b border-black/[0.06] flex items-center justify-between">
              <Link href="/admin" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-black to-black/90 flex items-center justify-center shadow-sm">
                  <span className="text-white text-sm font-bold tracking-tight">SUL</span>
                </div>
                <div>
                  <span className="text-lg font-semibold text-black tracking-tight">Admin</span>
                  <p className="text-xs text-black/40 mt-0.5">Dashboard</p>
                </div>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-black/60 hover:text-black p-2 rounded-lg hover:bg-black/5 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Clock Section Mobile */}
            <div className="px-6 py-5 border-b border-black/[0.06] bg-gradient-to-br from-black/5 to-transparent">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-black/5 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-black/60" weight="duotone" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-2xl font-semibold text-black tracking-tight mb-1 font-mono">
                    {formatTime(currentTime)}
                  </div>
                  <div className="text-xs text-black/50 leading-relaxed capitalize">
                    {formatDate(currentTime)}
                  </div>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      item.active
                        ? 'bg-black text-white shadow-md shadow-black/10'
                        : 'text-black/60 hover:bg-black/5 hover:text-black'
                    }`}
                  >
                    <Icon 
                      className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                        item.active ? '' : 'group-hover:scale-110'
                      }`} 
                      weight={item.active ? 'fill' : 'regular'} 
                    />
                    <span className={`text-sm font-medium tracking-tight ${
                      item.active ? 'font-semibold' : ''
                    }`}>{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* ArcadeSoft Card Mobile */}
            <div className="p-4 border-t border-black/[0.06]">
              <div className="px-4 py-4 rounded-xl bg-gradient-to-br from-black/5 to-black/10 border border-black/10 hover:border-black/20 transition-all duration-200 group">
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-black mb-1">ArcadeSoft</h3>
                  <p className="text-xs text-black/60 leading-relaxed mb-3">
                    Fullstack software & mobile apps agency
                  </p>
                  <p className="text-xs text-black/50 italic">
                    Developed with <span className="text-red-500">♥</span> by ArcadeSoft
                  </p>
                </div>
                <a
                  href="https://arcadesoft.webflow.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-black/90 transition-all duration-200 group-hover:shadow-md"
                >
                  <span>Visit Website</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="p-4 border-t border-black/[0.06] bg-white/50 backdrop-blur-sm">
              <div className="px-3 py-3 mb-2 rounded-xl bg-black/5">
                <p className="text-xs text-black/40 mb-1 font-medium">Signed in as</p>
                <p className="text-sm font-semibold text-black truncate">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-black/60 hover:bg-black/5 hover:text-black transition-all duration-200 group"
              >
                <SignOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="md:ml-72">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-black/10">
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-black/60 hover:text-black"
            >
              <List className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="text-sm text-black/60 hover:text-black transition-colors"
              >
                View Site →
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
      <Toaster 
        position="top-right"
        richColors
        closeButton
        duration={4000}
      />
    </div>
  )
}

