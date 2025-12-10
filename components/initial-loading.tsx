"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLoading } from '../contexts/loading-context'

export default function InitialLoading() {
  const { isInitialLoading, setIsInitialLoading } = useLoading()
  const [show, setShow] = useState(true)

  useEffect(() => {
    // Sequência de animação otimizada para velocidade e elegância
    // Total duration: ~2.2s (Rapid, premium feel)

    // Bloquear scroll durante a animação (Garantia dupla: body + html)
    const lockScroll = () => {
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0) // Forçar topo da página
      }
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    }

    const unlockScroll = () => {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }

    lockScroll()

    // 1. Notificar que a transição do logo começou (para navbar, etc)
    const logoTimer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('logo-transition-start'))
    }, 1500)

    // 2. Permitir que a página apareça por baixo (preload visual)
    const pageTimer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('page-can-appear'))
    }, 1800)

    // 3. Finalizar loading
    const endTimer = setTimeout(() => {
      setShow(false)
      // Pequeno delay para garantir que a animação de saída termine antes de remover do DOM
      setTimeout(() => {
        setIsInitialLoading(false)
        unlockScroll()
      }, 800)
    }, 2200)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(pageTimer)
      clearTimeout(endTimer)
      // Garantia de fallback para liberar scroll caso o componente desmonte forçadamente
      unlockScroll()
    }
  }, [setIsInitialLoading])

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 1.2, ease: [0.33, 1, 0.68, 1] } // Slower, smoother exit
          }}
          className="fixed inset-0 z-[9999] w-screen h-screen flex items-center justify-center overflow-hidden pointer-events-none"
        >
          {/* Transparent Backdrop with Blur - "Frosted Glass" over the video */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md transition-all duration-1000 ease-out" />
          <div className="relative z-10">
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center justify-center text-center space-y-2"
            >
              {/* "Welcome to" - Elegant, Tracking - Sliding UP from mask */}
              <div className="overflow-hidden">
                <motion.p
                  variants={{
                    initial: { y: "100%", opacity: 0 },
                    animate: {
                      y: 0,
                      opacity: 0.9,
                      transition: {
                        duration: 1.4,
                        ease: [0.76, 0, 0.24, 1], // Editorial ease
                      }
                    },
                    exit: {
                      y: "-100%",
                      opacity: 0,
                      transition: { duration: 0.4, ease: "easeIn" }
                    }
                  }}
                  className="text-lg md:text-xl font-light text-white tracking-[0.25em] uppercase mb-1"
                >
                  Welcome to
                </motion.p>
              </div>

              {/* "SUL" - Main Typography - Sliding UP from mask with slight stagger */}
              <div className="overflow-hidden pb-1"> {/* pb-1 to prevent font clipping at bottom if any */}
                <motion.h1
                  variants={{
                    initial: { y: "110%", opacity: 0 },
                    animate: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 1.4,
                        delay: 0.15, // Staggered slightly
                        ease: [0.76, 0, 0.24, 1], // Editorial ease
                      }
                    },
                    exit: {
                      y: "-110%",
                      opacity: 0,
                      transition: { duration: 0.4, ease: "easeIn" }
                    }
                  }}
                  className="text-7xl md:text-[140px] font-semibold text-white tracking-[-0.04em] leading-[0.85]"
                >
                  SUL
                </motion.h1>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
