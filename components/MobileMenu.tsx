"use client"

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, UserCircle } from '@phosphor-icons/react'
import GB from 'country-flag-icons/react/3x2/GB'
import PT from 'country-flag-icons/react/3x2/PT'
import FR from 'country-flag-icons/react/3x2/FR'
import ES from 'country-flag-icons/react/3x2/ES'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  currentLang: 'EN' | 'PT' | 'FR' | 'ES'
  setCurrentLang: (lang: 'EN' | 'PT' | 'FR' | 'ES') => void
}

export function MobileMenu({ isOpen, onClose, currentLang, setCurrentLang }: MobileMenuProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [isOpen])

  const isActiveLink = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    }
  }

  const itemVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2
      }
    },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    })
  }

  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/portugal', label: 'About Portugal' },
    { href: '/about', label: 'About' },
    { href: '/properties', label: 'Collection' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Blog' }
  ]

  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-0 z-[9999] bg-white md:hidden"
        >
          {/* Header with Close Button */}
          <div className="fixed top-0 left-0 right-0 bg-white border-b border-black/5 z-10">
            <div className="flex items-center justify-between h-[56px] px-6">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="text-[24px] font-semibold tracking-[-0.02em] text-black"
              >
                SUL
              </motion.div>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center text-black/60 hover:text-black hover:bg-black/5 transition-all duration-200"
                aria-label="Close menu"
              >
                <X size={20} weight="regular" />
              </motion.button>
            </div>
          </div>

          {/* Menu Content */}
          <div className="h-full overflow-y-auto pt-[56px]">
            <div className="min-h-[calc(100vh-56px)] flex flex-col px-6 py-10">
              {/* Navigation Links */}
              <nav className="flex-1 space-y-1">
                {navigationLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    custom={index}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={itemVariants}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`block text-[28px] md:text-[32px] font-medium tracking-[-0.02em] py-3 transition-colors duration-200 ${
                        isActiveLink(link.href)
                          ? 'text-black'
                          : 'text-black/40 hover:text-black/70'
                      }`}
                    >
                      {link.label}
                      {isActiveLink(link.href) && (
                        <motion.div
                          layoutId="mobilActiveIndicator"
                          className="w-6 h-[2px] bg-black mt-1"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Language Switcher */}
              <motion.div
                custom={navigationLinks.length}
                initial="closed"
                animate="open"
                exit="closed"
                variants={itemVariants}
                className="pt-6 mt-6 border-t border-black/5"
              >
                <div className="text-[11px] font-medium mb-3 text-black/40 tracking-[-0.01em] uppercase">
                  Language
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setCurrentLang('EN')}
                    className={`flex items-center justify-center gap-2 text-[14px] font-medium tracking-[-0.01em] transition-all duration-200 py-3 px-4 rounded-full ${
                      currentLang === 'EN'
                        ? 'bg-black text-white'
                        : 'bg-black/5 text-black/60 hover:bg-black/10'
                    }`}
                  >
                    <div className="w-5 h-5 rounded overflow-hidden flex-shrink-0">
                      <GB className="w-full h-full object-cover" />
                    </div>
                    <span>EN</span>
                  </button>
                  <button
                    onClick={() => setCurrentLang('PT')}
                    className={`flex items-center justify-center gap-2 text-[14px] font-medium tracking-[-0.01em] transition-all duration-200 py-3 px-4 rounded-full ${
                      currentLang === 'PT'
                        ? 'bg-black text-white'
                        : 'bg-black/5 text-black/60 hover:bg-black/10'
                    }`}
                  >
                    <div className="w-5 h-5 rounded overflow-hidden flex-shrink-0">
                      <PT className="w-full h-full object-cover" />
                    </div>
                    <span>PT</span>
                  </button>
                  <button
                    onClick={() => setCurrentLang('FR')}
                    className={`flex items-center justify-center gap-2 text-[14px] font-medium tracking-[-0.01em] transition-all duration-200 py-3 px-4 rounded-full ${
                      currentLang === 'FR'
                        ? 'bg-black text-white'
                        : 'bg-black/5 text-black/60 hover:bg-black/10'
                    }`}
                  >
                    <div className="w-5 h-5 rounded overflow-hidden flex-shrink-0">
                      <FR className="w-full h-full object-cover" />
                    </div>
                    <span>FR</span>
                  </button>
                  <button
                    onClick={() => setCurrentLang('ES')}
                    className={`flex items-center justify-center gap-2 text-[14px] font-medium tracking-[-0.01em] transition-all duration-200 py-3 px-4 rounded-full ${
                      currentLang === 'ES'
                        ? 'bg-black text-white'
                        : 'bg-black/5 text-black/60 hover:bg-black/10'
                    }`}
                  >
                    <div className="w-5 h-5 rounded overflow-hidden flex-shrink-0">
                      <ES className="w-full h-full object-cover" />
                    </div>
                    <span>ES</span>
                  </button>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                custom={navigationLinks.length + 1}
                initial="closed"
                animate="open"
                exit="closed"
                variants={itemVariants}
                className="pt-6 space-y-3"
              >
                <Link href="/login" onClick={onClose} className="block">
                  <Button
                    variant="ghost"
                    className="w-full bg-black/5 text-black hover:bg-black/10 border-0 hover:border-0 focus:border-0 focus-visible:border-0 active:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none px-6 py-4 rounded-full text-[15px] font-medium tracking-[-0.01em] transition-all duration-200 flex items-center justify-center gap-2"
                    style={{ border: 'none', outline: 'none' }}
                  >
                    <UserCircle className="w-5 h-5" weight="regular" />
                    Sign In
                  </Button>
                </Link>
                <Link href="/contact" onClick={onClose} className="block">
                  <Button
                    variant="ghost"
                    className="w-full bg-black text-white hover:bg-black/90 border-0 hover:border-0 focus:border-0 focus-visible:border-0 active:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none px-6 py-4 rounded-full text-[15px] font-medium tracking-[-0.01em] transition-all duration-200 shadow-sm"
                    style={{ border: 'none', outline: 'none' }}
                  >
                    Get In Touch
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  if (!mounted) return null

  return createPortal(menuContent, document.body)
}

