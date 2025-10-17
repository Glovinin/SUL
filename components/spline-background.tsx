"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface SplineBackgroundProps {
  className?: string
}

export default function SplineBackground({ className = "" }: SplineBackgroundProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    // Simular carregamento do iframe
    const timer = setTimeout(() => {
      setIframeLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Detectar quando o usuário sai da hero section para otimizar performance
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      // Desktop: desaparece aos 60% da viewport (mais suave)
      // Mobile: desaparece aos 30% (melhor performance)
      const heroHeight = window.innerHeight * (isMobile ? 0.3 : 0.6)
      
      // Fade progressivo baseado no scroll
      const fadeProgress = Math.max(0, 1 - (scrollPosition / heroHeight))
      setOpacity(fadeProgress)
      
      // Esconder iframe completamente quando atinge o limite
      setIsVisible(scrollPosition < heroHeight)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Placeholder enquanto carrega */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 bg-[#044050] ${
          iframeLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
      
      {/* Spline 3D Animation - Crystal Ball (renderizado apenas quando visível) */}
      {isVisible && (
        <iframe           src='https://my.spline.design/crystalball-35c36a2f9650bec5da71971cf512f33f/' 

          frameBorder='0' 
          width='100%' 
          height='100%'
          className={`transition-opacity ${
            iframeLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            opacity: iframeLoaded ? opacity : 0,
            transition: 'opacity 0.15s linear'
          }}
          onLoad={() => {
            console.log('🔮 Spline Crystal Ball loaded - otimizado para desaparecer ao scroll')
            setIframeLoaded(true)
          }}
          title="Crystal Ball 3D Animation"
        />
      )}

      {/* Efeito linear transparente em toda região inferior - Mais forte */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(4, 64, 80, 0.95) 0%, rgba(4, 64, 80, 0.8) 30%, rgba(4, 64, 80, 0.4) 70%, transparent 100%)',
          zIndex: 15
        }}
      />
      
      {/* Elementos informativos nos cantos - Desktop apenas */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-auto hidden md:block z-[21]">
        {/* Urgência CSRD - Canto esquerdo */}
        <div className="absolute bottom-8 left-8 max-w-sm pointer-events-none">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-lg shadow-amber-500/50" />
              <span className="text-xs font-semibold tracking-[0.15em] text-white/70 uppercase">
                CSRD Mandatory 2025
              </span>
            </div>
            <p className="text-sm font-medium text-white/80 leading-relaxed">
              Your company needs ESG certification<br />
              <span className="text-xs font-light text-white/60">Guaranteed compliance with EU Taxonomy</span>
            </p>
          </div>
        </div>
        
        {/* Benefícios para empresas - Canto direito */}
        <div className="absolute bottom-8 right-8 pointer-events-none">
          <div className="flex items-start gap-6">
            <div className="text-right">
              <div className="text-xl font-bold text-[#5FA037]">€35</div>
              <div className="text-xs font-light text-white/60 tracking-wide">per tCO₂e</div>
              <div className="text-[10px] font-light text-[#5FA037]/70 mt-0.5">Save 40%</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-right">
              <div className="text-xl font-bold text-white/80">21 days</div>
              <div className="text-xs font-light text-white/60 tracking-wide">Certified</div>
              <div className="text-[10px] font-light text-white/40 mt-0.5">NFT Blockchain</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-right">
              <div className="text-xl font-bold text-white/80">100%</div>
              <div className="text-xs font-light text-white/60 tracking-wide">Scientific</div>
              <div className="text-[10px] font-light text-white/40 mt-0.5">Validated</div>
            </div>
          </div>
        </div>
        
        {/* Linha decorativa sutil */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      </div>
      
      {/* Botão Learn More - Posicionado na borda inferior da hero */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 2.6, 
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <motion.button 
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="group flex flex-col items-center gap-3 transition-all duration-500 hover:scale-110"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            y: [0, -8, 0],
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          {/* Círculo principal com gradiente e glow */}
          <motion.div 
            className="w-12 h-12 rounded-full border-2 border-white/40 flex items-center justify-center transition-all duration-500 group-hover:border-white/80 group-hover:shadow-lg group-hover:shadow-white/20 backdrop-blur-sm relative overflow-hidden"
            whileHover={{ 
              boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)",
              borderColor: "rgba(255, 255, 255, 0.8)"
            }}
          >
            {/* Efeito de brilho interno */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-full"
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                opacity: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
            
            {/* Seta animada */}
            <motion.svg 
              className="w-5 h-5 text-white/70 transition-all duration-500 group-hover:text-white relative z-10" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ 
                y: [0, 2, 0],
              }}
              transition={{
                y: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </motion.div>
          
          {/* Texto com efeito de pulse */}
          <motion.span 
            className="text-xs font-light tracking-[0.3em] uppercase text-white/60 transition-all duration-500 group-hover:text-white/90"
            animate={{ 
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              opacity: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            Learn more
          </motion.span>
        </motion.button>
      </motion.div>
      
    </div>
  )
}

