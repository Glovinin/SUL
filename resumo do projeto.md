# 🔥 Firebase Phone Authentication Setup

## ❌ Erro Atual
```
Firebase: Error (auth/invalid-app-credential)
Failed to initialize reCAPTCHA Enterprise config
```

## ✅ Solução: Configurar Firebase Console

### 1. **Adicionar Domínio Autorizado**

1. Ir para [Firebase Console](https://console.firebase.google.com/)
2. Selecionar projeto **greencheck-app**
3. Ir para **Authentication** → **Settings** → **Authorized domains**
4. Clicar em **Add domain**
5. Adicionar o domínio do Replit:
   ```
   b062ff87-1c0a-455a-ac41-fd5135827c85-00-tn6dev0ewx2w.janeway.replit.dev
   ```
6. Também adicionar (para localhost):
   ```
   localhost
   ```

### 2. **Verificar Phone Authentication Ativado**

1. No Firebase Console → **Authentication** → **Sign-in method**
2. Verificar se **Phone** está **Enabled**
3. Se não estiver, clicar em **Phone** e ativar

### 3. **Configurar reCAPTCHA (Opcional mas Recomendado)**

Para evitar problemas de verificação:

1. Ir para **Authentication** → **Settings**
2. Scroll até **App Check** (opcional)
3. Ou deixar o reCAPTCHA invisível padrão funcionar

---

## 🧪 Como Obter o Domínio Correto do Replit

O domínio atual que aparece no erro é:
```
https://b062ff87-1c0a-455a-ac41-fd5135827c85-00-tn6dev0ewx2w.janeway.replit.dev:5000/
```

Adicionar no Firebase (sem https:// e sem porta):
```
b062ff87-1c0a-455a-ac41-fd5135827c85-00-tn6dev0ewx2w.janeway.replit.dev
```

---

## 📝 Alternativa: Usar Números de Teste (Para Development)

Enquanto configura o domínio, você pode usar números de teste para testar a funcionalidade:

### Adicionar Números de Teste no Firebase:

1. Firebase Console → **Authentication** → **Sign-in method**
2. Scroll até **Phone numbers for testing**
3. Adicionar número de teste:
   - **Phone number**: `+351931721901` (ou qualquer)
   - **Code**: `123456` (código fixo)
4. Salvar

Agora você pode testar com esse número sem precisar de SMS real!

---

## 🔄 Depois de Configurar

1. **Recarregar a página** do Replit
2. Tentar cadastrar novamente
3. O reCAPTCHA deve funcionar automaticamente (invisível)
4. Você receberá o código SMS no telefone real

---

## 🐛 Se Ainda Não Funcionar

### Verificar Console do Firebase:
- Ir para **Authentication** → **Users** (ver se aparece algum erro)
- Verificar **Usage** para ver se há quotas excedidas

### Logs Detalhados:
O console do browser já mostra o erro correto. Se depois de adicionar o domínio ainda não funcionar:

1. Limpar cache do browser (Ctrl + Shift + Delete)
2. Tentar em janela anônima
3. Verificar se o domínio foi salvo corretamente no Firebase

---

## ✨ Status Final

Após configurar tudo:
- ✅ Domínio autorizado
- ✅ Phone Auth ativado
- ✅ (Opcional) Números de teste configurados

A aplicação deve funcionar perfeitamente! 🚀


