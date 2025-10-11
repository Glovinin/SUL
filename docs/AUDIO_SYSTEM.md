# Sistema de Áudio GreenCheck

## 📋 Visão Geral

O GreenCheck possui um sistema de áudio global que toca narrações de IA quando o usuário navega entre diferentes páginas. Este documento explica como o sistema funciona e como evitar problemas de sobreposição de áudio.

## 🎵 Arquivos de Áudio

Os áudios estão localizados em `/public/audio/`:

- **esg.mp3** - Narração para a página de Validação (`/validacao`)
- **marketplace.mp3** - Narração para a página de Marketplace (`/marketplace`)
- **restrito.mp3** - Narração para a página de Investidores (`/investidores`)

## 🏗️ Arquitetura do Sistema

### 1. Audio Manager (`lib/audio-manager.ts`)

O `AudioManager` é uma classe singleton que gerencia todo o playback de áudio na aplicação.

**Características:**
- ✅ Garante que apenas um áudio toca por vez
- ✅ Para automaticamente qualquer áudio anterior antes de tocar um novo
- ✅ Limpa recursos quando áudio termina ou ocorre erro
- ✅ Verifica se está no lado do cliente (SSR-safe)

**Métodos principais:**
```typescript
// Para todos os áudios
audioManager.stop()

// Toca um áudio específico
audioManager.play('/audio/esg.mp3', volume)

// Verifica se está tocando
audioManager.isPlaying()
```

**Funções de conveniência:**
```typescript
import { 
  playESGAudio, 
  playMarketplaceAudio, 
  playInvestorsAudio, 
  stopAllAudio 
} from '../lib/audio-manager'
```

### 2. Audio Controller (`components/audio-controller.tsx`)

Componente global que monitora mudanças de rota e eventos do navegador para parar áudios automaticamente.

**Eventos monitorados:**
- ✅ Mudança de pathname (navegação entre páginas)
- ✅ `beforeunload` (usuário sai do site)
- ✅ `visibilitychange` (usuário troca de aba/minimiza)

**Localização:** Adicionado ao `app/layout.tsx` para funcionar globalmente.

### 3. Integração nos Componentes

#### Navbar (`components/navbar.tsx`)

```typescript
// Importa as funções
import { playESGAudio, playMarketplaceAudio, playInvestorsAudio } from '../lib/audio-manager'

// Usa nos handlers
const handleValidationNavigation = () => {
  playESGAudio()
  router.push('/validacao')
}
```

#### Mobile Navigation (`components/mobile-nav.tsx`)

Mesma implementação da navbar, mas também fecha o menu mobile:

```typescript
const handleValidationNavigation = () => {
  playESGAudio()
  setMenuOpen(false)
  router.push('/validacao')
}
```

## 🔧 Como Adicionar Novo Áudio

### 1. Adicione o arquivo de áudio
Coloque o arquivo em `/public/audio/seu-audio.mp3`

### 2. Adicione a função no audio-manager
```typescript
// lib/audio-manager.ts
export const playYourPageAudio = () => audioManager.play('/audio/seu-audio.mp3')
```

### 3. Use nos componentes
```typescript
import { playYourPageAudio } from '../lib/audio-manager'

const handleYourPageNavigation = () => {
  playYourPageAudio()
  router.push('/your-page')
}
```

## 🐛 Problemas Comuns e Soluções

### Problema: Áudios sobrepondo

**Causa:** Múltiplas instâncias de áudio tocando simultaneamente.

**Solução:** O sistema atual já resolve isso automaticamente através do `AudioManager` singleton.

### Problema: Áudio continua após trocar de página

**Causa:** O componente `AudioController` não está no layout ou há algum erro.

**Solução:** Verifique se `<AudioController />` está no `app/layout.tsx`.

### Problema: Áudio não toca em mobile

**Causa:** Políticas de autoplay do navegador.

**Solução:** O áudio só toca após interação do usuário (clique). Nosso sistema já está configurado corretamente para isso.

## 📊 Fluxo de Controle

```
Usuário clica em "Validation"
    ↓
handleValidationNavigation()
    ↓
playESGAudio()
    ↓
audioManager.play('/audio/esg.mp3')
    ↓
audioManager.stop() [para áudio anterior se houver]
    ↓
new Audio('/audio/esg.mp3')
    ↓
audio.play()
    ↓
Navegação router.push('/validacao')
    ↓
AudioController detecta mudança de pathname
    ↓
stopAllAudio() [cleanup preventivo]
```

## ✅ Checklist de Implementação

Quando implementar áudio em uma nova página:

- [ ] Áudio adicionado em `/public/audio/`
- [ ] Função criada em `lib/audio-manager.ts`
- [ ] Handler de navegação criado em `navbar.tsx`
- [ ] Handler de navegação criado em `mobile-nav.tsx`
- [ ] Botão/link usa o handler em vez de `<Link>`
- [ ] Testado em desktop e mobile
- [ ] Testado navegação rápida entre páginas
- [ ] Testado troca de abas do navegador

## 🎯 Melhores Práticas

1. **Sempre use o AudioManager** - Nunca crie instâncias de `new Audio()` diretamente nos componentes
2. **Use as funções de conveniência** - `playESGAudio()` é mais limpo que `audioManager.play('/audio/esg.mp3')`
3. **Confie no AudioController** - Não tente gerenciar o cleanup manualmente
4. **Teste navegação rápida** - Clique rapidamente entre páginas para garantir que não há sobreposição
5. **Mantenha volume consistente** - Use sempre 0.3 (30%) para todos os áudios

## 🔮 Futuras Melhorias

Possíveis melhorias para o sistema:

- [ ] Fade in/out entre áudios
- [ ] Controle de volume pelo usuário
- [ ] Opção de mutar todos os áudios
- [ ] Loading indicators durante playback
- [ ] Analytics de playback (quanto tempo ouviu)
- [ ] Cache de áudios para performance
- [ ] Suporte a playlists
- [ ] Legendas/transcrições

## 📞 Suporte

Se encontrar problemas com o sistema de áudio:

1. Verifique o console do navegador para erros
2. Confirme que o arquivo de áudio existe em `/public/audio/`
3. Teste em modo anônimo (desabilita extensões)
4. Verifique se `AudioController` está no layout
5. Confirme que está usando as funções do `audio-manager`

---

**Última atualização:** Outubro 2025
**Versão:** 1.0
**Autor:** GreenCheck Development Team





