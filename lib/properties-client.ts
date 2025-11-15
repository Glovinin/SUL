// Client-side functions to fetch properties from Firebase
"use client"

import { useEffect, useState } from 'react'
import { getProperties, getHomepageSettings } from './admin-helpers'
import { Property as AdminProperty, HomepageSettings } from './admin-types'

// Convert admin property to display property format
function convertToDisplayProperty(prop: AdminProperty): any {
  // Create gallery array from images array or single image
  const gallery = prop.images && prop.images.length > 0 
    ? prop.images 
    : prop.image 
      ? [prop.image] 
      : ['/images/placeholder.jpg']

  return {
    id: prop.id || '',
    title: prop.title,
    location: prop.location,
    price: prop.price,
    beds: prop.beds || '0',
    baths: prop.baths || '0',
    sqft: prop.area || '0',
    image: prop.image || gallery[0] || '/images/placeholder.jpg',
    gallery: gallery,
    tag: prop.tag || 'Available',
    type: prop.type || 'Property',
    featured: prop.featured || false,
    status: 'Available', // Default status
    description: prop.longDescription || prop.description || '',
    longDescription: prop.longDescription || prop.description || '',
    features: prop.features || [],
    amenities: prop.amenities || [],
    yearBuilt: prop.yearBuilt || new Date().getFullYear().toString(),
    highlights: [],
  }
}

export function useProperties() {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProperties() {
      try {
        setLoading(true)
        const data = await getProperties()
        const converted = data.map(convertToDisplayProperty)
        setProperties(converted)
      } catch (err: any) {
        console.error('Error loading properties:', err)
        setError(err.message || 'Failed to load properties')
        // Fallback to empty array on error
        setProperties([])
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [])

  return { properties, loading, error }
}

export function useFeaturedProperties() {
  const { properties, loading, error } = useProperties()
  
  // Prioriza propriedades featured, depois as não-featured
  const featured = properties.filter(p => p.featured)
  const nonFeatured = properties.filter(p => !p.featured)
  
  // Combina: primeiro as featured, depois as não-featured
  const allProperties = [...featured, ...nonFeatured]
  
  // Limita a 9 propriedades para a homepage
  const limitedProperties = allProperties.slice(0, 9)
  
  return { 
    featuredProperties: limitedProperties,
    loading, 
    error 
  }
}

export function useHomepageSettings() {
  const [settings, setSettings] = useState<HomepageSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadSettings() {
      try {
        setLoading(true)
        const data = await getHomepageSettings()
        setSettings(data)
      } catch (err) {
        console.error('Error loading homepage settings:', err)
        setError('Failed to load homepage settings')
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [])

  return { settings, loading, error }
}

export function useProperty(id: string | null) {
  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    async function loadProperty() {
      try {
        setLoading(true)
        const { getProperty } = await import('./admin-helpers')
        const data = await getProperty(id)
        if (data) {
          setProperty(convertToDisplayProperty(data))
        } else {
          setProperty(null)
        }
      } catch (err: any) {
        console.error('Error loading property:', err)
        setError(err.message || 'Failed to load property')
        setProperty(null)
      } finally {
        setLoading(false)
      }
    }

    loadProperty()
  }, [id])

  return { property, loading, error }
}

