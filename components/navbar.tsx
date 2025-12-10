"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  List,
  CaretDown,
  InstagramLogo,
  WhatsappLogo,
  LinkedinLogo
} from '@phosphor-icons/react'
import { MobileMenu } from './MobileMenu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useLoading } from '@/contexts/loading-context'

export function NavBar() {
  const pathname = usePathname()

  // Do not render navbar on admin/dashboard pages
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard')) {
    return null
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // State for the dynamic theme detection
  // 'dark' background means we need 'light' text (White)
  // 'light' background means we need 'dark' text (Black)
  const [isDarkBg, setIsDarkBg] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)

  const [currentLang, setCurrentLang] = useState<'EN' | 'PT' | 'FR'>('EN')
  const [shouldAnimateLogo, setShouldAnimateLogo] = useState(false)

  // Initial setup per page type
  useEffect(() => {
    // Pages with dark hero sections
    const pagesWithDarkHero = [
      '/',
      '/services',
      '/portugal',
      '/about',
      '/portfolio',
      '/properties',
      '/blog',
      '/contact',
      '/find-property'
    ]

    const hasDarkHero = pagesWithDarkHero.some(path => {
      if (path === '/') return pathname === '/'
      return pathname?.startsWith(path)
    })

    // Determine initial state: pages with hero sections start Dark, others Light
    setIsDarkBg(hasDarkHero)
  }, [pathname])

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as 'EN' | 'PT' | 'FR' | null
    if (savedLang && ['EN', 'PT', 'FR'].includes(savedLang)) {
      setCurrentLang(savedLang)
    }
  }, [])

  // Save language to localStorage when it changes
  const handleLanguageChange = (lang: 'EN' | 'PT' | 'FR') => {
    setCurrentLang(lang)
    localStorage.setItem('language', lang)
  }

  // Language configuration
  const languages = {
    EN: { name: 'English', code: 'EN' },
    PT: { name: 'Português', code: 'PT' },
    FR: { name: 'Français', code: 'FR' },
  }

  // Logo Animation
  useEffect(() => {
    const hasAnimatedBefore = sessionStorage.getItem('sul_navbar_logo_animated')
    if (!hasAnimatedBefore) {
      setShouldAnimateLogo(true)
      sessionStorage.setItem('sul_navbar_logo_animated', 'true')
    }
  }, [])

  // ---------------------------------------------------------------------------
  // DYNAMIC BACKGROUND & SCROLL DETECTION
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScrollAndDetection = () => {
      // 1. Scroll Detection
      const scrollY = window.scrollY
      const isTop = scrollY < 50
      setIsScrolled(!isTop)

      // 2. Dynamic Background Detection
      // Sample a point in the middle of the navbar
      const x = window.innerWidth / 2
      const y = 50

      const elements = document.elementsFromPoint(x, y)

      let foundColor = false
      for (const el of elements) {
        if (el.tagName === 'NAV' || el.closest('nav')) continue

        const style = window.getComputedStyle(el)
        const bgColor = style.backgroundColor
        const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)

        if (match) {
          const r = parseInt(match[1])
          const g = parseInt(match[2])
          const b = parseInt(match[3])
          const alpha = match[4] ? parseFloat(match[4]) : 1

          if (alpha > 0.1) {
            const brightness = (r * 299 + g * 587 + b * 114) / 1000
            setIsDarkBg(brightness < 128)
            foundColor = true
            return
          }
        }
      }

      // If we couldn't determine color (e.g. white body), default based on expectation
      if (!foundColor) {
        setIsDarkBg(false)
      }
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScrollAndDetection()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    // Initial Check
    setTimeout(handleScrollAndDetection, 100)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  // Computed visual states
  const isHomePage = pathname === '/'

  // Pages with hero sections that should have transparent navbar at top
  const pagesWithHero = [
    '/',
    '/services',
    '/portugal',
    '/about',
    '/portfolio',
    '/properties',
    '/blog',
    '/contact',
    '/find-property'
  ]

  const hasHeroSection = pagesWithHero.some(path => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  })

  // Special Rule: If page has hero section AND Not Scrolled -> Force Transparent
  const isHeroSection = hasHeroSection && !isScrolled

  // Text Color:
  // If Hero Section -> Force White (Dark detection usually handles this, but forcing ensures reliability on load)
  // Else -> Use Dynamic Detection
  const isLightModeText = isHeroSection ? true : isDarkBg

  // Navbar Background:
  // If Hero Section -> Transparent (No Blur, No Border)
  // Else -> Adaptive Glass (Tinted + Blur)
  const navbarBgStyle = isHeroSection
    ? 'transparent'
    : isDarkBg
      ? 'rgba(0, 0, 0, 0.2)'
      : 'rgba(255, 255, 255, 0.8)'

  const navbarBlur = isHeroSection ? 'blur(0px)' : (isDarkBg ? 'blur(10px)' : 'blur(20px)')
  const navbarBorder = isHeroSection ? 'transparent' : (isDarkBg ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)')

  // Determine active link based on pathname
  const isActiveLink = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  // Styles
  const linkStyles = `text-[16px] font-medium tracking-[-0.01em] transition-all duration-200 ${isLightModeText
    ? 'text-white/80 hover:text-white'
    : 'text-black/60 hover:text-black'
    }`

  const activeLinkStyles = `text-[16px] font-medium tracking-[-0.01em] transition-all duration-200 ${isLightModeText ? 'text-white' : 'text-black'
    }`

  const iconStyles = `w-5 h-5 transition-colors duration-200 ${isLightModeText ? 'text-white/80 hover:text-white' : 'text-black/60 hover:text-black'
    }`

  const logoStyles = `text-[40px] md:text-[40px] font-semibold tracking-[-0.03em] transition-colors duration-200 ${isLightModeText ? 'text-white' : 'text-black hover:text-black/70'
    }`

  const [isVisible, setIsVisible] = useState(false)
  const { isInitialLoading } = useLoading()

  useEffect(() => {
    if (!isInitialLoading) {
      setIsVisible(true)
      return
    }
    const handlePageAppear = () => { setIsVisible(true) }
    window.addEventListener('page-can-appear', handlePageAppear)
    return () => window.removeEventListener('page-can-appear', handlePageAppear)
  }, [isInitialLoading])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -20,
        backgroundColor: navbarBgStyle,
        backdropFilter: navbarBlur,
        borderBottomColor: navbarBorder,
      }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] border-b transition-colors duration-200 from-transparent"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-[90px] md:h-[100px]">
          {/* Logo */}
          <Link href="/">
            <motion.div
              initial={shouldAnimateLogo ? { opacity: 0, y: -10 } : false}
              animate={shouldAnimateLogo ? { opacity: 1, y: 0 } : {}}
              transition={shouldAnimateLogo ? { duration: 0.5, ease: [0.22, 1, 0.36, 1] } : {}}
              className={logoStyles}
            >
              SUL
            </motion.div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-10">
            {['Home', 'Services', 'About Portugal', 'About Sul', 'Portfolio', 'Properties', 'Blog'].map((item) => {
              const path = item === 'Home' ? '/'
                : item === 'About Portugal' ? '/portugal'
                  : item === 'About Sul' ? '/about'
                    : `/${item.toLowerCase()}`

              const active = isActiveLink(path)

              return (
                <Link key={item} href={path} className="relative group">
                  <span className={active ? activeLinkStyles : linkStyles}>
                    {item === 'About Sul' ? 'About' : item}
                  </span>
                  {active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isLightModeText ? 'bg-white' : 'bg-black'
                        }`}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-6">
            <div className={`flex items-center gap-4 border-r pr-6 transition-colors duration-200 ${isLightModeText ? 'border-white/20' : 'border-black/10'
              }`}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <InstagramLogo className={iconStyles} weight="regular" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <LinkedinLogo className={iconStyles} weight="regular" />
              </a>
              <a href="https://wa.me/33662527879" target="_blank" rel="noopener noreferrer">
                <WhatsappLogo className={iconStyles} weight="regular" />
              </a>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-1 transition-colors duration-200 ${isLightModeText ? 'text-white/90 hover:text-white' : 'text-black/70 hover:text-black'
                    }`}
                >
                  <span className="text-[14px] font-medium tracking-[-0.01em]">
                    {currentLang}
                  </span>
                  <CaretDown className={`w-2.5 h-2.5 opacity-60 ml-0.5 ${isLightModeText ? 'text-white' : 'text-black'}`} weight="bold" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[120px] bg-white/95 backdrop-blur-md border border-black/10 shadow-lg rounded-xl p-1.5 z-[9999]">
                {(Object.keys(languages) as Array<'EN' | 'PT' | 'FR'>).map((langCode) => {
                  const isSelected = currentLang === langCode
                  return (
                    <DropdownMenuItem
                      key={langCode}
                      onClick={() => handleLanguageChange(langCode)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-[13px] font-medium transition-all duration-200 ${isSelected ? 'bg-black/10 text-black' : 'text-black/60 hover:text-black hover:bg-black/5'
                        }`}
                    >
                      {langCode}
                      {isSelected && <span className="text-[10px]">●</span>}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/contact" className={linkStyles}>Contact</Link>
          </div>

          <button
            className={`lg:hidden transition-colors duration-200 ${isLightModeText ? 'text-white hover:text-white/80' : 'text-black hover:text-black/70'
              }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <List size={24} weight="light" />
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        currentLang={currentLang}
        setCurrentLang={handleLanguageChange}
      />
    </motion.nav>
  )
}
