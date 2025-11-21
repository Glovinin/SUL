"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/button'
import { GridPattern } from '../../components/ui/grid-pattern'
import { NavBar } from '../../components/navbar'
import { Footer } from '../../components/Footer'
import { useRouter } from 'next/navigation'
import { Bank, Sparkle, PaintBrush } from '@phosphor-icons/react'

export default function PortugalPage() {
  const router = useRouter()
  
  const locations = [
    {
      name: 'Lisbon',
      description: 'Historic charm meets cosmopolitan living',
      image: 'https://images.unsplash.com/photo-1585208798174-202cedd5e8b0?w=1200&h=800&fit=crop&q=80&auto=format'
    },
    {
      name: 'Cascais Coast',
      description: 'Riviera elegance by the Atlantic',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop&q=80&auto=format'
    },
    {
      name: 'Comporta',
      description: 'Untouched nature, sophisticated retreat',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop&q=80&auto=format'
    },
    {
      name: 'Algarve',
      description: 'Sun, golf, and timeless beauty',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop&q=80&auto=format'
    }
  ]

  const benefits = [
    {
      icon: Bank,
      title: 'Stability & Safety',
      description: 'Political and economic stability combined with one of the world\'s safest environments'
    },
    {
      icon: Sparkle,
      title: 'Quality of Life',
      description: 'Exceptional climate, rich culture, and a lifestyle that balances tradition with modernity'
    },
    {
      icon: PaintBrush,
      title: 'Architecture & Design',
      description: 'From historic heritage to contemporary design, Portugal offers timeless aesthetic value'
    }
  ]

  const keywords = ['Stability', 'Safety', 'Architecture', 'Lifestyle', 'Quality of Life', 'Design', 'Culture']

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <NavBar />

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 bg-white">
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
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6">
              <span className="text-[12px] font-medium text-black/60">Why Portugal</span>
            </div>
            <h1 className="text-[48px] md:text-[64px] lg:text-[72px] font-semibold text-black mb-8 tracking-[-0.03em] leading-[1.1]">
              A rare equilibrium between lifestyle, stability and opportunity
            </h1>
            <p className="text-[17px] md:text-[21px] font-normal text-black/60 max-w-[760px] mx-auto leading-[1.6]">
              Portugal offers a unique blend of quality living, architectural heritage, and strategic investment potential
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-black/[0.03]"></div>

      {/* Why Portugal Benefits Section */}
      <section className="relative py-20 md:py-28 bg-white overflow-visible">
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.03] stroke-black/[0.03]"
        />
        
        <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12 overflow-visible">
          {/* Key Benefits Grid */}
          <div className="relative z-10 grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mb-16 overflow-visible px-0 py-4 md:p-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative bg-white rounded-3xl p-8 text-center cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 border border-black/[0.06] hover:border-black/[0.1] hover:-translate-y-1"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Icon className="w-8 h-8 text-black/70 group-hover:text-black transition-colors duration-300" weight="duotone" />
                  </div>
                  <h3 className="text-[20px] font-semibold text-black mb-3 tracking-tight group-hover:text-black/80 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-[15px] font-normal text-black/60 leading-[1.6]">
                    {benefit.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Visual Keywords */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-3 mt-12"
          >
            {keywords.map((keyword, index) => (
              <span 
                key={index}
                className="px-5 py-2.5 bg-black/5 hover:bg-black/8 rounded-full text-[13px] font-medium text-black/70 transition-all duration-200"
              >
                {keyword}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-black/[0.03]"></div>

      {/* Visual Gallery Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-[40px] md:text-[56px] font-semibold text-black mb-6 tracking-[-0.02em] leading-[1.1]">
              Discover Portugal's Finest Regions
            </h2>
            <p className="text-[17px] md:text-[21px] font-normal text-black/60 max-w-[760px] mx-auto leading-[1.6]">
              From historic cities to pristine coastlines, explore the diverse beauty of Portugal
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300"
              >
                <img 
                  src={location.image} 
                  alt={location.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-600">
                  <h3 className="text-[28px] md:text-[32px] font-bold text-white mb-2">
                    {location.name}
                  </h3>
                  <p className="text-[16px] md:text-[18px] font-light text-white/90">
                    {location.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
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

