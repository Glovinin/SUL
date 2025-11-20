import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-server'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET - Verificar se admin está online
export async function GET(request: NextRequest) {
  try {
    if (!adminDb) {
      return NextResponse.json(
        { error: 'Firestore not initialized' },
        { status: 500 }
      )
    }

    const statusRef = doc(adminDb, 'admin', 'status')
    const statusSnap = await getDoc(statusRef)

    if (!statusSnap.exists()) {
      return NextResponse.json({ 
        success: true,
        isOnline: false
      }, { status: 200 })
    }

    const data = statusSnap.data()
    const lastSeen = data.lastSeen?.toDate?.() || null
    
    // Considerar offline se não foi visto nos últimos 5 minutos
    const isOnline = lastSeen && (Date.now() - lastSeen.getTime()) < 5 * 60 * 1000

    return NextResponse.json({ 
      success: true,
      isOnline: isOnline || false,
      lastSeen: lastSeen?.toISOString() || null
    }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Failed to check admin status',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

// POST - Atualizar status do admin (online/offline)
export async function POST(request: NextRequest) {
  try {
    const { isOnline } = await request.json()

    if (!adminDb) {
      return NextResponse.json(
        { error: 'Firestore not initialized' },
        { status: 500 }
      )
    }

    const statusRef = doc(adminDb, 'admin', 'status')
    await setDoc(statusRef, {
      isOnline: isOnline === true,
      lastSeen: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true })

    return NextResponse.json({ 
      success: true
    }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Failed to update admin status',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

