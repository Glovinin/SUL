"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { GridPattern } from '../../../components/ui/grid-pattern'
import { Footer } from '../../../components/Footer'
import { 
  ArrowLeft,
  CalendarBlank,
  Clock,
  User,
  ShareNetwork
} from '@phosphor-icons/react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useBlogPost, useBlogPosts } from '../../../lib/properties-client'

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const postId = params.id as string
  const { blogPost, loading, error } = useBlogPost(postId)
  const { blogPosts } = useBlogPosts()

  // Get related posts (same category, exclude current, limit to 3)
  const relatedPosts = blogPosts
    .filter(p => p.id !== postId && p.category === blogPost?.category)
    .slice(0, 3)

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-black/60">Loading article...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-black mb-4">Article not found</h1>
            <p className="text-black/60 mb-6">The article you're looking for doesn't exist or is not published.</p>
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-black hover:text-black/70 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative pt-28 md:pt-36 pb-12 md:pb-16 bg-white overflow-hidden">
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.015] stroke-black/[0.015]"
        />
        
        <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-12">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-black/60 hover:text-black transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" weight="bold" />
              <span className="text-[14px] font-medium">Back to Blog</span>
            </Link>
          </motion.div>

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <div className="inline-flex items-center px-4 py-2 bg-black/5 rounded-full">
              <span className="text-[12px] font-semibold text-black uppercase tracking-wider">
                {blogPost.category}
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[40px] md:text-[56px] lg:text-[64px] font-semibold text-black mb-6 tracking-[-0.03em] leading-[1.1]"
          >
            {blogPost.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[20px] md:text-[24px] font-normal text-black/70 mb-8 leading-[1.5]"
          >
            {blogPost.subtitle}
          </motion.p>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-6 pb-8 border-b border-black/10"
          >
            <div className="flex items-center gap-2 text-black/60">
              <CalendarBlank className="w-4 h-4" weight="duotone" />
              <span className="text-[14px] font-medium">{blogPost.date}</span>
            </div>
            <div className="flex items-center gap-2 text-black/60">
              <Clock className="w-4 h-4" weight="duotone" />
              <span className="text-[14px] font-medium">{blogPost.readTime}</span>
            </div>
            <div className="flex items-center gap-2 text-black/60">
              <User className="w-4 h-4" weight="duotone" />
              <div>
                <span className="text-[14px] font-medium">{blogPost.author.name}</span>
                <span className="text-[13px] text-black/50 ml-2">• {blogPost.author.role}</span>
              </div>
            </div>
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && navigator.share) {
                  navigator.share({
                    title: blogPost.title,
                    text: blogPost.subtitle,
                    url: window.location.href,
                  })
                }
              }}
              className="flex items-center gap-2 text-black/60 hover:text-black transition-colors duration-200"
            >
              <ShareNetwork className="w-4 h-4" weight="duotone" />
              <span className="text-[14px] font-medium">Share</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {blogPost.image && (
        <section className="relative -mt-8 mb-16">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative aspect-[16/9] overflow-hidden rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            >
              <div 
                className="absolute inset-0 bg-gray-200"
                style={{
                  backgroundImage: `url(${blogPost.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="relative py-12 md:py-20 bg-white">
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.02] stroke-black/[0.02]"
        />
        
        <div className="relative z-10 max-w-[800px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            {/* Excerpt */}
            {blogPost.excerpt && (
              <div className="mb-12 p-6 bg-black/5 rounded-2xl border-l-4 border-black">
                <p className="text-[18px] md:text-[20px] font-normal text-black/80 leading-[1.7] italic">
                  {blogPost.excerpt}
                </p>
              </div>
            )}

            {/* Content */}
            {blogPost.content ? (
              <div 
                className="text-[17px] md:text-[19px] font-normal text-black/80 leading-[1.8] space-y-6"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />
            ) : (
              <div className="text-[17px] md:text-[19px] font-normal text-black/80 leading-[1.8] space-y-6">
                <p>{blogPost.excerpt}</p>
                <p>Full article content coming soon...</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="relative py-20 md:py-32 bg-gray-50">
          <GridPattern
            width={40}
            height={40}
            className="fill-black/[0.02] stroke-black/[0.02]"
          />
          
          <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-[36px] md:text-[48px] font-semibold text-black mb-4 tracking-[-0.02em]">
                Related Articles
              </h2>
              <p className="text-[17px] text-black/60">
                Continue reading about {blogPost.category}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <Link href={`/blog/${post.id}`}>
                    {/* Post Image */}
                    <div className="relative aspect-[16/11] overflow-hidden mb-6 rounded-[20px] bg-gray-100 shadow-sm group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
                      {post.image ? (
                        <div 
                          className="absolute inset-0 bg-gray-200"
                          style={{
                            backgroundImage: `url(${post.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">No image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                          <span className="text-[11px] font-semibold text-black uppercase tracking-wider">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div>
                      <h3 className="text-[20px] font-semibold text-black mb-2 tracking-[-0.02em] leading-[1.2] group-hover:text-black/70 transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-[14px] font-normal text-black/60 mb-4 leading-[1.6] line-clamp-2">
                        {post.subtitle}
                      </p>
                      <div className="flex items-center gap-4 text-black/50">
                        <span className="text-[12px] font-medium">{post.date}</span>
                        <span className="text-[12px] font-medium">•</span>
                        <span className="text-[12px] font-medium">{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}

