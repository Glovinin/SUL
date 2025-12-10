// Admin Dashboard Firebase Helpers
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from './firebase'
import { Property, BlogPost, Lead, HomepageSettings, PortfolioItem } from './admin-types'

// Collections
const PROPERTIES_COLLECTION = 'properties'
const BLOG_COLLECTION = 'blog'
const LEADS_COLLECTION = 'leads'
const ANALYTICS_COLLECTION = 'analytics'
const HOMEPAGE_COLLECTION = 'homepage'
const PORTFOLIO_COLLECTION = 'portfolio'

// ==================== PROPERTIES ====================

export async function getProperties(): Promise<Property[]> {
  if (!db) throw new Error('Firestore not initialized')

  // Simplificado: Removemos orderBy para garantir que pegamos ALL docs
  // Docs legados sem o campo 'order' seriam filtrados pelo Firestore com orderBy('order')
  const q = query(
    collection(db, PROPERTIES_COLLECTION),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)

  const properties = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate(),
  })) as Property[]

  // Sort in memory: items with 'order' first, then sorted by 'order' val
  // Items without 'order' will effectively come last (or first, depending on logic)
  // Here we put items with explicit order at the top, sorted ASC
  return properties.sort((a, b) => {
    // If both have order, simple numeric sort
    if (typeof a.order === 'number' && typeof b.order === 'number') {
      return a.order - b.order
    }
    // If a has order and b doesn't, a comes first
    if (typeof a.order === 'number') return -1
    // If b has order and a doesn't, b comes first
    if (typeof b.order === 'number') return 1

    // If neither has order, keep 'createdAt' desc (preserved from query usually, but safe to re-assert)
    // Note: JS sort is not guaranteed stable in all legacy browsers but modern ones are fine.
    // However, since we queried by createdAt desc, we trust the fallback order or re-sort by date if crucial.
    return 0
  })
}
// Public getter that includes Portfolio items marked as 'showInProperties'
export async function getPublicProperties(): Promise<Property[]> {
  const [properties, portfolioItems] = await Promise.all([
    getProperties(),
    getPortfolioItems()
  ])

  // Filter portfolio items that should be shown in properties
  const crossItems = portfolioItems.filter(item => item.showInProperties === true).map(item => ({
    id: item.id, // Keep ID (might link to property page which will fail if not handled, but for listing it works)
    // Ideally we might want a way to link back to portfolio, but for now we map it as a Property
    title: item.title,
    location: item.location,
    type: item.type,
    price: item.price,
    beds: item.beds,
    baths: item.baths,
    area: item.area,
    tag: item.tag,
    image: item.image,
    images: item.images,
    description: item.description,
    longDescription: item.longDescription,
    features: item.features,
    amenities: item.amenities,
    yearBuilt: item.yearBuilt,
    featured: item.featured,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    order: item.order,
    // Add specific flag if we want to trace source later, though Property type doesn't have it yet
  } as Property))

  const allItems = [...properties, ...crossItems]

  // Sort by order/date logic same as default
  return allItems.sort((a, b) => {
    if (typeof a.order === 'number' && typeof b.order === 'number') return a.order - b.order
    if (typeof a.order === 'number') return -1
    if (typeof b.order === 'number') return 1
    // Fallback to createdAt desc
    const dateA = a.createdAt ? a.createdAt.getTime() : 0
    const dateB = b.createdAt ? b.createdAt.getTime() : 0
    return dateB - dateA
  })
}
export async function getProperty(id: string): Promise<Property | null> {
  if (!db) throw new Error('Firestore not initialized')

  const docRef = doc(db, PROPERTIES_COLLECTION, id)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) return null

  return {
    id: docSnap.id,
    ...docSnap.data(),
    createdAt: docSnap.data().createdAt?.toDate(),
    updatedAt: docSnap.data().updatedAt?.toDate(),
  } as Property
}

export async function createProperty(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  if (!db) throw new Error('Firestore not initialized')

  const docRef = await addDoc(collection(db, PROPERTIES_COLLECTION), {
    ...property,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return docRef.id
}

export async function updateProperty(id: string, property: Partial<Property>): Promise<void> {
  if (!db) throw new Error('Firestore not initialized')

  const docRef = doc(db, PROPERTIES_COLLECTION, id)
  await updateDoc(docRef, {
    ...property,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteProperty(id: string): Promise<void> {
  if (!db) throw new Error('Firestore not initialized')

  const docRef = doc(db, PROPERTIES_COLLECTION, id)
  await deleteDoc(docRef)
}

export async function updatePropertyOrder(items: { id: string, order: number }[]): Promise<void> {
  if (!db) throw new Error('Firestore not initialized')

  const batch = (await import('firebase/firestore')).writeBatch(db)

  items.forEach(item => {
    const docRef = doc(db, PROPERTIES_COLLECTION, item.id)
    batch.update(docRef, { order: item.order })
  })

  await batch.commit()
}

// Upload property image
export async function uploadPropertyImage(file: File, propertyId: string): Promise<string> {
  if (!storage) throw new Error('Storage not initialized')

  const storageRef = ref(storage, `properties/${propertyId}/${Date.now()}_${file.name}`)
  await uploadBytes(storageRef, file)
  return await getDownloadURL(storageRef)
}

// ==================== BLOG ====================

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!db) throw new Error('Firestore not initialized')

  const q = query(collection(db, BLOG_COLLECTION), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate(),
  })) as BlogPost[]
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  if (!db) throw new Error('Firestore not initialized')

  // Get all posts and filter/order in memory to avoid index issues
  const q = query(collection(db, BLOG_COLLECTION), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)

  const posts = snapshot.docs
    .map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as BlogPost[]

  // Filter only published posts and maintain order
  return posts.filter(post => post.published === true)
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  if (!db) throw new Error('Firestore not initialized')

  const docRef = doc(db, BLOG_COLLECTION, id)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) return null

  return {
    id: docSnap.id,
    ...docSnap.data(),
    createdAt: docSnap.data().createdAt?.toDate(),
    updatedAt: docSnap.data().updatedAt?.toDate(),
  } as BlogPost
}

export async function createBlogPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  if (!db) throw new Error('Firestore not initialized')

  const docRef = await addDoc(collection(db, BLOG_COLLECTION), {
    ...post,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return docRef.id
}

export async function updateBlogPost(id: string, post: Partial<BlogPost>): Promise<void> {
  if (!db) throw new Error('Firestore not initialized')

  const docRef = doc(db, BLOG_COLLECTION, id)
  await updateDoc(docRef, {
    ...post,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteBlogPost(id: string): Promise<void> {
  if (!db) throw new Error('Firestore not initialized')

  const docRef = doc(db, BLOG_COLLECTION, id)
  await deleteDoc(docRef)
}

// Upload blog image
export async function uploadBlogImage(file: File, postId: string): Promise<string> {
  if (!storage) throw new Error('Storage not initialized')

  const storageRef = ref(storage, `blog/${postId}/${Date.now()}_${file.name}`)
  await uploadBytes(storageRef, file)
  return await getDownloadURL(storageRef)
}

// ==================== LEADS ====================

export async function getLeads(): Promise<Lead[]> {
  if (!db) throw new Error('Firestore not initialized')

  const q = query(collection(db, LEADS_COLLECTION), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
  })) as Lead[]
}

export async function createLead(lead: Omit<Lead, 'id' | 'createdAt'>): Promise<string> {
  if (!db) throw new Error('Firestore not initialized')

  const docRef = await addDoc(collection(db, LEADS_COLLECTION), {
    ...lead,
    createdAt: serverTimestamp(),
  })

  return docRef.id
}

export async function updateLeadStatus(id: string, status: Lead['status']): Promise<void> {
  if (!db) throw new Error('Firestore not initialized')

  const docRef = doc(db, LEADS_COLLECTION, id)
  await updateDoc(docRef, { status })
}

// ==================== ANALYTICS ====================

export async function getAnalytics(period: 'day' | 'week' | 'month' = 'month'): Promise<any> {
  if (!db) throw new Error('Firestore not initialized')

  // This is a simplified version - you'd want to implement proper analytics tracking
  const leads = await getLeads()
  const properties = await getProperties()
  const blogPosts = await getBlogPosts()

  return {
    totalVisits: 0, // Implement with analytics service
    uniqueVisitors: 0,
    pageViews: 0,
    leads: leads.length,
    propertiesViews: 0,
    blogViews: 0,
    period,
    totalProperties: properties.length,
    totalBlogPosts: blogPosts.length,
    newLeads: leads.filter(l => l.status === 'new').length,
  }
}

// ==================== HOMEPAGE ====================

export async function getHomepageSettings(): Promise<HomepageSettings | null> {
  if (!db) throw new Error('Firestore not initialized')

  const q = query(collection(db, HOMEPAGE_COLLECTION), limit(1))
  const snapshot = await getDocs(q)

  if (snapshot.empty) return null

  const doc = snapshot.docs[0]
  return {
    id: doc.id,
    ...doc.data(),
    updatedAt: doc.data().updatedAt?.toDate(),
  } as HomepageSettings
}

export async function updateHomepageSettings(settings: Partial<HomepageSettings>): Promise<void> {
  if (!db) throw new Error('Firestore not initialized')

  const existing = await getHomepageSettings()

  if (existing && existing.id) {
    const docRef = doc(db, HOMEPAGE_COLLECTION, existing.id)
    await updateDoc(docRef, {
      ...settings,
      updatedAt: serverTimestamp(),
    })
  } else {
    await addDoc(collection(db, HOMEPAGE_COLLECTION), {
      ...settings,
      updatedAt: serverTimestamp(),
    })
  }
}

// Upload homepage video
export async function uploadHomepageVideo(file: File): Promise<string> {
  if (!storage) throw new Error('Storage not initialized')

  const storageRef = ref(storage, `homepage/video_${Date.now()}_${file.name}`)
  await uploadBytes(storageRef, file)
  return await getDownloadURL(storageRef)
}

// Upload homepage image
export async function uploadHomepageImage(file: File, imageType: 'aboutUs' | 'heroPoster'): Promise<string> {
  if (!storage) throw new Error('Storage not initialized')

  const storageRef = ref(storage, `homepage/${imageType}_${Date.now()}_${file.name}`)
  await uploadBytes(storageRef, file)
  return await getDownloadURL(storageRef)
}

// ==================== PORTFOLIO ====================

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  if (!db) throw new Error('Firestore not initialized')

  // Simplificado: Removemos orderBy para garantir que pegamos ALL docs
  const q = query(
    collection(db, PORTFOLIO_COLLECTION),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)

  const items = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate(),
  })) as PortfolioItem[]

  // Sort in memory
  return items.sort((a, b) => {
    if (typeof a.order === 'number' && typeof b.order === 'number') {
      return a.order - b.order
    }
    if (typeof a.order === 'number') return -1
    if (typeof b.order === 'number') return 1
    return 0
  })
}

export async function getPortfolioItem(id: string): Promise<PortfolioItem | null> {
  if (!db) throw new Error('Firestore not initialized')

  const docRef = doc(db, PORTFOLIO_COLLECTION, id)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) return null

  return {
    id: docSnap.id,
    ...docSnap.data(),
    createdAt: docSnap.data().createdAt?.toDate(),
    updatedAt: docSnap.data().updatedAt?.toDate(),
  } as PortfolioItem
}

export async function createPortfolioItem(portfolioItem: Omit<PortfolioItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  if (!db) throw new Error('Firestore not initialized')

  const docRef = await addDoc(collection(db, PORTFOLIO_COLLECTION), {
    ...portfolioItem,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return docRef.id
}

export async function updatePortfolioItem(id: string, portfolioItem: Partial<PortfolioItem>): Promise<void> {
  if (!db) throw new Error('Firestore not initialized')

  const docRef = doc(db, PORTFOLIO_COLLECTION, id)
  await updateDoc(docRef, {
    ...portfolioItem,
    updatedAt: serverTimestamp(),
  })
}

export async function deletePortfolioItem(id: string): Promise<void> {
  if (!db) throw new Error('Firestore not initialized')

  const docRef = doc(db, PORTFOLIO_COLLECTION, id)
  await deleteDoc(docRef)
}

export async function updatePortfolioItemOrder(items: { id: string, order: number }[]): Promise<void> {
  if (!db) throw new Error('Firestore not initialized')

  const batch = (await import('firebase/firestore')).writeBatch(db)

  items.forEach(item => {
    const docRef = doc(db, PORTFOLIO_COLLECTION, item.id)
    batch.update(docRef, { order: item.order })
  })

  await batch.commit()
}

// Public getter that includes Properties marked as 'showInPortfolio'
export async function getPublicPortfolioItems(): Promise<PortfolioItem[]> {
  const [portfolioItems, properties] = await Promise.all([
    getPortfolioItems(),
    getProperties()
  ])

  // Filter properties that should be shown in portfolio
  const crossItems = properties.filter(prop => prop.showInPortfolio === true).map(prop => ({
    id: prop.id,
    title: prop.title,
    location: prop.location,
    type: prop.type,
    price: prop.price,
    beds: prop.beds,
    baths: prop.baths,
    area: prop.area,
    tag: prop.tag,
    image: prop.image,
    images: prop.images,
    description: prop.description,
    longDescription: prop.longDescription,
    features: prop.features,
    amenities: prop.amenities,
    yearBuilt: prop.yearBuilt,
    featured: prop.featured,
    createdAt: prop.createdAt,
    updatedAt: prop.updatedAt,
    order: prop.order,
    soldDate: '', // Property doesn't have soldDate usually
  } as PortfolioItem))

  const allItems = [...portfolioItems, ...crossItems]

  return allItems.sort((a, b) => {
    if (typeof a.order === 'number' && typeof b.order === 'number') return a.order - b.order
    if (typeof a.order === 'number') return -1
    if (typeof b.order === 'number') return 1
    const dateA = a.createdAt ? a.createdAt.getTime() : 0
    const dateB = b.createdAt ? b.createdAt.getTime() : 0
    return dateB - dateA
  })
}

// Upload portfolio image
export async function uploadPortfolioImage(file: File, portfolioId: string): Promise<string> {
  if (!storage) throw new Error('Storage not initialized')

  const storageRef = ref(storage, `portfolio/${portfolioId}/${Date.now()}_${file.name}`)
  await uploadBytes(storageRef, file)
  return await getDownloadURL(storageRef)
}


