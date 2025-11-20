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

      {/* Nome SUL ESTATE centralizado - estilo minimalista premium */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          {/* Nome SUL ESTATE */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-light text-white tracking-[0.1em]`} style={{ fontFamily: 'Playfair Display, serif' }}>
              <span className="font-light">SUL</span>
              <span className="font-extralight mx-2 md:mx-3">ESTATE</span>
            </h1>
            
            {/* Loading dots animados - cor branca */}
            <motion.div
              className="flex items-center justify-center gap-2 mt-6 md:mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}