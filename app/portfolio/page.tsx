"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/button'
import { GridPattern } from '../../components/ui/grid-pattern'
import { Footer } from '../../components/Footer'
import { 
  Bed,
  Bathtub,
  ArrowsOut,
  ArrowRight
} from '@phosphor-icons/react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { usePortfolio } from '../../lib/properties-client'

export default function PortfolioPage() {
  const router = useRouter()
  const { portfolioItems, loading } = usePortfolio()

  // Sort portfolio items: featured first, then by creation date
  const sortedPortfolioItems = [...portfolioItems].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-black pt-[72px]">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=80"
            alt="Portfolio"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 md:px-12 py-20 md:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8">
              <span className="text-[12px] font-medium text-white/90">Portfolio</span>
            </div>
            <h1 className="text-[48px] md:text-[72px] lg:text-[80px] font-semibold tracking-[-0.03em] text-white leading-[1.05] mb-6">
              OUR PORTFOLIO
            </h1>
            <p className="text-[18px] md:text-[22px] font-normal text-white/85 max-w-[800px] mx-auto leading-[1.6]">
              A curated selection of projects led, coordinated or orchestrated by SUL — for our clients and our own portfolio.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="relative py-12 md:py-20 bg-white">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
              <p className="text-black/60">Loading portfolio...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-0 py-4 md:p-8 lg:p-12 overflow-visible">
              {sortedPortfolioItems.map((item, index) => (
                <Link key={item.id} href={`/portfolio/${item.id}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="group cursor-pointer z-[1] hover:z-[10] hover:-translate-y-1 transition-all duration-300"
                >
                {/* Property Image Container - Premium Apple Style */}
                <div className="relative aspect-[4/5] md:aspect-[16/11] lg:aspect-[4/5] overflow-hidden mb-7 rounded-[24px] shadow-sm group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out bg-gray-100">
                  {/* Image com zoom suave */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center transition-transform duration-800 ease-out group-hover:scale-[1.08]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ 
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                  
                  {/* Tag Badge - Ultra Premium */}
                  <div className="absolute top-6 left-6 z-20">
                    <div className="bg-white/95 backdrop-blur-2xl px-4 py-2 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                      <span className="text-[10px] font-semibold text-black tracking-[0.08em] uppercase">{item.tag || 'Sold'}</span>
                    </div>
                  </div>
                  
                  {/* Overlay Premium - Aparece no hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
                  
                  {/* Shine Effect - Apple Style */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
                  </div>
                </div>
                
                {/* Property Details - Ultra Clean Typography */}
                <div className="px-1">
                  {/* Location - Subtle */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-1 rounded-full bg-black/20"></div>
                    <p className="text-[11px] font-medium text-black/40 tracking-[0.1em] uppercase">
                      {item.location}
                    </p>
                  </div>
                  
                  {/* Title - Bold & Clean */}
                  <h3 className="text-[20px] md:text-[22px] font-semibold text-black mb-4 tracking-[-0.02em] leading-[1.2] group-hover:text-black/60 transition-colors duration-500">
                    {item.title}
                  </h3>
                  
                  {/* Property Stats - Refined */}
                  <div className="flex items-center gap-6 pt-5 border-t border-black/[0.06]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-black/[0.03] flex items-center justify-center group-hover:bg-black/[0.05] transition-colors duration-300">
                        <Bed className="w-[17px] h-[17px] text-black/50" weight="duotone" />
                      </div>
                      <span className="text-[14px] font-medium text-black/70">{item.beds}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-black/[0.03] flex items-center justify-center group-hover:bg-black/[0.05] transition-colors duration-300">
                        <Bathtub className="w-[17px] h-[17px] text-black/50" weight="duotone" />
                      </div>
                      <span className="text-[14px] font-medium text-black/70">{item.baths}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-black/[0.03] flex items-center justify-center group-hover:bg-black/[0.05] transition-colors duration-300">
                        <ArrowsOut className="w-[17px] h-[17px] text-black/50" weight="duotone" />
                      </div>
                      <span className="text-[14px] font-medium text-black/70">{item.sqft}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              </Link>
            ))}
            </div>
          )}

          {!loading && sortedPortfolioItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-[17px] text-black/50">No portfolio items found.</p>
            </motion.div>
          )}
        </div>
      </section>

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
          <div className="flex flex-col items-center justify-center gap-4 mb-8">
            <Button 
              onClick={() => router.push('/find-property')}
              className="bg-white text-black hover:bg-white/95 border-0 px-8 py-3.5 rounded-full text-[16px] font-medium transition-all duration-200 w-[280px] shadow-sm hover:shadow-md"
            >
              Invest / Buy with us
            </Button>
            <Button 
              onClick={() => router.push('/find-property')}
              className="bg-white text-black hover:bg-white/95 border-0 px-8 py-3.5 rounded-full text-[16px] font-medium transition-all duration-200 w-[280px] shadow-sm hover:shadow-md"
            >
              Sell with us
            </Button>
            <Button 
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.open('https://calendly.com/jules-portugal/45min', '_blank')
                }
              }}
              className="bg-white text-black hover:bg-white/95 border-0 px-8 py-3.5 rounded-full text-[16px] font-medium transition-all duration-200 w-[280px] shadow-sm hover:shadow-md"
            >
              Book a free call
            </Button>
            <Button 
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.open('https://wa.me/33662527879', '_blank')
                }
              }}
              className="bg-white text-black hover:bg-white/95 border-0 px-8 py-3.5 rounded-full text-[16px] font-medium transition-all duration-200 w-[280px] shadow-sm hover:shadow-md"
            >
              Speak with us on WhatsApp
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

