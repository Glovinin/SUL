"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress-simple'
import { Upload, FileText, CheckCircle2, Shield, Cpu, Leaf, ArrowRight, ChevronDown, Zap, BarChart3 } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { motion } from 'framer-motion'
import SplineBackground from '@/components/spline-background'
import { useRouter } from 'next/navigation'
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
      maxWidth: 'max-w-4xl',
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
      maxWidth: 'max-w-4xl',
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
      maxWidth: 'max-w-5xl',
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
      maxWidth: 'max-w-6xl',
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

const processSteps = [
  { 
    id: 1, 
    title: "Reading document with OCR", 
    description: "Intelligent extraction of text and structured data",
    icon: FileText, 
    duration: 15 
  },
  { 
    id: 2, 
    title: "Extracting data with BERT", 
    description: "Advanced semantic analysis with specialized AI",
    icon: Cpu, 
    duration: 25 
  },
  { 
    id: 3, 
    title: "Validating with satellite", 
    description: "Orbital verification via Sentinel-2 data",
    icon: Shield, 
    duration: 20 
  },
  { 
    id: 4, 
    title: "Confirming with Botanical Garden", 
    description: "Institutional scientific validation",
    icon: CheckCircle2, 
    duration: 20 
  },
  { 
    id: 5, 
    title: "Minting NFT on blockchain", 
    description: "Immutable certificate on Polygon network",
    icon: Leaf, 
    duration: 10 
  }
]

export default function ValidacaoPage() {
  const router = useRouter()
  const [stage, setStage] = useState<'upload' | 'processing' | 'result'>('upload')
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [email, setEmail] = useState('')
  const [emailStatus, setEmailStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [showOfflinePopup, setShowOfflinePopup] = useState(false)
  const [popupEmail, setPopupEmail] = useState('')
  const [popupEmailStatus, setPopupEmailStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [result, setResult] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  
  // Hook de breakpoints inteligentes 
  const breakpoints = useSmartBreakpoints()

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

  // Handle popup email notification signup
  const handlePopupEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!popupEmail || !popupEmail.includes('@')) {
      setPopupEmailStatus('error')
      return
    }
    
    setPopupEmailStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      setPopupEmailStatus('success')
      setPopupEmail('')
      setTimeout(() => {
        setPopupEmailStatus('idle')
        setShowOfflinePopup(false)
      }, 2000)
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Instead of handling file upload, show offline popup
    event.preventDefault()
    setShowOfflinePopup(true)
  }

  const handleProcess = () => {
    setStage('processing')
    setProgress(0)
    setCurrentStep(0)

    // Simular processamento
    let currentProgress = 0
    const totalDuration = processSteps.reduce((sum, step) => sum + step.duration, 0)

    processSteps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index)
      }, currentProgress * 100)
      
      currentProgress += step.duration
    })

    // Simular progresso
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / totalDuration)
        if (newProgress >= 100) {
          clearInterval(progressInterval)
            setTimeout(() => {
              setStage('result')
              setResult({
                co2: 45.8,
                method: 'Reflorestamento',
                validation: 'Aprovada pelo Jardim Botânico de Lisboa',
                nft: '0xabc123def456',
                certificate: 'GC-2024-001',
                score: 'A+'
              })
          }, 500)
          return 100
        }
        return newProgress
      })
    }, 100)
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
      
      {/* Hero Section - Apple Style Minimalista */}
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
                  Automated ESG Validation
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
                    Scientific
                  </motion.span>
                  {' '}
                  <motion.span 
                    className="inline-block font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                  >
                    Validation
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
          ? 'pb-[140px]' 
          : 'pb-0'
      }`}>
      
      {/* Process Steps Overview - Clean Minimal */}
      <section className={`${sectionPadding} relative overflow-visible bg-white rounded-t-[48px]`}>
        {/* Linha de Slide iOS - Mobile apenas */}
        {breakpoints.isMobile && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-slate-300 rounded-full z-10" />
        )}
        
        <div className={`${maxWidth} mx-auto ${containerPadding} relative`}>
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
              <span className="font-extralight text-[#044050]">5 Automated</span>
              <br />
              <span className="font-normal text-[#044050]">steps</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
            >
              Patented technology for scientific accuracy and blockchain certification
            </motion.p>
          </div>

          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1' : breakpoints.isTablet ? 'grid-cols-2' : 'grid-cols-3'} ${breakpoints.isMobile ? 'gap-8' : 'gap-12'}`}>
            {processSteps.map((step, index) => {
              const StepIcon = step.icon
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="border border-gray-200 rounded-3xl p-8 hover:border-[#5FA037] transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-[#044050] flex items-center justify-center transition-all duration-300 group-hover:bg-[#5FA037]">
                        <span className="text-white font-medium text-lg">{step.id}</span>
                      </div>
                      <StepIcon className="w-6 h-6 text-[#044050] transition-colors duration-300 group-hover:text-[#5FA037]" />
                    </div>
                    <h3 className={`${breakpoints.isXs ? 'text-lg' : 'text-xl'} font-medium text-[#044050] mb-3`}>
                      {step.title}
                    </h3>
                    <p className={`${breakpoints.isXs ? 'text-sm' : 'text-base'} text-gray-600 font-light leading-relaxed`}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Upload Section - Clean Minimal */}
      <section className={`${sectionPadding} relative overflow-hidden bg-slate-50`}>
        
        <div className={`${maxWidth} mx-auto ${containerPadding} relative`}>
          {stage === 'upload' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
                >
                  Start Validation
                </motion.p>
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className={`${breakpoints.isMobile ? 'text-3xl' : 'text-4xl lg:text-5xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.15]`}
                >
                  <span className="font-extralight text-[#044050]">ESG report</span>
                  <br />
                  <span className="font-medium text-[#044050]">upload</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} text-gray-600 font-light max-w-2xl mx-auto leading-relaxed`}
                >
                  Upload your PDF document and let our AI do the rest
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`border border-gray-200 ${breakpoints.isMobile ? 'rounded-2xl' : 'rounded-3xl'} bg-white max-w-4xl mx-auto overflow-hidden`}
              >
                <div className="p-8">
                  <div className={`border-2 border-dashed border-gray-300 rounded-2xl ${breakpoints.isMobile ? 'p-8' : 'p-12'} text-center hover:border-[#5FA037] transition-all duration-300 bg-gray-50/50`}>
                    <Upload className={`${breakpoints.isMobile ? 'w-12 h-12' : 'w-16 h-16'} text-gray-400 mx-auto ${breakpoints.isMobile ? 'mb-4' : 'mb-6'}`} />
                    <p className={`text-gray-600 font-light ${breakpoints.isMobile ? 'mb-4' : 'mb-6'} ${breakpoints.isXs ? 'text-sm' : 'text-base'}`}>
                      Drag and drop your PDF file here or
                    </p>
                    <Button 
                      onClick={() => setShowOfflinePopup(true)}
                      className={`${buttonHeight} bg-[#5FA037] hover:bg-[#4d8c2d] text-white rounded-full transition-all duration-300 font-normal cursor-pointer`}
                    >
                      Select File
                    </Button>
                    {file && (
                      <motion.p 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`text-[#5FA037] font-medium ${breakpoints.isMobile ? 'mt-4' : 'mt-6'} ${breakpoints.isXs ? 'text-sm' : 'text-base'} flex items-center justify-center gap-2`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        {file.name}
                      </motion.p>
                    )}
                  </div>

              {file && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="flex justify-center mt-8"
                    >
                  <Button
                    onClick={handleProcess}
                    size="lg"
                        className={`group ${breakpoints.isMobile ? 'w-full' : 'min-w-[240px]'} ${
                          breakpoints.isXs 
                            ? 'h-11 text-sm' 
                            : breakpoints.isMobile 
                            ? 'h-12 text-base' 
                            : 'h-[52px] text-base'
                        } rounded-full transition-all duration-500 bg-[#5FA037] text-white hover:bg-[#4d8c2d] font-normal tracking-tight shadow-md hover:shadow-lg hover:shadow-[#5FA037]/25 border-0 relative overflow-hidden`}
                  >
                        {/* Subtle shine effect on hover */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                        
                        <span className="relative flex items-center justify-center gap-2.5">
                          <span className="font-medium">Process Document</span>
                        <ArrowRight className={`${breakpoints.isXs ? 'h-4 w-4' : 'h-[18px] w-[18px]'} transition-transform duration-300 group-hover:translate-x-1`} />
                        </span>
                  </Button>
                    </motion.div>
              )}
                </div>
              </motion.div>
            </motion.div>
          )}

          {stage === 'processing' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
                >
                  Processing
                </motion.p>
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className={`${breakpoints.isMobile ? 'text-3xl' : 'text-4xl lg:text-5xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.15]`}
                >
                  <span className="font-extralight text-[#044050]">Analysis</span>
                  <br />
                  <span className="font-medium text-[#044050]">in progress</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} text-gray-600 font-light`}
                >
                  Our AI is analyzing your ESG report
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`border border-gray-200 ${breakpoints.isMobile ? 'rounded-2xl' : 'rounded-3xl'} bg-white max-w-4xl mx-auto overflow-hidden p-8`}
              >
                <div className="text-center mb-8">
                  <div className="text-5xl font-extralight text-[#044050] mb-4">{Math.round(progress)}%</div>
                  <Progress value={progress} className="w-full h-2" />
                </div>
                
                <div className="space-y-3">
                  {processSteps.map((step, index) => {
                    const StepIcon = step.icon
                    const isActive = index === currentStep
                    const isCompleted = index < currentStep
                    
                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                          isActive 
                            ? 'bg-[#5FA037]/5 border border-[#5FA037]/20' 
                            : isCompleted 
                            ? 'bg-emerald-50/50 border border-emerald-100'
                            : 'bg-gray-50/50 border border-transparent'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive 
                            ? 'bg-[#5FA037] text-white' 
                            : isCompleted 
                            ? 'bg-emerald-500 text-white'
                            : 'bg-gray-200 text-gray-400'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <StepIcon className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className={`font-medium transition-colors duration-300 ${
                            isActive 
                              ? 'text-[#044050]' 
                              : isCompleted 
                              ? 'text-emerald-700'
                              : 'text-gray-500'
                          }`}>
                          {step.title}
                          </div>
                          <div className={`text-sm font-light transition-colors duration-300 ${
                            isActive 
                              ? 'text-gray-600' 
                              : isCompleted 
                              ? 'text-emerald-600'
                              : 'text-gray-400'
                          }`}>
                            {step.description}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}

          {stage === 'result' && result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                  className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
                >
                  Completed
                </motion.p>
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className={`${breakpoints.isMobile ? 'text-3xl' : 'text-4xl lg:text-5xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.15]`}
                >
                  <span className="font-extralight text-[#044050]">Analysis</span>
                  <br />
                  <span className="font-medium text-[#044050]">completed</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} text-gray-600 font-light`}
                >
                  Your ESG certificate is ready
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`border border-gray-200 ${breakpoints.isMobile ? 'rounded-2xl' : 'rounded-3xl'} bg-white max-w-4xl mx-auto overflow-hidden`}
              >
                <div className="p-8">
                  <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1 gap-8' : 'md:grid-cols-2 gap-12'}`}>
                    <div className="space-y-6">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Extracted Data</p>
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                          <pre className="text-[#044050]">
{JSON.stringify(result, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Available Actions</p>
                        <div className="space-y-3">
                          <Button className={`w-full ${
                            breakpoints.isXs 
                              ? 'h-11 text-sm' 
                              : 'h-12 text-base'
                          } bg-[#5FA037] hover:bg-[#4d8c2d] text-white rounded-full transition-all duration-300 font-normal`}>
                            Download PDF Certificate
                          </Button>
                          <Button 
                            variant="outline" 
                            className={`w-full ${
                              breakpoints.isXs 
                                ? 'h-11 text-sm' 
                                : 'h-12 text-base'
                            } border-gray-300 text-gray-500 rounded-full transition-all duration-300 font-normal`}
                            disabled
                          >
                            Marketplace (Coming Soon)
                          </Button>
                          <Button 
                            variant="outline" 
                            className={`w-full ${
                              breakpoints.isXs 
                                ? 'h-11 text-sm' 
                                : 'h-12 text-base'
                            } border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full transition-all duration-300 font-normal`}
                            onClick={() => router.push('/')}
                          >
                            Back to Home
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
      </main>

      {/* Offline System Popup - Minimalista e Elegante */}
      {showOfflinePopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowOfflinePopup(false)
              setPopupEmailStatus('idle')
              setPopupEmail('')
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className={`bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 ${
              breakpoints.isMobile ? 'w-full max-w-sm mx-4' : 'w-full max-w-md'
            } overflow-hidden`}
          >
            {/* Header Minimalista */}
            <div className="relative px-8 pt-8 pb-4">
              <button
                onClick={() => {
                  setShowOfflinePopup(false)
                  setPopupEmailStatus('idle')
                  setPopupEmail('')
                }}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 group"
              >
                <svg className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#044050] to-[#5FA037] flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-gray-900 mb-2">System Offline</h3>
                <p className="text-sm text-gray-500 font-light">Currently in development</p>
              </div>
            </div>

            {/* Content */}
            <div className="px-8 pb-8">
              <div className="text-center mb-6">
                <p className="text-gray-600 text-sm font-light leading-relaxed mb-4">
                  Our ESG validation system is currently under development. We're working hard to bring you the most advanced AI-powered ESG certification platform.
                </p>
                
                {/* Badge "In Development" - Minimalista */}
                <div className="inline-flex items-center gap-2 text-xs font-light text-[#5FA037] bg-[#5FA037]/5 px-4 py-2 rounded-full border border-[#5FA037]/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5FA037] animate-pulse" />
                  <span className="tracking-wide">In Development</span>
                </div>
              </div>

              {/* Email Notification Form */}
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700 mb-4">
                    Get notified when we launch
                  </p>
                </div>
                
                {popupEmailStatus === 'success' ? (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center justify-center gap-3 text-[#5FA037] bg-[#5FA037]/5 border border-[#5FA037]/20 px-6 py-4 rounded-2xl"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#5FA037] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Thank you! We'll notify you when ready.</span>
                  </motion.div>
                ) : (
                  <form onSubmit={handlePopupEmailSubmit} className="space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        value={popupEmail}
                        onChange={(e) => {
                          setPopupEmail(e.target.value)
                          if (popupEmailStatus === 'error') setPopupEmailStatus('idle')
                        }}
                        placeholder="Enter your email address"
                        className={`w-full px-5 py-4 bg-gray-50 border ${
                          popupEmailStatus === 'error' ? 'border-red-300 bg-red-50' : 'border-transparent'
                        } rounded-2xl focus:outline-none focus:bg-white focus:border-[#5FA037]/30 focus:ring-4 focus:ring-[#5FA037]/10 transition-all duration-300 text-sm font-light placeholder:text-gray-400`}
                        disabled={popupEmailStatus === 'loading'}
                      />
                    </div>
                    
                    {/* Botão no estilo da Homepage */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <button
                        type="submit"
                        disabled={popupEmailStatus === 'loading'}
                        className="group w-full h-12 rounded-full transition-all duration-500 bg-[#5FA037] text-white hover:bg-[#4d8c2d] font-medium tracking-tight shadow-md hover:shadow-lg hover:shadow-[#5FA037]/25 border-0 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {/* Subtle shine effect on hover */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                        
                        {popupEmailStatus === 'loading' ? (
                          <span className="relative flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Sending...</span>
                          </span>
                        ) : (
                          <span className="relative flex items-center gap-2">
                            <span>Notify Me When Ready</span>
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:scale-105" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                          </span>
                        )}
                      </button>
                    </motion.div>
                  </form>
                )}

                {popupEmailStatus === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs text-center font-light"
                  >
                    Please enter a valid email address
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}