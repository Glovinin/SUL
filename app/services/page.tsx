"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../components/ui/button'
import { GridPattern } from '../../components/ui/grid-pattern'
import { NavBar } from '../../components/navbar'
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
    subtitle: 'Strategic guidance for informed decisions',
    description: 'We provide comprehensive analysis and strategic counsel to help you make informed real estate decisions in Portugal. From market analysis to investment strategy, we guide you through every consideration.',
    features: [
      'Market analysis and opportunity assessment',
      'Investment strategy development',
      'Portfolio optimization consulting',
      'Risk assessment and mitigation',
      'Long-term planning and projections'
    ]
  },
  {
    number: '02',
    icon: MagnifyingGlass,
    title: 'Property Search & Acquisition',
    subtitle: 'Curated selection tailored to your vision',
    description: 'We identify and secure properties that align with your specific requirements, leveraging our deep local knowledge and exclusive network to find opportunities that match your vision.',
    features: [
      'Personalized property search',
      'Off-market opportunity access',
      'Due diligence and verification',
      'Negotiation and acquisition support',
      'Legal and administrative coordination'
    ]
  },
  {
    number: '03',
    icon: Eye,
    title: 'Project Supervision',
    subtitle: 'Oversight from concept to completion',
    description: 'From renovation to new construction, we oversee every aspect of your project, ensuring quality, timeline, and budget are maintained while you remain informed at every stage.',
    features: [
      'Project planning and design coordination',
      'Contractor selection and management',
      'Quality control and inspection',
      'Timeline and budget oversight',
      'Regular progress reporting'
    ]
  },
  {
    number: '04',
    icon: Wallet,
    title: 'Financing & Structuring',
    subtitle: 'Optimal financing solutions',
    description: 'We help you navigate financing options and structure your investment optimally, working with trusted banking partners to secure favorable terms for your Portuguese real estate venture.',
    features: [
      'Financing options analysis',
      'Banking relationship coordination',
      'Investment structure optimization',
      'Tax efficiency consulting',
      'Documentation and compliance support'
    ]
  },
  {
    number: '05',
    icon: GearSix,
    title: 'Property Management & Optimization',
    subtitle: 'Long-term value enhancement',
    description: 'We ensure your property maintains its value and generates optimal returns through comprehensive management, from rental coordination to maintenance oversight and value enhancement strategies.',
    features: [
      'Rental management and tenant relations',
      'Maintenance coordination and oversight',
      'Financial reporting and analysis',
      'Value enhancement recommendations',
      'Local regulatory compliance'
    ]
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
      <NavBar />

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
              Comprehensive Real Estate Solutions
            </h1>
            <p className="text-[18px] md:text-[22px] font-normal text-white/85 max-w-[800px] mx-auto leading-[1.6]">
              From strategic guidance to project supervision, we provide end-to-end support for your Portuguese real estate journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* About SUL Section */}
      <section className="relative py-24 md:py-32 bg-white overflow-visible">
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.02] stroke-black/[0.02]"
        />
        
        <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <div className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6">
              <span className="text-[12px] font-medium text-black/60">About SUL</span>
            </div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[36px] md:text-[48px] font-semibold text-black mb-8 tracking-[-0.02em] leading-[1.1]"
            >
              Your Trusted Partner in Portuguese Real Estate
            </motion.h2>
            
            <div className="space-y-6 text-[17px] md:text-[20px] font-normal text-black/70 leading-[1.7] max-w-[900px] mx-auto">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                Based in Lisbon, SUL supports clients throughout Portugal, combining local expertise, strategic insight, and trusted partnerships to deliver exceptional results.
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                Our mission is to analyze, source, enhance, and manage properties of character and distinction. Whether you're looking for a smart investment or your ideal home, we act as your trusted advisor and orchestrator.
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                We have guided numerous international clients from around the world in their real estate journeys across Portugal.
              </motion.p>
            </div>

            {/* Quote */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 p-8 border-l-4 border-black/20 bg-gray-50 rounded-r-2xl max-w-[700px] mx-auto"
            >
              <p className="text-[20px] md:text-[24px] font-light italic text-black/80 leading-[1.6]">
                "Our approach values clarity, discretion, and long-term perspective."
              </p>
            </motion.div>
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
          <div className="space-y-12 md:space-y-16">
            {detailedServices.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group bg-white rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 border border-black/[0.06]"
                >
                  <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-12">
                    {/* Left: Icon & Number */}
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-all duration-300">
                          <Icon className="w-8 h-8 text-black/70 group-hover:text-black transition-colors duration-300" weight="duotone" />
                        </div>
                        <span className="text-[48px] font-light text-black/10 group-hover:text-black/20 transition-colors duration-300 tabular-nums">{service.number}</span>
                      </div>
                      <h3 className="text-[28px] md:text-[32px] font-semibold text-black mb-2 tracking-tight">{service.title}</h3>
                      <p className="text-[16px] font-medium text-black/50">{service.subtitle}</p>
                    </div>

                    {/* Right: Description & Features */}
                    <div>
                      <p className="text-[17px] md:text-[18px] font-normal text-black/70 leading-[1.7] mb-8">
                        {service.description}
                      </p>
                      
                      <div className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-black/40 flex-shrink-0 mt-0.5" weight="fill" />
                            <span className="text-[15px] md:text-[16px] font-normal text-black/70 leading-[1.6]">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section - Apple Style */}
      <section className="py-32 md:py-40 bg-black">
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
              onClick={() => router.push('/properties')}
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

