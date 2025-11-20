"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info, X } from '@phosphor-icons/react'

export type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

let toastId = 0
const toasts: Toast[] = []
const listeners: Array<(toasts: Toast[]) => void> = []

function addToast(message: string, type: ToastType = 'info', duration: number = 4000) {
  const id = (toastId++).toString()
  const toast: Toast = { id, message, type, duration }
  
  toasts.push(toast)
  listeners.forEach(listener => listener([...toasts]))
  
  setTimeout(() => {
    removeToast(id)
  }, duration)
}

function removeToast(id: string) {
  const index = toasts.findIndex(t => t.id === id)
  if (index > -1) {
    toasts.splice(index, 1)
    listeners.forEach(listener => listener([...toasts]))
  }
}

export const adminToast = {
  success: (message: string, duration?: number) => addToast(message, 'success', duration),
  error: (message: string, duration?: number) => addToast(message, 'error', duration),
  info: (message: string, duration?: number) => addToast(message, 'info', duration),
}

export function AdminToastContainer() {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>([])

  useEffect(() => {
    listeners.push(setCurrentToasts)
    setCurrentToasts([...toasts])
    
    return () => {
      const index = listeners.indexOf(setCurrentToasts)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {currentToasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 30,
              mass: 0.8
            }}
            className="pointer-events-auto"
          >
            <div className={`
              flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg
              backdrop-blur-xl border min-w-[320px] max-w-[420px]
              ${toast.type === 'success' 
                ? 'bg-white/95 border-green-500/20 shadow-green-500/10' 
                : toast.type === 'error'
                ? 'bg-white/95 border-red-500/20 shadow-red-500/10'
                : 'bg-white/95 border-black/10 shadow-black/5'
              }
            `}>
              {/* Icon */}
              <div className={`
                flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center
                ${toast.type === 'success'
                  ? 'bg-green-500/10'
                  : toast.type === 'error'
                  ? 'bg-red-500/10'
                  : 'bg-black/5'
                }
              `}>
                {toast.type === 'success' && (
                  <CheckCircle className="w-4 h-4 text-green-600" weight="bold" />
                )}
                {toast.type === 'error' && (
                  <XCircle className="w-4 h-4 text-red-600" weight="bold" />
                )}
                {toast.type === 'info' && (
                  <Info className="w-4 h-4 text-black/60" weight="bold" />
                )}
              </div>

              {/* Message */}
              <p className={`
                flex-1 text-[14px] font-normal leading-relaxed
                ${toast.type === 'success'
                  ? 'text-green-900'
                  : toast.type === 'error'
                  ? 'text-red-900'
                  : 'text-black'
                }
              `}>
                {toast.message}
              </p>

              {/* Close Button */}
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 w-6 h-6 rounded-lg hover:bg-black/5 active:bg-black/10 transition-colors flex items-center justify-center"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5 text-black/40" weight="bold" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

