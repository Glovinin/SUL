// Client-side functions to fetch properties from Firebase
"use client"

import { useEffect, useState } from 'react'
import { getProperties, getHomepageSettings, getPortfolioItems, getPortfolioItem, getPublishedBlogPosts, getBlogPost, getPublicProperties, getPublicPortfolioItems } from './admin-helpers'
import { Property as AdminProperty, HomepageSettings, PortfolioItem as AdminPortfolioItem, BlogPost as AdminBlogPost } from './admin-types'

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
        const data = await getPublicProperties()
        const converted = data.map(convertToDisplayProperty)
        setProperties(converted)
      } catch (err: any) {
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

  // Return the first 9 properties, respecting the admin order
  // (filtering for featured only if that was the original intent, but the variable says 'featuredProperties')
  // The original code merged featured + nonFeatured. This means it showed ALL properties but prioritized featured.
  // If we want to respect MANUAL order, we should just take the properties as they are returned (sorted by order).
  // However, if the section is TITLED "Exclusive collection of Properties" (generic), maybe it just wants the top items.

  // If the user wants to prioritize featured items, they should drag them to the top.
  const limitedProperties = properties.slice(0, 9)

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

// Convert admin portfolio item to display format
function convertToDisplayPortfolioItem(item: AdminPortfolioItem): any {
  const gallery = item.images && item.images.length > 0
    ? item.images
    : item.image
      ? [item.image]
      : ['/images/placeholder.jpg']

  return {
    id: item.id || '',
    title: item.title,
    location: item.location,
    price: item.price,
    beds: item.beds || '0',
    baths: item.baths || '0',
    sqft: item.area || '0',
    image: item.image || gallery[0] || '/images/placeholder.jpg',
    gallery: gallery,
    tag: item.tag || 'Sold',
    type: item.type || 'Property',
    featured: item.featured || false,
    status: 'Sold',
    description: item.longDescription || item.description || '',
    longDescription: item.longDescription || item.description || '',
    features: item.features || [],
    amenities: item.amenities || [],
    yearBuilt: item.yearBuilt || new Date().getFullYear().toString(),
    soldDate: item.soldDate || '',
    highlights: [],
  }
}

export function usePortfolio() {
  const [portfolioItems, setPortfolioItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPortfolio() {
      try {
        setLoading(true)
        const data = await getPublicPortfolioItems()
        const converted = data.map(convertToDisplayPortfolioItem)
        setPortfolioItems(converted)
      } catch (err: any) {
        setError(err.message || 'Failed to load portfolio')
        setPortfolioItems([])
      } finally {
        setLoading(false)
      }
    }

    loadPortfolio()
  }, [])

  return { portfolioItems, loading, error }
}

export function usePortfolioItem(id: string | null) {
  const [portfolioItem, setPortfolioItem] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    async function loadPortfolioItem() {
      try {
        setLoading(true)
        const data = await getPortfolioItem(id)
        if (data) {
          setPortfolioItem(convertToDisplayPortfolioItem(data))
        } else {
          setPortfolioItem(null)
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load portfolio item')
        setPortfolioItem(null)
      } finally {
        setLoading(false)
      }
    }

    loadPortfolioItem()
  }, [id])

  return { portfolioItem, loading, error }
}

// ==================== BLOG ====================

export function useBlogPosts() {
  const [blogPosts, setBlogPosts] = useState<AdminBlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadBlogPosts() {
      try {
        setLoading(true)
        const data = await getPublishedBlogPosts()
        setBlogPosts(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load blog posts')
        setBlogPosts([])
      } finally {
        setLoading(false)
      }
    }

    loadBlogPosts()
  }, [])

  return { blogPosts, loading, error }
}

export function useBlogPost(id: string | null) {
  const [blogPost, setBlogPost] = useState<AdminBlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    async function loadBlogPost() {
      try {
        setLoading(true)
        const data = await getBlogPost(id)
        if (data && data.published) {
          setBlogPost(data)
        } else {
          setBlogPost(null)
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load blog post')
        setBlogPost(null)
      } finally {
        setLoading(false)
      }
    }

    loadBlogPost()
  }, [id])

  return { blogPost, loading, error }
}

