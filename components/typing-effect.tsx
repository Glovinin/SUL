"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypingEffectProps {
  text: string
  speed?: number // milliseconds per character
  delay?: number // delay before starting (milliseconds)
  className?: string
  onComplete?: () => void
}

export function TypingEffect({ 
  text, 
  speed = 50, 
  delay = 0,
  className = '',
  onComplete 
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (currentIndex >= text.length) {
      setIsComplete(true)
      if (onComplete) {
        onComplete()
      }
      return
    }

    const timeout = setTimeout(() => {
      if (currentIndex === 0) {
        setHasStarted(true)
      }
      setDisplayedText(text.slice(0, currentIndex + 1))
      setCurrentIndex(currentIndex + 1)
    }, currentIndex === 0 ? delay : speed)

    return () => clearTimeout(timeout)
  }, [currentIndex, text, speed, delay, onComplete])

  return (
    <>
      <style>{`
        @keyframes typing-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .typing-cursor {
          animation: typing-blink 1s infinite;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
      <motion.span 
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: hasStarted ? 1 : 0 }}
        transition={{ 
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        {displayedText}
        {!isComplete && (
          <motion.span 
            className="typing-cursor inline-block ml-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            |
          </motion.span>
        )}
      </motion.span>
    </>
  )
}

