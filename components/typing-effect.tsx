"use client"

import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'framer-motion'

interface TypingEffectProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  staggerDelay?: number
}

export function TypingEffect({
  text,
  speed = 0.03, // Faster defaults for premium feel
  delay = 0,
  className = '',
  staggerDelay = 0.02
}: TypingEffectProps) {
  const letters = Array.from(text)
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay / 1000 }
    })
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 10,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100
      }
    }
  }

  // Ref for InView trigger
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.div
      ref={ref}
      style={{ display: 'inline-block', overflow: 'hidden' }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {letter}
        </motion.span>
      ))}
      {/* Optional: subtle blinking cursor at the end that fades out */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 0.8,
          repeat: 3,
          delay: delay / 1000 + (letters.length * staggerDelay)
        }}
        className="inline-block ml-[1px] w-[2px] h-[1em] bg-white/50 align-middle"
      />
    </motion.div>
  )
}
