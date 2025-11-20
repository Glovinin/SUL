import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-server'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { userName, userEmail } = await request.json()

    if (!userName || !userEmail) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    if (!adminDb) {
      return NextResponse.json(
        { error: 'Firestore not initialized' },
        { status: 500 }
      )
    }

    // Criar nova conversa
    const conversationsRef = collection(adminDb, 'conversations')
    const conversationData = {
      userName,
      userEmail,
      status: 'active', // 'active', 'closed', 'archived'
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastMessage: null,
      lastMessageTime: null,
      lastMessageSender: null,
      unreadCount: 0
    }

    const docRef = await addDoc(conversationsRef, conversationData)

    // Criar mensagem inicial de boas-vindas
    const welcomeMessage = {
      text: 'Hello! How can I help you with your real estate investment in Portugal today?',
      sender: 'ai',
      timestamp: serverTimestamp(),
      read: false
    }

    const messagesRef = collection(adminDb, 'conversations', docRef.id, 'messages')
    await addDoc(messagesRef, welcomeMessage)

    return NextResponse.json({ 
      success: true,
      conversationId: docRef.id
    }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Failed to create conversation',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

