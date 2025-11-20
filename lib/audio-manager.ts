// Global Audio Manager
// Manages audio playback across the application to prevent overlapping

class AudioManager {
  private currentAudio: HTMLAudioElement | null = null
  private isClient: boolean = false
  private playedAudios: Set<string> = new Set()

  constructor() {
    // Check if we're on the client side
    this.isClient = typeof window !== 'undefined'
    
    // Load played audios from sessionStorage
    if (this.isClient) {
      const stored = sessionStorage.getItem('greencheck_played_audios')
      if (stored) {
        try {
          this.playedAudios = new Set(JSON.parse(stored))
        } catch (e) {
          this.playedAudios = new Set()
        }
      }
    }
  }

  // Stop any currently playing audio
  stop() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause()
        this.currentAudio.currentTime = 0
        this.currentAudio = null
      } catch (error) {
        // Silent error handling
      }
    }
  }

  // Play a new audio file
  play(audioPath: string, volume: number = 0.3, playOnce: boolean = false) {
    if (!this.isClient) return

    // Check if this audio should only play once
    if (playOnce && this.playedAudios.has(audioPath)) {
      return
    }

    // Stop any currently playing audio first
    this.stop()

    try {
      const audio = new Audio(audioPath)
      audio.volume = volume
      this.currentAudio = audio

      audio.play().catch(() => {
        // Audio play failed (likely due to browser autoplay policy)
        // This is normal and expected behavior - silent failure
      })

      // Mark as played if playOnce is true
      if (playOnce) {
        this.playedAudios.add(audioPath)
        sessionStorage.setItem('greencheck_played_audios', JSON.stringify(Array.from(this.playedAudios)))
      }

      // Clear reference when audio ends naturally
      audio.addEventListener('ended', () => {
        this.currentAudio = null
      })

      // Clear reference if audio has an error
      audio.addEventListener('error', () => {
        this.currentAudio = null
      })
    } catch (error) {
      // Silent error handling
    }
  }

  // Get current audio status
  isPlaying(): boolean {
    return this.currentAudio !== null && !this.currentAudio.paused
  }

  // Reset played audios (useful for testing or when needed)
  resetPlayedAudios() {
    this.playedAudios.clear()
    if (this.isClient) {
      sessionStorage.removeItem('greencheck_played_audios')
    }
  }
}

// Export a singleton instance
export const audioManager = new AudioManager()

// Convenience functions for specific pages
export const playESGAudio = () => audioManager.play('/audio/esg.mp3')
export const playMarketplaceAudio = () => audioManager.play('/audio/marketplace.mp3')
export const playInvestorsAudio = (playOnce: boolean = false) => audioManager.play('/audio/restrito.mp3', 0.3, playOnce)
export const stopAllAudio = () => audioManager.stop()
export const resetPlayedAudios = () => audioManager.resetPlayedAudios()

