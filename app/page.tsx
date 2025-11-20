"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Button } from '../components/ui/button'
import { GridPattern } from '../components/ui/grid-pattern'
import { NavBar } from '../components/navbar'
import { Footer } from '../components/Footer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useFeaturedProperties, useProperties, useHomepageSettings, usePortfolio } from '../lib/properties-client'
import { formatPrice } from '../lib/format-price'
import { useLoading } from '../contexts/loading-context'
import { TypingEffect } from '../components/typing-effect'
import { 
  ArrowRight,
  Bed,
  Bathtub,
  ArrowsOut,
  User,
  Star,
  Buildings
} from '@phosphor-icons/react'

// Featured projects will be loaded from Firebase

export default function Home() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const { featuredProperties, loading: propertiesLoading } = useFeaturedProperties()
  const { properties: allProperties } = useProperties()
  const { portfolioItems, loading: portfolioLoading } = usePortfolio()

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Optimized animation props for mobile
  const getAnimationProps = (delay = 0) => ({
    transition: {
      duration: isMobile ? 0.4 : 0.8,
      delay: isMobile ? delay * 0.5 : delay,
      ease: (isMobile ? [0.25, 0.1, 0.25, 1] : [0.22, 1, 0.36, 1]) as [number, number, number, number]
    },
    viewport: {
      once: true,
      margin: isMobile ? '0px' : '-50px',
      amount: isMobile ? 0.2 : undefined
    }
  })
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const { settings: homepageSettings } = useHomepageSettings()
  const { isInitialLoading } = useLoading()
  const [pageCanAppear, setPageCanAppear] = useState(false)

  // Escutar evento para permitir que a página apareça suavemente
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handlePageCanAppear = () => {
      setPageCanAppear(true)
    }
    
    window.addEventListener('page-can-appear', handlePageCanAppear)
    
    // Se o loading já terminou, permitir que a página apareça
    if (!isInitialLoading) {
      setPageCanAppear(true)
    }
    
    return () => {
      window.removeEventListener('page-can-appear', handlePageCanAppear)
    }
  }, [isInitialLoading])

  // Use homepage settings video or fallback to default
  const heroVideo = homepageSettings?.heroVideo || '/videos/video.mp4'
  const heroVideoPoster = homepageSettings?.heroVideoPoster || '/images/hero-poster.jpg'
  
  // Verificar cache do vídeo
  React.useEffect(() => {
    if (!heroVideo || typeof window === 'undefined') return
    
    try {
      const cached = localStorage.getItem('sul_estate_hero_video_loaded')
      const cachedUrl = localStorage.getItem('sul_estate_hero_video_url')
      
      // Se o vídeo está em cache e é o mesmo vídeo, considerar como carregado
      if (cached === 'true' && cachedUrl === heroVideo) {
        setVideoLoaded(true)
      }
    } catch (error) {
      // Silent error handling
    }
  }, [heroVideo])
  
  // Optimized video loading - carrega apenas quando necessário
  React.useEffect(() => {
    const video = videoRef.current
    if (!video || !heroVideo || videoLoaded) return

    // Reset states quando vídeo muda
    setVideoError(false)

    // Event listeners para otimização
    const handleCanPlay = () => {
      setVideoLoaded(true)
      setVideoError(false)
      video.muted = true
      const playPromise = video.play()
      
      if (playPromise !== undefined) {
        playPromise
          .catch(() => {
            // Autoplay prevented - tentar novamente silenciosamente
            setTimeout(() => {
              video.play().catch(() => {
                // Falha silenciosa - autoplay não permitido
              })
            }, 1000)
          })
      }
    }

    const handleError = () => {
      setVideoError(true)
    }

    const handleLoadedData = () => {
      setVideoLoaded(true)
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('error', handleError)
    }
  }, [heroVideo, videoLoaded])

  return (
    <AnimatePresence mode="wait">
      {pageCanAppear && (
        <motion.div
          key="homepage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-screen bg-white"
        >
      {/* Navigation */}
      <NavBar isHomePage={true} />

      {/* Hero Section - Ultra-Premium Design */}
      <section className="relative min-h-screen flex items-center justify-center bg-black">
        {/* Background Video with Elegant Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Loading state - mostra poster enquanto carrega */}
          {!videoLoaded && !videoError && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              {heroVideoPoster && (
                <img 
                  src={heroVideoPoster} 
                  alt="Loading video" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/30 border-t-white"></div>
                <p className="text-white/70 text-sm">Loading video...</p>
              </div>
            </div>
          )}
          
          <video
            key={heroVideo}
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={heroVideoPoster}
            className={`absolute inset-0 w-full h-full object-cover scale-110 transition-opacity duration-500 transition-transform duration-20000 ease-out hover:scale-105 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoadedData={() => {
              // Garantir que o vídeo está pronto antes de mostrar
              if (videoRef.current) {
                setVideoLoaded(true)
              }
            }}
            onCanPlay={() => {
              // Mostrar vídeo quando estiver pronto para reproduzir
              if (videoRef.current) {
                setVideoLoaded(true)
              }
            }}
          >
            <source src={heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Fallback se vídeo falhar */}
          {videoError && heroVideoPoster && (
            <img 
              src={heroVideoPoster} 
              alt="Hero background" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {/* Vignette effect - Premium depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_40%,rgba(0,0,0,0.4)_100%)]" />
          {/* Modern gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>
        
        {/* Hero Content - Ultra Elegant Typography - iOS Style */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-20"
        >
          <div className="text-center flex flex-col items-center justify-center min-h-[60vh]">
            {/* Main Heading - Large, Elegant, Minimalist - iOS Spring Animation */}
            <motion.h1
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 1,
                delay: 0.2
              }}
              className="text-[40px] sm:text-[52px] md:text-[64px] lg:text-[72px] xl:text-[80px] font-light tracking-[-0.02em] text-white leading-[1.05] mb-8 md:mb-12 max-w-[1200px] mx-auto"
              style={{ 
                letterSpacing: '-0.02em',
                fontWeight: 300,
                textShadow: '0 2px 40px rgba(0,0,0,0.3), 0 1px 20px rgba(0,0,0,0.2)'
              }}
            >
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 120,
                  damping: 25,
                  mass: 0.8,
                  delay: 0.4
                }}
                className="inline-block"
              >
                Real Estate & Investment<br className="hidden md:block" /> in Portugal
              </motion.span>
            </motion.h1>

            {/* Subtitle - Refined, Harmonious - iOS Fade with Typing */}
            <motion.p
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 0.9,
                delay: 0.7
              }}
              className="text-[18px] md:text-[22px] lg:text-[24px] font-light text-white/90 leading-[1.5] max-w-[680px] mx-auto tracking-[-0.01em]"
              style={{ 
                fontWeight: 300,
                textShadow: '0 2px 30px rgba(0,0,0,0.25), 0 1px 15px rgba(0,0,0,0.15)'
              }}
            >
              <TypingEffect 
                text="We assist international clients finding their ideal home or investment."
                speed={35}
                delay={1100}
              />
            </motion.p>
          </div>

        </motion.div>

        {/* Scroll Indicator - Premium - iOS Style */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.8,
            delay: 1.4
          }}
          className="absolute bottom-14 left-1/2 -translate-x-1/2 z-[10] hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: [0.4, 0, 0.2, 1],
              repeatDelay: 0.5
            }}
            className="w-7 h-11 rounded-full border-2 border-white/30 flex items-start justify-center p-2.5 backdrop-blur-sm bg-white/5 shadow-lg"
          >
            <motion.div
              animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
              className="w-1.5 h-2.5 bg-white/70 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Divider - Smooth Transition */}
      <div className="border-t border-black/[0.03] bg-white"></div>

      {/* About SUL Section - Premium Design */}
      <section className="relative py-20 md:py-28 bg-white overflow-visible">
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.015] stroke-black/[0.015]"
        />
        
        {/* Ambient Light Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-black/[0.02] via-transparent to-transparent blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-[1000px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-8"
            >
              <span className="text-[12px] font-medium text-black/60">About SUL</span>
            </motion.div>

            {/* Main Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[18px] md:text-[20px] lg:text-[22px] font-normal text-black/70 leading-[1.8] max-w-[900px] mx-auto"
            >
              SUL is an independent boutique real estate advisory, offering bespoke guidance in property acquisition, development, and management across Portugal. We assist international clients in finding and shaping their ideal home or investment — from strategic sourcing to full project coordination and long-term value enhancement.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-black/[0.03]"></div>

      {/* Portfolio Section - Modern Apple Grid */}
      <section id="portfolio" className="py-20 md:py-28 bg-white overflow-visible">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12 overflow-visible pb-8">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6"
            >
              <span className="text-[12px] font-medium text-black/60">Portfolio</span>
            </motion.div>
            
            {/* Main Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[40px] md:text-[52px] font-semibold text-black mb-6 tracking-[-0.02em] leading-[1.1] max-w-[900px] mx-auto"
            >
              Our completed projects and success stories
            </motion.h2>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[17px] md:text-[19px] font-normal text-black/60 leading-[1.6] mb-8 max-w-[700px] mx-auto"
            >
              SUL Collection: Success Stories.
            </motion.p>
          </motion.div>

          {/* Sort portfolio items: featured first */}
          {(() => {
            const sortedPortfolioItems = [...portfolioItems].sort((a, b) => {
              if (a.featured && !b.featured) return -1
              if (!a.featured && b.featured) return 1
              return 0
            })

            return (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-0 py-4 md:p-8 lg:p-12 overflow-visible">
                {portfolioLoading ? (
                  <div className="col-span-full text-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                    <p className="text-black/60">Loading portfolio...</p>
                  </div>
                ) : sortedPortfolioItems.length === 0 ? (
                  <div className="col-span-full text-center py-20">
                    <p className="text-black/60">No portfolio items available yet.</p>
                  </div>
                ) : (
                  sortedPortfolioItems.slice(0, 3).map((item, index) => (
                    <Link key={item.id} href={`/portfolio/${item.id}`}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{
                          once: true,
                          margin: isMobile ? '0px' : '-50px',
                          amount: isMobile ? 0.2 : undefined
                        }}
                        transition={{
                          duration: isMobile ? 0.4 : 0.6,
                          delay: isMobile ? index * 0.02 : index * 0.05,
                          ease: isMobile ? [0.25, 0.1, 0.25, 1] : [0.22, 1, 0.36, 1]
                        }}
                        className="group cursor-pointer z-[1] hover:z-[10] hover:-translate-y-1 transition-all duration-300"
                        style={{ willChange: 'transform, opacity' }}
                      >
                        {/* Portfolio Image Container - Premium Apple Style */}
                        <div className="relative aspect-[4/5] md:aspect-[16/11] lg:aspect-[4/5] overflow-hidden mb-7 rounded-[24px] shadow-sm group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out bg-gray-100">
                          {/* Image com zoom suave */}
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-800 ease-out group-hover:scale-[1.08]"
                            style={{ 
                              objectFit: 'cover',
                              objectPosition: 'center',
                              minWidth: '100%',
                              minHeight: '100%'
                            }}
                          />
                          
                          {/* Tag Badge - Ultra Premium */}
                          <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                            {item.featured && (
                              <div className="bg-black text-white px-4 py-2 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.2)] flex items-center gap-1.5">
                                <Star className="w-3 h-3" weight="fill" />
                                <span className="text-[10px] font-semibold tracking-[0.08em] uppercase">Featured</span>
                              </div>
                            )}
                            {item.tag && item.tag !== 'Featured' && (
                              <div className="bg-white/95 backdrop-blur-2xl px-4 py-2 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                                <span className="text-[10px] font-semibold text-black tracking-[0.08em] uppercase">{item.tag}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Overlay Premium - Aparece no hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
                          
                          {/* Shine Effect - Apple Style */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
                          </div>
                        </div>
                        
                        {/* Portfolio Details - Ultra Clean Typography */}
                        <div className="px-1">
                          {/* Location - Subtle */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-1 h-1 rounded-full bg-black/20"></div>
                            <p className="text-[11px] font-medium text-black/40 tracking-[0.1em] uppercase">
                              {item.location}
                            </p>
                          </div>
                          
                          {/* Title - Bold & Clean */}
                          <h3 className="text-[20px] md:text-[22px] font-semibold text-black mb-4 tracking-[-0.02em] leading-[1.2] group-hover:text-black/60 transition-colors duration-500">
                            {item.title}
                          </h3>
                          
                          {/* Portfolio Stats - Refined */}
                          <div className="flex items-center gap-6 pt-5 border-t border-black/[0.06]">
                            {item.beds && item.beds !== '0' && (
                              <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-full bg-black/[0.03] flex items-center justify-center group-hover:bg-black/[0.05] transition-colors duration-300">
                                  <Bed className="w-[17px] h-[17px] text-black/50" weight="duotone" />
                                </div>
                                <span className="text-[14px] font-medium text-black/70">{item.beds}</span>
                              </div>
                            )}
                            {item.baths && item.baths !== '0' && (
                              <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-full bg-black/[0.03] flex items-center justify-center group-hover:bg-black/[0.05] transition-colors duration-300">
                                  <Bathtub className="w-[17px] h-[17px] text-black/50" weight="duotone" />
                                </div>
                                <span className="text-[14px] font-medium text-black/70">{item.baths}</span>
                              </div>
                            )}
                            {item.sqft && item.sqft !== '0' && (
                              <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-full bg-black/[0.03] flex items-center justify-center group-hover:bg-black/[0.05] transition-colors duration-300">
                                  <ArrowsOut className="w-[17px] h-[17px] text-black/50" weight="duotone" />
                                </div>
                                <span className="text-[14px] font-medium text-black/70">{item.sqft}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))
                )}
              </div>
            )
          })()}
          
          {/* View Portfolio Button */}
          {portfolioItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12"
            >
              <Button 
                onClick={() => router.push('/portfolio')}
                className="bg-black text-white hover:bg-black/90 border-0 px-8 py-3 rounded-full text-[15px] font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 mx-auto"
              >
                View our portfolio
                <ArrowRight className="w-4 h-4" weight="bold" />
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Find Property Section */}
      <section className="py-20 md:py-28 bg-white relative overflow-x-hidden">
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.02] stroke-black/[0.02]"
        />
        <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-full"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=1000&fit=crop&q=80"
                  alt="Property Search"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="flex flex-col justify-center py-8 lg:py-12"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6 w-fit"
              >
                <span className="text-[12px] font-medium text-black/60">Property Search</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[40px] md:text-[52px] font-semibold text-black mb-6 tracking-[-0.02em] leading-[1.1]"
              >
                Can't find what you're looking for?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-[17px] md:text-[19px] font-normal text-black/60 leading-[1.6] mb-10"
              >
                We help our clients find houses, apartments, or businesses to buy or invest in Portugal. 
                Tell us what you're looking for and we'll help you find the perfect property.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="w-fit"
              >
                <Button
                  onClick={() => router.push('/find-property')}
                  className="bg-black text-white hover:bg-black/90 border-0 px-8 py-3.5 rounded-full text-[16px] font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
                >
                  Search for your property with us
                  <ArrowRight className="w-4 h-4" weight="bold" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-black/[0.03]"></div>

      {/* Featured Projects Section - Modern Apple Grid */}
      <section id="projects" className="py-20 md:py-28 bg-white overflow-visible">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12 overflow-visible pb-8">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6"
            >
              <span className="text-[12px] font-medium text-black/60">Properties</span>
            </motion.div>
            
            {/* Main Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[40px] md:text-[52px] font-semibold text-black mb-6 tracking-[-0.02em] leading-[1.1] max-w-[900px] mx-auto"
            >
              Find homes that perfectly match your lifestyle
            </motion.h2>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[17px] md:text-[19px] font-normal text-black/60 leading-[1.6] mb-8 max-w-[700px] mx-auto"
            >
              Curated collection of premium properties across Portugal's most desirable locations
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-0 py-4 md:p-8 lg:p-12 overflow-visible">
            {propertiesLoading ? (
              <div className="col-span-full text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                <p className="text-black/60">Loading properties...</p>
              </div>
            ) : featuredProperties.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className="text-black/60">No properties available yet.</p>
              </div>
            ) : (
              featuredProperties.slice(0, 3).map((project, index) => (
              <Link key={project.id} href={`/properties/${project.id}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{
                    once: true,
                    margin: isMobile ? '0px' : '-50px',
                    amount: isMobile ? 0.2 : undefined
                  }}
                  transition={{
                    duration: isMobile ? 0.4 : 0.6,
                    delay: isMobile ? index * 0.02 : index * 0.05,
                    ease: isMobile ? [0.25, 0.1, 0.25, 1] : [0.22, 1, 0.36, 1]
                  }}
                  className="group cursor-pointer z-[1] hover:z-[10] hover:-translate-y-1 transition-all duration-300"
                  style={{ willChange: 'transform, opacity' }}
                >
                {/* Property Image Container - Premium Apple Style */}
                <div className="relative aspect-[4/5] md:aspect-[16/11] lg:aspect-[4/5] overflow-hidden mb-7 rounded-[24px] shadow-sm group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out bg-gray-100">
                  {/* Image com zoom suave */}
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-800 ease-out group-hover:scale-[1.08]"
                    style={{ 
                      objectFit: 'cover',
                      objectPosition: 'center',
                      minWidth: '100%',
                      minHeight: '100%'
                    }}
                  />
                  
                  {/* Tag Badge - Ultra Premium */}
                  <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                    {project.featured && (
                      <div className="bg-black text-white px-4 py-2 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.2)] flex items-center gap-1.5">
                        <Star className="w-3 h-3" weight="fill" />
                        <span className="text-[10px] font-semibold tracking-[0.08em] uppercase">Featured</span>
                      </div>
                    )}
                    {project.tag && project.tag !== 'Featured' && (
                      <div className="bg-white/95 backdrop-blur-2xl px-4 py-2 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                        <span className="text-[10px] font-semibold text-black tracking-[0.08em] uppercase">{project.tag}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Overlay Premium - Aparece no hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
                  
                  {/* Shine Effect - Apple Style */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
                  </div>
                </div>
                
                {/* Property Details - Ultra Clean Typography */}
                <div className="px-1">
                  {/* Location - Subtle */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-1 rounded-full bg-black/20"></div>
                    <p className="text-[11px] font-medium text-black/40 tracking-[0.1em] uppercase">
                      {project.location}
                    </p>
                  </div>
                  
                  {/* Title - Bold & Clean */}
                  <h3 className="text-[20px] md:text-[22px] font-semibold text-black mb-4 tracking-[-0.02em] leading-[1.2] group-hover:text-black/60 transition-colors duration-500">
                    {project.title}
                  </h3>
                  
                  {/* Price - Hero Element */}
                  <div className="mb-6">
                    <p className="text-[32px] md:text-[36px] font-semibold text-black tracking-[-0.02em] leading-none">
                      {formatPrice(project.price)}
                    </p>
                  </div>
                  
                  {/* Property Stats - Refined */}
                  <div className="flex items-center gap-6 pt-5 border-t border-black/[0.06]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-black/[0.03] flex items-center justify-center group-hover:bg-black/[0.05] transition-colors duration-300">
                        <Bed className="w-[17px] h-[17px] text-black/50" weight="duotone" />
                      </div>
                      <span className="text-[14px] font-medium text-black/70">{project.beds}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-black/[0.03] flex items-center justify-center group-hover:bg-black/[0.05] transition-colors duration-300">
                        <Bathtub className="w-[17px] h-[17px] text-black/50" weight="duotone" />
                      </div>
                      <span className="text-[14px] font-medium text-black/70">{project.baths}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-black/[0.03] flex items-center justify-center group-hover:bg-black/[0.05] transition-colors duration-300">
                        <ArrowsOut className="w-[17px] h-[17px] text-black/50" weight="duotone" />
                      </div>
                      <span className="text-[14px] font-medium text-black/70">{project.sqft}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              </Link>
            ))
            )}
          </div>
          
          {/* View All Properties Button */}
          {featuredProperties.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12"
            >
              <Button 
                onClick={() => router.push('/properties')}
                className="bg-black text-white hover:bg-black/90 border-0 px-8 py-3 rounded-full text-[15px] font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 mx-auto"
              >
                View all Properties
                <ArrowRight className="w-4 h-4" weight="bold" />
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action Section - Apple Style */}
      <section className="py-20 md:py-28 bg-black">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[900px] mx-auto px-6 md:px-12 text-center"
        >
          <h2 className="text-[40px] md:text-[56px] font-semibold text-white mb-8 tracking-[-0.02em] leading-[1.15]">
            Every search is unique.
          </h2>
          <p className="text-[17px] md:text-[21px] font-normal text-white/80 mb-12 max-w-[640px] mx-auto leading-[1.5]">
            Share your vision — we'll curate a personalized selection for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button 
              onClick={() => router.push('/properties')}
              className="bg-white text-black hover:bg-white/95 border-0 px-8 py-3.5 rounded-full text-[16px] font-medium transition-all duration-200 min-w-[200px] shadow-sm hover:shadow-md"
            >
              Start your search
            </Button>
            <Button 
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.open('https://wa.me/33662527879', '_blank')
                }
              }}
              className="bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/30 px-8 py-3.5 rounded-full text-[16px] font-medium transition-all duration-200 min-w-[200px]"
            >
              Book a Free Call
            </Button>
          </div>
          <div className="pt-8 border-t border-white/10">
            <Button 
              onClick={() => router.push('/contact?action=sell')}
              className="bg-transparent text-white hover:bg-white/10 border border-white/30 hover:border-white/40 px-8 py-3.5 rounded-full text-[16px] font-medium transition-all duration-200"
            >
              SELL WITH US — Tell us about your property
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

