"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Cpu, Shield, CheckCircle2, Leaf, TrendingUp, Globe, Zap, Star, Award, BarChart3, Target, ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { motion, useScroll, useTransform } from 'framer-motion'
import SplineBackground from '@/components/spline-background'
import { useRouter } from 'next/navigation'
import TeamSection from '@/components/ui/team'
import { teamMembers } from '@/lib/team-data'
import Footer from '@/components/ui/footer'

// Interface para breakpoints inteligentes
interface ScreenBreakpoints {
  isXs: boolean      // < 380px - muito pequeno (mobile portrait pequeno)
  isSm: boolean      // 380px - 640px - pequeno (mobile portrait)
  isMd: boolean      // 640px - 768px - médio (mobile landscape)
  isTablet: boolean  // 768px - 1024px - tablet (iPad Mini/Pro)
  isLg: boolean      // 1024px - 1280px - desktop pequeno
  isXl: boolean      // > 1280px - desktop grande
  
  // Altura
  isShortHeight: boolean    // < 600px
  isMediumHeight: boolean   // 600px - 800px
  isTallHeight: boolean     // > 800px
  
  // Combinações úteis
  isMobile: boolean         // < 768px
  isDesktop: boolean        // >= 1024px
  
  width: number
  height: number
}

// Hook de breakpoints inteligentes
const useSmartBreakpoints = (): ScreenBreakpoints => {
  const [viewport, setViewport] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Set initial viewport
    updateViewport()

    // Listen for resize events
    window.addEventListener('resize', updateViewport)
    window.addEventListener('orientationchange', updateViewport)

    return () => {
      window.removeEventListener('resize', updateViewport)
      window.removeEventListener('orientationchange', updateViewport)
    }
  }, [])

  const breakpoints = {
    isXs: viewport.width < 380,
    isSm: viewport.width >= 380 && viewport.width < 640,
    isMd: viewport.width >= 640 && viewport.width < 768,
    isTablet: viewport.width >= 768 && viewport.width < 1024,
    isLg: viewport.width >= 1024 && viewport.width < 1280,
    isXl: viewport.width >= 1280,
    
    isShortHeight: viewport.height < 600,
    isMediumHeight: viewport.height >= 600 && viewport.height < 800,
    isTallHeight: viewport.height >= 800,
    
    isMobile: viewport.width < 768,
    isDesktop: viewport.width >= 1024,
    
    width: viewport.width,
    height: viewport.height
  }

  return breakpoints
}

// Função para obter layout inteligente baseado nos breakpoints
const getSmartLayout = (breakpoints: ScreenBreakpoints) => {
  const { isXs, isSm, isMd, isTablet, isLg, isXl, isShortHeight, isMediumHeight, isTallHeight, isMobile, isDesktop } = breakpoints

  // Layout para telas muito pequenas (< 380px)
  if (isXs) {
    return {
      // Hero Section
      containerClass: 'min-h-screen-fixed flex flex-col justify-start items-center',
      heroContentClass: 'px-3 py-2',
      heroSpacing: 'pt-20 pb-8',
      titleSize: 'text-4xl',
      subtitleSize: 'text-xl',
      buttonSize: 'h-12 text-sm w-full max-w-[280px]',
      spacingY: 'space-y-4',
      
      // Seções Gerais
      containerPadding: 'px-3',
      maxWidth: 'max-w-6xl',
      sectionPadding: 'py-12',
      sectionTitleSize: 'text-2xl',
      sectionSubtitleSize: 'text-sm',
      cardPadding: 'p-4',
      buttonHeight: 'h-11',
      gap: 'gap-4'
    }
  }

  // Layout para mobile pequeno (380px - 640px)
  if (isSm) {
    return {
      // Hero Section
      containerClass: 'min-h-screen-fixed flex flex-col justify-start items-center',
      heroContentClass: 'px-4 py-4',
      heroSpacing: 'pt-24 pb-8',
      titleSize: 'text-5xl',
      subtitleSize: 'text-2xl',
      buttonSize: 'h-12 text-base w-full max-w-[320px]',
      spacingY: 'space-y-5',
      
      // Seções Gerais
      containerPadding: 'px-4',
      maxWidth: 'max-w-6xl',
      sectionPadding: 'py-16',
      sectionTitleSize: 'text-2xl',
      sectionSubtitleSize: 'text-sm',
      cardPadding: 'p-5',
      buttonHeight: 'h-12',
      gap: 'gap-5'
    }
  }

  // Layout para mobile landscape (640px - 768px)
  if (isMd) {
    return {
      // Hero Section
      containerClass: 'min-h-screen-fixed flex flex-col justify-start items-center',
      heroContentClass: 'px-6 py-4',
      heroSpacing: 'pt-20 pb-8',
      titleSize: 'text-5xl',
      subtitleSize: 'text-2xl',
      buttonSize: 'h-12 text-base w-full max-w-[340px]',
      spacingY: 'space-y-6',
      
      // Seções Gerais
      containerPadding: 'px-6',
      maxWidth: 'max-w-6xl',
      sectionPadding: 'py-20',
      sectionTitleSize: 'text-3xl',
      sectionSubtitleSize: 'text-base',
      cardPadding: 'p-6',
      buttonHeight: 'h-12',
      gap: 'gap-6'
    }
  }

  // Layout para tablets (768px - 1024px)
  if (isTablet) {
    return {
      // Hero Section
      containerClass: 'min-h-screen-fixed flex flex-col justify-center items-center',
      heroContentClass: 'px-8 py-10',
      heroSpacing: isShortHeight ? 'pt-12 pb-8' : 'pt-16 pb-12',
      titleSize: 'text-5xl md:text-6xl',
      subtitleSize: 'text-2xl',
      buttonSize: 'h-12 text-lg min-w-[210px]',
      spacingY: 'space-y-7',
      
      // Seções Gerais
      containerPadding: 'px-8',
      maxWidth: 'max-w-6xl',
      sectionPadding: 'py-24',
      sectionTitleSize: 'text-3xl md:text-4xl',
      sectionSubtitleSize: 'text-base',
      cardPadding: 'p-7',
      buttonHeight: 'h-12',
      gap: 'gap-6'
    }
  }

  // Layout para desktop pequeno (1024px - 1280px)
  if (isLg) {
    return {
      // Hero Section
      containerClass: 'min-h-screen-fixed flex flex-col justify-center items-center',
      heroContentClass: 'px-8 py-12',
      heroSpacing: 'pt-16 md:pt-0',
      titleSize: 'text-6xl md:text-7xl',
      subtitleSize: 'text-2xl md:text-3xl',
      buttonSize: 'h-12 sm:h-14 text-base sm:text-lg min-w-[200px] sm:min-w-[220px]',
      spacingY: 'space-y-6 md:space-y-8',
      
      // Seções Gerais
      containerPadding: 'px-8',
      maxWidth: 'max-w-7xl',
      sectionPadding: 'py-24',
      sectionTitleSize: 'text-4xl',
      sectionSubtitleSize: 'text-base',
      cardPadding: 'p-8',
      buttonHeight: 'h-12',
      gap: 'gap-6'
    }
  }

  // Layout para desktop grande (> 1280px)
  return {
    // Hero Section
    containerClass: 'min-h-screen-fixed flex flex-col justify-center items-center',
    heroContentClass: 'px-4 sm:px-6 lg:px-8 py-12',
    heroSpacing: 'pt-16 md:pt-0',
    titleSize: 'text-4xl sm:text-5xl md:text-7xl',
    subtitleSize: 'text-xl sm:text-2xl md:text-3xl',
    buttonSize: 'h-12 sm:h-14 text-base sm:text-lg min-w-[200px] sm:min-w-[220px]',
    spacingY: 'space-y-6 md:space-y-8',
    
    // Seções Gerais
    containerPadding: 'px-4 sm:px-6 lg:px-8',
    maxWidth: 'max-w-7xl',
    sectionPadding: 'py-24',
    sectionTitleSize: 'text-4xl',
    sectionSubtitleSize: 'text-lg',
    cardPadding: 'p-8',
    buttonHeight: 'h-12',
    gap: 'gap-6'
  }
}

const advantages = [
  { label: "Cost Reduction", value: "40%", description: "€35 vs €45-60 traditional", icon: TrendingUp },
  { label: "Speed", value: "4x", description: "3 weeks vs 6-12 months", icon: Zap },
  { label: "AI Accuracy", value: "98.5%", description: "ESG data extraction", icon: BarChart3 },
  { label: "Market Size", value: "€8.5B", description: "Annual opportunity", icon: Target }
]

// Team data is now imported from lib/team-data.ts

export default function SobrePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState('')
  const [emailStatus, setEmailStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  
  // Hook de breakpoints inteligentes 
  const breakpoints = useSmartBreakpoints()
  
  const { scrollY } = useScroll()

  // Handle email notification signup
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setEmailStatus('error')
      return
    }
    
    setEmailStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      setEmailStatus('success')
      setEmail('')
      setTimeout(() => setEmailStatus('idle'), 3000)
    }, 1500)
  }

  // Fix viewport height for mobile to prevent browser UI from hiding
  useEffect(() => {
    const setViewportHeight = () => {
      // Get the viewport height and multiply by 1% to get a value for a vh unit
      const vh = window.innerHeight * 0.01;
      // Set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set initial viewport height
    setViewportHeight();

    // Listen for resize events (orientation change, etc.)
    const handleResize = () => {
      setViewportHeight();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Clean up event listeners
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleIniciarValidacao = () => {
    router.push('/validacao')
  }

  // Evita flash de conteúdo não hidratado
  if (!mounted) {
    return null
  }

  // Obter layout inteligente baseado nos breakpoints
  const {
    // Hero Section
    containerClass,
    heroContentClass,
    heroSpacing,
    titleSize,
    subtitleSize,
    buttonSize,
    spacingY,
    
    // Seções Gerais
    containerPadding,
    maxWidth,
    sectionPadding,
    sectionTitleSize,
    sectionSubtitleSize,
    cardPadding,
    buttonHeight,
    gap
  } = getSmartLayout(breakpoints)

  return (
    <div className="relative">
      <Navbar />
      
      {/* Hero Section - Design moderno da homepage */}
      <section 
        className={`fixed inset-0 ${containerClass} ${heroSpacing} h-screen`}
        style={{ paddingBottom: '120px' }}
      >
        {/* Cor de fundo padrão */}
        <div className="absolute inset-0 bg-[#044050]" />
        
        <div className="absolute inset-0 overflow-hidden">
          {/* SplineBackground - Crystal Ball */}
          <SplineBackground />
          
          {/* Overlay para melhor legibilidade do conteúdo */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 backdrop-blur-[0.5px]" style={{ zIndex: 2 }} />
        </div>
        
        <div className={`relative ${containerClass}`} style={{ zIndex: 10 }}>
          <div 
            className={`w-full max-w-6xl mx-auto text-center ${heroContentClass}`}
          >
            <div className={spacingY}>
              {/* Badge minimalista */}
              <motion.div 
                className={`inline-block ${breakpoints.isTablet ? 'mt-6' : breakpoints.isDesktop ? 'mt-8' : 'mt-4'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <motion.div 
                  className={`${breakpoints.isXs ? 'text-xs' : 'text-sm'} font-light tracking-[0.3em] uppercase text-[#E5FFBA]/90 drop-shadow-md ${
                    breakpoints.isMobile 
                      ? 'px-4 py-2' 
                      : 'px-6 py-2.5 bg-[#E5FFBA]/10 border border-[#E5FFBA]/30 rounded-full backdrop-blur-md'
                  }`}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(229, 255, 186, 0.08)' }}
                  transition={{ duration: 0.3 }}
                >
                  About GreenCheck
                </motion.div>
              </motion.div>
              
              {/* Título principal elegante */}
              <motion.div 
                className={`${breakpoints.isMobile ? 'mt-12' : 'mt-16'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <motion.h1 
                  className={`${titleSize} font-extralight tracking-[-0.03em] leading-[0.95] text-white drop-shadow-lg`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <motion.span 
                    className="inline-block font-extralight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    Revolutionizing
                  </motion.span>
                  {' '}
                  <motion.span 
                    className="inline-block font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                  >
                    ESG
                  </motion.span>
                </motion.h1>
                
                {/* Linha decorativa minimalista */}
                <motion.div 
                  className={`${breakpoints.isMobile ? 'mt-6' : 'mt-8'} flex items-center justify-center gap-4`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                >
                  <motion.div 
                    className="h-px bg-gradient-to-r from-transparent via-[#E5FFBA]/40 to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: breakpoints.isMobile ? '60%' : '280px' }}
                    transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.div>
                
                <motion.p 
                  className={`${breakpoints.isXs ? 'text-sm' : breakpoints.isMobile ? 'text-base' : 'text-lg'} font-light tracking-[0.2em] text-[#E5FFBA]/80 uppercase mt-6 drop-shadow-md`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                >
                  AI + Blockchain + Science
                </motion.p>
              </motion.div>
              
              {/* In Development Badge - minimalista */}
              <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className={`${breakpoints.isMobile ? 'mt-8' : 'mt-10'}`}
              >
                <div className={`inline-flex items-center gap-2 ${breakpoints.isXs ? 'text-xs' : 'text-sm'} font-light text-[#E5FFBA]/70 px-4 py-1.5`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E5FFBA]/70 animate-pulse" />
                  <span className="tracking-wide">In Development</span>
                </div>
              </motion.div>

              {/* Email Notification Form */}
                  <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className={`${breakpoints.isMobile ? 'mt-6' : 'mt-8'} max-w-md mx-auto`}
              >
                {emailStatus === 'success' ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center justify-center gap-2 text-[#5FA037] bg-[#5FA037]/10 border border-[#5FA037]/30 px-6 py-3 rounded-full backdrop-blur-sm"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`${breakpoints.isXs ? 'text-xs' : 'text-sm'} font-light`}>
                      We'll notify you when ready!
                    </span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
                    <div className="flex-1">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (emailStatus === 'error') setEmailStatus('idle')
                        }}
                        placeholder="Enter your email"
                        className={`w-full ${breakpoints.isXs ? 'text-xs px-4 py-2.5' : 'text-sm px-5 py-3'} bg-white/5 border ${
                          emailStatus === 'error' ? 'border-red-400/50' : 'border-white/10'
                        } text-white placeholder:text-white/40 rounded-lg backdrop-blur-sm focus:outline-none focus:border-[#E5FFBA]/40 focus:bg-white/10 transition-all duration-300`}
                        disabled={emailStatus === 'loading'}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={emailStatus === 'loading'}
                      className={`${breakpoints.isXs ? 'text-xs px-5 py-2.5' : 'text-sm px-6 py-3'} bg-[#5FA037] text-white font-medium rounded-full hover:bg-[#4d8c2d] active:scale-[0.98] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#5FA037]/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap relative overflow-hidden group`}
                    >
                      {/* Subtle shine effect on hover */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                      
                      {emailStatus === 'loading' ? (
                        <span className="relative flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending...</span>
                        </span>
                      ) : (
                        <span className="relative flex items-center gap-2">
                          <span>Notify Me</span>
                          <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-105" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        </span>
                      )}
                    </button>
                  </form>
                )}
                {emailStatus === 'error' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`${breakpoints.isXs ? 'text-xs' : 'text-sm'} text-red-400/80 mt-2 text-center font-light`}
                  >
                    Please enter a valid email address
                  </motion.p>
                )}
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* Content Container - Scrolls over fixed hero (igual homepage) */}
      <main className={`relative z-10 ${
        breakpoints.isXs 
          ? 'mt-[calc(100vh-200px)]' 
          : breakpoints.isSm
          ? 'mt-[calc(100vh-250px)]'
          : breakpoints.isMobile 
          ? 'mt-[calc(100vh-280px)]' 
          : 'mt-[100vh]'
      } ${
        breakpoints.isMobile 
          ? 'pb-[120px]' 
          : 'pb-0'
      }`}>
      
      {/* What is GreenCheck - Hero Content */}
      <section className={`${sectionPadding} relative bg-white rounded-t-[48px]`}>
        {/* Linha de Slide iOS - Mobile apenas */}
        {breakpoints.isMobile && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-slate-300 rounded-full z-10" />
        )}
        
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-16' : 'mb-24'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              About GreenCheck
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Automated ESG</span>
              <br />
              <span className="font-normal text-[#5FA037]">certification platform</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-3xl'} mx-auto text-gray-600 font-light leading-relaxed mb-12`}
            >
              GreenCheck democratizes access to ESG certification and carbon offsetting, offering verifiable impact through AI, blockchain, and scientific validation. We serve European SMEs, individuals, and large corporations with transparent, automated sustainability solutions.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#5FA037]" />
                <span>First-mover advantage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#5FA037]" />
                <span>€8.5B market opportunity</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#5FA037]" />
                <span>2.4M target SMEs</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className={`${sectionPadding} relative bg-slate-50`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-16' : 'mb-24'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              What We Do
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Sustainability</span>
              <br />
              <span className="font-normal text-[#5FA037]">without complexity</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              Integrated platform for ESG certification and carbon neutralization
            </motion.p>
          </div>

          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : breakpoints.isTablet ? 'grid-cols-2' : 'grid-cols-4'} ${breakpoints.isMobile ? 'gap-8' : 'gap-12'}`}>
            {[
              {
                icon: CheckCircle2,
                title: "Automated ESG Certification",
                description: "Accurate carbon footprint calculation using AI with 98.5% accuracy"
              },
              {
                icon: Shield,
                title: "Traceability in Blockchain",
                description: "Immutable certificates registered as NFTs on Polygon for full verification"
              },
              {
                icon: Leaf,
                title: "Verifiable Compensation",
                description: "Scientifically validated reforestation projects guarantee a real impact"
              },
              {
                icon: Globe,
                title: "Simplified Experience",
                description: "100% digital and intuitive process for companies and individuals"
              }
            ].map((item, index) => {
              const ItemIcon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group text-center"
                >
                  <div className="mb-6 flex justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#044050] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#5FA037]">
                      <ItemIcon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <h3 className={`${breakpoints.isXs ? 'text-base' : 'text-lg'} font-medium text-[#044050] mb-2`}>
                    {item.title}
                  </h3>
                  <p className={`${breakpoints.isXs ? 'text-sm' : 'text-base'} text-gray-600 font-light`}>
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className={`${sectionPadding} relative bg-white`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-16' : 'mb-24'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Competitive Advantages
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Why</span>
              <br />
              <span className="font-normal text-[#5FA037]">GreenCheck?</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              Patented technology with measurable advantages over traditional methods
            </motion.p>
          </div>

          {/* Advantages Grid */}
          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-2' : breakpoints.isTablet ? 'grid-cols-2' : 'grid-cols-4'} ${gap} ${breakpoints.isMobile ? 'mb-12' : 'mb-16'}`}>
            {advantages.map((advantage, index) => {
              const AdvantageIcon = advantage.icon
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="mb-6 flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#044050] flex items-center justify-center transition-all duration-300 group-hover:bg-[#5FA037]">
                      <AdvantageIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className={`${breakpoints.isXs ? 'text-3xl' : breakpoints.isMobile ? 'text-4xl' : 'text-5xl'} font-extralight text-[#5FA037] mb-2`}>
                    {advantage.value}
                  </div>
                  <h3 className={`${breakpoints.isXs ? 'text-sm' : 'text-base'} font-medium text-gray-500 uppercase tracking-wider mb-1`}>
                    {advantage.label}
                  </h3>
                  <p className={`${breakpoints.isXs ? 'text-xs' : 'text-sm'} text-gray-600 font-light`}>
                    {advantage.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
                  </div>
      </section>

      {/* Technology Solution */}
      <section className={`${sectionPadding} relative bg-slate-50`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1 gap-16' : 'md:grid-cols-2 gap-20'} items-center`}>
            {/* Left Column - Text */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={breakpoints.isMobile ? 'text-center' : ''}
            >
              <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-6">
                Unique Technological Solution
              </p>
              <h2 className={`${breakpoints.isMobile ? 'text-3xl' : 'text-4xl lg:text-5xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.15]`}>
                <span className="font-light text-gray-700">The power of</span>
                <br />
                <span className="font-medium text-[#5FA037]">innovation</span>{' '}
                <span className="font-light text-gray-700">at</span>
                <br />
                <span className="font-light text-gray-700">the service</span>
                <br />
                <span className="font-medium text-[#5FA037]">of the planet</span>
              </h2>
              <p className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} text-gray-600 font-light leading-relaxed`}>
                We are the only platform that integrates the best cutting-edge technology to ensure accuracy and reliability
              </p>
            </motion.div>

            {/* Right Column - Tech Stack */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* AI */}
              <div className="border-b border-gray-200 pb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#044050] flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#044050]">Artificial Intelligence</h3>
                </div>
                <ul className="space-y-2 ml-16">
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">Automatic data extraction from documents</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">Accurate calculation of carbon emissions</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">Analysis of compliance with multiple standards (CSRD, ABNT, GRI)</span>
                  </li>
                </ul>
              </div>

              {/* Blockchain */}
              <div className="border-b border-gray-200 pb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#044050] flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#044050]">Blockchain (Polygon)</h3>
                </div>
                <ul className="space-y-2 ml-16">
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">NFT certificates with full metadata</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">Cost per transaction: &lt; €0.01</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">Instant public verification via QR code</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">Immutable history of compensation</span>
                  </li>
                </ul>
              </div>

              {/* Scientific Validation */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#044050] flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#044050]">Scientific Validation</h3>
                </div>
                <ul className="space-y-2 ml-16">
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">Exclusive partnership with Plantarum Botanical Garden</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">Internationally approved methodologies</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">Continuous project monitoring</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
                  </div>
      </section>

          {/* Patent Section - Clean Minimal */}
      <section className={`${sectionPadding} relative bg-white`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card className={`border border-gray-200 ${breakpoints.isMobile ? 'rounded-2xl' : 'rounded-3xl'} ${cardPadding} bg-white`}>
              <CardContent>
                <div className={`flex ${breakpoints.isMobile ? 'flex-col text-center' : 'items-center'} gap-6 ${breakpoints.isMobile ? 'mb-6' : 'mb-8'}`}>
                  <div className="w-16 h-16 rounded-full bg-[#044050] flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className={`${breakpoints.isMobile ? 'text-3xl' : 'text-4xl lg:text-5xl'} font-light ${breakpoints.isMobile ? 'mb-2' : 'mb-4'} tracking-tight leading-[1.1]`}>
                      <span className="font-extralight text-[#044050]">Patented</span>
                      <br />
                      <span className="font-normal text-[#5FA037]">technology</span>
                    </h2>
                    <p className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} text-gray-600 font-light`}>Computational system for automated sustainable certification</p>
                  </div>
                </div>
                <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : 'md:grid-cols-2'} ${gap}`}>
                  <div>
                    <h3 className={`${breakpoints.isXs ? 'text-lg' : 'text-xl'} font-medium text-[#044050] ${breakpoints.isMobile ? 'mb-4' : 'mb-6'}`}>Technical Innovations</h3>
                    <ul className={`space-y-3 ${breakpoints.isXs ? 'text-sm' : 'text-base'} text-gray-600 font-light`}>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5FA037] mt-2 flex-shrink-0"></div>
                        <span>Specialized AI algorithms for ESG analysis</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5FA037] mt-2 flex-shrink-0"></div>
                        <span>Automated scientific validation via APIs</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5FA037] mt-2 flex-shrink-0"></div>
                        <span>Immutable blockchain certificates with scientific proofs</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5FA037] mt-2 flex-shrink-0"></div>
                        <span>Integrated marketplace with AI recommendations</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className={`${breakpoints.isXs ? 'text-lg' : 'text-xl'} font-medium text-[#044050] ${breakpoints.isMobile ? 'mb-4' : 'mb-6'}`}>Target Market</h3>
                    <ul className={`space-y-3 ${breakpoints.isXs ? 'text-sm' : 'text-base'} text-gray-600 font-light`}>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5FA037] mt-2 flex-shrink-0"></div>
                        <span>2.4 million European SMEs (CSRD compliance)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5FA037] mt-2 flex-shrink-0"></div>
                        <span>450 million environmentally conscious consumers</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5FA037] mt-2 flex-shrink-0"></div>
                        <span>B2B and B2C market with scalable solutions</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5FA037] mt-2 flex-shrink-0"></div>
                        <span>€8.5 billion annual opportunity</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

          {/* Team Section - Modern Design */}
      <TeamSection 
        members={teamMembers}
        title="Experts"
        titleHighlight="in sustainability"
        subtitle="Our multidisciplinary team combines technical expertise and scientific knowledge with strategy, legal insight, finance, sustainability, and operations to revolutionize ESG certification through innovative AI, blockchain, and data-driven solutions, transforming ESG commitments into verifiable, transparent, and impactful outcomes."
      />

          {/* CTA Section - Clean Minimal */}
      <section className={`${sectionPadding} relative bg-[#044050] text-white`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <div               className={`${breakpoints.isXs ? 'text-xs' : 'text-sm'} font-medium tracking-[0.2em] uppercase text-white/80 bg-white/10 border border-white/20 px-6 py-3 rounded-full backdrop-blur-xl`}>
                Start Today
              </div>
            </motion.div>

            {/* Title */}
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-white">Ready to</span>
              <br />
              <span className="font-normal text-white">transform ESG?</span>
            </motion.h3>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} text-white/90 ${breakpoints.isMobile ? 'mb-8' : 'mb-12'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto leading-relaxed font-light`}
            >
              Join companies that <span className="font-medium text-[#5FA037]">save 40%</span> on costs 
              and achieve results <span className="font-medium text-[#5FA037]">4x faster</span> with our patented technology.
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className={`grid ${breakpoints.isMobile ? 'grid-cols-2' : 'grid-cols-4'} ${breakpoints.isMobile ? 'gap-4 mb-8' : 'gap-8 mb-12'} max-w-4xl mx-auto`}
            >
              <div className="text-center">
                <div className={`${breakpoints.isXs ? 'text-3xl' : breakpoints.isMobile ? 'text-4xl' : 'text-5xl'} font-extralight text-[#5FA037] mb-1`}>98.5%</div>
                <div className={`${breakpoints.isXs ? 'text-xs' : 'text-sm'} text-white/70 uppercase tracking-wider font-medium`}>AI Accuracy</div>
              </div>
              <div className="text-center">
                <div className={`${breakpoints.isXs ? 'text-3xl' : breakpoints.isMobile ? 'text-4xl' : 'text-5xl'} font-extralight text-[#5FA037] mb-1`}>40%</div>
                <div className={`${breakpoints.isXs ? 'text-xs' : 'text-sm'} text-white/70 uppercase tracking-wider font-medium`}>Savings</div>
              </div>
              <div className="text-center">
                <div className={`${breakpoints.isXs ? 'text-3xl' : breakpoints.isMobile ? 'text-4xl' : 'text-5xl'} font-extralight text-[#5FA037] mb-1`}>4x</div>
                <div className={`${breakpoints.isXs ? 'text-xs' : 'text-sm'} text-white/70 uppercase tracking-wider font-medium`}>Faster</div>
              </div>
              <div className="text-center">
                <div className={`${breakpoints.isXs ? 'text-3xl' : breakpoints.isMobile ? 'text-4xl' : 'text-5xl'} font-extralight text-[#5FA037] mb-1`}>€8.5B</div>
                <div className={`${breakpoints.isXs ? 'text-xs' : 'text-sm'} text-white/70 uppercase tracking-wider font-medium`}>Market</div>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className={`flex ${breakpoints.isMobile ? 'flex-col' : 'flex-row'} ${breakpoints.isMobile ? 'gap-4' : 'gap-6'} justify-center items-center`}
            >
              <Button 
                onClick={handleIniciarValidacao}
                className={`${breakpoints.isMobile ? 'w-full max-w-sm' : 'px-10'} ${buttonHeight} bg-[#5FA037] text-white hover:bg-[#4d8c2d] rounded-full transition-all duration-300 font-normal tracking-wide group`}
              >
                <span className="flex items-center justify-center">
                  Start Free Validation
                  <ArrowRight className="ml-3 w-5 h-5 transition-all duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
              
              <Button 
                variant="ghost"
                className={`${breakpoints.isMobile ? 'w-full max-w-sm' : 'px-10'} ${buttonHeight} text-white hover:bg-white/10 border border-white/30 hover:border-white/50 rounded-full transition-all duration-300 font-normal tracking-wide backdrop-blur-xl`}
              >
                <span className="flex items-center justify-center">
                  Schedule Demo
                  <div className="ml-3 w-2 h-2 rounded-full bg-[#5FA037] transition-all duration-300 group-hover:bg-white"></div>
                </span>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'mt-8' : 'mt-12'} flex ${breakpoints.isMobile ? 'flex-col gap-4' : 'flex-row gap-8'} items-center justify-center text-white/70`}
            >
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#5FA037]" />
                <span className={`${breakpoints.isXs ? 'text-xs' : 'text-sm'} font-light`}>No commitment</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#5FA037]" />
                <span className={`${breakpoints.isXs ? 'text-xs' : 'text-sm'} font-light`}>5 minute setup</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#5FA037]" />
                <span className={`${breakpoints.isXs ? 'text-xs' : 'text-sm'} font-light`}>Specialized support</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      </main>
    </div>
  )
}