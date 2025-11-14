"use client"

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Upload, X } from '@phosphor-icons/react'
import { Button } from '../../../../components/ui/button'
import {
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  uploadBlogImage,
} from '../../../../lib/admin-helpers'
import { BlogPost } from '../../../../lib/admin-types'

export default function BlogEditPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const isNew = id === 'new'

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [post, setPost] = useState<Partial<BlogPost>>({
    title: '',
    subtitle: '',
    image: '',
    readTime: '5 min read',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    category: '',
    author: {
      name: 'Vincent Santos',
      role: 'Real Estate Expert',
    },
    excerpt: '',
    content: '',
    published: false,
  })

  useEffect(() => {
    if (!isNew) {
      loadPost()
    }
  }, [id])

  const loadPost = async () => {
    try {
      setLoading(true)
      const data = await getBlogPost(id)
      if (data) {
        setPost(data)
      }
    } catch (error) {
      console.error('Error loading blog post:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const postId = isNew ? 'temp' : id
      const url = await uploadBlogImage(file, postId)
      setPost({ ...post, image: url })
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isNew) {
        await createBlogPost(post as Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>)
      } else {
        await updateBlogPost(id, post)
      }
      router.push('/admin/blog')
    } catch (error) {
      console.error('Error saving blog post:', error)
      alert('Failed to save blog post')
    } finally {
      setLoading(false)
    }
  }

  if (loading && !isNew) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black/60">Loading blog post...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          onClick={() => router.back()}
          className="bg-black/5 text-black hover:bg-black/10"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-semibold text-black">
            {isNew ? 'Create Blog Post' : 'Edit Blog Post'}
          </h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-black/10 p-8 space-y-8 shadow-sm">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-black mb-3">Featured Image</label>
          <div className="flex items-center gap-4">
            {post.image && (
              <div className="relative w-40 h-40 rounded-xl overflow-hidden bg-gray-100 border border-black/10 shadow-sm">
                <img src={post.image} alt="Blog post" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setPost({ ...post, image: '' })}
                  className="absolute top-2 right-2 bg-black/80 text-white rounded-full p-1.5 hover:bg-black transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <label className="cursor-pointer">
              <div className="px-6 py-3 bg-black text-white hover:bg-black/90 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm hover:shadow-md">
                <Upload className="w-4 h-4" />
                {uploading ? 'Uploading...' : post.image ? 'Change Image' : 'Upload Image'}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-black mb-2.5">Title *</label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-lg focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all"
              placeholder="Enter blog post title"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-black mb-2.5">Subtitle *</label>
            <input
              type="text"
              value={post.subtitle}
              onChange={(e) => setPost({ ...post, subtitle: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-lg focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all"
              placeholder="Enter subtitle or brief description"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2.5">Category *</label>
            <input
              type="text"
              value={post.category}
              onChange={(e) => setPost({ ...post, category: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-lg focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all"
              placeholder="Market Trends"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2.5">Read Time</label>
            <input
              type="text"
              value={post.readTime}
              onChange={(e) => setPost({ ...post, readTime: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-lg focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all"
              placeholder="5 min read"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2.5">Date</label>
            <input
              type="text"
              value={post.date}
              onChange={(e) => setPost({ ...post, date: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-lg focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all"
              placeholder="November 15, 2024"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2.5">Author Name</label>
            <input
              type="text"
              value={post.author?.name}
              onChange={(e) =>
                setPost({
                  ...post,
                  author: { ...post.author!, name: e.target.value },
                })
              }
              className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-lg focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all"
              placeholder="Vincent Santos"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2.5">Excerpt *</label>
          <textarea
            value={post.excerpt}
            onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-lg focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all resize-none"
            placeholder="Enter a brief excerpt for the blog post..."
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2.5">Content</label>
          <textarea
            value={post.content || ''}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            rows={16}
            className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-lg focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 text-black placeholder:text-black/40 transition-all resize-none font-mono text-sm"
            placeholder="Full article content (markdown supported)..."
          />
        </div>

        {/* Published */}
        <div className="flex items-center gap-3 p-4 bg-black/5 rounded-lg border border-black/10">
          <input
            type="checkbox"
            id="published"
            checked={post.published || false}
            onChange={(e) => setPost({ ...post, published: e.target.checked })}
            className="w-5 h-5 rounded border-2 border-black/20 text-black focus:ring-2 focus:ring-black/20 cursor-pointer"
          />
          <label htmlFor="published" className="text-sm font-semibold text-black cursor-pointer">
            Publish immediately
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-6 border-t border-black/10">
          <Button
            type="submit"
            disabled={loading}
            className="bg-black text-white hover:bg-black/90 px-8 py-3 text-base font-semibold shadow-sm hover:shadow-md transition-all"
          >
            {loading ? 'Saving...' : isNew ? 'Create Post' : 'Save Changes'}
          </Button>
          <Button
            type="button"
            onClick={() => router.back()}
            className="bg-white border-2 border-black/10 text-black hover:bg-black/5 px-8 py-3 text-base font-semibold transition-all"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

