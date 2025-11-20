import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-server'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    if (!adminDb) {
      return NextResponse.json(
        { error: 'Firestore not initialized' },
        { status: 500 }
      )
    }

    const conversationsRef = collection(adminDb, 'conversations')
    const q = query(conversationsRef, orderBy('updatedAt', 'desc'), limit(100))
    const snapshot = await getDocs(q)

    const conversations = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || null,
      lastMessageTime: doc.data().lastMessageTime?.toDate?.()?.toISOString() || null,
    }))

    return NextResponse.json({ 
      success: true,
      conversations
    }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch conversations',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

