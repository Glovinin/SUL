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
import { Property, BlogPost, Lead } from './admin-types'

// Collections
const PROPERTIES_COLLECTION = 'properties'
const BLOG_COLLECTION = 'blog'
const LEADS_COLLECTION = 'leads'
const ANALYTICS_COLLECTION = 'analytics'

// ==================== PROPERTIES ====================

export async function getProperties(): Promise<Property[]> {
  if (!db) throw new Error('Firestore not initialized')
  
  const q = query(collection(db, PROPERTIES_COLLECTION), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate(),
  })) as Property[]
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


