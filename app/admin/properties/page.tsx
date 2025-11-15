"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Trash, Eye } from '@phosphor-icons/react'
import { Button } from '../../../components/ui/button'
import { getProperties, deleteProperty } from '../../../lib/admin-helpers'
import { Property } from '../../../lib/admin-types'

export default function PropertiesPage() {
  const router = useRouter()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    try {
      setLoading(true)
      const data = await getProperties()
      setProperties(data)
    } catch (error) {
      console.error('Error loading properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return

    try {
      await deleteProperty(id)
      await loadProperties()
    } catch (error) {
      console.error('Error deleting property:', error)
      alert('Failed to delete property')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black/60">Loading properties...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-black mb-2">Properties</h1>
          <p className="text-black/60">Manage your property listings</p>
        </div>
        <Button
          onClick={() => router.push('/admin/properties/new')}
          className="bg-black text-white hover:bg-black/90 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Property
        </Button>
      </div>

      {/* Properties Grid */}
      {properties.length === 0 ? (
        <div className="bg-white rounded-xl border border-black/10 p-12 text-center">
          <p className="text-black/60 mb-4">No properties yet</p>
          <Button
            onClick={() => router.push('/admin/properties/new')}
            className="bg-black text-white hover:bg-black/90"
          >
            Create Your First Property
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl border border-black/10 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                {property.image ? (
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-black/20">
                    No Image
                  </div>
                )}
                {property.featured && (
                  <div className="absolute top-4 left-4 bg-black text-white text-xs px-2 py-1 rounded">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-black mb-1 line-clamp-1">{property.title}</h3>
                <p className="text-sm text-black/60 mb-3">{property.location}</p>
                <div className="flex items-center gap-4 text-sm text-black/60 mb-4">
                  <span>{property.beds} beds</span>
                  <span>{property.baths} baths</span>
                  <span>{property.area}</span>
                </div>
                <p className="text-lg font-semibold text-black mb-4">{property.price}</p>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => router.push(`/admin/properties/${property.id}`)}
                    className="flex-1 bg-black/5 text-black hover:bg-black/10"
                    size="sm"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(property.id!)}
                    className="bg-red-50 text-red-600 hover:bg-red-100"
                    size="sm"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


