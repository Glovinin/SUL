import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-server'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get('conversationId')

    if (!conversationId) {
      return NextResponse.json(
        { error: 'conversationId is required' },
        { status: 400 }
      )
    }

    if (!adminDb) {
      return NextResponse.json(
        { error: 'Firestore not initialized' },
        { status: 500 }
      )
    }

    const messagesRef = collection(adminDb, 'conversations', conversationId, 'messages')
    const q = query(messagesRef, orderBy('timestamp', 'asc'), limit(200))
    const snapshot = await getDocs(q)

    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || null,
    }))

    return NextResponse.json({ 
      success: true,
      messages
    }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch messages',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

