import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Validação básica
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'propertyType', 'maxPrice', 'minArea']
    const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '')

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          missingFields 
        },
        { status: 400 }
      )
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Aqui você pode adicionar lógica para:
    // 1. Salvar no Firebase/Firestore
    // 2. Enviar email de notificação
    // 3. Integrar com sistema de CRM
    // 4. Etc.

    // Por enquanto, apenas retornamos sucesso
    // Você pode expandir isso para salvar no Firebase ou enviar email
    
    // Exemplo de estrutura de dados que seria salva:
    const propertySearchData = {
      location: formData.location || '',
      propertyType: formData.propertyType,
      maxPrice: formData.maxPrice,
      minArea: formData.minArea,
      rooms: formData.rooms || '1',
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message || '',
      receiveCommunications: formData.receiveCommunications || false,
      submittedAt: new Date().toISOString(),
      status: 'new'
    }

    // TODO: Salvar no Firebase/Firestore
    // TODO: Enviar email de notificação para a equipe
    // TODO: Enviar email de confirmação para o cliente

    return NextResponse.json({ 
      success: true,
      message: 'Property search request submitted successfully'
    }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Failed to process request',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

