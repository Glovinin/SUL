"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Loading LEVE para navegação entre páginas
// Visual elegante minimalista - apenas texto SUL ESTATE em fundo preto
export default function Loading() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 z-[9998] w-screen h-screen overflow-hidden bg-black"
    >
      {/* Fundo preto */}
      <div className="absolute inset-0 bg-black" />

      {/* Nome SUL centralizado - estilo iOS elegante */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 25,
            mass: 0.8
          }}
          className="flex flex-col items-center gap-6"
        >
          {/* Nome SUL */}
          <motion.h1
            className={`${isMobile ? 'text-[36px]' : 'text-[42px] md:text-[48px] lg:text-[54px]'} font-semibold text-white tracking-[-0.02em]`}
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              filter: 'blur(0px)'
            }}
            transition={{ 
              type: "spring",
              stiffness: 150,
              damping: 20,
              mass: 0.9,
              delay: 0.1
            }}
          >
            SUL
          </motion.h1>
          
          {/* Loading dots animados - estilo iOS */}
          <motion.div
            className="flex items-center justify-center gap-1.5 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/60 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: 1
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: [0.4, 0, 0.2, 1]
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}