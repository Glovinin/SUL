"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface AdminSettings {
  avatar: string
  name: string
  title: string
}

export function AdminContactCard({ useTransparentStyle = false }: { useTransparentStyle?: boolean }) {
  const router = useRouter()
  const [adminSettings, setAdminSettings] = useState<AdminSettings | null>(null)

  useEffect(() => {
    const loadAdminSettings = async () => {
      try {
        const response = await fetch('/api/chat/admin-settings')
        const data = await response.json()
        
        if (data.success && data.settings) {
          setAdminSettings(data.settings)
        }
      } catch (error) {
        // Silent error
      }
    }

    loadAdminSettings()
    
    // Atualizar settings a cada 30 segundos
    const interval = setInterval(loadAdminSettings, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const handleBookCall = () => {
    // Navegar para a página de contato
    router.push('/contact')
  }

  if (!adminSettings) {
    // Não mostrar nada enquanto carrega
    return null
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={handleBookCall}
      className={`
        hidden md:flex items-center gap-3 px-4 py-3 rounded-full
        transition-all duration-200 cursor-pointer my-4
        ${useTransparentStyle
          ? 'bg-white/10 backdrop-blur-md hover:bg-white/15 border border-white/20'
          : 'bg-black hover:bg-black/90 border border-black/10'
        }
        shadow-sm hover:shadow-md
      `}
    >
      {/* Avatar com indicador verde */}
      <div className="relative flex-shrink-0" style={{ padding: '2px' }}>
        {adminSettings.avatar ? (
          <img
            src={adminSettings.avatar}
            alt={adminSettings.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              {adminSettings.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        
        {/* Indicador verde de online - posicionado no top-left */}
        <div 
          className="absolute top-0 left-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-black shadow-lg z-10"
          style={{ transform: 'translate(-25%, -25%)' }}
        >
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full bg-green-500"
            style={{ margin: '-2px' }}
          />
        </div>
      </div>

      {/* Nome e Título */}
      <div className="flex flex-col items-start min-w-0 flex-1">
        <span className={`
          text-[14px] font-semibold truncate
          ${useTransparentStyle ? 'text-white' : 'text-white'}
        `}>
          {adminSettings.name}
        </span>
        <span className={`
          text-[11px] truncate
          ${useTransparentStyle ? 'text-white/70' : 'text-white/70'}
        `}>
          {adminSettings.title}
        </span>
      </div>

      {/* Botão Book a call */}
      <div className={`
        flex-shrink-0 px-3 py-1.5 rounded-lg
        ${useTransparentStyle 
          ? 'bg-white/20 hover:bg-white/30' 
          : 'bg-white/10 hover:bg-white/20'
        }
        transition-all duration-200
      `}>
        <span className={`
          text-[12px] font-medium whitespace-nowrap
          ${useTransparentStyle ? 'text-white' : 'text-white'}
        `}>
          Book a call
        </span>
      </div>
    </motion.button>
  )
}

