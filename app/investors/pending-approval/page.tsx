"use client"

import { useState, useEffect } from 'react'
import { Clock, Mail, CheckCircle2, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { auth } from '../../../lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getInvestor } from '../../../lib/firebase-helpers'

export default function PendingApprovalPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    setMounted(true)

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/investors/login')
        return
      }

      try {
        const investor = await getInvestor(user.uid)
        
        if (!investor) {
          router.push('/investors/login')
          return
        }

        // Verificar status
        if (investor.status === 'approved') {
          router.push('/investors')
          return
        }

        if (investor.status === 'pending_nda') {
          router.push('/investors/nda')
          return
        }

        if (investor.status === 'rejected') {
          // TODO: Criar página de rejected ou mostrar mensagem
          console.log('Account rejected')
        }

        setLoading(false)
      } catch (err) {
        console.error('Error checking investor:', err)
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  // Check status every 30 seconds
  useEffect(() => {
    if (!mounted || loading) return

    const checkStatus = async () => {
      const user = auth.currentUser
      if (!user) return

      setChecking(true)
      try {
        const investor = await getInvestor(user.uid)
        
        if (investor?.status === 'approved') {
          router.push('/investors')
        }
      } catch (err) {
        console.error('Error checking status:', err)
      }
      setChecking(false)
    }

    // Check immediately
    checkStatus()

    // Then check every 30 seconds
    const interval = setInterval(checkStatus, 30000)

    return () => clearInterval(interval)
  }, [mounted, loading, router])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#044050] to-[#033842] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#044050] to-[#033842] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Subtle accent lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[480px]"
      >
        <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
          {/* Header */}
          <div className="px-12 pt-12 pb-8 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-8"
            >
              <div className="w-20 h-20 bg-[#FFA500]/[0.08] rounded-full flex items-center justify-center mx-auto relative">
                <Clock className="w-10 h-10 text-[#FFA500]" strokeWidth={1.2} />
                
                {/* Animated pulse ring */}
                <div className="absolute inset-0 rounded-full border-2 border-[#FFA500]/30 animate-ping" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-3xl sm:text-4xl font-extralight text-[#044050] mb-4 tracking-tight">
                Pending Approval
              </h1>
              <p className="text-base text-gray-600 font-light leading-relaxed max-w-md mx-auto">
                Thank you for signing the NDA.
                <br />
                Our team is reviewing your information.
              </p>
            </motion.div>
          </div>

          {/* Status Steps */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="px-12 py-8 bg-gray-50/50"
          >
            <div className="space-y-6">
              {/* Step 1 - Completed */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5FA037] flex items-center justify-center mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">Account Created</h3>
                  <p className="text-xs text-gray-500 font-light">Your account has been successfully created</p>
                </div>
              </div>

              {/* Step 2 - Completed */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5FA037] flex items-center justify-center mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">NDA Signed</h3>
                  <p className="text-xs text-gray-500 font-light">Non-disclosure agreement accepted</p>
                </div>
              </div>

              {/* Step 3 - In Progress */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FFA500] flex items-center justify-center mt-0.5 relative">
                  <Loader2 className="w-4 h-4 text-white animate-spin" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">Admin Review</h3>
                  <p className="text-xs text-gray-500 font-light">Awaiting approval from Greencheck team</p>
                </div>
              </div>

              {/* Step 4 - Pending */}
              <div className="flex items-start gap-4 opacity-40">
                <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 bg-white mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">Access Granted</h3>
                  <p className="text-xs text-gray-500 font-light">Full access to investor portal</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Auto-checking status */}
          {checking && (
            <div className="px-12 py-4 border-t border-gray-100 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 text-[#044050] animate-spin" />
              <p className="text-xs text-gray-500 font-light">Checking status...</p>
            </div>
          )}

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="px-12 py-8 border-t border-gray-100"
          >
            <div className="text-center">
              <p className="text-xs text-gray-500 font-light mb-6">
                You will receive an email as soon as your access is approved
              </p>

              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-2xl">
                <Mail className="w-5 h-5 text-[#044050]" strokeWidth={1.5} />
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-0.5">
                    Contact
                  </p>
                  <a 
                    href="mailto:diego.rocha@bureausocial.org.br" 
                    className="text-sm text-[#044050] font-light hover:text-[#5FA037] transition-colors"
                  >
                    diego.rocha@bureausocial.org.br
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <div className="px-12 py-6 border-t border-gray-100/50 bg-gray-50/30">
            <button
              onClick={() => auth.signOut().then(() => router.push('/investors/login'))}
              className="w-full text-xs text-gray-400 hover:text-[#044050] font-light transition-all duration-300 tracking-wide"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-center text-[11px] text-white/25 font-extralight mt-7 tracking-[0.15em] uppercase"
        >
          Usually takes 24-48 hours
        </motion.p>
      </motion.div>
    </div>
  )
}



