"use client"

import { motion } from 'framer-motion'

interface LearnMoreButtonProps {
  className?: string
}

export default function LearnMoreButton({ className = "" }: LearnMoreButtonProps) {
  return (
    <motion.div 
      className={`flex flex-col items-center gap-3 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: 1.5,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <button 
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        className="group flex flex-col items-center gap-2 transition-all duration-300 hover:scale-105"
      >
        <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center transition-all duration-300 group-hover:border-white/60 group-hover:bg-white/5 backdrop-blur-sm">
          <svg 
            className="w-5 h-5 text-white/60 transition-all duration-300 group-hover:text-white group-hover:translate-y-0.5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <span className="text-xs font-light tracking-[0.2em] uppercase text-white/60 transition-all duration-300 group-hover:text-white">
          Learn more
        </span>
      </button>
    </motion.div>
  )
}


