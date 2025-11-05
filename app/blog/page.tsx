"use client"

import React, { useState } from 'react'
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

// Blog posts data with more detailed information
const blogPosts = [
  {
    id: 1,
    title: 'High-end properties',
    subtitle: 'Luxury homebuyers and sellers are navigating changing market conditions',
    image: '/images/blog-1.jpg',
    readTime: '7 min read',
    date: 'November 15, 2024',
    category: 'Market Trends',
    author: {
      name: 'Vincent Santos',
      role: 'Real Estate Expert'
    },
    excerpt: 'The luxury real estate market is experiencing significant shifts as buyers and sellers adapt to new economic conditions. Understanding these trends is crucial for making informed decisions in the premium property segment.'
  },
  {
    id: 2,
    title: 'Investment trends 2024',
    subtitle: 'Key insights for property investment in Portugal\'s prime markets',
    image: '/images/blog-2.jpg',
    readTime: '5 min read',
    date: 'November 10, 2024',
    category: 'Investment',
    author: {
      name: 'Ana Silva',
      role: 'Market Analyst'
    },
    excerpt: 'Discover the emerging opportunities in Portugal\'s real estate market. From Lisbon to Algarve, we analyze the trends shaping investment strategies for 2024 and beyond.'
  },
  {
    id: 3,
    title: 'Coastal living guide',
    subtitle: 'Discovering the perfect beachfront property in Portugal',
    image: '/images/blog-3.jpg',
    readTime: '6 min read',
    date: 'November 5, 2024',
    category: 'Lifestyle',
    author: {
      name: 'João Costa',
      role: 'Property Consultant'
    },
    excerpt: 'Explore Portugal\'s stunning coastline and learn what makes beachfront properties a unique investment. From Comporta to Algarve, find your perfect coastal retreat.'
  },
  {
    id: 4,
    title: 'Renovation strategies',
    subtitle: 'Maximizing value through thoughtful property improvements',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=600&fit=crop&q=80',
    readTime: '8 min read',
    date: 'October 28, 2024',
    category: 'Development',
    author: {
      name: 'Miguel Ferreira',
      role: 'Renovation Specialist'
    },
    excerpt: 'Strategic renovation can significantly enhance property value. Learn about the most effective improvements that deliver the best return on investment in Portugal\'s premium market.'
  },
  {
    id: 5,
    title: 'Golden Visa update',
    subtitle: 'Latest changes to Portugal\'s residency program',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&q=80',
    readTime: '6 min read',
    date: 'October 20, 2024',
    category: 'Legal & Regulation',
    author: {
      name: 'Carolina Sousa',
      role: 'Legal Advisor'
    },
    excerpt: 'Stay informed about the recent modifications to Portugal\'s Golden Visa program and understand how they impact international real estate investors.'
  },
  {
    id: 6,
    title: 'Sustainable luxury',
    subtitle: 'Eco-friendly features in premium Portuguese properties',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop&q=80',
    readTime: '5 min read',
    date: 'October 12, 2024',
    category: 'Sustainability',
    author: {
      name: 'Teresa Alves',
      role: 'Sustainability Consultant'
    },
    excerpt: 'Modern luxury embraces sustainability. Discover how Portugal\'s premium properties are incorporating eco-friendly features without compromising on elegance and comfort.'
  }
]

const categories = ['All', 'Market Trends', 'Investment', 'Lifestyle', 'Development', 'Legal & Regulation', 'Sustainability']

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Filter posts by category
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

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
                    <div 
                      className="absolute inset-0 bg-gray-200"
                      style={{
                        backgroundImage: `url(${post.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
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
                      <button className="flex items-center gap-2 text-[14px] font-medium text-black/70 hover:text-black transition-colors duration-200 group/btn">
                        Read Article
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" weight="bold" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-[17px] text-black/50">No articles found in this category.</p>
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

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h2 className="text-[36px] md:text-[52px] font-semibold text-black mb-6 tracking-[-0.02em] leading-[1.1]">
              Ready to Start Your Journey?
            </h2>
            <p className="text-[17px] md:text-[20px] font-normal text-black/60 mb-10 max-w-[700px] mx-auto leading-[1.6]">
              Explore our curated collection of premium properties or get in touch with our team
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/properties">
                <Button 
                  className="bg-black text-white hover:bg-black/90 border-0 px-8 py-3 rounded-full text-[15px] font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
                >
                  View Properties
                  <ArrowRight className="w-4 h-4" weight="bold" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  variant="ghost"
                  className="bg-white text-black hover:bg-black/5 border border-black/10 hover:border-black/20 px-8 py-3 rounded-full text-[15px] font-semibold transition-all duration-200"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

