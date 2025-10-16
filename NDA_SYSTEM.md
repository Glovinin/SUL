# 🔒 NDA Digital Signature System

## Overview

Sistema completo de assinatura digital de NDA (Non-Disclosure Agreement) para investidores do GreenCheck™ Project.

---

## 🎯 Fluxo do Investidor

### 1️⃣ Registro (Email + Senha)
- Investidor cria conta com:
  - Nome completo
  - Empresa
  - Cargo
  - Email corporativo
  - Senha segura
- Recebe email de verificação
- **Status**: `pending_nda`

### 2️⃣ Leitura do NDA (Inglês)
- Documento completo em inglês
- Scroll obrigatório até o final
- Checkbox de aceite
- **Botão**: "Accept & Continue"

### 3️⃣ Preenchimento de Dados Pessoais
Investidor preenche **TODOS** os dados exigidos:

```typescript
interface SignatoryData {
  fullName: string           // Nome completo legal
  nationality: string        // Nacionalidade
  maritalStatus: string      // Estado civil
  profession: string         // Profissão
  address: string           // Endereço completo
  documentType: string      // Tipo de documento (Passport/ID/DL)
  documentNumber: string    // Número do documento
  taxId: string            // NIF/CPF/SSN
}
```

**Validação**: Todos os campos obrigatórios.

### 4️⃣ Verificação Telefônica (SMS)
- Input de telefone internacional (+351, +1, etc.)
- Envio de código SMS via Firebase Auth
- reCAPTCHA invisível
- Input de código de 6 dígitos
- **Segurança**: Phone number salvo no Firestore

### 5️⃣ Assinatura Digital
- Resumo de todos os dados preenchidos
- Canvas para desenhar assinatura
- Botão "Clear Signature"
- Data e local: Lisbon, Portugal
- **Botão**: "Sign & Submit NDA"

### 6️⃣ Sucesso
- Animação de conclusão
- **Status**: `pending_approval`
- Redirecionamento automático para página de aprovação pendente

---

## 🔐 Dados Armazenados no Firestore

```typescript
{
  // Dados básicos (signup)
  uid: string
  name: string
  company: string
  role: string
  email: string
  phone: string // Preenchido na etapa 4
  status: 'pending_approval'
  
  // Dados do NDA (etapa 5)
  ndaSignedAt: Timestamp
  ndaSignedIp: string
  ndaVersion: 'v2.0-en'
  ndaSignatoryData: {
    fullName: string
    nationality: string
    maritalStatus: string
    profession: string
    address: string
    documentType: string
    documentNumber: string
    taxId: string
    phone: string
    signatureDate: string
    signatureImage: string // Base64 PNG
    documentVersion: 'NDA-ESG-Veritas-2025-EN-v2.0'
    companyName: string
    companyRole: string
    email: string
  }
  
  // Timestamps
  createdAt: Timestamp
  lastLogin: Timestamp
}
```

---

## 🛡️ Segurança Implementada

### 1. Autenticação
- Firebase Email/Password Authentication
- Email verification obrigatório
- Session persistence (Remember Me)

### 2. Verificação Telefônica
- Firebase Phone Auth + reCAPTCHA
- Formato internacional obrigatório
- Rate limiting automático

### 3. Assinatura Digital
- Canvas HTML5 para desenho
- Imagem salva em Base64
- IP address capturado via ipify.org
- Timestamp preciso (ISO 8601)

### 4. Conformidade Legal
- NDA redigido em inglês (idioma neutro)
- Cláusula de assinatura digital (MP 2.200-2/2001 BR + eIDAS EU)
- Arbitragem em Lisboa
- Versão do documento rastreada

---

## 🎨 Design (Apple-Inspired)

### Cores
- **Background**: `#044050` → `#033842` (gradient)
- **Primary Green**: `#5FA037`
- **Hover Green**: `#4d8c2d`
- **Text**: `#044050` (headings), `#6B7280` (body)

### Componentes
- Border radius: `32px` (containers), `16px` (inputs)
- Shadows: `0_20px_60px_-15px_rgba(0,0,0,0.3)`
- Animations: Framer Motion (duration: 0.5-0.8s)
- Progress steps: 5 dots (read, fill, phone, verify, sign)

### Ícones (Lucide React)
- 📄 FileText - Leitura
- 👤 User - Dados pessoais
- 📱 Phone - Verificação
- ✍️ PenTool - Assinatura
- ✅ CheckCircle2 - Sucesso

---

## 📱 Responsividade

### Mobile
- Canvas de assinatura touch-friendly
- `touchAction: 'none'` para evitar scroll
- Teclado numérico para código SMS
- Font-size ajustável

### Desktop
- Max-width: `4xl` (56rem)
- Mouse drawing na assinatura
- Hover states elegantes

---

## 🧪 Testes Recomendados

### 1. Signup
- [ ] Email inválido
- [ ] Senha fraca (<6 caracteres)
- [ ] Email já cadastrado
- [ ] Email verification enviado

### 2. NDA Reading
- [ ] Scroll até o fim
- [ ] Checkbox obrigatório
- [ ] Botão disabled sem aceite

### 3. Personal Data
- [ ] Validação de campos obrigatórios
- [ ] Select de marital status
- [ ] Select de document type

### 4. Phone Verification
- [ ] Formato internacional (+351931234567)
- [ ] Código SMS enviado
- [ ] Código inválido (error message)
- [ ] Too many requests (rate limiting)

### 5. Signature
- [ ] Canvas mouse drawing
- [ ] Canvas touch drawing (mobile)
- [ ] Clear signature
- [ ] Botão disabled sem assinatura
- [ ] Dados corretos no Firestore

---

## 🚀 Próximos Passos

### Admin Panel
- [ ] Dashboard de investidores pendentes
- [ ] Visualização de dados do NDA
- [ ] Download de assinaturas (PNG)
- [ ] Aprovação/rejeição com motivo

### Melhorias Futuras
- [ ] PDF generation (jsPDF + autoTable)
- [ ] Email notification ao investidor
- [ ] Multi-language NDA (PT, ES, FR)
- [ ] 2FA opcional
- [ ] Audit log completo

---

## 📚 Referências Legais

- **Brasil**: MP 2.200-2/2001 (ICP-Brasil)
- **EU**: Regulation (EU) No. 910/2014 (eIDAS)
- **Arbitragem**: Commercial Arbitration Center of CCIP, Lisbon
- **Convenção de Nova York**: Enforcement internacional

---

## 🔧 Tecnologias

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Firebase Auth, Firestore
- **SMS**: Firebase Phone Auth + reCAPTCHA
- **IP Detection**: ipify.org API
- **Canvas**: HTML5 Canvas API

---

**Desenvolvido por**: ESG Veritas Solutions, Lda  
**Projeto**: GreenCheck™ ESG Certification Platform  
**Versão**: 2.0 (English)  
**Data**: October 2025






