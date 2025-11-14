"use client"

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Upload, X } from '@phosphor-icons/react'
import { Button } from '../../../../components/ui/button'
import {
  getProperty,
  createProperty,
  updateProperty,
  uploadPropertyImage,
} from '../../../../lib/admin-helpers'
import { Property } from '../../../../lib/admin-types'

export default function PropertyEditPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const isNew = id === 'new'

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
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
    description: '',
    featured: false,
  })

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
        setProperty(data)
      }
    } catch (error) {
      console.error('Error loading property:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const propertyId = isNew ? 'temp' : id
      const url = await uploadPropertyImage(file, propertyId)
      setProperty({ ...property, image: url })
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isNew) {
        await createProperty(property as Omit<Property, 'id' | 'createdAt' | 'updatedAt'>)
      } else {
        await updateProperty(id, property)
      }
      router.push('/admin/properties')
    } catch (error) {
      console.error('Error saving property:', error)
      alert('Failed to save property')
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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          onClick={() => router.back()}
          className="bg-black/5 text-black hover:bg-black/10"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-semibold text-black">
            {isNew ? 'Create Property' : 'Edit Property'}
          </h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-black/10 p-8 space-y-8 shadow-sm">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-black mb-3">Property Image</label>
          <div className="flex items-center gap-4">
            {property.image && (
              <div className="relative w-40 h-40 rounded-xl overflow-hidden bg-gray-100 border border-black/10 shadow-sm">
                <img src={property.image} alt="Property" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setProperty({ ...property, image: '' })}
                  className="absolute top-2 right-2 bg-black/80 text-white rounded-full p-1.5 hover:bg-black transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <label className="cursor-pointer">
              <div className="px-6 py-3 bg-black text-white hover:bg-black/90 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm hover:shadow-md">
                <Upload className="w-4 h-4" />
                {uploading ? 'Uploading...' : property.image ? 'Change Image' : 'Upload Image'}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-black mb-2.5">Title *</label>
            <input
              type="text"
              value={property.title}
              onChange={(e) => setProperty({ ...property, title: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-lg focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all"
              placeholder="Enter property title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2.5">Location *</label>
            <input
              type="text"
              value={property.location}
              onChange={(e) => setProperty({ ...property, location: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-lg focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all"
              placeholder="Lisbon, Cascais, etc."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2.5">Type *</label>
            <input
              type="text"
              value={property.type}
              onChange={(e) => setProperty({ ...property, type: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-lg focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all"
              placeholder="Apartment, Villa, etc."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2.5">Price *</label>
            <input
              type="text"
              value={property.price}
              onChange={(e) => setProperty({ ...property, price: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-lg focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all"
              placeholder="€1,500,000"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2.5">Beds *</label>
            <input
              type="text"
              value={property.beds}
              onChange={(e) => setProperty({ ...property, beds: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-lg focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all"
              placeholder="4"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2.5">Baths *</label>
            <input
              type="text"
              value={property.baths}
              onChange={(e) => setProperty({ ...property, baths: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-lg focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all"
              placeholder="3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2.5">Area *</label>
            <input
              type="text"
              value={property.area}
              onChange={(e) => setProperty({ ...property, area: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-lg focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all"
              placeholder="250 m²"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2.5">Tag</label>
            <input
              type="text"
              value={property.tag}
              onChange={(e) => setProperty({ ...property, tag: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-lg focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all"
              placeholder="Featured, New, Luxury, etc."
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2.5">Description</label>
          <textarea
            value={property.description || ''}
            onChange={(e) => setProperty({ ...property, description: e.target.value })}
            rows={8}
            className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-lg focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all resize-none"
            placeholder="Enter a detailed description of the property..."
          />
        </div>

        {/* Featured */}
        <div className="flex items-center gap-3 p-4 bg-black/5 rounded-lg border border-black/10">
          <input
            type="checkbox"
            id="featured"
            checked={property.featured || false}
            onChange={(e) => setProperty({ ...property, featured: e.target.checked })}
            className="w-5 h-5 rounded border-2 border-black/20 text-black focus:ring-2 focus:ring-black/20 cursor-pointer"
          />
          <label htmlFor="featured" className="text-sm font-semibold text-black cursor-pointer">
            Mark as Featured Property
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-6 border-t border-black/10">
          <Button
            type="submit"
            disabled={loading}
            className="bg-black text-white hover:bg-black/90 px-8 py-3 text-base font-semibold shadow-sm hover:shadow-md transition-all"
          >
            {loading ? 'Saving...' : isNew ? 'Create Property' : 'Save Changes'}
          </Button>
          <Button
            type="button"
            onClick={() => router.back()}
            className="bg-white border-2 border-black/10 text-black hover:bg-black/5 px-8 py-3 text-base font-semibold transition-all"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

