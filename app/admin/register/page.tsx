"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { motion } from 'framer-motion'
import { Button } from '../../../components/ui/button'
import { GridPattern } from '../../../components/ui/grid-pattern'
import { auth, db } from '../../../lib/firebase'
import {
  EnvelopeSimple,
  Lock,
  Eye,
  EyeSlash,
  Key,
  ArrowRight,
  UserPlus,
  User
} from '@phosphor-icons/react'
import Link from 'next/link'

const ACCESS_CODE = 'arcadesoft222'

export default function AdminRegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<'code' | 'register'>('code')
  const [accessCode, setAccessCode] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (accessCode === ACCESS_CODE) {
      setStep('register')
    } else {
      setError('Invalid access code')
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!name.trim()) {
      setError('Name is required')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      if (!auth || !db) {
        throw new Error('Firebase not initialized')
      }

      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Create admin document in Firestore with name
      await setDoc(doc(db, 'admins', user.uid), {
        uid: user.uid,
        name: name.trim(),
        email: email,
        role: 'admin',
        createdAt: serverTimestamp(),
        createdBy: 'self-registration'
      })

      // Update user display name (optional, doesn't block registration)
      try {
        await updateProfile(user, { displayName: name.trim() })
      } catch (profileError) {
        console.warn('Could not update user profile:', profileError)
        // Continue anyway - name is saved in Firestore
      }

      // Success - redirect to login
      router.push('/login?registered=true')
    } catch (err: any) {
      console.error('Registration error:', err)
      
      // Handle specific Firebase errors
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please sign in instead.')
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address')
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak')
      } else {
        setError(err.message || 'Failed to create account. Please try again.')
      }
    } finally {
      setLoading(false)
    }
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

      {/* Container */}
      <div className="relative z-10 w-full max-w-[440px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {step === 'code' ? (
            <>
              {/* Access Code Step */}
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
                  <Key className="w-8 h-8 text-black/70" weight="duotone" />
                </motion.div>
                
                <h1 className="text-[36px] md:text-[42px] font-semibold text-black mb-3 tracking-[-0.03em] leading-[1.1]">
                  Admin Registration
                </h1>
                <p className="text-[16px] text-black/60 leading-[1.6]">
                  Enter the access code to continue
                </p>
              </motion.div>

              <motion.form 
                onSubmit={handleCodeSubmit}
                className="space-y-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {/* Access Code Field */}
                <div>
                  <label className="block text-[14px] font-medium text-black/70 mb-2">
                    Access Code
                  </label>
                  <div className="relative">
                    <Key 
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" 
                      weight="duotone" 
                    />
                    <input
                      type="password"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      placeholder="Enter access code"
                      className="w-full bg-white border border-black/10 text-black placeholder-black/40 pl-12 pr-4 py-3.5 rounded-2xl focus:outline-none focus:border-black/30 focus:bg-black/[0.02] transition-all duration-200 text-[15px]"
                      required
                      autoFocus
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit"
                    className="w-full bg-black text-white hover:bg-black/90 border-0 px-6 py-3.5 rounded-full text-[15px] font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    Verify Code
                    <ArrowRight className="w-4 h-4" weight="bold" />
                  </Button>
                </motion.div>
              </motion.form>
            </>
          ) : (
            <>
              {/* Registration Step */}
              <motion.div 
                className="text-center mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-black/5 flex items-center justify-center"
                >
                  <UserPlus className="w-8 h-8 text-black/70" weight="duotone" />
                </motion.div>
                
                <h1 className="text-[36px] md:text-[42px] font-semibold text-black mb-3 tracking-[-0.03em] leading-[1.1]">
                  Create Admin Account
                </h1>
                <p className="text-[16px] text-black/60 leading-[1.6]">
                  Enter your details to create an admin account
                </p>
              </motion.div>

              <motion.form 
                onSubmit={handleRegister}
                className="space-y-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {/* Name Field */}
                <div>
                  <label className="block text-[14px] font-medium text-black/70 mb-2">
                    Name *
                  </label>
                  <div className="relative">
                    <User 
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" 
                      weight="duotone" 
                    />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full bg-white border border-black/10 text-black placeholder-black/40 pl-12 pr-4 py-3.5 rounded-2xl focus:outline-none focus:border-black/30 focus:bg-black/[0.02] transition-all duration-200 text-[15px]"
                      required
                      autoFocus
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-[14px] font-medium text-black/70 mb-2">
                    Email *
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
                      placeholder="admin@example.com"
                      className="w-full bg-white border border-black/10 text-black placeholder-black/40 pl-12 pr-4 py-3.5 rounded-2xl focus:outline-none focus:border-black/30 focus:bg-black/[0.02] transition-all duration-200 text-[15px]"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-[14px] font-medium text-black/70 mb-2">
                    Password *
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
                      minLength={6}
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

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-[14px] font-medium text-black/70 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock 
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" 
                      weight="duotone" 
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="w-full bg-white border border-black/10 text-black placeholder-black/40 pl-12 pr-12 py-3.5 rounded-2xl focus:outline-none focus:border-black/30 focus:bg-black/[0.02] transition-all duration-200 text-[15px]"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black/70 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeSlash className="w-5 h-5" weight="duotone" />
                      ) : (
                        <Eye className="w-5 h-5" weight="duotone" />
                      )}
                    </button>
                  </div>
                </div>

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
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create Admin Account
                        <ArrowRight className="w-4 h-4" weight="bold" />
                      </>
                    )}
                  </Button>
                </motion.div>

                {/* Back Button */}
                <button
                  type="button"
                  onClick={() => {
                    setStep('code')
                    setError('')
                    setName('')
                    setEmail('')
                    setPassword('')
                    setConfirmPassword('')
                  }}
                  className="w-full text-center text-[14px] text-black/60 hover:text-black transition-colors"
                >
                  ← Back to access code
                </button>
              </motion.form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}

