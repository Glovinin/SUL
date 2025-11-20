import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-server'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET - Carregar configurações do admin
export async function GET(request: NextRequest) {
  try {
    if (!adminDb) {
      return NextResponse.json(
        { error: 'Firestore not initialized' },
        { status: 500 }
      )
    }

    const settingsRef = doc(adminDb, 'admin', 'chatSettings')
    const settingsSnap = await getDoc(settingsRef)

    if (!settingsSnap.exists()) {
      // Retornar valores padrão
      return NextResponse.json({
        success: true,
        settings: {
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&q=80',
          name: 'SUL ESTATE',
          title: 'Real Estate Consultant'
        }
      }, { status: 200 })
    }

    const data = settingsSnap.data()

    return NextResponse.json({
      success: true,
      settings: {
        avatar: data.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&q=80',
        name: data.name || 'SUL ESTATE',
        title: data.title || 'Real Estate Consultant'
      }
    }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Failed to load admin settings',
        details: error.message
      },
      { status: 500 }
    )
  }
}

// POST - Salvar configurações do admin
export async function POST(request: NextRequest) {
  try {
    const { avatar, name, title } = await request.json()

    if (!adminDb) {
      return NextResponse.json(
        { error: 'Firestore not initialized' },
        { status: 500 }
      )
    }

    const settingsRef = doc(adminDb, 'admin', 'chatSettings')
    await setDoc(settingsRef, {
      avatar: avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&q=80',
      name: name || 'SUL ESTATE',
      title: title || 'Real Estate Consultant',
      updatedAt: serverTimestamp()
    }, { merge: true })

    return NextResponse.json({
      success: true
    }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Failed to save admin settings',
        details: error.message
      },
      { status: 500 }
    )
  }
}

