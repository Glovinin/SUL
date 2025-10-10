"use client"

import { useState, useEffect } from 'react'
import { Button } from '../../components/ui/button'
import { ArrowRight, TrendingUp, Users, Globe, Shield, Target, Rocket, BarChart3, CheckCircle2, Star, Mail, Calendar, X, Cpu, Leaf, DollarSign } from 'lucide-react'
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
    // First check localStorage access code
    const access = localStorage.getItem('greencheck_investor_access')
    if (access !== 'true') {
      router.push('/investidores/acesso')
      return
    }

    // Check if Firebase auth is initialized
    if (!auth) {
      console.error('Firebase auth not initialized yet')
      setLoading(false)
      return
    }

    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/investidores/login')
        return
      }

      try {
        const investor = await getInvestor(user.uid)
        
        if (!investor) {
          router.push('/investidores/login')
          return
        }

        // Verificar status do investidor
        if (investor.status === 'pending_nda') {
          router.push('/investidores/nda')
          return
        }

        if (investor.status === 'pending_approval') {
          router.push('/investidores/pending-approval')
          return
        }

        if (investor.status === 'rejected') {
          alert('Your account has been rejected. Please contact support.')
          await auth.signOut()
          router.push('/investidores/acesso')
          return
        }

        if (investor.status === 'approved') {
          setHasAccess(true)
          setMounted(true)
          setLoading(false)
        }
      } catch (err) {
        console.error('Error checking investor status:', err)
        router.push('/investidores/login')
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
      
      {/* Market Opportunity */}
      <section className={`${sectionPadding} relative bg-white rounded-t-[48px]`}>
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
              Market Opportunity
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Massive market,</span>{' '}
              <span className="font-normal text-[#5FA037]">perfect timing</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              CSRD mandate creates unprecedented demand for automated ESG certification
            </motion.p>
          </div>

          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : breakpoints.isTablet ? 'grid-cols-2' : 'grid-cols-4'} ${breakpoints.isMobile ? 'gap-8' : 'gap-12'}`}>
            {[
              {
                icon: Users,
                value: "2.4M",
                label: "Target Companies",
                description: "European SMEs requiring CSRD compliance by 2025"
              },
              {
                icon: DollarSign,
                value: "€8.5B",
                label: "Annual Market",
                description: "European ESG certification opportunity"
              },
              {
                icon: TrendingUp,
                value: "23%",
                label: "CAGR",
                description: "Market growth rate through 2030"
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
                  className="group text-center"
                >
                  <div className="mb-6 flex justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#044050] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#5FA037]">
                      <ItemIcon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-extralight text-[#044050] mb-2">{item.value}</div>
                  <h3 className={`${breakpoints.isXs ? 'text-base' : 'text-lg'} font-medium text-[#044050] mb-2`}>
                    {item.label}
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

      {/* Target Market */}
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
              Target Market
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Our audience,</span>{' '}
              <span className="font-normal text-[#5FA037]">our impact</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              We serve those who want to lead the transition to a greener, more transparent economy
            </motion.p>
          </div>

          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : 'grid-cols-3'} ${breakpoints.isMobile ? 'gap-6' : 'gap-8'} max-w-5xl mx-auto`}>
            {[
              {
                title: "European SMEs",
                number: "25 million",
                description: "companies need CSRD certification",
                color: "text-[#5FA037]"
              },
              {
                title: "Individuals",
                number: "500 million",
                description: "globally conscious consumers",
                color: "text-[#044050]"
              },
              {
                title: "Large Corporations",
                number: "Supply chains",
                description: "requiring supplier certification",
                color: "text-gray-600"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm text-center"
              >
                <h3 className="text-2xl font-semibold text-[#044050] mb-6">{item.title}</h3>
                <div className="flex justify-center gap-1.5 mb-6">
                  <span className={`w-2 h-2 rounded-full ${item.color === 'text-[#5FA037]' ? 'bg-[#5FA037]' : item.color === 'text-[#044050]' ? 'bg-[#044050]' : 'bg-gray-400'}`} />
                  <span className={`w-2 h-2 rounded-full ${item.color === 'text-[#5FA037]' ? 'bg-[#5FA037]' : item.color === 'text-[#044050]' ? 'bg-[#044050]' : 'bg-gray-400'}`} />
                  <span className={`w-2 h-2 rounded-full ${item.color === 'text-[#5FA037]' ? 'bg-[#5FA037]' : item.color === 'text-[#044050]' ? 'bg-[#044050]' : 'bg-gray-400'}`} />
                </div>
                <p className="text-3xl font-light text-gray-900 mb-4">{item.number}</p>
                <p className="text-base text-gray-600 font-light">{item.description}</p>
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
              Business Model
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
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
              className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
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
                className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm text-center"
              >
                <h3 className="text-2xl font-semibold text-[#044050] mb-6">{item.title}</h3>
                <div className="flex justify-center gap-1.5 mb-6">
                  <span className={`w-2 h-2 rounded-full ${item.color === 'text-[#5FA037]' ? 'bg-[#5FA037]' : 'bg-[#044050]'}`} />
                  <span className={`w-2 h-2 rounded-full ${item.color === 'text-[#5FA037]' ? 'bg-[#5FA037]' : 'bg-[#044050]'}`} />
                  <span className={`w-2 h-2 rounded-full ${item.color === 'text-[#5FA037]' ? 'bg-[#5FA037]' : 'bg-[#044050]'}`} />
                </div>
                <p className="text-3xl font-light text-gray-900 mb-4">{item.number}</p>
                <p className="text-base text-gray-600 font-light">{item.description}</p>
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

      {/* Revenue Streams */}
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
              Business Model
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
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
                desc: 'Pay-per-certificate for SMEs',
                potential: '€2.1B TAM'
              },
              { 
                label: 'B2C Subscription', 
                revenue: '€9.99', 
                unit: 'per month', 
                desc: 'Individual carbon tracking',
                potential: '€5.4B TAM'
              },
              { 
                label: 'Enterprise', 
                revenue: '€2,500', 
                unit: 'per month', 
                desc: 'Custom solutions + API',
                potential: '€900M TAM'
              },
              { 
                label: 'Marketplace', 
                revenue: '8%', 
                unit: 'commission', 
                desc: 'Carbon credit trading',
                potential: '€160M TAM'
              }
            ].map((stream, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="border border-gray-200 rounded-3xl p-8 hover:border-[#5FA037] transition-all duration-300 hover:shadow-lg">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-6">{stream.label}</p>
                  <div className="mb-6">
                    <div className="text-4xl font-light text-black mb-1">{stream.revenue}</div>
                    <div className="text-sm text-gray-500 font-light">{stream.unit}</div>
                  </div>
                  <p className="text-sm text-gray-600 font-light mb-4">{stream.desc}</p>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs font-medium text-[#5FA037]">{stream.potential}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Traction */}
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
              Real Impact
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
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
              className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              Concrete results with measurable impact
            </motion.p>
          </div>
          
          {/* Impact Metrics */}
          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-2' : 'grid-cols-4'} ${breakpoints.isMobile ? 'gap-8' : 'gap-12'} max-w-5xl mx-auto ${breakpoints.isMobile ? 'mb-16' : 'mb-24'}`}>
            {[
              { value: '50K+', label: 'tCO₂e Compensated', sublabel: 'Carbon offset achieved' },
              { value: '5K', label: 'Reforestation Hectares', sublabel: 'Forest restoration' },
              { value: '1.5K+', label: 'Jobs Created', sublabel: 'Social impact' },
              { value: '€15M+', label: 'Generated Economy', sublabel: 'Economic value' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-4xl lg:text-5xl font-extralight text-[#044050] mb-2 transition-all duration-300 group-hover:text-[#5FA037]">{stat.value}</div>
                <div className="text-sm text-gray-700 font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500 font-light">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>

          {/* Technology Metrics */}
          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-2' : 'grid-cols-4'} ${breakpoints.isMobile ? 'gap-6' : 'gap-8'} max-w-5xl mx-auto ${breakpoints.isMobile ? 'mb-16' : 'mb-24'} pt-12 border-t border-gray-200`}>
            {[
              { value: '98.5%', label: 'AI Accuracy', sublabel: 'ESG data extraction' },
              { value: '1,000+', label: 'Beta Users', sublabel: 'Active user base' },
              { value: '€0.01', label: 'Blockchain Cost', sublabel: 'Per transaction' },
              { value: '100%', label: 'Patent Filed', sublabel: 'IP protection' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-extralight text-[#044050] mb-2">{stat.value}</div>
                <div className="text-sm text-gray-700 font-medium mb-1">{stat.label}</div>
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
                    <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      milestone.status === 'completed' 
                        ? 'bg-[#5FA037] border-[#5FA037]' 
                        : milestone.status === 'current' 
                        ? 'bg-[#044050] border-[#044050] animate-pulse shadow-lg shadow-[#044050]/30' 
                        : 'bg-white border-gray-300'
                    }`} />
                    {index < 3 && (
                      <div className={`w-0.5 h-16 mt-2 ${
                        milestone.status === 'completed' 
                          ? 'bg-[#5FA037]' 
                          : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-medium text-[#044050]">{milestone.period}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium transition-all duration-300 ${
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
                    <ul className="space-y-2">
                      {milestone.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-600 font-light flex items-start gap-2 group-hover:text-gray-900 transition-colors">
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
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

      {/* SDGs Contribution */}
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
              Real Impact
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Contribution to</span>
              <br />
              <span className="font-normal text-[#5FA037]">SDGs</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              Aligned with the UN Sustainable Development Goals
            </motion.p>
          </div>

          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-2' : 'grid-cols-4'} ${breakpoints.isMobile ? 'gap-8' : 'gap-12'} max-w-5xl mx-auto`}>
            {[
              {
                number: '13',
                title: 'Climate Action',
                color: 'bg-[#3F7E44]',
                icon: '🌍'
              },
              {
                number: '15',
                title: 'Terrestrial Life',
                color: 'bg-[#56C02B]',
                icon: '🌳'
              },
              {
                number: '8',
                title: 'Decent Work',
                color: 'bg-[#A21942]',
                icon: '📈'
              },
              {
                number: '17',
                title: 'Partnerships',
                color: 'bg-[#19486A]',
                icon: '🤝'
              }
            ].map((sdg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group text-center"
              >
                <div className={`${sdg.color} rounded-2xl p-8 mb-4 aspect-square flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl`}>
                  <div className="text-6xl mb-4">{sdg.icon}</div>
                  <div className="text-white">
                    <div className="text-5xl font-bold mb-2">{sdg.number}</div>
                    <div className={`${breakpoints.isXs ? 'text-xs' : 'text-sm'} font-semibold uppercase tracking-wider`}>
                      {sdg.title}
                    </div>
                  </div>
                </div>
                <h3 className={`${breakpoints.isXs ? 'text-base' : 'text-lg'} font-medium text-gray-800`}>
                  {sdg.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use of Funds */}
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
              Investment Use
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
            >
              <span className="font-extralight text-[#044050]">Capital</span>
              <br />
              <span className="font-normal text-[#5FA037]">allocation</span>
            </motion.h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                { category: 'Product Development', percentage: 40, amount: 'AI/ML improvements, blockchain integration, marketplace features' },
                { category: 'Sales & Marketing', percentage: 30, amount: 'B2B outreach, digital campaigns, trade shows, partnerships' },
                { category: 'Team Expansion', percentage: 20, amount: 'Engineering, sales, customer success hires' },
                { category: 'Operations', percentage: 10, amount: 'Infrastructure, legal, compliance, working capital' }
              ].map((fund, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-[#044050]">{fund.category}</h3>
                    <span className="text-2xl font-light text-[#044050]">{fund.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                    <motion.div 
                      className="h-full bg-[#5FA037] rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${fund.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 font-light">{fund.amount}</p>
                </motion.div>
              ))}
            </div>
          </div>
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
                  onClick={() => window.location.href = 'mailto:invest@greencheck.io'}
                  className={`group ${breakpoints.isMobile ? 'w-full max-w-sm' : 'min-w-[220px]'} h-[52px] text-base rounded-full transition-all duration-500 bg-[#5FA037] text-white hover:bg-[#4d8c2d] font-normal tracking-tight shadow-lg hover:shadow-xl`}
                >
                  <span className="relative flex items-center justify-center gap-2.5">
                    <span className="font-medium">Contact Us</span>
                    <Mail className="h-[18px] w-[18px]" />
                  </span>
                </Button>
                
                <Button 
                  size="lg"
                  variant="ghost"
                  onClick={() => window.open('/pitch-deck.pdf', '_blank')}
                  className={`group ${breakpoints.isMobile ? 'w-full max-w-sm' : 'min-w-[220px]'} h-[52px] text-base rounded-full transition-all duration-500 text-white hover:bg-white/10 border border-white/30 hover:border-white/50 font-normal tracking-tight backdrop-blur-md`}
                >
                  <span className="relative flex items-center justify-center gap-2.5">
                    <span className="font-medium">Download Deck</span>
                    <ArrowRight className="h-[18px] w-[18px]" />
                  </span>
                </Button>
              </div>

              <div className="mt-12 pt-12 border-t border-white/10">
                <p className="text-sm text-white/60 font-light mb-4">Contact Information</p>
                <div className="flex flex-col gap-3">
                  <a href="mailto:invest@greencheck.io" className="text-white/80 hover:text-white transition-colors">
                    invest@greencheck.io
                  </a>
                  <p className="text-white/60 text-sm">
                    Confidential pitch deck and financial projections available upon request
                  </p>
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

