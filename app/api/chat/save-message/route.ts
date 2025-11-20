import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-server'
import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { conversationId, message, sender, userName, userEmail } = await request.json()

    if (!message || !sender || !conversationId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!adminDb) {
      return NextResponse.json(
        { error: 'Firestore not initialized' },
        { status: 500 }
      )
    }

    // Salvar mensagem na conversa
    const messagesRef = collection(adminDb, 'conversations', conversationId, 'messages')
    const messageData = {
      text: message,
      sender: sender, // 'user' ou 'admin'
      timestamp: serverTimestamp(),
      read: false
    }

    const docRef = await addDoc(messagesRef, messageData)

    // Atualizar informações da conversa (última mensagem, timestamp)
    const conversationRef = doc(adminDb, 'conversations', conversationId)
    await setDoc(conversationRef, {
      lastMessage: message,
      lastMessageTime: serverTimestamp(),
      lastMessageSender: sender,
      updatedAt: serverTimestamp(),
      userName: userName || null,
      userEmail: userEmail || null,
    }, { merge: true })

    return NextResponse.json({ 
      success: true,
      messageId: docRef.id
    }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Failed to save message',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

