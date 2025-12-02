"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../components/ui/button'
import { GridPattern } from '../../components/ui/grid-pattern'
import { Footer } from '../../components/Footer'
import { 
  ArrowRight,
  Buildings,
  MagnifyingGlass,
  Eye,
  Wallet,
  GearSix,
  CheckCircle,
  Users,
  ChartLine,
  Lightbulb
} from '@phosphor-icons/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Detailed services data
const detailedServices = [
  {
    number: '01',
    icon: Buildings,
    title: 'Strategy & Advisory',
    image: '/assets/services-images/Strategy & Advisory.jpg',
    description: 'We deliver sharp market analysis and strategic guidance to help you make informed real estate decisions in Portugal — from identifying opportunities to optimizing your investments.'
  },
  {
    number: '02',
    icon: MagnifyingGlass,
    title: 'Property Search & Acquisition',
    image: '/assets/services-images/Property Search & Acquisition.jpg',
    description: 'We source and secure properties tailored to your vision, combining deep local insight and off-market access with full support through due diligence, negotiation and all legal steps of the acquisition.'
  },
  {
    number: '03',
    icon: Eye,
    title: 'Project Supervision',
    image: '/assets/services-images/Project Supervision.jpg',
    description: 'We oversee your renovation or construction project from concept to completion, ensuring quality, timelines, and budget are respected — with clear coordination, rigorous control, and regular reporting at every stage.'
  },
  {
    number: '04',
    icon: Wallet,
    title: 'Financing & Structuring',
    image: '/assets/services-images/Financing & Structuring.jpg',
    description: 'We guide you in securing the best financing and structuring for your investment, coordinating with trusted banking partners to obtain optimal terms and ensure full compliance.'
  },
  {
    number: '05',
    icon: GearSix,
    title: 'Property Management & Optimization',
    image: '/assets/services-images/Property Management & Optimization.jpg',
    description: 'We manage and optimize your property to preserve its value and maximize returns, handling everything from rentals and maintenance to financial reporting and strategic enhancements — all in full regulatory compliance.'
  }
]

const whyChooseUs = [
  {
    icon: Users,
    title: 'Local Expertise',
    description: 'Deep knowledge of Portugal\'s real estate market and local regulations'
  },
  {
    icon: ChartLine,
    title: 'Proven Track Record',
    description: 'Successfully guided numerous international clients through their Portuguese real estate journey'
  },
  {
    icon: Lightbulb,
    title: 'Tailored Approach',
    description: 'Every client receives personalized service aligned with their unique goals and vision'
  },
  {
    icon: CheckCircle,
    title: 'End-to-End Support',
    description: 'Comprehensive assistance from initial search to long-term property management'
  }
]

export default function ServicesPage() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-black pt-[72px]">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&h=1080&fit=crop&q=80"
            alt="Luxury Real Estate"
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
              <span className="text-[12px] font-medium text-white/90">Our Services</span>
            </div>
            <h1 className="text-[48px] md:text-[72px] lg:text-[80px] font-semibold tracking-[-0.03em] text-white leading-[1.05] mb-6">
            SUL ADVISORY & SERVICES
            </h1>
            <p className="text-[18px] md:text-[22px] font-normal text-white/85 max-w-[800px] mx-auto leading-[1.6]">
              From strategic guidance to project supervision, we provide end-to-end support for your Portuguese real estate journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section className="py-24 md:py-32 bg-gray-50 overflow-visible">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6">
              <span className="text-[12px] font-medium text-black/60">Services</span>
            </div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[36px] md:text-[48px] font-semibold text-black mb-6 tracking-[-0.02em] leading-[1.1]"
            >
              What We Offer
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-[17px] md:text-[20px] font-normal text-black/60 max-w-[700px] mx-auto leading-[1.6]"
            >
              Five core services designed to guide you through every stage of your real estate journey in Portugal
            </motion.p>
          </motion.div>

          {/* Services Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {detailedServices.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 border border-black/[0.06] hover:-translate-y-1 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    {/* Icon & Number */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-all duration-300">
                        <Icon className="w-6 h-6 text-black/70 group-hover:text-black transition-colors duration-300" weight="duotone" />
                      </div>
                      <span className="text-[36px] font-light text-black/10 group-hover:text-black/20 transition-colors duration-300 tabular-nums">{service.number}</span>
                    </div>

                    {/* Title & Description */}
                    <div className="flex-1">
                      <h3 className="text-[22px] md:text-[24px] font-semibold text-black mb-3 tracking-tight leading-tight">{service.title}</h3>
                      <p className="text-[15px] md:text-[16px] font-normal text-black/70 leading-[1.6]">
                        {service.description}
                      </p>
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

      {/* Partners & Network Section - Premium Apple Style */}
      <section id="partners" className="relative py-32 md:py-40 bg-white overflow-visible">
        {/* Static Grid Background */}
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.03] stroke-black/[0.03]"
        />
        
        <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12 overflow-visible">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6">
              <span className="text-[12px] font-medium text-black/60">🎼 Trusted Ecosystem</span>
            </div>
            
            {/* Main Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[40px] md:text-[56px] font-semibold text-black mb-8 tracking-[-0.02em] leading-[1.1] max-w-[900px] mx-auto"
            >
              Trusted Ecosystem
            </motion.h2>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-[17px] md:text-[21px] font-normal text-black/60 max-w-[900px] mx-auto leading-[1.6]"
            >
              Surrounded by a handpicked network of professionals — lawyers, architects, engineers, designers and financial partners — SUL acts as the conductor of each project, from strategy to delivery.
            </motion.p>
          </motion.div>

          {/* Partners Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 overflow-visible px-0 py-4 md:p-8">
            {/* Legal Advisors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-white border border-black/[0.06] hover:border-black/[0.12] rounded-3xl p-8 text-center transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] cursor-pointer hover:-translate-y-1 z-[1] hover:z-[10]"
            >
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-[18px] font-semibold text-black mb-3 tracking-tight group-hover:text-black/80 transition-colors duration-300">
                Legal Advisors
              </h3>
              <p className="text-[14px] font-semibold text-black/80 mb-2 leading-[1.4]">
                Secure Transactions
              </p>
              <p className="text-[14px] font-normal text-black/60 leading-[1.6]">
                Expert lawyers ensuring safe, compliant and efficient legal processes from start to finish.
              </p>
            </motion.div>

            {/* Architects & Engineers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-white border border-black/[0.06] hover:border-black/[0.12] rounded-3xl p-8 text-center transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] cursor-pointer hover:-translate-y-1 z-[1] hover:z-[10]"
            >
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="text-[18px] font-semibold text-black mb-3 tracking-tight group-hover:text-black/80 transition-colors duration-300">
                Architects & Engineers
              </h3>
              <p className="text-[14px] font-semibold text-black/80 mb-2 leading-[1.4]">
                Structural & Architectural Excellence
              </p>
              <p className="text-[14px] font-normal text-black/60 leading-[1.6]">
                Award-winning studios and engineering teams creating solid foundations and timeless, context-driven design.
              </p>
            </motion.div>

            {/* Designers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-white border border-black/[0.06] hover:border-black/[0.12] rounded-3xl p-8 text-center transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] cursor-pointer hover:-translate-y-1 z-[1] hover:z-[10]"
            >
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-[18px] font-semibold text-black mb-3 tracking-tight group-hover:text-black/80 transition-colors duration-300">
                Designers
              </h3>
              <p className="text-[14px] font-semibold text-black/80 mb-2 leading-[1.4]">
                Refined Interior Aesthetics
              </p>
              <p className="text-[14px] font-normal text-black/60 leading-[1.6]">
                Interior specialists crafting coherent, elegant and long-lasting atmospheres tailored to each project.
              </p>
            </motion.div>

            {/* Financial Partners */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-white border border-black/[0.06] hover:border-black/[0.12] rounded-3xl p-8 text-center transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] cursor-pointer hover:-translate-y-1 z-[1] hover:z-[10]"
            >
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-[18px] font-semibold text-black mb-3 tracking-tight group-hover:text-black/80 transition-colors duration-300">
                Financial Partners
              </h3>
              <p className="text-[14px] font-semibold text-black/80 mb-2 leading-[1.4]">
                Strategic Financial Guidance
              </p>
              <p className="text-[14px] font-normal text-black/60 leading-[1.6]">
                Banks and financial advisors providing optimal financing solutions, investment structure and long-term planning.
              </p>
            </motion.div>
          </div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-3 mt-8"
          >
            {['Quality', 'Discretion', 'Excellence'].map((value, index) => (
              <span 
                key={index}
                className="px-5 py-2.5 bg-black/5 hover:bg-black/8 rounded-full text-[13px] font-medium text-black/70 transition-all duration-200"
              >
                {value}
              </span>
            ))}
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

