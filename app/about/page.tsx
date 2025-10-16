"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Cpu, Shield, CheckCircle2, Leaf, TrendingUp, Globe, Zap, Star, Award, BarChart3, Target, ArrowRight, FileText, Eye, Heart } from 'lucide-react'
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
  { label: "Upload", value: "Step 1", description: "Upload your ESG documents", icon: FileText },
  { label: "AI Extraction", value: "Step 2", description: "AI extracts carbon data", icon: Cpu },
  { label: "Scientific Validation", value: "Step 3", description: "Plantarum validates results", icon: Star },
  { label: "Blockchain", value: "Step 4", description: "Immutable certificate minted", icon: Shield },
  { label: "NFT Certificate", value: "Step 5", description: "Receive verifiable NFT", icon: Award }
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
    router.push('/validation')
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
              <span className="font-extralight text-[#044050]">Democratizing</span>
              <br />
              <span className="font-normal text-[#5FA037]">ESG Certification</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-3xl'} mx-auto text-gray-600 font-light leading-relaxed mb-12`}
            >
              GreenCheck is the technological platform of ESG Veritas, a computational system that revolutionizes ESG certification by combining Artificial Intelligence, Blockchain technology, and scientific validation. Our mission is to make sustainability accessible, transparent, and verifiable for everyone.
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
                <span>98.5% AI Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#5FA037]" />
                <span>40% Cost Reduction</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#5FA037]" />
                <span>4x Faster Processing</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Vision & Values */}
      <section className={`${sectionPadding} relative bg-slate-50`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-20' : 'mb-28'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Our Vision & Values
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Why we</span>
              <br />
              <span className="font-normal text-[#5FA037]">exist</span>
            </motion.h2>
          </div>

          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1 gap-20' : 'md:grid-cols-3 gap-24'} max-w-5xl mx-auto`}>
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-10 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-[#044050] flex items-center justify-center transition-all duration-500 hover:scale-105 shadow-sm">
                  <Target className="w-12 h-12 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-normal text-[#044050] mb-6 tracking-tight">Mission</h3>
              <p className="text-sm font-light text-gray-600 leading-relaxed">
                Democratize ESG certification by making sustainability accessible, affordable, and scientifically validated for companies of all sizes
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-10 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-[#5FA037] flex items-center justify-center transition-all duration-500 hover:scale-105 shadow-sm">
                  <Eye className="w-12 h-12 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-normal text-[#044050] mb-6 tracking-tight">Vision</h3>
              <p className="text-sm font-light text-gray-600 leading-relaxed">
                Become the global standard for automated, transparent, and verifiable ESG certification powered by AI and blockchain
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-10 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center transition-all duration-500 hover:scale-105 shadow-sm">
                  <Heart className="w-12 h-12 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-normal text-[#044050] mb-6 tracking-tight">Values</h3>
              <div className="space-y-4">
                <p className="text-sm font-light text-gray-600">Transparency</p>
                <p className="text-sm font-light text-gray-600">Innovation</p>
                <p className="text-sm font-light text-gray-600">Real Impact</p>
                <p className="text-sm font-light text-gray-600">Scientific Rigor</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is ESG */}
      <section className={`${sectionPadding} relative bg-white`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-20' : 'mb-28'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Understanding ESG
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">What is</span>
              <br />
              <span className="font-normal text-[#5FA037]">ESG?</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-sm' : 'text-base'} ${breakpoints.isMobile ? 'max-w-md' : 'max-w-3xl'} mx-auto text-gray-500 font-light leading-relaxed`}
            >
              ESG stands for Environmental, Social, and Governance — three pillars that measure a company's sustainability and ethical impact
            </motion.p>
          </div>

          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1 gap-20' : 'md:grid-cols-3 gap-24'} max-w-5xl mx-auto`}>
            {[
              {
                letter: 'E',
                title: 'Environmental',
                color: '#5FA037',
                items: ['Carbon footprint', 'Resource efficiency', 'Waste management', 'Climate action']
              },
              {
                letter: 'S',
                title: 'Social',
                color: '#044050',
                items: ['Labor practices', 'Community impact', 'Diversity & inclusion', 'Human rights']
              },
              {
                letter: 'G',
                title: 'Governance',
                color: 'rgb(100, 116, 139)',
                items: ['Business ethics', 'Transparency', 'Risk management', 'Compliance']
              }
            ].map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="mb-10 flex justify-center">
                  <div 
                    className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-105 shadow-sm"
                    style={{ backgroundColor: pillar.color }}
                  >
                    <span className="text-5xl font-light text-white">{pillar.letter}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-normal text-[#044050] tracking-tight mb-8">{pillar.title}</h3>
                <ul className="space-y-4">
                  {pillar.items.map((item, i) => (
                    <li key={i} className="text-sm font-light text-gray-600 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className={`${sectionPadding} relative bg-white`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-16' : 'mb-20'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Our Story
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Built on decades of</span>
              <br />
              <span className="font-normal text-[#5FA037]">impact experience</span>
            </motion.h2>
          </div>

          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1 gap-8' : 'md:grid-cols-2 gap-12'} ${breakpoints.isMobile ? 'mb-12' : 'mb-16'}`}>
            {/* Bureau Social - Left Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-105 border border-gray-200/50">
                  <img 
                    src="/images/Bureau Social Logo.svg" 
                    alt="Bureau Social Logo" 
                    className="w-12 h-12"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-light text-[#044050] tracking-tight">Bureau Social</h3>
                  <p className="text-xs font-light text-gray-400 tracking-wide">Est. 2009 • Brazil</p>
                </div>
              </div>
              <p className="text-lg font-light text-gray-600 leading-relaxed mb-8">
                Bureau Social is a Brazilian institution with over <span className="font-medium text-[#044050]">20 years of experience</span> in socio-environmental projects, certification, and sustainable development. Established in 2009 as Instituto Brasileiro de Negócios Sociais.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                  <p className="text-sm font-light text-gray-500">250+ socio-environmental projects executed</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                  <p className="text-sm font-light text-gray-500">ISO 14001 certified (environmental management)</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                  <p className="text-sm font-light text-gray-500">Extensive REDD+ project experience</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                  <p className="text-sm font-light text-gray-500">Partnerships with governments, NGOs, and corporations</p>
                </div>
              </div>
            </motion.div>

            {/* ESG Veritas Portugal - Right Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-105 border border-gray-200/50">
                  <img 
                    src="/favicon.png" 
                    alt="GreenCheck Logo" 
                    className="w-12 h-12"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-light text-[#044050] tracking-tight">ESG Veritas Portugal</h3>
                  <p className="text-xs font-light text-gray-400 tracking-wide">Est. 2024 • Lisboa</p>
                </div>
              </div>
              <p className="text-lg font-light text-gray-600 leading-relaxed mb-8">
                The operating entity based in Lisbon, bringing <span className="font-medium text-[#5FA037]">cutting-edge technology</span> to the European market. A strategic choice combining EU market access with Portuguese innovation incentives.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                  <p className="text-sm font-light text-gray-500">Direct access to European single market</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                  <p className="text-sm font-light text-gray-500">Tax incentives for tech-based startups</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                  <p className="text-sm font-light text-gray-500">Proximity to investment hubs and accelerators</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                  <p className="text-sm font-light text-gray-500">Access to specialized blockchain and AI talent</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hybrid Structure Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-[#044050] rounded-3xl p-12 text-white"
          >
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl font-extralight mb-6 tracking-tight">Hybrid Global Structure</h3>
              <p className="text-lg font-light leading-relaxed opacity-90">
                Our unique <span className="font-normal">Brazil-Portugal</span> structure combines Brazilian scientific and operational expertise with European business infrastructure, creating a barrier to entry for competitors while ensuring verifiable social and environmental impact in two key regions.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Track Record & Impact */}
      <section className={`${sectionPadding} relative bg-white`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-16' : 'mb-20'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Track Record
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Proven impact at</span>
              <br />
              <span className="font-normal text-[#5FA037]">scale</span>
            </motion.h2>
          </div>

          {/* Stats Grid */}
          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-2 gap-8' : 'md:grid-cols-4 gap-12'} ${breakpoints.isMobile ? 'mb-16' : 'mb-20'}`}>
            {[
              { value: '250+', label: 'Socio-environmental projects', icon: Target },
              { value: '815K', label: 'People impacted', icon: Globe },
              { value: '350+', label: 'Organizations served', icon: Award },
              { value: '20', label: 'Years of experience', icon: TrendingUp }
            ].map((stat, index) => {
              const StatIcon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="mb-6 flex justify-center">
                    <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center transition-all duration-300 group-hover:bg-[#5FA037]">
                      <StatIcon className="w-7 h-7 text-[#5FA037] transition-colors duration-300 group-hover:text-white" />
                    </div>
                  </div>
                  <div className={`${breakpoints.isMobile ? 'text-5xl' : 'text-6xl'} font-extralight text-[#044050] mb-3 tracking-tight`}>
                    {stat.value}
                  </div>
                  <p className="text-sm font-light text-gray-500 leading-relaxed">
                    {stat.label}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Key Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center group">
              <div className="text-3xl font-extralight text-[#044050] mb-3 tracking-tight">ISO 14001</div>
              <p className="text-sm font-light text-gray-600">Environmental management certified</p>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-extralight text-[#044050] mb-3 tracking-tight">OSCIP Status</div>
              <p className="text-sm font-light text-gray-600">Public interest civil society organization</p>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-extralight text-[#044050] mb-3 tracking-tight">1,050+</div>
              <p className="text-sm font-light text-gray-600">Business plans developed</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Presence */}
      <section className={`${sectionPadding} relative bg-slate-50`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-16' : 'mb-20'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Global Presence
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Operating across</span>
              <br />
              <span className="font-normal text-[#5FA037]">two continents</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              Strategic presence in Europe and Latin America, expanding to 8+ countries by 2031
            </motion.p>
          </div>

          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1 gap-8' : 'md:grid-cols-2 gap-12'} mb-16`}>
            {/* Portugal Office */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#044050] flex items-center justify-center">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-light text-[#044050] tracking-tight">Portugal Office</h3>
                  <p className="text-xs font-light text-gray-400 tracking-wide">European Headquarters</p>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037] mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">ESG Veritas Solutions, LDA</p>
                    <p className="text-sm font-light text-gray-500">Rua do Salvador, 20, 1A</p>
                    <p className="text-sm font-light text-gray-500">1100-466 Lisboa, Portugal</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                  <p className="text-sm font-light text-gray-500">Commercial headquarters</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                  <p className="text-sm font-light text-gray-500">European operations</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                  <p className="text-sm font-light text-gray-500">IP & legal center</p>
                </div>
              </div>
            </motion.div>

            {/* Brazil Office */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#5FA037] flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-light text-[#044050] tracking-tight">Brazil Office</h3>
                  <p className="text-xs font-light text-gray-400 tracking-wide">Operational Hub</p>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037] mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Bureau Social - Instituto Brasileiro de Negócios Sociais</p>
                    <p className="text-sm font-light text-gray-500">Av. Horácio Lafer, 160 - Conj. 22, Sala B</p>
                    <p className="text-sm font-light text-gray-500">Itaim Bibi - São Paulo/SP - 04538-080</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                  <p className="text-sm font-light text-gray-500">Operational headquarters</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                  <p className="text-sm font-light text-gray-500">R&D center</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                  <p className="text-sm font-light text-gray-500">LATAM market development</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Expansion Roadmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-[#044050] rounded-3xl p-10 text-white"
          >
            <h3 className="text-2xl font-extralight mb-8 tracking-tight text-center">Global Expansion Roadmap</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-extralight mb-2">2026-2027</div>
                <p className="text-sm font-light opacity-90">Niche Validation</p>
                <p className="text-xs font-light opacity-75 mt-2">Portugal & Brazil</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extralight mb-2">2028</div>
                <p className="text-sm font-light opacity-90">Regional Scale</p>
                <p className="text-xs font-light opacity-75 mt-2">Spain, France, Italy</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extralight mb-2">2029</div>
                <p className="text-sm font-light opacity-90">European Leader</p>
                <p className="text-xs font-light opacity-75 mt-2">UK, Germany + 5 countries</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extralight mb-2">2030+</div>
                <p className="text-sm font-light opacity-90">Global Leadership</p>
                <p className="text-xs font-light opacity-75 mt-2">10+ countries worldwide</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
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
              Our Mission
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Solving the</span>
              <br />
              <span className="font-normal text-[#5FA037]">ESG certification crisis</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              Traditional ESG certifications cost €45-60 per tCO₂e and take 6-12 months. We reduce costs by 40% and deliver results in 3 weeks through automation, making sustainability accessible to everyone.
            </motion.p>
          </div>

          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1 gap-12' : breakpoints.isTablet ? 'grid-cols-2 gap-12' : 'grid-cols-4 gap-8'}`}>
            {[
              {
                icon: Cpu,
                title: "AI Data Extraction",
                description: "Our specialized algorithms automatically extract ESG data from your documents with 98.5% accuracy, eliminating manual work"
              },
              {
                icon: Star,
                title: "Scientific Validation",
                description: "Partnership with Plantarum Botanical Garden ensures every certification is scientifically validated and internationally recognized"
              },
              {
                icon: Shield,
                title: "Blockchain Certificate",
                description: "Immutable NFT certificates on Polygon blockchain with complete metadata and QR code for instant public verification"
              },
              {
                icon: Leaf,
                title: "Real Impact",
                description: "Integrated marketplace with verified reforestation projects in the Amazon, monitored by satellite and local partners"
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
                  className="group"
                >
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#044050] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-[#5FA037] shadow-sm">
                      <ItemIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-light text-[#044050] mb-3 tracking-tight text-center">
                    {item.title}
                  </h3>
                  <p className="text-base text-gray-600 font-light leading-relaxed text-center">
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
              How It Works
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Simple</span>
              <br />
              <span className="font-normal text-[#5FA037]">5-step process</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              From document upload to blockchain certificate in just 3 weeks
            </motion.p>
          </div>

          {/* Process Steps Grid */}
          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : breakpoints.isTablet ? 'grid-cols-2' : 'grid-cols-5'} ${breakpoints.isMobile ? 'gap-6' : 'gap-8'}`}>
            {advantages.map((advantage, index) => {
              const AdvantageIcon = advantage.icon
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center relative"
                >
                  {/* Connection Line - Desktop Only */}
                  {!breakpoints.isMobile && index < advantages.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#5FA037] to-transparent opacity-30" />
                  )}
                  
                  <div className="mb-4 flex justify-center relative z-10">
                    <div className="w-12 h-12 rounded-full bg-[#044050] flex items-center justify-center transition-all duration-300 group-hover:bg-[#5FA037] shadow-lg">
                      <AdvantageIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className={`${breakpoints.isXs ? 'text-xl' : 'text-2xl'} font-light text-[#5FA037] mb-2`}>
                    {advantage.value}
                  </div>
                  <h3 className={`${breakpoints.isXs ? 'text-sm' : 'text-base'} font-medium text-[#044050] mb-2`}>
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

      {/* Strategic Partnerships */}
      <section className={`${sectionPadding} relative bg-white`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-16' : 'mb-20'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Strategic Partnerships
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Backed by</span>
              <br />
              <span className="font-normal text-[#5FA037]">scientific excellence</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              Our exclusive partnerships ensure every certification is scientifically validated and every offset project delivers real, measurable impact
            </motion.p>
          </div>

          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1 gap-8' : 'md:grid-cols-2 gap-12'} mb-16`}>
            {/* Plantarum Botanical Garden */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#5FA037] flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-light text-[#044050] tracking-tight">Plantarum</h3>
                  <p className="text-xs font-light text-gray-400 tracking-wide">Botanical Garden • Founded 1987</p>
                </div>
              </div>
              <p className="text-lg font-light text-gray-600 leading-relaxed mb-8">
                Scientific validation partner for ecological restoration and biodiversity conservation. Provides rigorous validation of carbon sequestration calculations and ecosystem services.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                  <p className="text-sm font-light text-gray-500">Real-time validation through secure institutional APIs</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                  <p className="text-sm font-light text-gray-500">Proprietary methodologies for CO₂ sequestration</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                  <p className="text-sm font-light text-gray-500">Satellite monitoring and georeferenced reports</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                  <p className="text-sm font-light text-gray-500">Support for reforestation protocols and quantification</p>
                </div>
              </div>
            </motion.div>

            {/* EcoArts Amazônia */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#044050] flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-light text-[#044050] tracking-tight">EcoArts Amazônia</h3>
                  <p className="text-xs font-light text-gray-400 tracking-wide">Carbon Offset Projects • Amazon Basin</p>
                </div>
              </div>
              <p className="text-lg font-light text-gray-600 leading-relaxed mb-8">
                Operational partner for carbon offset implementation. Specializes in territorial implementation, community engagement, and sociocultural co-benefits in Amazon reforestation projects.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                  <p className="text-sm font-light text-gray-500">Direct implementation of reforestation projects</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                  <p className="text-sm font-light text-gray-500">Local community engagement and social impact</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                  <p className="text-sm font-light text-gray-500">Forest economy projects and sustainable livelihoods</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                  <p className="text-sm font-light text-gray-500">Biodiversity conservation and ecosystem restoration</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Impact Advisory Board */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-3xl p-10"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-[#044050] flex items-center justify-center">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-light text-[#044050] tracking-tight">Impact Advisory Board</h3>
            </div>
            <p className="text-lg font-light text-gray-600 leading-relaxed mb-8">
              Bureau Social maintains an Impact Advisory Board comprised of experts and representatives from partner institutions who guide strategy, metrics, and technical quality of projects.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#5FA037] flex-shrink-0" />
                <p className="text-sm font-light text-gray-600">Technical excellence</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#5FA037] flex-shrink-0" />
                <p className="text-sm font-light text-gray-600">Anti-greenwashing</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#5FA037] flex-shrink-0" />
                <p className="text-sm font-light text-gray-600">Results auditability</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technology Solution */}
      <section className={`${sectionPadding} relative bg-white`}>
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
              <p className="text-xs font-medium text-gray-400 uppercase tracking-[0.25em] mb-6">
                Our Technology Stack
              </p>
              <h2 className={`${breakpoints.isMobile ? 'text-3xl' : 'text-4xl lg:text-5xl'} font-light mb-6 tracking-tight leading-[1.1]`}>
                <span className="font-light text-[#044050]">Three pillars of</span>
                <br />
                <span className="font-light text-[#5FA037]">innovation</span>
              </h2>
              <p className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} text-gray-600 font-light leading-relaxed`}>
                AI, Blockchain, and Scientific Validation work together to create the most reliable ESG certification platform
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
                    <span className="text-sm leading-relaxed">Hybrid OCR and NLP algorithms with 98.5% accuracy</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">Specialized in ESG document analysis</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">Supports CSRD, ABNT PR 2030, GRI, and TCFD standards</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">Processes documents in 15 seconds on average</span>
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
                    <span className="text-sm leading-relaxed">Immutable ERC-721 NFT certificates</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">Ultra-low cost: &lt; €0.01 per certificate</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">Public verification via QR code and blockchain explorer</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">Decentralized storage on IPFS</span>
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
                    <span className="text-sm leading-relaxed">Partnership with Plantarum Botanical Garden (founded 1987)</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">Real-time validation through secure institutional APIs</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">Proprietary methodologies for CO₂ sequestration calculation</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">Satellite monitoring and georreferenced reports</span>
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
                      <span className="font-light text-[#044050]">Patented</span>
                      <br />
                      <span className="font-light text-[#5FA037]">innovation</span>
                    </h2>
                    <p className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} text-gray-600 font-light`}>Computational system for automated corporate sustainability certification</p>
                  </div>
                </div>
                <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : 'md:grid-cols-2'} ${gap}`}>
                  <div>
                    <h3 className={`${breakpoints.isXs ? 'text-lg' : 'text-xl'} font-medium text-[#044050] ${breakpoints.isMobile ? 'mb-4' : 'mb-6'}`}>What Makes Us Unique</h3>
                    <ul className={`space-y-3 ${breakpoints.isXs ? 'text-sm' : 'text-base'} text-gray-600 font-light`}>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5FA037] mt-2 flex-shrink-0"></div>
                        <span>First platform combining AI, Blockchain, and Scientific Validation for ESG</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5FA037] mt-2 flex-shrink-0"></div>
                        <span>Hybrid validation of European (CSRD) and Brazilian (ABNT PR 2030) standards</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5FA037] mt-2 flex-shrink-0"></div>
                        <span>Fraud-resistant certificates with complete traceability</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5FA037] mt-2 flex-shrink-0"></div>
                        <span>Integrated carbon offset marketplace</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className={`${breakpoints.isXs ? 'text-lg' : 'text-xl'} font-medium text-[#044050] ${breakpoints.isMobile ? 'mb-4' : 'mb-6'}`}>Who We Serve</h3>
                    <ul className={`space-y-3 ${breakpoints.isXs ? 'text-sm' : 'text-base'} text-gray-600 font-light`}>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5FA037] mt-2 flex-shrink-0"></div>
                        <span>European SMEs requiring CSRD compliance</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5FA037] mt-2 flex-shrink-0"></div>
                        <span>Environmentally conscious individuals worldwide</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5FA037] mt-2 flex-shrink-0"></div>
                        <span>Large corporations validating supplier chains</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5FA037] mt-2 flex-shrink-0"></div>
                        <span>Reforestation projects seeking credibility</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Recognition & Certifications */}
      <section className={`${sectionPadding} relative bg-slate-50`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-16' : 'mb-20'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Recognition & Certifications
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Certified</span>
              <br />
              <span className="font-normal text-[#5FA037]">excellence</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'ISO 14001',
                subtitle: 'Environmental Management',
                description: 'International certification for environmental management systems'
              },
              {
                icon: CheckCircle2,
                title: 'OSCIP',
                subtitle: 'Public Interest',
                description: 'Civil Society Organization of Public Interest status'
              },
              {
                icon: Shield,
                title: 'Patent Filed',
                subtitle: 'Innovation Protection',
                description: 'Computational system for automated ESG certification'
              },
              {
                icon: Star,
                title: 'Scientific Partners',
                subtitle: 'Academic Credibility',
                description: 'Partnerships with leading botanical gardens and universities'
              }
            ].map((cert, index) => {
              const CertIcon = cert.icon
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
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <CertIcon className="w-8 h-8 text-[#5FA037]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-light text-[#044050] mb-1 tracking-tight">{cert.title}</h3>
                  <p className="text-xs font-light text-gray-400 mb-3 tracking-wide">{cert.subtitle}</p>
                  <p className="text-sm font-light text-gray-600 leading-relaxed">{cert.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Innovation Lab */}
      <section className={`${sectionPadding} relative bg-white`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-16' : 'mb-20'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Innovation Lab
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Pioneering</span>
              <br />
              <span className="font-normal text-[#5FA037]">research & development</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              Dedicated research centers driving innovation in AI, blockchain, and sustainability science
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                location: 'Porto, Portugal',
                title: 'R&D Center',
                focus: 'AI & Product Innovation',
                areas: ['Machine Learning', 'NLP Development', 'Computer Vision', 'Algorithm Optimization']
              },
              {
                location: 'Barcelona, Spain',
                title: 'AI Lab',
                focus: 'Applied Research',
                areas: ['University Partnerships', 'Academic Research', 'Data Science', 'Innovation Pipeline']
              },
              {
                location: 'São Paulo, Brazil',
                title: 'Operations Hub',
                focus: 'Methodology Development',
                areas: ['ESG Frameworks', 'Carbon Calculation', 'Validation Protocols', 'Impact Measurement']
              }
            ].map((lab, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#5FA037]">
                    <Target className="w-7 h-7 text-[#5FA037] transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <p className="text-xs font-light text-gray-400 tracking-wide mb-2">{lab.location}</p>
                  <h3 className="text-2xl font-light text-[#044050] mb-2 tracking-tight">{lab.title}</h3>
                  <p className="text-sm font-medium text-gray-600 mb-6">{lab.focus}</p>
                </div>
                <div className="space-y-3">
                  {lab.areas.map((area, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                      <p className="text-sm font-light text-gray-500">{area}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Impact & SDGs */}
      <section className={`${sectionPadding} relative bg-slate-50`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-16' : 'mb-20'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Social Impact
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Contributing to</span>
              <br />
              <span className="font-normal text-[#5FA037]">global goals</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed mb-12`}
            >
              Aligned with 7 United Nations Sustainable Development Goals
            </motion.p>
          </div>

          {/* Impact Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { value: '2M+', label: 'tCO₂e Target by 2031', icon: Leaf },
              { value: '8+', label: 'Countries Presence', icon: Globe },
              { value: '95', label: 'Team Members Goal', icon: TrendingUp },
              { value: '€1B+', label: 'Valuation Target', icon: Target }
            ].map((metric, index) => {
              const MetricIcon = metric.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="mb-4 flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <MetricIcon className="w-6 h-6 text-[#5FA037]" />
                    </div>
                  </div>
                  <div className="text-4xl md:text-5xl font-extralight text-[#044050] mb-2 tracking-tight">{metric.value}</div>
                  <p className="text-xs font-light text-gray-500">{metric.label}</p>
                </motion.div>
              )
            })}
          </div>

          {/* SDGs Grid - Large Cards */}
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-xs font-medium text-gray-400 uppercase tracking-[0.25em] mb-6"
            >
              Real Impact
            </motion.p>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-light text-[#044050] mb-3 tracking-tight"
            >
              <span className="font-light">Contribution to </span>
              <span className="text-[#5FA037] font-light">SDGs</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-base text-gray-600 font-light"
            >
              Aligned with the UN Sustainable Development Goals
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                number: '13', 
                name: 'Climate Action',
                subtitle: 'Climate Action',
                color: 'bg-[#044050]',
                icon: Globe
              },
              { 
                number: '15', 
                name: 'Life on Land',
                subtitle: 'Life on Land',
                color: 'bg-[#5FA037]',
                icon: Leaf
              },
              { 
                number: '8', 
                name: 'Decent Work',
                subtitle: 'Decent Work',
                color: 'bg-slate-700',
                icon: TrendingUp
              },
              { 
                number: '17', 
                name: 'Partnerships',
                subtitle: 'Partnerships',
                color: 'bg-[#044050]',
                icon: Target
              }
            ].map((sdg, index) => {
              const SdgIcon = sdg.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className={`${sdg.color} rounded-3xl p-10 text-white flex flex-col items-center justify-center aspect-square transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
                    <SdgIcon className="w-16 h-16 mb-6 opacity-90" />
                    <span className="text-7xl font-extralight mb-4">{sdg.number}</span>
                    <span className="text-xs font-light tracking-wider opacity-90 uppercase">{sdg.subtitle}</span>
                  </div>
                  <p className="text-center text-sm font-light text-gray-600 mt-4">{sdg.name}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

          {/* Team Section - Modern Design */}
      <TeamSection 
        members={teamMembers}
        title="Experts"
        titleHighlight="in sustainability"
        subtitle="Our multidisciplinary team combines technical expertise and scientific knowledge with strategy, legal insight, finance, sustainability, and operations to revolutionize ESG certification through innovative AI, blockchain, and data-driven solutions, transforming ESG commitments into verifiable, transparent, and impactful outcomes."
      />

      {/* Transparency & Commitment */}
      <section className={`${sectionPadding} relative bg-white`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-16' : 'mb-20'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Transparency & Governance
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Built on</span>
              <br />
              <span className="font-normal text-[#5FA037]">trust & accountability</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed mb-12`}
            >
              Our commitment to transparency isn't just a value — it's embedded in every layer of our technology and governance
            </motion.p>
          </div>

          {/* Anti-Greenwashing Pledge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#044050] rounded-3xl p-10 mb-12 text-white text-center"
          >
            <Shield className="w-16 h-16 mx-auto mb-6 text-[#5FA037]" />
            <h3 className="text-2xl font-light mb-4 tracking-tight">Anti-Greenwashing Pledge</h3>
            <p className="text-base font-light opacity-90 leading-relaxed max-w-3xl mx-auto">
              We pledge to combat greenwashing through scientific validation, blockchain transparency, and independent audits. 
              Every certificate we issue is backed by verifiable data and third-party scientific institutions.
            </p>
          </motion.div>

          {/* Governance Grid */}
          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1 gap-8' : 'md:grid-cols-2 lg:grid-cols-4 gap-8'}`}>
            {[
              {
                icon: CheckCircle2,
                title: 'Independent Audits',
                description: 'Annual audits by recognized third-party institutions',
                items: ['Financial transparency', 'Impact verification', 'Technical validation']
              },
              {
                icon: BarChart3,
                title: 'Public Dashboard',
                description: 'Real-time metrics accessible to all stakeholders',
                items: ['CO₂ offset tracking', 'Certificate issuance', 'Impact metrics']
              },
              {
                icon: Shield,
                title: 'Impact Advisory Board',
                description: 'Independent experts ensuring technical excellence',
                items: ['Scientific rigor', 'Methodology review', 'Anti-greenwashing']
              },
              {
                icon: FileText,
                title: 'Annual Reports',
                description: 'Comprehensive socio-environmental impact reports',
                items: ['ESG performance', 'Financial results', 'Sustainability goals']
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
                  className="group"
                >
                  <div className="mb-6 flex justify-center">
                    <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:bg-[#5FA037]">
                      <ItemIcon className="w-7 h-7 text-[#5FA037] transition-colors duration-300 group-hover:text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-light text-[#044050] mb-2 tracking-tight text-center">{item.title}</h3>
                  <p className="text-sm font-light text-gray-500 mb-4 text-center">{item.description}</p>
                  <div className="space-y-2">
                    {item.items.map((subitem, i) => (
                      <div key={i} className="flex items-center gap-2 justify-center">
                        <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                        <p className="text-xs font-light text-gray-500">{subitem}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Blockchain Transparency Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 bg-slate-50 rounded-2xl p-8 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Cpu className="w-6 h-6 text-[#5FA037]" />
              <h4 className="text-lg font-light text-[#044050]">Immutable Blockchain Records</h4>
            </div>
            <p className="text-sm font-light text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Every certificate is registered on Polygon blockchain as an NFT with embedded scientific metadata, 
              ensuring permanent, tamper-proof verification accessible to anyone via public blockchain explorers
            </p>
          </motion.div>
        </div>
      </section>

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
              Our mission is to democratize ESG certification, making sustainability <span className="font-medium text-[#5FA037]">accessible</span>, <span className="font-medium text-[#5FA037]">transparent</span>, and <span className="font-medium text-[#5FA037]">verifiable</span> for companies and individuals worldwide.
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
                <div className={`${breakpoints.isXs ? 'text-3xl' : breakpoints.isMobile ? 'text-4xl' : 'text-5xl'} font-extralight text-[#5FA037] mb-1`}>3 weeks</div>
                <div className={`${breakpoints.isXs ? 'text-xs' : 'text-sm'} text-white/70 uppercase tracking-wider font-medium`}>Processing</div>
              </div>
              <div className="text-center">
                <div className={`${breakpoints.isXs ? 'text-3xl' : breakpoints.isMobile ? 'text-4xl' : 'text-5xl'} font-extralight text-[#5FA037] mb-1`}>100%</div>
                <div className={`${breakpoints.isXs ? 'text-xs' : 'text-sm'} text-white/70 uppercase tracking-wider font-medium`}>Transparent</div>
              </div>
              <div className="text-center">
                <div className={`${breakpoints.isXs ? 'text-3xl' : breakpoints.isMobile ? 'text-4xl' : 'text-5xl'} font-extralight text-[#5FA037] mb-1`}>&lt;€0.01</div>
                <div className={`${breakpoints.isXs ? 'text-xs' : 'text-sm'} text-white/70 uppercase tracking-wider font-medium`}>Per Certificate</div>
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