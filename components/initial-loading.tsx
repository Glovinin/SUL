"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLoading } from '../contexts/loading-context'
import Image from 'next/image'
import { useHomepageSettings } from '../lib/properties-client'

// Cache keys para otimização
const HERO_IMAGE_CACHE_KEY = 'sul_estate_hero_image_loaded'
const HERO_IMAGE_CACHE_TIMESTAMP = 'sul_estate_hero_image_timestamp'
const HERO_VIDEO_CACHE_KEY = 'sul_estate_hero_video_loaded'
const HERO_VIDEO_CACHE_TIMESTAMP = 'sul_estate_hero_video_timestamp'
const HERO_VIDEO_URL_CACHE_KEY = 'sul_estate_hero_video_url'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 horas

export default function InitialLoading() {
  const { isInitialLoading, isPageLoading, setIsInitialLoading } = useLoading()
  const { settings: homepageSettings, loading: settingsLoading } = useHomepageSettings()
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [heroImagePreloaded, setHeroImagePreloaded] = useState(false)
  const [heroImageLoaded, setHeroImageLoaded] = useState(false)
  const [heroVideoLoaded, setHeroVideoLoaded] = useState(false)
  const [logoTransitioning, setLogoTransitioning] = useState(false)
  const [videoPreloadStarted, setVideoPreloadStarted] = useState(false)
  const [videoFromCache, setVideoFromCache] = useState(false)
  const [animationStartTime, setAnimationStartTime] = useState<number | null>(null)

  // Obter URL do vídeo (aguardar settings carregarem)
  const heroVideo = settingsLoading ? null : (homepageSettings?.heroVideo || '/videos/video.mp4')
  
  // Tempo mínimo para mostrar a animação (mesmo com cache)
  const MIN_ANIMATION_DURATION = 2500 // 2.5 segundos mínimo

  useEffect(() => {
    setMounted(true)
    setAnimationStartTime(Date.now()) // Registrar quando a animação começou
    
    if (typeof window === 'undefined') return
    
    // Detectar se é mobile para otimizar performance
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Verificar se a imagem do hero já foi carregada antes (cache)
    const checkHeroImageCache = () => {
      try {
        const cached = localStorage.getItem(HERO_IMAGE_CACHE_KEY)
        const timestamp = localStorage.getItem(HERO_IMAGE_CACHE_TIMESTAMP)
        
        if (cached && timestamp) {
          const cacheAge = Date.now() - parseInt(timestamp)
          if (cacheAge < CACHE_DURATION) {
            setHeroImagePreloaded(true)
            return
          }
        }
      } catch (error) {
        // Silent error handling
      }
    }
    
    checkHeroImageCache()
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Precarregar vídeo quando settings estiverem disponíveis
  useEffect(() => {
    if (!mounted || settingsLoading || !heroVideo || videoPreloadStarted) return

    // Verificar cache do vídeo
    const checkVideoCache = () => {
      try {
        const cached = localStorage.getItem(HERO_VIDEO_CACHE_KEY)
        const timestamp = localStorage.getItem(HERO_VIDEO_CACHE_TIMESTAMP)
        const cachedUrl = localStorage.getItem(HERO_VIDEO_URL_CACHE_KEY)
        
        if (cached && timestamp && cachedUrl === heroVideo) {
          const cacheAge = Date.now() - parseInt(timestamp)
          if (cacheAge < CACHE_DURATION) {
            // Vídeo está em cache, mas ainda vamos mostrar a animação
            setVideoFromCache(true)
            setVideoPreloadStarted(true) // Marcar como iniciado para evitar re-execução
            // Aguardar um pouco antes de marcar como carregado para mostrar a animação
            setTimeout(() => {
              setHeroVideoLoaded(true)
            }, 100) // Pequeno delay para garantir que a animação começou
            return true
          }
        }
      } catch (error) {
        // Silent error handling
      }
      return false
    }

    // Se não estiver em cache, precarregar o vídeo
    if (!checkVideoCache()) {
      setVideoPreloadStarted(true)
      const video = document.createElement('video')
      video.preload = 'auto'
      video.muted = true
      video.playsInline = true
      
      const handleCanPlay = () => {
        setHeroVideoLoaded(true)
        
        // Salvar no cache local
        try {
          localStorage.setItem(HERO_VIDEO_CACHE_KEY, 'true')
          localStorage.setItem(HERO_VIDEO_CACHE_TIMESTAMP, Date.now().toString())
          localStorage.setItem(HERO_VIDEO_URL_CACHE_KEY, heroVideo)
        } catch (error) {
          // Silent error handling
        }
        
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('error', handleError)
      }
      
      const handleError = () => {
        // Se o vídeo falhar, ainda assim permitir continuar após um delay mínimo
        setTimeout(() => {
          setHeroVideoLoaded(true)
        }, 1000)
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('error', handleError)
      }
      
      video.addEventListener('canplay', handleCanPlay)
      video.addEventListener('error', handleError)
      video.src = heroVideo
      
      // Tentar carregar o vídeo
      video.load()
    }
  }, [mounted, settingsLoading, heroVideo, videoPreloadStarted])

  // Quando o vídeo carregar, iniciar transição (garantindo tempo mínimo de animação)
  useEffect(() => {
    if (heroVideoLoaded && !logoTransitioning && animationStartTime !== null) {
      const elapsedTime = Date.now() - animationStartTime
      const remainingTime = Math.max(0, MIN_ANIMATION_DURATION - elapsedTime)
      
      // Aguardar o tempo restante para completar o tempo mínimo de animação
      const transitionTimer = setTimeout(() => {
        setLogoTransitioning(true)
        
        // Notificar o navbar que a transição começou
        window.dispatchEvent(new CustomEvent('logo-transition-start'))
        
        // Notificar que a página pode começar a aparecer (com pequeno delay para sobreposição suave)
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('page-can-appear'))
        }, 200)
        
        // Esconder o loading após animação de fade out
        // A página aparecerá com fade in suave simultaneamente
        setTimeout(() => {
          setIsInitialLoading(false)
        }, 800) // Duração da animação de fade out do loading
      }, remainingTime + 200) // +200ms para garantir que tudo está pronto
      
      return () => clearTimeout(transitionTimer)
    }
  }, [heroVideoLoaded, logoTransitioning, setIsInitialLoading, animationStartTime])

  if (!mounted) {
    return null
  }

  // Loading rápido para navegação entre páginas removido em favor de transições fluidas (app/template.tsx)

  // Versão ultra-premium - Studio Design Apple Style
  return (
    <AnimatePresence>
      {isInitialLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: logoTransitioning ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] w-screen h-screen overflow-hidden bg-black pointer-events-none"
          style={{ pointerEvents: logoTransitioning ? 'none' : 'auto' }}
        >
          {/* Background preto premium com gradient sutil */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/95"
            animate={{ 
              opacity: logoTransitioning ? 0 : 1
            }}
            transition={{ duration: 0.8 }}
          />
          
          {/* Subtle vignette effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
          
          {/* Hero Image Preload - Carrega em background para cache */}
          <Image
            src="/images/herobg.jpg"
            alt="SUL ESTATE Hero Background"
            fill
            className="object-cover opacity-0"
            priority
            onLoad={() => {
              setHeroImageLoaded(true)
              
              // Salvar no cache local
              try {
                localStorage.setItem(HERO_IMAGE_CACHE_KEY, 'true')
                localStorage.setItem(HERO_IMAGE_CACHE_TIMESTAMP, Date.now().toString())
              } catch (error) {
                // Silent error handling
              }
            }}
          />

          {/* Container central - Ultra premium */}
          <div className="absolute inset-0 flex items-center justify-center z-[10000] pointer-events-none">
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: logoTransitioning ? 0 : 1,
                scale: logoTransitioning ? 0.85 : 1
              }}
              transition={{ 
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {/* Welcome message - palavra por palavra */}
              <motion.div 
                className="mb-12 md:mb-16 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: logoTransitioning ? 0 : 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
                  {/* "Welcome" */}
                  <motion.span
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    animate={{ 
                      opacity: logoTransitioning ? 0 : 1,
                      y: logoTransitioning ? 30 : 0,
                      filter: logoTransitioning ? 'blur(10px)' : 'blur(0px)'
                    }}
                    transition={{ 
                      duration: 0.8,
                      delay: 0.3,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="text-[17px] md:text-[21px] font-light text-white/70 tracking-[0.02em]"
                  >
                    Welcome
                  </motion.span>
                  
                  {/* "to" */}
                  <motion.span
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    animate={{ 
                      opacity: logoTransitioning ? 0 : 1,
                      y: logoTransitioning ? 30 : 0,
                      filter: logoTransitioning ? 'blur(10px)' : 'blur(0px)'
                    }}
                    transition={{ 
                      duration: 0.8,
                      delay: 0.5,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="text-[17px] md:text-[21px] font-light text-white/70 tracking-[0.02em]"
                  >
                    to
                  </motion.span>
                </div>
              </motion.div>

              {/* SUL Logo - Ultra elegante */}
              <motion.div
                className="text-center mb-8 md:mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: logoTransitioning ? 0 : 1 }}
              >
                <div className="overflow-hidden">
                  <motion.h1
                    className={`${isMobile ? 'text-5xl' : 'text-6xl md:text-7xl lg:text-8xl'} font-semibold text-white tracking-[-0.03em] leading-[1.05] mb-2`}
                  >
                    {/* SUL */}
                    <motion.span
                      initial={{ opacity: 0, y: 60, filter: 'blur(20px)' }}
                      animate={{ 
                        opacity: logoTransitioning ? 0 : 1, 
                        y: logoTransitioning ? 60 : 0,
                        filter: logoTransitioning ? 'blur(20px)' : 'blur(0px)'
                      }}
                      transition={{ 
                        duration: 1.0, 
                        delay: 0.7,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="inline-block"
                    >
                      SUL
                    </motion.span>
                  </motion.h1>
                </div>
              </motion.div>

              {/* Subtítulo elegante */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: logoTransitioning ? 0 : 0.6,
                  y: logoTransitioning ? 20 : 0
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1.4,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="text-white text-[11px] md:text-[13px] font-light tracking-[0.3em] uppercase mb-12 md:mb-16"
              >
                Real Estate Advisory In Portugal
              </motion.div>

              {/* Loading dots refinados */}
              <motion.div
                className="flex items-center justify-center gap-2.5"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: logoTransitioning ? 0 : 1
                }}
                transition={{ 
                  duration: 0.6,
                  delay: 1.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/50 rounded-full"
                    animate={{
                      scale: logoTransitioning ? 1 : [1, 1.5, 1],
                      opacity: logoTransitioning ? 0 : [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: logoTransitioning ? 0 : Infinity,
                      delay: i * 0.2,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
