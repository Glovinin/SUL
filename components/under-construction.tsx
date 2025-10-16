"use client"

import { Construction, ArrowLeft, Hammer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface UnderConstructionProps {
  title?: string
  description?: string
  icon?: React.ReactNode
}

export function UnderConstruction({ 
  title = "Em Construção",
  description = "Esta página está sendo desenvolvida. Em breve estará disponível com novos recursos incríveis.",
  icon
}: UnderConstructionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C2526] via-[#1C2526] to-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.8 
          }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            {/* Pulsing Circle */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.2, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-[#34C759] rounded-full blur-xl"
            />
            
            {/* Icon Container */}
            <div className="relative bg-[#34C759]/20 backdrop-blur-sm border border-[#34C759]/30 rounded-full p-8">
              {icon || <Construction size={64} className="text-[#34C759]" strokeWidth={1.5} />}
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-xl text-white/70 mb-12 leading-relaxed max-w-xl mx-auto"
        >
          {description}
        </motion.p>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-12"
        >
          <div className="relative w-full max-w-md mx-auto h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "60%" }}
              transition={{ 
                delay: 1,
                duration: 1.5,
                ease: "easeOut"
              }}
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#34C759] to-[#30D158] rounded-full"
            />
          </div>
          <p className="text-sm text-white/60 mt-3">Progresso: 60%</p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/">
            <Button 
              size="lg"
              className="rounded-full px-8 bg-[#34C759] hover:bg-[#34C759]/90 text-white shadow-lg shadow-[#34C759]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#34C759]/30 hover:scale-105"
            >
              <ArrowLeft size={20} className="mr-2" />
              Voltar à Home
            </Button>
          </Link>
          
          <Link href="/validation">
            <Button 
              size="lg"
              variant="outline"
              className="rounded-full px-8 border-[#34C759]/30 text-white hover:bg-[#34C759]/10 hover:border-[#34C759]/50 transition-all duration-300"
            >
              <Hammer size={20} className="mr-2" />
              Iniciar Validação
            </Button>
          </Link>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <p className="text-sm text-white/50">
            Tem alguma dúvida? Entre em contato:{' '}
            <a 
              href="mailto:contact@greencheck.app" 
              className="text-[#34C759] hover:text-[#34C759]/80 transition-colors duration-300 underline underline-offset-4"
            >
              contact@greencheck.app
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}


