"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../components/ui/button'
import { GridPattern } from '../../components/ui/grid-pattern'
import { NavBar } from '../../components/navbar'
import { Footer } from '../../components/Footer'
import { 
  Bed,
  Bathtub,
  ArrowsOut,
  ArrowRight,
  FunnelSimple
} from '@phosphor-icons/react'
import Link from 'next/link'
import Image from 'next/image'
import { properties } from '../../data/properties'
import { useSearchParams } from 'next/navigation'

export default function PropertiesPage() {
  const searchParams = useSearchParams()
  const [selectedType, setSelectedType] = useState<string>('All')
  const [selectedLocation, setSelectedLocation] = useState<string>('All')
  
  // Apply URL params on mount
  useEffect(() => {
    const typeParam = searchParams.get('type')
    const locationParam = searchParams.get('location')
    
    if (typeParam) setSelectedType(typeParam)
    if (locationParam) setSelectedLocation(locationParam)
  }, [searchParams])

  // Filter properties
  const filteredProperties = properties.filter(property => {
    const matchesType = selectedType === 'All' || property.type === selectedType
    const matchesLocation = selectedLocation === 'All' || property.location === selectedLocation
    return matchesType && matchesLocation
  })

  // Get unique types and locations
  const types = ['All', ...Array.from(new Set(properties.map(p => p.type)))]
  const locations = ['All', ...Array.from(new Set(properties.map(p => p.location)))]

  return (
    <div className="min-h-screen bg-white">
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
              <span className="text-[12px] font-medium text-black/60">Exclusive Collection</span>
            </div>
            
            <h1 className="text-[40px] md:text-[64px] lg:text-[72px] font-semibold text-black mb-6 tracking-[-0.03em] leading-[1.1]">
              Premium Properties
            </h1>
            
            <p className="text-[17px] md:text-[21px] font-normal text-black/60 max-w-[800px] mx-auto leading-[1.6]">
              Discover our curated selection of exceptional properties across Portugal's most desirable locations
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-12"
          >
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-black/10 shadow-sm">
              <FunnelSimple className="w-4 h-4 text-black/50" weight="bold" />
              <span className="text-[13px] font-medium text-black/70">Filters:</span>
            </div>
            
            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-white rounded-full px-5 py-2 border border-black/10 shadow-sm text-[13px] font-medium text-black/70 hover:border-black/20 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/10"
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-white rounded-full px-5 py-2 border border-black/10 shadow-sm text-[13px] font-medium text-black/70 hover:border-black/20 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/10"
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            {(selectedType !== 'All' || selectedLocation !== 'All') && (
              <button
                onClick={() => {
                  setSelectedType('All')
                  setSelectedLocation('All')
                }}
                className="text-[13px] font-medium text-black/50 hover:text-black underline"
              >
                Clear filters
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="relative py-12 md:py-20 bg-white">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-0 py-4 md:p-8 lg:p-12 overflow-visible">
            {filteredProperties.map((property, index) => (
              <Link key={property.id} href={`/properties/${property.id}`}>
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
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-800 ease-out group-hover:scale-[1.08]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  
                  {/* Tag Badge - Ultra Premium */}
                  <div className="absolute top-6 left-6 z-20">
                    <div className="bg-white/95 backdrop-blur-2xl px-4 py-2 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                      <span className="text-[10px] font-semibold text-black tracking-[0.08em] uppercase">{property.tag}</span>
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
                      {property.location}
                    </p>
                  </div>
                  
                  {/* Title - Bold & Clean */}
                  <h3 className="text-[20px] md:text-[22px] font-semibold text-black mb-4 tracking-[-0.02em] leading-[1.2] group-hover:text-black/60 transition-colors duration-500">
                    {property.title}
                  </h3>
                  
                  {/* Price - Hero Element */}
                  <div className="mb-6">
                    <p className="text-[32px] md:text-[36px] font-semibold text-black tracking-[-0.02em] leading-none">
                      {property.price}
                    </p>
                  </div>
                  
                  {/* Property Stats - Refined */}
                  <div className="flex items-center gap-6 pt-5 border-t border-black/[0.06]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-black/[0.03] flex items-center justify-center group-hover:bg-black/[0.05] transition-colors duration-300">
                        <Bed className="w-[17px] h-[17px] text-black/50" weight="duotone" />
                      </div>
                      <span className="text-[14px] font-medium text-black/70">{property.beds}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-black/[0.03] flex items-center justify-center group-hover:bg-black/[0.05] transition-colors duration-300">
                        <Bathtub className="w-[17px] h-[17px] text-black/50" weight="duotone" />
                      </div>
                      <span className="text-[14px] font-medium text-black/70">{property.baths}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-black/[0.03] flex items-center justify-center group-hover:bg-black/[0.05] transition-colors duration-300">
                        <ArrowsOut className="w-[17px] h-[17px] text-black/50" weight="duotone" />
                      </div>
                      <span className="text-[14px] font-medium text-black/70">{property.sqft}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              </Link>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-[17px] text-black/50">No properties found matching your filters.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-black">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-[36px] md:text-[52px] font-semibold text-white mb-6 tracking-[-0.02em] leading-[1.1]">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-[17px] md:text-[20px] font-normal text-white/80 mb-10 max-w-[700px] mx-auto leading-[1.6]">
              Our team has access to exclusive off-market properties. Let us know your requirements and we'll find your perfect match.
            </p>
            <Button 
              className="bg-white text-black hover:bg-white/90 border-0 px-8 py-3 rounded-full text-[15px] font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 mx-auto"
            >
              Contact Our Team
              <ArrowRight className="w-4 h-4" weight="bold" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

