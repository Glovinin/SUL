"use client"

import { useState, useEffect } from 'react'
import { ArrowRight, Lock, Phone, User, Building2, Mail, Briefcase, CheckCircle2, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { auth } from '../../../lib/firebase'
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  ConfirmationResult,
  PhoneAuthProvider,
  signInWithCredential
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
  const [loginPhone, setLoginPhone] = useState('')
  const [loginCode, setLoginCode] = useState('')
  const [loginStep, setLoginStep] = useState<'phone' | 'code'>('phone')
  const [loginConfirmation, setLoginConfirmation] = useState<ConfirmationResult | null>(null)

  // Signup state
  const [signupData, setSignupData] = useState({
    name: '',
    company: '',
    role: '',
    email: '',
    phone: ''
  })
  const [signupCode, setSignupCode] = useState('')
  const [signupStep, setSignupStep] = useState<'form' | 'code'>('form')
  const [signupConfirmation, setSignupConfirmation] = useState<ConfirmationResult | null>(null)

  useEffect(() => {
    setMounted(true)
    
    // Verificar se passou pela página de acesso
    const hasAccess = localStorage.getItem('greencheck_investor_access')
    if (hasAccess !== 'true') {
      router.push('/investidores/acesso')
    }
  }, [router])

  // Setup reCAPTCHA
  useEffect(() => {
    if (mounted && auth) {
      try {
        if (!(window as any).recaptchaVerifier) {
          (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            size: 'invisible',
            callback: () => {
              console.log('reCAPTCHA solved')
            }
          })
        }
      } catch (error) {
        console.error('Error setting up reCAPTCHA:', error)
      }
    }
  }, [mounted])

  // ─────────────────────────────────────────────────────────────
  // LOGIN FUNCTIONS
  // ─────────────────────────────────────────────────────────────

  const handleLoginSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Formatar telefone para padrão internacional
      const formattedPhone = loginPhone.startsWith('+') ? loginPhone : `+351${loginPhone}`
      
      const appVerifier = (window as any).recaptchaVerifier
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier)
      
      setLoginConfirmation(confirmation)
      setLoginStep('code')
      setLoading(false)
    } catch (err: any) {
      console.error('Error sending code:', err)
      
      // Mensagem específica para erro de configuração do Firebase
      if (err.code === 'auth/invalid-app-credential') {
        setError('⚠️ Firebase not configured. Admin: Add Replit domain to Firebase Console')
      } else if (err.code === 'auth/captcha-check-failed') {
        setError('reCAPTCHA failed. Please refresh and try again')
      } else {
        setError(err.message || 'Error sending verification code')
      }
      
      setLoading(false)
    }
  }

  const handleLoginVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!loginConfirmation) {
        throw new Error('No confirmation object')
      }

      const result = await loginConfirmation.confirm(loginCode)
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
          router.push('/investidores')
        } else if (investor.status === 'pending_approval') {
          router.push('/investidores/pending-approval')
        } else if (investor.status === 'pending_nda') {
          router.push('/investidores/nda')
        } else {
          setError('Your account has been rejected. Please contact support.')
          setLoading(false)
        }
      }, 1500)
    } catch (err: any) {
      console.error('Error verifying code:', err)
      setError('Invalid verification code')
      setLoading(false)
    }
  }

  // ─────────────────────────────────────────────────────────────
  // SIGNUP FUNCTIONS
  // ─────────────────────────────────────────────────────────────

  const handleSignupSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validar campos
    if (!signupData.name || !signupData.company || !signupData.role || !signupData.email || !signupData.phone) {
      setError('Please fill all fields')
      return
    }

    setLoading(true)

    try {
      // Formatar telefone
      const formattedPhone = signupData.phone.startsWith('+') ? signupData.phone : `+351${signupData.phone}`
      
      const appVerifier = (window as any).recaptchaVerifier
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier)
      
      setSignupConfirmation(confirmation)
      setSignupStep('code')
      setLoading(false)
    } catch (err: any) {
      console.error('Error sending code:', err)
      
      // Mensagem específica para erro de configuração do Firebase
      if (err.code === 'auth/invalid-app-credential') {
        setError('⚠️ Firebase not configured. Admin: Add Replit domain to Firebase Console')
      } else if (err.code === 'auth/captcha-check-failed') {
        setError('reCAPTCHA failed. Please refresh and try again')
      } else {
        setError(err.message || 'Error sending verification code')
      }
      
      setLoading(false)
    }
  }

  const handleSignupVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!signupConfirmation) {
        throw new Error('No confirmation object')
      }

      const result = await signupConfirmation.confirm(signupCode)
      const user = result.user

      // Criar documento do investidor no Firestore
      await createInvestor({
        uid: user.uid,
        name: signupData.name,
        company: signupData.company,
        role: signupData.role,
        email: signupData.email,
        phone: signupData.phone
      })

      setSuccess(true)
      setTimeout(() => {
        router.push('/investidores/nda')
      }, 1500)
    } catch (err: any) {
      console.error('Error verifying code:', err)
      setError('Invalid verification code')
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#044050] to-[#033842] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* reCAPTCHA container */}
      <div id="recaptcha-container"></div>

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
                      setLoginStep('phone')
                      setSignupStep('form')
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
                      setLoginStep('phone')
                      setSignupStep('form')
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
                  <AnimatePresence mode="wait">
                    {loginStep === 'phone' ? (
                      <motion.form
                        key="login-phone"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        onSubmit={handleLoginSendCode}
                        className="space-y-5"
                      >
                        <div>
                          <label className="block text-xs text-gray-500 mb-2 ml-1">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                            <input
                              type="tel"
                              value={loginPhone}
                              onChange={(e) => setLoginPhone(e.target.value)}
                        placeholder="+351 931 721 901"
                        className="w-full h-14 pl-12 pr-5 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-sm text-gray-900 placeholder:text-gray-400"
                              required
                              disabled={loading}
                            />
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
                          disabled={loading || !loginPhone}
                          className="group w-full h-[52px] rounded-full transition-all duration-500 bg-[#5FA037] text-white hover:bg-[#4d8c2d] font-normal tracking-tight shadow-md hover:shadow-lg hover:shadow-[#5FA037]/25 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                          <span className="relative flex items-center justify-center gap-2.5">
                            {loading ? (
                              <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Sending Code...</span>
                              </>
                            ) : (
                              <>
                                <span>Send Code</span>
                                <ArrowRight className="w-5 h-5" />
                              </>
                            )}
                          </span>
                        </button>
                      </motion.form>
                    ) : (
                      <motion.form
                        key="login-code"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        onSubmit={handleLoginVerifyCode}
                        className="space-y-5"
                      >
                        <div>
                          <label className="block text-xs text-gray-500 mb-2 ml-1">Verification Code</label>
                          <input
                            type="text"
                            value={loginCode}
                            onChange={(e) => setLoginCode(e.target.value)}
                            placeholder="000000"
                            className="w-full h-14 px-5 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-center text-2xl tracking-[0.3em] font-light text-gray-900 placeholder:text-gray-400"
                            required
                            disabled={loading}
                            maxLength={6}
                          />
                          <p className="text-xs text-gray-500 text-center mt-2">
                            Sent to {loginPhone}
                          </p>
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
                          disabled={loading || loginCode.length !== 6}
                          className="group w-full h-[52px] rounded-full transition-all duration-500 bg-[#5FA037] text-white hover:bg-[#4d8c2d] font-normal tracking-tight shadow-md hover:shadow-lg hover:shadow-[#5FA037]/25 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                          <span className="relative flex items-center justify-center gap-2.5">
                            {loading ? (
                              <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Verifying...</span>
                              </>
                            ) : (
                              <>
                                <span>Verify & Login</span>
                                <ArrowRight className="w-5 h-5" />
                              </>
                            )}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setLoginStep('phone')
                            setLoginCode('')
                            setError('')
                          }}
                          className="w-full text-xs text-gray-500 hover:text-[#044050] transition-colors"
                        >
                          ← Change phone number
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                ) : (
                  // ══════════════════════════════════════════════
                  // SIGNUP FORM
                  // ══════════════════════════════════════════════
                  <AnimatePresence mode="wait">
                    {signupStep === 'form' ? (
                      <motion.form
                        key="signup-form"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        onSubmit={handleSignupSendCode}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-xs text-gray-500 mb-2 ml-1">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                            <input
                              type="text"
                              value={signupData.name}
                              onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                              placeholder="João Silva"
                              className="w-full h-12 pl-12 pr-5 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-sm text-gray-900 placeholder:text-gray-400"
                              required
                              disabled={loading}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs text-gray-500 mb-2 ml-1">Company</label>
                          <div className="relative">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                            <input
                              type="text"
                              value={signupData.company}
                              onChange={(e) => setSignupData({...signupData, company: e.target.value})}
                              placeholder="Company Name"
                              className="w-full h-12 pl-12 pr-5 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-sm text-gray-900 placeholder:text-gray-400"
                              required
                              disabled={loading}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs text-gray-500 mb-2 ml-1">Role / Position</label>
                          <div className="relative">
                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                            <input
                              type="text"
                              value={signupData.role}
                              onChange={(e) => setSignupData({...signupData, role: e.target.value})}
                              placeholder="CEO, CTO, Partner..."
                              className="w-full h-12 pl-12 pr-5 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-sm text-gray-900 placeholder:text-gray-400"
                              required
                              disabled={loading}
                            />
                          </div>
                        </div>

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
                          <label className="block text-xs text-gray-500 mb-2 ml-1">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                            <input
                              type="tel"
                              value={signupData.phone}
                              onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                              placeholder="+351 931 721 901"
                              className="w-full h-12 pl-12 pr-5 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-sm text-gray-900 placeholder:text-gray-400"
                              required
                              disabled={loading}
                            />
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
                                <span>Sending Code...</span>
                              </>
                            ) : (
                              <>
                                <span>Create Account</span>
                                <ArrowRight className="w-5 h-5" />
                              </>
                            )}
                          </span>
                        </button>
                      </motion.form>
                    ) : (
                      <motion.form
                        key="signup-code"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        onSubmit={handleSignupVerifyCode}
                        className="space-y-5"
                      >
                        <div>
                          <label className="block text-xs text-gray-500 mb-2 ml-1">Verification Code</label>
                          <input
                            type="text"
                            value={signupCode}
                            onChange={(e) => setSignupCode(e.target.value)}
                            placeholder="000000"
                            className="w-full h-14 px-5 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-center text-2xl tracking-[0.3em] font-light text-gray-900 placeholder:text-gray-400"
                            required
                            disabled={loading}
                            maxLength={6}
                          />
                          <p className="text-xs text-gray-500 text-center mt-2">
                            Sent to {signupData.phone}
                          </p>
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
                          disabled={loading || signupCode.length !== 6}
                          className="group w-full h-[52px] rounded-full transition-all duration-500 bg-[#5FA037] text-white hover:bg-[#4d8c2d] font-normal tracking-tight shadow-md hover:shadow-lg hover:shadow-[#5FA037]/25 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
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
                                <span>Verify & Continue</span>
                                <ArrowRight className="w-5 h-5" />
                              </>
                            )}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSignupStep('form')
                            setSignupCode('')
                            setError('')
                          }}
                          className="w-full text-xs text-gray-500 hover:text-[#044050] transition-colors"
                        >
                          ← Change information
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>

              {/* Footer */}
              <div className="px-8 sm:px-12 py-5 sm:py-6 border-t border-gray-100/50">
                <button
                  onClick={() => router.push('/investidores/acesso')}
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

