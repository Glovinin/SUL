// Firebase Helper Functions
// Greencheck Investors Area
// ─────────────────────────────────────────────────────────────

import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  getDocs,
  Timestamp,
  serverTimestamp,
  type Firestore
} from 'firebase/firestore'
import { db } from './firebase'
import { InvestorData, AdminData, InvestorStatus } from './firebase-types'

// Collections
const INVESTORS_COLLECTION = 'investors'
const ADMINS_COLLECTION = 'admins'

// Helper to ensure db is initialized
function getDb(): Firestore {
  if (!db) {
    throw new Error('Firestore not initialized. Make sure Firebase is initialized on client-side.')
  }
  return db
}

// ─────────────────────────────────────────────────────────────
// INVESTOR FUNCTIONS
// ─────────────────────────────────────────────────────────────

/**
 * Create a new investor document in Firestore
 */
export async function createInvestor(data: {
  uid: string
  name: string
  company: string
  role: string
  email: string
  phone?: string
}): Promise<void> {
  const investorData: InvestorData = {
    ...data,
    phone: data.phone || '',
    status: 'pending_nda',
    createdAt: serverTimestamp() as Timestamp,
    lastLogin: serverTimestamp() as Timestamp
  }

  await setDoc(doc(getDb(), INVESTORS_COLLECTION, data.uid), investorData)
}

/**
 * Get investor data by UID
 */
export async function getInvestor(uid: string): Promise<InvestorData | null> {
  const docRef = doc(getDb(), INVESTORS_COLLECTION, uid)
  const docSnap = await getDoc(docRef)
  
  if (docSnap.exists()) {
    return docSnap.data() as InvestorData
  }
  return null
}

/**
 * Update investor's last login
 */
export async function updateLastLogin(uid: string): Promise<void> {
  const docRef = doc(getDb(), INVESTORS_COLLECTION, uid)
  await updateDoc(docRef, {
    lastLogin: serverTimestamp()
  })
}

/**
 * Update investor's phone number
 */
export async function updateInvestorPhone(uid: string, phone: string): Promise<void> {
  const docRef = doc(getDb(), INVESTORS_COLLECTION, uid)
  await updateDoc(docRef, {
    phone
  })
}

/**
 * Sign NDA - update investor status and NDA data
 */
export async function signNDA(
  uid: string, 
  ipAddress: string, 
  ndaVersion: string = 'v1.0',
  signatoryData?: {
    fullName: string
    nationality: string
    maritalStatus: string
    profession: string
    address: string
    documentType: string
    documentNumber: string
    taxId: string
    phone: string
    signatureDate: string
    signatureImage: string
    documentVersion: string
    companyName: string
    companyRole: string
    email: string
  }
): Promise<void> {
  const docRef = doc(getDb(), INVESTORS_COLLECTION, uid)
  
  let pdfUrl = ''
  
  // Se temos dados do signatário, gerar PDF
  if (signatoryData) {
    try {
      // Importar dinamicamente para evitar problemas no build
      const { generateNDAPDF } = await import('./generate-nda-pdf')
      const pdfBlob = await generateNDAPDF(signatoryData)
      
      // Upload para Firebase Storage
      const { getStorage, ref, uploadBytes, getDownloadURL } = await import('firebase/storage')
      const storage = getStorage()
      const pdfRef = ref(storage, `nda-pdfs/${uid}_${Date.now()}.pdf`)
      
      await uploadBytes(pdfRef, pdfBlob)
      pdfUrl = await getDownloadURL(pdfRef)
    } catch (error) {
      console.error('Error generating/uploading PDF:', error)
      // Continuar mesmo se o PDF falhar
    }
  }
  
  await updateDoc(docRef, {
    status: 'pending_approval',
    ndaSignedAt: serverTimestamp(),
    ndaSignedIp: ipAddress,
    ndaVersion,
    ...(pdfUrl && { ndaPdfUrl: pdfUrl }),
    ...(signatoryData && { 
      ndaSignatoryData: signatoryData,
      name: signatoryData.fullName, // Atualizar nome do investidor
      company: signatoryData.companyName, // Atualizar empresa
      role: signatoryData.companyRole, // Atualizar cargo
      phone: signatoryData.phone // Atualizar telefone
    })
  })
}

/**
 * Get all investors (admin only)
 */
export async function getAllInvestors(): Promise<InvestorData[]> {
  const q = query(collection(getDb(), INVESTORS_COLLECTION))
  const querySnapshot = await getDocs(q)
  
  return querySnapshot.docs.map(doc => doc.data() as InvestorData)
}

/**
 * Get investors by status (admin only)
 */
export async function getInvestorsByStatus(status: InvestorStatus): Promise<InvestorData[]> {
  const q = query(
    collection(getDb(), INVESTORS_COLLECTION),
    where('status', '==', status)
  )
  const querySnapshot = await getDocs(q)
  
  return querySnapshot.docs.map(doc => doc.data() as InvestorData)
}

/**
 * Approve investor (admin only)
 */
export async function approveInvestor(investorUid: string, adminUid: string): Promise<void> {
  const docRef = doc(getDb(), INVESTORS_COLLECTION, investorUid)
  await updateDoc(docRef, {
    status: 'approved',
    approvedAt: serverTimestamp(),
    approvedBy: adminUid
  })
}

/**
 * Reject investor (admin only)
 */
export async function rejectInvestor(
  investorUid: string, 
  adminUid: string, 
  reason?: string
): Promise<void> {
  const docRef = doc(getDb(), INVESTORS_COLLECTION, investorUid)
  await updateDoc(docRef, {
    status: 'rejected',
    rejectedAt: serverTimestamp(),
    rejectedBy: adminUid,
    ...(reason && { rejectionReason: reason })
  })
}

// ─────────────────────────────────────────────────────────────
// ADMIN FUNCTIONS
// ─────────────────────────────────────────────────────────────

/**
 * Check if user is admin
 */
export async function isAdmin(uid: string): Promise<boolean> {
  const docRef = doc(getDb(), ADMINS_COLLECTION, uid)
  const docSnap = await getDoc(docRef)
  
  return docSnap.exists() && docSnap.data()?.role === 'admin'
}

/**
 * Get admin data by UID
 */
export async function getAdmin(uid: string): Promise<AdminData | null> {
  const docRef = doc(getDb(), ADMINS_COLLECTION, uid)
  const docSnap = await getDoc(docRef)
  
  if (docSnap.exists()) {
    return docSnap.data() as AdminData
  }
  return null
}

// ─────────────────────────────────────────────────────────────
// UTILITY FUNCTIONS
// ─────────────────────────────────────────────────────────────

/**
 * Get user's IP address
 */
export async function getUserIP(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip
  } catch (error) {
    console.error('Error fetching IP:', error)
    return 'unknown'
  }
}

