import { NextRequest, NextResponse } from 'next/server'
import { adminStorage } from '@/lib/firebase-server'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    if (!adminStorage) {
      return NextResponse.json(
        { error: 'Storage not initialized' },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      )
    }

    // Validar tamanho (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      )
    }

    // Upload para Firebase Storage
    const storageRef = ref(adminStorage, `admin/avatar_${Date.now()}_${file.name}`)
    
    await uploadBytes(storageRef, file, {
      contentType: file.type
    })

    const downloadURL = await getDownloadURL(storageRef)

    return NextResponse.json({
      success: true,
      url: downloadURL
    }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Failed to upload avatar',
        details: error.message
      },
      { status: 500 }
    )
  }
}

