"use client"

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { MessageCircle, X, Send, ChevronDown } from 'lucide-react'
import { User, EnvelopeSimple } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai' | 'admin'
  timestamp: Date
}

export default function FloatingContactButton() {
  const pathname = usePathname()
  
  // Não renderizar o chatbot nas páginas do admin (ANTES dos hooks!)
  if (pathname?.startsWith('/admin')) {
    return null
  }

  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [showUserForm, setShowUserForm] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [adminSettings, setAdminSettings] = useState<{
    avatar: string
    name: string
    title: string
  } | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const notificationSoundRef = useRef<HTMLAudioElement | null>(null)

  // Detect mobile
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Initialize notification sound
  useEffect(() => {
    if (typeof window !== 'undefined') {
      notificationSoundRef.current = new Audio('/audio/notification.mp3')
      notificationSoundRef.current.volume = 0.5
    }
  }, [])

  // Load admin settings
  useEffect(() => {
    const loadAdminSettings = async () => {
      try {
        const response = await fetch('/api/chat/admin-settings')
        const data = await response.json()
        
        if (data.success && data.settings) {
          setAdminSettings(data.settings)
        } else {
          // Se não conseguir carregar, usar valores padrão sem avatar
          setAdminSettings({
            avatar: '',
            name: 'SUL ESTATE',
            title: 'Real Estate Consultant'
          })
        }
      } catch (error) {
        // Silent error - usar valores padrão sem avatar
        setAdminSettings({
          avatar: '',
          name: 'SUL ESTATE',
          title: 'Real Estate Consultant'
        })
      }
    }

    loadAdminSettings()
    
    // Atualizar settings a cada 30 segundos
    const interval = setInterval(loadAdminSettings, 30000)
    
    return () => clearInterval(interval)
  }, [])

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Polling para atualizar mensagens em tempo real quando chat está aberto
  useEffect(() => {
    if (!isOpen || isMinimized || !conversationId) return

    const pollMessages = async () => {
      try {
        const response = await fetch(`/api/chat/messages?conversationId=${conversationId}`)
        const data = await response.json()

        if (data.success && data.messages) {
          const formattedMessages = data.messages.map((msg: any) => ({
            id: msg.id,
            text: msg.text,
            sender: msg.sender === 'admin' ? 'admin' : (msg.sender === 'user' ? 'user' : 'ai'),
            timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date()
          }))

          // Detectar novas mensagens comparando com mensagens anteriores
          setMessages(prevMessages => {
            if (prevMessages.length > 0 && formattedMessages.length > prevMessages.length) {
              // Há novas mensagens - verificar se são do admin ou AI (não do próprio usuário)
              const newMessages = formattedMessages.slice(prevMessages.length)
              const hasNewIncomingMessage = newMessages.some(msg => msg.sender === 'admin' || msg.sender === 'ai')
              
              if (hasNewIncomingMessage && notificationSoundRef.current) {
                notificationSoundRef.current.play().catch(() => {
                  // Ignorar erros de autoplay
                })
              }
            } else if (prevMessages.length === 0 && formattedMessages.length > 0) {
              // Primeira carga - não tocar som
            } else if (prevMessages.length > 0 && formattedMessages.length > 0) {
              // Verificar se última mensagem mudou (pode ser uma nova mensagem)
              const prevLastId = prevMessages[prevMessages.length - 1]?.id
              const newLastId = formattedMessages[formattedMessages.length - 1]?.id
              
              if (prevLastId !== newLastId) {
                const lastMessage = formattedMessages[formattedMessages.length - 1]
                if (lastMessage && (lastMessage.sender === 'admin' || lastMessage.sender === 'ai') && notificationSoundRef.current) {
                  notificationSoundRef.current.play().catch(() => {
                    // Ignorar erros de autoplay
                  })
                }
              }
            }
            
            return formattedMessages
          })
        }
      } catch (error) {
        // Silent error
      }
    }

    // Poll a cada 2 segundos quando chat está aberto
    const interval = setInterval(pollMessages, 2000)
    
    // Carregar imediatamente
    pollMessages()

    return () => clearInterval(interval)
  }, [isOpen, isMinimized, conversationId])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen, isMinimized])

  // Lock page scroll on mobile when chat is open
  useEffect(() => {
    if (isMobile && isOpen && !isMinimized) {
      // Lock scroll
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${window.scrollY}px`
    } else {
      // Unlock scroll
      const scrollY = document.body.style.top
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
    }
  }, [isMobile, isOpen, isMinimized])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !conversationId) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    const userMessageText = inputValue
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      // Verificar se admin está online ANTES de salvar a mensagem
      const statusResponse = await fetch('/api/chat/admin-status')
      const statusData = await statusResponse.json()

      // Salvar mensagem no Firebase
      await fetch('/api/chat/save-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId,
          message: userMessageText,
          sender: 'user',
          userName,
          userEmail
        }),
      })

      // Se admin está online, NÃO mostrar mensagem automática - apenas aguardar resposta
      if (statusData.success && statusData.isOnline) {
        setIsTyping(false)
        return
      }

      // Se admin não está online, usar AI para responder
      // Prepare conversation history for context
      const conversationHistory = messages
        .filter(msg => msg.sender === 'user' || msg.sender === 'ai')
        .slice(-10) // Keep last 10 messages for context
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }))

      // Call Gemini API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessageText,
          conversationHistory: conversationHistory
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from AI')
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.message || 'I apologize, but I encountered an error. Please try again or contact us directly at hello@sulbyvs.com',
        sender: 'ai',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiResponse])

      // Salvar resposta do AI também
      await fetch('/api/chat/save-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId,
          message: aiResponse.text,
          sender: 'ai',
          userName,
          userEmail
        }),
      })
    } catch (error) {
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment, or contact us directly at hello@sulbyvs.com for immediate assistance.',
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setIsMinimized(false)
      // Verificar se já tem conversa salva no localStorage
      const savedConversationId = localStorage.getItem('chat_conversation_id')
      const savedUserName = localStorage.getItem('chat_user_name')
      const savedUserEmail = localStorage.getItem('chat_user_email')
      
      if (savedConversationId && savedUserName && savedUserEmail) {
        setConversationId(savedConversationId)
        setUserName(savedUserName)
        setUserEmail(savedUserEmail)
        setShowUserForm(false)
        loadMessages(savedConversationId)
      } else {
        setShowUserForm(true)
      }
    }
  }

  // Listener para abrir chat do navbar
  useEffect(() => {
    const handleOpenChatFromNavbar = () => {
      if (!isOpen && !isMinimized) {
        setIsOpen(true)
        setIsMinimized(false)
        // Verificar se já tem conversa salva no localStorage
        const savedConversationId = localStorage.getItem('chat_conversation_id')
        const savedUserName = localStorage.getItem('chat_user_name')
        const savedUserEmail = localStorage.getItem('chat_user_email')
        
        if (savedConversationId && savedUserName && savedUserEmail) {
          setConversationId(savedConversationId)
          setUserName(savedUserName)
          setUserEmail(savedUserEmail)
          setShowUserForm(false)
          loadMessages(savedConversationId)
        } else {
          setShowUserForm(true)
        }
      }
    }

    window.addEventListener('openChatFromNavbar', handleOpenChatFromNavbar)
    return () => window.removeEventListener('openChatFromNavbar', handleOpenChatFromNavbar)
  }, [isOpen, isMinimized])

  const handleUserFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!userName.trim() || !userEmail.trim()) {
      return
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userEmail)) {
      alert('Please enter a valid email address')
      return
    }

    try {
      // Criar conversa
      const response = await fetch('/api/chat/create-conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: userName.trim(),
          userEmail: userEmail.trim()
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create conversation')
      }

      setConversationId(data.conversationId)
      setShowUserForm(false)
      
      // Salvar no localStorage
      localStorage.setItem('chat_conversation_id', data.conversationId)
      localStorage.setItem('chat_user_name', userName.trim())
      localStorage.setItem('chat_user_email', userEmail.trim())
      
      // Carregar mensagens
      loadMessages(data.conversationId)
    } catch (error: any) {
      alert('Error starting conversation. Please try again.')
    }
  }

  const loadMessages = async (convId: string) => {
    try {
      const response = await fetch(`/api/chat/messages?conversationId=${convId}`)
      const data = await response.json()

      if (data.success && data.messages) {
        const formattedMessages = data.messages.map((msg: any) => ({
          id: msg.id,
          text: msg.text,
          sender: msg.sender === 'admin' ? 'admin' : (msg.sender === 'user' ? 'user' : 'ai'),
          timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date()
        }))
        
        // Detectar novas mensagens comparando com mensagens anteriores
        setMessages(prevMessages => {
          if (prevMessages.length > 0 && formattedMessages.length > prevMessages.length) {
            // Há novas mensagens - verificar se são do admin ou AI (não do próprio usuário)
            const newMessages = formattedMessages.slice(prevMessages.length)
            const hasNewIncomingMessage = newMessages.some(msg => msg.sender === 'admin' || msg.sender === 'ai')
            
            if (hasNewIncomingMessage && notificationSoundRef.current) {
              notificationSoundRef.current.play().catch(() => {
                // Ignorar erros de autoplay
              })
            }
          } else if (prevMessages.length === 0 && formattedMessages.length > 0) {
            // Primeira carga - não tocar som
          } else if (prevMessages.length > 0 && formattedMessages.length > 0) {
            // Verificar se última mensagem mudou (pode ser uma nova mensagem)
            const prevLastId = prevMessages[prevMessages.length - 1]?.id
            const newLastId = formattedMessages[formattedMessages.length - 1]?.id
            
            if (prevLastId !== newLastId) {
              const lastMessage = formattedMessages[formattedMessages.length - 1]
              if (lastMessage && (lastMessage.sender === 'admin' || lastMessage.sender === 'ai') && notificationSoundRef.current) {
                notificationSoundRef.current.play().catch(() => {
                  // Ignorar erros de autoplay
                })
              }
            }
          }
          
          return formattedMessages
        })
      }
    } catch (error) {
      // Silent error
    }
  }

  const minimizeChat = () => {
    setIsMinimized(true)
  }

  const expandChat = () => {
    setIsMinimized(false)
    setIsOpen(true)
  }

  // Calculate unread count (messages after initial greeting)
  const unreadCount = Math.max(0, messages.length - 1)

  // Floating Button (when closed)
  if (!isOpen && !isMinimized) {
    return (
      <div 
        className={cn(
          "fixed z-50 overflow-visible flex items-center gap-3",
          isMobile 
            ? "bottom-6 right-6" 
            : "bottom-8 right-8"
        )}
        style={{ padding: '4px' }}
      >
        {/* Text Label - "Chat with [name]" - Clicável */}
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          onClick={toggleChat}
          className="hidden sm:block cursor-pointer"
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-xl px-4 py-2.5 shadow-lg border border-green-500/30 hover:border-green-500/50 transition-all duration-200">
            <p className="text-[14px] font-medium text-black whitespace-nowrap">
              Chat with <span className="font-semibold">{adminSettings?.name || 'SUL ESTATE'}</span>
            </p>
          </div>
        </motion.button>

        {/* Container for button and pulse - com padding para overflow */}
        <div className="relative" style={{ padding: '8px' }}>
          {/* Subtle pulse animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ padding: '8px' }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.05, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={cn(
                "absolute rounded-full bg-green-500/20",
                isMobile ? "w-[72px] h-[72px]" : "w-[88px] h-[88px]"
              )}
            />
          </motion.div>

          {/* Main Button */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={toggleChat}
              className={cn(
                "relative rounded-full transition-all duration-300",
                "bg-white hover:bg-gray-50",
                "shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)]",
                "border border-black/8",
                isMobile 
                  ? "w-16 h-16" 
                  : "w-20 h-20"
              )}
              aria-label="Open chat"
            >
              {/* Avatar Container with overflow hidden */}
              {adminSettings?.avatar ? (
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <img
                    src={adminSettings.avatar}
                    alt={adminSettings.name || 'Admin'}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </motion.button>
            
            {/* Online Status Indicator - FORA do botão, no container pai */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 25 }}
              className={cn(
                "absolute rounded-full border-2 border-white",
                "bg-green-500 shadow-lg z-20",
                isMobile 
                  ? "bottom-0 right-0 w-3 h-3" 
                  : "bottom-0 right-0 w-3.5 h-3.5"
              )}
              style={{ 
                pointerEvents: 'none',
                transform: 'translate(25%, 25%)'
              }}
            >
              {/* Pulse effect */}
              <motion.div
                animate={{
                  scale: [1, 2.5, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full bg-green-500"
                style={{ 
                  margin: '-4px'
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  // Minimized Ball (when minimized)
  if (isMinimized) {
    return (
      <div 
        className={cn(
          "fixed z-50 overflow-visible",
          isMobile 
            ? "bottom-6 right-6" 
            : "bottom-8 right-8"
        )}
        style={{ padding: '4px' }}
      >
        {/* Container for button and pulse - com padding para overflow */}
        <div className="relative" style={{ padding: '8px' }}>
          {/* Subtle pulse animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ padding: '8px' }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.05, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={cn(
                "absolute rounded-full bg-green-500/20",
                isMobile ? "w-[60px] h-[60px]" : "w-[72px] h-[72px]"
              )}
            />
          </motion.div>

          {/* Container para botão e bolinha */}
          <div className="relative">
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={expandChat}
              className={cn(
                "relative rounded-full transition-all duration-300",
                "bg-white hover:bg-gray-50",
                "shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.22)]",
                "border border-black/8",
                "flex items-center justify-center",
                isMobile 
                  ? "w-14 h-14" 
                  : "w-16 h-16"
              )}
              aria-label="Expand chat"
            >
              {/* Avatar Container with overflow hidden */}
              {adminSettings?.avatar ? (
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <img
                    src={adminSettings.avatar}
                    alt={adminSettings.name || 'Admin'}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </motion.button>
            
            {/* Online Status Indicator - FORA do botão, no container pai */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 25 }}
              className={cn(
                "absolute rounded-full border-2 border-white",
                "bg-green-500 shadow-lg z-20",
                isMobile 
                  ? "bottom-0 right-0 w-3 h-3" 
                  : "bottom-0 right-0 w-3.5 h-3.5"
              )}
              style={{ 
                pointerEvents: 'none',
                transform: 'translate(25%, 25%)'
              }}
            >
              {/* Pulse effect */}
              <motion.div
                animate={{
                  scale: [1, 2.5, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full bg-green-500"
                style={{ 
                  margin: '-4px'
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  // Chat Window (when open)
  return (
    <AnimatePresence>
      {isOpen && !isMinimized && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "fixed bg-white flex flex-col overflow-hidden",
            "border border-black/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.15)]",
            isMobile 
              ? "inset-0 rounded-none z-[9999]" 
              : "bottom-8 right-8 w-[420px] h-[600px] rounded-2xl z-50"
          )}
        >
          {/* Header - Clean & Minimalist with Avatar */}
          <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-black/[0.06] rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="relative">
                {adminSettings?.avatar ? (
                  <img
                    src={adminSettings.avatar}
                    alt={adminSettings.name || 'Admin'}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center ring-2 ring-white shadow-sm">
                    <MessageCircle className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></div>
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-black tracking-tight">{adminSettings?.name || 'SUL ESTATE'}</h3>
                <p className="text-[12px] text-black/50 font-normal">{adminSettings?.title || 'Real Estate Consultant'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={minimizeChat}
                className="w-8 h-8 rounded-lg hover:bg-black/5 transition-colors flex items-center justify-center"
                aria-label="Minimize chat"
              >
                <ChevronDown className="w-4 h-4 text-black/60" />
              </button>
            </div>
          </div>

          {/* User Form (if not started) */}
          {showUserForm && (
            <div className="flex-1 overflow-y-auto px-6 py-8 bg-white flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm"
              >
                <h3 className="text-[18px] font-semibold text-black mb-2 text-center">
                  Let's get started
                </h3>
                <p className="text-[14px] text-black/60 mb-6 text-center">
                  Please provide your name and email to start the conversation
                </p>
                <form onSubmit={handleUserFormSubmit} className="space-y-4">
                  <div>
                    <input
                      ref={nameInputRef}
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Your name*"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-black/10 bg-white text-black placeholder:text-black/40 focus:outline-none focus:border-black/30 transition-all duration-200 text-[14px]"
                    />
                  </div>
                  <div>
                    <input
                      ref={emailInputRef}
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="Your email*"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-black/10 bg-white text-black placeholder:text-black/40 focus:outline-none focus:border-black/30 transition-all duration-200 text-[14px]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-black/90 border-0 px-6 py-3 rounded-lg text-[14px] font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Start Conversation
                  </button>
                </form>
              </motion.div>
            </div>
          )}

          {/* Messages Container */}
          {!showUserForm && (
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-white">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black/5 flex items-center justify-center">
                      <MessageCircle className="w-8 h-8 text-black/30" />
                    </div>
                    <p className="text-black/60 text-sm">Loading conversation...</p>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "flex",
                      message.sender === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] px-4 py-3 text-[14px] leading-relaxed",
                        message.sender === 'user'
                          ? "bg-black text-white rounded-2xl rounded-br-md"
                          : "bg-gray-100 text-black rounded-2xl rounded-bl-md"
                      )}
                    >
                      {/* Nome do usuário para mensagens do usuário */}
                      {message.sender === 'user' && userName && (
                        <p className="text-[11px] font-medium text-white/70 mb-1.5">
                          {userName}
                        </p>
                      )}
                      {/* Nome do admin para mensagens do admin */}
                      {message.sender === 'admin' && adminSettings.name && (
                        <p className="text-[11px] font-medium text-black/60 mb-1.5">
                          {adminSettings.name}
                        </p>
                      )}
                      <p className="font-normal">{message.text}</p>
                      <p 
                        className={cn(
                          "text-[11px] mt-2 font-normal",
                          message.sender === 'user' ? "text-white/50" : "text-black/40"
                        )}
                      >
                        {message.timestamp instanceof Date 
                          ? message.timestamp.toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })
                          : new Date(message.timestamp).toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })
                        }
                      </p>
                    </div>
                  </motion.div>
                ))
              )}

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 text-black rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1.5">
                    <motion.div
                      className="w-2 h-2 bg-black/50 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-black/50 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-black/50 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input Area */}
          {!showUserForm && (
            <div className="px-6 py-5 bg-white border-t border-black/[0.06] rounded-b-2xl">
            <div className="flex gap-3 items-end">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1 px-5 py-3.5 rounded-xl border border-black/[0.1] focus:outline-none focus:border-black/20 transition-all duration-200 text-[14px] text-black bg-gray-50 placeholder:text-black/40 font-normal"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={cn(
                  "w-11 h-11 rounded-xl transition-all duration-200 flex items-center justify-center",
                  "bg-black hover:bg-black/90",
                  "disabled:opacity-30 disabled:cursor-not-allowed"
                )}
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
