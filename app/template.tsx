'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
  // Prevenir scrollbar durante animação
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.97, filter: 'blur(15px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 25,
        mass: 0.9,
        restDelta: 0.001
      }}
      onAnimationComplete={() => {
        // Restaurar scroll após animação completar
        document.body.style.overflow = ''
      }}
      className="min-h-screen bg-white will-change-transform backface-visibility-hidden overflow-hidden"
      style={{
        transformOrigin: 'center top'
      }}
    >
      {children}
    </motion.div>
  )
}
