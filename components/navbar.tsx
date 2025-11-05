"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  List,
  X,
  CaretDown,
  UserCircle
} from '@phosphor-icons/react'

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
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`text-[20px] md:text-[22px] font-semibold tracking-[-0.02em] transition-colors duration-300 ${
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
              <span className={`text-[13px] font-normal tracking-[-0.01em] transition-all duration-300 ${
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
              <span className={`text-[13px] font-normal tracking-[-0.01em] transition-all duration-300 ${
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
              href="/about" 
              className="relative group"
            >
              <span className={`text-[13px] font-normal tracking-[-0.01em] transition-all duration-300 ${
                useTransparentStyle
                  ? isActiveLink('/about')
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                  : isActiveLink('/about')
                    ? 'text-black'
                    : 'text-black/60 hover:text-black'
              }`}>
                About
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
              href="/properties" 
              className="relative group"
            >
              <span className={`text-[13px] font-normal tracking-[-0.01em] transition-all duration-300 ${
                useTransparentStyle
                  ? isActiveLink('/properties')
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                  : isActiveLink('/properties')
                    ? 'text-black'
                    : 'text-black/60 hover:text-black'
              }`}>
                Collection
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
              <span className={`text-[13px] font-normal tracking-[-0.01em] transition-all duration-300 ${
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
                  Get In Touch
                </Button>
              ) : (
                <Button 
                  variant="ghost"
                  className="bg-black text-white hover:bg-black/90 border-0 hover:border-0 focus:border-0 focus-visible:border-0 active:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none px-5 py-2 rounded-full text-[13px] font-normal tracking-[-0.01em] transition-all duration-200 shadow-sm hover:shadow-md"
                  style={{ border: 'none', outline: 'none' }}
                >
                  Get In Touch
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
          >
            {isMenuOpen ? <X size={18} weight="regular" /> : <List size={18} weight="regular" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`md:hidden border-t overflow-hidden backdrop-blur-2xl ${
              useTransparentStyle
                ? 'border-white/10 bg-black/40'
                : 'border-black/5 bg-white/95'
            }`}
          >
            <div className="px-6 py-6 space-y-1">
              <Link 
                href="/" 
                className={`block text-[15px] font-normal tracking-[-0.01em] transition-colors duration-200 py-2.5 ${
                  useTransparentStyle
                    ? isActiveLink('/')
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                    : isActiveLink('/')
                      ? 'text-black'
                      : 'text-black/60 hover:text-black'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/services" 
                className={`block text-[15px] font-normal tracking-[-0.01em] transition-colors duration-200 py-2.5 ${
                  useTransparentStyle
                    ? isActiveLink('/services')
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                    : isActiveLink('/services')
                      ? 'text-black'
                      : 'text-black/60 hover:text-black'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/about" 
                className={`block text-[15px] font-normal tracking-[-0.01em] transition-colors duration-200 py-2.5 ${
                  useTransparentStyle
                    ? isActiveLink('/about')
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                    : isActiveLink('/about')
                      ? 'text-black'
                      : 'text-black/60 hover:text-black'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/properties" 
                className={`block text-[15px] font-normal tracking-[-0.01em] transition-colors duration-200 py-2.5 ${
                  useTransparentStyle
                    ? isActiveLink('/properties')
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                    : isActiveLink('/properties')
                      ? 'text-black'
                      : 'text-black/60 hover:text-black'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Collection
              </Link>
              <Link 
                href="/blog" 
                className={`block text-[15px] font-normal tracking-[-0.01em] transition-colors duration-200 py-2.5 ${
                  useTransparentStyle
                    ? isActiveLink('/blog')
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                    : isActiveLink('/blog')
                      ? 'text-black'
                      : 'text-black/60 hover:text-black'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              
              {/* Language Switcher Mobile */}
              <div className={`pt-4 mt-4 border-t ${useTransparentStyle ? 'border-white/10' : 'border-black/5'}`}>
                <div className={`text-[11px] font-normal mb-2 px-2 tracking-[-0.01em] ${
                  useTransparentStyle ? 'text-white/50' : 'text-black/40'
                }`}>
                  Language
                </div>
                <div className="space-y-1">
                  <button 
                    onClick={() => setCurrentLang('EN')}
                    className={`block w-full text-left text-[14px] font-normal tracking-[-0.01em] transition-colors duration-200 py-2 px-2 rounded-lg ${
                      currentLang === 'EN' 
                        ? useTransparentStyle
                          ? 'bg-white/10 text-white'
                          : 'bg-black/5 text-black'
                        : useTransparentStyle
                          ? 'text-white/70 hover:bg-white/10'
                          : 'text-black/60 hover:bg-black/5'
                    }`}
                  >
                    🇬🇧 English
                  </button>
                  <button 
                    onClick={() => setCurrentLang('FR')}
                    className={`block w-full text-left text-[14px] font-normal tracking-[-0.01em] transition-colors duration-200 py-2 px-2 rounded-lg ${
                      currentLang === 'FR' 
                        ? useTransparentStyle
                          ? 'bg-white/10 text-white'
                          : 'bg-black/5 text-black'
                        : useTransparentStyle
                          ? 'text-white/70 hover:bg-white/10'
                          : 'text-black/60 hover:bg-black/5'
                    }`}
                  >
                    🇫🇷 Français
                  </button>
                  <button 
                    onClick={() => setCurrentLang('PT')}
                    className={`block w-full text-left text-[14px] font-normal tracking-[-0.01em] transition-colors duration-200 py-2 px-2 rounded-lg ${
                      currentLang === 'PT' 
                        ? useTransparentStyle
                          ? 'bg-white/10 text-white'
                          : 'bg-black/5 text-black'
                        : useTransparentStyle
                          ? 'text-white/70 hover:bg-white/10'
                          : 'text-black/60 hover:bg-black/5'
                    }`}
                  >
                    🇵🇹 Português
                  </button>
                </div>
              </div>
              
              {/* Mobile Action Buttons */}
              <div className="pt-4 mt-4 space-y-2">
                <Link href="/login" className="block" onClick={() => setIsMenuOpen(false)}>
                  {useTransparentStyle ? (
                    <Button 
                      variant="ghost"
                      className="w-full bg-white/10 backdrop-blur-md text-white hover:bg-white/15 border-0 hover:border-0 focus:border-0 focus-visible:border-0 active:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none px-6 py-2.5 rounded-full text-[13px] font-normal tracking-[-0.01em] transition-all duration-200 flex items-center justify-center gap-2"
                      style={{ outline: 'none' }}
                    >
                      <UserCircle className="w-4 h-4" weight="regular" />
                      Sign In
                    </Button>
                  ) : (
                    <Button 
                      variant="ghost"
                      className="w-full bg-black/5 text-black hover:bg-black/10 border-0 hover:border-0 focus:border-0 focus-visible:border-0 active:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none px-6 py-2.5 rounded-full text-[13px] font-normal tracking-[-0.01em] transition-all duration-200 flex items-center justify-center gap-2"
                      style={{ border: 'none', outline: 'none' }}
                    >
                      <UserCircle className="w-4 h-4" weight="regular" />
                      Sign In
                    </Button>
                  )}
                </Link>
                <Link href="/contact" className="block" onClick={() => setIsMenuOpen(false)}>
                  {useTransparentStyle ? (
                    <Button 
                      variant="ghost"
                      className="w-full bg-white/10 backdrop-blur-md text-white hover:bg-white/15 border-0 hover:border-0 focus:border-0 focus-visible:border-0 active:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none px-6 py-2.5 rounded-full text-[13px] font-normal tracking-[-0.01em] transition-all duration-200"
                      style={{ outline: 'none' }}
                    >
                      Get In Touch
                    </Button>
                  ) : (
                    <Button 
                      variant="ghost"
                      className="w-full bg-black text-white hover:bg-black/90 border-0 hover:border-0 focus:border-0 focus-visible:border-0 active:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none px-6 py-2.5 rounded-full text-[13px] font-normal tracking-[-0.01em] transition-all duration-200"
                      style={{ border: 'none', outline: 'none' }}
                    >
                      Get In Touch
                    </Button>
                  )}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

