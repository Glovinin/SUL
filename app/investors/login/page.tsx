"use client"

import { useState, useEffect } from 'react'
import { ArrowRight, Lock, User, Building2, Mail, Briefcase, CheckCircle2, Loader2, Eye, EyeOff } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { auth } from '../../../lib/firebase'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  sendEmailVerification
} from 'firebase/auth'
import { createInvestor, getInvestor, updateLastLogin } from '../../../lib/firebase-helpers'

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

type TabType = 'login' | 'signup'

export default function InvestidoresLoginPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>('login')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const isMobile = useIsMobile()

  // Login state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  // Signup state
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showSignupPassword, setShowSignupPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [router])

  // ─────────────────────────────────────────────────────────────
  // LOGIN FUNCTION
  // ─────────────────────────────────────────────────────────────

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Configurar persistence baseado em "Remember Me"
      if (auth) {
        await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence)
      }
      
      // Login com email e senha
      const result = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      const user = result.user

      // Verificar se usuário existe no Firestore
      const investor = await getInvestor(user.uid)
      
      if (!investor) {
        setError('Account not found. Please sign up first.')
        setLoading(false)
        return
      }

      // Atualizar último login
      await updateLastLogin(user.uid)

      // Redirecionar baseado no status
      setSuccess(true)
      setTimeout(() => {
        if (investor.status === 'approved') {
          router.push('/investors')
        } else if (investor.status === 'pending_approval') {
          router.push('/investors/pending-approval')
        } else if (investor.status === 'pending_nda') {
          router.push('/investors/nda')
        } else {
          setError('Your account has been rejected. Please contact support.')
          setLoading(false)
        }
      }, 1500)
    } catch (err: any) {
      console.error('Error logging in:', err)
      
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email')
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password')
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email format')
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later')
      } else {
        setError(err.message || 'Error logging in')
      }
      
      setLoading(false)
    }
  }

  // ─────────────────────────────────────────────────────────────
  // SIGNUP FUNCTION
  // ─────────────────────────────────────────────────────────────

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validar campos
    if (!signupData.email || !signupData.password || !signupData.confirmPassword) {
      setError('Please fill all fields')
      return
    }

    // Validar senha
    if (signupData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      // Criar conta com email e senha
      const result = await createUserWithEmailAndPassword(auth, signupData.email, signupData.password)
      const user = result.user

      // Enviar email de verificação
      await sendEmailVerification(user)

      // Criar documento do investidor no Firestore (dados serão preenchidos no NDA)
      await createInvestor({
        uid: user.uid,
        name: '', // Será preenchido no NDA
        company: '', // Será preenchido no NDA
        role: '', // Será preenchido no NDA
        email: signupData.email,
        phone: '' // Será preenchido no NDA
      })

      setSuccess(true)
      setTimeout(() => {
        router.push('/investors/nda')
      }, 1500)
    } catch (err: any) {
      console.error('Error signing up:', err)
      
      if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists')
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email format')
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak')
      } else {
        setError(err.message || 'Error creating account')
      }
      
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
        className="relative w-full max-w-[400px] sm:max-w-[480px]"
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
                {activeTab === 'login' ? 'Welcome Back' : 'Account Created'}
              </motion.h2>
            </motion.div>
          ) : (
            // Main Form
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-[26px] sm:rounded-[32px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
            >
              {/* Header */}
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
                    {activeTab === 'login' ? 'Welcome back' : 'Create your account'}
                  </p>
                </motion.div>
              </div>

              {/* Tabs */}
              <div className="px-8 sm:px-12 pb-6">
                <div className="flex gap-2 p-1 bg-gray-100/80 rounded-[16px]">
                  <button
                    onClick={() => {
                      setActiveTab('login')
                      setError('')
                    }}
                    className={`flex-1 py-3 rounded-[12px] text-sm font-medium transition-all duration-300 ${
                      activeTab === 'login'
                        ? 'bg-white text-[#044050] shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('signup')
                      setError('')
                    }}
                    className={`flex-1 py-3 rounded-[12px] text-sm font-medium transition-all duration-300 ${
                      activeTab === 'signup'
                        ? 'bg-white text-[#044050] shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              {/* Forms */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.8 }}
                className="px-8 sm:px-12 pb-8 sm:pb-10"
              >
                {activeTab === 'login' ? (
                  // ══════════════════════════════════════════════
                  // LOGIN FORM
                  // ══════════════════════════════════════════════
                  <motion.form
                    key="login-form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleLogin}
                    className="space-y-5"
                  >
                    <div>
                      <label className="block text-xs text-gray-500 mb-2 ml-1">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                        <input
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="joao@company.com"
                          className="w-full h-14 pl-12 pr-5 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-sm text-gray-900 placeholder:text-gray-400"
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-2 ml-1">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                        <input
                          type={showLoginPassword ? 'text' : 'password'}
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full h-14 pl-12 pr-12 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-sm text-gray-900 placeholder:text-gray-400"
                          required
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showLoginPassword ? (
                            <EyeOff className="w-5 h-5" strokeWidth={1.5} />
                          ) : (
                            <Eye className="w-5 h-5" strokeWidth={1.5} />
                          )}
                        </button>
                      </div>
                    </div>

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 font-light text-center"
                      >
                        {error}
                      </motion.p>
                    )}

                    {/* Remember Me Checkbox */}
                    <label className="flex items-center gap-3 cursor-pointer group py-1">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-5 h-5 rounded border-2 border-gray-300 checked:bg-[#5FA037] checked:border-[#5FA037] focus:ring-2 focus:ring-[#5FA037]/20 transition-all duration-200 cursor-pointer"
                        />
                      </div>
                      <span className="text-sm text-gray-700 group-hover:text-[#5FA037] transition-colors">
                        Keep me logged in
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={loading || !loginEmail || !loginPassword}
                      className="group w-full h-[52px] rounded-full transition-all duration-500 bg-[#5FA037] text-white hover:bg-[#4d8c2d] font-normal tracking-tight shadow-md hover:shadow-lg hover:shadow-[#5FA037]/25 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                      <span className="relative flex items-center justify-center gap-2.5">
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Logging in...</span>
                          </>
                        ) : (
                          <>
                            <span>Login</span>
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </span>
                    </button>
                  </motion.form>
                ) : (
                  // ══════════════════════════════════════════════
                  // SIGNUP FORM
                  // ══════════════════════════════════════════════
                  <motion.form
                    key="signup-form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleSignup}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs text-gray-500 mb-2 ml-1">Corporate Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                        <input
                          type="email"
                          value={signupData.email}
                          onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                          placeholder="joao@company.com"
                          className="w-full h-12 pl-12 pr-5 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-sm text-gray-900 placeholder:text-gray-400"
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-2 ml-1">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                        <input
                          type={showSignupPassword ? 'text' : 'password'}
                          value={signupData.password}
                          onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                          placeholder="••••••••"
                          className="w-full h-12 pl-12 pr-12 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-sm text-gray-900 placeholder:text-gray-400"
                          required
                          disabled={loading}
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showSignupPassword ? (
                            <EyeOff className="w-5 h-5" strokeWidth={1.5} />
                          ) : (
                            <Eye className="w-5 h-5" strokeWidth={1.5} />
                          )}
                        </button>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1 ml-1">Minimum 6 characters</p>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-2 ml-1">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={signupData.confirmPassword}
                          onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                          placeholder="••••••••"
                          className="w-full h-12 pl-12 pr-12 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-sm text-gray-900 placeholder:text-gray-400"
                          required
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" strokeWidth={1.5} />
                          ) : (
                            <Eye className="w-5 h-5" strokeWidth={1.5} />
                          )}
                        </button>
                      </div>
                    </div>

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 font-light text-center"
                      >
                        {error}
                      </motion.p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="group w-full h-[52px] rounded-full transition-all duration-500 bg-[#5FA037] text-white hover:bg-[#4d8c2d] font-normal tracking-tight shadow-md hover:shadow-lg hover:shadow-[#5FA037]/25 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden mt-6"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                      <span className="relative flex items-center justify-center gap-2.5">
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Creating Account...</span>
                          </>
                        ) : (
                          <>
                            <span>Create Account</span>
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </span>
                    </button>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      Complete your profile and sign NDA in the next step
                    </p>
                  </motion.form>
                )}
              </motion.div>

              {/* Footer */}
              <div className="px-8 sm:px-12 py-5 sm:py-6 border-t border-gray-100/50">
                <button
                  onClick={() => router.push('/')}
                  className="w-full text-[11px] sm:text-xs text-gray-400 hover:text-[#044050] font-light transition-all duration-300 tracking-wide flex items-center justify-center gap-2 group"
                >
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                  <span>Back</span>
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
          Secure Access
        </motion.p>
      </motion.div>
    </div>
  )
}

