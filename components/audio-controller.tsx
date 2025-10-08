"use client"

import { useEffect } from 'react'

/**
 * Global Audio Controller Component
 * 
 * This component should be placed in the root layout to ensure
 * that audio is properly managed across the application.
 * 
 * Note: Audio stopping on navigation is handled by the AudioManager itself
 * when a new audio is played. This component only handles browser events.
 */
export function AudioController() {
  useEffect(() => {
    // Note: We DON'T stop audio on pathname change because that would
    // prevent the new page's audio from playing. The AudioManager handles
    // stopping previous audio when a new audio starts playing.
    
    // Only stop audio when user explicitly leaves or hides the page
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Optional: You may want to pause instead of stop
        // For now, we let it continue playing
        // stopAllAudio()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // This component doesn't render anything
  return null
}

