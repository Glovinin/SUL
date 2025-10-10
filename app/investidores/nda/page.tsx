"use client"

import { useState, useEffect } from 'react'
import { CheckCircle2, Loader2, FileText, ShieldCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { auth } from '../../../lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getInvestor, signNDA, getUserIP } from '../../../lib/firebase-helpers'

export default function NDAPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [signing, setSigning] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [scrolledToBottom, setScrolledToBottom] = useState(false)

  useEffect(() => {
    setMounted(true)

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/investidores/login')
        return
      }

      try {
        const investor = await getInvestor(user.uid)
        
        if (!investor) {
          router.push('/investidores/login')
          return
        }

        // Verificar status
        if (investor.status === 'approved') {
          router.push('/investidores')
          return
        }

        if (investor.status === 'pending_approval') {
          router.push('/investidores/pending-approval')
          return
        }

        setLoading(false)
      } catch (err) {
        console.error('Error checking investor:', err)
        setError('Error loading data')
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget
    const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 50
    setScrolledToBottom(isAtBottom)
  }

  const handleSignNDA = async () => {
    if (!accepted) {
      setError('Please accept the NDA to continue')
      return
    }

    setSigning(true)
    setError('')

    try {
      const user = auth.currentUser
      if (!user) throw new Error('Not authenticated')

      // Capturar IP do usuário
      const ipAddress = await getUserIP()

      // Assinar NDA no Firestore
      await signNDA(user.uid, ipAddress, 'v1.0')

      setSuccess(true)
      setTimeout(() => {
        router.push('/investidores/pending-approval')
      }, 2000)
    } catch (err) {
      console.error('Error signing NDA:', err)
      setError('Error signing NDA. Please try again.')
      setSigning(false)
    }
  }

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#044050] to-[#033842] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#044050] to-[#033842] flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl"
      >
        <AnimatePresence mode="wait">
          {success ? (
            // Success State
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-[32px] p-16 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 150, damping: 15 }}
                className="w-20 h-20 bg-gradient-to-br from-[#5FA037] to-[#4d8c2d] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#5FA037]/20"
              >
                <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={1.5} />
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-3xl font-extralight text-[#044050] tracking-tight mb-4"
              >
                NDA Signed Successfully
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-gray-600 font-light"
              >
                Redirecting to approval page...
              </motion.p>
            </motion.div>
          ) : (
            // NDA Document
            <motion.div
              key="nda"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-[32px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
            >
              {/* Header */}
              <div className="px-8 sm:px-12 pt-10 pb-6 border-b border-gray-100 text-center">
                <div className="w-16 h-16 bg-[#044050]/[0.04] rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-[#044050]" strokeWidth={1.2} />
                </div>
                <h1 className="text-3xl sm:text-4xl font-extralight text-[#044050] mb-3 tracking-tight">
                  Non-Disclosure Agreement
                </h1>
                <p className="text-sm text-gray-500 font-light">
                  Please read carefully before signing
                </p>
              </div>

              {/* NDA Content - Scrollable */}
              <div 
                className="px-8 sm:px-12 py-8 max-h-[50vh] overflow-y-auto"
                onScroll={handleScroll}
              >
                <div className="prose prose-sm max-w-none">
                  <h2 className="text-xl font-semibold text-[#044050] mb-4">1. Confidential Information</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    This Non-Disclosure Agreement (the "Agreement") is entered into by and between <strong>Greencheck, Lda.</strong> ("Disclosing Party") 
                    and the undersigned investor ("Receiving Party") for the purpose of preventing the unauthorized disclosure of Confidential Information 
                    as defined below.
                  </p>

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    For purposes of this Agreement, "Confidential Information" shall include all information or material that has or could have commercial 
                    value or other utility in the business in which Disclosing Party is engaged. Confidential Information includes, but is not limited to:
                  </p>

                  <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                    <li>Business plans, strategies, and financial projections</li>
                    <li>Technical data, trade secrets, and know-how</li>
                    <li>Customer lists and supplier information</li>
                    <li>Marketing strategies and market analysis</li>
                    <li>Product development plans and specifications</li>
                    <li>Intellectual property, patents, and proprietary technology</li>
                    <li>Any other information marked as "Confidential"</li>
                  </ul>

                  <h2 className="text-xl font-semibold text-[#044050] mb-4">2. Obligations of Receiving Party</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    The Receiving Party agrees to:
                  </p>

                  <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                    <li>Hold and maintain the Confidential Information in strictest confidence for the sole and exclusive benefit of the Disclosing Party</li>
                    <li>Carefully restrict access to Confidential Information to employees, contractors, and third parties as is reasonably required</li>
                    <li>Not disclose, without prior written approval of Disclosing Party, any Confidential Information to third parties</li>
                    <li>Not use any Confidential Information for any purpose except to evaluate and engage in discussions concerning a potential business relationship</li>
                    <li>Not copy or reverse engineer any Confidential Information</li>
                  </ul>

                  <h2 className="text-xl font-semibold text-[#044050] mb-4">3. Time Periods</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    The nondisclosure provisions of this Agreement shall survive the termination of this Agreement and Receiving Party's duty to hold 
                    Confidential Information in confidence shall remain in effect for a period of <strong>five (5) years</strong> from the date of disclosure.
                  </p>

                  <h2 className="text-xl font-semibold text-[#044050] mb-4">4. No Warranty</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    All Confidential Information is provided "AS IS" and without any warranty, express, implied or otherwise, regarding its accuracy 
                    or performance. The Disclosing Party assumes no liability for any damages resulting from the use of the information.
                  </p>

                  <h2 className="text-xl font-semibold text-[#044050] mb-4">5. Return of Materials</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    All documents and other tangible objects containing or representing Confidential Information which have been disclosed by Disclosing 
                    Party to Receiving Party, and all copies thereof which are in the possession of Receiving Party, shall be and remain the property of 
                    Disclosing Party and shall be promptly returned to Disclosing Party upon request.
                  </p>

                  <h2 className="text-xl font-semibold text-[#044050] mb-4">6. Governing Law</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    This Agreement shall be governed by and construed in accordance with the laws of <strong>Portugal</strong>, without giving effect to 
                    any principles of conflicts of law.
                  </p>

                  <h2 className="text-xl font-semibold text-[#044050] mb-4">7. Entire Agreement</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    This Agreement constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior 
                    or contemporaneous oral or written agreements concerning such subject matter.
                  </p>

                  {!scrolledToBottom && (
                    <div className="sticky bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent flex items-end justify-center pb-2">
                      <p className="text-xs text-gray-400 animate-pulse">Scroll to read more ↓</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Acceptance Checkbox */}
              <div className="px-8 sm:px-12 py-6 border-t border-gray-100">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="flex-shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={accepted}
                      onChange={(e) => setAccepted(e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-gray-300 text-[#5FA037] focus:ring-2 focus:ring-[#5FA037]/20 transition-all cursor-pointer"
                    />
                  </div>
                  <span className="text-sm text-gray-700 font-light leading-relaxed group-hover:text-gray-900 transition-colors">
                    I have read and accept the <strong>Non-Disclosure Agreement (NDA)</strong> of Greencheck. 
                    I understand that all information shared is confidential and may not be disclosed to third parties.
                  </span>
                </label>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-500 font-light mt-4"
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  onClick={handleSignNDA}
                  disabled={!accepted || signing}
                  className="group w-full h-14 rounded-full transition-all duration-500 bg-[#5FA037] text-white hover:bg-[#4d8c2d] font-medium tracking-tight shadow-md hover:shadow-lg hover:shadow-[#5FA037]/25 disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden mt-6"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  <span className="relative flex items-center justify-center gap-3">
                    {signing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Signing NDA...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" />
                        <span>Sign NDA & Continue</span>
                      </>
                    )}
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

