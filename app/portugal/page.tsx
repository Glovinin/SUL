"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/button'
import { GridPattern } from '../../components/ui/grid-pattern'
import { Footer } from '../../components/Footer'
import { useRouter } from 'next/navigation'
import { Bank, Sparkle, PaintBrush, Buildings, Tree, ChartLine } from '@phosphor-icons/react'
import Image from 'next/image'

export default function PortugalPage() {
  const router = useRouter()
  
  const locations = [
    {
      name: 'Lisbon',
      description: 'Portugal\'s cultural and economic epicenter, where centuries-old architecture blends with modern design, global gastronomy and vibrant urban life. From historic Alfama to the riverfront of Belém and the cosmopolitan avenues of the city center, Lisbon offers a diverse property landscape with solid long-term fundamentals, sustained international demand and exceptional lifestyle convenience.',
      image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&h=800&fit=crop&q=80&auto=format'
    },
    {
      name: 'Cascais, Estoril & Sintra',
      description: 'The Lisbon Riviera brings together refined coastal living, sandy beaches, international schools and a privileged outdoor lifestyle. Cascais and Estoril offer marinas, golf, tennis and safe, elegant neighborhoods, while Sintra adds a mystical dimension with its UNESCO palaces, forested hills and romantic estates. A deeply established premium region valued for family life, comfort and long-term stability.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop&q=80&auto=format'
    },
    {
      name: 'South Lisbon & Arrábida',
      description: 'Aroeira, Caparica, Sesimbra, Meco and Setúbal form a dynamic coastal corridor where nature meets contemporary living. Here, vast pine forests, surf spots, golf courses and modern villas coexist minutes from Lisbon. The Arrábida Natural Park elevates the area with turquoise bays, protected beaches and dramatic cliffs — making it one of the most attractive lifestyle regions for buyers seeking space, beauty and accessibility.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop&q=80&auto=format'
    },
    {
      name: 'Comporta / Tróia / Melides',
      description: 'The epitome of understated luxury, defined by raw landscapes, dunes, rice fields and minimalist architecture. This region attracts an international clientele seeking privacy, design-led homes and a slower, nature-driven rhythm. Strict planning rules preserve its authenticity, resulting in ultra-limited supply and one of Portugal\'s most coveted high-end markets, ideal for distinctive residences and signature retreats.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop&q=80&auto=format'
    },
    {
      name: 'Algarve',
      description: 'A globally recognised destination where year-round sunshine, golden beaches, golf resorts and gated communities create a world-class lifestyle environment. From the dramatic cliffs of Lagos to the exclusive enclaves of Quinta do Lago and Vale do Lobo, the Algarve offers mature infrastructure, premium services, strong rental performance and broad international appeal — perfect for both primary and investment-driven buyers.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop&q=80&auto=format'
    },
    {
      name: 'Porto & Douro',
      description: 'Northern Portugal\'s cultural capital, blending historic architecture, modern riverfront regeneration, Michelin-starred cuisine and a growing luxury market. Porto provides urban sophistication and investment resilience, while the Douro Valley adds expansive vineyard estates, boutique hotel potential and breathtaking natural scenery. Together, they offer a compelling mix of heritage, lifestyle and opportunity.',
      image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&h=800&fit=crop&q=80&auto=format'
    },
    {
      name: 'Alentejo',
      description: 'A vast territory of rolling plains, olive groves, cork forests and vineyards. Renowned for its quiet sophistication, Alentejo offers secluded estates, farmhouses, eco-retreats and boutique hospitality projects. Whether inland or along the untouched coastline, the region provides wide-open spaces, privacy, authenticity and a deep sense of slow-living luxury, increasingly sought after by international buyers.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop&q=80&auto=format'
    },
    {
      name: 'Other Regions',
      description: '(Silver Coast • Ericeira & Mafra • Madeira) A curated selection of additional territories serviced upon request. The Silver Coast offers dramatic cliffs, surf towns and contemporary villas with growing expatriate demand. Ericeira & Mafra deliver a surf-chic lifestyle, protected coastlines and a creative community just outside Lisbon. Madeira, with its subtropical climate and dramatic landscapes, provides exceptional oceanfront living and is rising as a premium retreat destination. Each region brings unique scenery, lifestyle character and investment potential within Portugal\'s diverse geography.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop&q=80&auto=format'
    }
  ]

  const benefits = [
    {
      icon: Bank,
      title: 'Stability & Safety',
      description: 'A secure and reliable environment for long-term living and investment.'
    },
    {
      icon: Sparkle,
      title: 'Quality of Life',
      description: 'Exceptional climate, gastronomy and a warm, human-centered culture.'
    },
    {
      icon: PaintBrush,
      title: 'Architecture & Design',
      description: 'From historic charm to modern elegance, a country shaped by timeless aesthetics.'
    },
    {
      icon: Buildings,
      title: 'Culture & Heritage',
      description: 'Rich traditions, arts and craftsmanship that define Portugal\'s character.'
    },
    {
      icon: Tree,
      title: 'Lifestyle & Nature',
      description: 'Oceanfront living, green landscapes and a relaxed Mediterranean rhythm.'
    },
    {
      icon: ChartLine,
      title: 'Investment Confidence',
      description: 'A resilient market with strong demand and lasting value.'
    }
  ]

  const keywords = ['Stability', 'Safety', 'Architecture', 'Lifestyle', 'Quality of Life', 'Design', 'Culture']

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-black pt-[72px]">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1920&h=1080&fit=crop&q=80"
            alt="Lisbon, Portugal"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_80%)]"></div>
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
              <span className="text-[12px] font-medium text-white/90">About Portugal</span>
            </div>
            <h1 className="text-[48px] md:text-[72px] lg:text-[80px] font-semibold tracking-[-0.03em] text-white leading-[1.05] mb-6">
            Welcome to Portugal
            </h1>
            <p className="text-[18px] md:text-[22px] font-normal text-white/85 max-w-[800px] mx-auto leading-[1.6]">
            Portugal offers a rare balance of lifestyle, stability, safety, culture, authenticity, and opportunity. It’s a country where you can live beautifully — and invest wisely.
            </p>
          </motion.div>
        </div>
      </section>


      {/* Why Portugal Benefits Section */}
      <section className="relative py-20 md:py-28 bg-white overflow-visible">
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.03] stroke-black/[0.03]"
        />
        
        <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12 overflow-visible">
          {/* Key Benefits Grid */}
          <div className="relative z-10 grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mb-8 overflow-visible px-0 py-4 md:p-8">
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

      {/* Regions Section */}
      <section className="relative pt-12 md:pt-16 pb-20 md:pb-28 bg-white overflow-visible">
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
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-[40px] md:text-[56px] font-semibold text-black mb-6 tracking-[-0.02em] leading-[1.1]">
              Regions covered by SUL
            </h2>
            <p className="text-[17px] md:text-[21px] font-normal text-black/60 max-w-[760px] mx-auto leading-[1.6]">
              SUL supports clients across these key regions of Portugal, leveraging deep local networks and hands-on knowledge of each territory
            </p>
          </motion.div>
          
          <div className="space-y-16 md:space-y-24">
            {locations.map((location, index) => {
              const isEven = index % 2 === 0
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
                >
                  {/* Text Content */}
                  <div className={isEven ? '' : 'md:order-2'}>
                    <div className="border-t border-black/10 pt-6 mb-6">
                      <h3 className="text-[40px] md:text-[52px] lg:text-[56px] font-semibold text-black mb-6 tracking-[-0.02em] leading-[1.1]">
                        {location.name}
                      </h3>
                    </div>
                    <p className="text-[17px] md:text-[19px] font-normal text-black/70 leading-[1.7]">
                      {location.description}
                    </p>
                  </div>

                  {/* Image */}
                  <div className={isEven ? '' : 'md:order-1'}>
                    <div className="relative aspect-[3/4] max-w-[500px] mx-auto rounded-2xl overflow-hidden bg-gray-100 group">
                      <img 
                        src={location.image} 
                        alt={location.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  </div>
                </motion.div>
              )
            })}
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

