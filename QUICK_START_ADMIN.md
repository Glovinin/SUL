# 🚀 Quick Start: Admin Portal

## ⚡ Método Rápido (Firebase Console)

### 1. Criar Admin no Firebase (5 minutos)

#### Passo 1: Criar usuário
1. Vá em [Firebase Console](https://console.firebase.google.com/) → Projeto `greencheck-app`
2. **Authentication** → **Users** → **Add user**
3. Email: `admin@greencheck.pt`
4. Password: `YourPassword123!` (escolha uma senha forte)
5. ✅ Marque "Email verified"
6. Clique **Add user**
7. **📝 COPIE O UID** do usuário (ex: `aBc123XyZ...`)

#### Passo 2: Adicionar no Firestore
1. **Firestore Database** → **Start collection** (se não tiver)
2. Collection ID: `admins`
3. Document ID: **Cole o UID copiado**
4. Adicione os campos:
   ```
   email: admin@greencheck.pt       (string)
   name: Admin Greencheck            (string)
   role: admin                       (string) ⚠️ IMPORTANTE
   createdAt: [clique no relógio]   (timestamp)
   ```
5. Clique **Save**

### 2. Fazer Login

1. Acesse: **`/admin/login`**
2. Email: `admin@greencheck.pt`
3. Password: `YourPassword123!`
4. ✅ Você será redirecionado para `/admin/investors`

### 3. Aprovar Investidores

1. No dashboard `/admin/investors`:
   - Veja lista de investidores
   - Clique no botão verde ✅ para aprovar
   - Ou clique no 👁️ para ver detalhes completos

---

## 🧪 Teste Completo

### Criar um investidor de teste:
1. Aba anônima: `/investidores/acesso`
2. Digite código: `GREENCHECK2025`
3. Faça signup com telefone
4. Assine o NDA
5. Aguarde em "Pending Approval"

### Aprovar como admin:
1. Aba normal: `/admin/login` → faça login
2. `/admin/investors` → veja o investidor
3. Clique em ✅ Approve
4. Volte na aba anônima → será redirecionado automaticamente! 🎉

---

## 📚 Documentação Completa

- **Setup detalhado**: `ADMIN_SETUP_GUIDE.md`
- **Área de investidores**: `docs/Plano_Area_Investidores_Greencheck.md`
- **Implementação técnica**: `INVESTOR_IMPLEMENTATION.md`
- **Firebase Auth persistence**: `FIREBASE_PERSISTENCE_GUIDE.md`

---

## ❌ Troubleshooting

### "Unauthorized. Admin access only"
➡️ Verifique se o campo `role: "admin"` está correto no Firestore (lowercase, sem espaços)

### "Invalid email or password"
➡️ Resete a senha no Firebase Console → Authentication → usuário → Reset password

### Nenhum investidor aparece
➡️ Cadastre um investidor de teste primeiro (veja "Teste Completo" acima)

---

**Próximo passo?** 🚀









