# Admin Dashboard Setup Guide

## Overview

O dashboard admin está completamente funcional e integrado com Firebase. Ele permite gerenciar properties (coleções) e blog posts através de uma interface moderna e intuitiva.

## Estrutura

### Rotas Admin

- `/admin` - Dashboard principal com KPIs
- `/admin/properties` - Lista de properties
- `/admin/properties/[id]` - Editar/Criar property (use `new` para criar)
- `/admin/blog` - Lista de blog posts
- `/admin/blog/[id]` - Editar/Criar blog post (use `new` para criar)

### Firebase Collections

O dashboard usa as seguintes collections no Firestore:

1. **`properties`** - Armazena todas as properties
2. **`blog`** - Armazena todos os blog posts
3. **`leads`** - Armazena leads do website
4. **`analytics`** - Armazena dados de analytics (opcional)

## Configuração Firebase

### 1. Variáveis de Ambiente

As variáveis já estão configuradas no Replit Secrets:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_DATABASE_URL`

### 2. Firebase Console Setup

#### Authentication
1. Vá em Firebase Console → Authentication
2. Ative **Email/Password** authentication
3. Crie um usuário admin manualmente ou use o script de criação

#### Firestore Rules
Configure as seguintes regras de segurança:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Properties collection
    match /properties/{propertyId} {
      allow read: if true; // Public read
      allow write: if request.auth != null; // Only authenticated users
    }
    
    // Blog collection
    match /blog/{postId} {
      allow read: if true; // Public read
      allow write: if request.auth != null; // Only authenticated users
    }
    
    // Leads collection
    match /leads/{leadId} {
      allow read, write: if request.auth != null; // Only authenticated users
    }
  }
}
```

#### Storage Rules
Configure as regras de Storage para upload de imagens:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /properties/{propertyId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /blog/{postId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Como Usar

### Criar Conta Admin (Página Secreta)

1. Acesse `/admin/register`
2. Insira o código de acesso: `arcadesoft222`
3. Preencha o formulário de registro:
   - Email
   - Senha (mínimo 6 caracteres)
   - Confirme a senha
4. Após criar a conta, você será redirecionado para `/login`
5. Faça login com suas credenciais

### Login

1. Acesse `/login`
2. Use suas credenciais Firebase
3. Você será redirecionado para `/admin`

### Gerenciar Properties

1. Vá em **Properties** no menu lateral
2. Clique em **Add Property** para criar uma nova
3. Preencha os campos:
   - Title, Location, Type, Price
   - Beds, Baths, Area
   - Upload uma imagem principal
   - Adicione descrição (opcional)
   - Marque como Featured se desejar
4. Clique em **Create Property** ou **Save Changes**

### Gerenciar Blog

1. Vá em **Blog** no menu lateral
2. Clique em **New Post** para criar um novo artigo
3. Preencha os campos:
   - Title, Subtitle
   - Category, Read Time, Date
   - Upload uma imagem destacada
   - Adicione excerpt e content
   - Marque como Published se quiser publicar imediatamente
4. Clique em **Create Post** ou **Save Changes**

### Dashboard

O dashboard mostra:
- **Total Visits** - Visitas totais (requer integração com analytics)
- **Leads** - Total de leads e novos leads
- **Properties** - Total de properties cadastradas
- **Blog Posts** - Total de posts publicados
- **Recent Leads** - Últimos 5 leads recebidos

## Estrutura de Dados

### Property

```typescript
{
  id?: string
  title: string
  location: string
  type: string
  price: string
  beds: string
  baths: string
  area: string
  tag: string
  image: string
  images?: string[]
  description?: string
  featured?: boolean
  createdAt?: Date
  updatedAt?: Date
}
```

### BlogPost

```typescript
{
  id?: string
  title: string
  subtitle: string
  image: string
  readTime: string
  date: string
  category: string
  author: {
    name: string
    role: string
  }
  excerpt: string
  content?: string
  published?: boolean
  createdAt?: Date
  updatedAt?: Date
}
```

## Próximos Passos

1. **Analytics Integration**: Integrar com Google Analytics ou similar para métricas reais
2. **Lead Management**: Adicionar funcionalidade de responder/qualificar leads
3. **Image Gallery**: Permitir múltiplas imagens por property
4. **Rich Text Editor**: Adicionar editor WYSIWYG para blog content
5. **Bulk Actions**: Adicionar ações em massa (delete, publish, etc.)

## Troubleshooting

### Erro de autenticação
- Verifique se Email/Password está ativado no Firebase Console
- Verifique se as credenciais estão corretas

### Erro ao fazer upload de imagem
- Verifique as regras de Storage no Firebase Console
- Verifique se o Storage está ativado

### Erro ao salvar dados
- Verifique as regras do Firestore
- Verifique se está autenticado (refresh o token se necessário)

