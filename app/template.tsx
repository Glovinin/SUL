'use client'

import { motion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
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
      className="min-h-screen bg-white will-change-transform backface-visibility-hidden"
      style={{
        transformOrigin: 'center top'
      }}
    >
      {children}
    </motion.div>
  )
}
