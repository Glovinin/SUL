"use client"

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../components/ui/button'
import { GridPattern } from '../../components/ui/grid-pattern'
import { NavBar } from '../../components/navbar'
import { Footer } from '../../components/Footer'
import { 
  ArrowRight,
  User,
  CalendarBlank,
  Clock,
  Tag
} from '@phosphor-icons/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useBlogPosts } from '../../lib/properties-client'

export default function BlogPage() {
  const router = useRouter()
  const { blogPosts, loading } = useBlogPosts()
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Extract unique categories from posts
  const categories = useMemo(() => {
    const cats = new Set<string>(['All'])
    blogPosts.forEach(post => {
      if (post.category) {
        cats.add(post.category)
      }
    })
    return Array.from(cats)
  }, [blogPosts])

  // Filter posts by category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') {
      return blogPosts
    }
    return blogPosts.filter(post => post.category === selectedCategory)
  }, [blogPosts, selectedCategory])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <NavBar />

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 bg-white">
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.02] stroke-black/[0.02]"
        />
        
        <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6">
              <span className="text-[12px] font-medium text-black/60">Latest Insights</span>
            </div>
            
            <h1 className="text-[40px] md:text-[64px] lg:text-[72px] font-semibold text-black mb-6 tracking-[-0.03em] leading-[1.1]">
              Blog & Insights
            </h1>
            
            <p className="text-[17px] md:text-[21px] font-normal text-black/60 max-w-[800px] mx-auto leading-[1.6]">
              Expert perspectives on Portugal's real estate market, investment strategies, and lifestyle insights
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="relative py-12 bg-white border-b border-black/5">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-black/5 text-black/70 hover:bg-black/10'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="relative py-20 md:py-32 bg-white">
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.02] stroke-black/[0.02]"
        />
        
        <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
              <p className="text-black/60">Loading blog posts...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12"
              >
                {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group cursor-pointer"
                >
                  {/* Post Image */}
                  <div className="relative aspect-[16/11] overflow-hidden mb-6 rounded-[24px] bg-gray-100 shadow-sm group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
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
                    {/* Overlay on hover */}
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
                  <div className="px-1">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 text-black/50">
                        <CalendarBlank className="w-4 h-4" weight="duotone" />
                        <span className="text-[12px] font-medium">{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-black/50">
                        <Clock className="w-4 h-4" weight="duotone" />
                        <span className="text-[12px] font-medium">{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-[22px] md:text-[24px] font-semibold text-black mb-3 tracking-[-0.02em] leading-[1.2] group-hover:text-black/70 transition-colors duration-300">
                      {post.title}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-[15px] font-normal text-black/60 mb-4 leading-[1.6]">
                      {post.subtitle}
                    </p>

                    {/* Excerpt */}
                    <p className="text-[14px] font-normal text-black/50 mb-6 leading-[1.6] line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-3 pt-5 border-t border-black/5">
                      <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                        <User className="w-5 h-5 text-black/40" weight="duotone" />
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-black">{post.author.name}</div>
                        <div className="text-[12px] font-normal text-black/50">{post.author.role}</div>
                      </div>
                    </div>

                    {/* Read More Link */}
                    <div className="mt-6">
                      <Link 
                        href={`/blog/${post.id}`}
                        className="flex items-center gap-2 text-[14px] font-medium text-black/70 hover:text-black transition-colors duration-200 group/btn"
                      >
                        Read Article
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" weight="bold" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* No Results */}
          {!loading && filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-[17px] text-black/50">
                {blogPosts.length === 0 
                  ? 'No blog posts available yet.' 
                  : 'No articles found in this category.'}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-24 md:py-32 bg-black">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8"
            >
              <span className="text-[12px] font-medium text-white/90">Stay Updated</span>
            </motion.div>

            <h2 className="text-[36px] md:text-[52px] font-semibold text-white mb-6 tracking-[-0.02em] leading-[1.1]">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-[17px] md:text-[20px] font-normal text-white/80 mb-10 max-w-[700px] mx-auto leading-[1.6]">
              Get the latest insights on Portugal's real estate market delivered directly to your inbox
            </p>

            <form className="max-w-[500px] mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/40 px-6 py-4 rounded-full focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200 text-[15px]"
                  required
                />
                <Button 
                  type="submit"
                  className="bg-white text-black hover:bg-white/90 border-0 px-8 py-4 rounded-full text-[15px] font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" weight="bold" />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-black/[0.03]"></div>

      {/* Call to Action Section - Apple Style */}
      <section className="py-20 md:py-28 bg-black">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[900px] mx-auto px-6 md:px-12 text-center"
        >
          <h2 className="text-[40px] md:text-[56px] font-semibold text-white mb-8 tracking-[-0.02em] leading-[1.15]">
            Every search is unique.
          </h2>
          <p className="text-[17px] md:text-[21px] font-normal text-white/80 mb-12 max-w-[640px] mx-auto leading-[1.5]">
            Share your vision — we'll curate a personalized selection for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button 
              onClick={() => router.push('/find-property')}
              className="bg-white text-black hover:bg-white/95 border-0 px-8 py-3.5 rounded-full text-[16px] font-medium transition-all duration-200 min-w-[200px] shadow-sm hover:shadow-md"
            >
              Start your search
            </Button>
            <Button 
              onClick={() => window.open('https://wa.me/33662527879', '_blank')}
              className="bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/30 px-8 py-3.5 rounded-full text-[16px] font-medium transition-all duration-200 min-w-[200px]"
            >
              Book a Free Call
            </Button>
          </div>
          <div className="pt-8 border-t border-white/10">
            <Button 
              onClick={() => router.push('/contact?action=sell')}
              className="bg-transparent text-white hover:bg-white/10 border border-white/30 hover:border-white/40 px-8 py-3.5 rounded-full text-[16px] font-medium transition-all duration-200"
            >
              SELL WITH US — Tell us about your property
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

