"use client"

import { useState, useEffect, useRef } from 'react'
import { CheckCircle2, Loader2, FileText, Phone, PenTool, ArrowRight, User, MapPin, CreditCard, Globe, Briefcase, Users, LogOut, Building2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { auth } from '../../../lib/firebase'
import { 
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult
} from 'firebase/auth'
import { getInvestor, signNDA, getUserIP, updateInvestorPhone } from '../../../lib/firebase-helpers'

type Step = 'read' | 'fill' | 'phone' | 'verify' | 'sign' | 'success'

interface SignatoryData {
  fullName: string
  company: string
  role: string
  nationality: string
  maritalStatus: string
  profession: string
  address: string
  documentType: string
  documentNumber: string
  taxId: string
}

export default function NDAPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [investorData, setInvestorData] = useState<any>(null)
  const signatureCanvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  
  // Multi-step state
  const [currentStep, setCurrentStep] = useState<Step>('read')
  const [scrolledToBottom, setScrolledToBottom] = useState(false)
  const [accepted, setAccepted] = useState(false)
  
  // Signatory data
  const [signatoryData, setSignatoryData] = useState<SignatoryData>({
    fullName: '',
    company: '',
    role: '',
    nationality: '',
    maritalStatus: '',
    profession: '',
    address: '',
    documentType: 'Passport',
    documentNumber: '',
    taxId: ''
  })
  
  // Phone verification state
  const [phone, setPhone] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(null)
  const [sendingCode, setSendingCode] = useState(false)
  const [verifying, setVerifying] = useState(false)
  
  // Signature state
  const [signatureDataUrl, setSignatureDataUrl] = useState('')
  const [signing, setSigning] = useState(false)

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

        if (investor.status === 'approved') {
          router.push('/investidores')
          return
        }

        if (investor.status === 'pending_approval') {
          router.push('/investidores/pending-approval')
          return
        }

        setInvestorData(investor)
        setSignatoryData(prev => ({
          ...prev,
          fullName: investor.name || '',
          company: investor.company || '',
          role: investor.role || ''
        }))

        setLoading(false)
      } catch (err) {
        console.error('Error checking investor:', err)
        setError('Error loading data')
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  // Setup reCAPTCHA
  useEffect(() => {
    if (mounted && auth && currentStep === 'phone') {
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
  }, [mounted, currentStep])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget
    const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 50
    setScrolledToBottom(isAtBottom)
  }

  const handleAcceptNDA = () => {
    if (!accepted) {
      setError('Please accept the NDA to continue')
      return
    }
    setError('')
    setCurrentStep('fill')
  }

  const handleSubmitData = () => {
    // Validar todos os campos
    if (!signatoryData.fullName || !signatoryData.company || !signatoryData.role || 
        !signatoryData.nationality || !signatoryData.maritalStatus || 
        !signatoryData.profession || !signatoryData.address || !signatoryData.documentNumber || 
        !signatoryData.taxId) {
      setError('Please fill all required fields')
      return
    }
    setError('')
    setCurrentStep('phone')
  }

  const handleSendCode = async () => {
    if (!phone) {
      setError('Please enter your phone number')
      return
    }

    setSendingCode(true)
    setError('')

    try {
      const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`
      const appVerifier = (window as any).recaptchaVerifier
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier)
      
      setConfirmation(confirmationResult)
      setCurrentStep('verify')
      setSendingCode(false)
    } catch (err: any) {
      console.error('Error sending code:', err)
      
      if (err.code === 'auth/invalid-phone-number') {
        setError('Invalid phone number format. Use international format: +351931234567')
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many attempts. Please wait before trying again')
      } else {
        setError('Error sending SMS code. Please try again.')
      }
      
      setSendingCode(false)
    }
  }

  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError('Please enter the 6-digit code')
      return
    }

    setVerifying(true)
    setError('')

    try {
      if (!confirmation) throw new Error('No confirmation object')
      
      await confirmation.confirm(verificationCode)
      
      const user = auth.currentUser
      if (user) {
        await updateInvestorPhone(user.uid, phone)
      }
      
      setCurrentStep('sign')
      setVerifying(false)
    } catch (err: any) {
      console.error('Error verifying code:', err)
      setError('Invalid verification code')
      setVerifying(false)
    }
  }

  // Canvas signature functions - with scale adjustment
  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = signatureCanvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    
    const x = (clientX - rect.left) * scaleX
    const y = (clientY - rect.top) * scaleY
    
    return { x, y }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    setIsDrawing(true)
    const canvas = signatureCanvasRef.current
    if (!canvas) return
    
    const { x, y } = getCanvasCoordinates(e)
    
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (!isDrawing) return
    
    const canvas = signatureCanvasRef.current
    if (!canvas) return
    
    const { x, y } = getCanvasCoordinates(e)
    
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.lineTo(x, y)
      ctx.strokeStyle = '#044050'
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.stroke()
    }
  }

  const stopDrawing = (e?: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (e) e.preventDefault()
    if (!isDrawing) return
    
    setIsDrawing(false)
    const canvas = signatureCanvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.closePath()
      }
      setSignatureDataUrl(canvas.toDataURL('image/png'))
    }
  }

  const clearSignature = () => {
    const canvas = signatureCanvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // Adicionar borda sutil
        ctx.strokeStyle = '#e5e7eb'
        ctx.lineWidth = 1
        ctx.strokeRect(0, 0, canvas.width, canvas.height)
      }
      setSignatureDataUrl('')
    }
  }

  // Inicializar canvas com borda quando montado
  useEffect(() => {
    if (currentStep === 'sign' && signatureCanvasRef.current) {
      const canvas = signatureCanvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.strokeStyle = '#e5e7eb'
        ctx.lineWidth = 1
        ctx.strokeRect(0, 0, canvas.width, canvas.height)
      }
    }
  }, [currentStep])

  const handleFinalSign = async () => {
    if (!signatureDataUrl) {
      setError('Please provide your signature')
      return
    }

    setSigning(true)
    setError('')

    try {
      const user = auth.currentUser
      if (!user) throw new Error('Not authenticated')

      const ipAddress = await getUserIP()
      const signatureDate = new Date().toISOString()

      await signNDA(user.uid, ipAddress, 'v2.0-en', {
        ...signatoryData,
        phone,
        signatureDate,
        signatureImage: signatureDataUrl,
        documentVersion: 'NDA-ESG-Veritas-2025-EN-v2.0',
        companyName: signatoryData.company,
        companyRole: signatoryData.role,
        email: investorData?.email || ''
      })

      setCurrentStep('success')
      
      setTimeout(() => {
        router.push('/investidores/pending-approval')
      }, 2500)
    } catch (err) {
      console.error('Error signing NDA:', err)
      setError('Error signing NDA. Please try again.')
      setSigning(false)
    }
  }

  const handleLogout = async () => {
    try {
      await auth.signOut()
      router.push('/investidores/login')
    } catch (err) {
      console.error('Error logging out:', err)
    }
  }

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#044050] to-[#033842] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    )
  }

  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#044050] to-[#033842] flex items-center justify-center p-4 sm:p-6">
      <div id="recaptcha-container"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl"
      >
        <AnimatePresence mode="wait">
          {currentStep === 'success' ? (
            // ══════════════════════════════════════════════════════════
            // SUCCESS STATE
            // ══════════════════════════════════════════════════════════
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-[32px] p-8 sm:p-16 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
            >
              {/* Logo */}
              <div className="mb-8 flex justify-center">
                <img 
                  src="/images/ESGVeritas logo.jpg" 
                  alt="ESG Veritas Solutions"
                  className="h-16 sm:h-20 md:h-24 w-auto object-contain"
                />
              </div>

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
                Your application is now under review...
              </motion.p>
            </motion.div>
          ) : (
            // ══════════════════════════════════════════════════════════
            // MAIN NDA CONTAINER
            // ══════════════════════════════════════════════════════════
            <motion.div
              key="nda"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-[32px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
            >
              {/* Header */}
              <div className="px-6 sm:px-8 md:px-12 pt-8 sm:pt-10 pb-5 sm:pb-6 border-b border-gray-100 text-center relative">
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="absolute top-4 sm:top-6 right-4 sm:right-6 flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.5} />
                  <span className="hidden sm:inline">Exit</span>
                </button>

                {/* Logo */}
                <div className="mb-6 sm:mb-8 flex justify-center">
                  <img 
                    src="/images/ESGVeritas logo.jpg" 
                    alt="ESG Veritas Solutions"
                    className="h-16 sm:h-20 md:h-24 w-auto object-contain"
                  />
                </div>

                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#044050]/[0.04] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  {currentStep === 'read' && <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-[#044050]" strokeWidth={1.2} />}
                  {currentStep === 'fill' && <User className="w-7 h-7 sm:w-8 sm:h-8 text-[#044050]" strokeWidth={1.2} />}
                  {(currentStep === 'phone' || currentStep === 'verify') && <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-[#044050]" strokeWidth={1.2} />}
                  {currentStep === 'sign' && <PenTool className="w-7 h-7 sm:w-8 sm:h-8 text-[#044050]" strokeWidth={1.2} />}
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-[#044050] mb-2 sm:mb-3 tracking-tight px-4">
                  {currentStep === 'read' && 'Non-Disclosure Agreement'}
                  {currentStep === 'fill' && 'Your Information'}
                  {currentStep === 'phone' && 'Phone Verification'}
                  {currentStep === 'verify' && 'Verify Code'}
                  {currentStep === 'sign' && 'Digital Signature'}
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 font-light px-4">
                  {currentStep === 'read' && 'Please read carefully before accepting'}
                  {currentStep === 'fill' && 'Fill in your personal details'}
                  {currentStep === 'phone' && 'Verify your phone number'}
                  {currentStep === 'verify' && 'Enter the 6-digit code sent to your phone'}
                  {currentStep === 'sign' && 'Sign the document to complete'}
                </p>
                
                {/* Progress Steps */}
                <div className="flex justify-center gap-1.5 sm:gap-2 mt-5 sm:mt-6">
                  {['read', 'fill', 'phone', 'verify', 'sign'].map((step, index) => (
                    <div
                      key={step}
                      className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ${
                        ['read', 'fill', 'phone', 'verify', 'sign'].indexOf(currentStep) >= index
                          ? 'w-6 sm:w-8 bg-[#5FA037]'
                          : 'w-6 sm:w-8 bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="px-6 sm:px-8 md:px-12 py-6 sm:py-8">
                <AnimatePresence mode="wait">
                  {currentStep === 'read' && (
                    // ══════════════════════════════════════════════════════════
                    // STEP 1: READ NDA
                    // ══════════════════════════════════════════════════════════
                    <motion.div
                      key="read"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div 
                        className="max-h-[50vh] overflow-y-auto pr-4"
                onScroll={handleScroll}
              >
                        <div className="prose prose-sm max-w-none text-gray-700">
                          <h2 className="text-xl font-semibold text-[#044050] mb-4">NON-DISCLOSURE AGREEMENT (NDA)</h2>
                          <p className="font-semibold mb-4">GREENCHECK™ PROJECT – ESG VERITAS SOLUTIONS, LDA</p>
                          
                          <h3 className="text-lg font-semibold text-[#044050] mt-6 mb-3">1) PARTIES</h3>
                          
                          <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <p className="font-semibold mb-2">1.1. Company (Disclosing Party)</p>
                            <p className="text-sm leading-relaxed">
                              <strong>ESG Veritas Solutions, Lda</strong>, a limited liability company, NIPC 518935159, 
                              with registered office at Rua do Salvador, n.º 20, 1 A, 1100-466 Lisboa, 
                              Freguesia de São Vicente, Concelho de Lisboa, Distrito de Lisboa, 
                              represented by its manager Diego Mendes da Rocha, NIF 332801055, 
                              hereinafter "Company".
                            </p>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg mb-4">
                            <p className="font-semibold mb-2">1.2. Signatory (Receiving Party)</p>
                            <p className="text-sm leading-relaxed italic text-blue-900">
                              [Your information will be filled in the next step]
                            </p>
                          </div>

                          <p className="mb-4">Company and Signatory, together, "Parties".</p>

                          <h3 className="text-lg font-semibold text-[#044050] mt-6 mb-3">2) PURPOSE AND DEFINITIONS</h3>
                          
                          <p className="mb-3"><strong>2.1. Purpose.</strong> To ensure the secrecy and protection of Confidential Information exchanged within the GreenCheck™ Project, covering technical, scientific, commercial, and strategic contributions.</p>
                          
                          <p className="mb-3"><strong>2.2. Confidential Information.</strong> Any information (oral, written, digital, visual, etc.) of a technical, scientific, commercial, strategic, financial, legal, operational nature, customer lists, source code, algorithms, documentation, drawings, reports, know-how, prototypes, business plans, partnerships, prices, third-party data under Company's confidentiality, and the like.</p>
                          
                          <p className="mb-3"><strong>2.3. Trade/Industrial Secrets.</strong> Subset of Confidential Information that grants competitive advantage and remains protected while confidential.</p>
                          
                          <p className="mb-4"><strong>2.4. Intellectual Property (IP).</strong> Inventions, software, copyrighted works, databases, designs, models, trademarks, know-how, improvements, and any creations arising from or related to the Project.</p>

                          <h3 className="text-lg font-semibold text-[#044050] mt-6 mb-3">3) CONFIDENTIALITY OBLIGATIONS</h3>
                          
                          <p className="mb-2"><strong>3.1. Signatory's Duties.</strong></p>
                          <ul className="list-disc pl-6 mb-4 space-y-1">
                            <li>Use Confidential Information exclusively for authorized Project activities;</li>
                            <li>Not disclose to third parties without written authorization from Company;</li>
                            <li>Protect information with a degree of care at least equivalent to that used for their own secrets;</li>
                            <li>Restrict access to those who need to know, ensuring such persons assume equivalent confidentiality duties and being responsible for their acts;</li>
                            <li>Not copy or retain copies beyond what is strictly necessary;</li>
                            <li>Immediately notify Company of any unauthorized use or disclosure and cooperate in mitigation.</li>
                  </ul>

                          <p className="mb-2"><strong>3.2. Exceptions.</strong> The obligation does not apply to information: (i) public without breach of this Agreement; (ii) already legitimately and documentarily held; (iii) obtained from legitimate third party without breach; (iv) independently developed; (v) required by law/order, with prior notice to Company for protective measures.</p>
                          
                          <p className="mb-4"><strong>3.3. Return/Destruction.</strong> Upon Company's request or termination, Signatory shall return or destroy, within 10 days, all confidential materials (including digital), certifying compliance in writing. May retain copy only if required by law, maintaining confidentiality.</p>

                          <h3 className="text-lg font-semibold text-[#044050] mt-6 mb-3">4) INTELLECTUAL PROPERTY AND ASSIGNMENT</h3>
                          
                          <p className="mb-3"><strong>4.1. Ownership.</strong> All IP created, developed, or improved by Signatory within the Project or with total or partial use of Confidential Information shall belong exclusively to Company.</p>
                          
                          <p className="mb-3"><strong>4.2. Broad Assignment.</strong> Signatory assigns and transfers to Company, on a total, worldwide, irrevocable, perpetual, and royalty-free basis, all patrimonial rights over such IP, in any medium, format, and mode of exploitation, present or future, for the legal term of protection.</p>
                          
                          <p className="mb-3"><strong>4.3. Moral Rights.</strong> Maintained under legal terms; Signatory will not exercise them in a way that limits Company's full enjoyment of patrimonial rights, cooperating with registrations (patents, software, copyrights) and formalities.</p>
                          
                          <p className="mb-4"><strong>4.4. Pre-existing Materials.</strong> Use of Signatory's pre-existing assets requires prior written notice to Company and specific license adjustment; in its absence, it is presumed incorporated and assigned under 4.2.</p>

                          <h3 className="text-lg font-semibold text-[#044050] mt-6 mb-3">5) NON-COMPETITION</h3>
                          
                          <p className="mb-2"><strong>5.1. Scope.</strong> Signatory shall not exercise, directly or indirectly, competitive or substantially similar activities to those of the Project/Company (including participating as partner, employee, consultant, or investor) during collaboration and for 2 (two) years after its termination.</p>
                          
                          <p className="mb-2"><strong>5.2. Territory.</strong> Brazil and European Union, and other countries where Company operates significantly at the time of termination.</p>
                          
                          <p className="mb-4"><strong>5.3. Adjustment.</strong> If the restriction is deemed excessive, it should be reduced to the maximum allowed, preserving the protective intention.</p>

                          <h3 className="text-lg font-semibold text-[#044050] mt-6 mb-3">6) EXCLUSIVITY (OPTIONAL)</h3>
                          
                          <p className="mb-4">Applicable only if Company determines so in writing. In that case, during collaboration, Signatory will dedicate efforts exclusively to the Project, abstaining from conflicting activities, except with Company's written authorization.</p>

                          <h3 className="text-lg font-semibold text-[#044050] mt-6 mb-3">7) TERM AND SURVIVAL</h3>
                          
                          <p className="mb-2"><strong>7.1. Term.</strong> This Agreement is valid for 5 (five) years from signature.</p>
                          
                          <p className="mb-4"><strong>7.2. Survival.</strong> Confidentiality obligations persist for 5 (five) years after termination. Trade secrets remain protected indefinitely, as long as they maintain their secret character.</p>

                          <h3 className="text-lg font-semibold text-[#044050] mt-6 mb-3">8) DIGITAL SIGNATURE</h3>
                          
                          <p className="mb-4">The Parties execute this Agreement exclusively in digital form, by electronic/digital signature with full legal validity under the terms of MP 2.200-2/2001 (Brazil) and Regulation (EU) No. 910/2014 – eIDAS (EU), producing the same effects as a physically signed document.</p>

                          <h3 className="text-lg font-semibold text-[#044050] mt-6 mb-3">9) APPLICABLE LAW AND DISPUTE RESOLUTION</h3>
                          
                          <p className="mb-2"><strong>9.1. Applicable Law.</strong> Laws of the Federative Republic of Brazil and European Union/Portugal as applicable, interpreted to reconcile protection of secrets and IP.</p>
                          
                          <p className="mb-2"><strong>9.2. Arbitration.</strong> Disputes not resolved amicably within 60 days shall be submitted to arbitration in Lisbon, before the Commercial Arbitration Center of CCIP (or other agreed institution), by 3 arbitrators, in Portuguese. Final and binding award, enforceable under the New York Convention.</p>
                          
                          <p className="mb-4"><strong>9.3. Urgent Measures.</strong> Not excluded; may be requested from arbitral tribunal (once constituted) or competent Judiciary (Portugal/Brazil).</p>

                          <h3 className="text-lg font-semibold text-[#044050] mt-6 mb-3">10) FINAL PROVISIONS</h3>
                          
                          <p className="mb-4">Entire agreement; partial nullity without affecting the rest; no tacit waiver; prohibition of assignment by Signatory without consent; Parties' independence; possibility of adhesion by new members; costs borne by each Party, with final costs to losing party; language versions – Portuguese prevails.</p>

                  {!scrolledToBottom && (
                    <div className="sticky bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent flex items-end justify-center pb-2">
                      <p className="text-xs text-gray-400 animate-pulse">Scroll to read more ↓</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Acceptance Checkbox */}
                      <div className="mt-6 pt-6 border-t border-gray-100">
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
                          onClick={handleAcceptNDA}
                          disabled={!accepted}
                          className="group w-full h-14 rounded-full transition-all duration-500 bg-[#5FA037] text-white hover:bg-[#4d8c2d] font-medium tracking-tight shadow-md hover:shadow-lg hover:shadow-[#5FA037]/25 disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden mt-6 px-6"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                          <span className="relative flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base">
                            <span>Accept & Continue</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 'fill' && (
                    // ══════════════════════════════════════════════════════════
                    // STEP 2: FILL PERSONAL DATA
                    // ══════════════════════════════════════════════════════════
                    <motion.div
                      key="fill"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-4"
                    >
                      <p className="text-sm text-gray-600 mb-6">
                        Please provide your complete information as it will appear in the official NDA document.
                      </p>

                      {/* Full Name */}
                      <div>
                        <label className="block text-xs text-gray-500 mb-2 ml-1">Full Legal Name *</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                          <input
                            type="text"
                            value={signatoryData.fullName}
                            onChange={(e) => setSignatoryData({...signatoryData, fullName: e.target.value})}
                            placeholder="John Michael Smith"
                            className="w-full h-12 pl-12 pr-5 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-sm text-gray-900 placeholder:text-gray-400"
                            required
                          />
                        </div>
                      </div>

                      {/* Company */}
                      <div>
                        <label className="block text-xs text-gray-500 mb-2 ml-1">Company *</label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                          <input
                            type="text"
                            value={signatoryData.company}
                            onChange={(e) => setSignatoryData({...signatoryData, company: e.target.value})}
                            placeholder="Your Company Name"
                            className="w-full h-12 pl-12 pr-5 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-sm text-gray-900 placeholder:text-gray-400"
                            required
                          />
                        </div>
                      </div>

                      {/* Role */}
                      <div>
                        <label className="block text-xs text-gray-500 mb-2 ml-1">Role *</label>
                        <div className="relative">
                          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                          <input
                            type="text"
                            value={signatoryData.role}
                            onChange={(e) => setSignatoryData({...signatoryData, role: e.target.value})}
                            placeholder="CEO / CTO / Investor / Partner"
                            className="w-full h-12 pl-12 pr-5 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-sm text-gray-900 placeholder:text-gray-400"
                            required
                          />
                        </div>
                      </div>

                      {/* Nationality */}
                      <div>
                        <label className="block text-xs text-gray-500 mb-2 ml-1">Nationality *</label>
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                          <input
                            type="text"
                            value={signatoryData.nationality}
                            onChange={(e) => setSignatoryData({...signatoryData, nationality: e.target.value})}
                            placeholder="Portuguese / American / Brazilian"
                            className="w-full h-12 pl-12 pr-5 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-sm text-gray-900 placeholder:text-gray-400"
                            required
                          />
                        </div>
                      </div>

                      {/* Marital Status */}
                      <div>
                        <label className="block text-xs text-gray-500 mb-2 ml-1">Marital Status *</label>
                        <div className="relative">
                          <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                          <select
                            value={signatoryData.maritalStatus}
                            onChange={(e) => setSignatoryData({...signatoryData, maritalStatus: e.target.value})}
                            className="w-full h-12 pl-12 pr-5 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-sm text-gray-900"
                            required
                          >
                            <option value="">Select status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Widowed">Widowed</option>
                            <option value="Civil Partnership">Civil Partnership</option>
                          </select>
                        </div>
                      </div>

                      {/* Profession */}
                      <div>
                        <label className="block text-xs text-gray-500 mb-2 ml-1">Profession *</label>
                        <div className="relative">
                          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                          <input
                            type="text"
                            value={signatoryData.profession}
                            onChange={(e) => setSignatoryData({...signatoryData, profession: e.target.value})}
                            placeholder="CEO / Investor / Business Executive"
                            className="w-full h-12 pl-12 pr-5 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-sm text-gray-900 placeholder:text-gray-400"
                            required
                          />
                        </div>
                      </div>

                      {/* Address */}
                      <div>
                        <label className="block text-xs text-gray-500 mb-2 ml-1">Complete Address *</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                          <input
                            type="text"
                            value={signatoryData.address}
                            onChange={(e) => setSignatoryData({...signatoryData, address: e.target.value})}
                            placeholder="Street, Number, City, Postal Code, Country"
                            className="w-full h-12 pl-12 pr-5 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-sm text-gray-900 placeholder:text-gray-400"
                            required
                          />
                        </div>
                      </div>

                      {/* Document Type & Number */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-500 mb-2 ml-1">ID Document Type *</label>
                          <select
                            value={signatoryData.documentType}
                            onChange={(e) => setSignatoryData({...signatoryData, documentType: e.target.value})}
                            className="w-full h-12 px-4 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-sm text-gray-900"
                            required
                          >
                            <option value="Passport">Passport</option>
                            <option value="National ID">National ID</option>
                            <option value="Driver License">Driver License</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-2 ml-1">Document Number *</label>
                          <div className="relative">
                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                            <input
                              type="text"
                              value={signatoryData.documentNumber}
                              onChange={(e) => setSignatoryData({...signatoryData, documentNumber: e.target.value})}
                              placeholder="ABC123456"
                              className="w-full h-12 pl-12 pr-5 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-sm text-gray-900 placeholder:text-gray-400"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Tax ID */}
                      <div>
                        <label className="block text-xs text-gray-500 mb-2 ml-1">Tax ID (NIF / CPF / SSN) *</label>
                        <div className="relative">
                          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                          <input
                            type="text"
                            value={signatoryData.taxId}
                            onChange={(e) => setSignatoryData({...signatoryData, taxId: e.target.value})}
                            placeholder="123456789"
                            className="w-full h-12 pl-12 pr-5 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-sm text-gray-900 placeholder:text-gray-400"
                            required
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

                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={() => setCurrentStep('read')}
                          className="h-14 px-4 sm:px-6 rounded-full transition-all duration-500 bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium tracking-tight shadow-sm text-sm sm:text-base"
                        >
                          ← Back
                        </button>
                        <button
                          onClick={handleSubmitData}
                          className="group flex-1 h-14 rounded-full transition-all duration-500 bg-[#5FA037] text-white hover:bg-[#4d8c2d] font-medium tracking-tight shadow-md hover:shadow-lg hover:shadow-[#5FA037]/25 relative overflow-hidden px-4 sm:px-6"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                          <span className="relative flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-base">
                            <span className="hidden sm:inline">Continue to Phone Verification</span>
                            <span className="sm:hidden">Continue</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </span>
                        </button>
                      </div>

                    </motion.div>
                  )}

                  {currentStep === 'phone' && (
                    // ══════════════════════════════════════════════════════════
                    // STEP 3: PHONE NUMBER
                    // ══════════════════════════════════════════════════════════
                    <motion.div
                      key="phone"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <p className="text-sm text-gray-600 text-center">
                        We'll send a verification code to your phone to confirm your identity
                      </p>

                      <div>
                        <label className="block text-xs text-gray-500 mb-2 ml-1">Phone Number (International Format)</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+351931234567 or +14155552671"
                            className="w-full h-14 pl-12 pr-5 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-sm text-gray-900 placeholder:text-gray-400"
                            required
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2 ml-1">
                          Include country code (e.g., +351 for Portugal, +1 for US)
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

                      <div className="flex gap-3">
                        <button
                          onClick={() => setCurrentStep('fill')}
                          className="h-14 px-4 sm:px-6 rounded-full transition-all duration-500 bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium tracking-tight shadow-sm text-sm sm:text-base"
                        >
                          ← Back
                        </button>
                        <button
                          onClick={handleSendCode}
                          disabled={sendingCode || !phone}
                          className="group flex-1 h-14 rounded-full transition-all duration-500 bg-[#5FA037] text-white hover:bg-[#4d8c2d] font-medium tracking-tight shadow-md hover:shadow-lg hover:shadow-[#5FA037]/25 disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden px-4 sm:px-6"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                          <span className="relative flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-base">
                            {sendingCode ? (
                              <>
                                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                <span className="hidden sm:inline">Sending Code...</span>
                                <span className="sm:hidden">Sending...</span>
                              </>
                            ) : (
                              <>
                                <span className="hidden sm:inline">Send Verification Code</span>
                                <span className="sm:hidden">Send Code</span>
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                              </>
                            )}
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 'verify' && (
                    // ══════════════════════════════════════════════════════════
                    // STEP 4: VERIFY SMS CODE
                    // ══════════════════════════════════════════════════════════
                    <motion.div
                      key="verify"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <p className="text-sm text-gray-600 text-center">
                        Enter the 6-digit code sent to <strong>{phone}</strong>
                      </p>

                      <div>
                        <label className="block text-xs text-gray-500 mb-2 ml-1 text-center">Verification Code</label>
                        <input
                          type="text"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          placeholder="000000"
                          className="w-full h-16 px-5 bg-gray-50/80 border-2 border-transparent rounded-[16px] focus:outline-none focus:border-[#044050] focus:bg-white transition-all duration-300 text-center text-3xl tracking-[0.5em] font-light text-gray-900 placeholder:text-gray-400"
                          maxLength={6}
                          autoFocus
                        />
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
                        onClick={handleVerifyCode}
                        disabled={verifying || verificationCode.length !== 6}
                        className="group w-full h-14 rounded-full transition-all duration-500 bg-[#5FA037] text-white hover:bg-[#4d8c2d] font-medium tracking-tight shadow-md hover:shadow-lg hover:shadow-[#5FA037]/25 disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  <span className="relative flex items-center justify-center gap-3">
                          {verifying ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Verifying...</span>
                            </>
                          ) : (
                            <>
                              <span>Verify Code</span>
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </span>
                      </button>

                      <button
                        onClick={() => setCurrentStep('phone')}
                        className="w-full text-xs text-gray-500 hover:text-[#044050] transition-colors"
                      >
                        ← Change phone number
                      </button>

                      {/* DEV ONLY: Skip to Signature */}
                      {process.env.NODE_ENV === 'development' && (
                        <button
                          onClick={() => {
                            setCurrentStep('sign')
                            setError('')
                          }}
                          className="mt-4 w-full h-12 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 font-medium text-xs sm:text-sm transition-all px-4"
                        >
                          <span className="hidden sm:inline">🚧 DEV: Skip to Signature</span>
                          <span className="sm:hidden">🚧 Skip</span>
                        </button>
                      )}
                    </motion.div>
                  )}

                  {currentStep === 'sign' && (
                    // ══════════════════════════════════════════════════════════
                    // STEP 5: DIGITAL SIGNATURE
                    // ══════════════════════════════════════════════════════════
                    <motion.div
                      key="sign"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      {/* Document Summary */}
                      <div className="bg-gray-50 p-4 sm:p-6 rounded-2xl space-y-3">
                        <h3 className="text-sm font-semibold text-[#044050] mb-3 sm:mb-4">Document Summary</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                          <div>
                            <p className="text-gray-500 text-xs">Signatory</p>
                            <p className="font-medium text-gray-900 break-words">{signatoryData.fullName}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Document</p>
                            <p className="font-medium text-gray-900 break-words">{signatoryData.documentType} {signatoryData.documentNumber}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Tax ID</p>
                            <p className="font-medium text-gray-900 break-words">{signatoryData.taxId}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Phone</p>
                            <p className="font-medium text-gray-900">{phone}</p>
                          </div>
                          <div className="sm:col-span-2">
                            <p className="text-gray-500 text-xs">Address</p>
                            <p className="font-medium text-gray-900 break-words">{signatoryData.address}</p>
                          </div>
                          <div className="sm:col-span-2">
                            <p className="text-gray-500 text-xs">Date</p>
                            <p className="font-medium text-gray-900">{currentDate} - Lisbon, Portugal</p>
                          </div>
                        </div>
                      </div>

                      {/* Signature Canvas */}
                      <div>
                        <label className="block text-sm font-semibold text-[#044050] mb-3">Your Signature *</label>
                        <div className="border-2 border-gray-200 rounded-2xl p-3 sm:p-4 bg-gray-50">
                          {/* Instructions for mobile */}
                          <div className="mb-3 sm:mb-4 text-center">
                            <p className="text-xs sm:text-sm text-gray-600 font-medium">
                              <span className="hidden sm:inline">Sign with your mouse or finger in the box below</span>
                              <span className="sm:hidden">Sign below with your finger</span>
                            </p>
                          </div>
                          
                          <div className="bg-white rounded-xl shadow-inner relative overflow-hidden">
                            <canvas
                              ref={signatureCanvasRef}
                              width={800}
                              height={300}
                              onMouseDown={startDrawing}
                              onMouseMove={draw}
                              onMouseUp={stopDrawing}
                              onMouseLeave={stopDrawing}
                              onTouchStart={startDrawing}
                              onTouchMove={draw}
                              onTouchEnd={stopDrawing}
                              className="w-full h-auto rounded-xl cursor-crosshair touch-none"
                              style={{ 
                                touchAction: 'none', 
                                display: 'block',
                                maxHeight: '200px',
                                minHeight: '150px'
                              }}
                            />
                            
                            {/* Placeholder text when empty */}
                            {!signatureDataUrl && (
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <p className="text-gray-300 text-sm sm:text-base font-light italic">
                                  Draw your signature here
                                </p>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between mt-3 sm:mt-4">
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <span className="hidden sm:inline">✍️ Sign naturally</span>
                              <span className="sm:hidden">✍️ Sign here</span>
                            </p>
                            <button
                              onClick={clearSignature}
                              className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all font-medium border border-gray-200"
                            >
                              🗑️ Clear
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-center sm:text-left italic">
                          <span className="hidden sm:inline">Your signature will be used for the official NDA document</span>
                          <span className="sm:hidden">For the official NDA document</span>
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

                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setCurrentStep('verify')
                            setError('')
                          }}
                          className="h-14 px-4 sm:px-6 rounded-full transition-all duration-500 bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium tracking-tight shadow-sm text-sm sm:text-base"
                        >
                          ← Back
                        </button>
                        <button
                          onClick={handleFinalSign}
                          disabled={signing || !signatureDataUrl}
                          className="group flex-1 h-14 rounded-full transition-all duration-500 bg-[#5FA037] text-white hover:bg-[#4d8c2d] font-medium tracking-tight shadow-md hover:shadow-lg hover:shadow-[#5FA037]/25 disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden px-4 sm:px-6"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                          <span className="relative flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-base">
                    {signing ? (
                      <>
                                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                <span className="hidden sm:inline">Signing NDA...</span>
                                <span className="sm:hidden">Signing...</span>
                      </>
                    ) : (
                      <>
                                <PenTool className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="hidden sm:inline">Sign & Submit NDA</span>
                                <span className="sm:hidden">Sign & Submit</span>
                      </>
                    )}
                  </span>
                </button>
                      </div>

                      <p className="text-xs text-gray-500 text-center mt-4">
                        By signing, you agree to all terms and conditions stated in the NDA
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
