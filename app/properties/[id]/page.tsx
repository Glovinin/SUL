"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../../components/ui/button'
import { GridPattern } from '../../../components/ui/grid-pattern'
import { NavBar } from '../../../components/navbar'
import { Footer } from '../../../components/Footer'
import { 
  Bed,
  Bathtub,
  Ruler,
  MapPin,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Buildings,
  CalendarBlank,
  Users,
  Sparkle,
  Heart,
  ShareNetwork,
  ChartLine
} from '@phosphor-icons/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useProperty } from '../../../lib/properties-client'

export default function PropertyDetailPage() {
  const params = useParams()
  const propertyId = params.id as string
  const [selectedImage, setSelectedImage] = useState(0)
  const { property, loading } = useProperty(propertyId)

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black/60">Loading property...</p>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[32px] font-semibold text-black mb-4">Property Not Found</h1>
          <Link href="/properties">
            <Button className="bg-black text-white hover:bg-black/90">
              Back to Collection
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <NavBar />

      {/* Hero Gallery */}
      <section className="relative pt-20 md:pt-24 pb-12 md:pb-16 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {/* Back Button - Above Gallery */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 md:mb-8"
          >
            <Link href="/properties">
              <motion.button
                whileHover={{ scale: 1.02, x: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200 border border-black/10 hover:border-black/20 group"
              >
                <ArrowLeft className="w-4 h-4 text-black/70 group-hover:text-black transition-colors" weight="bold" />
                <span className="text-[14px] font-medium text-black/70 group-hover:text-black transition-colors">Back to Collection</span>
              </motion.button>
            </Link>
          </motion.div>
          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="relative aspect-[16/10] md:aspect-[21/10] lg:aspect-[21/9] rounded-[20px] md:rounded-[28px] overflow-hidden mb-5 md:mb-6 group"
          >
            <motion.img 
              key={selectedImage}
              src={(property.gallery && property.gallery[selectedImage]) || property.image || '/images/placeholder.jpg'} 
              alt={property.title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="w-full h-full object-cover"
            />
            
            {/* Status Badge */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-5 left-5 md:top-6 md:left-6 px-3.5 py-1.5 md:px-4 md:py-2 bg-white/95 backdrop-blur-md rounded-full shadow-md border border-white/50"
            >
              <span className="text-[12px] md:text-[13px] font-semibold text-black">{property.status || 'Available'}</span>
            </motion.div>

            {/* Action Buttons */}
            <div className="absolute top-5 right-5 md:top-6 md:right-6 flex items-center gap-2.5 md:gap-3">
              <motion.button
                initial={{ opacity: 0, scale: 0.5, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg border border-white/50"
              >
                <Heart className="w-4 h-4 md:w-5 md:h-5 text-black/70" weight="bold" />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, scale: 0.5, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.6,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg border border-white/50"
              >
                <ShareNetwork className="w-4 h-4 md:w-5 md:h-5 text-black/70" weight="bold" />
              </motion.button>
            </div>
          </motion.div>

          {/* Gallery Thumbnails */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          >
            {(property.gallery || [property.image]).slice(0, 4).map((img, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.4 + (index * 0.06), 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-video ${selectedImage === index ? 'ring-2 ring-black ring-offset-2 ring-offset-white' : 'opacity-60 hover:opacity-100'} transition-all duration-300 cursor-pointer`}
              >
                <div className="w-full h-full rounded-[12px] md:rounded-[16px] overflow-hidden">
                  <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Property Info */}
      <section className="relative py-16 md:py-24 lg:py-28 bg-white overflow-hidden">
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.02] stroke-black/[0.02]"
        />
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-20 xl:gap-24">
            {/* Left Column - Details */}
            <div>
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-12 md:mb-14"
              >
                <motion.div 
                  className="flex items-center gap-2.5 mb-5 md:mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-black/40 flex-shrink-0" weight="fill" />
                  <span className="text-[14px] md:text-[15px] font-medium text-black/50">{property.location}</span>
                  <span className="text-black/30 mx-1">•</span>
                  <span className="text-[14px] md:text-[15px] font-medium text-black/50">{property.type}</span>
                </motion.div>

                <motion.h1 
                  className="text-[32px] md:text-[44px] lg:text-[48px] font-semibold text-black mb-6 md:mb-8 tracking-[-0.03em] leading-[1.1]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  {property.title}
                </motion.h1>

                <motion.div 
                  className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 md:mb-10 pb-8 md:pb-10 border-b border-black/10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {[
                    { icon: Bed, label: `${property.beds} Bedrooms` },
                    { icon: Bathtub, label: `${property.baths} Bathrooms` },
                    { icon: Ruler, label: `${property.sqft} sqft` },
                    { icon: CalendarBlank, label: property.yearBuilt }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      className="flex items-center gap-2.5"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 0.4 + (idx * 0.05),
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    >
                      <item.icon className="w-5 h-5 md:w-6 md:h-6 text-black/40 flex-shrink-0" weight="duotone" />
                      <span className="text-[15px] md:text-[16px] font-semibold text-black">{item.label}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div 
                  className="text-[36px] md:text-[48px] lg:text-[52px] font-semibold text-black tracking-tight"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {property.price}
                </motion.div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-12 md:mb-14"
              >
                <h2 className="text-[24px] md:text-[28px] font-semibold text-black mb-5 md:mb-6 tracking-[-0.02em]">About This Property</h2>
                <div className="space-y-4 md:space-y-5">
                  <p className="text-[16px] md:text-[17px] text-black/70 leading-[1.7]">
                    {property.longDescription}
                  </p>
                  <p className="text-[16px] md:text-[17px] text-black/70 leading-[1.7]">
                    {property.description}
                  </p>
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12 md:mb-14"
              >
                <h2 className="text-[24px] md:text-[28px] font-semibold text-black mb-6 md:mb-7 tracking-[-0.02em]">Key Features</h2>
                <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                  {(property.features || []).map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-black/40 flex-shrink-0 mt-0.5" weight="fill" />
                      <span className="text-[15px] md:text-[16px] text-black/70 leading-[1.6]">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Amenities */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-[24px] md:text-[28px] font-semibold text-black mb-6 md:mb-7 tracking-[-0.02em]">Building Amenities</h2>
                <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                  {(property.amenities || []).map((amenity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-black/40 flex-shrink-0 mt-0.5" weight="fill" />
                      <span className="text-[15px] md:text-[16px] text-black/70 leading-[1.6]">{amenity}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Contact Card */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="sticky top-24 md:top-32"
              >
                <div className="bg-white rounded-[20px] md:rounded-[24px] p-6 md:p-8 border border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.06)] md:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                  <motion.h3 
                    className="text-[22px] md:text-[24px] font-semibold text-black mb-5 md:mb-6 tracking-[-0.02em]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Interested in this property?
                  </motion.h3>
                  
                  <motion.p 
                    className="text-[14px] md:text-[15px] text-black/60 mb-7 md:mb-8 leading-[1.6]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Contact our team to schedule a private viewing or to learn more about this exceptional property.
                  </motion.p>

                  <div className="space-y-3 mb-7 md:mb-8">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                    >
                      <Button className="w-full bg-black text-white hover:bg-black/90 border-0 px-6 py-3.5 rounded-full text-[15px] font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
                        Schedule a Viewing
                      </Button>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                    >
                      <Button className="w-full bg-[#404040] text-white hover:bg-[#4a4a4a] border-0 px-6 py-3.5 rounded-full text-[15px] font-semibold transition-all duration-200">
                        Request Information
                      </Button>
                    </motion.div>
                  </div>

                  <div className="pt-7 md:pt-8 border-t border-black/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/5 flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 md:w-6 md:h-6 text-black/70" weight="duotone" />
                      </div>
                      <div>
                        <div className="text-[14px] md:text-[15px] font-semibold text-black">SUL Estate Team</div>
                        <div className="text-[12px] md:text-[13px] text-black/50">Property Specialists</div>
                      </div>
                    </div>
                    
                    <p className="text-[13px] md:text-[14px] text-black/60 leading-[1.6]">
                      Our expert advisors are ready to guide you through every step of your property journey.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="relative py-20 md:py-32 bg-gray-50 overflow-hidden">
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.02] stroke-black/[0.02]"
        />
        
        <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[32px] md:text-[48px] font-semibold text-black mb-12 md:mb-16 text-center tracking-[-0.02em]"
          >
            Property Highlights
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {property.highlights.map((highlight, index) => {
              const IconMap: Record<string, any> = {
                MapPin, Sparkle, ChartLine, Buildings, Users, Heart
              }
              const Icon = IconMap[highlight.icon] || Buildings
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ 
                    duration: 0.7, 
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                  }}
                  className="group bg-white rounded-[24px] p-8 border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-500 cursor-pointer"
                >
                  <motion.div 
                    className="w-14 h-14 rounded-2xl bg-black/5 group-hover:bg-black/10 flex items-center justify-center mb-6 transition-all duration-500"
                    whileHover={{ 
                      scale: 1.15,
                      rotate: 5,
                      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                    }}
                  >
                    <Icon className="w-7 h-7 text-black/70 group-hover:text-black transition-colors duration-300" weight="duotone" />
                  </motion.div>
                  <h3 className="text-[20px] font-semibold text-black mb-3 tracking-[-0.02em] group-hover:text-black/70 transition-colors duration-300">
                    {highlight.title}
                  </h3>
                  <p className="text-[15px] text-black/60 leading-[1.6]">
                    {highlight.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* More Properties CTA */}
      <section className="py-24 md:py-32 bg-black overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h2 
              className="text-[36px] md:text-[52px] font-semibold text-white mb-6 tracking-[-0.02em] leading-[1.1]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Explore More Properties
            </motion.h2>
            <motion.p 
              className="text-[17px] md:text-[20px] font-normal text-white/80 mb-10 max-w-[700px] mx-auto leading-[1.6]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Discover other exceptional properties in our exclusive collection
            </motion.p>
            <Link href="/properties">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
              >
                <Button 
                  className="bg-white text-black hover:bg-white/90 border-0 px-8 py-3 rounded-full text-[15px] font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 mx-auto"
                >
                  View All Properties
                  <ArrowRight className="w-4 h-4" weight="bold" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

