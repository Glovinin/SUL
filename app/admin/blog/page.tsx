"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Plus, Pencil, Trash } from '@phosphor-icons/react'
import { Button } from '../../../components/ui/button'
import { getBlogPosts, deleteBlogPost } from '../../../lib/admin-helpers'
import { BlogPost } from '../../../lib/admin-types'

export default function BlogPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

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
    } finally {
      setLoading(false)
    }
  }

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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black/60">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-black mb-2">Blog</h1>
          <p className="text-black/60">Manage your blog articles</p>
        </div>
        <Button
          onClick={() => router.push('/admin/blog/new')}
          className="bg-black text-white hover:bg-black/90 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Post
        </Button>
      </div>

      {/* Blog Posts List */}
      {posts.length === 0 ? (
        <div className="bg-white rounded-xl border border-black/10 p-12 text-center">
          <p className="text-black/60 mb-4">No blog posts yet</p>
          <Button
            onClick={() => router.push('/admin/blog/new')}
            className="bg-black text-white hover:bg-black/90"
          >
            Create Your First Post
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-black/10 overflow-hidden">
          <div className="divide-y divide-black/5">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-6 hover:bg-black/5 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {post.image && (
                    <div className="w-24 h-24 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-semibold text-black mb-1">{post.title}</h3>
                        <p className="text-sm text-black/60 line-clamp-2">{post.subtitle}</p>
                      </div>
                      {!post.published && (
                        <span className="text-xs px-2 py-1 bg-yellow-50 text-yellow-600 rounded flex-shrink-0">
                          Draft
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-black/40 mb-3">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <p className="text-sm text-black/60 line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => router.push(`/admin/blog/${post.id}`)}
                        className="bg-black/5 text-black hover:bg-black/10"
                        size="sm"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(post.id!)}
                        className="bg-red-50 text-red-600 hover:bg-red-100"
                        size="sm"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


