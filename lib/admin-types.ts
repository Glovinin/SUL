// Admin Dashboard Types

export interface Property {
  id?: string
  order?: number
  title: string
  location: string
  type: string
  price: string
  beds: string
  baths: string
  area: string
  tag: string
  image: string
  images?: string[]
  description?: string
  longDescription?: string
  features?: string[]
  amenities?: string[]
  yearBuilt?: string
  featured?: boolean
  showInPortfolio?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface BlogPost {
  id?: string
  title: string
  subtitle: string
  image: string
  readTime: string
  date: string
  category: string
  author: {
    name: string
    role: string
  }
  excerpt: string
  content?: string
  published?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface Lead {
  id?: string
  name: string
  email: string
  phone?: string
  message?: string
  source: string // 'contact', 'chat', 'property', etc.
  propertyId?: string
  createdAt: Date
  status: 'new' | 'contacted' | 'qualified' | 'closed'
}

export interface Analytics {
  totalVisits: number
  uniqueVisitors: number
  pageViews: number
  leads: number
  propertiesViews: number
  blogViews: number
  period: 'day' | 'week' | 'month'
}

export interface HomepageSettings {
  id?: string
  heroVideo?: string
  heroVideoPoster?: string
  aboutUsImage?: string
  updatedAt?: Date
}

export interface PortfolioItem {
  id?: string
  order?: number
  title: string
  location: string
  type: string
  price: string
  beds: string
  baths: string
  area: string
  tag: string
  image: string
  images?: string[]
  description?: string
  longDescription?: string
  features?: string[]
  amenities?: string[]
  yearBuilt?: string
  soldDate?: string
  featured?: boolean
  showInProperties?: boolean
  createdAt?: Date
  updatedAt?: Date
}


