import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-server'
import { doc, deleteDoc, collection, getDocs, query } from 'firebase/firestore'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function DELETE(request: NextRequest) {
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

    // Deletar todas as mensagens da subcollection
    const messagesRef = collection(adminDb, 'conversations', conversationId, 'messages')
    const messagesSnapshot = await getDocs(query(messagesRef))
    
    const deletePromises = messagesSnapshot.docs.map(messageDoc => 
      deleteDoc(doc(adminDb, 'conversations', conversationId, 'messages', messageDoc.id))
    )
    
    await Promise.all(deletePromises)

    // Deletar o documento da conversa
    const conversationRef = doc(adminDb, 'conversations', conversationId)
    await deleteDoc(conversationRef)

    return NextResponse.json({ 
      success: true
    }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Failed to delete conversation',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

