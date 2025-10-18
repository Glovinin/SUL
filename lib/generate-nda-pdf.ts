import jsPDF from 'jspdf'

interface SignatoryData {
  fullName: string
  nationality: string
  maritalStatus: string
  address: string
  documentType: string
  documentNumber: string
  taxId: string
  phone: string
  signatureDate: string
  signatureImage: string
  documentVersion: string
  companyName: string
  companyRole: string
  email: string
}

export async function generateNDAPDF(signatoryData: SignatoryData): Promise<Blob> {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  let yPos = 20
  const margin = 20
  const pageWidth = pdf.internal.pageSize.getWidth()
  const contentWidth = pageWidth - (margin * 2)

  // Logo
  try {
    // Converter logo para base64
    const logoBase64 = await fetch('/images/ESGVeritas logo.jpg')
      .then(res => res.blob())
      .then(blob => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        })
      })
    
    // Adicionar logo ESGVeritas (aumentado para 60x22.5mm)
    const logoWidth = 60
    const logoHeight = 22.5
    const logoX = (pageWidth - logoWidth) / 2
    pdf.addImage(logoBase64, 'JPEG', logoX, yPos, logoWidth, logoHeight)
    yPos += logoHeight + 10
  } catch (error) {
    console.error('Error adding logo:', error)
    yPos += 5
  }

  // Header
  pdf.setFontSize(18)
  pdf.setFont('helvetica', 'bold')
  pdf.text('NON-DISCLOSURE AGREEMENT (NDA)', pageWidth / 2, yPos, { align: 'center' })
  
  yPos += 8
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'normal')
  pdf.text('GREENCHECK™ PROJECT – ESG VERITAS SOLUTIONS, LDA', pageWidth / 2, yPos, { align: 'center' })
  
  yPos += 15

  // Section 1: PARTIES
  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'bold')
  pdf.text('1) PARTIES', margin, yPos)
  yPos += 8

  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  pdf.text('1.1. Company (Disclosing Party)', margin, yPos)
  yPos += 5

  pdf.setFont('helvetica', 'normal')
  const companyText = 'ESG Veritas Solutions, Lda, a limited liability company, NIPC 518935159, with registered office at Rua do Salvador, n.º 20, 1 A, 1100-466 Lisboa, Freguesia de São Vicente, Concelho de Lisboa, Distrito de Lisboa, represented by its manager Diego Mendes da Rocha, NIF 332801055, hereinafter "Company".'
  const companySplitText = pdf.splitTextToSize(companyText, contentWidth)
  pdf.text(companySplitText, margin, yPos)
  yPos += companySplitText.length * 5 + 5

  pdf.setFont('helvetica', 'bold')
  pdf.text('1.2. Signatory (Receiving Party)', margin, yPos)
  yPos += 5

  pdf.setFont('helvetica', 'normal')
  const signatoryText = `${signatoryData.fullName}, ${signatoryData.nationality}, ${signatoryData.maritalStatus}, residing at ${signatoryData.address}, holder of ${signatoryData.documentType} ${signatoryData.documentNumber}, Tax ID ${signatoryData.taxId}, email ${signatoryData.email}, phone ${signatoryData.phone}, representing ${signatoryData.companyName} as ${signatoryData.companyRole}, hereinafter "Signatory".`
  const signatorySplitText = pdf.splitTextToSize(signatoryText, contentWidth)
  pdf.text(signatorySplitText, margin, yPos)
  yPos += signatorySplitText.length * 5 + 8

  // Add new page if needed
  if (yPos > 250) {
    pdf.addPage()
    yPos = 20
  }

  // Brief summary of key sections
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.text('KEY PROVISIONS:', margin, yPos)
  yPos += 7

  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'normal')
  
  const provisions = [
    '• Purpose: Protection of Confidential Information within the GreenCheck® Project',
    '• Confidentiality: Non-disclosure obligation with limited exceptions',
    '• IP Assignment: All IP created belongs exclusively to Company',
    '• Non-Competition: 2-year restriction in EU and Brazil',
    '• Term: 5 years with indefinite protection for trade secrets',
    '• Digital Signature: Full legal validity under MP 2.200-2/2001 (BR) and eIDAS (EU)',
    '• Arbitration: Disputes resolved in Lisbon under Portuguese law'
  ]

  provisions.forEach(provision => {
    const splitProvision = pdf.splitTextToSize(provision, contentWidth)
    pdf.text(splitProvision, margin, yPos)
    yPos += splitProvision.length * 4.5
  })

  yPos += 10

  // Add new page for signature
  if (yPos > 200) {
    pdf.addPage()
    yPos = 20
  }

  // Signature Section
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.text('SIGNATURES', margin, yPos)
  yPos += 10

  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'normal')
  
  // Company Signature
  pdf.text('Company:', margin, yPos)
  yPos += 5
  pdf.text('ESG Veritas Solutions, Lda', margin, yPos)
  yPos += 5
  pdf.text('Diego Mendes da Rocha - Manager', margin, yPos)
  yPos += 15

  // Signatory Signature
  pdf.text('Signatory:', margin, yPos)
  yPos += 5
  pdf.text(signatoryData.fullName, margin, yPos)
  yPos += 5
  
  // Add signature image if available
  if (signatoryData.signatureImage) {
    try {
      pdf.addImage(signatoryData.signatureImage, 'PNG', margin, yPos, 60, 20)
      yPos += 25
    } catch (error) {
      console.error('Error adding signature image:', error)
      yPos += 10
    }
  }

  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'italic')
  pdf.text(`Signed digitally on ${new Date(signatoryData.signatureDate).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}`, margin, yPos)
  yPos += 5
  pdf.text(`Document: ${signatoryData.documentVersion}`, margin, yPos)
  
  // Footer on all pages
  const totalPages = pdf.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i)
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(150, 150, 150)
    pdf.text(
      `Page ${i} of ${totalPages} - NDA GreenCheck® - ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      pdf.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    )
  }

  return pdf.output('blob')
}

