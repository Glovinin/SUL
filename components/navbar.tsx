"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  List,
  CaretDown,
  UserCircle
} from '@phosphor-icons/react'
import { MobileMenu } from './MobileMenu'

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
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('EN')
  const [shouldAnimateLogo, setShouldAnimateLogo] = useState(false)
  
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
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isLangOpen && !target.closest('.language-dropdown')) {
        setIsLangOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isLangOpen])

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
        <div className="flex items-center justify-between h-[56px] md:h-[64px]">
          {/* Logo */}
          <Link href="/">
            <motion.div
              initial={shouldAnimateLogo ? { opacity: 0, y: -10 } : false}
              animate={shouldAnimateLogo ? { opacity: 1, y: 0 } : {}}
              transition={shouldAnimateLogo ? { duration: 0.5, ease: [0.22, 1, 0.36, 1] } : {}}
              className={`text-[24px] md:text-[28px] font-semibold tracking-[-0.02em] transition-colors duration-300 ${
                useTransparentStyle 
                  ? 'text-white' 
                  : 'text-black hover:text-black/60'
              }`}
            >
              SUL
            </motion.div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
            <Link 
              href="/" 
              className="relative group"
            >
              <span className={`text-[14px] md:text-[15px] font-normal tracking-[-0.01em] transition-all duration-300 ${
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
              <span className={`text-[14px] md:text-[15px] font-normal tracking-[-0.01em] transition-all duration-300 ${
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
              <span className={`text-[14px] md:text-[15px] font-normal tracking-[-0.01em] transition-all duration-300 ${
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
              <span className={`text-[14px] md:text-[15px] font-normal tracking-[-0.01em] transition-all duration-300 ${
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
              <span className={`text-[14px] md:text-[15px] font-normal tracking-[-0.01em] transition-all duration-300 ${
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
              <span className={`text-[14px] md:text-[15px] font-normal tracking-[-0.01em] transition-all duration-300 ${
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
              <span className={`text-[14px] md:text-[15px] font-normal tracking-[-0.01em] transition-all duration-300 ${
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

          {/* Desktop Right Side Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Switcher Dropdown */}
            <div className="relative language-dropdown">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-normal tracking-[-0.01em] transition-all duration-200 flex items-center gap-1.5 ${
                  useTransparentStyle
                    ? 'text-white/70 hover:text-white hover:bg-white/5'
                    : 'text-black/60 hover:text-black hover:bg-black/5'
                }`}
              >
                {currentLang}
                <CaretDown className={`w-3 h-3 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} weight="regular" />
              </button>
              
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className={`absolute top-full mt-1.5 right-0 w-28 rounded-xl shadow-lg overflow-hidden ${
                      useTransparentStyle
                        ? 'bg-black/95 backdrop-blur-xl border border-white/10'
                        : 'bg-white border border-black/5'
                    }`}
                  >
                    <button
                      onClick={() => { setCurrentLang('EN'); setIsLangOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-[12px] font-normal transition-all duration-200 ${
                        currentLang === 'EN' 
                          ? useTransparentStyle
                            ? 'bg-white/10 text-white'
                            : 'bg-black/5 text-black'
                          : useTransparentStyle
                            ? 'text-white/60 hover:bg-white/10'
                            : 'text-black/60 hover:bg-black/5'
                      }`}
                    >
                      🇬🇧 English
                    </button>
                    <button
                      onClick={() => { setCurrentLang('FR'); setIsLangOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-[12px] font-normal transition-all duration-200 ${
                        currentLang === 'FR' 
                          ? useTransparentStyle
                            ? 'bg-white/10 text-white'
                            : 'bg-black/5 text-black'
                          : useTransparentStyle
                            ? 'text-white/60 hover:bg-white/10'
                            : 'text-black/60 hover:bg-black/5'
                      }`}
                    >
                      🇫🇷 Français
                    </button>
                    <button
                      onClick={() => { setCurrentLang('PT'); setIsLangOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-[12px] font-normal transition-all duration-200 ${
                        currentLang === 'PT' 
                          ? useTransparentStyle
                            ? 'bg-white/10 text-white'
                            : 'bg-black/5 text-black'
                          : useTransparentStyle
                            ? 'text-white/60 hover:bg-white/10'
                            : 'text-black/60 hover:bg-black/5'
                      }`}
                    >
                      🇵🇹 Português
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
            
            {/* Get In Touch Button */}
            <Link href="/contact">
              {useTransparentStyle ? (
                <Button 
                  variant="ghost"
                  className="bg-white/10 backdrop-blur-md text-white hover:bg-white/15 border-0 hover:border-0 focus:border-0 focus-visible:border-0 active:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none px-5 py-2 rounded-full text-[13px] font-normal tracking-[-0.01em] transition-all duration-200"
                  style={{ outline: 'none' }}
                >
                  Contact Us
                </Button>
              ) : (
                <Button 
                  variant="ghost"
                  className="bg-black text-white hover:bg-black/90 border-0 hover:border-0 focus:border-0 focus-visible:border-0 active:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none px-5 py-2 rounded-full text-[13px] font-normal tracking-[-0.01em] transition-all duration-200 shadow-sm hover:shadow-md"
                  style={{ border: 'none', outline: 'none' }}
                >
                  Contact Us
                </Button>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden transition-colors duration-200 ${
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
        setCurrentLang={setCurrentLang}
      />
    </motion.nav>
  )
}

