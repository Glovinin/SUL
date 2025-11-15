"use client"

import { useEffect } from 'react'

/**
 * Global component to optimize Framer Motion animations on mobile/iOS
 * Adds CSS classes and optimizations to prevent flickering
 */
export function MotionOptimizer() {
  useEffect(() => {
    // Add global styles for motion components
    const style = document.createElement('style')
    style.textContent = `
      /* Force GPU acceleration for all motion components on mobile */
      @media (max-width: 768px) {
        [data-framer-component] {
          -webkit-transform: translateZ(0) !important;
          transform: translateZ(0) !important;
          -webkit-backface-visibility: hidden !important;
          backface-visibility: hidden !important;
          will-change: transform, opacity !important;
        }
      }

      /* iOS Safari specific optimizations */
      @supports (-webkit-touch-callout: none) {
        @media (max-width: 768px) {
          [data-framer-component] {
            -webkit-transform: translateZ(0) !important;
            transform: translateZ(0) !important;
            -webkit-backface-visibility: hidden !important;
            backface-visibility: hidden !important;
            will-change: transform, opacity !important;
            transform-style: preserve-3d !important;
            -webkit-transform-style: preserve-3d !important;
          }
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return null
}


