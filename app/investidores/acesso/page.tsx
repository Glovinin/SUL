"use client"

import { useState, useEffect } from 'react'
import { ArrowRight, Lock, Mail, Phone, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

// Hook para detectar mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

export default function AcessoInvestidoresPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const isMobile = useIsMobile()

  const VALID_CODE = 'GREENCHECK222'

  useEffect(() => {
    setMounted(true)
    const hasAccess = localStorage.getItem('greencheck_investor_access')
    if (hasAccess === 'true') {
      router.push('/investidores')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    await new Promise(resolve => setTimeout(resolve, 1000))

    if (code.toUpperCase() === VALID_CODE) {
      setSuccess(true)
      localStorage.setItem('greencheck_investor_access', 'true')
      
      setTimeout(() => {
        router.push('/investidores')
      }, 1800)
    } else {
      setError('Invalid code')
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#044050] to-[#033842] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Subtle accent lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[340px] sm:max-w-[400px]"
      >
        <AnimatePresence mode="wait">
          {success ? (
            // Success State - Ultra minimal
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-[26px] sm:rounded-[32px] p-12 sm:p-14 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 150, damping: 15 }}
                className="w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br from-[#5FA037] to-[#4d8c2d] rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-7 shadow-lg shadow-[#5FA037]/20"
              >
                <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9 text-white" strokeWidth={1.5} />
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl sm:text-2xl font-extralight text-[#044050] tracking-tight leading-none"
              >
                Access Granted
              </motion.h2>
            </motion.div>
          ) : (
            // Main Form - Ultra minimal
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-[26px] sm:rounded-[32px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
            >
              {/* Header - Minimal */}
              <div className="px-8 sm:px-12 pt-10 sm:pt-12 pb-6 sm:pb-8 text-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-5 sm:mb-6"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#044050]/[0.04] rounded-full flex items-center justify-center mx-auto">
                    <Lock className="w-6 h-6 sm:w-7 sm:h-7 text-[#044050]" strokeWidth={1.2} />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="text-2xl sm:text-3xl font-extralight text-[#044050] mb-2 sm:mb-3 tracking-[-0.02em] leading-none">
                    Investor Portal
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-400 font-light tracking-wide">
                    Enter code
                  </p>
                </motion.div>
              </div>

              {/* Form - Super clean */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.8 }}
                className="px-8 sm:px-12 pb-8 sm:pb-10"
              >
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value.toUpperCase())
                          setError('')
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="CODE"
                        className={`w-full h-14 sm:h-16 px-5 bg-gray-50/80 border-2 rounded-[16px] sm:rounded-[20px] focus:outline-none transition-all duration-500 text-center text-sm sm:text-base font-light tracking-[0.3em] placeholder:tracking-[0.15em] placeholder:text-gray-300 text-[#044050] uppercase ${
                          isFocused 
                            ? 'border-[#044050] bg-white scale-[1.01]' 
                            : error 
                            ? 'border-red-300 bg-red-50/50' 
                            : 'border-transparent hover:border-gray-200'
                        }`}
                        required
                        disabled={loading}
                        autoComplete="off"
                        maxLength={20}
                      />
                    </div>
                    
                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-3 text-xs text-red-500 font-light text-center"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !code}
                    className={`group w-full ${
                      isMobile 
                        ? 'h-12 text-base' 
                        : 'h-[52px] text-base'
                    } rounded-full transition-all duration-500 bg-[#5FA037] text-white hover:bg-[#4d8c2d] font-normal tracking-tight shadow-md hover:shadow-lg hover:shadow-[#5FA037]/25 border-0 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {/* Subtle shine effect on hover */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    
                    {loading ? (
                      <span className="relative flex items-center justify-center gap-2.5">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="font-medium">Verifying</span>
                      </span>
                    ) : (
                      <span className="relative flex items-center justify-center gap-2.5">
                        <span className="font-medium">{isMobile ? 'Access Portal' : 'Access Portal'}</span>
                        <ArrowRight className={`${isMobile ? 'h-4 w-4' : 'h-[18px] w-[18px]'} transition-transform duration-300 group-hover:translate-x-0.5 group-hover:scale-105`} />
                      </span>
                    )}
                  </button>
                </form>

                {/* Contact - Ultra Minimal */}
                <div className="mt-7 sm:mt-8 pt-6 sm:pt-7 border-t border-gray-100/80">
                  <p className="text-center text-[10px] sm:text-[11px] text-gray-400 font-light tracking-wider mb-4 sm:mb-5 uppercase">
                    Request Access
                  </p>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <a
                      href="mailto:partners@greencheck.pt"
                      className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-4.5 hover:bg-gray-50/50 rounded-[16px] sm:rounded-[20px] transition-all duration-500"
                    >
                      <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#044050]/[0.04] rounded-full flex items-center justify-center group-hover:bg-[#5FA037]/10 transition-all duration-500 flex-shrink-0">
                        <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#044050] group-hover:text-[#5FA037] transition-colors duration-500" strokeWidth={1.2} />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-[9px] sm:text-[10px] text-gray-400 font-light uppercase tracking-[0.15em] mb-0.5">
                          Email
                        </p>
                        <p className="text-xs sm:text-sm text-[#044050] font-light truncate">
                          partners@greencheck.pt
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#5FA037] group-hover:translate-x-1 transition-all duration-500 flex-shrink-0" strokeWidth={1.2} />
                    </a>

                    <a
                      href="tel:+351931721901"
                      className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-4.5 hover:bg-gray-50/50 rounded-[16px] sm:rounded-[20px] transition-all duration-500"
                    >
                      <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#044050]/[0.04] rounded-full flex items-center justify-center group-hover:bg-[#5FA037]/10 transition-all duration-500 flex-shrink-0">
                        <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#044050] group-hover:text-[#5FA037] transition-colors duration-500" strokeWidth={1.2} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-[9px] sm:text-[10px] text-gray-400 font-light uppercase tracking-[0.15em] mb-0.5">
                          Phone
                        </p>
                        <p className="text-xs sm:text-sm text-[#044050] font-light">
                          +351 931 721 901
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#5FA037] group-hover:translate-x-1 transition-all duration-500 flex-shrink-0" strokeWidth={1.2} />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Footer - Minimal */}
              <div className="px-8 sm:px-12 py-5 sm:py-6 border-t border-gray-100/50">
                <button
                  onClick={() => router.push('/')}
                  className="w-full text-[11px] sm:text-xs text-gray-400 hover:text-[#044050] font-light transition-all duration-300 tracking-wide flex items-center justify-center gap-2 group"
                >
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                  <span>Back to Homepage</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-center text-[10px] sm:text-[11px] text-white/25 font-extralight mt-6 sm:mt-7 tracking-[0.15em] uppercase"
        >
          Confidential
        </motion.p>
      </motion.div>
    </div>
  )
}

