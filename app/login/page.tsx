"use client"

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/button'
import { GridPattern } from '../../components/ui/grid-pattern'
import { auth } from '../../lib/firebase'
import { 
  EnvelopeSimple,
  Lock,
  Eye,
  EyeSlash,
  ArrowRight,
  User
} from '@phosphor-icons/react'
import Link from 'next/link'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Check for registration success message
    try {
      if (searchParams?.get('registered') === 'true') {
        setSuccessMessage('Account created successfully! Please sign in.')
      }
    } catch (e) {
      // Ignore searchParams errors
    }

    if (!auth) {
      return
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/admin')
      }
    })
    
    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [router, searchParams, mounted])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!mounted) {
        throw new Error('Please wait for the page to load')
      }

      if (!auth) {
        throw new Error('Firebase auth not initialized. Please refresh the page.')
      }
      
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/admin')
    } catch (err: any) {
      console.error('Login error:', err)
      const errorMessage = err.code === 'auth/user-not-found' 
        ? 'User not found. Please check your email.'
        : err.code === 'auth/wrong-password'
        ? 'Incorrect password. Please try again.'
        : err.code === 'auth/invalid-email'
        ? 'Invalid email address.'
        : err.code === 'auth/too-many-requests'
        ? 'Too many failed attempts. Please try again later.'
        : err.message || 'Failed to sign in. Please check your credentials.'
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black/60">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <GridPattern
        width={40}
        height={40}
        className="fill-black/[0.02] stroke-black/[0.02]"
      />

      {/* Back to Home Link */}
      <Link 
        href="/"
        className="fixed top-8 left-8 text-[22px] md:text-[24px] font-semibold tracking-tight text-black hover:text-black/70 transition-colors z-50"
      >
        SUL
      </Link>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-[440px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-black/5 flex items-center justify-center"
            >
              <User className="w-8 h-8 text-black/70" weight="duotone" />
            </motion.div>
            
            <h1 className="text-[36px] md:text-[42px] font-semibold text-black mb-3 tracking-[-0.03em] leading-[1.1]">
              Welcome Back
            </h1>
            <p className="text-[16px] text-black/60 leading-[1.6]">
              Sign in to access your account
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Email Field */}
            <div>
              <label className="block text-[14px] font-medium text-black/70 mb-2">
                Email
              </label>
              <div className="relative">
                <EnvelopeSimple 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" 
                  weight="duotone" 
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white border border-black/10 text-black placeholder-black/40 pl-12 pr-4 py-3.5 rounded-2xl focus:outline-none focus:border-black/30 focus:bg-black/[0.02] transition-all duration-200 text-[15px]"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[14px] font-medium text-black/70 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" 
                  weight="duotone" 
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-white border border-black/10 text-black placeholder-black/40 pl-12 pr-12 py-3.5 rounded-2xl focus:outline-none focus:border-black/30 focus:bg-black/[0.02] transition-all duration-200 text-[15px]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black/70 transition-colors"
                >
                  {showPassword ? (
                    <EyeSlash className="w-5 h-5" weight="duotone" />
                  ) : (
                    <Eye className="w-5 h-5" weight="duotone" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-black/20 text-black focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-[14px] text-black/60 group-hover:text-black transition-colors">
                  Remember me
                </span>
              </label>
              <a 
                href="#" 
                className="text-[14px] text-black/60 hover:text-black transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-sm text-green-600">{successMessage}</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              <Button 
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white hover:bg-black/90 border-0 px-6 py-3.5 rounded-full text-[15px] font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" weight="bold" />
                  </>
                )}
              </Button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black/60">Loading...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}

