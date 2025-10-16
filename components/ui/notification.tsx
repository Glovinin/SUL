"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Hammer } from 'lucide-react'

interface NotificationProps {
  show: boolean
  onClose: () => void
  title?: string
  message?: string
}

export function Notification({ show, onClose, title = "Under Development", message = "Our team is currently developing this feature. Stay tuned!" }: NotificationProps) {
  useEffect(() => {
    // Buscar navbar com mais especificidade
    const navbar = document.querySelector('nav') || document.querySelector('[role="navigation"]')
    
    if (show) {
      console.log('🔔 Notificação aparecendo, navbar encontrado:', !!navbar)
      // Play notification sound - usando som da internet mais confiável
      const playNotificationSound = async () => {
        try {
          // Som de notificação suave e moderno
          const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.wav')
          audio.volume = 0.4
          audio.crossOrigin = 'anonymous'
          await audio.play()
        } catch (error) {
          // Fallback: som sintético usando Web Audio API
          try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()
            
            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)
            
            // Som tipo "ding" suave
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1)
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
            
            oscillator.start(audioContext.currentTime)
            oscillator.stop(audioContext.currentTime + 0.3)
          } catch (fallbackError) {
            console.log('🔇 Notification sound not available')
          }
        }
      }
      
      playNotificationSound()

      // Animar navbar para cima quando notificação aparecer
      if (navbar) {
        console.log('⬆️ Movendo navbar para cima')
        navbar.style.transition = 'transform 0.3s ease-in-out'
        navbar.style.transform = 'translateY(-100%)'
        navbar.style.pointerEvents = 'none' // Desabilita cliques durante animação
      } else {
        console.warn('❌ Navbar não encontrado!')
      }

      // Não precisa mais de timeout aqui, a barra de progresso controla o fechamento
      return () => {}
    } else {
      // Retornar navbar para posição normal quando notificação sumir
      // Delay para sincronizar com animação de saída
      const navbarTimer = setTimeout(() => {
        if (navbar) {
          console.log('⬇️ Retornando navbar para posição original')
          navbar.style.transform = 'translateY(0)'
          navbar.style.pointerEvents = 'auto' // Reabilita cliques
        }
      }, 300)
      
      return () => clearTimeout(navbarTimer)
    }
  }, [show, onClose])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 400, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 400, scale: 0.95 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 35,
            mass: 0.8
          }}
          className="fixed top-4 right-4 left-4 sm:left-auto z-[10000] sm:max-w-sm"
        >
          <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
            {/* Header com blur effect */}
            <div className="relative">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#044050] to-[#5FA037] opacity-5" />
              
              {/* Content */}
              <div className="relative px-4 py-3 sm:px-5 sm:py-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#044050] to-[#033842] flex items-center justify-center shadow-lg">
                      <Hammer className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h3 className="text-xs sm:text-sm font-medium text-[#044050] tracking-tight leading-tight mb-1">
                      {title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-600 font-light leading-relaxed">
                      {message}
                    </p>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 flex items-center justify-center transition-all duration-200 -mt-1"
                  >
                    <X className="w-3.5 h-3.5 text-gray-600" />
                  </button>
                </div>

                {/* Progress Bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 3.5, ease: "linear" }}
                  onAnimationComplete={() => {
                    // Quando a barra completar, fechar a notificação
                    setTimeout(() => onClose(), 100)
                  }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] sm:h-0.5 bg-gradient-to-r from-[#044050] to-[#5FA037] origin-left"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Hook para usar notificações
export function useNotification() {
  const [notification, setNotification] = useState({
    show: false,
    title: '',
    message: ''
  })

  const showNotification = (title?: string, message?: string) => {
    setNotification({
      show: true,
      title: title || "Under Development",
      message: message || "Our team is currently developing this feature. Stay tuned!"
    })
  }

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, show: false }))
  }

  return {
    notification,
    showNotification,
    closeNotification
  }
}

