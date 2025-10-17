"use client"

import { useState, useEffect } from 'react'
import { Button } from '../../components/ui/button'
import { ArrowRight, TrendingUp, Users, Globe, Shield, Target, Rocket, BarChart3, CheckCircle2, Star, Mail, Calendar, X, Cpu, Leaf, DollarSign, FileText } from 'lucide-react'
import { Navbar } from '../../components/navbar'
import { motion } from 'framer-motion'
import SplineBackground from '../../components/spline-background'
import { useRouter } from 'next/navigation'
import TeamSection from '../../components/ui/team'
import { teamMembers } from '../../lib/team-data'
import Footer from '../../components/ui/footer'
import { auth } from '../../lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getInvestor } from '../../lib/firebase-helpers'
import { DocumentsSheet } from '../../components/ui/documents-sheet'
import Image from 'next/image'

// Interface para breakpoints inteligentes
interface ScreenBreakpoints {
  isXs: boolean
  isSm: boolean
  isMd: boolean
  isTablet: boolean
  isLg: boolean
  isXl: boolean
  isShortHeight: boolean
  isMediumHeight: boolean
  isTallHeight: boolean
  isMobile: boolean
  isDesktop: boolean
  width: number
  height: number
}

// Hook de breakpoints inteligentes (mesmo da homepage)
const useSmartBreakpoints = (): ScreenBreakpoints => {
  const [viewport, setViewport] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateViewport()
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

// Função para obter layout inteligente
const getSmartLayout = (breakpoints: ScreenBreakpoints) => {
  const { isXs, isSm, isMd, isTablet, isLg, isMobile } = breakpoints

  if (isXs) {
    return {
      containerClass: 'min-h-screen-fixed flex flex-col justify-start items-center',
      heroContentClass: 'px-3 py-2',
      heroSpacing: 'pt-16 pb-6',
      titleSize: 'text-3xl',
      subtitleSize: 'text-base',
      buttonSize: 'h-11 text-sm w-full max-w-[280px]',
      spacingY: 'space-y-3',
      sectionPadding: 'py-12',
      containerPadding: 'px-3',
      maxWidth: 'max-w-sm',
      sectionTitleSize: 'text-2xl',
      sectionTextSize: 'text-sm',
      gridCols: 'grid-cols-1',
      gap: 'gap-4'
    }
  }

  if (isSm) {
    return {
      containerClass: 'min-h-screen-fixed flex flex-col justify-start items-center',
      heroContentClass: 'px-4 py-4',
      heroSpacing: 'pt-20 pb-6',
      titleSize: 'text-4xl',
      subtitleSize: 'text-lg',
      buttonSize: 'h-12 text-base w-full max-w-[320px]',
      spacingY: 'space-y-4',
      sectionPadding: 'py-16',
      containerPadding: 'px-4',
      maxWidth: 'max-w-md',
      sectionTitleSize: 'text-2xl',
      sectionTextSize: 'text-base',
      gridCols: 'grid-cols-1',
      gap: 'gap-5'
    }
  }

  if (isMd) {
    return {
      containerClass: 'min-h-screen-fixed flex flex-col justify-start items-center',
      heroContentClass: 'px-6 py-4',
      heroSpacing: 'pt-20 pb-8',
      titleSize: 'text-5xl',
      subtitleSize: 'text-2xl',
      buttonSize: 'h-12 text-base w-full max-w-[340px]',
      spacingY: 'space-y-6',
      sectionPadding: 'py-20',
      containerPadding: 'px-6',
      maxWidth: 'max-w-2xl',
      sectionTitleSize: 'text-3xl',
      sectionTextSize: 'text-base',
      gridCols: 'grid-cols-2',
      gap: 'gap-6'
    }
  }

  if (isTablet) {
    return {
      containerClass: 'min-h-screen-fixed flex flex-col justify-center items-center',
      heroContentClass: 'px-8 py-10',
      heroSpacing: 'pt-16 pb-12',
      titleSize: 'text-5xl md:text-6xl',
      subtitleSize: 'text-2xl',
      buttonSize: 'h-12 text-lg min-w-[210px]',
      spacingY: 'space-y-7',
      sectionPadding: 'py-24',
      containerPadding: 'px-8',
      maxWidth: 'max-w-5xl',
      sectionTitleSize: 'text-3xl md:text-4xl',
      sectionTextSize: 'text-lg',
      gridCols: 'grid-cols-2 lg:grid-cols-3',
      gap: 'gap-8'
    }
  }

  if (isLg) {
    return {
      containerClass: 'min-h-screen-fixed flex flex-col justify-center items-center',
      heroContentClass: 'px-8 py-12',
      heroSpacing: 'pt-16 md:pt-0',
      titleSize: 'text-6xl md:text-7xl',
      subtitleSize: 'text-2xl md:text-3xl',
      buttonSize: 'h-12 sm:h-14 text-base sm:text-lg min-w-[220px]',
      spacingY: 'space-y-6 md:space-y-8',
      sectionPadding: 'py-24',
      containerPadding: 'px-8',
      maxWidth: 'max-w-6xl',
      sectionTitleSize: 'text-4xl',
      sectionTextSize: 'text-lg',
      gridCols: 'grid-cols-2 lg:grid-cols-4',
      gap: 'gap-8'
    }
  }

  // Desktop grande
  return {
    containerClass: 'min-h-screen-fixed flex flex-col justify-center items-center',
    heroContentClass: 'px-4 sm:px-6 lg:px-8 py-12',
    heroSpacing: 'pt-16 md:pt-0',
    titleSize: 'text-4xl sm:text-5xl md:text-8xl',
    subtitleSize: 'text-xl sm:text-2xl md:text-3xl',
    buttonSize: 'h-12 sm:h-14 text-base sm:text-lg min-w-[220px]',
    spacingY: 'space-y-6 md:space-y-8',
    sectionPadding: 'py-24',
    containerPadding: 'px-4 sm:px-6 lg:px-8',
    maxWidth: 'max-w-7xl',
    sectionTitleSize: 'text-4xl',
    sectionTextSize: 'text-lg',
    gridCols: 'grid-cols-2 lg:grid-cols-4',
    gap: 'gap-8'
  }
}

export default function InvestidoresPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const breakpoints = useSmartBreakpoints()

  // Verificar acesso antes de mostrar conteúdo
  useEffect(() => {
    // Check if Firebase auth is initialized
    if (!auth) {
      console.error('Firebase auth not initialized yet')
      setLoading(false)
      return
    }

    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/investors/login')
        return
      }

      try {
        const investor = await getInvestor(user.uid)
        
        if (!investor) {
          router.push('/investors/login')
          return
        }

        // Verificar status do investidor
        if (investor.status === 'pending_nda') {
          router.push('/investors/nda')
          return
        }

        if (investor.status === 'pending_approval') {
          router.push('/investors/pending-approval')
          return
        }

        if (investor.status === 'rejected') {
          alert('Your account has been rejected. Please contact support.')
          await auth.signOut()
          router.push('/investors/login')
          return
        }

        if (investor.status === 'approved') {
          setHasAccess(true)
          setMounted(true)
          setLoading(false)
        }
      } catch (err) {
        console.error('Error checking investor status:', err)
        router.push('/investors/login')
      }
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [router])

  // Fix viewport height for mobile
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    setViewportHeight()
    window.addEventListener('resize', setViewportHeight)
    window.addEventListener('orientationchange', setViewportHeight)

    return () => {
      window.removeEventListener('resize', setViewportHeight)
      window.removeEventListener('orientationchange', setViewportHeight)
    }
  }, [])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#044050] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  const {
    containerClass,
    heroContentClass,
    heroSpacing,
    titleSize,
    subtitleSize,
    buttonSize,
    spacingY,
    sectionPadding,
    containerPadding,
    maxWidth,
    sectionTitleSize,
    sectionTextSize,
    gridCols,
    gap
  } = getSmartLayout(breakpoints)

  return (
    <div className="relative">
      <Navbar />
      
      {/* Hero Section - Fixed Background */}
      <section 
        className={`fixed inset-0 ${containerClass} ${heroSpacing} h-screen`}
        style={{ paddingBottom: '120px' }}
      >
        {/* Background color */}
        <div className="absolute inset-0 bg-[#044050]" />
        
        <div className="absolute inset-0 overflow-hidden">
          {/* Spline Background */}
          <SplineBackground />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 backdrop-blur-[0.5px]" style={{ zIndex: 2 }} />
        </div>
        
        <div className={`relative ${containerClass}`} style={{ zIndex: 10 }}>
          <div 
            className={`w-full max-w-6xl mx-auto text-center ${heroContentClass}`}
          >
            <div className={spacingY}>
              {/* Badge */}
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
                  Investment Opportunity
                </motion.div>
              </motion.div>
              
              {/* Título principal */}
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
                    The Future
                  </motion.span>
                  <br />
                  <motion.span 
                    className="inline-block font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                  >
                    of ESG
                  </motion.span>
                </motion.h1>
                
                {/* Linha decorativa */}
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
                  €8.5B Market Opportunity
                </motion.p>
              </motion.div>
              
              {/* Descrição */}
              <motion.div 
                className={`${breakpoints.isMobile ? 'mt-10' : 'mt-12'} ${breakpoints.isMobile ? 'max-w-[90%]' : 'max-w-3xl'} mx-auto px-4`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 1.6, 
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <p className={`${breakpoints.isXs ? 'text-sm' : breakpoints.isMobile ? 'text-base' : 'text-xl'} font-light leading-relaxed text-white/95 drop-shadow-md`}>
                  First-mover advantage in automated ESG certification<br />
                  for 2.4 million European SMEs
                </p>
              </motion.div>
              
              {/* Botões */}
              <motion.div 
                className={`${breakpoints.isMobile ? 'mt-10' : 'mt-14'} flex ${breakpoints.isMobile ? 'flex-col' : 'flex-row'} items-center justify-center ${breakpoints.isMobile ? 'gap-3' : 'gap-4'} ${breakpoints.isMobile ? 'px-6' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 2.0, 
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 2.2, 
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={breakpoints.isMobile ? 'w-full' : ''}
                >
                  <Button 
                    size="lg" 
                    onClick={() => {
                      const contactSection = document.getElementById('contact')
                      contactSection?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className={`group ${breakpoints.isMobile ? 'w-full' : 'min-w-[200px] px-8'} ${
                      breakpoints.isXs 
                        ? 'h-11 text-sm' 
                        : breakpoints.isMobile 
                        ? 'h-12 text-base' 
                        : 'h-[52px] text-base'
                    } rounded-full transition-all duration-500 bg-[#5FA037] text-white hover:bg-[#4d8c2d] font-normal tracking-tight shadow-md hover:shadow-lg hover:shadow-[#5FA037]/25 border-0 relative overflow-hidden`}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    
                    <span className="relative flex items-center justify-center gap-2.5">
                      <span className="font-medium">Schedule a Meeting</span>
                      <Calendar className={`${breakpoints.isXs ? 'h-4 w-4' : 'h-[18px] w-[18px]'} transition-transform duration-300 group-hover:translate-x-0.5 group-hover:scale-105`} />
                    </span>
                  </Button>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 2.4, 
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={breakpoints.isMobile ? 'w-full' : ''}
                >
                  <Button 
                    size="lg" 
                    variant="ghost"
                    onClick={() => router.push('/')}
                    className={`group ${breakpoints.isMobile ? 'w-full' : 'min-w-[200px] px-8'} ${
                      breakpoints.isXs 
                        ? 'h-11 text-sm' 
                        : breakpoints.isMobile 
                        ? 'h-12 text-base' 
                        : 'h-[52px] text-base'
                    } rounded-full transition-all duration-500 text-white hover:bg-white/[0.08] border border-white/20 hover:border-white/40 font-normal tracking-tight backdrop-blur-md bg-white/[0.03] relative overflow-hidden`}
                  >
                    <span className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <span className="relative flex items-center justify-center gap-2.5">
                      <span className="font-medium">View Platform</span>
                      <ArrowRight className={`${breakpoints.isXs ? 'h-4 w-4' : 'h-[18px] w-[18px]'} transition-transform duration-300 group-hover:translate-x-1`} />
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Container */}
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
      
      {/* Investment Ask - NEW SECTION */}
      <section className={`${sectionPadding} relative bg-white rounded-t-[48px]`}>
        {breakpoints.isMobile && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-300 rounded-full z-10" />
        )}
        
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-12' : 'mb-20'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Investment Opportunity
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-3xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Series Seed Round</span>
              <br />
              <span className="font-normal text-[#5FA037]">€1M Investment</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-base' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-3xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              Initial funding to launch MVP and validate market
              <br />
              <span className="text-[#5FA037] font-medium">Target ROI: 7-8x in 5 years (50%+ IRR)</span>
            </motion.p>
          </div>

          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : breakpoints.isTablet ? 'grid-cols-2' : 'grid-cols-3'} ${breakpoints.isMobile ? 'gap-6' : 'gap-8'} mb-16`}>
            {[
              {
                label: "Investment",
                value: "€1M",
                detail: "Series Seed Round"
              },
              {
                label: "Target ROI",
                value: "7-8x",
                detail: "in 5 years"
              },
              {
                label: "IRR",
                value: "50%+",
                detail: "Annual return"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group bg-slate-50/50 backdrop-blur-sm rounded-3xl ${breakpoints.isMobile ? 'p-6' : 'p-8'} border border-gray-200/50 text-center hover:border-[#044050]/20 transition-all duration-500 hover:shadow-lg`}
              >
                <p className={`${breakpoints.isMobile ? 'text-xs' : 'text-xs'} text-gray-500 font-medium uppercase tracking-[0.15em] ${breakpoints.isMobile ? 'mb-3' : 'mb-4'}`}>{item.label}</p>
                <p className={`${breakpoints.isMobile ? 'text-3xl' : 'text-5xl'} font-extralight text-[#044050] ${breakpoints.isMobile ? 'mb-1' : 'mb-2'} tracking-tight`}>{item.value}</p>
                <p className={`${breakpoints.isMobile ? 'text-xs' : 'text-sm'} text-gray-600 font-light`}>{item.detail}</p>
              </motion.div>
            ))}
          </div>

          {/* Exit Scenarios */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h3 className="text-2xl font-light text-[#044050] text-center mb-12 tracking-tight">Exit Scenarios (2029-2030)</h3>
            <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-6`}>
              {[
                {
                  scenario: "Conservative",
                  valuation: "€50-80M",
                  multiple: "12-18x EBITDA",
                  return: "~3-4x ROI"
                },
                {
                  scenario: "Base Case",
                  valuation: "€130M",
                  multiple: "20x revenue",
                  return: "~7-8x ROI"
                },
                {
                  scenario: "Optimistic",
                  valuation: "€200M+",
                  multiple: "Unicorn potential",
                  return: "12x+ ROI"
                }
              ].map((exit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className={`group bg-slate-50/50 backdrop-blur-sm rounded-3xl p-8 border transition-all duration-500 hover:shadow-lg ${
                    index === 1 
                      ? 'border-[#5FA037]/30 bg-[#5FA037]/5' 
                      : 'border-gray-200/50 hover:border-[#044050]/20'
                  }`}
                >
                  <p className={`text-xs font-medium uppercase tracking-[0.15em] mb-6 ${
                    index === 1 ? 'text-[#5FA037]' : 'text-gray-500'
                  }`}>{exit.scenario}</p>
                  <p className="text-4xl font-extralight text-[#044050] mb-3 tracking-tight">{exit.valuation}</p>
                  <p className="text-sm text-gray-600 font-light mb-2">{exit.multiple}</p>
                  <p className={`text-base font-light ${
                    index === 1 ? 'text-[#5FA037]' : 'text-gray-700'
                  }`}>{exit.return}</p>
                </motion.div>
              ))}
                </div>
          </motion.div>
        </div>
      </section>

      {/* The Problem - NEW SECTION */}
      <section className={`${sectionPadding} relative bg-white`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-12' : 'mb-24'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              The Problem
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-3xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Barriers to</span>
              <br />
              <span className="font-normal text-[#5FA037]">ESG certification</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-base' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-3xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              Critical challenges preventing SMEs from achieving sustainable compliance
            </motion.p>
          </div>

          {/* Main Problems Grid */}
          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : 'grid-cols-2'} ${breakpoints.isMobile ? 'gap-6' : 'gap-8'} mb-20 max-w-6xl mx-auto`}>
            {[
              {
                title: "Prohibitive Costs",
                stat: "€45-60",
                unit: "per tCO₂e",
                description: "Only 5% of European SMEs can afford full ESG certifications",
                impact: "Market exclusion and competitive disadvantage"
              },
              {
                title: "Bureaucratic Complexity",
                stat: "6-12",
                unit: "months",
                description: "Manual processes with extensive documentation requirements",
                impact: "Delays and discourages smaller companies"
              },
              {
                title: "Lack of Transparency",
                stat: "68%",
                unit: "mistrust",
                description: "Consumers question credibility of current certifications",
                impact: "Trust deficit and greenwashing concerns"
              },
              {
                title: "Standards Fragmentation",
                stat: "Multiple",
                unit: "frameworks",
                description: "GRI, TCFD, SASB, CSRD, ABNT - confusion and complexity",
                impact: "Increased costs for multi-market operations"
              }
            ].map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative bg-slate-50/50 backdrop-blur-sm rounded-3xl ${breakpoints.isMobile ? 'p-6' : 'p-8'} border border-gray-200/50 hover:border-[#044050]/20 transition-all duration-500 hover:shadow-lg`}
              >
                {/* Title */}
                <h3 className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} font-medium text-[#044050] ${breakpoints.isMobile ? 'mb-4' : 'mb-6'} tracking-tight`}>{problem.title}</h3>
                
                {/* Large Stat */}
                <div className={`${breakpoints.isMobile ? 'mb-4' : 'mb-6'}`}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className={`${breakpoints.isMobile ? 'text-3xl' : 'text-5xl'} font-extralight text-[#5FA037] tracking-tight`}>{problem.stat}</span>
                  </div>
                  <p className={`${breakpoints.isMobile ? 'text-xs' : 'text-sm'} text-gray-500 font-light tracking-wide`}>{problem.unit}</p>
                </div>

                {/* Description */}
                <p className={`${breakpoints.isMobile ? 'text-sm' : 'text-base'} text-gray-700 font-light leading-relaxed ${breakpoints.isMobile ? 'mb-3' : 'mb-4'}`}>
                  {problem.description}
                </p>
                
                {/* Impact - subtle */}
                <p className={`${breakpoints.isMobile ? 'text-xs' : 'text-sm'} text-gray-500 font-light italic leading-relaxed`}>
                  {problem.impact}
                </p>
              </motion.div>
              ))}
            </div>

          {/* Impact Section - Clean & Minimal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-slate-50/50 backdrop-blur-sm rounded-3xl p-12 border border-gray-200/50">
              <h3 className="text-2xl font-light text-[#044050] mb-10 text-center tracking-tight">
                Impact on SMEs
              </h3>
              
              <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : 'grid-cols-2'} ${breakpoints.isMobile ? 'gap-6' : 'gap-x-12 gap-y-8'}`}>
                {[
                  { text: "Market exclusion from supply chains" },
                  { text: "Limited access to green financing" },
                  { text: "Loss of competitiveness" },
                  { text: "Unable to communicate sustainability" }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                      <X className="w-3.5 h-3.5 text-red-600" strokeWidth={2.5} />
                    </div>
                    <span className="text-base text-gray-700 font-light leading-relaxed">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className={`${sectionPadding} relative bg-white`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-12' : 'mb-24'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Market Opportunity
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-3xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Massive market,</span>{' '}
              <span className="font-normal text-[#5FA037]">perfect timing</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-base' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              CSRD mandate creates unprecedented demand for automated ESG certification
            </motion.p>
          </div>

          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : breakpoints.isTablet ? 'grid-cols-2' : 'grid-cols-4'} ${breakpoints.isMobile ? 'gap-6' : 'gap-8'} max-w-6xl mx-auto`}>
            {[
              {
                icon: Users,
                value: "25M",
                label: "European SMEs",
                description: ">99% of EU companies need CSRD certification"
              },
              {
                icon: DollarSign,
                value: "€8B",
                label: "Market Size",
                description: "Global ESG certification market by 2030"
              },
              {
                icon: TrendingUp,
                value: "18%",
                label: "CAGR",
                description: "Annual market growth through 2030"
              },
              {
                icon: Target,
                value: "€45-60",
                label: "Current Cost",
                description: "Per tCO₂e vs our €35 (40% savings)"
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
                className={`group text-center bg-slate-50/50 backdrop-blur-sm rounded-3xl ${breakpoints.isMobile ? 'p-6' : 'p-8'} border border-gray-200/50 hover:border-[#044050]/20 transition-all duration-500 hover:shadow-lg`}
              >
                  <div className={`${breakpoints.isMobile ? 'mb-4' : 'mb-6'} flex justify-center`}>
                    <div className={`${breakpoints.isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-2xl bg-[#044050] flex items-center justify-center transition-all duration-500 group-hover:bg-[#5FA037]`}>
                      <ItemIcon className={`${breakpoints.isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
                    </div>
                  </div>
                  <div className={`${breakpoints.isMobile ? 'text-3xl' : 'text-5xl'} font-extralight text-[#044050] ${breakpoints.isMobile ? 'mb-2' : 'mb-3'} tracking-tight`}>{item.value}</div>
                  <h3 className={`${breakpoints.isMobile ? 'text-sm' : 'text-base'} font-medium text-[#044050] ${breakpoints.isMobile ? 'mb-2' : 'mb-3'} tracking-tight`}>
                    {item.label}
                  </h3>
                  <p className={`${breakpoints.isMobile ? 'text-xs' : 'text-sm'} text-gray-600 font-light leading-relaxed`}>
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className={`${sectionPadding} relative bg-slate-50`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-12' : 'mb-24'}`}>
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
              className={`${breakpoints.isMobile ? 'text-3xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
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
              className={`${breakpoints.isMobile ? 'text-base' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              Integrated platform for ESG certification and carbon neutralization
            </motion.p>
          </div>

          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : breakpoints.isTablet ? 'grid-cols-2' : 'grid-cols-4'} ${breakpoints.isMobile ? 'gap-6' : 'gap-8'} max-w-6xl mx-auto`}>
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
                className={`group text-center bg-white/50 backdrop-blur-sm rounded-3xl ${breakpoints.isMobile ? 'p-6' : 'p-8'} border border-gray-200/50 hover:border-[#044050]/20 transition-all duration-500 hover:shadow-lg`}
              >
                  <div className={`${breakpoints.isMobile ? 'mb-4' : 'mb-6'} flex justify-center`}>
                    <div className={`${breakpoints.isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-2xl bg-[#044050] flex items-center justify-center transition-all duration-500 group-hover:bg-[#5FA037]`}>
                      <ItemIcon className={`${breakpoints.isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
                    </div>
                  </div>
                  <h3 className={`${breakpoints.isMobile ? 'text-sm' : 'text-base'} font-medium text-[#044050] ${breakpoints.isMobile ? 'mb-2' : 'mb-3'} tracking-tight`}>
                    {item.title}
                  </h3>
                  <p className={`${breakpoints.isMobile ? 'text-xs' : 'text-sm'} text-gray-600 font-light leading-relaxed`}>
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Target Market */}
      <section className={`${sectionPadding} relative bg-white`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-12' : 'mb-24'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Target Market
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-3xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Our audience,</span>{' '}
              <span className="font-normal text-[#5FA037]">our impact</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-base' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              We serve those who want to lead the transition to a greener, more transparent economy
            </motion.p>
          </div>

          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : 'grid-cols-3'} ${breakpoints.isMobile ? 'gap-6' : 'gap-8'} max-w-5xl mx-auto`}>
            {[
              {
                title: "European SMEs",
                number: "€2.3B",
                subtitle: "market",
                description: "Simplified ESG certification in Europe",
                color: "#5FA037"
              },
              {
                title: "Brazilian Market",
                number: "€850M",
                subtitle: "market",
                description: "Growing demand for ESG in Latin America",
                color: "#044050"
              },
              {
                title: "Global Consumers",
                number: "450M",
                subtitle: "users",
                description: "Environmentally conscious individuals worldwide",
                color: "#6B7280"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group bg-white/50 backdrop-blur-sm rounded-3xl ${breakpoints.isMobile ? 'p-6' : 'p-8'} border border-gray-200/50 text-center hover:border-[#044050]/20 transition-all duration-500 hover:shadow-lg`}
              >
                <h3 className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} font-medium text-[#044050] ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight`}>{item.title}</h3>
                
                <div className={`${breakpoints.isMobile ? 'mb-4' : 'mb-6'}`}>
                  <p className={`${breakpoints.isMobile ? 'text-3xl' : 'text-5xl'} font-extralight text-[#044050] mb-1 tracking-tight`}>{item.number}</p>
                  <p className={`${breakpoints.isMobile ? 'text-xs' : 'text-sm'} text-gray-500 font-light`}>{item.subtitle}</p>
                </div>
                
                <p className={`${breakpoints.isMobile ? 'text-xs' : 'text-sm'} text-gray-600 font-light leading-relaxed`}>{item.description}</p>
              </motion.div>
            ))}
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
              <div className="border-b border-gray-200/30 pb-8">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-[#044050] flex items-center justify-center transition-all duration-500 hover:bg-[#5FA037]">
                    <Cpu className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-[#044050] tracking-tight">Artificial Intelligence</h3>
                </div>
                <ul className="space-y-3 ml-[60px]">
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1 h-1 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed font-light">Automatic data extraction from documents</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1 h-1 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed font-light">Accurate calculation of carbon emissions</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1 h-1 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed font-light">Analysis of compliance with multiple standards (CSRD, ABNT, GRI)</span>
                  </li>
                </ul>
              </div>

              {/* Blockchain */}
              <div className="border-b border-gray-200/30 pb-8">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-[#044050] flex items-center justify-center transition-all duration-500 hover:bg-[#5FA037]">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-[#044050] tracking-tight">Blockchain (Polygon)</h3>
                </div>
                <ul className="space-y-3 ml-[60px]">
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1 h-1 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed font-light">NFT certificates with full metadata</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1 h-1 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed font-light">Cost per transaction: &lt; €0.01</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1 h-1 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed font-light">Instant public verification via QR code</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1 h-1 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed font-light">Immutable history of compensation</span>
                  </li>
                </ul>
              </div>

              {/* Scientific Validation */}
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-[#044050] flex items-center justify-center transition-all duration-500 hover:bg-[#5FA037]">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-[#044050] tracking-tight">Scientific Validation</h3>
                </div>
                <ul className="space-y-3 ml-[60px]">
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

      {/* Technical Deep-Dive - NEW SECTION */}
      <section className={`${sectionPadding} relative bg-white`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-12' : 'mb-24'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Technical Architecture
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-3xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Enterprise-grade</span>
              <br />
              <span className="font-normal text-[#5FA037]">technology stack</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-base' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-3xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              Scalable, secure, and future-proof infrastructure built for global deployment
            </motion.p>
          </div>

          <div className="max-w-6xl mx-auto mb-16">
            <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-12`}>
              {/* Frontend */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl p-8 border border-gray-200"
              >
                <h3 className="text-2xl font-semibold text-[#044050] mb-6">Frontend</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#5FA037] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600"><span className="font-medium">React.js 18+</span> with TypeScript (web)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#5FA037] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600"><span className="font-medium">React Native</span> for iOS/Android apps</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#5FA037] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600"><span className="font-medium">Next.js</span> for SEO optimization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#5FA037] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600"><span className="font-medium">Tailwind CSS</span> + Shadcn UI</span>
                  </li>
                </ul>
              </motion.div>

              {/* Backend */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl p-8 border border-gray-200"
              >
                <h3 className="text-2xl font-semibold text-[#044050] mb-6">Backend</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#5FA037] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600"><span className="font-medium">Python 3.10+</span> with FastAPI</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#5FA037] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600"><span className="font-medium">Microservices</span> architecture</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#5FA037] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600"><span className="font-medium">AWS Cloud</span> infrastructure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#5FA037] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600"><span className="font-medium">PostgreSQL</span> + Redis cache</span>
                  </li>
                </ul>
              </motion.div>

              {/* AI/ML */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl p-8 border border-gray-200"
              >
                <h3 className="text-2xl font-semibold text-[#044050] mb-6">AI/ML Engine</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#5FA037] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600"><span className="font-medium">Custom CNN</span> for OCR (98.5% accuracy)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#5FA037] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600"><span className="font-medium">BERT/RoBERTa</span> fine-tuned for ESG</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#5FA037] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600"><span className="font-medium">TensorFlow</span> + PyTorch models</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#5FA037] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600"><span className="font-medium">Hugging Face</span> transformers</span>
                  </li>
                </ul>
              </motion.div>

              {/* Blockchain */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl p-8 border border-gray-200"
              >
                <h3 className="text-2xl font-semibold text-[#044050] mb-6">Blockchain</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#5FA037] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600"><span className="font-medium">Polygon L2</span> for low-cost txs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#5FA037] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600"><span className="font-medium">ERC-721</span> NFT certificates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#5FA037] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600"><span className="font-medium">IPFS</span> for metadata storage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#5FA037] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600"><span className="font-medium">OpenZeppelin</span> standards</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Product Roadmap Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h3 className="text-2xl font-light text-[#044050] text-center mb-16 tracking-tight">Product Evolution Roadmap</h3>
            
            {/* Timeline Container */}
            <div className="relative">
              {/* Vertical Line - Mobile/Tablet */}
              <div className={`absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#5FA037] via-[#044050] to-gray-300 ${breakpoints.isMobile || breakpoints.isTablet ? 'block' : 'hidden'}`} />
              
              <div className="space-y-12">
                {[
                  {
                    version: "MVP v1.0",
                    timeline: "2026",
                    color: "from-[#5FA037] to-[#4d8c2d]",
                    features: [
                      "ESG certification & carbon footprint calculator",
                      "Integrated carbon offset marketplace",
                      "Basic blockchain hash registration",
                      "Document upload & AI extraction (85% accuracy)",
                      "Target: 10-15 pilot clients"
                    ]
                  },
                  {
                    version: "Platform v2.0",
                    timeline: "2027",
                    color: "from-[#044050] to-[#033038]",
                    features: [
                      "CSRD/ESRS compliance modules (12 standards)",
                      "Official NFT certificate issuance",
                      "External auditor invitation system",
                      "Comparative dashboards & benchmarks",
                      "AI accuracy improved to 95%"
                    ]
                  },
                  {
                    version: "Platform v3.0-4.0",
                    timeline: "2028-2029",
                    color: "from-[#5FA037] to-[#4d8c2d]",
                    features: [
                      "Gold Standard & Verra marketplace integration",
                      "IoT meters & utility API integration",
                      "Multi-language support (8+ languages)",
                      "Predictive AI & SBTi calculation",
                      "International expansion (ES, FR, IT, UK, DE)"
                    ]
                  },
                  {
                    version: "Platform v5.0+",
                    timeline: "2030+",
                    color: "from-gray-700 to-gray-500",
                    features: [
                      "Generative AI for report writing",
                      "Multi-chain blockchain support",
                      "ESG Data Marketplace launch",
                      "Real-time IoT certification",
                      "Global operations (10+ countries)"
                    ]
                  }
                ].map((phase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    {/* Mobile/Tablet: Timeline Dot */}
                    <div className={`absolute left-4 top-6 w-2 h-2 rounded-full bg-gradient-to-br ${phase.color} -translate-x-1/2 ring-4 ring-white ${breakpoints.isMobile || breakpoints.isTablet ? 'block' : 'hidden'}`} />
                    
                    {/* Card */}
                    <div className={`group bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 hover:border-[#044050]/20 transition-all duration-500 hover:shadow-xl ${breakpoints.isMobile || breakpoints.isTablet ? 'ml-12' : ''}`}>
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6 gap-4">
                        <div className="flex-1">
                          <h4 className="text-xl font-medium text-[#044050] mb-2 tracking-tight">{phase.version}</h4>
                          <div className={`inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r ${phase.color} text-white text-xs font-medium tracking-wide`}>
                            {phase.timeline}
                          </div>
                        </div>
                        
                        {/* Desktop: Large Version Number */}
                        {!breakpoints.isMobile && !breakpoints.isTablet && (
                          <div className="text-6xl font-extralight text-gray-100 group-hover:text-gray-200 transition-colors">
                            {index + 1}
                          </div>
                        )}
                      </div>
                      
                      {/* Features List */}
                      <ul className="space-y-3">
                        {phase.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className={`w-5 h-5 rounded-lg bg-gradient-to-br ${phase.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-sm text-gray-700 font-light leading-relaxed flex-1">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className={`${sectionPadding} relative bg-slate-50`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-12' : 'mb-24'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Business Model
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-3xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Competitive</span>
              <br />
              <span className="font-normal text-[#5FA037]">advantages</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-base' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              Our solution revolutionizes the market with unique and measurable benefits
            </motion.p>
          </div>
          
          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : breakpoints.isTablet ? 'grid-cols-2' : 'grid-cols-3'} ${breakpoints.isMobile ? 'gap-6' : 'gap-8'} max-w-6xl mx-auto mb-20`}>
            {[
              {
                title: "Cost Reduction",
                number: "40%",
                description: "Cheaper than traditional",
                color: "text-[#5FA037]"
              },
              {
                title: "Implementation Speed",
                number: "75%",
                description: "Faster (weeks vs months)",
                color: "text-[#044050]"
              },
              {
                title: "AI Accuracy",
                number: "98.5%",
                description: "ESG data extraction",
                color: "text-[#5FA037]"
              },
              {
                title: "Blockchain Transparency",
                number: "100%",
                description: "Verifiable certificates",
                color: "text-[#044050]"
              },
              {
                title: "Scientific Validation",
                number: "Plantarum",
                description: "Botanical Garden partnership",
                color: "text-[#5FA037]"
              },
              {
                title: "Market Opportunity",
                number: "€8.5B",
                description: "Annual potential",
                color: "text-[#044050]"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 text-center hover:border-[#044050]/20 transition-all duration-500 hover:shadow-lg"
              >
                <h3 className="text-lg font-medium text-[#044050] mb-8 tracking-tight">{item.title}</h3>
                
                <div className="mb-6">
                  <p className="text-5xl font-extralight text-[#044050] mb-2 tracking-tight">{item.number}</p>
                  <p className="text-sm text-gray-500 font-light">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Comparison Section */}
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className={`text-center ${breakpoints.isMobile ? 'mb-14' : 'mb-16'}`}
            >
              <h3 className={`${breakpoints.isMobile ? 'text-2xl' : 'text-3xl'} font-light text-gray-900 tracking-tight`}>
                Why choose our solution?
              </h3>
            </motion.div>

            <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : 'grid-cols-2'} ${breakpoints.isMobile ? 'gap-6' : 'gap-8'}`}>
              {/* Traditional Solutions */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-shrink-0">
                    <X className="w-6 h-6 text-red-500" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 tracking-tight">Traditional Solutions</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">High costs</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">Slow implementation (months)</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">Lack of transparency</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">Limited validation</span>
                  </li>
                </ul>
              </motion.div>

              {/* Our Solution */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-[#5FA037]" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 tracking-tight">Our Solution</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">40% cheaper</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">75% faster (weeks)</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">100% transparent (blockchain)</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">Scientific validation (Plantarum)</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                    <span className="text-sm leading-relaxed">Dual certification (EU + BR)</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Go-to-Market Strategy - NEW SECTION */}
      <section className={`${sectionPadding} relative bg-white`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-12' : 'mb-24'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Go-to-Market Strategy
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-3xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Phased market</span>
              <br />
              <span className="font-normal text-[#5FA037]">penetration</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-3xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              Strategic expansion from niche validation to global leadership
            </motion.p>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {[
              {
                phase: "Phase 1: Niche Validation",
                year: "2026",
                status: "current",
                focus: "Portuguese tech & service SMEs",
                targets: [
                  "50 pilot companies in Portugal",
                  "Product-market fit validation",
                  "Closed B2C beta (1,000 users)",
                  "Early success stories built"
                ],
                channels: [
                  "Partnerships with business associations",
                  "Free beta programs",
                  "Local sustainability events"
                ]
              },
              {
                phase: "Phase 2: National Scale",
                year: "2027",
                status: "planned",
                focus: "Portugal expansion + Spain entry",
                targets: [
                  "250 B2B clients (PT + ES)",
                  "5,000 active B2C users",
                  "€5.4M ARR",
                  "NPS >50, <5% churn"
                ],
                channels: [
                  "Sector expansion beyond tech",
                  "Spain market launch & localization",
                  "B2C public launch with marketing"
                ]
              },
              {
                phase: "Phase 3: Regional Player",
                year: "2028-2029",
                status: "planned",
                focus: "5 European countries presence",
                targets: [
                  "1,800 B2B customers",
                  "85,000 B2C users",
                  "€24.5M ARR",
                  "Recognized regional brand"
                ],
                channels: [
                  "France, Italy, UK, Germany launches",
                  "Strategic corporate partnerships",
                  "Enterprise API monetization"
                ]
              },
              {
                phase: "Phase 4: Global Leadership",
                year: "2030+",
                status: "planned",
                focus: "10+ countries, market standard",
                targets: [
                  "4,500+ B2B customers",
                  "250,000 B2C users",
                  "€65M revenue",
                  "Unicorn status (€1B+ valuation)"
                ],
                channels: [
                  "Global expansion (BR, MX, Asia)",
                  "Next-gen products (analytics, consulting)",
                  "IPO or strategic acquisition"
                ]
              }
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-slate-50 rounded-2xl p-8 border-2 ${
                  phase.status === 'current' ? 'border-[#5FA037]' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-[#044050] mb-2">{phase.phase}</h3>
                    <p className="text-base text-gray-600 font-light">{phase.focus}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-medium px-4 py-1 rounded-full ${
                      phase.status === 'current' 
                        ? 'bg-[#5FA037] text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {phase.year}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-[#044050] uppercase tracking-wider mb-3">Key Targets</h4>
                    <ul className="space-y-2">
                      {phase.targets.map((target, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#5FA037] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-600 font-light">{target}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[#044050] uppercase tracking-wider mb-3">Channels & Actions</h4>
                    <ul className="space-y-2">
                      {phase.channels.map((channel, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <ArrowRight className="w-4 h-4 text-[#5FA037] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-600 font-light">{channel}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Marketing Strategy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto mt-16"
          >
            <h3 className="text-2xl font-light text-[#044050] text-center mb-12">Marketing Investment (€8.5M over 5 years)</h3>
            <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'} gap-6`}>
              {[
                { channel: "Digital Marketing", percent: "45%", amount: "€3.8M", description: "SEM, SEO, content, social media" },
                { channel: "Events & Conferences", percent: "25%", amount: "€2.1M", description: "Sponsorships, trade shows, launches" },
                { channel: "Partnerships", percent: "20%", amount: "€1.7M", description: "Channel development, co-marketing" },
                { channel: "Branding & PR", percent: "10%", amount: "€0.85M", description: "Media relations, brand awareness" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="text-center mb-4">
                    <p className="text-3xl font-extralight text-[#5FA037] mb-1">{item.percent}</p>
                    <p className="text-sm text-gray-500 font-medium">{item.amount}</p>
                  </div>
                  <h4 className="text-base font-semibold text-[#044050] mb-2">{item.channel}</h4>
                  <p className="text-sm text-gray-600 font-light">{item.description}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-600 font-light mt-8 italic">
              Marketing ROI: ~7.6x over 5-year horizon (13% of cumulative revenue)
            </p>
          </motion.div>
        </div>
      </section>

      {/* Revenue Streams */}
      <section className={`${sectionPadding} relative bg-slate-50`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-12' : 'mb-24'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Business Model
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-3xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Multiple</span>
              <br />
              <span className="font-normal text-[#5FA037]">revenue streams</span>
            </motion.h2>
          </div>
          
          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : breakpoints.isTablet ? 'grid-cols-2' : 'grid-cols-4'} ${breakpoints.isMobile ? 'gap-6' : 'gap-8'}`}>
            {[
              { 
                label: 'B2B Certification', 
                revenue: '€35', 
                unit: 'per tCO₂e', 
                 desc: 'Annual subscription or per-project fees',
                 potential: '€2.3B EU + €850M BR'
              },
              { 
                label: 'B2C Subscription', 
                 revenue: '€5-10', 
                unit: 'per month', 
                 desc: 'Individual carbon footprint tracking',
                 potential: 'Premium features model'
               },
               { 
                 label: 'Enterprise API', 
                 revenue: 'SaaS', 
                 unit: 'model', 
                 desc: 'Integration licensing for large corps',
                 potential: 'Scalable revenue'
              },
              { 
                label: 'Marketplace', 
                 revenue: 'Fee', 
                 unit: 'based', 
                 desc: 'Carbon credit trading platform',
                 potential: 'Transaction fees'
              }
            ].map((stream, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                 className="group bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 hover:border-[#044050]/20 transition-all duration-500 hover:shadow-lg"
               >
                 <p className="text-xs font-medium text-gray-500 uppercase tracking-[0.12em] mb-6">{stream.label}</p>
                 <div className="mb-6 min-h-[80px]">
                   <div className="text-4xl font-extralight text-[#044050] mb-1 tracking-tight break-words">{stream.revenue}</div>
                    <div className="text-sm text-gray-500 font-light">{stream.unit}</div>
                  </div>
                 <p className="text-sm text-gray-600 font-light mb-4 leading-relaxed">{stream.desc}</p>
                 <div className="pt-4 border-t border-gray-200/30">
                    <p className="text-xs font-medium text-[#5FA037]">{stream.potential}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Projections - NEW SECTION */}
      <section className={`${sectionPadding} relative bg-white`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-12' : 'mb-24'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Financial Projections
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-3xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Path to</span>
              <br />
              <span className="font-normal text-[#5FA037]">€65M revenue</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-base' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              Rapid growth trajectory with proven business model and strong unit economics
            </motion.p>
          </div>

          {/* Revenue Evolution */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <div className={`grid grid-cols-7 gap-4 mb-6`}>
                  <div className="font-medium text-sm text-gray-500 uppercase tracking-wider">Year</div>
                  {['2026', '2027', '2028', '2029', '2030', '2031'].map((year) => (
                    <div key={year} className="font-medium text-sm text-gray-900">{year}</div>
                  ))}
                </div>

                {/* Revenue Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-7 gap-4 py-4 border-t border-gray-200"
                >
                  <div className="font-medium text-gray-700">Revenue</div>
                  <div className="text-gray-900">€1.8M</div>
                  <div className="text-gray-900">€5.4M</div>
                  <div className="text-gray-900">€12.5M</div>
                  <div className="text-gray-900">€24.2M</div>
                  <div className="text-gray-900">€41.0M</div>
                  <div className="text-[#5FA037] font-semibold">€65M</div>
                </motion.div>

                {/* EBITDA Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-7 gap-4 py-4 border-t border-gray-200"
                >
                  <div className="font-medium text-gray-700">EBITDA</div>
                  <div className="text-red-600">-€2.2M</div>
                  <div className="text-red-600">-€0.4M</div>
                  <div className="text-[#5FA037]">€4.3M</div>
                  <div className="text-[#5FA037]">€10.7M</div>
                  <div className="text-[#5FA037]">€20.4M</div>
                  <div className="text-[#5FA037] font-semibold">€19.2M</div>
                </motion.div>

                {/* Margin Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-7 gap-4 py-4 border-t border-b border-gray-200"
                >
                  <div className="font-medium text-gray-700">EBITDA %</div>
                  <div className="text-red-600">Negative</div>
                  <div className="text-red-600">-7%</div>
                  <div className="text-gray-900">34%</div>
                  <div className="text-gray-900">44%</div>
                  <div className="text-gray-900">50%</div>
                  <div className="text-[#5FA037] font-semibold">30%</div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Key Milestones */}
          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-8 max-w-5xl mx-auto mb-20`}>
            {[
              {
                year: "2027",
                title: "Break-even",
                description: "Near operational break-even",
                metric: "End of 2027 (Q4)"
              },
              {
                year: "2028",
                title: "Profitability",
                description: "Strong EBITDA positive",
                metric: "€4.3M EBITDA (34%)"
              },
              {
                year: "2031",
                title: "Scale",
                description: "Market leader position",
                metric: "€65M revenue, 30% margin"
              }
            ].map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 hover:border-[#044050]/20 transition-all duration-500 hover:shadow-lg"
              >
                <div className="text-5xl font-extralight text-[#044050] mb-4 tracking-tight">{milestone.year}</div>
                <h3 className="text-lg font-medium text-[#044050] mb-3 tracking-tight">{milestone.title}</h3>
                <p className="text-sm text-gray-600 font-light mb-4 leading-relaxed">{milestone.description}</p>
                <p className="text-base font-medium text-[#5FA037]">{milestone.metric}</p>
              </motion.div>
            ))}
          </div>

          {/* Growth Drivers */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-light text-gray-900 text-center mb-12">Revenue Growth Drivers</h3>
            <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-8`}>
              {[
                {
                  title: "B2B Certification",
                  growth: "50 → 3,000 clients",
                  cagr: "~120% CAGR",
                  revenue: "Core revenue stream"
                },
                {
                  title: "B2C Subscription",
                  growth: "1K → 150K users",
                  cagr: "High growth potential",
                  revenue: "Mass market adoption"
                },
                {
                  title: "Enterprise API",
                  growth: "Scalable licensing",
                  cagr: "High-margin segment",
                  revenue: "Integration revenue"
                },
                {
                  title: "Marketplace",
                  growth: "Commission-based",
                  cagr: "Transaction volume",
                  revenue: "Carbon credit trading"
                }
              ].map((driver, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 hover:border-[#044050]/20 transition-all duration-500 hover:shadow-lg"
                >
                  <h4 className="text-lg font-medium text-[#044050] mb-6 tracking-tight">{driver.title}</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 font-light">Growth:</span>
                      <span className="font-medium text-gray-900">{driver.growth}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 font-light">CAGR:</span>
                      <span className="font-medium text-[#5FA037]">{driver.cagr}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-200/30">
                      <span className="text-gray-500 font-light">Revenue:</span>
                      <span className="font-medium text-gray-900">{driver.revenue}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Risk Analysis & Mitigation - NEW SECTION */}
      <section className={`${sectionPadding} relative bg-slate-50`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-12' : 'mb-24'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Risk Management
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-3xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Proactive</span>
              <br />
              <span className="font-normal text-[#5FA037]">risk mitigation</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-base' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              Comprehensive risk management with clear contingency plans
            </motion.p>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            {[
              {
                risk: "Intense Competition",
                description: "Established players and foreign startups may copy aspects of our solution",
                mitigation: [
                  "Continuous innovation and superior execution speed",
                  "Build defensible network effects (customer bases and projects)",
                  "Establish exclusive partnerships with carbon projects",
                  "Unbeatable user experience and cost-benefit"
                ]
              },
              {
                risk: "Regulatory Changes",
                description: "Changes in ESG standards or public policies may affect demand",
                mitigation: [
                  "Up-to-date Compliance and Regulatory Affairs team",
                  "Modular architecture facilitates quick adaptation",
                  "Diversify geographic markets",
                  "Board members experienced in public policy"
                ]
              },
              {
                risk: "Partnership Dependencies",
                description: "Quality depends on external partners for offset project execution",
                mitigation: [
                  "Careful partner selection through due diligence",
                  "Diversified project portfolio",
                  "Periodic audits and independent monitoring (satellite)",
                  "Provisions to replace credits if needed"
                ]
              },
              {
                risk: "Technology & Security",
                description: "Security breaches or scalability issues could undermine trust",
                mitigation: [
                  "External smart contract audits",
                  "Use of established standards (OpenZeppelin)",
                  "Redundancies and disaster recovery plans",
                  "Flexible cloud architecture with load testing"
                ]
              },
              {
                risk: "Market Adoption",
                description: "Slower adoption due to cultural resistance or economic recession",
                mitigation: [
                  "Emphasize cost reduction (40% cheaper)",
                  "Diversify between B2B and B2C segments",
                  "Flexible business plan adjustments",
                  "Capital reserve and controlled burn rate"
                ]
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 border border-gray-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#044050] mb-2">{item.risk}</h3>
                    <p className="text-sm text-gray-600 font-light mb-4">{item.description}</p>
                  </div>
                </div>
                <div className="ml-12">
                  <p className="text-sm font-medium text-[#5FA037] uppercase tracking-wider mb-3">Mitigation Strategy</p>
                  <ul className="space-y-2">
                    {item.mitigation.map((strategy, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#5FA037] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600 font-light">{strategy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mt-12 text-center"
          >
            <p className="text-base text-gray-600 font-light italic">
              Risk matrix updated quarterly by executive committee. Each risk has designated owners and clear contingency plans.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Traction */}
      <section className={`${sectionPadding} relative bg-white`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-12' : 'mb-24'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Real Impact
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-3xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Transforming</span>
              <br />
              <span className="font-normal text-[#5FA037]">the future</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-base' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              Concrete results with measurable impact
            </motion.p>
          </div>
          
          {/* Impact Metrics - Targets by 2031 */}
          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-2' : 'grid-cols-4'} ${breakpoints.isMobile ? 'gap-8' : 'gap-12'} max-w-5xl mx-auto ${breakpoints.isMobile ? 'mb-16' : 'mb-24'}`}>
            {[
              { value: '2M+', label: 'tCO₂e Target', sublabel: 'Certified/offset by 2031' },
              { value: '8+', label: 'Countries', sublabel: 'Global presence' },
              { value: '95', label: 'Team Members', sublabel: 'Global workforce' },
              { value: '€1B+', label: 'Valuation Target', sublabel: 'Unicorn potential' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group text-center bg-slate-50/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 hover:border-[#044050]/20 transition-all duration-500 hover:shadow-lg"
              >
                <div className="text-5xl font-extralight text-[#044050] mb-4 tracking-tight">{stat.value}</div>
                <div className="text-sm text-gray-700 font-medium mb-2 tracking-tight">{stat.label}</div>
                <div className="text-xs text-gray-500 font-light">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>

          {/* Technology & Traction Metrics */}
          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-2' : 'grid-cols-4'} ${breakpoints.isMobile ? 'gap-6' : 'gap-8'} max-w-5xl mx-auto ${breakpoints.isMobile ? 'mb-16' : 'mb-24'} pt-12 border-t border-gray-200`}>
            {[
              { value: '98.5%', label: 'AI Accuracy', sublabel: 'ESG data extraction' },
              { value: '50+', label: 'Pilot Companies', sublabel: 'Q2 2025 target' },
              { value: '<€0.01', label: 'Blockchain', sublabel: 'Cost per transaction' },
              { value: 'Filed', label: 'Patent', sublabel: 'IP protection secured' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group text-center bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 hover:border-[#044050]/20 transition-all duration-500 hover:shadow-lg"
              >
                <div className="text-4xl font-extralight text-[#044050] mb-3 tracking-tight">{stat.value}</div>
                <div className="text-sm text-gray-700 font-medium mb-2 tracking-tight">{stat.label}</div>
                <div className="text-xs text-gray-500 font-light">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>

          {/* Strategic Roadmap */}
          <div className="max-w-4xl mx-auto">
            <div className={`text-center ${breakpoints.isMobile ? 'mb-12' : 'mb-16'}`}>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4">
                Next Steps
              </p>
              <h3 className={`${breakpoints.isMobile ? 'text-2xl' : 'text-3xl'} font-light tracking-tight leading-[1.1] text-[#044050]`}>
                Strategic roadmap to transform the sustainability market
              </h3>
            </div>

            <div className="space-y-8">
              {[
                { 
                  period: 'Q1 2025', 
                  year: '2025',
                  status: 'completed', 
                  items: [
                    'GreenCheck MVP Launch - Minimum viable product in production',
                    'Patent filed - IP protection secured',
                    'Plantarum Botanical Garden Partnership - Scientific validation'
                  ] 
                },
                { 
                  period: 'Q2 2025', 
                  year: '2025',
                  status: 'current', 
                  items: [
                    '50 SME Pilots - Validation with real companies',
                    'Fundraising round - Strategic capital raise',
                    'Polygon blockchain integration - NFT certification'
                  ] 
                },
                { 
                  period: 'Q1 2026', 
                  year: '2026',
                  status: 'planned', 
                  items: [
                    'EU Expansion - Spain and France market entry',
                    'Marketplace v1 launch - Carbon credit trading platform',
                    '€1M ARR milestone - Revenue traction'
                  ] 
                },
                { 
                  period: '2027-2030', 
                  year: '2027',
                  status: 'planned', 
                  items: [
                    'Expansion and accelerated growth across Europe',
                    'Break-even and profitability',
                    'Market leadership in automated ESG certification'
                  ] 
                }
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 items-start group"
                >
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                      milestone.status === 'completed' 
                        ? 'bg-[#5FA037] border-[#5FA037]' 
                        : milestone.status === 'current' 
                        ? 'bg-[#044050] border-[#044050] animate-pulse shadow-lg shadow-[#044050]/30' 
                        : 'bg-white border-gray-300'
                    }`} />
                    {index < 3 && (
                      <div className={`w-px h-16 mt-2 ${
                        milestone.status === 'completed' 
                          ? 'bg-[#5FA037]/30' 
                          : 'bg-gray-200/50'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-lg font-medium text-[#044050] tracking-tight">{milestone.period}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium transition-all duration-500 ${
                        milestone.status === 'completed' 
                          ? 'bg-[#5FA037]/10 text-[#5FA037]' 
                          : milestone.status === 'current' 
                          ? 'bg-[#044050]/10 text-[#044050]' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {milestone.status === 'completed' ? '✓ Completed' : 
                         milestone.status === 'current' ? '→ In Progress' : 
                         'Planned'}
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {milestone.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-600 font-light flex items-start gap-3 group-hover:text-gray-900 transition-colors leading-relaxed">
                          <span className={`w-1 h-1 rounded-full mt-2 flex-shrink-0 ${
                            milestone.status === 'completed' 
                              ? 'bg-[#5FA037]' 
                              : milestone.status === 'current'
                              ? 'bg-[#044050]'
                              : 'bg-gray-400'
                          }`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Organizational Structure - NEW SECTION */}
      <section className={`${sectionPadding} relative bg-white`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-12' : 'mb-24'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Organizational Structure
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-3xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Global approach,</span>
              <br />
              <span className="font-normal text-[#5FA037]">strategic partnerships</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-3xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              Hybrid structure combining Brazilian expertise with European market access
            </motion.p>
          </div>

          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-12 mb-16`}>
            {/* Bureau Social */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-3xl p-8 border border-gray-200"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-[#044050] mb-2">Bureau Social (Brazil)</h3>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Parent Entity</p>
              </div>
              <div className="mb-6">
                <p className="text-base text-gray-600 font-light mb-4">
                  20+ years of experience in socio-environmental projects, founded in 2009
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#044050] uppercase tracking-wider mb-3">Key Credentials</h4>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                  <span className="text-sm text-gray-600">250+ socio-environmental projects</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                  <span className="text-sm text-gray-600">ISO 14001 certified</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                  <span className="text-sm text-gray-600">REDD+ project experience</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                  <span className="text-sm text-gray-600">Scientific validation partnerships</span>
                </div>
              </div>
            </motion.div>

            {/* ESG Veritas Portugal */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-3xl p-8 border border-gray-200"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-[#044050] mb-2">ESG Veritas Portugal</h3>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Operating Entity</p>
              </div>
              <div className="mb-6">
                <p className="text-base text-gray-600 font-light mb-4">
                  Portuguese startup based in Lisbon, operating entity for European market
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#044050] uppercase tracking-wider mb-3">Strategic Advantages</h4>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                  <span className="text-sm text-gray-600">Access to European single market</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                  <span className="text-sm text-gray-600">Local tax incentives for tech companies</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                  <span className="text-sm text-gray-600">Direct EU regulation compliance</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                  <span className="text-sm text-gray-600">Access to blockchain & AI talent</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Strategic Partnerships */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-light text-[#044050] text-center mb-10">Strategic Partnerships</h3>
            <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-8`}>
              {[
                {
                  name: "Plantarum Botanical Garden",
                  role: "Scientific Validation",
                  description: "Ecological restoration, reforestation protocols, ecosystem services quantification"
                },
                {
                  name: "EcoArts Amazônia",
                  role: "Project Implementation",
                  description: "Territorial implementation, community engagement, reforestation execution"
                }
              ].map((partner, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-200"
                >
                  <h4 className="text-lg font-semibold text-[#044050] mb-2">{partner.name}</h4>
                  <p className="text-sm text-[#5FA037] font-medium mb-3">{partner.role}</p>
                  <p className="text-sm text-gray-600 font-light">{partner.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SDGs Contribution - Enhanced Design */}
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
              Real Impact
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-3xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Aligned with </span>
              <br />
              <span className="font-normal text-[#5FA037]">UN SDGs</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-base' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              6 United Nations Sustainable Development Goals
            </motion.p>
          </div>

          {/* Grid de SDGs - Design igual à homepage */}
          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} ${breakpoints.isMobile ? 'gap-4' : 'gap-8'} max-w-6xl mx-auto`}>
            {[
              { 
                number: '13', 
                name: 'Climate Action',
                image: '/assets/SDG LOGO/E_SDG_PRINT-13.jpg',
                color: '#4E7A47'
              },
              { 
                number: '15', 
                name: 'Life on Land',
                image: '/assets/SDG LOGO/E_SDG_PRINT-15.jpg',
                color: '#3DAE4A'
              },
              { 
                number: '8', 
                name: 'Decent Work & Economic Growth',
                image: '/assets/SDG LOGO/E_SDG_PRINT-08.jpg',
                color: '#972E47'
              },
              { 
                number: '9', 
                name: 'Industry, Innovation & Infrastructure',
                image: '/assets/SDG LOGO/E_SDG_PRINT-09.jpg',
                color: '#F16E25'
              },
              { 
                number: '12', 
                name: 'Responsible Consumption & Production',
                image: '/assets/SDG LOGO/E_SDG_PRINT-12.jpg',
                color: '#CD8C2E'
              },
              { 
                number: '17', 
                name: 'Partnerships for the Goals',
                image: '/assets/SDG LOGO/E_SDG_PRINT-17.jpg',
                color: '#28426E'
              }
            ].map((sdg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="group"
              >
                <div className={`bg-white/80 backdrop-blur-sm rounded-2xl ${breakpoints.isMobile ? 'p-3' : 'p-6'} flex flex-col items-center transition-all duration-300 hover:shadow-lg border border-gray-50/50 ${breakpoints.isMobile ? 'h-[280px]' : 'h-[360px]'} relative overflow-hidden group`}>
                  
                  {/* JPG do SDG - Tamanho fixo para evitar layout shift */}
                  <div className={`${breakpoints.isMobile ? 'w-32 h-32' : 'w-40 h-40'} mb-4 flex-shrink-0 relative`}>
                    <div className="w-full h-full flex items-center justify-center rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <Image
                        src={sdg.image}
                        alt={`SDG ${sdg.number} - ${sdg.name}`}
                        width={breakpoints.isMobile ? 128 : 160}
                        height={breakpoints.isMobile ? 128 : 160}
                        className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  
                  {/* Conteúdo minimalista - Tipografia otimizada */}
                  <div className="text-center flex flex-col items-center justify-center relative w-full px-2">
                    {/* Número do SDG - Tamanho otimizado para mobile */}
                    <span className={`${breakpoints.isMobile ? 'text-3xl' : 'text-5xl'} font-thin text-[#044050] mb-1 tracking-[-0.03em] leading-none`}>
                      {sdg.number}
                    </span>
                    
                    {/* Nome do SDG - Compacto para mobile */}
                    <span className={`${breakpoints.isMobile ? 'text-[10px]' : 'text-xs'} font-light text-gray-600 uppercase tracking-[0.08em] text-center leading-[1.1] w-full`}>
                      {sdg.name}
                    </span>
                  </div>
                  
                  {/* Hover indicator simples */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#5FA037] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Use of Funds */}
      <section className={`${sectionPadding} relative bg-white`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-12' : 'mb-24'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Series Seed - €1M Allocation
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-3xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Strategic</span>
              <br />
              <span className="font-normal text-[#5FA037]">capital deployment</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-base' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              Initial investment focused on MVP development and market validation
            </motion.p>
          </div>
          
          <div className="max-w-5xl mx-auto mb-16">
            <div className="space-y-8">
              {[
                { 
                  category: 'Product Development', 
                  percentage: 40, 
                  amount: '€400,000',
                  details: [
                    'AI enhancement and algorithm optimization',
                    'Blockchain scaling and smart contracts',
                    'Mobile app development (iOS/Android)',
                    'Cloud Infrastructure (AWS Microservices)'
                  ]
                },
                { 
                  category: 'Scientific Partnerships', 
                  percentage: 25, 
                  amount: '€250,000',
                  details: [
                    'Validation infrastructure setup',
                    'Carbon offset project partnerships',
                    'Botanical Garden API integration',
                    'Scientific methodology development'
                  ]
                },
                { 
                  category: 'Marketing & Sales', 
                  percentage: 25, 
                  amount: '€250,000',
                  details: [
                    'Customer acquisition campaigns',
                    'Team expansion (sales & marketing)',
                    'Digital marketing and content',
                    'Brand positioning and awareness'
                  ]
                },
                { 
                  category: 'Operations', 
                  percentage: 10, 
                  amount: '€100,000',
                  details: [
                    'Legal and compliance setup',
                    'Working capital reserve',
                    'Administrative expenses',
                    'Regulatory filings'
                  ]
                }
              ].map((fund, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-slate-50/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 hover:border-[#044050]/20 transition-all duration-500 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-medium text-[#044050] mb-2 tracking-tight">{fund.category}</h3>
                      <p className="text-3xl font-extralight text-[#5FA037] tracking-tight">{fund.amount}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-5xl font-extralight text-[#044050] tracking-tight">{fund.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-white rounded-full overflow-hidden mb-6">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-[#5FA037] to-[#4d8c2d] rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${fund.percentage}%` }}
                      transition={{ duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <ul className="space-y-3">
                    {fund.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="w-1 h-1 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                        <span className="font-light leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key Deliverables */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-light text-gray-900 text-center mb-10">Key Milestones Roadmap</h3>
            <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6`}>
              {[
                {
                  milestone: "Q4 2026",
                  achievements: [
                    "50 pilot companies in Portugal",
                    "MVP validated & launched",
                    "Series Seed closed (€1M)"
                  ]
                },
                {
                  milestone: "Q4 2027",
                  achievements: [
                    "250 B2B clients",
                    "5K B2C users",
                    "Spain market entry started"
                  ]
                },
                {
                  milestone: "Q4 2028",
                  achievements: [
                    "1,000+ B2B clients",
                    "25K B2C users",
                    "4 countries (PT, ES, FR, IT)"
                  ]
                },
                {
                  milestone: "Q4 2030",
                  achievements: [
                    "€41M revenue",
                    "50% EBITDA margin",
                    "6+ country presence"
                  ]
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 hover:border-[#044050]/20 transition-all duration-500 hover:shadow-lg"
                >
                  <h4 className="text-lg font-medium text-[#044050] mb-6 tracking-tight">{item.milestone}</h4>
                  <ul className="space-y-3">
                    {item.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1 h-1 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                        <span className="text-sm text-gray-700 font-light leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Exit Strategy - NEW SECTION */}
      <section className={`${sectionPadding} relative bg-slate-50`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-12' : 'mb-24'}`}>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
            >
              Exit Strategy
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-3xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Multiple</span>
              <br />
              <span className="font-normal text-[#5FA037]">exit paths</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-base' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              Strategic options to maximize returns within 5-7 year horizon
            </motion.p>
          </div>

          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-8 mb-16`}>
            {[
              {
                title: "IPO",
                timeline: "2029-2030",
                description: "Euronext Lisbon or NASDAQ listing",
                details: [
                  "Target: €40M+ annual revenue",
                  "Valuation: >€1B",
                  "Public market liquidity",
                  "Capital for final acceleration"
                ]
              },
              {
                title: "Strategic Acquisition",
                timeline: "2028-2030",
                description: "Acquisition by tech giant or ESG leader",
                details: [
                  "Potential buyers: Salesforce, Microsoft, SAP",
                  "Synergy: ESG module integration",
                  "Market comparables: 12-18x revenue",
                  "Early liquidity option"
                ]
              },
              {
                title: "Private Equity",
                timeline: "2029+",
                description: "Growth equity buyout",
                details: [
                  "PE fund acquisition of stakes",
                  "12-18x EBITDA multiples",
                  "Prepare for later IPO/merger",
                  "Maintain growth trajectory"
                ]
              }
            ].map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-3xl p-8 border-2 ${
                  index === 0 ? 'border-[#5FA037]' : 'border-gray-200'
                }`}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-[#044050] mb-2">{option.title}</h3>
                  <p className="text-sm text-[#5FA037] font-medium uppercase tracking-wider">{option.timeline}</p>
                </div>
                <p className="text-base text-gray-600 font-light mb-6">{option.description}</p>
                <ul className="space-y-2">
                  {option.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5FA037] flex-shrink-0 mt-2" />
                      <span className="text-sm text-gray-600 font-light">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Expected Returns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-gradient-to-br from-[#044050] to-[#033842] rounded-3xl p-10 text-white"
          >
            <h3 className="text-2xl font-light text-center mb-8">Expected Investor Returns</h3>
            <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-8`}>
              <div className="text-center">
                <p className="text-sm text-white/70 uppercase tracking-wider mb-2">Base Case</p>
                <p className="text-4xl font-extralight mb-2">7-8x</p>
                <p className="text-sm text-white/80">€130M valuation in 2030</p>
              </div>
              <div className="text-center border-l border-r border-white/20">
                <p className="text-sm text-[#E5FFBA] uppercase tracking-wider mb-2">Optimistic</p>
                <p className="text-4xl font-extralight text-[#E5FFBA] mb-2">12x+</p>
                <p className="text-sm text-white/80">€200M+ valuation</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-white/70 uppercase tracking-wider mb-2">IRR Target</p>
                <p className="text-4xl font-extralight mb-2">50%+</p>
                <p className="text-sm text-white/80">Annual return rate</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/20 text-center">
              <p className="text-base text-white/90 font-light">
                Series Seed investors positioned for exceptional returns while generating positive environmental impact
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mt-12"
          >
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h4 className="text-lg font-semibold text-[#044050] mb-4">Comparable Valuations</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5FA037] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600"><span className="font-medium">EcoVadis (France):</span> €1.2B valuation at ~15x revenue (2022)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5FA037] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600"><span className="font-medium">ESG Tech M&A:</span> Typical multiples of 12-18x revenue</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5FA037] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600"><span className="font-medium">SaaS Benchmarks:</span> High-growth SaaS companies trade at 15-20x ARR</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section - Modern Design */}
      <TeamSection 
        members={teamMembers}
        title="Expert"
        titleHighlight="leadership"
        subtitle="Our multidisciplinary team combines technical expertise and scientific knowledge with strategy, legal insight, finance, sustainability, and operations to revolutionize ESG certification through innovative AI, blockchain, and data-driven solutions, transforming ESG commitments into verifiable, transparent, and impactful outcomes."
        className="bg-white"
      />

      {/* Contact CTA */}
      <section id="contact" className={`${sectionPadding} relative bg-gradient-to-br from-[#044050] to-[#033842]`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-medium text-white/70 uppercase tracking-[0.2em] mb-6">
                Let's Talk
              </p>
              <h2 className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-8' : 'mb-12'} tracking-tight leading-[1.1] text-white`}>
                <span className="font-extralight">Join us in</span>
                <br />
                <span className="font-normal">shaping ESG's future</span>
              </h2>
              
              <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto mb-12">
                <p className="text-lg text-white/80 font-light">
                  Seeking strategic investors who share our vision for democratizing ESG certification
                </p>
              </div>

              <div className={`flex ${breakpoints.isMobile ? 'flex-col' : 'flex-row'} items-center justify-center gap-4`}>
                <Button 
                  size="lg"
                  onClick={() => window.location.href = 'mailto:diego.rocha@bureausocial.org.br'}
                  className={`group ${breakpoints.isMobile ? 'w-full max-w-sm' : 'min-w-[220px]'} h-[52px] text-base rounded-full transition-all duration-500 bg-[#5FA037] text-white hover:bg-[#4d8c2d] font-normal tracking-tight shadow-lg hover:shadow-xl`}
                >
                  <span className="relative flex items-center justify-center gap-2.5">
                    <span className="font-medium">Contact Us</span>
                    <Mail className="h-[18px] w-[18px]" />
                  </span>
                </Button>
                
                <DocumentsSheet 
                  trigger={
                    <Button 
                      size="lg"
                      variant="ghost"
                      className={`group ${breakpoints.isMobile ? 'w-full max-w-sm' : 'min-w-[220px]'} h-[52px] text-base rounded-full transition-all duration-500 text-white hover:bg-white/10 border border-white/30 hover:border-white/50 font-normal tracking-tight backdrop-blur-md`}
                    >
                      <span className="relative flex items-center justify-center gap-2.5">
                        <span className="font-medium">View Documents</span>
                        <FileText className="h-[18px] w-[18px]" />
                      </span>
                    </Button>
                  }
                />
              </div>

              <div className="mt-12 pt-12 border-t border-white/10">
                <p className="text-sm text-white/60 font-light mb-6">Contact Information</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Main Contact */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-white font-medium mb-1">Diego Mendes da Rocha</p>
                      <p className="text-white/70 text-sm">Founder & CEO</p>
                      <p className="text-white/60 text-xs">ESG Veritas Solutions, LDA (Portugal)</p>
                      <p className="text-white/60 text-xs">Director, Bureau Social (Brazil)</p>
                    </div>
                    <div className="space-y-1">
                      <a href="mailto:diego.rocha@bureausocial.org.br" className="text-white/80 hover:text-white transition-colors text-sm block">
                        diego.rocha@bureausocial.org.br
                      </a>
                      <a href="tel:+351931721901" className="text-white/80 hover:text-white transition-colors text-sm block">
                        +351 931 721 901
                      </a>
                    </div>
                  </div>

                  {/* Investment Inquiries */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-white font-medium mb-1">Investment Inquiries</p>
                      <a href="mailto:info@esgveritas.eu" className="text-white/80 hover:text-white transition-colors text-sm block mb-4">
                        info@esgveritas.eu
                      </a>
                    </div>
                    <div className="text-xs text-white/60 space-y-2">
                      <div>
                        <p className="text-white/70 font-medium mb-1">Portugal Office</p>
                        <p>ESG Veritas Solutions Ltd.</p>
                        <p>Rua do Salvador, 20, 1A</p>
                        <p>1100-466 Lisboa, Portugal</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="text-xs text-white/60">
                    <p className="text-white/70 font-medium mb-1">Brazil Office</p>
                    <p>Bureau Social – Instituto Brasileiro de Negócios Sociais</p>
                    <p>Avenida Horácio Lafer, 160 – Conj. 22, Sala B</p>
                    <p>Itaim Bibi – São Paulo/SP – CEP 04538-080</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer 
        showSpecialMessage={false}
      />
      </main>
    </div>
  )
}


