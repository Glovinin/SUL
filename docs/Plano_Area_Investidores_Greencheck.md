# 🧭 PLANO DE IMPLEMENTAÇÃO – ÁREA DE INVESTIDORES GREENCHECK

## 🎯 Objetivo
Desenvolver a **área de investidores** dentro da plataforma Greencheck com fluxo de acesso seguro, permitindo que possíveis investidores possam:

1. Acessar portal com **código exclusivo de acesso**.
2. Fazer **cadastro e autenticação via SMS** (Firebase Auth).  
3. **Assinar digitalmente o NDA** (acordo de confidencialidade).  
4. Ter o acesso liberado manualmente por um **admin Greencheck**.  
5. Após aprovação, acessar o **portal de investidores** com *Business Plan* e materiais confidenciais.

---

## ⚙️ Arquitetura Técnica

**Base:**
- Framework: **Next.js 14** (App Router)
- Backend: **Firebase**
- Banco de dados: **Firestore**
- Autenticação: **Firebase Auth (Phone/SMS)**
- Armazenamento: **Firebase Storage** (documentos confidenciais)
- UI: **Tailwind CSS + Framer Motion + Shadcn/UI**
- Painel Admin: **Next.js + Firebase Admin SDK**
- Deploy: **Replit** (codebase principal)

As **chaves e configurações do Firebase** serão armazenadas com segurança nos **Secrets do Replit**, não diretamente no código.

---

## 🧩 Estrutura de Rotas e Páginas

### ✅ `/investidores` (EXISTENTE)
- **Status**: Já implementada
- **Descrição**: Página principal do portal de investidores com informações do Business Plan
- **Acesso**: Apenas para investidores com `status: "approved"` no Firestore
- **Conteúdo**:
  - Oportunidade de mercado (€8.5B)
  - Solução tecnológica (AI + Blockchain)
  - Métricas de tração
  - Roadmap estratégico
  - Use of funds
  - Team section
  - Contact CTA

### ✅ `/investidores/acesso` (EXISTENTE)
- **Status**: Já implementada
- **Descrição**: Página de controle de acesso com código exclusivo
- **Código válido**: `GREENCHECK222`
- **Funcionalidade**: 
  - Verifica código de acesso
  - Armazena flag no localStorage: `greencheck_investor_access = true`
  - Redireciona para → `/investidores/login`
- **Design**: Ultra minimal, Apple-inspired, fundo gradiente azul-petróleo

### 🆕 `/investidores/login` (CRIAR)
- **Descrição**: Página de login/cadastro por telefone (Firebase Phone Auth)
- **Design**: Mesmo padrão visual do `/investidores/acesso` (Apple-inspired, minimal)
- **Componentes**:
  - **Tab switcher**: "Login" | "Sign Up"
  - **Login Tab**:
    - Input de telefone (+351 xxx xxx xxx)
    - Botão "Send Code"
    - Recebe SMS com código de 6 dígitos
    - Valida código → se aprovado redireciona para `/investidores`
  - **Sign Up Tab**:
  - Nome completo  
  - Empresa  
    - Cargo
    - Email corporativo
    - Telefone (com verificação SMS)
    - Botão "Create Account"
    - Após cadastro → redireciona para `/investidores/nda`
- **Firestore**: Ao criar conta, cria documento:
  ```js
  {
    uid: "firebase_uid",
    name: "João Silva",
    company: "Startup XYZ",
    role: "CEO",
    email: "joao@startup.xyz",
    phone: "+351931721901",
    status: "pending_nda",
    createdAt: timestamp,
    lastLogin: timestamp
  }
  ```

### 🆕 `/investidores/nda` (CRIAR)
- **Descrição**: Página de assinatura do NDA (Acordo de Confidencialidade)
- **Design**: Clean, documento formal com scroll
- **Conteúdo**:
  - Texto completo do NDA da Greencheck
  - Checkbox: "Li e aceito o Acordo de Confidencialidade (NDA) da Greencheck"
  - Botão: "Sign NDA"
- **Funcionalidade**:
  - Captura IP do usuário (via API)
  - Registra timestamp da assinatura
  - Atualiza Firestore:
    ```js
    {
      status: "pending_approval",
      ndaSignedAt: timestamp,
      ndaSignedIp: "192.168.1.1",
      ndaVersion: "v1.0"
    }
    ```
  - (Opcional) Gera PDF do NDA assinado e salva no Firebase Storage
  - Redireciona para → `/investidores/pending-approval`
  - Envia notificação para admin (email/dashboard)

### 🆕 `/investidores/pending-approval` (CRIAR)
- **Descrição**: Página de aguardo de aprovação
- **Design**: Minimal, ícone de relógio/check
- **Conteúdo**:
  ```
  ⏳ Pending Approval
  
  Thank you for signing the NDA.
  Our team is reviewing your information.
  
  You will receive an email as soon as your access is approved.
  
  Contact: invest@greencheck.io
  ```
- **Funcionalidade**: 
  - Verifica status no Firestore a cada 30s
  - Se `status === "approved"` → redireciona para `/investidores`

### 🆕 `/admin/investors` (CRIAR)
- **Descrição**: Dashboard administrativo para gestão de investidores
- **Acesso**: Apenas para usuários com `role: "admin"` no Firestore
- **Layout**: Tabela com filtros e actions
- **Colunas da tabela**:
  - Nome | Empresa | Email | Telefone | Status | Data de Cadastro | Actions
- **Status possíveis**:
  - 🟡 `pending_nda` - Cadastrado, aguardando NDA
  - 🟠 `pending_approval` - NDA assinado, aguardando aprovação
  - 🟢 `approved` - Aprovado, acesso liberado
  - 🔴 `rejected` - Rejeitado
- **Actions**:
  - 👁️ **View Details** - Modal com todos os dados + NDA info
  - ✅ **Approve** - Muda status para `approved` + envia email
  - ❌ **Reject** - Muda status para `rejected` + envia email
- **Firestore Update**:
  ```js
  {
    status: "approved",
    approvedAt: timestamp,
    approvedBy: admin_uid
  }
  ```

### 🆕 `/admin/login` (CRIAR)
- **Descrição**: Login exclusivo para admins
- **Autenticação**: Firebase Auth (email + password)
- **Hardcoded admins**: Emails pré-cadastrados no Firebase
- **Após login**: Redireciona para `/admin/investors`

---

## 🚀 Fluxo Completo do Usuário

```
1️⃣ Investidor recebe código exclusivo via email/WhatsApp
   ↓
2️⃣ Acessa /investidores/acesso
   → Insere código: GREENCHECK222
   ↓
3️⃣ Redireciona para /investidores/login
   → Opção A: LOGIN (se já tem conta)
      - Insere telefone
      - Recebe código SMS
      - Valida código
      - Redireciona para /investidores (se status = "approved")
   
   → Opção B: SIGN UP (primeira vez)
      - Preenche: Nome, Empresa, Cargo, Email, Telefone
      - Verifica telefone via SMS
      - Cria conta no Firestore (status: "pending_nda")
      - Redireciona para /investidores/nda
   ↓
4️⃣ /investidores/nda
   → Lê o NDA completo
   → Aceita checkbox
   → Assina (captura IP + timestamp)
   → Status muda para "pending_approval"
   → Redireciona para /investidores/pending-approval
   ↓
5️⃣ /investidores/pending-approval
   → Aguarda aprovação do admin
   → Verifica status a cada 30s
   ↓
6️⃣ ADMIN recebe notificação
   → Acessa /admin/login
   → Vai para /admin/investors
   → Visualiza lista de pending approvals
   → Revisa informações do investidor
   → APROVA ou REJEITA
   ↓
7️⃣ Se APROVADO:
   → Status muda para "approved"
   → Investidor recebe email
   → Próximo login: acesso liberado a /investidores
   → Acessa todo o Business Plan e materiais confidenciais
```

---

## ⚡ Fluxo de Status

| Etapa | Status Firestore | Tela Disponível | Descrição |
|-------|------------------|-----------------|-----------|
| Cadastro completo | `pending_nda` | `/investidores/nda` | Pode assinar NDA |
| NDA assinado | `pending_approval` | `/investidores/pending-approval` | Aguardando admin |
| Admin aprovou | `approved` | `/investidores` | Acesso total liberado |
| Admin rejeitou | `rejected` | Bloqueado | Acesso negado |

---

## 🔐 Regras de Segurança

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Investors collection
    match /investors/{uid} {
      // Usuário pode ler apenas seus próprios dados
      allow read: if request.auth != null && request.auth.uid == uid;
      
      // Apenas admin pode escrever
      allow write: if request.auth != null && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Admins collection
    match /admins/{uid} {
      allow read, write: if request.auth != null && 
                           get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### Segurança Adicional
- ✅ Código de acesso inicial (`GREENCHECK222`) armazenado no backend
- ✅ Autenticação Firebase Phone (SMS 2FA)
- ✅ Logs de assinatura do NDA (IP, timestamp, UID, versão)
- ✅ Apenas admins podem mudar status de investidores
- ✅ Documentos sensíveis no Firebase Storage com permissões restritas
- ✅ Middleware Next.js para proteger rotas `/investidores` e `/admin`
- ✅ Rate limiting no envio de SMS (prevenir spam)
- ✅ Validação de email corporativo (domínios públicos bloqueados)

---

## 📬 Notificações e Integrações

### Emails Automáticos (Firebase Cloud Functions)
1. **Novo cadastro** → Email para admin: "Novo investidor cadastrado"
2. **NDA assinado** → Email para admin: "NDA assinado - Revisar aprovação"
3. **Aprovado** → Email para investidor: "Acesso aprovado - Bem-vindo!"
4. **Rejeitado** → Email para investidor: "Solicitação revisada"

### Webhooks (Opcional)
- Integração com Slack/Discord para notificar equipe em tempo real
- Webhook para CRM (HubSpot/Salesforce) quando investidor for aprovado

---

## 🔑 Configuração do Firebase

### Credenciais (Armazenar no Replit Secrets)
```javascript
// Replit Secrets
FIREBASE_API_KEY=AIzaSyBb6VyufD93Sc7f_llL45ifFnWmVRywOPA
FIREBASE_AUTH_DOMAIN=greencheck-app.firebaseapp.com
FIREBASE_DATABASE_URL=https://greencheck-app-default-rtdb.europe-west1.firebasedatabase.app
FIREBASE_PROJECT_ID=greencheck-app
FIREBASE_STORAGE_BUCKET=greencheck-app.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=1046515296661
FIREBASE_APP_ID=1:1046515296661:web:377ea31a38e61e2cf7ee9c
```

⚠️ **Esses dados NÃO devem aparecer em commits públicos**. Usar apenas via `process.env` no Replit.

### Estrutura Firestore
```
/investors (collection)
  └── {uid} (document)
      ├── uid: string
      ├── name: string
      ├── company: string
      ├── role: string
      ├── email: string
      ├── phone: string
      ├── status: "pending_nda" | "pending_approval" | "approved" | "rejected"
      ├── createdAt: timestamp
      ├── lastLogin: timestamp
      ├── ndaSignedAt: timestamp (opcional)
      ├── ndaSignedIp: string (opcional)
      ├── ndaVersion: string (opcional)
      ├── approvedAt: timestamp (opcional)
      └── approvedBy: string (opcional - uid do admin)

/admins (collection)
  └── {uid} (document)
      ├── email: string
      ├── name: string
      └── role: "admin"
```

---

## 🛠️ Stack Técnico por Página

| Página | Tecnologias | Bibliotecas Necessárias |
|--------|-------------|-------------------------|
| `/investidores/login` | Next.js, Firebase Phone Auth, Framer Motion | `firebase`, `react-phone-input-2`, `framer-motion` |
| `/investidores/nda` | Next.js, Firestore | `firebase`, `axios` (para capturar IP) |
| `/investidores/pending-approval` | Next.js, Firestore Listeners | `firebase`, `framer-motion` |
| `/admin/login` | Next.js, Firebase Auth Email/Password | `firebase` |
| `/admin/investors` | Next.js, Firestore, Shadcn Table | `firebase`, `@tanstack/react-table`, `shadcn/ui` |

### Instalações Necessárias
```bash
npm install firebase
npm install react-phone-input-2
npm install axios
npm install @tanstack/react-table
npx shadcn-ui@latest add table
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add tabs
```

---

## 📋 Checklist de Implementação

### Fase 1: Setup Firebase ✅
- [ ] Configurar Firebase no projeto (lib/firebase.ts)
- [ ] Adicionar credenciais no Replit Secrets
- [ ] Ativar Firebase Phone Auth no console
- [ ] Configurar Firestore Rules
- [ ] Criar collections: `investors`, `admins`

### Fase 2: Páginas de Investidor 🔨
- [ ] **`/investidores/login`** - Login e cadastro por telefone
  - [ ] Tab switcher (Login | Sign Up)
  - [ ] Firebase Phone Auth integration
  - [ ] Design Apple-inspired (mesmo da página de acesso)
  - [ ] Validação de formulários
  - [ ] Criar documento no Firestore após cadastro
  
- [ ] **`/investidores/nda`** - Assinatura do NDA
  - [ ] Layout clean com documento scrollável
  - [ ] Checkbox de aceitação
  - [ ] Captura de IP (via API)
  - [ ] Atualizar Firestore com dados de assinatura
  - [ ] Redirecionar para pending-approval
  
- [ ] **`/investidores/pending-approval`** - Aguardando aprovação
  - [ ] Design minimal com ícone de loading/clock
  - [ ] Verificação de status a cada 30s
  - [ ] Auto-redirect quando aprovado

### Fase 3: Painel Admin 👨‍💼
- [ ] **`/admin/login`** - Login de admin
  - [ ] Firebase Email/Password auth
  - [ ] Verificar role: "admin"
  - [ ] Redirecionar para dashboard
  
- [ ] **`/admin/investors`** - Dashboard de gestão
  - [ ] Tabela com todos os investidores
  - [ ] Filtros por status
  - [ ] Modal de detalhes
  - [ ] Botões: Approve | Reject
  - [ ] Atualizar Firestore ao aprovar/rejeitar

### Fase 4: Middleware e Proteção de Rotas 🔒
- [ ] Criar middleware Next.js para proteger `/investidores`
- [ ] Verificar status "approved" antes de permitir acesso
- [ ] Proteger rotas `/admin` com role "admin"
- [ ] Redirect automático se não autorizado

### Fase 5: Notificações 📧
- [ ] Firebase Cloud Function: Email ao assinar NDA
- [ ] Firebase Cloud Function: Email ao ser aprovado
- [ ] (Opcional) Integração com Resend/SendGrid

### Fase 6: Testes e Deploy 🚀
- [ ] Testar fluxo completo end-to-end
- [ ] Verificar segurança das Firestore Rules
- [ ] Rate limiting no SMS
- [ ] Deploy no Replit
- [ ] Testes com investidores reais (beta)

---

## 🎯 Próximos Passos Imediatos

1. **Configurar Firebase** no projeto
   - Criar `lib/firebase.ts` com inicialização
   - Adicionar credenciais no Replit Secrets
   
2. **Criar `/investidores/login`**
   - Começar pelo layout (clone do design de `/acesso`)
   - Implementar tabs (Login | Sign Up)
   - Integrar Firebase Phone Auth
   
3. **Criar `/investidores/nda`**
   - HTML do NDA
   - Lógica de assinatura
   - Captura de IP
   
4. **Criar `/admin/login` e `/admin/investors`**
   - Dashboard simples com tabela
   - Actions de aprovação
   
5. **Middleware de proteção**
   - Garantir segurança das rotas

---

## 📊 Diagramas do Sistema

### 🗺️ Diagrama de Fluxo Completo (User Journey)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ÁREA DE INVESTIDORES GREENCHECK                      │
│                              Fluxo Completo v1.0                             │
└─────────────────────────────────────────────────────────────────────────────┘

                                  [INVESTIDOR]
                                       │
                                       ▼
                    ┌──────────────────────────────────┐
                    │  Recebe código via Email/WhatsApp│
                    │     Código: GREENCHECK222         │
                    └──────────────────────────────────┘
                                       │
                                       ▼
                    ╔══════════════════════════════════╗
                    ║  /investidores/acesso            ║
                    ║  ────────────────────            ║
                    ║  • Insere código de acesso       ║
                    ║  • Valida GREENCHECK222          ║
                    ║  • localStorage: access = true   ║
                    ╚══════════════════════════════════╝
                                       │
                                       ▼
                    ╔══════════════════════════════════╗
                    ║  /investidores/login             ║
                    ║  ────────────────────            ║
                    ║  Tab 1: LOGIN     Tab 2: SIGN UP ║
                    ╚══════════════════════════════════╝
                            │                   │
                    ┌───────┴───────┐  ┌────────┴────────┐
                    │               │  │                 │
            ┌───────▼───────┐   ┌──▼──▼──┐       ┌──────▼──────┐
            │ JÁ TEM CONTA  │   │ FIREBASE│       │ NOVO USUÁRIO│
            │               │   │  AUTH   │       │             │
            │ • Telefone    │   │  PHONE  │       │ • Nome      │
            │ • SMS Code    │   │         │       │ • Empresa   │
            │ • Valida      │   └─────────┘       │ • Cargo     │
            └───────────────┘                     │ • Email     │
                    │                             │ • Telefone  │
                    │                             │ • SMS Code  │
                    │                             └──────────────┘
                    │                                     │
                    ▼                                     ▼
            ┌────────────────┐              ┌─────────────────────┐
            │ Verifica Status│              │ Cria Firestore Doc  │
            │ no Firestore   │              │ status: pending_nda │
            └────────────────┘              └─────────────────────┘
                    │                                     │
        ┌───────────┴──────────┐                         │
        │                      │                         │
        ▼                      ▼                         ▼
┌──────────────┐    ┌──────────────────┐    ┌────────────────────┐
│ approved ✅   │    │ pending_approval │    │  /investidores/nda │
│ Redirect →   │    │ Redirect →       │    │  ───────────────── │
│ /investidores│    │ pending-approval │    │  • Lê NDA completo │
└──────────────┘    └──────────────────┘    │  • Aceita checkbox │
                                             │  • Captura IP      │
                                             │  • Registra data   │
                                             └────────────────────┘
                                                        │
                                                        ▼
                                             ┌────────────────────┐
                                             │ Atualiza Firestore │
                                             │ status:            │
                                             │ pending_approval   │
                                             │ + IP + timestamp   │
                                             └────────────────────┘
                                                        │
                                                        ▼
                                         ╔══════════════════════════════╗
                                         ║ /investidores/pending-       ║
                                         ║          approval             ║
                                         ║ ─────────────────────────    ║
                                         ║ ⏳ Aguardando aprovação...   ║
                                         ║                              ║
                                         ║ Verifica status a cada 30s   ║
                                         ╚══════════════════════════════╝
                                                        │
                                         ┌──────────────┴──────────────┐
                                         │                             │
                                    Aguarda...                    [ADMIN]
                                         │                             │
                                         │                             ▼
                                         │              ╔════════════════════════╗
                                         │              ║  /admin/login          ║
                                         │              ║  ─────────────         ║
                                         │              ║  • Email + Password    ║
                                         │              ║  • Firebase Auth       ║
                                         │              ║  • Verifica role:admin ║
                                         │              ╚════════════════════════╝
                                         │                             │
                                         │                             ▼
                                         │              ╔════════════════════════╗
                                         │              ║  /admin/investors      ║
                                         │              ║  ─────────────         ║
                                         │              ║  📋 Tabela investidores║
                                         │              ║  ┌──────────────────┐ ║
                                         │              ║  │ Nome | Status    │ ║
                                         │              ║  │ João | pending   │ ║
                                         │              ║  └──────────────────┘ ║
                                         │              ║                        ║
                                         │              ║  [View] [✅ Approve]  ║
                                         │              ║         [❌ Reject]   ║
                                         │              ╚════════════════════════╝
                                         │                             │
                                         │                    ┌────────┴────────┐
                                         │                    │                 │
                                         │                    ▼                 ▼
                                         │         ┌────────────────┐  ┌──────────────┐
                                         │         │ ✅ APPROVE     │  │ ❌ REJECT    │
                                         │         │ status: approved│ │ status:      │
                                         │         │ + timestamp    │  │ rejected     │
                                         │         │ + admin UID    │  │              │
                                         │         └────────────────┘  └──────────────┘
                                         │                    │                 │
                                         │                    │                 │
                                         │         ┌──────────▼────────┐       │
                                         │         │ 📧 Email Aprovação│       │
                                         │         │ "Acesso liberado!"│       │
                                         │         └───────────────────┘       │
                                         │                    │                 │
                                         └────────────────────┘                 │
                                                              │                 │
                                                              ▼                 ▼
                                              ╔════════════════════════╗   [BLOQUEADO]
                                              ║  /investidores         ║   Acesso negado
                                              ║  ──────────────        ║
                                              ║  🎉 ACESSO LIBERADO   ║
                                              ║                        ║
                                              ║  • Business Plan       ║
                                              ║  • Market Opportunity  ║
                                              ║  • Tech Stack          ║
                                              ║  • Traction Metrics    ║
                                              ║  • Use of Funds        ║
                                              ║  • Team & Contact      ║
                                              ╚════════════════════════╝
```

---

### 🏗️ Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ARQUITETURA GREENCHECK INVESTORS                     │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   INVESTIDOR    │         │      ADMIN      │         │   FIREBASE      │
│   (Frontend)    │         │   (Frontend)    │         │   (Backend)     │
└────────┬────────┘         └────────┬────────┘         └────────┬────────┘
         │                           │                           │
         │                           │                           │
    ┌────▼─────────────────────────────────────────────┐        │
    │         NEXT.JS 14 APP ROUTER                    │        │
    │  ─────────────────────────────────────────       │        │
    │                                                   │        │
    │  ┌──────────────────────────────────────────┐   │        │
    │  │  /investidores/                          │   │        │
    │  │  ├─ /acesso           (Código acesso)    │   │        │
    │  │  ├─ /login            (Phone Auth)       │◄──┼────────┤
    │  │  ├─ /nda              (Assinar NDA)      │   │        │
    │  │  ├─ /pending-approval (Aguardar)         │   │        │
    │  │  └─ /                 (Dashboard) 🔒     │   │        │
    │  └──────────────────────────────────────────┘   │        │
    │                                                   │        │
    │  ┌──────────────────────────────────────────┐   │        │
    │  │  /admin/                                  │   │        │
    │  │  ├─ /login            (Email+Pass) 🔒    │◄──┼────────┤
    │  │  └─ /investors        (Dashboard) 🔒     │   │        │
    │  └──────────────────────────────────────────┘   │        │
    │                                                   │        │
    │  ┌──────────────────────────────────────────┐   │        │
    │  │  MIDDLEWARE (Proteção de Rotas)          │   │        │
    │  │  ├─ Verifica auth status                 │◄──┼────────┤
    │  │  ├─ Verifica role: admin                 │   │        │
    │  │  └─ Verifica status: approved            │   │        │
    │  └──────────────────────────────────────────┘   │        │
    └───────────────────────────────────────────────────┘        │
                                                                  │
┌─────────────────────────────────────────────────────────────────┼────────┐
│                           FIREBASE SERVICES                     ▼        │
│  ──────────────────────────────────────────────────────────────────     │
│                                                                          │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌────────────┐   │
│  │   AUTHENTICATION     │  │     FIRESTORE        │  │  STORAGE   │   │
│  │  ─────────────────   │  │  ─────────────────   │  │ ──────────  │   │
│  │                      │  │                      │  │            │   │
│  │  • Phone (SMS)       │  │  /investors/         │  │  /ndas/    │   │
│  │    └─ 2FA Code       │  │    └─ {uid}          │  │  /docs/    │   │
│  │                      │  │       ├─ name        │  │            │   │
│  │  • Email/Password    │  │       ├─ company     │  │            │   │
│  │    └─ Admin Only     │  │       ├─ status      │  │            │   │
│  │                      │  │       ├─ ndaSigned   │  │            │   │
│  │  • UID Generation    │  │       └─ approved    │  │            │   │
│  │                      │  │                      │  │            │   │
│  │  • Session Tokens    │  │  /admins/            │  │            │   │
│  │                      │  │    └─ {uid}          │  │            │   │
│  └──────────────────────┘  │       ├─ email       │  │            │   │
│                            │       └─ role: admin │  │            │   │
│                            └──────────────────────┘  └────────────┘   │
│                                                                        │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │               FIRESTORE SECURITY RULES                         │  │
│  │  ────────────────────────────────────────────────────────     │  │
│  │                                                                │  │
│  │  • Investors: read (próprio UID), write (admin only)          │  │
│  │  • Admins: read/write (admin role only)                       │  │
│  │  • Rate limiting on SMS sends                                 │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │            CLOUD FUNCTIONS (Opcional - Fase 5)                 │  │
│  │  ────────────────────────────────────────────────────────     │  │
│  │                                                                │  │
│  │  • onNDASigned() → Email para admin                           │  │
│  │  • onApproved()  → Email para investidor                      │  │
│  │  • onRejected()  → Email para investidor                      │  │
│  └────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

---

### 🔄 Máquina de Estados (Status do Investidor)

```
                    ╔════════════════════════════════════╗
                    ║   ESTADO DO INVESTIDOR (Firestore) ║
                    ╚════════════════════════════════════╝

                              [INÍCIO]
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │  Cadastra na plataforma│
                    │  via Phone Auth        │
                    └────────────────────────┘
                                 │
                                 ▼
                    ╔════════════════════════╗
                    ║   pending_nda 🟡       ║
                    ║                        ║
                    ║  Pode acessar:         ║
                    ║  • /investidores/nda   ║
                    ╚════════════════════════╝
                                 │
                                 │ Assina NDA
                                 ▼
                    ╔════════════════════════╗
                    ║  pending_approval 🟠   ║
                    ║                        ║
                    ║  Pode acessar:         ║
                    ║  • /pending-approval   ║
                    ║                        ║
                    ║  Aguardando admin...   ║
                    ╚════════════════════════╝
                                 │
                   ┌─────────────┴─────────────┐
                   │                           │
        [ADMIN APROVA]                [ADMIN REJEITA]
                   │                           │
                   ▼                           ▼
      ╔═════════════════════╗     ╔═════════════════════╗
      ║   approved ✅        ║     ║   rejected ❌        ║
      ║                     ║     ║                     ║
      ║  Acesso TOTAL:      ║     ║  BLOQUEADO          ║
      ║  • /investidores    ║     ║                     ║
      ║  • Business Plan    ║     ║  Não pode acessar   ║
      ║  • Materiais        ║     ║  nenhuma página     ║
      ║    confidenciais    ║     ║                     ║
      ╚═════════════════════╝     ╚═════════════════════╝
                   │                           │
                   ▼                           ▼
            [FIM - SUCESSO]              [FIM - NEGADO]


┌────────────────────────────────────────────────────────────────┐
│                  TRANSIÇÕES DE ESTADO                          │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  pending_nda  ──────────►  pending_approval                   │
│                (Assina NDA)                                    │
│                                                                │
│  pending_approval  ──────►  approved                          │
│                    (Admin aprova)                              │
│                                                                │
│  pending_approval  ──────►  rejected                          │
│                    (Admin rejeita)                             │
│                                                                │
│  rejected  ──────────────►  pending_approval                  │
│            (Admin pode reverter - raro)                        │
└────────────────────────────────────────────────────────────────┘
```

---

### 🔐 Camadas de Segurança

```
┌─────────────────────────────────────────────────────────────────┐
│              MÚLTIPLAS CAMADAS DE SEGURANÇA                     │
│              ─────────────────────────────────                  │
│                                                                 │
│  🔒 CAMADA 1: Código de Acesso Exclusivo                       │
│     └─ GREENCHECK222 (compartilhado apenas com prospects)     │
│        └─ localStorage flag                                     │
│                                                                 │
│  🔒 CAMADA 2: Autenticação Firebase Phone                      │
│     └─ Verificação SMS (2FA)                                   │
│        └─ UID único por usuário                                │
│                                                                 │
│  🔒 CAMADA 3: NDA Digital                                       │
│     └─ Aceite registrado com IP + timestamp                    │
│        └─ Compromisso legal documentado                        │
│                                                                 │
│  🔒 CAMADA 4: Aprovação Manual Admin                           │
│     └─ Validação humana final                                  │
│        └─ Admin verifica empresa, cargo, email                 │
│                                                                 │
│  🔒 CAMADA 5: Firestore Rules                                   │
│     └─ Permissões granulares por collection                    │
│        └─ Read/Write controlado por role e UID                 │
│                                                                 │
│  🔒 CAMADA 6: Next.js Middleware                                │
│     └─ Proteção de rotas no servidor                           │
│        └─ Redirect automático se não autorizado                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 📱 Stack Tecnológico Visual

```
┌─────────────────────────────────────────────────────────────────┐
│                    STACK TECNOLÓGICO                            │
└─────────────────────────────────────────────────────────────────┘

    FRONTEND                 BACKEND               STYLING
┌──────────────┐       ┌──────────────┐      ┌──────────────┐
│   Next.js    │       │   Firebase   │      │  Tailwind    │
│     14       │◄─────►│   Firestore  │      │     CSS      │
│              │       │              │      │              │
│  App Router  │       │  Auth Phone  │      │  Framer      │
│  TypeScript  │       │  Auth Email  │      │  Motion      │
│              │       │              │      │              │
│  React 18    │       │   Storage    │      │  Shadcn/UI   │
└──────────────┘       └──────────────┘      └──────────────┘
       │                      │                      │
       └──────────────┬───────┴──────────────────────┘
                      │
                      ▼
              ┌──────────────┐
              │   REPLIT     │
              │   Deploy     │
              └──────────────┘

LIBRARIES & TOOLS
├─ react-phone-input-2    (Telefone formatado)
├─ axios                   (Captura IP)
├─ @tanstack/react-table  (Admin dashboard)
├─ framer-motion          (Animações)
├─ firebase               (SDK completo)
└─ lucide-react           (Ícones)
```

---

## 🧠 Resumo Técnico

Este sistema implementa um **funil de investidores qualificado** com múltiplas camadas de segurança:

1. **Código de acesso exclusivo** - Primeiro filtro
2. **Verificação por SMS** - Autenticação 2FA
3. **NDA digital** - Compromisso legal documentado
4. **Aprovação manual** - Validação humana final

**Tecnologias**: Next.js 14 + Firebase (Auth Phone, Firestore, Storage) + Shadcn/UI + Tailwind CSS + Framer Motion

**Segurança**: Firestore Rules + Middleware Next.js + Rate Limiting + IP Logging

**Design**: Apple-inspired, ultra minimal, fundo gradiente azul-petróleo (#044050), verde (#5FA037) para CTAs

**Tempo estimado**: 4-6 dias de desenvolvimento full-stack
