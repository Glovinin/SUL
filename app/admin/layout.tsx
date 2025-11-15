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
  House
} from '@phosphor-icons/react'
import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Allow access to register page without authentication
    if (pathname === '/admin/register') {
      return
    }

    const unsubscribe = auth?.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
      }
    })

    return () => unsubscribe?.()
  }, [router, pathname])

  const handleLogout = async () => {
    try {
      await signOut(auth!)
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-black/10 z-40 hidden md:block">
        <div className="p-6 border-b border-black/10">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
              <span className="text-white text-sm font-semibold">SUL</span>
            </div>
            <span className="text-lg font-semibold text-black">Admin</span>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-black text-white'
                    : 'text-black/60 hover:bg-black/5 hover:text-black'
                }`}
              >
                <Icon className="w-5 h-5" weight={item.active ? 'fill' : 'regular'} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-black/10">
          <div className="px-4 py-2 mb-2">
            <p className="text-xs text-black/40 mb-1">Signed in as</p>
            <p className="text-sm font-medium text-black truncate">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-black/60 hover:bg-black/5 hover:text-black transition-colors"
          >
            <SignOut className="w-5 h-5" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="fixed left-0 top-0 h-full w-64 bg-white z-50">
            <div className="p-6 border-b border-black/10 flex items-center justify-between">
              <Link href="/admin" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">SUL</span>
                </div>
                <span className="text-lg font-semibold text-black">Admin</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-black/60 hover:text-black"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="p-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      item.active
                        ? 'bg-black text-white'
                        : 'text-black/60 hover:bg-black/5 hover:text-black'
                    }`}
                  >
                    <Icon className="w-5 h-5" weight={item.active ? 'fill' : 'regular'} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-black/10">
              <div className="px-4 py-2 mb-2">
                <p className="text-xs text-black/40 mb-1">Signed in as</p>
                <p className="text-sm font-medium text-black truncate">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-black/60 hover:bg-black/5 hover:text-black transition-colors"
              >
                <SignOut className="w-5 h-5" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="md:ml-64">
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
    </div>
  )
}

