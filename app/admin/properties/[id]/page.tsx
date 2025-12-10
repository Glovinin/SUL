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
  CurrencyEur,
  Bed,
  Bathtub,
  Ruler,
  Calendar,
  Tag,
  Images,
  FileText,
  Star,
  Sparkle,
  CheckCircle,
  Trash,
} from '@phosphor-icons/react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { SortableItem } from '../../../../components/admin/SortableItem'
import { Checkbox } from '../../../../components/ui/checkbox'
import { Button } from '../../../../components/ui/button'
import {
  getProperty,
  createProperty,
  updateProperty,
  uploadPropertyImage,
} from '../../../../lib/admin-helpers'
import { Property } from '../../../../lib/admin-types'

const PRESET_TAGS = ['Featured', 'New', 'Luxury', 'Available', 'Sold', 'Pending', 'Exclusive', 'Waterfront', 'Historic', 'Modern']

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

export default function PropertyEditPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const isNew = id === 'new'

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState<string | null>(null)
  const [property, setProperty] = useState<Partial<Property>>({
    title: '',
    location: '',
    type: '',
    price: '',
    beds: '',
    baths: '',
    area: '',
    tag: '',
    image: '',
    images: [],
    description: '',
    longDescription: '', // Usado como campo único de descrição
    features: [],
    amenities: [],
    yearBuilt: '',
    featured: false,
    showInPortfolio: false,
  })

  const [newFeature, setNewFeature] = useState('')
  const [newAmenity, setNewAmenity] = useState('')
  const [customTags, setCustomTags] = useState<string[]>([])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = (property.images || []).indexOf(active.id as string)
      const newIndex = (property.images || []).indexOf(over?.id as string)

      const newImages = arrayMove(property.images || [], oldIndex, newIndex)

      setProperty({
        ...property,
        images: newImages,
        image: newImages[0] || ''
      })
    }
  }

  // Format price with euro symbol and thousand separators
  const formatPrice = (value: string): string => {
    const numbers = value.replace(/\D/g, '')
    if (!numbers) return ''
    const formatted = numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return `€${formatted}`
  }

  // Parse price to remove formatting for storage
  const parsePrice = (value: string): string => {
    return value.replace(/[€.\s]/g, '')
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const parsed = parsePrice(inputValue)
    setProperty({ ...property, price: parsed })
  }

  useEffect(() => {
    if (!isNew) {
      loadProperty()
    }
  }, [id])

  const loadProperty = async () => {
    try {
      setLoading(true)
      const data = await getProperty(id)
      if (data) {
        const tags = data.tag ? data.tag.split(',').map(t => t.trim()).filter(Boolean) : []

        // Garante que a imagem principal está na galeria como primeira imagem
        let galleryImages = data.images || []
        if (data.image) {
          // Remove a imagem principal da galeria se já estiver lá
          galleryImages = galleryImages.filter(img => img !== data.image)
          // Adiciona a imagem principal no início da galeria
          galleryImages = [data.image, ...galleryImages]
        }

        // Garante que description e longDescription sejam iguais
        const description = data.longDescription || data.description || ''

        setProperty({
          ...data,
          images: galleryImages,
          features: data.features || [],
          amenities: data.amenities || [],
          description: description,
          longDescription: description,
        })
        setCustomTags(tags)
      }
    } catch (error) {
      console.error('Error loading property:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isMain = false) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const filesArray = Array.from(files)
    const maxFiles = 20
    const currentImages = property.images?.length || 0

    // Se for imagem principal, conta como 1 imagem adicional na galeria
    const imagesToAdd = isMain ? filesArray.length : filesArray.length

    if (currentImages + imagesToAdd > maxFiles) {
      toast.warning('Limite de imagens atingido', {
        description: `Você pode adicionar no máximo ${maxFiles} imagens. Você pode adicionar mais ${maxFiles - currentImages}.`,
      })
      return
    }

    try {
      setUploading(isMain ? 'main' : 'gallery')

      // Comprimir imagens antes do upload
      const { compressImages } = await import('../../../../lib/utils')
      const compressedFiles = await compressImages(filesArray, 1920, 0.85) // maxWidth 1920px, quality 85%

      const propertyId = isNew ? 'temp' : id
      const uploadPromises = compressedFiles.map(file => uploadPropertyImage(file, propertyId))
      const urls = await Promise.all(uploadPromises)

      if (isMain) {
        // Adiciona a imagem principal como primeira imagem da galeria também
        const mainImageUrl = urls[0]
        const existingImages = property.images || []

        // Remove a imagem principal anterior da galeria se existir
        const filteredImages = existingImages.filter(img => img !== property.image)

        // Adiciona a nova imagem principal no início da galeria
        setProperty({
          ...property,
          image: mainImageUrl,
          images: [mainImageUrl, ...filteredImages]
        })
      } else {
        setProperty({
          ...property,
          images: [...(property.images || []), ...urls],
          image: property.image || urls[0]
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
      // Remove a imagem principal e também da galeria (primeira imagem)
      const galleryImages = property.images || []
      const filteredGallery = galleryImages.filter((img, idx) => idx !== 0)

      // Se houver imagens restantes, define a primeira como nova imagem principal
      const newMainImage = filteredGallery.length > 0 ? filteredGallery[0] : ''

      setProperty({
        ...property,
        image: newMainImage,
        images: filteredGallery
      })
    } else {
      const newImages = [...(property.images || [])]
      const removedImage = newImages[index]
      newImages.splice(index, 1)

      // Se a imagem removida era a imagem principal (primeira da galeria)
      if (index === 0 && property.image === removedImage) {
        // Define a próxima imagem como principal, ou vazio se não houver mais
        const newMainImage = newImages.length > 0 ? newImages[0] : ''
        setProperty({
          ...property,
          images: newImages,
          image: newMainImage
        })
      } else {
        setProperty({
          ...property,
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
    setProperty({ ...property, tag: newTags.join(', ') })
  }

  const addCustomTag = () => {
    const input = prompt('Enter custom tag:')
    if (input && input.trim() && !customTags.includes(input.trim())) {
      const newTags = [...customTags, input.trim()]
      setCustomTags(newTags)
      setProperty({ ...property, tag: newTags.join(', ') })
    }
  }

  const removeTag = (tag: string) => {
    const newTags = customTags.filter(t => t !== tag)
    setCustomTags(newTags)
    setProperty({ ...property, tag: newTags.join(', ') })
  }

  const addFeature = (feature?: string) => {
    const featureToAdd = feature || newFeature.trim()
    if (featureToAdd && !(property.features || []).includes(featureToAdd)) {
      setProperty({
        ...property,
        features: [...(property.features || []), featureToAdd]
      })
      setNewFeature('')
    }
  }

  const removeFeature = (index: number) => {
    const newFeatures = [...(property.features || [])]
    newFeatures.splice(index, 1)
    setProperty({ ...property, features: newFeatures })
  }

  const toggleFeature = (feature: string) => {
    const currentFeatures = property.features || []
    if (currentFeatures.includes(feature)) {
      setProperty({
        ...property,
        features: currentFeatures.filter(f => f !== feature)
      })
    } else {
      setProperty({
        ...property,
        features: [...currentFeatures, feature]
      })
    }
  }

  const addAmenity = (amenity?: string) => {
    const amenityToAdd = amenity || newAmenity.trim()
    if (amenityToAdd && !(property.amenities || []).includes(amenityToAdd)) {
      setProperty({
        ...property,
        amenities: [...(property.amenities || []), amenityToAdd]
      })
      setNewAmenity('')
    }
  }

  const removeAmenity = (index: number) => {
    const newAmenities = [...(property.amenities || [])]
    newAmenities.splice(index, 1)
    setProperty({ ...property, amenities: newAmenities })
  }

  const toggleAmenity = (amenity: string) => {
    const currentAmenities = property.amenities || []
    if (currentAmenities.includes(amenity)) {
      setProperty({
        ...property,
        amenities: currentAmenities.filter(a => a !== amenity)
      })
    } else {
      setProperty({
        ...property,
        amenities: [...currentAmenities, amenity]
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const finalProperty = {
        ...property,
        image: property.image || property.images?.[0] || '',
        tag: customTags.join(', '),
        // Garante que description e longDescription sejam iguais
        description: property.longDescription || property.description || '',
        longDescription: property.longDescription || property.description || '',
      }

      if (isNew) {
        await createProperty(finalProperty as Omit<Property, 'id' | 'createdAt' | 'updatedAt'>)
        toast.success('Propriedade criada com sucesso!', {
          description: 'A propriedade foi adicionada à sua coleção.',
          duration: 3000,
        })
      } else {
        await updateProperty(id, finalProperty)
        toast.success('Propriedade atualizada com sucesso!', {
          description: 'As alterações foram salvas.',
          duration: 3000,
        })
      }
      setTimeout(() => {
        router.push('/admin/properties')
      }, 1500)
    } catch (error) {
      console.error('Error saving property:', error)
      toast.error('Erro ao salvar propriedade', {
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
          <p className="text-black/60">Loading property...</p>
        </div>
      </div>
    )
  }

  const allImages = property.images || []
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
              {isNew ? 'Create Property' : 'Edit Property'}
            </h1>
            <p className="text-sm text-black/50 mt-1">
              {isNew ? 'Add a new property to your collection' : 'Update property information'}
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
                value={property.title}
                onChange={(e) => setProperty({ ...property, title: e.target.value })}
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
                value={property.location}
                onChange={(e) => setProperty({ ...property, location: e.target.value })}
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
                value={property.type}
                onChange={(e) => setProperty({ ...property, type: e.target.value })}
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
                <CurrencyEur className="w-4 h-4" />
                Price *
              </label>
              <input
                type="text"
                value={property.price ? formatPrice(property.price) : ''}
                onChange={handlePriceChange}
                className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-xl focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all"
                placeholder="€1.500.000"
                required
              />
              <p className="text-xs text-black/40 mt-1.5">Numbers only, formatting is automatic</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-black mb-2.5">
                <Bed className="w-4 h-4" />
                Beds *
              </label>
              <input
                type="number"
                value={property.beds}
                onChange={(e) => setProperty({ ...property, beds: e.target.value })}
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
                value={property.baths}
                onChange={(e) => setProperty({ ...property, baths: e.target.value })}
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
                value={property.area}
                onChange={(e) => setProperty({ ...property, area: e.target.value })}
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
                value={property.yearBuilt || ''}
                onChange={(e) => setProperty({ ...property, yearBuilt: e.target.value })}
              />
            </div>

            <div className="md:col-span-2 flex items-center gap-6 pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <Checkbox
                  checked={property.featured || false}
                  onCheckedChange={(checked) => setProperty({ ...property, featured: checked as boolean })}
                />
                <span className="text-sm font-medium text-black/80 group-hover:text-black transition-colors">
                  Featured Property
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <Checkbox
                  checked={property.showInPortfolio || false}
                  onCheckedChange={(checked) => setProperty({ ...property, showInPortfolio: checked as boolean })}
                />
                <span className="text-sm font-medium text-black/80 group-hover:text-black transition-colors">
                  Show in Portfolio
                </span>
              </label>
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${customTags.includes(tag)
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
              {property.image && (
                <div className="relative w-40 h-40 rounded-xl overflow-hidden bg-gray-100 border-2 border-black/10 shadow-sm group">
                  <img src={property.image} alt="Main" className="w-full h-full object-cover" />
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
                  {uploading === 'main' ? 'Uploading...' : property.image ? 'Change Main Image' : 'Upload Main Image'}
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
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={allImages}
                  strategy={rectSortingStrategy}
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {allImages.map((img, index) => {
                      const isMainImage = index === 0 && img === property.image
                      return (
                        <SortableItem key={img} id={img}>
                          <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border-2 border-black/10 shadow-sm group">
                            <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                            {isMainImage && (
                              <div className="absolute top-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                                <Star className="w-3 h-3" weight="fill" />
                                Main
                              </div>
                            )}
                            <button
                              type="button"
                              onPointerDown={(e) => e.stopPropagation()}
                              onClick={(e) => {
                                e.stopPropagation()
                                removeImage(index)
                              }}
                              className="absolute top-2 right-2 bg-black/80 text-white rounded-full p-1.5 hover:bg-black transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                              {index + 1}
                            </div>
                          </div>
                        </SortableItem>
                      )
                    })}
                  </div>
                </SortableContext>
              </DndContext>
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
              value={property.longDescription || property.description || ''}
              onChange={(e) => {
                const value = e.target.value
                setProperty({
                  ...property,
                  description: value,
                  longDescription: value
                })
              }}
              rows={10}
              className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-xl focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all resize-none"
              placeholder="Enter a detailed description of the property..."
            />
            <p className="text-xs text-black/40 mt-2">This description will appear in listings and property detail pages</p>
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
            {/* Preset Features Tags */}
            <div>
              <p className="text-sm font-medium text-black/60 mb-3">Quick Select:</p>
              <div className="flex flex-wrap gap-2">
                {PRESET_FEATURES.map((feature) => {
                  const isSelected = (property.features || []).includes(feature)
                  return (
                    <button
                      key={feature}
                      type="button"
                      onClick={() => toggleFeature(feature)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${isSelected
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

            {/* Selected Features */}
            {(property.features || []).length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-black/60">Selected Features:</p>
                {(property.features || []).map((feature, index) => (
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

            {/* Custom Feature Input */}
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
            {/* Preset Amenities Tags */}
            <div>
              <p className="text-sm font-medium text-black/60 mb-3">Quick Select:</p>
              <div className="flex flex-wrap gap-2">
                {PRESET_AMENITIES.map((amenity) => {
                  const isSelected = (property.amenities || []).includes(amenity)
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${isSelected
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

            {/* Selected Amenities */}
            {(property.amenities || []).length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-black/60">Selected Amenities:</p>
                {(property.amenities || []).map((amenity, index) => (
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

            {/* Custom Amenity Input */}
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

        {/* Section 7: Featured */}
        <div className="bg-white rounded-2xl border border-black/10 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center">
              <Star className="w-5 h-5 text-black" weight="duotone" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-black">Featured Property</h2>
              <p className="text-sm text-black/50">Show this property prominently</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setProperty({ ...property, featured: !property.featured })}
            className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${property.featured
              ? 'bg-black text-white border-black shadow-md'
              : 'bg-black/5 text-black border-black/10 hover:bg-black/10'
              }`}
          >
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${property.featured
              ? 'border-white bg-white'
              : 'border-black/30 bg-white'
              }`}>
              {property.featured && (
                <CheckCircle className="w-4 h-4 text-black" weight="fill" />
              )}
            </div>
            <span className="text-sm font-semibold">
              Mark as Featured Property
            </span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-6 border-t border-black/10">
          <Button
            type="submit"
            disabled={loading}
            className="bg-black text-white hover:bg-black/90 px-8 py-3 text-base font-semibold shadow-sm hover:shadow-md transition-all rounded-xl"
          >
            {loading ? 'Saving...' : isNew ? 'Create Property' : 'Save Changes'}
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
