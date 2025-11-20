"use client"

import { useEffect, useState } from 'react'

/**
 * Hook to optimize animations for mobile devices
 * Returns optimized animation settings based on device type
 */
export function useMobileOptimizedAnimation() {
  const [isMobile, setIsMobile] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const checkDevice = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())
      const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
      
      setIsMobile(isMobileDevice)
      setIsIOS(isIOSDevice)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  return {
    isMobile,
    isIOS,
    // Optimized animation settings for mobile
    getAnimationProps: () => ({
      // Reduce animation complexity on mobile
      transition: isMobile 
        ? { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } // Faster, simpler easing
        : { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
      // Use transform instead of y/x for better performance
      useTransform: true,
      // Reduce viewport margin on mobile to prevent flickering
      viewportMargin: isMobile ? '0px' : '-50px',
      // Reduce stagger delays on mobile
      staggerDelay: isMobile ? 0.02 : 0.05,
    }),
    // CSS classes for GPU acceleration
    gpuAccelerated: 'will-change-transform transform-gpu',
  }
}

