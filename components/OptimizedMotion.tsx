"use client"

import { motion, MotionProps } from 'framer-motion'
import { ReactNode, useMemo } from 'react'
import { useMobileOptimizedAnimation } from '../lib/useMobileOptimizedAnimation'

interface OptimizedMotionProps extends MotionProps {
  children: ReactNode
  className?: string
}

/**
 * Optimized motion component for mobile devices
 * Uses GPU-accelerated transforms and reduced animation complexity on mobile
 */
export function OptimizedMotion({ 
  children, 
  className = '',
  initial,
  whileInView,
  viewport,
  transition,
  ...props 
}: OptimizedMotionProps) {
  const { isMobile, isIOS, getAnimationProps, gpuAccelerated } = useMobileOptimizedAnimation()
  const animProps = getAnimationProps()

  // Convert y/x animations to transform for better performance
  const optimizedInitial = useMemo(() => {
    if (!initial) return initial
    if (typeof initial === 'object' && 'y' in initial) {
      return { ...initial, y: initial.y, transform: `translateY(${initial.y}px)` }
    }
    return initial
  }, [initial])

  const optimizedWhileInView = useMemo(() => {
    if (!whileInView) return whileInView
    if (typeof whileInView === 'object' && 'y' in whileInView) {
      return { ...whileInView, y: whileInView.y }
    }
    return whileInView
  }, [whileInView])

  // Optimize transition for mobile
  const optimizedTransition = useMemo(() => {
    if (isMobile || isIOS) {
      return {
        ...animProps.transition,
        ...transition,
        // Force GPU acceleration
        type: 'tween' as const,
      } as any
    }
    return (transition || animProps.transition) as any
  }, [isMobile, isIOS, transition, animProps])

  // Optimize viewport for mobile
  const optimizedViewport = useMemo(() => {
    if (isMobile || isIOS) {
      return {
        once: true,
        margin: '0px', // Reduce margin to prevent flickering
        amount: 0.2, // Trigger earlier
        ...viewport,
      }
    }
    return {
      once: true,
      margin: '-50px',
      ...viewport,
    }
  }, [isMobile, isIOS, viewport])

  return (
    <motion.div
      initial={optimizedInitial}
      whileInView={optimizedWhileInView}
      viewport={optimizedViewport}
      transition={optimizedTransition}
      className={`${gpuAccelerated} ${className}`}
      style={{
        ...props.style,
        // Force GPU acceleration
        backfaceVisibility: 'hidden',
        perspective: 1000,
        WebkitBackfaceVisibility: 'hidden',
        WebkitPerspective: 1000,
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

