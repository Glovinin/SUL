"use client"

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { toast } from 'sonner'
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Plus, 
  Buildings,
  MapPin,
  Bed,
  Bathtub,
  Ruler,
  Calendar,
  Tag,
  Images,
  FileText,
  Sparkle,
  CheckCircle,
  Trash,
  Star
} from '@phosphor-icons/react'
import { Button } from '../../../../components/ui/button'
import {
  getPortfolioItem,
  createPortfolioItem,
  updatePortfolioItem,
  uploadPortfolioImage,
} from '../../../../lib/admin-helpers'
import { PortfolioItem } from '../../../../lib/admin-types'

const PRESET_TAGS = [
  'Featured', 
  'Sold', 
  'In Progress', 
  'Under Construction', 
  'Completed', 
  'Luxury', 
  'Exclusive', 
  'Waterfront', 
  'Historic', 
  'Modern', 
  'Contemporary',
  'Renovated',
  'New Construction',
  'Success Story',
  'Award Winning',
  'Eco Friendly',
  'Smart Home',
  'Penthouse',
  'Villa',
  'Apartment',
  'Townhouse',
  'Land',
  'Commercial',
  'Investment',
  'Pre-Construction'
]

const PRESET_FEATURES = [
  'Swimming Pool', 'Garden', 'Balcony', 'Terrace', 'Fireplace', 'Air Conditioning',
  'Heating', 'Elevator', 'Parking', 'Garage', 'Storage', 'Basement',
  'Wine Cellar', 'Home Office', 'Gym', 'Sauna', 'Jacuzzi', 'Smart Home',
  'Security System', 'Alarm', 'Intercom', 'Video Surveillance', 'Double Glazing',
  'Solar Panels', 'Energy Efficient', 'High Ceilings', 'Hardwood Floors',
  'Marble Floors', 'Granite Countertops', 'Modern Kitchen', 'Walk-in Closet',
  'Master Suite', 'Guest Room', 'Maid\'s Room', 'Laundry Room', 'Wine Storage'
]

const PRESET_AMENITIES = [
  'Concierge', '24/7 Security', 'Reception', 'Lobby', 'Gym/Fitness Center',
  'Swimming Pool', 'Spa', 'Sauna', 'Steam Room', 'Jacuzzi', 'Rooftop Terrace',
  'Garden', 'Playground', 'Pet Friendly', 'Bike Storage', 'Car Parking',
  'Valet Parking', 'Electric Car Charging', 'Storage Units', 'Package Room',
  'Business Center', 'Conference Room', 'Co-working Space', 'Library',
  'Cinema Room', 'Game Room', 'Wine Cellar', 'Private Dining', 'Bar',
  'Restaurant', 'Café', 'Supermarket', 'Pharmacy', 'Dry Cleaning',
  'Laundry Service', 'Housekeeping', 'Maintenance', 'Elevator', 'Air Conditioning',
  'Central Heating', 'Fiber Internet', 'Cable TV', 'Satellite TV'
]

export default function PortfolioEditPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const isNew = id === 'new'

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState<string | null>(null)
  const [portfolioItem, setPortfolioItem] = useState<Partial<PortfolioItem>>({
    title: '',
    location: '',
    type: '',
    price: '',
    beds: '',
    baths: '',
    area: '',
    tag: 'Sold',
    image: '',
    images: [],
    description: '',
    longDescription: '',
    features: [],
    amenities: [],
    yearBuilt: '',
    soldDate: '',
    featured: false,
  })

  const [newFeature, setNewFeature] = useState('')
  const [newAmenity, setNewAmenity] = useState('')
  const [customTags, setCustomTags] = useState<string[]>(['Sold'])

  useEffect(() => {
    if (!isNew) {
      loadPortfolioItem()
    }
  }, [id])

  const loadPortfolioItem = async () => {
    try {
      setLoading(true)
      const data = await getPortfolioItem(id)
      if (data) {
        const tags = data.tag ? data.tag.split(',').map(t => t.trim()).filter(Boolean) : ['Sold']
        
        // Garante que a imagem principal está na galeria como primeira imagem
        let galleryImages = data.images || []
        if (data.image) {
          galleryImages = galleryImages.filter(img => img !== data.image)
          galleryImages = [data.image, ...galleryImages]
        }
        
        const description = data.longDescription || data.description || ''
        
        setPortfolioItem({
          ...data,
          images: galleryImages,
          features: data.features || [],
          amenities: data.amenities || [],
          description: description,
          longDescription: description,
        })
        setCustomTags(tags.length > 0 ? tags : ['Sold'])
      }
    } catch (error) {
      console.error('Error loading portfolio item:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isMain = false) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const filesArray = Array.from(files)
    const maxFiles = 20
    const currentImages = portfolioItem.images?.length || 0
    const imagesToAdd = isMain ? filesArray.length : filesArray.length
    
    if (currentImages + imagesToAdd > maxFiles) {
      toast.warning('Limite de imagens atingido', {
        description: `Você pode adicionar no máximo ${maxFiles} imagens. Você pode adicionar mais ${maxFiles - currentImages}.`,
      })
      return
    }

    try {
      setUploading(isMain ? 'main' : 'gallery')
      
      const { compressImages } = await import('../../../../lib/utils')
      const compressedFiles = await compressImages(filesArray, 1920, 0.85)
      
      const portfolioId = isNew ? 'temp' : id
      const uploadPromises = compressedFiles.map(file => uploadPortfolioImage(file, portfolioId))
      const urls = await Promise.all(uploadPromises)

      if (isMain) {
        const mainImageUrl = urls[0]
        const existingImages = portfolioItem.images || []
        const filteredImages = existingImages.filter(img => img !== portfolioItem.image)
        
        setPortfolioItem({ 
          ...portfolioItem, 
          image: mainImageUrl,
          images: [mainImageUrl, ...filteredImages]
        })
      } else {
        setPortfolioItem({ 
          ...portfolioItem, 
          images: [...(portfolioItem.images || []), ...urls],
          image: portfolioItem.image || urls[0]
        })
      }
    } catch (error) {
      console.error('Error uploading images:', error)
      toast.error('Erro ao fazer upload das imagens', {
        description: 'Tente novamente ou verifique sua conexão.',
      })
    } finally {
      setUploading(null)
    }
  }

  const removeImage = (index: number, isMain = false) => {
    if (isMain) {
      const galleryImages = portfolioItem.images || []
      const filteredGallery = galleryImages.filter((img, idx) => idx !== 0)
      const newMainImage = filteredGallery.length > 0 ? filteredGallery[0] : ''
      
      setPortfolioItem({ 
        ...portfolioItem, 
        image: newMainImage,
        images: filteredGallery
      })
    } else {
      const newImages = [...(portfolioItem.images || [])]
      const removedImage = newImages[index]
      newImages.splice(index, 1)
      
      if (index === 0 && portfolioItem.image === removedImage) {
        const newMainImage = newImages.length > 0 ? newImages[0] : ''
        setPortfolioItem({ 
          ...portfolioItem, 
          images: newImages,
          image: newMainImage
        })
      } else {
        setPortfolioItem({ 
          ...portfolioItem, 
          images: newImages
        })
      }
    }
  }

  const toggleTag = (tag: string) => {
    const newTags = customTags.includes(tag)
      ? customTags.filter(t => t !== tag)
      : [...customTags, tag]
    setCustomTags(newTags)
    setPortfolioItem({ ...portfolioItem, tag: newTags.join(', ') })
  }

  const addCustomTag = () => {
    const input = prompt('Enter custom tag:')
    if (input && input.trim() && !customTags.includes(input.trim())) {
      const newTags = [...customTags, input.trim()]
      setCustomTags(newTags)
      setPortfolioItem({ ...portfolioItem, tag: newTags.join(', ') })
    }
  }

  const removeTag = (tag: string) => {
    const newTags = customTags.filter(t => t !== tag)
    setCustomTags(newTags)
    setPortfolioItem({ ...portfolioItem, tag: newTags.join(', ') })
  }

  const addFeature = (feature?: string) => {
    const featureToAdd = feature || newFeature.trim()
    if (featureToAdd && !(portfolioItem.features || []).includes(featureToAdd)) {
      setPortfolioItem({
        ...portfolioItem,
        features: [...(portfolioItem.features || []), featureToAdd]
      })
      setNewFeature('')
    }
  }

  const removeFeature = (index: number) => {
    const newFeatures = [...(portfolioItem.features || [])]
    newFeatures.splice(index, 1)
    setPortfolioItem({ ...portfolioItem, features: newFeatures })
  }

  const toggleFeature = (feature: string) => {
    const currentFeatures = portfolioItem.features || []
    if (currentFeatures.includes(feature)) {
      setPortfolioItem({
        ...portfolioItem,
        features: currentFeatures.filter(f => f !== feature)
      })
    } else {
      setPortfolioItem({
        ...portfolioItem,
        features: [...currentFeatures, feature]
      })
    }
  }

  const addAmenity = (amenity?: string) => {
    const amenityToAdd = amenity || newAmenity.trim()
    if (amenityToAdd && !(portfolioItem.amenities || []).includes(amenityToAdd)) {
      setPortfolioItem({
        ...portfolioItem,
        amenities: [...(portfolioItem.amenities || []), amenityToAdd]
      })
      setNewAmenity('')
    }
  }

  const removeAmenity = (index: number) => {
    const newAmenities = [...(portfolioItem.amenities || [])]
    newAmenities.splice(index, 1)
    setPortfolioItem({ ...portfolioItem, amenities: newAmenities })
  }

  const toggleAmenity = (amenity: string) => {
    const currentAmenities = portfolioItem.amenities || []
    if (currentAmenities.includes(amenity)) {
      setPortfolioItem({
        ...portfolioItem,
        amenities: currentAmenities.filter(a => a !== amenity)
      })
    } else {
      setPortfolioItem({
        ...portfolioItem,
        amenities: [...currentAmenities, amenity]
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const finalPortfolioItem = {
        ...portfolioItem,
        image: portfolioItem.image || portfolioItem.images?.[0] || '',
        tag: customTags.join(', '),
        description: portfolioItem.longDescription || portfolioItem.description || '',
        longDescription: portfolioItem.longDescription || portfolioItem.description || '',
      }

      if (isNew) {
        await createPortfolioItem(finalPortfolioItem as Omit<PortfolioItem, 'id' | 'createdAt' | 'updatedAt'>)
        toast.success('Item do portfólio criado com sucesso!', {
          description: 'O item foi adicionado ao seu portfólio.',
          duration: 3000,
        })
      } else {
        await updatePortfolioItem(id, finalPortfolioItem)
        toast.success('Item do portfólio atualizado com sucesso!', {
          description: 'As alterações foram salvas.',
          duration: 3000,
        })
      }
      setTimeout(() => {
        router.push('/admin/portfolio')
      }, 1500)
    } catch (error) {
      console.error('Error saving portfolio item:', error)
      toast.error('Erro ao salvar item do portfólio', {
        description: 'Tente novamente ou verifique sua conexão.',
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading && !isNew) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black/60">Loading portfolio item...</p>
        </div>
      </div>
    )
  }

  const allImages = portfolioItem.images || []
  const canAddMoreImages = allImages.length < 20

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => router.back()}
            className="bg-black/5 text-black hover:bg-black/10 rounded-full p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-semibold text-black">
              {isNew ? 'Add Portfolio Item' : 'Edit Portfolio Item'}
            </h1>
            <p className="text-sm text-black/50 mt-1">
              {isNew ? 'Add a sold property to your portfolio' : 'Update portfolio item information'}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Information */}
        <div className="bg-white rounded-2xl border border-black/10 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center">
              <Buildings className="w-5 h-5 text-black" weight="duotone" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-black">Basic Information</h2>
              <p className="text-sm text-black/50">Essential property details</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-black mb-2.5">
                <FileText className="w-4 h-4" />
                Title *
              </label>
              <input
                type="text"
                value={portfolioItem.title}
                onChange={(e) => setPortfolioItem({ ...portfolioItem, title: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-xl focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all"
                placeholder="Enter property title"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-black mb-2.5">
                <MapPin className="w-4 h-4" />
                Location *
              </label>
              <input
                type="text"
                value={portfolioItem.location}
                onChange={(e) => setPortfolioItem({ ...portfolioItem, location: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-xl focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all"
                placeholder="Lisbon, Cascais, etc."
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-black mb-2.5">
                <Buildings className="w-4 h-4" />
                Type *
              </label>
              <select
                value={portfolioItem.type}
                onChange={(e) => setPortfolioItem({ ...portfolioItem, type: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-xl focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black transition-all"
                required
              >
                <option value="">Select type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="House">House</option>
                <option value="Studio">Studio</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Estate">Estate</option>
                <option value="Townhouse">Townhouse</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-black mb-2.5">
                <Bed className="w-4 h-4" />
                Beds *
              </label>
              <input
                type="number"
                value={portfolioItem.beds}
                onChange={(e) => setPortfolioItem({ ...portfolioItem, beds: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-xl focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all"
                placeholder="4"
                required
                min="0"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-black mb-2.5">
                <Bathtub className="w-4 h-4" />
                Baths *
              </label>
              <input
                type="number"
                value={portfolioItem.baths}
                onChange={(e) => setPortfolioItem({ ...portfolioItem, baths: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-xl focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all"
                placeholder="3"
                required
                min="0"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-black mb-2.5">
                <Ruler className="w-4 h-4" />
                Area (sqft) *
              </label>
              <input
                type="text"
                value={portfolioItem.area}
                onChange={(e) => setPortfolioItem({ ...portfolioItem, area: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-xl focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all"
                placeholder="250"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-black mb-2.5">
                <Calendar className="w-4 h-4" />
                Year Built
              </label>
              <input
                type="text"
                value={portfolioItem.yearBuilt || ''}
                onChange={(e) => setPortfolioItem({ ...portfolioItem, yearBuilt: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-xl focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all"
                placeholder="2020"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Tags */}
        <div className="bg-white rounded-2xl border border-black/10 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center">
              <Tag className="w-5 h-5 text-black" weight="duotone" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-black">Tags</h2>
              <p className="text-sm text-black/50">Click to add or remove tags</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {PRESET_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    customTags.includes(tag)
                      ? 'bg-black text-white shadow-md'
                      : 'bg-black/5 text-black/70 hover:bg-black/10'
                  }`}
                >
                  {customTags.includes(tag) && <CheckCircle className="w-4 h-4" weight="fill" />}
                  {tag}
                </button>
              ))}
            </div>

            {customTags.length > 0 && (
              <div className="pt-4 border-t border-black/10">
                <p className="text-sm font-medium text-black/60 mb-3">Selected Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {customTags.map((tag) => (
                    <div
                      key={tag}
                      className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium flex items-center gap-2 shadow-md"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={addCustomTag}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-black/60 hover:text-black transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Custom Tag
            </button>
          </div>
        </div>

        {/* Section 3: Images */}
        <div className="bg-white rounded-2xl border border-black/10 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center">
              <Images className="w-5 h-5 text-black" weight="duotone" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-black">Images</h2>
              <p className="text-sm text-black/50">Upload up to 20 images</p>
            </div>
          </div>
          
          {/* Main Image */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-black mb-3">Main Image *</label>
            <div className="flex items-center gap-4">
              {portfolioItem.image && (
                <div className="relative w-40 h-40 rounded-xl overflow-hidden bg-gray-100 border-2 border-black/10 shadow-sm group">
                  <img src={portfolioItem.image} alt="Main" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(0, true)}
                    className="absolute top-2 right-2 bg-black/80 text-white rounded-full p-1.5 hover:bg-black transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <label className="cursor-pointer">
                <div className="px-6 py-3 bg-black text-white hover:bg-black/90 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 shadow-sm hover:shadow-md">
                  <Upload className="w-4 h-4" />
                  {uploading === 'main' ? 'Uploading...' : portfolioItem.image ? 'Change Main Image' : 'Upload Main Image'}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, true)}
                  className="hidden"
                  disabled={uploading === 'main'}
                />
              </label>
            </div>
          </div>

          {/* Gallery Images */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-semibold text-black">Gallery Images ({allImages.length}/20)</label>
              {canAddMoreImages && (
                <label className="cursor-pointer">
                  <div className="px-4 py-2 bg-black/5 text-black hover:bg-black/10 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 border border-black/10">
                    <Plus className="w-4 h-4" />
                    Add Images
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, false)}
                    className="hidden"
                    disabled={uploading === 'gallery' || !canAddMoreImages}
                  />
                </label>
              )}
            </div>
            {allImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {allImages.map((img, index) => {
                  const isMainImage = index === 0 && img === portfolioItem.image
                  return (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border-2 border-black/10 shadow-sm group">
                      <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                      {isMainImage && (
                        <div className="absolute top-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3" weight="fill" />
                          Main
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-black/80 text-white rounded-full p-1.5 hover:bg-black transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
            {allImages.length === 0 && (
              <div className="border-2 border-dashed border-black/20 rounded-xl p-12 text-center">
                <Images className="w-12 h-12 text-black/20 mx-auto mb-4" />
                <p className="text-black/40 mb-4">No gallery images yet</p>
                <label className="cursor-pointer inline-block">
                  <div className="px-6 py-3 bg-black/5 text-black hover:bg-black/10 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 border border-black/10">
                    <Upload className="w-4 h-4" />
                    Upload Gallery Images
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, false)}
                    className="hidden"
                    disabled={uploading === 'gallery'}
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Description */}
        <div className="bg-white rounded-2xl border border-black/10 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center">
              <FileText className="w-5 h-5 text-black" weight="duotone" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-black">Description</h2>
              <p className="text-sm text-black/50">Property details and information</p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-black mb-2.5">Description</label>
            <textarea
              value={portfolioItem.longDescription || portfolioItem.description || ''}
              onChange={(e) => {
                const value = e.target.value
                setPortfolioItem({ 
                  ...portfolioItem, 
                  description: value,
                  longDescription: value
                })
              }}
              rows={10}
              className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-xl focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all resize-none"
              placeholder="Enter a detailed description of the property..."
            />
            <p className="text-xs text-black/40 mt-2">This description will appear in portfolio listings</p>
          </div>
        </div>

        {/* Section 5: Features */}
        <div className="bg-white rounded-2xl border border-black/10 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center">
              <Sparkle className="w-5 h-5 text-black" weight="duotone" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-black">Key Features</h2>
              <p className="text-sm text-black/50">Property highlights and features</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-black/60 mb-3">Quick Select:</p>
              <div className="flex flex-wrap gap-2">
                {PRESET_FEATURES.map((feature) => {
                  const isSelected = (portfolioItem.features || []).includes(feature)
                  return (
                    <button
                      key={feature}
                      type="button"
                      onClick={() => toggleFeature(feature)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isSelected
                          ? 'bg-black text-white shadow-md'
                          : 'bg-black/5 text-black hover:bg-black/10 border border-black/10'
                      }`}
                    >
                      {isSelected && <CheckCircle className="w-3 h-3 inline mr-1.5" weight="fill" />}
                      {feature}
                    </button>
                  )
                })}
              </div>
            </div>

            {(portfolioItem.features || []).length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-black/60">Selected Features:</p>
                {(portfolioItem.features || []).map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-black/5 rounded-xl border border-black/10 group">
                    <CheckCircle className="w-5 h-5 text-black/40 flex-shrink-0" weight="fill" />
                    <span className="flex-1 text-black">{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-red-600 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2 pt-2 border-t border-black/10">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                className="flex-1 px-4 py-2 bg-white border-2 border-black/10 rounded-xl focus:outline-none focus:border-black/30 text-black placeholder:text-black/40 transition-all"
                placeholder="Add a custom feature..."
              />
              <Button
                type="button"
                onClick={() => addFeature()}
                className="bg-black text-white hover:bg-black/90 px-4 py-2 rounded-xl"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Section 6: Amenities */}
        <div className="bg-white rounded-2xl border border-black/10 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center">
              <Buildings className="w-5 h-5 text-black" weight="duotone" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-black">Building Amenities</h2>
              <p className="text-sm text-black/50">Facilities and services available</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-black/60 mb-3">Quick Select:</p>
              <div className="flex flex-wrap gap-2">
                {PRESET_AMENITIES.map((amenity) => {
                  const isSelected = (portfolioItem.amenities || []).includes(amenity)
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isSelected
                          ? 'bg-black text-white shadow-md'
                          : 'bg-black/5 text-black hover:bg-black/10 border border-black/10'
                      }`}
                    >
                      {isSelected && <CheckCircle className="w-3 h-3 inline mr-1.5" weight="fill" />}
                      {amenity}
                    </button>
                  )
                })}
              </div>
            </div>

            {(portfolioItem.amenities || []).length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-black/60">Selected Amenities:</p>
                {(portfolioItem.amenities || []).map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-black/5 rounded-xl border border-black/10 group">
                    <CheckCircle className="w-5 h-5 text-black/40 flex-shrink-0" weight="fill" />
                    <span className="flex-1 text-black">{amenity}</span>
                    <button
                      type="button"
                      onClick={() => removeAmenity(index)}
                      className="text-red-600 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2 pt-2 border-t border-black/10">
              <input
                type="text"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
                className="flex-1 px-4 py-2 bg-white border-2 border-black/10 rounded-xl focus:outline-none focus:border-black/30 text-black placeholder:text-black/40 transition-all"
                placeholder="Add a custom amenity..."
              />
              <Button
                type="button"
                onClick={() => addAmenity()}
                className="bg-black text-white hover:bg-black/90 px-4 py-2 rounded-xl"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-6 border-t border-black/10">
          <Button
            type="submit"
            disabled={loading}
            className="bg-black text-white hover:bg-black/90 px-8 py-3 text-base font-semibold shadow-sm hover:shadow-md transition-all rounded-xl"
          >
            {loading ? 'Saving...' : isNew ? 'Create Portfolio Item' : 'Save Changes'}
          </Button>
          <Button
            type="button"
            onClick={() => router.back()}
            className="bg-white border-2 border-black/10 text-black hover:bg-black/5 px-8 py-3 text-base font-semibold transition-all rounded-xl"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

