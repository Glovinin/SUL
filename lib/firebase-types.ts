// Firebase Types
// Greencheck Investors Area
// ─────────────────────────────────────────────────────────────

import { Timestamp } from 'firebase/firestore'

// Investor status types
export type InvestorStatus = 
  | 'pending_nda'        // Cadastrado, precisa assinar NDA
  | 'pending_approval'   // NDA assinado, aguardando aprovação admin
  | 'approved'           // Aprovado pelo admin, acesso total
  | 'rejected'           // Rejeitado pelo admin

// Investor document structure in Firestore
export interface InvestorData {
  uid: string
  name: string
  company: string
  role: string
  email: string
  phone: string
  status: InvestorStatus
  createdAt: Timestamp
  lastLogin?: Timestamp
  
  // NDA fields (optional, filled after signing)
  ndaSignedAt?: Timestamp
  ndaSignedIp?: string
  ndaVersion?: string
  
  // Approval fields (optional, filled after admin action)
  approvedAt?: Timestamp
  approvedBy?: string  // Admin UID
  rejectedAt?: Timestamp
  rejectedBy?: string  // Admin UID
  rejectionReason?: string
}

// Admin document structure in Firestore
export interface AdminData {
  uid: string
  email: string
  name: string
  role: 'admin'
  createdAt: Timestamp
}

// NDA signature data
export interface NDASignature {
  investorUid: string
  investorName: string
  investorEmail: string
  signedAt: Timestamp
  ipAddress: string
  userAgent: string
  ndaVersion: string
}

