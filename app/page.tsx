"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Button } from '../components/ui/button'
import { NumberTicker } from '../components/ui/number-ticker'
import { GridPattern } from '../components/ui/grid-pattern'
import { NavBar } from '../components/navbar'
import { Footer } from '../components/Footer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  ArrowRight,
  Buildings,
  MagnifyingGlass,
  Eye,
  Wallet,
  GearSix,
  Bed,
  Bathtub,
  ArrowsOut,
  User,
  Bank,
  Sparkle,
  PaintBrush,
  HardHat,
  Scales,
  Palette,
  Briefcase,
  CaretDown
} from '@phosphor-icons/react'

// Services data
const services = [
  {
    icon: Buildings,
    title: 'Strategy & Advisory',
    description: 'Strategic guidance for property acquisition and investment decisions.'
  },
  {
    icon: MagnifyingGlass,
    title: 'Property Search',
    description: 'Curated selection of premium properties tailored to your vision.'
  },
  {
    icon: Eye,
    title: 'Project Supervision',
    description: 'Oversight and management of development projects from concept to completion.'
  },
  {
    icon: Wallet,
    title: 'Financing',
    description: 'Expert assistance in securing optimal financing solutions.'
  },
  {
    icon: GearSix,
    title: 'Property Management',
    description: 'Comprehensive management services for your real estate portfolio.'
  }
]

// Featured projects with detailed info
const featuredProjects = [
  {
    id: 1,
    title: 'Belém Heritage Apartment',
    location: 'Lisbon',
    price: '€1,250,000',
    beds: 4,
    baths: 3,
    sqft: '2,650',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=1000&fit=crop&q=80',
    tag: 'Featured'
  },
  {
    id: 2,
    title: 'Ericeira Seaside Villa',
    location: 'Ericeira',
    price: '€2,800,000',
    beds: 5,
    baths: 4,
    sqft: '3,200',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=1000&fit=crop&q=80',
    tag: 'New'
  },
  {
    id: 3,
    title: 'Comporta Beach Estate',
    location: 'Comporta',
    price: '€4,500,000',
    beds: 6,
    baths: 5,
    sqft: '4,800',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=1000&fit=crop&q=80',
    tag: 'Luxury'
  },
  {
    id: 4,
    title: 'Algarve Cliffside Residence',
    location: 'Algarve',
    price: '€3,200,000',
    beds: 5,
    baths: 4,
    sqft: '3,650',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=1000&fit=crop&q=80',
    tag: 'Premium'
  },
  {
    id: 5,
    title: 'Lisbon Penthouse',
    location: 'Lisbon',
    price: '€1,800,000',
    beds: 3,
    baths: 3,
    sqft: '2,200',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=1000&fit=crop&q=80',
    tag: 'Featured'
  },
  {
    id: 6,
    title: 'Douro Valley Retreat',
    location: 'Douro',
    price: '€1,950,000',
    beds: 4,
    baths: 3,
    sqft: '2,850',
    image: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800&h=1000&fit=crop&q=80',
    tag: 'New'
  }
]

// Blog posts
const blogPosts = [
  {
    id: 1,
    title: 'High-end properties',
    subtitle: 'Luxury homebuyers and sellers are navigating changing market conditions',
    image: '/images/blog-1.jpg',
    readTime: '7 min read',
    author: {
      name: 'Vincent Santos',
      role: 'Real Estate Expert'
    }
  },
  {
    id: 2,
    title: 'Investment trends 2024',
    subtitle: 'Key insights for property investment in Portugal\'s prime markets',
    image: '/images/blog-2.jpg',
    readTime: '5 min read',
    author: {
      name: 'Ana Silva',
      role: 'Market Analyst'
    }
  },
  {
    id: 3,
    title: 'Coastal living guide',
    subtitle: 'Discovering the perfect beachfront property in Portugal',
    image: '/images/blog-3.jpg',
    readTime: '6 min read',
    author: {
      name: 'João Costa',
      role: 'Property Consultant'
    }
  }
]

export default function Home() {
  const router = useRouter()
  const [propertyType, setPropertyType] = useState('')
  const [location, setLocation] = useState('')
  const [priceRange, setPriceRange] = useState('')
  
  // Handle property search
  const handlePropertySearch = () => {
    const params = new URLSearchParams()
    if (propertyType) params.append('type', propertyType)
    if (location) params.append('location', location)
    if (priceRange) params.append('price', priceRange)
    
    const queryString = params.toString()
    router.push(`/properties${queryString ? `?${queryString}` : ''}`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <NavBar isHomePage={true} />

      {/* Hero Section - Ultra-Premium Design */}
      <section className="relative min-h-screen flex items-center justify-center bg-black">
        {/* Background Video with Elegant Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/hero-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover scale-110 transition-transform duration-20000 ease-out hover:scale-105"
          >
            <source src="/videos/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Vignette effect - Premium depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_40%,rgba(0,0,0,0.4)_100%)]" />
          {/* Modern gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>
        
        {/* Hero Content - Apple-Inspired Typography */}
        <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 md:px-12 pt-32 pb-20">
          <div className="text-center mb-16">
            {/* Badge - Premium Shimmer Design */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10"
            >
              <span className="group relative inline-flex items-center px-5 py-2 bg-white/10 backdrop-blur-md rounded-full text-[12px] font-medium text-white/90 border border-white/20 hover:border-white/30 transition-all duration-300 overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></span>
                <span className="relative">Boutique Real Estate Advisory</span>
              </span>
            </motion.div>

            {/* Main Heading - Premium Text Reveal */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[52px] md:text-[80px] lg:text-[104px] font-semibold tracking-[-0.04em] text-white leading-[1.05] mb-6 drop-shadow-[0_2px_20px_rgba(255,255,255,0.15)]"
            >
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                Live beautifully.
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                Invest wisely.
              </motion.span>
            </motion.h1>

            {/* Subtitle - Premium Typography */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[19px] md:text-[22px] font-normal text-white/85 mb-10 leading-[1.6] max-w-[760px] mx-auto"
            >
              We assist international clients in finding and shaping their ideal home or investment in Portugal, from strategic sourcing to complete project management.
            </motion.p>

            {/* Modern Filter/Quick Search - Integrated with Action */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[1000] mx-auto mb-10 transform-gpu"
            >
              <div className="bg-white/10 backdrop-blur-2xl rounded-[28px] p-4 border border-white/20 shadow-2xl transform-gpu isolate">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                  {/* Property Type Filter */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-white/5 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <select 
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      style={{
                        backgroundImage: 'none',
                        borderRadius: '20px',
                      }}
                      className="relative w-full h-[52px] bg-white/[0.08] backdrop-blur-xl hover:bg-white/[0.12] text-white border border-white/20 hover:border-white/30 !rounded-[20px] px-5 text-[15px] font-medium appearance-none cursor-pointer transition-all duration-300 focus:outline-none focus:border-white/40 focus:bg-white/[0.15] focus:shadow-lg focus:shadow-white/5 transform-gpu">
                      <option value="">Property Type</option>
                      <option value="Villa">Villas</option>
                      <option value="Apartment">Apartments</option>
                      <option value="Penthouse">Penthouses</option>
                      <option value="Estate">Estates</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 group-hover:translate-y-[-10px]">
                      <CaretDown className="w-4 h-4 text-white/80 drop-shadow-sm" weight="bold" />
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-white/5 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <select 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      style={{
                        backgroundImage: 'none',
                        borderRadius: '20px',
                      }}
                      className="relative w-full h-[52px] bg-white/[0.08] backdrop-blur-xl hover:bg-white/[0.12] text-white border border-white/20 hover:border-white/30 !rounded-[20px] px-5 text-[15px] font-medium appearance-none cursor-pointer transition-all duration-300 focus:outline-none focus:border-white/40 focus:bg-white/[0.15] focus:shadow-lg focus:shadow-white/5 transform-gpu">
                      <option value="">Location</option>
                      <option value="Lisbon">Lisbon</option>
                      <option value="Comporta">Comporta</option>
                      <option value="Algarve">Algarve</option>
                      <option value="Ericeira">Ericeira</option>
                      <option value="Douro">Douro</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 group-hover:translate-y-[-10px]">
                      <CaretDown className="w-4 h-4 text-white/80 drop-shadow-sm" weight="bold" />
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-white/5 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <select 
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      style={{
                        backgroundImage: 'none',
                        borderRadius: '20px',
                      }}
                      className="relative w-full h-[52px] bg-white/[0.08] backdrop-blur-xl hover:bg-white/[0.12] text-white border border-white/20 hover:border-white/30 !rounded-[20px] px-5 text-[15px] font-medium appearance-none cursor-pointer transition-all duration-300 focus:outline-none focus:border-white/40 focus:bg-white/[0.15] focus:shadow-lg focus:shadow-white/5 transform-gpu">
                      <option value="">Price Range</option>
                      <option value="500k-1m">€500K - €1M</option>
                      <option value="1m-2m">€1M - €2M</option>
                      <option value="2m-5m">€2M - €5M</option>
                      <option value="5m+">€5M+</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 group-hover:translate-y-[-10px]">
                      <CaretDown className="w-4 h-4 text-white/80 drop-shadow-sm" weight="bold" />
                    </div>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Buy Button */}
                  <Button 
                    onClick={handlePropertySearch}
                    className="group h-[52px] bg-white text-black hover:bg-white/95 border-0 rounded-[20px] text-[15px] font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.01] flex items-center justify-center gap-2"
                  >
                    <Buildings className="w-[18px] h-[18px]" weight="bold" />
                    Buy Property
                  </Button>

                  {/* Invest Button */}
                  <Button 
                    onClick={handlePropertySearch}
                    className="group h-[52px] bg-black text-white hover:bg-black/90 border-0 rounded-[20px] text-[15px] font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.01] flex items-center justify-center gap-2"
                  >
                    <Wallet className="w-[18px] h-[18px]" weight="bold" />
                    Invest Now
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Insight Cards - Premium Glassmorphism with Glow - Apple Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8 max-w-[1120px] lg:max-w-[1280px] mx-auto relative z-[5]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white/10 backdrop-blur-xl rounded-[24px] p-6 md:p-7 lg:p-8 border border-white/20 hover:bg-white/[0.12] hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-500 cursor-default z-[1] hover:z-[20]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[24px]"></div>
              <div className="flex flex-col relative z-10">
                <div className="text-[38px] md:text-[44px] lg:text-[48px] font-semibold text-white mb-2 tracking-tight">
                  <NumberTicker value={15} startValue={0} className="text-white" />+
                </div>
                <div className="text-[14px] md:text-[15px] font-medium text-white/95 mb-2">Years of Experience</div>
                <div className="text-[13px] md:text-[14px] font-normal text-white/65 leading-relaxed">
                  Trusted expertise in Portugal's premium real estate market
                </div>
              </div>
              <div className="absolute top-6 right-6 w-2.5 h-2.5 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-500"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white/10 backdrop-blur-xl rounded-[24px] p-6 md:p-7 lg:p-8 border border-white/20 hover:bg-white/[0.12] hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-500 cursor-default z-[1] hover:z-[20]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[24px]"></div>
              <div className="flex flex-col relative z-10">
                <div className="text-[38px] md:text-[44px] lg:text-[48px] font-semibold text-white mb-2 tracking-tight">
                  €<NumberTicker value={500} startValue={0} className="text-white" />M+
                </div>
                <div className="text-[14px] md:text-[15px] font-medium text-white/95 mb-2">Portfolio Value</div>
                <div className="text-[13px] md:text-[14px] font-normal text-white/65 leading-relaxed">
                  Successfully managed properties across Portugal's finest locations
                </div>
              </div>
              <div className="absolute top-6 right-6 w-2.5 h-2.5 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-500"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white/10 backdrop-blur-xl rounded-[24px] p-6 md:p-7 lg:p-8 border border-white/20 hover:bg-white/[0.12] hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-500 cursor-default z-[1] hover:z-[20]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[24px]"></div>
              <div className="flex flex-col relative z-10">
                <div className="text-[38px] md:text-[44px] lg:text-[48px] font-semibold text-white mb-2 tracking-tight">
                  <NumberTicker value={98} startValue={0} className="text-white" />%
                </div>
                <div className="text-[14px] md:text-[15px] font-medium text-white/95 mb-2">Client Satisfaction</div>
                <div className="text-[13px] md:text-[14px] font-normal text-white/65 leading-relaxed">
                  Exceptional service that exceeds expectations every time
                </div>
              </div>
              <div className="absolute top-6 right-6 w-2.5 h-2.5 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-500"></div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator - Premium */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-14 left-1/2 -translate-x-1/2 z-[10] hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
            className="w-7 h-11 rounded-full border-2 border-white/30 flex items-start justify-center p-2.5 backdrop-blur-sm bg-white/5 shadow-lg"
          >
            <motion.div
              animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
              className="w-1.5 h-2.5 bg-white/70 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Divider - Smooth Transition */}
      <div className="border-t border-black/[0.03] bg-white"></div>

      {/* Why Portugal Section - Premium Apple Style */}
      <section id="why-portugal" className="relative py-32 md:py-40 bg-white overflow-visible">
        {/* Static Grid Background */}
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.03] stroke-black/[0.03]"
        />
        
        <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12 overflow-visible">
          {/* Header Section - Ultra Clean */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            {/* Badge Premium */}
            <div className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6">
              <span className="text-[12px] font-medium text-black/60">Why Portugal</span>
            </div>

            {/* Main Title - Apple Style */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[40px] md:text-[56px] font-semibold text-black mb-8 tracking-[-0.02em] leading-[1.1] max-w-[900px] mx-auto"
            >
              A rare equilibrium between lifestyle, stability and opportunity
            </motion.h2>

            {/* Subtitle - Elegant */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-[17px] md:text-[21px] font-normal text-black/60 max-w-[760px] mx-auto leading-[1.6]"
            >
              Portugal offers a unique blend of quality living, architectural heritage, and strategic investment potential
            </motion.p>
          </motion.div>

          {/* Key Benefits Grid */}
          <div className="relative z-10 grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mb-16 overflow-visible px-0 py-4 md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white rounded-3xl p-8 text-center cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 border border-black/[0.06] hover:border-black/[0.1] hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Bank className="w-8 h-8 text-black/70 group-hover:text-black transition-colors duration-300" weight="duotone" />
              </div>
              <h3 className="text-[20px] font-semibold text-black mb-3 tracking-tight group-hover:text-black/80 transition-colors duration-300">
                Stability & Safety
              </h3>
              <p className="text-[15px] font-normal text-black/60 leading-[1.6]">
                Political and economic stability combined with one of the world's safest environments
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white rounded-3xl p-8 text-center cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 border border-black/[0.06] hover:border-black/[0.1] hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Sparkle className="w-8 h-8 text-black/70 group-hover:text-black transition-colors duration-300" weight="duotone" />
              </div>
              <h3 className="text-[20px] font-semibold text-black mb-3 tracking-tight group-hover:text-black/80 transition-colors duration-300">
                Quality of Life
              </h3>
              <p className="text-[15px] font-normal text-black/60 leading-[1.6]">
                Exceptional climate, rich culture, and a lifestyle that balances tradition with modernity
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white rounded-3xl p-8 text-center cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 border border-black/[0.06] hover:border-black/[0.1] hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <PaintBrush className="w-8 h-8 text-black/70 group-hover:text-black transition-colors duration-300" weight="duotone" />
              </div>
              <h3 className="text-[20px] font-semibold text-black mb-3 tracking-tight group-hover:text-black/80 transition-colors duration-300">
                Architecture & Design
              </h3>
              <p className="text-[15px] font-normal text-black/60 leading-[1.6]">
                From historic heritage to contemporary design, Portugal offers timeless aesthetic value
              </p>
            </motion.div>
          </div>

          {/* Visual Keywords */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-3 mt-12"
          >
            {['Stability', 'Safety', 'Architecture', 'Lifestyle', 'Quality of Life', 'Design', 'Culture'].map((keyword, index) => (
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

      {/* Featured Projects Section - Modern Apple Grid */}
      <section id="projects" className="py-32 md:py-40 bg-white overflow-visible">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12 overflow-visible pb-8">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-8"
          >
            <div className="max-w-[700px]">
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6">
                <span className="text-[12px] font-medium text-black/60">Properties</span>
              </div>
              
              {/* Main Title */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-[40px] md:text-[52px] font-semibold text-black mb-6 tracking-[-0.02em] leading-[1.1]"
              >
                Find homes that perfectly match your lifestyle
              </motion.h2>
              
              {/* Subtitle */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-[17px] md:text-[19px] font-normal text-black/60 leading-[1.6]"
              >
                Curated collection of premium properties across Portugal's most desirable locations
              </motion.p>
            </div>
            <Link href="/properties">
              <Button 
                className="bg-black text-white hover:bg-black/90 border-0 px-6 py-3 rounded-full text-[14px] font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
              >
                View all
                <ArrowRight className="w-4 h-4" weight="bold" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-0 py-4 md:p-8 lg:p-12 overflow-visible">
            {featuredProjects.map((project, index) => (
              <Link key={project.id} href={`/properties/${project.id === 1 ? 'belem-heritage-apartment' : project.id === 2 ? 'ericeira-seaside-villa' : project.id === 3 ? 'comporta-beach-estate' : project.id === 4 ? 'algarve-cliffside-residence' : project.id === 5 ? 'lisbon-penthouse' : 'douro-valley-retreat'}`}>
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
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-800 ease-out group-hover:scale-[1.08]"
                    style={{ objectFit: 'cover' }}
                  />
                  
                  {/* Tag Badge - Ultra Premium */}
                  <div className="absolute top-6 left-6 z-20">
                    <div className="bg-white/95 backdrop-blur-2xl px-4 py-2 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                      <span className="text-[10px] font-semibold text-black tracking-[0.08em] uppercase">{project.tag}</span>
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
                      {project.location}
                    </p>
                  </div>
                  
                  {/* Title - Bold & Clean */}
                  <h3 className="text-[20px] md:text-[22px] font-semibold text-black mb-4 tracking-[-0.02em] leading-[1.2] group-hover:text-black/60 transition-colors duration-500">
                    {project.title}
                  </h3>
                  
                  {/* Price - Hero Element */}
                  <div className="mb-6">
                    <p className="text-[32px] md:text-[36px] font-semibold text-black tracking-[-0.02em] leading-none">
                      {project.price}
                    </p>
                  </div>
                  
                  {/* Property Stats - Refined */}
                  <div className="flex items-center gap-6 pt-5 border-t border-black/[0.06]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-black/[0.03] flex items-center justify-center group-hover:bg-black/[0.05] transition-colors duration-300">
                        <Bed className="w-[17px] h-[17px] text-black/50" weight="duotone" />
                      </div>
                      <span className="text-[14px] font-medium text-black/70">{project.beds}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-black/[0.03] flex items-center justify-center group-hover:bg-black/[0.05] transition-colors duration-300">
                        <Bathtub className="w-[17px] h-[17px] text-black/50" weight="duotone" />
                      </div>
                      <span className="text-[14px] font-medium text-black/70">{project.baths}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-black/[0.03] flex items-center justify-center group-hover:bg-black/[0.05] transition-colors duration-300">
                        <ArrowsOut className="w-[17px] h-[17px] text-black/50" weight="duotone" />
                      </div>
                      <span className="text-[14px] font-medium text-black/70">{project.sqft}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-black/[0.03]"></div>

      {/* About SUL Section - Modern Apple Style */}
      <section id="about" className="relative py-32 md:py-40 bg-white overflow-visible">
        {/* Static Grid Background */}
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.03] stroke-black/[0.03]"
        />
        
        <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12 overflow-visible">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center overflow-visible px-0 py-4 md:p-8">
            {/* Founder Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[4/5] w-full max-w-[500px] mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl flex items-center justify-center overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-black/[0.04] hover:border-black/[0.08]"
            >
              <span className="text-[14px] font-medium text-black/20 group-hover:text-black/30 transition-colors duration-300">Vincent Santos</span>
            </motion.div>

            {/* About Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[560px]"
            >
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6">
                <span className="text-[12px] font-medium text-black/60">About Us</span>
              </div>
              
              {/* Main Title */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-[40px] md:text-[52px] font-semibold text-black mb-8 tracking-[-0.02em] leading-[1.1]"
              >
                About SUL
              </motion.h2>
              
              {/* Content Paragraphs */}
              <div className="space-y-6 text-black/70 leading-[1.7]">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[17px] md:text-[19px] font-normal"
                >
                  SUL represents a refined approach to real estate advisory, combining strategic insight with an unwavering commitment to excellence.
                </motion.p>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[17px] md:text-[19px] font-normal"
                >
                  We understand that each property search is unique, and we curate personalized selections that align with your vision and long-term objectives.
                </motion.p>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[17px] md:text-[19px] font-normal"
                >
                  With deep local knowledge and international perspective, we guide discerning clients through every stage of their real estate journey.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-black/[0.03]"></div>

      {/* Approach Section - Storytelling with Elegant Animations */}
      <section id="approach" className="py-32 md:py-40 bg-gray-50 overflow-visible">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12 overflow-visible">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center overflow-visible px-0 py-4 md:p-8">
            {/* Approach Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[560px]"
            >
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6">
                <span className="text-[12px] font-medium text-black/60">Our Approach</span>
              </div>
              
              {/* Main Title */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-[40px] md:text-[52px] font-semibold text-black mb-8 tracking-[-0.02em] leading-[1.1]"
              >
                Strategic and human
              </motion.h2>
              
              {/* Quote with subtle animation */}
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-6 border-l-2 border-black/20 mb-12"
              >
                <p className="text-[19px] md:text-[21px] font-normal text-black/80 italic leading-[1.6]">
                  "We believe in strategy, discretion and beauty that endures."
                </p>
              </motion.div>

              {/* Method Points - Progressive Storytelling */}
              <div className="space-y-8 relative">
                {/* Connecting Line */}
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-[3px] top-0 w-[2px] bg-gradient-to-b from-black/20 via-black/10 to-transparent"
                />

                {[
                  {
                    title: "Personalized Strategy",
                    description: "Every client receives a tailored approach aligned with their unique vision and goals",
                    delay: 0.4
                  },
                  {
                    title: "Trusted Partners",
                    description: "We collaborate with a curated network of architects, lawyers, and designers",
                    delay: 0.5
                  },
                  {
                    title: "Full Transparency",
                    description: "Clear communication and honest guidance throughout the entire process",
                    delay: 0.6
                  },
                  {
                    title: "Continuous Optimization",
                    description: "Long-term value creation through ongoing management and refinement",
                    delay: 0.7
                  }
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: point.delay, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-4 relative"
                  >
                    {/* Animated Dot */}
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: point.delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="relative mt-2 flex-shrink-0"
                    >
                      <div className="w-2 h-2 rounded-full bg-black/80"></div>
                      <motion.div
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        className="absolute inset-0 w-2 h-2 rounded-full bg-black/40"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: point.delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <h3 className="text-[17px] font-semibold text-black mb-2">
                        {point.title}
                      </h3>
                      <p className="text-[15px] font-normal text-black/60 leading-[1.6]">
                        {point.description}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Visual Element - Real Photos with Stagger */}
            <div className="relative aspect-[4/5] w-full max-w-[500px] mx-auto md:ml-auto md:mr-0">
              {/* Top Image - Portuguese Architecture */}
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group absolute top-0 right-0 w-[75%] h-[45%] rounded-3xl shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-black/[0.04] hover:border-black/[0.08]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=1000&fit=crop&q=80" 
                  alt="Portuguese architecture and real estate"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-800 ease-out group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Subtle shimmer effect */}
                <motion.div
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "200%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                />
              </motion.div>
              
              {/* Bottom Image - Luxury Property */}
              <motion.div 
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group absolute bottom-0 left-0 w-[75%] h-[45%] rounded-3xl shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-black/[0.04] hover:border-black/[0.08]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=1000&fit=crop&q=80" 
                  alt="Luxury real estate interior"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-800 ease-out group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Subtle shimmer effect */}
                <motion.div
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "200%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-black/[0.03]"></div>

      {/* Services Section - Ultra Premium Apple/Tesla Style - Mobile First */}
      <section id="services" className="relative py-20 md:py-32 lg:py-40 pb-32 md:pb-40 lg:pb-48 bg-gradient-to-b from-white via-gray-50/30 to-white overflow-visible">
        {/* Static Grid Background */}
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.02] stroke-black/[0.02]"
        />
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.015)_0%,transparent_50%)] pointer-events-none"></div>
        
        <div className="relative max-w-[1300px] mx-auto px-4 md:px-6 lg:px-12 overflow-visible pb-8 md:pb-16 lg:pb-20">
          {/* Header Section - Ultra Clean - Mobile First */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16 md:mb-20 lg:mb-24"
          >
            {/* Badge Premium */}
            <div className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6">
              <span className="text-[12px] font-medium text-black/60">Services</span>
            </div>

            {/* Main Title - Apple Style - Mobile First */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[36px] sm:text-[44px] md:text-[56px] lg:text-[64px] font-semibold text-black mb-5 md:mb-6 lg:mb-8 tracking-[-0.03em] leading-[1.08] px-2"
            >
              Comprehensive<br className="hidden md:block" /> Solutions
            </motion.h2>

            {/* Subtitle - Elegant - Mobile First */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-[16px] sm:text-[17px] md:text-[19px] lg:text-[21px] font-light text-black/75 max-w-[680px] mx-auto leading-[1.65] tracking-[-0.01em] px-4"
            >
              Tailored real estate services designed to meet your unique needs
            </motion.p>
          </motion.div>

          {/* Services Grid - Premium Layout - Mobile First */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 px-0 py-4 md:p-8 lg:p-12 overflow-visible">
            {services.slice(0, 3).map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative bg-white rounded-[24px] md:rounded-[28px] p-7 sm:p-8 md:p-10 lg:p-12 cursor-default shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-black/[0.04] hover:border-black/[0.08] transition-all duration-700 ease-out z-[1] hover:z-[10]"
                >
                  {/* Number Badge - Top Right - Hidden on Mobile */}
                  <div className="hidden md:flex absolute top-6 lg:top-7 right-6 lg:right-7 w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-black/[0.03] items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[10px] lg:text-[11px] font-semibold text-black/40">0{index + 1}</span>
                  </div>

                  {/* Gradient Shine Effect - Apple Style */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/[0.01] via-transparent to-transparent"></div>
                  </div>

                  {/* Icon Container - Premium - Mobile First */}
                  <div className="relative mb-6 md:mb-7 lg:mb-8">
                    <div className="relative inline-flex items-center justify-center">
                      {/* Icon Background with Gradient */}
                      <div className="absolute inset-0 w-[60px] md:w-[68px] lg:w-[72px] h-[60px] md:h-[68px] lg:h-[72px] rounded-[18px] md:rounded-[20px] bg-gradient-to-br from-black/[0.04] to-black/[0.08] group-hover:from-black/[0.08] group-hover:to-black/[0.12] transition-all duration-500"></div>
                      {/* Icon */}
                      <div className="relative w-[60px] md:w-[68px] lg:w-[72px] h-[60px] md:h-[68px] lg:h-[72px] rounded-[18px] md:rounded-[20px] flex items-center justify-center">
                        <Icon className="w-7 md:w-[30px] lg:w-8 h-7 md:h-[30px] lg:h-8 text-black/80 group-hover:text-black transition-colors duration-500" weight="duotone" />
                      </div>
                    </div>
                  </div>

                  {/* Content - Mobile First */}
                  <div className="relative">
                    {/* Title - Bold & Clean */}
                    <h3 className="text-[20px] sm:text-[21px] md:text-[23px] lg:text-[24px] font-semibold text-black mb-3 md:mb-4 tracking-[-0.02em] leading-[1.25] group-hover:text-black/70 transition-colors duration-500">
                      {service.title}
                    </h3>

                    {/* Description - Light & Elegant - Always Visible */}
                    <p className="text-[14px] sm:text-[15px] md:text-[15px] lg:text-[16px] font-normal text-black/60 leading-[1.65] md:leading-[1.7] tracking-[-0.01em]">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom Accent Line - Hidden on Mobile */}
                  <div className="hidden md:block absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              )
            })}
          </div>

          {/* Second Row - 2 Columns Centered - Premium - Mobile First */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8 max-w-[920px] mx-auto overflow-visible px-0 py-4 md:p-8 lg:p-12">
            {services.slice(3, 5).map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={index + 3}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: (index + 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative bg-white rounded-[24px] md:rounded-[28px] p-7 sm:p-8 md:p-10 lg:p-12 cursor-default shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-black/[0.04] hover:border-black/[0.08] transition-all duration-700 ease-out z-[1] hover:z-[10]"
                >
                  {/* Number Badge - Top Right - Hidden on Mobile */}
                  <div className="hidden md:flex absolute top-6 lg:top-7 right-6 lg:right-7 w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-black/[0.03] items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[10px] lg:text-[11px] font-semibold text-black/40">0{index + 4}</span>
                  </div>

                  {/* Gradient Shine Effect - Apple Style */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/[0.01] via-transparent to-transparent"></div>
                  </div>

                  {/* Icon Container - Premium - Mobile First */}
                  <div className="relative mb-6 md:mb-7 lg:mb-8">
                    <div className="relative inline-flex items-center justify-center">
                      {/* Icon Background with Gradient */}
                      <div className="absolute inset-0 w-[60px] md:w-[68px] lg:w-[72px] h-[60px] md:h-[68px] lg:h-[72px] rounded-[18px] md:rounded-[20px] bg-gradient-to-br from-black/[0.04] to-black/[0.08] group-hover:from-black/[0.08] group-hover:to-black/[0.12] transition-all duration-500"></div>
                      {/* Icon */}
                      <div className="relative w-[60px] md:w-[68px] lg:w-[72px] h-[60px] md:h-[68px] lg:h-[72px] rounded-[18px] md:rounded-[20px] flex items-center justify-center">
                        <Icon className="w-7 md:w-[30px] lg:w-8 h-7 md:h-[30px] lg:h-8 text-black/80 group-hover:text-black transition-colors duration-500" weight="duotone" />
                      </div>
                    </div>
                  </div>

                  {/* Content - Mobile First */}
                  <div className="relative">
                    {/* Title - Bold & Clean */}
                    <h3 className="text-[20px] sm:text-[21px] md:text-[23px] lg:text-[24px] font-semibold text-black mb-3 md:mb-4 tracking-[-0.02em] leading-[1.25] group-hover:text-black/70 transition-colors duration-500">
                      {service.title}
                    </h3>

                    {/* Description - Light & Elegant - Always Visible */}
                    <p className="text-[14px] sm:text-[15px] md:text-[15px] lg:text-[16px] font-normal text-black/60 leading-[1.65] md:leading-[1.7] tracking-[-0.01em]">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom Accent Line - Hidden on Mobile */}
                  <div className="hidden md:block absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              )
            })}
          </div>

          {/* View All Services Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mt-12 md:mt-16"
          >
            <Link href="/services">
              <Button 
                className="bg-black text-white hover:bg-black/90 border-0 px-8 py-3 rounded-full text-[15px] font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 mx-auto"
              >
                View All Services
                <ArrowRight className="w-4 h-4" weight="bold" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-black/[0.03]"></div>

      {/* Blog Section - Modern Insights */}
      <section id="blog" className="py-32 md:py-40 bg-gray-50 overflow-visible">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12 overflow-visible pb-8">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-8"
          >
            <div className="max-w-[700px]">
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6">
                <span className="text-[12px] font-medium text-black/60">Blog</span>
              </div>
              
              {/* Main Title */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-[40px] md:text-[52px] font-semibold text-black mb-6 tracking-[-0.02em] leading-[1.1]"
              >
                Latest real estate insights
              </motion.h2>
            </div>
            <Link href="/blog">
              <Button 
                className="bg-black text-white hover:bg-black/90 border-0 px-6 py-3 rounded-full text-[14px] font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
              >
                View all
                <ArrowRight className="w-4 h-4" weight="bold" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 px-0 py-4 md:p-8 lg:p-12 overflow-visible">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-3xl group cursor-pointer shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 z-[1] hover:z-[10]"
              >
                {/* Blog Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  {/* Read Time Badge */}
                  <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <span className="text-[11px] font-medium text-black">{post.readTime}</span>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/5"></div>
                </div>
                
                {/* Blog Content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-[19px] font-semibold text-black mb-3 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-[15px] font-normal text-black/60 mb-6 leading-relaxed">
                    {post.subtitle}
                  </p>
                  
                  {/* Author Info */}
                  <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                    <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                      <User className="w-5 h-5 text-black/40" weight="duotone" />
                    </div>
                    <div>
                      <div className="text-[13px] font-medium text-black">{post.author.name}</div>
                      <div className="text-[12px] font-normal text-black/50">{post.author.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
              <span className="text-[12px] font-medium text-black/60">Network</span>
            </div>
            
            {/* Main Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[40px] md:text-[56px] font-semibold text-black mb-8 tracking-[-0.02em] leading-[1.1] max-w-[900px] mx-auto"
            >
              A trusted ecosystem of excellence
            </motion.h2>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-[17px] md:text-[21px] font-normal text-black/60 max-w-[760px] mx-auto leading-[1.6]"
            >
              We act as a bridge between foreign investors and the Portuguese reality, collaborating with carefully selected professionals
            </motion.p>
          </motion.div>

          {/* Partners Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 overflow-visible px-0 py-4 md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-white border border-black/[0.06] hover:border-black/[0.12] rounded-3xl p-8 text-center transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] cursor-pointer hover:-translate-y-1 z-[1] hover:z-[10]"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <HardHat className="w-10 h-10 text-black/70 group-hover:text-black transition-colors duration-300" weight="duotone" />
              </div>
              <h3 className="text-[18px] font-semibold text-black mb-3 tracking-tight group-hover:text-black/80 transition-colors duration-300">
                Architects
              </h3>
              <p className="text-[14px] font-normal text-black/60 leading-[1.6]">
                Award-winning designers creating timeless spaces
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-white border border-black/[0.06] hover:border-black/[0.12] rounded-3xl p-8 text-center transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] cursor-pointer hover:-translate-y-1 z-[1] hover:z-[10]"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Scales className="w-10 h-10 text-black/70 group-hover:text-black transition-colors duration-300" weight="duotone" />
              </div>
              <h3 className="text-[18px] font-semibold text-black mb-3 tracking-tight group-hover:text-black/80 transition-colors duration-300">
                Legal Advisors
              </h3>
              <p className="text-[14px] font-normal text-black/60 leading-[1.6]">
                Expert lawyers ensuring secure transactions
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-white border border-black/[0.06] hover:border-black/[0.12] rounded-3xl p-8 text-center transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] cursor-pointer hover:-translate-y-1 z-[1] hover:z-[10]"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Palette className="w-10 h-10 text-black/70 group-hover:text-black transition-colors duration-300" weight="duotone" />
              </div>
              <h3 className="text-[18px] font-semibold text-black mb-3 tracking-tight group-hover:text-black/80 transition-colors duration-300">
                Designers
              </h3>
              <p className="text-[14px] font-normal text-black/60 leading-[1.6]">
                Interior specialists crafting refined aesthetics
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-white border border-black/[0.06] hover:border-black/[0.12] rounded-3xl p-8 text-center transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] cursor-pointer hover:-translate-y-1 z-[1] hover:z-[10]"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Briefcase className="w-10 h-10 text-black/70 group-hover:text-black transition-colors duration-300" weight="duotone" />
              </div>
              <h3 className="text-[18px] font-semibold text-black mb-3 tracking-tight group-hover:text-black/80 transition-colors duration-300">
                Financial Advisors
              </h3>
              <p className="text-[14px] font-normal text-black/60 leading-[1.6]">
                Strategic guidance for optimal financing
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              className="bg-white text-black hover:bg-white/95 border-0 px-8 py-3.5 rounded-full text-[16px] font-medium transition-all duration-200 min-w-[200px] shadow-sm hover:shadow-md"
            >
              Start your search
            </Button>
            <Button 
              className="bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/30 px-8 py-3.5 rounded-full text-[16px] font-medium transition-all duration-200 min-w-[200px]"
            >
              Book a Call
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

