"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../../components/ui/button'
import { GridPattern } from '../../../components/ui/grid-pattern'
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
  Heart,
  ShareNetwork,
  X,
  ArrowsOut,
  MagnifyingGlassPlus,
  MagnifyingGlassMinus
} from '@phosphor-icons/react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useProperty, useProperties } from '../../../lib/properties-client'
import { formatPrice } from '../../../lib/format-price'

export default function PropertyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const propertyId = params.id as string
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const { property, loading } = useProperty(propertyId)
  const { properties: allProperties } = useProperties()
  
  // Get all images
  const allImages = property ? (property.gallery && property.gallery.length > 0 ? property.gallery : [property.image]) : []
  
  // Get other properties (exclude current one, limit to 6)
  const otherProperties = allProperties
    .filter(p => p.id !== propertyId)
    .slice(0, 6)

  const handleNext = useCallback(() => {
    setSelectedImage((prev) => (prev + 1) % allImages.length)
    setZoom(1)
  }, [allImages.length])

  const handlePrevious = useCallback(() => {
    setSelectedImage((prev) => (prev - 1 + allImages.length) % allImages.length)
    setZoom(1)
  }, [allImages.length])

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 1))
  }

  // Keyboard navigation
  useEffect(() => {
    if (!isFullscreen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false)
        setZoom(1)
      } else if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    if (typeof window === 'undefined') return
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen, handleNext, handlePrevious])

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

      {/* Hero Gallery */}
      <section className="relative pt-28 md:pt-32 pb-12 md:pb-16 bg-white overflow-hidden">
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
            className="relative aspect-[16/10] md:aspect-[21/10] lg:aspect-[21/9] rounded-[20px] md:rounded-[28px] overflow-hidden mb-5 md:mb-6 group cursor-pointer"
            onClick={() => setIsFullscreen(true)}
          >
            <motion.img 
              key={selectedImage}
              src={allImages[selectedImage] || property.image || '/images/placeholder.jpg'} 
              alt={property.title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Status Badge */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-5 left-5 md:top-6 md:left-6 px-3.5 py-1.5 md:px-4 md:py-2 bg-white/95 backdrop-blur-md rounded-full shadow-md border border-white/50 z-10"
            >
              <span className="text-[12px] md:text-[13px] font-semibold text-black">{property.status || 'Available'}</span>
            </motion.div>

            {/* Action Buttons */}
            <div className="absolute top-5 right-5 md:top-6 md:right-6 flex items-center gap-2.5 md:gap-3 z-10">
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
                onClick={(e) => e.stopPropagation()}
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
                onClick={(e) => e.stopPropagation()}
              >
                <ShareNetwork className="w-4 h-4 md:w-5 md:h-5 text-black/70" weight="bold" />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, scale: 0.5, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.7,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg border border-white/50"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsFullscreen(true)
                }}
              >
                <ArrowsOut className="w-4 h-4 md:w-5 md:h-5 text-black/70" weight="bold" />
              </motion.button>
            </div>

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <ArrowsOut className="w-4 h-4 text-black" weight="bold" />
                <span className="text-sm font-medium text-black">Click to view fullscreen</span>
              </div>
            </div>
          </motion.div>

          {/* Gallery Thumbnails - Scrollable */}
          {allImages.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-2 pt-2 -mx-2 px-2">
                {allImages.map((img, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.4 + (index * 0.06), 
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                    onClick={() => setSelectedImage(index)}
                    className={`relative flex-shrink-0 w-24 md:w-32 aspect-video cursor-pointer rounded-xl transition-all duration-300 ${
                      selectedImage === index 
                        ? 'ring-2 ring-black ring-offset-2 ring-offset-white scale-105' 
                        : 'opacity-60 hover:opacity-80'
                    }`}
                  >
                    <div className="w-full h-full rounded-xl overflow-hidden">
                      <img 
                        src={img} 
                        alt={`Gallery ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {selectedImage === index && (
                      <div className="absolute inset-0 bg-black/10 rounded-xl pointer-events-none" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
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
                    { icon: Ruler, label: `${property.sqft} m²` },
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
                  {formatPrice(property.price)}
                </motion.div>
              </motion.div>

              {/* Description */}
              {(property.longDescription || property.description) && (
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
                      {property.longDescription || property.description}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-12 md:mb-14"
                >
                  <h2 className="text-[24px] md:text-[28px] font-semibold text-black mb-6 md:mb-7 tracking-[-0.02em]">Key Features</h2>
                  <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-black/40 flex-shrink-0 mt-0.5" weight="fill" />
                        <span className="text-[15px] md:text-[16px] text-black/70 leading-[1.6]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h2 className="text-[24px] md:text-[28px] font-semibold text-black mb-6 md:mb-7 tracking-[-0.02em]">Building Amenities</h2>
                  <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-black/40 flex-shrink-0 mt-0.5" weight="fill" />
                        <span className="text-[15px] md:text-[16px] text-black/70 leading-[1.6]">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
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
                      <Button 
                        onClick={() => {
                          if (typeof window !== 'undefined') {
                            const propertyTitle = property?.title || 'this property'
                            const message = encodeURIComponent(`Hello! I'm interested in scheduling a viewing for: ${propertyTitle}`)
                            window.open(`https://api.whatsapp.com/send/?phone=33662527879&text=${message}&type=phone_number&app_absent=0`, '_blank')
                          }
                        }}
                        className="w-full bg-black text-white hover:bg-black/90 border-0 px-6 py-3.5 rounded-full text-[15px] font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                      >
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
                      <Button 
                        onClick={() => router.push('/contact')}
                        className="w-full bg-[#404040] text-white hover:bg-[#4a4a4a] border-0 px-6 py-3.5 rounded-full text-[15px] font-semibold transition-all duration-200"
                      >
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

      {/* More Properties */}
      {otherProperties.length > 0 && (
        <section className="py-24 md:py-32 bg-black overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-12 md:mb-16"
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
            </motion.div>

            {/* Properties Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
              {otherProperties.map((prop, index) => (
                <Link key={prop.id} href={`/properties/${prop.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <img 
                        src={prop.image} 
                        alt={prop.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {prop.featured && (
                        <div className="absolute top-4 left-4 bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                          <Heart className="w-3 h-3" weight="fill" />
                          Featured
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-1.5 mb-2">
                        <MapPin className="w-4 h-4 text-black/40" weight="fill" />
                        <span className="text-xs font-medium text-black/50 uppercase tracking-wider">
                          {prop.location}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-black mb-3 line-clamp-2 group-hover:text-black/70 transition-colors">
                        {prop.title}
                      </h3>
                      
                      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-black/5">
                        <div className="flex items-center gap-1.5">
                          <Bed className="w-4 h-4 text-black/40" weight="duotone" />
                          <span className="text-sm font-medium text-black/70">{prop.beds}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Bathtub className="w-4 h-4 text-black/40" weight="duotone" />
                          <span className="text-sm font-medium text-black/70">{prop.baths}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Ruler className="w-4 h-4 text-black/40" weight="duotone" />
                          <span className="text-sm font-medium text-black/70">{prop.sqft} m²</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-semibold text-black">
                          {formatPrice(prop.price)}
                        </p>
                        <ArrowRight className="w-5 h-5 text-black/40 group-hover:text-black group-hover:translate-x-1 transition-all" weight="bold" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <Link href="/properties">
                <Button 
                  className="bg-white text-black hover:bg-white/90 border-0 px-8 py-3 rounded-full text-[15px] font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 mx-auto"
                >
                  View All Properties
                  <ArrowRight className="w-4 h-4" weight="bold" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Fullscreen Gallery Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
              onClick={() => {
                setIsFullscreen(false)
                setZoom(1)
              }}
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.1 }}
                onClick={() => {
                  setIsFullscreen(false)
                  setZoom(1)
                }}
                className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center transition-all duration-200 border border-white/20"
              >
                <X className="w-6 h-6 text-white" weight="bold" />
              </motion.button>

              {/* Zoom Controls */}
              <div className="absolute top-6 left-6 z-50 flex items-center gap-2">
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.15 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleZoomOut()
                  }}
                  disabled={zoom <= 1}
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center transition-all duration-200 border border-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <MagnifyingGlassMinus className="w-6 h-6 text-white" weight="bold" />
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.2 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleZoomIn()
                  }}
                  disabled={zoom >= 3}
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center transition-all duration-200 border border-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <MagnifyingGlassPlus className="w-6 h-6 text-white" weight="bold" />
                </motion.button>
              </div>

              {/* Image Counter */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <span className="text-sm font-medium text-white">
                  {selectedImage + 1} / {allImages.length}
                </span>
              </div>

              {/* Main Image Container */}
              <div 
                className="relative w-full h-full flex items-center justify-center p-6 md:p-12"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  key={selectedImage}
                  src={allImages[selectedImage] || property.image}
                  alt={`${property.title} - Image ${selectedImage + 1}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: zoom }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-full max-h-full object-contain select-none"
                  draggable={false}
                />
              </div>

              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.1 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePrevious()
                    }}
                    className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center transition-all duration-200 border border-white/20"
                  >
                    <ArrowLeft className="w-6 h-6 text-white" weight="bold" />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: 0.1 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleNext()
                    }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center transition-all duration-200 border border-white/20"
                  >
                    <ArrowRight className="w-6 h-6 text-white" weight="bold" />
                  </motion.button>
                </>
              )}

              {/* Thumbnails Strip */}
              {allImages.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[90%]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedImage(index)
                          setZoom(1)
                        }}
                        className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                          selectedImage === index
                            ? 'ring-2 ring-white scale-110'
                            : 'opacity-50 hover:opacity-75'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  )
}

