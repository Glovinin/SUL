"use client"

import { useState, useEffect } from 'react'
import { ArrowRight, ShieldCheck, Mail, Lock as LockIcon, Loader2, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { auth } from '../../../lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { isAdmin } from '../../../lib/firebase-helpers'

export default function AdminLoginPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Se já está autenticado, verificar se é admin
    const checkAuth = async () => {
      const user = auth.currentUser
      if (user) {
        const adminStatus = await isAdmin(user.uid)
        if (adminStatus) {
          router.push('/admin/investors')
        }
      }
    }

    checkAuth()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Login com email/password
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Verificar se é admin
      const adminStatus = await isAdmin(user.uid)

      if (!adminStatus) {
        setError('Unauthorized. Admin access only.')
        await auth.signOut()
        setLoading(false)
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/admin/investors')
      }, 1500)
    } catch (err: any) {
      console.error('Login error:', err)
      
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password')
      } else if (err.code === 'auth/user-not-found') {
        setError('Admin account not found')
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many attempts. Please try again later.')
      } else {
        setError('Login failed. Please try again.')
      }
      
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[420px]"
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
              className="bg-[#1a1a1a] border border-white/10 rounded-[32px] p-14 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 150, damping: 15 }}
                className="w-18 h-18 bg-gradient-to-br from-[#5FA037] to-[#4d8c2d] rounded-full flex items-center justify-center mx-auto mb-7 shadow-lg shadow-[#5FA037]/20"
              >
                <CheckCircle2 className="w-9 h-9 text-white" strokeWidth={1.5} />
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-2xl font-extralight text-white tracking-tight leading-none"
              >
                Access Granted
              </motion.h2>
            </motion.div>
          ) : (
            // Login Form
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-[32px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
            >
              {/* Header */}
              <div className="px-12 pt-12 pb-8 text-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-6"
                >
                  <div className="w-16 h-16 bg-[#5FA037]/[0.08] rounded-full flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-8 h-8 text-[#5FA037]" strokeWidth={1.2} />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="text-3xl font-extralight text-white mb-3 tracking-tight leading-none">
                    Admin Portal
                  </h1>
                  <p className="text-sm text-white/40 font-light tracking-wide">
                    Secure access for authorized personnel only
                  </p>
                </motion.div>
              </div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.8 }}
                className="px-12 pb-10"
              >
                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-xs text-white/40 mb-2 ml-1">Admin Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" strokeWidth={1.5} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@greencheck.pt"
                        className="w-full h-14 pl-12 pr-5 bg-white/[0.03] border border-white/10 rounded-[16px] focus:outline-none focus:border-[#5FA037] focus:bg-white/[0.05] transition-all duration-300 text-sm text-white placeholder:text-white/20"
                        required
                        disabled={loading}
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-2 ml-1">Password</label>
                    <div className="relative">
                      <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" strokeWidth={1.5} />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full h-14 pl-12 pr-5 bg-white/[0.03] border border-white/10 rounded-[16px] focus:outline-none focus:border-[#5FA037] focus:bg-white/[0.05] transition-all duration-300 text-sm text-white placeholder:text-white/20"
                        required
                        disabled={loading}
                        autoComplete="current-password"
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-2xl"
                    >
                      <p className="text-xs text-red-400 font-light text-center">
                        {error}
                      </p>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !email || !password}
                    className="group w-full h-14 rounded-full transition-all duration-500 bg-[#5FA037] text-white hover:bg-[#4d8c2d] font-medium tracking-tight shadow-lg hover:shadow-xl hover:shadow-[#5FA037]/25 disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden mt-6"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    <span className="relative flex items-center justify-center gap-2.5">
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Authenticating...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In</span>
                          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </motion.div>

              {/* Footer */}
              <div className="px-12 py-6 border-t border-white/5 bg-white/[0.01]">
                <button
                  onClick={() => router.push('/')}
                  className="w-full text-xs text-white/30 hover:text-white/60 font-light transition-all duration-300 tracking-wide flex items-center justify-center gap-2 group"
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
          className="text-center text-[11px] text-white/15 font-extralight mt-7 tracking-[0.15em] uppercase"
        >
          Authorized Access Only
        </motion.p>
      </motion.div>
    </div>
  )
}










