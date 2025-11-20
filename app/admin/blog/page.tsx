"use client"

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Pencil, 
  Trash, 
  MagnifyingGlass,
  Funnel,
  Eye,
  EyeSlash,
  CalendarBlank,
  Tag,
  Clock,
  Article,
  CheckCircle,
  XCircle
} from '@phosphor-icons/react'
import { Button } from '../../../components/ui/button'
import { getBlogPosts, deleteBlogPost } from '../../../lib/admin-helpers'
import { BlogPost } from '../../../lib/admin-types'

type FilterType = 'all' | 'published' | 'draft'

export default function BlogPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setLoading(true)
      const data = await getBlogPosts()
      setPosts(data)
    } catch (error) {
      console.error('Error loading blog posts:', error)
      toast.error('Erro ao carregar posts', {
        description: 'Tente recarregar a página.',
      })
    } finally {
      setLoading(false)
    }
  }

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    let result = posts

    // Apply status filter
    if (filter === 'published') {
      result = result.filter(p => p.published === true)
    } else if (filter === 'draft') {
      result = result.filter(p => p.published !== true)
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.subtitle?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query) ||
        p.excerpt?.toLowerCase().includes(query)
      )
    }

    return result
  }, [posts, filter, searchQuery])

  // Statistics
  const stats = useMemo(() => {
    const total = posts.length
    const published = posts.filter(p => p.published === true).length
    const drafts = total - published
    return { total, published, drafts }
  }, [posts])

  const handleDelete = async (id: string) => {
    toast('Tem certeza que deseja excluir este post?', {
      description: 'Esta ação não pode ser desfeita.',
      action: {
        label: 'Excluir',
        onClick: async () => {
          try {
            await deleteBlogPost(id)
            await loadPosts()
            toast.success('Post excluído com sucesso!', {
              description: 'O post foi removido permanentemente.',
            })
          } catch (error) {
            console.error('Error deleting blog post:', error)
            toast.error('Erro ao excluir post', {
              description: 'Tente novamente ou verifique sua conexão.',
            })
          }
        },
      },
      cancel: {
        label: 'Cancelar',
        onClick: () => {},
      },
      duration: 5000,
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black/60">Carregando posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-black mb-2 tracking-tight">Blog Posts</h1>
          <p className="text-black/60">Gerencie seus artigos e conteúdo</p>
        </div>
        <Button
          onClick={() => router.push('/admin/blog/new')}
          className="bg-black text-white hover:bg-black/90 flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
        >
          <Plus className="w-5 h-5" weight="bold" />
          Novo Post
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-black/10 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-lg bg-black/5 flex items-center justify-center">
              <Article className="w-6 h-6 text-black" weight="duotone" />
            </div>
          </div>
          <p className="text-3xl font-semibold text-black mb-1">{stats.total}</p>
          <p className="text-sm text-black/60">Total de Posts</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-black/10 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" weight="duotone" />
            </div>
          </div>
          <p className="text-3xl font-semibold text-black mb-1">{stats.published}</p>
          <p className="text-sm text-black/60">Publicados</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-black/10 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center">
              <EyeSlash className="w-6 h-6 text-yellow-600" weight="duotone" />
            </div>
          </div>
          <p className="text-3xl font-semibold text-black mb-1">{stats.drafts}</p>
          <p className="text-sm text-black/60">Rascunhos</p>
        </motion.div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl border border-black/10 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" weight="duotone" />
            <input
              type="text"
              placeholder="Buscar posts por título, categoria ou conteúdo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-black/5 border border-black/10 rounded-lg focus:outline-none focus:border-black/30 focus:bg-white transition-all text-[15px]"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            <Funnel className="w-5 h-5 text-black/40" weight="duotone" />
            <div className="flex gap-2">
              {(['all', 'published', 'draft'] as FilterType[]).map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === filterType
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-black/5 text-black/70 hover:bg-black/10'
                  }`}
                >
                  {filterType === 'all' ? 'Todos' : filterType === 'published' ? 'Publicados' : 'Rascunhos'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      {filteredPosts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-black/10 p-16 text-center"
        >
          {posts.length === 0 ? (
            <>
              <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center mx-auto mb-4">
                <Article className="w-8 h-8 text-black/40" weight="duotone" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Nenhum post ainda</h3>
              <p className="text-black/60 mb-6">Comece criando seu primeiro artigo</p>
              <Button
                onClick={() => router.push('/admin/blog/new')}
                className="bg-black text-white hover:bg-black/90"
              >
                <Plus className="w-5 h-5 mr-2" />
                Criar Primeiro Post
              </Button>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center mx-auto mb-4">
                <MagnifyingGlass className="w-8 h-8 text-black/40" weight="duotone" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Nenhum resultado encontrado</h3>
              <p className="text-black/60 mb-6">
                Tente ajustar os filtros ou termo de busca
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('')
                  setFilter('all')
                }}
                variant="outline"
              >
                Limpar Filtros
              </Button>
            </>
          )}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="wait">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-xl border border-black/10 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                {/* Image Header */}
                {post.image ? (
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      {post.published ? (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/90 backdrop-blur-sm rounded-full shadow-sm">
                          <Eye className="w-3.5 h-3.5 text-white" weight="fill" />
                          <span className="text-xs font-semibold text-white">Publicado</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/90 backdrop-blur-sm rounded-full shadow-sm">
                          <EyeSlash className="w-3.5 h-3.5 text-white" weight="fill" />
                          <span className="text-xs font-semibold text-white">Rascunho</span>
                        </div>
                      )}
                    </div>

                    {/* Category Badge */}
                    {post.category && (
                      <div className="absolute top-4 left-4">
                        <div className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-sm">
                          <span className="text-xs font-semibold text-black uppercase tracking-wider">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                    <Article className="w-16 h-16 text-gray-300" weight="duotone" />
                    <div className="absolute top-4 right-4">
                      {post.published ? (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/90 backdrop-blur-sm rounded-full shadow-sm">
                          <Eye className="w-3.5 h-3.5 text-white" weight="fill" />
                          <span className="text-xs font-semibold text-white">Publicado</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/90 backdrop-blur-sm rounded-full shadow-sm">
                          <EyeSlash className="w-3.5 h-3.5 text-white" weight="fill" />
                          <span className="text-xs font-semibold text-white">Rascunho</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-black mb-2 line-clamp-2 group-hover:text-black/70 transition-colors">
                    {post.title}
                  </h3>
                  
                  {post.subtitle && (
                    <p className="text-sm text-black/60 mb-4 line-clamp-2 leading-relaxed">
                      {post.subtitle}
                    </p>
                  )}

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-3 mb-4 pb-4 border-b border-black/5">
                    {post.category && (
                      <div className="flex items-center gap-1.5 text-xs text-black/50">
                        <Tag className="w-3.5 h-3.5" weight="duotone" />
                        <span>{post.category}</span>
                      </div>
                    )}
                    {post.date && (
                      <div className="flex items-center gap-1.5 text-xs text-black/50">
                        <CalendarBlank className="w-3.5 h-3.5" weight="duotone" />
                        <span>{post.date}</span>
                      </div>
                    )}
                    {post.readTime && (
                      <div className="flex items-center gap-1.5 text-xs text-black/50">
                        <Clock className="w-3.5 h-3.5" weight="duotone" />
                        <span>{post.readTime}</span>
                      </div>
                    )}
                  </div>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-sm text-black/60 mb-6 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => router.push(`/admin/blog/${post.id}`)}
                      className="flex-1 bg-black text-white hover:bg-black/90 flex items-center justify-center gap-2"
                      size="sm"
                    >
                      <Pencil className="w-4 h-4" weight="bold" />
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleDelete(post.id!)}
                      className="bg-red-50 text-red-600 hover:bg-red-100 border-0 flex items-center justify-center"
                      size="sm"
                    >
                      <Trash className="w-4 h-4" weight="bold" />
                    </Button>
                    {post.published && (
                      <Button
                        onClick={() => {
                          window.open(`/blog/${post.id}`, '_blank')
                        }}
                        className="bg-black/5 text-black hover:bg-black/10 border-0 flex items-center justify-center"
                        size="sm"
                        title="Ver no site"
                      >
                        <Eye className="w-4 h-4" weight="bold" />
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}


