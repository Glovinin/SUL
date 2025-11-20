"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  List,
  UserCircle,
  CaretDown
} from '@phosphor-icons/react'
import { MobileMenu } from './MobileMenu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import GB from 'country-flag-icons/react/3x2/GB'
import PT from 'country-flag-icons/react/3x2/PT'
import FR from 'country-flag-icons/react/3x2/FR'
import ES from 'country-flag-icons/react/3x2/ES'

interface NavBarProps {
  /**
   * If true, the navbar will have transparent background on homepage hero section
   * and change to white on scroll. If false, it will always have white background.
   */
  isHomePage?: boolean
}

export function NavBar({ isHomePage = false }: NavBarProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentLang, setCurrentLang] = useState<'EN' | 'PT' | 'FR' | 'ES'>('EN')
  const [shouldAnimateLogo, setShouldAnimateLogo] = useState(false)
  
  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as 'EN' | 'PT' | 'FR' | 'ES' | null
    if (savedLang && ['EN', 'PT', 'FR', 'ES'].includes(savedLang)) {
      setCurrentLang(savedLang)
    }
  }, [])
  
  // Save language to localStorage when it changes
  const handleLanguageChange = (lang: 'EN' | 'PT' | 'FR' | 'ES') => {
    setCurrentLang(lang)
    localStorage.setItem('language', lang)
  }
  
  // Language configuration
  const languages = {
    EN: { flag: GB, name: 'English', code: 'EN' },
    PT: { flag: PT, name: 'Português', code: 'PT' },
    FR: { flag: FR, name: 'Français', code: 'FR' },
    ES: { flag: ES, name: 'Español', code: 'ES' },
  }
  
  const CurrentFlag = languages[currentLang].flag
  
  // Only animate logo on very first page load, not on navigation
  useEffect(() => {
    const hasAnimatedBefore = sessionStorage.getItem('sul_navbar_logo_animated')
    if (!hasAnimatedBefore) {
      setShouldAnimateLogo(true)
      sessionStorage.setItem('sul_navbar_logo_animated', 'true')
    }
  }, [])
  
  // Handle scroll detection
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  // Determine if we should use transparent styling (only on homepage when not scrolled)
  const useTransparentStyle = isHomePage && !isScrolled

  // Determine active link based on pathname
  const isActiveLink = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <motion.nav 
      initial={false}
      animate={{
        backgroundColor: useTransparentStyle 
          ? 'transparent' 
          : isScrolled 
            ? 'rgba(255, 255, 255, 0.85)' 
            : 'rgba(255, 255, 255, 0.98)',
        backdropFilter: useTransparentStyle 
          ? 'blur(0px)' 
          : 'blur(20px)',
        borderBottomColor: useTransparentStyle 
          ? 'transparent' 
          : 'rgba(0, 0, 0, 0.04)',
        boxShadow: useTransparentStyle 
          ? 'none' 
          : '0 1px 0 rgba(0, 0, 0, 0.02)'
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-[88px] md:h-[96px]">
          {/* Logo */}
          <Link href="/">
            <motion.div
              initial={shouldAnimateLogo ? { opacity: 0, y: -10 } : false}
              animate={shouldAnimateLogo ? { opacity: 1, y: 0 } : {}}
              transition={shouldAnimateLogo ? { duration: 0.5, ease: [0.22, 1, 0.36, 1] } : {}}
              className={`text-[28px] md:text-[32px] lg:text-[34px] font-semibold tracking-[-0.02em] transition-colors duration-300 ${
                useTransparentStyle 
                  ? 'text-white' 
                  : 'text-black hover:text-black/60'
              }`}
            >
              SUL
            </motion.div>
          </Link>

          {/* Desktop Navigation Links - Only visible on large screens (lg+) */}
          <div className="hidden lg:flex items-center gap-6 lg:gap-8">
            <Link 
              href="/" 
              className="relative group"
            >
              <span className={`text-[14px] font-medium tracking-[-0.01em] transition-all duration-300 ${
                useTransparentStyle
                  ? isActiveLink('/') 
                    ? 'text-white' 
                    : 'text-white/70 hover:text-white'
                  : isActiveLink('/')
                    ? 'text-black'
                    : 'text-black/60 hover:text-black'
              }`}>
                Home
              </span>
              {isActiveLink('/') && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute -bottom-1 left-0 right-0 h-[1.5px] ${
                    useTransparentStyle ? 'bg-white' : 'bg-black'
                  }`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
            <Link 
              href="/services" 
              className="relative group"
            >
              <span className={`text-[14px] font-medium tracking-[-0.01em] transition-all duration-300 ${
                useTransparentStyle
                  ? isActiveLink('/services')
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                  : isActiveLink('/services')
                    ? 'text-black'
                    : 'text-black/60 hover:text-black'
              }`}>
                Services
              </span>
              {isActiveLink('/services') && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute -bottom-1 left-0 right-0 h-[1.5px] ${
                    useTransparentStyle ? 'bg-white' : 'bg-black'
                  }`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
            <Link 
              href="/portugal" 
              className="relative group"
            >
              <span className={`text-[14px] font-medium tracking-[-0.01em] transition-all duration-300 ${
                useTransparentStyle
                  ? isActiveLink('/portugal')
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                  : isActiveLink('/portugal')
                    ? 'text-black'
                    : 'text-black/60 hover:text-black'
              }`}>
                About Portugal
              </span>
              {isActiveLink('/portugal') && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute -bottom-1 left-0 right-0 h-[1.5px] ${
                    useTransparentStyle ? 'bg-white' : 'bg-black'
                  }`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
            <Link 
              href="/about" 
              className="relative group"
            >
              <span className={`text-[14px] font-medium tracking-[-0.01em] transition-all duration-300 ${
                useTransparentStyle
                  ? isActiveLink('/about')
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                  : isActiveLink('/about')
                    ? 'text-black'
                    : 'text-black/60 hover:text-black'
              }`}>
                About Sul
              </span>
              {isActiveLink('/about') && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute -bottom-1 left-0 right-0 h-[1.5px] ${
                    useTransparentStyle ? 'bg-white' : 'bg-black'
                  }`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
            <Link 
              href="/portfolio" 
              className="relative group"
            >
              <span className={`text-[14px] font-medium tracking-[-0.01em] transition-all duration-300 ${
                useTransparentStyle
                  ? isActiveLink('/portfolio')
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                  : isActiveLink('/portfolio')
                    ? 'text-black'
                    : 'text-black/60 hover:text-black'
              }`}>
                Portfolio
              </span>
              {isActiveLink('/portfolio') && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute -bottom-1 left-0 right-0 h-[1.5px] ${
                    useTransparentStyle ? 'bg-white' : 'bg-black'
                  }`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
            <Link 
              href="/properties" 
              className="relative group"
            >
              <span className={`text-[14px] font-medium tracking-[-0.01em] transition-all duration-300 ${
                useTransparentStyle
                  ? isActiveLink('/properties')
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                  : isActiveLink('/properties')
                    ? 'text-black'
                    : 'text-black/60 hover:text-black'
              }`}>
                Properties
              </span>
              {isActiveLink('/properties') && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute -bottom-1 left-0 right-0 h-[1.5px] ${
                    useTransparentStyle ? 'bg-white' : 'bg-black'
                  }`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
            <Link 
              href="/blog" 
              className="relative group"
            >
              <span className={`text-[14px] font-medium tracking-[-0.01em] transition-all duration-300 ${
                useTransparentStyle
                  ? isActiveLink('/blog')
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                  : isActiveLink('/blog')
                    ? 'text-black'
                    : 'text-black/60 hover:text-black'
              }`}>
                Blog
              </span>
              {isActiveLink('/blog') && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute -bottom-1 left-0 right-0 h-[1.5px] ${
                    useTransparentStyle ? 'bg-white' : 'bg-black'
                  }`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          </div>

          {/* Right Side Actions - Visible on tablet (md) and desktop */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 ${
                    useTransparentStyle
                      ? 'text-white/70 hover:text-white hover:bg-white/5'
                      : 'text-black/60 hover:text-black hover:bg-black/5'
                  }`}
                >
                  <div className="w-5 h-5 rounded overflow-hidden flex-shrink-0">
                    <CurrentFlag className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[13px] font-normal tracking-[-0.01em]">
                    {currentLang}
                  </span>
                  <CaretDown 
                    className={`w-3 h-3 transition-transform duration-200 ${
                      useTransparentStyle ? 'text-white/60' : 'text-black/40'
                    }`} 
                    weight="regular" 
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[160px]">
                {(Object.keys(languages) as Array<'EN' | 'PT' | 'FR' | 'ES'>).map((langCode) => {
                  const LangFlag = languages[langCode].flag
                  const isSelected = currentLang === langCode
                  return (
                    <DropdownMenuItem
                      key={langCode}
                      onClick={() => handleLanguageChange(langCode)}
                      className={`flex items-center gap-3 cursor-pointer ${
                        isSelected ? 'bg-black/5' : ''
                      }`}
                    >
                      <div className="w-5 h-5 rounded overflow-hidden flex-shrink-0">
                        <LangFlag className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[14px] font-medium tracking-[-0.01em]">
                        {languages[langCode].name}
                      </span>
                      {isSelected && (
                        <span className="ml-auto text-[12px] text-black/40">
                          ✓
                        </span>
                      )}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Login Button */}
            <Link href="/login">
              <button 
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                  useTransparentStyle
                    ? 'text-white/70 hover:text-white hover:bg-white/5'
                    : 'text-black/60 hover:text-black hover:bg-black/5'
                }`}
              >
                <UserCircle className="w-4 h-4" weight="regular" />
              </button>
            </Link>
            
            {/* Contact Button */}
            <Link href="/contact">
              <button 
                className={`px-4 py-2 rounded-full text-[14px] font-medium tracking-[-0.01em] transition-all duration-200 ${
                  useTransparentStyle
                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30'
                    : 'bg-black hover:bg-black/90 text-white border border-black/10'
                }`}
              >
                Contact
              </button>
            </Link>
          </div>

          {/* Hamburger Menu Button - Visible on mobile and tablet (up to lg) */}
          <button 
            className={`lg:hidden transition-colors duration-200 ${
              useTransparentStyle
                ? 'text-white/70 hover:text-white'
                : 'text-black/60 hover:text-black'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <List size={20} weight="regular" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Full Screen Component */}
      <MobileMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        currentLang={currentLang}
        setCurrentLang={handleLanguageChange}
      />
    </motion.nav>
  )
}

