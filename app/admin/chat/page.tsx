"use client"

import { useEffect, useState, useRef } from 'react'
import { PaperPlaneRight, MagnifyingGlass, UserCircle, ChatCircle, Gear, X, Trash } from '@phosphor-icons/react'
import { AdminToastContainer, adminToast } from '@/components/admin/AdminToast'

interface Message {
  id: string
  text: string
  sender: 'user' | 'admin' | 'ai'
  timestamp: string
  read: boolean
}

interface Conversation {
  id: string
  userName: string
  userEmail: string
  lastMessage: string | null
  lastMessageTime: string | null
  lastMessageSender: string | null
  unreadCount: number
  status: string
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState({
    avatar: '',
    name: '',
    title: ''
  })
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const notificationSoundRef = useRef<HTMLAudioElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize notification sound
  useEffect(() => {
    if (typeof window !== 'undefined') {
      notificationSoundRef.current = new Audio('/audio/notification.mp3')
      notificationSoundRef.current.volume = 0.5
    }
  }, [])

  useEffect(() => {
    // Marcar admin como online quando a página carrega
    fetch('/api/chat/admin-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isOnline: true }),
    })

    loadConversations()
    loadSettings()
    
    // Atualizar status online a cada minuto
    const statusInterval = setInterval(() => {
      fetch('/api/chat/admin-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isOnline: true }),
      })
    }, 60000)
    
    // Polling mais frequente para mensagens (a cada 2 segundos)
    const interval = setInterval(() => {
      loadConversations()
      if (selectedConversation) {
        loadMessages(selectedConversation.id)
      }
    }, 2000)

    // Marcar como offline quando sair da página
    return () => {
      clearInterval(interval)
      clearInterval(statusInterval)
      fetch('/api/chat/admin-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isOnline: false }),
      })
    }
  }, [selectedConversation])

  const loadConversations = async () => {
    try {
      const response = await fetch('/api/chat/conversations')
      const data = await response.json()

      if (data.success) {
        setConversations(data.conversations)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const loadMessages = async (conversationId: string) => {
    try {
      const response = await fetch(`/api/chat/messages?conversationId=${conversationId}`)
      const data = await response.json()

      if (data.success) {
        const formattedMessages = data.messages.map((msg: any) => ({
          id: msg.id,
          text: msg.text,
          sender: msg.sender,
          timestamp: msg.timestamp,
          read: msg.read || false
        }))
        
        // Detectar novas mensagens comparando com mensagens anteriores
        setMessages(prevMessages => {
          if (prevMessages.length > 0 && formattedMessages.length > prevMessages.length) {
            // Há novas mensagens - verificar se são do usuário (não do admin)
            const newMessages = formattedMessages.slice(prevMessages.length)
            const hasNewUserMessage = newMessages.some(msg => msg.sender === 'user' || msg.sender === 'ai')
            
            if (hasNewUserMessage && notificationSoundRef.current) {
              notificationSoundRef.current.play().catch(() => {
                // Ignorar erros de autoplay
              })
            }
          } else if (prevMessages.length === 0 && formattedMessages.length > 0) {
            // Primeira carga - não tocar som
          } else if (prevMessages.length > 0) {
            // Verificar se última mensagem mudou (pode ser uma nova mensagem)
            const prevLastId = prevMessages[prevMessages.length - 1]?.id
            const newLastId = formattedMessages[formattedMessages.length - 1]?.id
            
            if (prevLastId !== newLastId) {
              const lastMessage = formattedMessages[formattedMessages.length - 1]
              if ((lastMessage.sender === 'user' || lastMessage.sender === 'ai') && notificationSoundRef.current) {
                notificationSoundRef.current.play().catch(() => {
                  // Ignorar erros de autoplay
                })
              }
            }
          }
          
          return formattedMessages
        })
        scrollToBottom()
      }
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation)
    loadMessages(conversation.id)
    if (inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const handleDeleteConversation = async (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (!confirm('Tem certeza que deseja excluir esta conversa? Esta ação não pode ser desfeita.')) {
      return
    }

    try {
      const response = await fetch(`/api/chat/delete-conversation?conversationId=${conversationId}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete conversation')
      }

      // Se a conversa deletada estava selecionada, limpar seleção
      if (selectedConversation?.id === conversationId) {
        setSelectedConversation(null)
        setMessages([])
      }

      // Recarregar lista de conversas
      loadConversations()
      adminToast.success('Conversa excluída com sucesso')
    } catch (error: any) {
      adminToast.error('Erro ao excluir conversa: ' + error.message)
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !selectedConversation) return

    const messageText = inputValue.trim()
    setInputValue('')

    const tempMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'admin',
      timestamp: new Date().toISOString(),
      read: false
    }
    setMessages(prev => [...prev, tempMessage])
    scrollToBottom()

    try {
      const response = await fetch('/api/chat/admin-send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId: selectedConversation.id,
          message: messageText
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      loadMessages(selectedConversation.id)
      loadConversations()
    } catch (error) {
      setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id))
      adminToast.error('Erro ao enviar mensagem. Por favor, tente novamente.')
    }
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/chat/admin-settings')
      const data = await response.json()
      
      if (data.success && data.settings) {
        setSettings(data.settings)
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploadingAvatar(true)
      
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/chat/upload-avatar', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload avatar')
      }

      setSettings(prev => ({ ...prev, avatar: data.url }))
      adminToast.success('Avatar atualizado com sucesso')
    } catch (error: any) {
      adminToast.error('Erro ao fazer upload do avatar: ' + error.message)
    } finally {
      setUploadingAvatar(false)
    }
  }

  const handleSaveSettings = async () => {
    try {
      const response = await fetch('/api/chat/admin-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save settings')
      }

      adminToast.success('Configurações salvas com sucesso!')
      setShowSettings(false)
    } catch (error: any) {
      adminToast.error('Erro ao salvar configurações: ' + error.message)
    }
  }

  const formatTime = (timestamp: string | null) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const filteredConversations = conversations.filter(conv =>
    conv.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.userEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <AdminToastContainer />
      <div className="h-[calc(100vh-120px)] flex bg-white rounded-xl border border-black/10 overflow-hidden">
      <div className="w-80 border-r border-black/10 flex flex-col bg-white">
        <div className="p-4 border-b border-black/10 flex items-center gap-2">
          <div className="relative flex-1">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" weight="bold" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/10 bg-white/50 text-black placeholder:text-black/40 focus:outline-none focus:border-black/20 transition-all duration-200 text-[14px]"
            />
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="w-10 h-10 rounded-lg hover:bg-black/5 transition-colors flex items-center justify-center"
            aria-label="Settings"
          >
            <Gear className="w-5 h-5 text-black/60" weight="bold" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="text-center py-20 px-4">
              <p className="text-black/60 text-sm">No conversations found</p>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation)}
                className={`group px-4 py-4 border-b border-black/5 cursor-pointer transition-colors relative ${
                  selectedConversation?.id === conversation.id
                    ? "bg-black/5"
                    : "hover:bg-black/[0.02]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center flex-shrink-0">
                    <UserCircle className="w-8 h-8 text-black/40" weight="duotone" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-[15px] font-semibold text-black truncate">
                        {conversation.userName || 'Unknown'}
                      </h3>
                      <div className="flex items-center gap-2">
                        {conversation.unreadCount > 0 && (
                          <span className="bg-black text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            {conversation.unreadCount}
                          </span>
                        )}
                        <button
                          onClick={(e) => handleDeleteConversation(conversation.id, e)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-lg hover:bg-red-500/10 flex items-center justify-center"
                          aria-label="Delete conversation"
                        >
                          <Trash className="w-4 h-4 text-red-500" weight="bold" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[12px] text-black/50 truncate mb-1">
                      {conversation.userEmail}
                    </p>
                    {conversation.lastMessage && (
                      <div className="flex items-center justify-between">
                        <p className="text-[13px] text-black/60 truncate flex-1">
                          {conversation.lastMessageSender === 'admin' && (
                            <span className="text-black/40 mr-1">You: </span>
                          )}
                          {conversation.lastMessage}
                        </p>
                        {conversation.lastMessageTime && (
                          <span className="text-[11px] text-black/40 ml-2 flex-shrink-0">
                            {formatTime(conversation.lastMessageTime)}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white">
        {selectedConversation ? (
          <>
            <div className="px-6 py-4 border-b border-black/10 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                    <UserCircle className="w-6 h-6 text-black/40" weight="duotone" />
                  </div>
                  <div>
                    <h2 className="text-[16px] font-semibold text-black">
                      {selectedConversation.userName}
                    </h2>
                    <p className="text-[12px] text-black/50">
                      {selectedConversation.userEmail}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteConversation(selectedConversation.id, e)
                  }}
                  className="w-9 h-9 rounded-lg hover:bg-red-500/10 transition-colors flex items-center justify-center"
                  aria-label="Delete conversation"
                >
                  <Trash className="w-4 h-4 text-red-500" weight="bold" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-gray-50/50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'admin' ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-[20px] px-4 py-3 text-[14px] leading-relaxed ${
                      message.sender === 'admin'
                        ? "bg-black text-white rounded-br-[6px]"
                        : message.sender === 'user'
                        ? "bg-white text-black rounded-bl-[6px] border border-black/10"
                        : "bg-white/80 text-black rounded-bl-[6px] border border-black/10"
                    }`}
                  >
                    <p className="font-normal">{message.text}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`text-[11px] font-normal ${
                          message.sender === 'admin' ? "text-white/50" : "text-black/40"
                        }`}
                      >
                        {message.timestamp
                          ? new Date(message.timestamp).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : ''}
                      </span>
                      {message.sender === 'admin' && (
                        <span className="text-[11px] text-white/50">
                          {message.read ? '✓✓' : '✓'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-6 py-4 bg-white border-t border-black/10">
              <div className="flex gap-3 items-end">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 px-5 py-3 rounded-xl border border-black/10 bg-white/50 text-black placeholder:text-black/40 focus:outline-none focus:border-black/30 transition-all duration-200 text-[14px]"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className={`w-11 h-11 rounded-xl transition-all duration-200 flex items-center justify-center bg-black hover:bg-black/90 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm hover:shadow-md`}
                >
                  <PaperPlaneRight className="w-4 h-4 text-white" weight="bold" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50/50">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black/5 flex items-center justify-center">
                <ChatCircle className="w-8 h-8 text-black/30" weight="duotone" />
              </div>
              <h3 className="text-[18px] font-semibold text-black mb-2">
                Select a conversation
              </h3>
              <p className="text-[14px] text-black/60">
                Choose a conversation from the list to start chatting
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowSettings(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[20px] font-semibold text-black">Chat Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="w-8 h-8 rounded-lg hover:bg-black/5 transition-colors flex items-center justify-center"
              >
                <X className="w-5 h-5 text-black/60" weight="bold" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Avatar Upload */}
              <div>
                <label className="block text-[14px] font-medium text-black mb-2">Avatar</label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={settings.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&q=80'}
                      alt="Avatar"
                      className="w-20 h-20 rounded-full object-cover border-2 border-black/10"
                    />
                    {uploadingAvatar && (
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingAvatar}
                      className="px-4 py-2 rounded-lg bg-black text-white hover:bg-black/90 transition-colors text-[14px] font-medium disabled:opacity-50"
                    >
                      {uploadingAvatar ? 'Uploading...' : 'Change Avatar'}
                    </button>
                    <p className="text-[12px] text-black/50 mt-1">Max 5MB, JPG/PNG</p>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-[14px] font-medium text-black mb-2">Name</label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => setSettings(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="SUL ESTATE"
                  className="w-full px-4 py-3 rounded-lg border border-black/10 bg-white text-black placeholder:text-black/40 focus:outline-none focus:border-black/30 transition-all duration-200 text-[14px]"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-[14px] font-medium text-black mb-2">Title</label>
                <input
                  type="text"
                  value={settings.title}
                  onChange={(e) => setSettings(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Real Estate Consultant"
                  className="w-full px-4 py-3 rounded-lg border border-black/10 bg-white text-black placeholder:text-black/40 focus:outline-none focus:border-black/30 transition-all duration-200 text-[14px]"
                />
              </div>

              {/* Save Button */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-4 py-3 rounded-lg border border-black/10 bg-white text-black hover:bg-black/5 transition-colors text-[14px] font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="flex-1 px-4 py-3 rounded-lg bg-black text-white hover:bg-black/90 transition-colors text-[14px] font-medium"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  )
}
