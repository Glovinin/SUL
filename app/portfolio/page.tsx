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
import { CallToAction } from '../../components/CallToAction'
import { usePortfolio } from '../../lib/properties-client'
import { ListingCard } from '@/components/listing-card'
import { useHeroImage } from '../../hooks/useHeroImage'

export default function PortfolioPage() {
  const router = useRouter()
  const { portfolioItems, loading } = usePortfolio()
  const heroImage = useHeroImage('portfolio', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=80')



  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-black pt-[72px]">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroImage}
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
            {/* <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8">
              <span className="text-[12px] font-medium text-white/90">Portfolio</span>
            </div> */ /* Removed to match Homepage clean style */}
            <h1 className="text-[48px] md:text-[72px] lg:text-[80px] font-semibold tracking-[-0.03em] text-white leading-[1.05] mb-6">
              OUR PORTFOLIO
            </h1>
            <p className="text-[18px] md:text-[22px] font-normal text-white/85 max-w-[800px] mx-auto leading-[1.6]">
              A curated selection of projects led, coordinated or orchestrated by SUL for our clients and our own portfolio.
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
              {portfolioItems.map((item, index) => (
                <ListingCard
                  key={item.id}
                  id={item.id}
                  href={`/portfolio/${item.id}`}
                  image={item.image}
                  title={item.title}
                  location={item.location}
                  tag={item.tag}
                  featured={item.featured}
                  stats={{
                    beds: item.beds,
                    baths: item.baths,
                    sqft: item.sqft
                  }}
                />
              ))}
            </div>
          )}

          {!loading && portfolioItems.length === 0 && (
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
      <CallToAction />

      {/* Footer */}
      <Footer />
    </div>
  )
}

