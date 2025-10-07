"use client"

import { useState, useEffect } from 'react'
import { Button } from '../../components/ui/button'
import { ArrowRight, TrendingUp, Users, Globe, Zap, Shield, Target, Rocket, DollarSign, BarChart3, CheckCircle2, Star, Mail, Calendar } from 'lucide-react'
import { Navbar } from '../../components/navbar'
import { motion } from 'framer-motion'
import SplineBackground from '../../components/spline-background'
import { useRouter } from 'next/navigation'

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
  const breakpoints = useSmartBreakpoints()

  // Verificar acesso antes de mostrar conteúdo
  useEffect(() => {
    const checkAccess = () => {
      const access = localStorage.getItem('greencheck_investor_access')
      if (access === 'true') {
        setHasAccess(true)
        setMounted(true)
      } else {
        router.push('/investidores/acesso')
      }
    }

    checkAccess()
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

  if (!mounted) {
    return null
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
                      <span className="font-medium">Get in Touch</span>
                      <Mail className={`${breakpoints.isXs ? 'h-4 w-4' : 'h-[18px] w-[18px]'} transition-transform duration-300 group-hover:translate-x-0.5 group-hover:scale-105`} />
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
              <span className="font-extralight text-[#044050]">Massive market</span>
              <br />
              <span className="font-normal text-[#044050]">perfect timing</span>
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

      {/* Competitive Advantages */}
      <section className={`${sectionPadding} relative bg-slate-50`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-16' : 'mb-24'}`}>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4">
              Competitive Moat
            </p>
            <h2 className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}>
              <span className="font-extralight text-[#044050]">Defensible</span>
              <br />
              <span className="font-normal text-[#044050]">advantages</span>
            </h2>
          </div>
          
          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1 gap-8' : 'md:grid-cols-2 lg:grid-cols-3 gap-12'}`}>
            {[
              {
                icon: Rocket,
                title: "First-Mover Advantage",
                description: "First automated ESG platform with scientific validation and blockchain certification"
              },
              {
                icon: Shield,
                title: "Technology Barriers",
                description: "Proprietary AI algorithms trained on 50,000+ ESG documents with 98.5% accuracy"
              },
              {
                icon: CheckCircle2,
                title: "Institutional Partnerships",
                description: "Exclusive agreements with scientific institutions for validation credibility"
              },
              {
                icon: Globe,
                title: "Network Effects",
                description: "Integrated marketplace creates lock-in as both buyers and sellers join"
              },
              {
                icon: Zap,
                title: "Cost Leadership",
                description: "40% cheaper than traditional methods with 4x faster processing"
              },
              {
                icon: BarChart3,
                title: "Regulatory Compliance",
                description: "Built-in CSRD, EU Taxonomy, and GDPR compliance from day one"
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
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#044050] flex items-center justify-center transition-all duration-300 group-hover:bg-[#5FA037]">
                      <ItemIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium text-[#044050] mb-3">{item.title}</h3>
                  <p className="text-base text-gray-600 font-light leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Revenue Streams */}
      <section className={`${sectionPadding} relative bg-white`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-16' : 'mb-24'}`}>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4">
              Business Model
            </p>
            <h2 className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}>
              <span className="font-extralight text-[#044050]">Multiple</span>
              <br />
              <span className="font-normal text-[#044050]">revenue streams</span>
            </h2>
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
      <section className={`${sectionPadding} relative bg-slate-50`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-16' : 'mb-24'}`}>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4">
              Progress
            </p>
            <h2 className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}>
              <span className="font-extralight text-[#044050]">Building</span>
              <br />
              <span className="font-normal text-[#044050]">momentum</span>
            </h2>
          </div>
          
          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-2' : 'grid-cols-4'} ${breakpoints.isMobile ? 'gap-8' : 'gap-12'} max-w-5xl mx-auto ${breakpoints.isMobile ? 'mb-16' : 'mb-24'}`}>
            {[
              { value: '98.5%', label: 'AI Accuracy', sublabel: 'ESG data extraction' },
              { value: '3 weeks', label: 'Time to Market', sublabel: 'MVP launched' },
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
                <div className="text-4xl lg:text-5xl font-extralight text-[#044050] mb-2">{stat.value}</div>
                <div className="text-sm text-gray-700 font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500 font-light">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>

          {/* Milestones Timeline */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                { quarter: 'Q1 2025', status: 'completed', items: ['MVP launched', 'Patent filed', 'Botanical garden partnership'] },
                { quarter: 'Q2 2025', status: 'current', items: ['Beta testing with 10 SMEs', 'Fundraising round', 'Polygon integration'] },
                { quarter: 'Q3 2025', status: 'planned', items: ['Public launch', '100 paying customers', 'Marketplace v1'] },
                { quarter: 'Q4 2025', status: 'planned', items: ['Break-even', '€1M ARR', 'EU expansion'] }
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full ${
                      milestone.status === 'completed' ? 'bg-[#5FA037]' : 
                      milestone.status === 'current' ? 'bg-[#044050] animate-pulse' : 
                      'bg-gray-300'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-medium text-[#044050]">{milestone.quarter}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        milestone.status === 'completed' ? 'bg-[#5FA037]/10 text-[#5FA037]' : 
                        milestone.status === 'current' ? 'bg-[#044050]/10 text-[#044050]' : 
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {milestone.status === 'completed' ? '✓ Completed' : 
                         milestone.status === 'current' ? '→ In Progress' : 
                         'Planned'}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {milestone.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-600 font-light flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-gray-400" />
                          {item}
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

      {/* Use of Funds */}
      <section className={`${sectionPadding} relative bg-white`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-16' : 'mb-24'}`}>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4">
              Investment Use
            </p>
            <h2 className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}>
              <span className="font-extralight text-[#044050]">Capital</span>
              <br />
              <span className="font-normal text-[#044050]">allocation</span>
            </h2>
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

      {/* Team */}
      <section className={`${sectionPadding} relative bg-slate-50`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
          <div className={`text-center ${breakpoints.isMobile ? 'mb-16' : 'mb-24'}`}>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4">
              Team
            </p>
            <h2 className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}>
              <span className="font-extralight text-[#044050]">Expert</span>
              <br />
              <span className="font-normal text-[#044050]">leadership</span>
            </h2>
            <p className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light`}>
              Combined 40+ years in SaaS, sustainability, and blockchain
            </p>
          </div>
          
          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : 'md:grid-cols-3'} ${breakpoints.isMobile ? 'gap-12' : 'gap-16'} max-w-5xl mx-auto`}>
            {[
              {
                name: "Bruno Silva",
                role: "Founder & CEO",
                description: "10+ years building SaaS platforms. Previously scaled 3 B2B startups to €5M+ ARR."
              },
              {
                name: "Technical Team",
                role: "Engineering",
                description: "AI/ML specialists from top universities. Blockchain developers with proven track record."
              },
              {
                name: "Advisory Board",
                role: "Strategic Advisors",
                description: "ESG experts, sustainability scientists, and blockchain infrastructure specialists."
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-24 h-24 rounded-full bg-[#044050] flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-[#5FA037]">
                  <Star className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-medium text-[#044050] mb-2">{member.name}</h3>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">{member.role}</p>
                <p className="text-base text-gray-600 font-light leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className={`${sectionPadding} relative bg-[#044050]`}>
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
      <footer className="bg-[#044050] text-white border-t border-white/10">
        <div className={`${maxWidth} mx-auto ${containerPadding} ${breakpoints.isMobile ? 'py-8' : 'py-10'}`}>
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-white/60 font-light">
              © 2025 GreenCheck. All rights reserved.
            </p>
            <p className="text-xs text-white/40 font-light">
              This presentation is confidential and intended for accredited investors only
            </p>
            
            {/* Logout button */}
            <button
              onClick={() => {
                localStorage.removeItem('greencheck_investor_access')
                router.push('/investidores/acesso')
              }}
              className="text-xs text-white/50 hover:text-white/80 font-light transition-colors underline"
            >
              Logout from Investor Portal
            </button>
          </div>
        </div>
      </footer>
      </main>
    </div>
  )
}

