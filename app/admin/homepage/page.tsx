"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { 
  ArrowLeft, 
  Upload, 
  Play,
  Image as ImageIcon,
  VideoCamera,
  CheckCircle,
  X
} from '@phosphor-icons/react'
import { Button } from '../../../components/ui/button'
import {
  getHomepageSettings,
  updateHomepageSettings,
  uploadHomepageVideo,
  uploadHomepageImage,
} from '../../../lib/admin-helpers'
import { HomepageSettings } from '../../../lib/admin-types'

export default function HomepageEditPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState<string | null>(null)
  const [settings, setSettings] = useState<Partial<HomepageSettings>>({
    heroVideo: '',
    heroVideoPoster: '',
    aboutUsImage: '',
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      setLoading(true)
      const data = await getHomepageSettings()
      if (data) {
        setSettings(data)
      }
    } catch (error) {
      console.error('Error loading homepage settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Verificar tamanho do arquivo e avisar se muito grande
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      toast.warning('Vídeo muito grande', {
        description: `O vídeo tem ${(file.size / 1024 / 1024).toFixed(1)}MB. Vídeos grandes podem demorar para carregar na homepage.`,
        action: {
          label: 'Continuar mesmo assim',
          onClick: async () => {
            try {
              setUploading('heroVideo')
              const url = await uploadHomepageVideo(file)
              setSettings({ ...settings, heroVideo: url })
              toast.success('Vídeo enviado com sucesso!', {
                description: 'Recomendamos comprimir o vídeo para melhor performance.',
              })
            } catch (error) {
              console.error('Error uploading video:', error)
              toast.error('Erro ao fazer upload do vídeo', {
                description: 'Tente novamente ou verifique sua conexão.',
              })
            } finally {
              setUploading(null)
            }
          },
        },
        cancel: {
          label: 'Cancelar',
          onClick: () => {
            e.target.value = '' // Reset input
          },
        },
        duration: 8000,
      })
      return
    }

    try {
      setUploading('heroVideo')
      const url = await uploadHomepageVideo(file)
      setSettings({ ...settings, heroVideo: url })
      toast.success('Vídeo enviado com sucesso!', {
        description: 'O vídeo foi atualizado na homepage.',
      })
    } catch (error) {
      console.error('Error uploading video:', error)
      toast.error('Erro ao fazer upload do vídeo', {
        description: 'Tente novamente ou verifique sua conexão.',
      })
    } finally {
      setUploading(null)
    }
  }

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    imageType: 'aboutUs' | 'heroPoster'
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(imageType)
      
      // Comprimir imagem antes do upload
      const { compressImage } = await import('../../../lib/utils')
      const compressedFile = await compressImage(file, 1920, 0.85) // maxWidth 1920px, quality 85%
      
      const url = await uploadHomepageImage(compressedFile, imageType)
      setSettings({ ...settings, [imageType === 'aboutUs' ? 'aboutUsImage' : 'heroVideoPoster']: url })
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Erro ao fazer upload da imagem', {
        description: 'Tente novamente ou verifique sua conexão.',
      })
    } finally {
      setUploading(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await updateHomepageSettings(settings)
      toast.success('Configurações salvas com sucesso!', {
        description: 'As alterações da homepage foram aplicadas.',
        duration: 3000,
      })
      setTimeout(() => {
        router.push('/admin')
      }, 1500)
    } catch (error) {
      console.error('Error saving homepage settings:', error)
      toast.error('Erro ao salvar configurações', {
        description: 'Tente novamente ou verifique sua conexão.',
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading && !settings.heroVideo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black/60">Loading homepage settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-black/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push('/admin')}
              className="p-2 hover:bg-black/5"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-black">Edit Homepage</h1>
              <p className="text-sm text-black/60">Manage homepage content and media</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Section 1: Hero Video */}
          <div className="bg-white rounded-2xl border border-black/10 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center">
                <VideoCamera className="w-5 h-5 text-black" weight="duotone" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-black">Hero Section Video</h2>
                <p className="text-sm text-black/50">Main video background for homepage hero</p>
              </div>
            </div>

            {/* Video Optimization Tips */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <span>💡</span> Dicas de Otimização:
              </h3>
              <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
                <li>Resolução recomendada: 1920x1080 (Full HD)</li>
                <li>Tamanho ideal: &lt; 10MB para carregamento rápido</li>
                <li>Codec: H.264 (MP4) para melhor compatibilidade</li>
                <li>Duração: Mantenha curto (10-30 segundos) para loop suave</li>
                <li>Use ferramentas como HandBrake ou FFmpeg para comprimir</li>
              </ul>
            </div>

            <div className="space-y-4">
              {/* Video Upload */}
              <div>
                <label className="block text-sm font-medium text-black/70 mb-2">
                  Hero Video (MP4)
                </label>
                <div className="relative">
                  {settings.heroVideo ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-black/5 border-2 border-black/10">
                      <video
                        src={settings.heroVideo}
                        className="w-full h-full object-cover"
                        controls
                        muted
                      />
                      <button
                        type="button"
                        onClick={() => setSettings({ ...settings, heroVideo: '' })}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/80 hover:bg-black flex items-center justify-center transition-colors"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed border-black/20 bg-black/5 hover:bg-black/10 cursor-pointer transition-colors">
                      <input
                        type="file"
                        accept="video/mp4,video/webm"
                        onChange={handleVideoUpload}
                        className="hidden"
                        disabled={uploading === 'heroVideo'}
                      />
                      {uploading === 'heroVideo' ? (
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-2"></div>
                          <p className="text-sm text-black/60">Uploading...</p>
                        </div>
                      ) : (
                        <>
                          <VideoCamera className="w-12 h-12 text-black/40 mb-2" />
                          <p className="text-sm font-medium text-black/70">Click to upload video</p>
                          <p className="text-xs text-black/50 mt-1">MP4, WebM (max 50MB)</p>
                        </>
                      )}
                    </label>
                  )}
                </div>
              </div>

              {/* Video Poster Upload */}
              <div>
                <label className="block text-sm font-medium text-black/70 mb-2">
                  Video Poster Image (Optional)
                </label>
                <div className="relative">
                  {settings.heroVideoPoster ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-black/5 border-2 border-black/10">
                      <img
                        src={settings.heroVideoPoster}
                        alt="Video poster"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setSettings({ ...settings, heroVideoPoster: '' })}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/80 hover:bg-black flex items-center justify-center transition-colors"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed border-black/20 bg-black/5 hover:bg-black/10 cursor-pointer transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'heroPoster')}
                        className="hidden"
                        disabled={uploading === 'heroPoster'}
                      />
                      {uploading === 'heroPoster' ? (
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-2"></div>
                          <p className="text-sm text-black/60">Uploading...</p>
                        </div>
                      ) : (
                        <>
                          <ImageIcon className="w-12 h-12 text-black/40 mb-2" />
                          <p className="text-sm font-medium text-black/70">Click to upload poster</p>
                          <p className="text-xs text-black/50 mt-1">JPG, PNG (recommended)</p>
                        </>
                      )}
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: About Us Image */}
          <div className="bg-white rounded-2xl border border-black/10 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-black" weight="duotone" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-black">About Us Image</h2>
                <p className="text-sm text-black/50">Image displayed in the About Us section</p>
              </div>
            </div>

            <div className="relative">
              {settings.aboutUsImage ? (
                <div className="relative aspect-[4/5] max-w-md rounded-xl overflow-hidden bg-black/5 border-2 border-black/10">
                  <img
                    src={settings.aboutUsImage}
                    alt="About Us"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, aboutUsImage: '' })}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/80 hover:bg-black flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-[4/5] max-w-md rounded-xl border-2 border-dashed border-black/20 bg-black/5 hover:bg-black/10 cursor-pointer transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'aboutUs')}
                    className="hidden"
                    disabled={uploading === 'aboutUs'}
                  />
                  {uploading === 'aboutUs' ? (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-2"></div>
                      <p className="text-sm text-black/60">Uploading...</p>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="w-12 h-12 text-black/40 mb-2" />
                      <p className="text-sm font-medium text-black/70">Click to upload image</p>
                      <p className="text-xs text-black/50 mt-1">JPG, PNG (recommended 4:5 ratio)</p>
                    </>
                  )}
                </label>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin')}
              className="px-6 py-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-black text-white hover:bg-black/90 px-6 py-2"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

