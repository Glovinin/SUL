"use client"

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

export default function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m SUL ESTATE\'s AI assistant. How can I help you with your real estate investment in Portugal today?',
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
    if (!inputValue.trim()) return

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
    } catch (error) {
      console.error('Error calling AI:', error)
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
          "fixed z-50 overflow-visible",
          isMobile 
            ? "bottom-6 right-6" 
            : "bottom-8 right-8"
        )}
      >
        {/* Indicator Line - Subtle pulse animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={cn(
              "absolute rounded-full border border-black/20",
              isMobile ? "w-20 h-20" : "w-24 h-24"
            )}
          />
        </motion.div>

        {/* Main Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleChat}
          className={cn(
            "relative rounded-full transition-all duration-300",
            "bg-black hover:bg-black/90",
            "shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]",
            "border border-black/10",
            isMobile 
              ? "w-16 h-16" 
              : "w-20 h-20"
          )}
          aria-label="Open AI Chat"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <MessageCircle 
              className={cn(
                "text-white transition-transform duration-300",
                isMobile ? "w-7 h-7" : "w-9 h-9"
              )} 
            />
          </div>
        </motion.button>
        
        {/* Notification Badge - Separate element, positioned relative to container */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 500, damping: 25 }}
          className={cn(
            "absolute bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg pointer-events-none z-[100]",
            isMobile 
              ? "top-0 right-0 w-6 h-6" 
              : "top-0 right-0 w-6 h-6"
          )}
        >
          <span className="text-[11px] font-semibold text-white leading-none">1</span>
        </motion.div>
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
      >
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={expandChat}
          className={cn(
            "relative rounded-full transition-all duration-300",
            "bg-black hover:bg-black/90",
            "shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
            "border border-black/10",
            "flex items-center justify-center",
            isMobile 
              ? "w-14 h-14" 
              : "w-16 h-16"
          )}
          aria-label="Expand chat"
        >
          {/* Pulse indicator */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full bg-black/20"
          />
          
          <div className="relative w-full h-full flex items-center justify-center">
            <MessageCircle 
              className={cn(
                "text-white",
                isMobile ? "w-6 h-6" : "w-7 h-7"
              )} 
            />
          </div>
        </motion.button>
        
        {/* Notification Badge - Separate element, positioned relative to container */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 500, damping: 25 }}
          className={cn(
            "absolute bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg pointer-events-none z-[100]",
            isMobile 
              ? "top-0 right-0 w-6 h-6" 
              : "top-0 right-0 w-6 h-6"
          )}
        >
          <span className="text-[11px] font-semibold text-white leading-none">1</span>
        </motion.div>
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
            "fixed bg-white rounded-[32px] flex flex-col overflow-hidden",
            "border border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.15)]",
            "backdrop-blur-xl",
            isMobile 
              ? "inset-0 rounded-none z-[9999]" 
              : "bottom-8 right-8 w-[420px] h-[600px] z-50"
          )}
        >
          {/* Header - Clean & Minimalist */}
          <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-black/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-black tracking-tight">SUL ESTATE AI</h3>
                <p className="text-[12px] text-black/50 font-normal">Real Estate Consultant</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={minimizeChat}
                className="w-8 h-8 rounded-full hover:bg-black/5 transition-colors flex items-center justify-center"
                aria-label="Minimize chat"
              >
                <ChevronDown className="w-4 h-4 text-black/60" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-white">
            {messages.map((message) => (
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
                    "max-w-[80%] rounded-[20px] px-4 py-3 text-[14px] leading-relaxed",
                    message.sender === 'user'
                      ? "bg-black text-white rounded-br-[6px]"
                      : "bg-black/5 text-black rounded-bl-[6px] border border-black/5"
                  )}
                >
                  <p className="font-normal">{message.text}</p>
                  <p 
                    className={cn(
                      "text-[11px] mt-2 font-normal",
                      message.sender === 'user' ? "text-white/50" : "text-black/40"
                    )}
                  >
                    {message.timestamp.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-black/5 text-black rounded-[20px] rounded-bl-[6px] px-4 py-3 border border-black/5">
                  <div className="flex gap-1.5">
                    <motion.div
                      className="w-2 h-2 bg-black/40 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-black/40 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-black/40 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="px-6 py-5 bg-white border-t border-black/5">
            <div className="flex gap-3 items-end">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about properties, locations..."
                className="flex-1 px-5 py-3.5 rounded-full border border-black/10 focus:outline-none focus:border-black/30 transition-all duration-200 text-[14px] text-black bg-black/5 placeholder:text-black/40 font-normal"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={cn(
                  "w-11 h-11 rounded-full transition-all duration-200 flex items-center justify-center",
                  "bg-black hover:bg-black/90",
                  "disabled:opacity-30 disabled:cursor-not-allowed",
                  "shadow-sm hover:shadow-md"
                )}
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-4">
              {['Lisbon Properties', 'Algarve Villas', 'Investment Guide'].map((action) => (
                <button
                  key={action}
                  onClick={() => {
                    setInputValue(action)
                    setTimeout(() => handleSendMessage(), 100)
                  }}
                  className="text-[12px] px-4 py-2 rounded-full bg-black/5 text-black hover:bg-black/10 transition-colors border border-black/10 hover:border-black/20 font-normal"
                >
                  {action}
                </button>
              ))}
            </div>
            
            <p className="text-[11px] text-black/40 text-center mt-4 font-normal">
              Powered by Gemini AI • SUL by VS
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
