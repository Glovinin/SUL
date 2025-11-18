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
import { useSearchParams, useRouter } from 'next/navigation'
import { useProperties } from '../../lib/properties-client'
import { formatPrice } from '../../lib/format-price'

export default function PropertiesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { properties, loading } = useProperties()
  const [selectedType, setSelectedType] = useState<string>('All')
  const [selectedLocation, setSelectedLocation] = useState<string>('All')
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('')
  
  // Apply URL params on mount
  useEffect(() => {
    const typeParam = searchParams.get('type')
    const locationParam = searchParams.get('location')
    const priceParam = searchParams.get('price')
    
    if (typeParam) setSelectedType(typeParam)
    if (locationParam) setSelectedLocation(locationParam)
    if (priceParam) setSelectedPriceRange(priceParam)
  }, [searchParams])

  // Sort properties: featured first, then by creation date
  const sortedProperties = [...properties].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
  })

  // Filter properties
  const filteredProperties = sortedProperties.filter(property => {
    const matchesType = selectedType === 'All' || property.type === selectedType
    const matchesLocation = selectedLocation === 'All' || property.location === selectedLocation
    
    // Price filter logic
    let matchesPrice = true
    if (selectedPriceRange) {
      const priceNum = parseInt(property.price.replace(/[€.\s]/g, '')) || 0
      switch (selectedPriceRange) {
        case '500k-1m':
          matchesPrice = priceNum >= 500000 && priceNum <= 1000000
          break
        case '1m-2m':
          matchesPrice = priceNum >= 1000000 && priceNum <= 2000000
          break
        case '2m-5m':
          matchesPrice = priceNum >= 2000000 && priceNum <= 5000000
          break
        case '5m+':
          matchesPrice = priceNum >= 5000000
          break
        default:
          matchesPrice = true
      }
    }
    
    return matchesType && matchesLocation && matchesPrice
  })

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedType !== 'All') params.append('type', selectedType)
    if (selectedLocation !== 'All') params.append('location', selectedLocation)
    if (selectedPriceRange) params.append('price', selectedPriceRange)
    
    const queryString = params.toString()
    const newUrl = queryString ? `/properties?${queryString}` : '/properties'
    window.history.replaceState({}, '', newUrl)
  }, [selectedType, selectedLocation, selectedPriceRange])

  // Get unique types and locations
  const types = ['All', ...Array.from(new Set(properties.map(p => p.type).filter(Boolean)))]
  const locations = ['All', ...Array.from(new Set(properties.map(p => p.location).filter(Boolean)))]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <NavBar />

      {/* Hero Section - Ultra Premium */}
      <section className="relative pt-28 md:pt-36 pb-20 md:pb-28 bg-gradient-to-b from-gray-50/50 via-white to-white overflow-hidden">
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.015] stroke-black/[0.015]"
        />
        
        {/* Ambient Light Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-black/[0.03] via-transparent to-transparent blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16 md:mb-20"
          >
            {/* Badge Premium */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-black/[0.08] rounded-full mb-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></div>
              <span className="text-[11px] font-semibold text-black/70 tracking-[0.08em] uppercase">Exclusive Collection</span>
            </motion.div>
            
            {/* Título Principal - Hero */}
            <h1 className="text-[48px] md:text-[76px] lg:text-[88px] font-semibold text-black mb-7 tracking-[-0.04em] leading-[0.95] bg-clip-text">
              Premium Properties
            </h1>
            
            {/* Subtítulo Elegante */}
            <p className="text-[16px] md:text-[20px] lg:text-[22px] font-normal text-black/70 max-w-[750px] mx-auto leading-[1.65] tracking-[-0.01em]">
              Discover our curated selection of exceptional properties<br className="hidden md:block" />
              across Portugal's most desirable locations
            </p>
          </motion.div>

          {/* Filtros Premium - Estilo Apple */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[900px] mx-auto"
          >
            {/* Container de Filtros - Glass Morphism */}
            <div className="bg-white backdrop-blur-xl border border-black/[0.12] rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-6 md:p-8">
              <div className="flex flex-col gap-6">
                {/* Header dos Filtros */}
                <div className="flex items-center justify-between pb-4 border-b border-black/[0.08]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-black/[0.06] flex items-center justify-center">
                      <FunnelSimple className="w-5 h-5 text-black/70" weight="duotone" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-semibold text-black tracking-[-0.01em]">Filter Properties</h3>
                      <p className="text-[13px] text-black/55 mt-0.5">
                        {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
                      </p>
                    </div>
                  </div>
                  
                  {/* Clear Filters - Apenas se houver filtros ativos */}
                  <AnimatePresence>
                    {(selectedType !== 'All' || selectedLocation !== 'All' || selectedPriceRange) && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={() => {
                          setSelectedType('All')
                          setSelectedLocation('All')
                          setSelectedPriceRange('')
                        }}
                        className="text-[13px] font-medium text-black/50 hover:text-black transition-colors duration-200 flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-black/[0.04]"
                      >
                        <span>Clear all</span>
                        <span className="text-[10px]">✕</span>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Grid de Filtros */}
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Type Filter */}
                  <div className="space-y-2.5">
                    <label className="text-[12px] font-semibold text-black/50 tracking-[0.05em] uppercase px-1">
                      Property Type
                    </label>
                    <div className="relative">
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full bg-white border-2 border-black/[0.08] rounded-[14px] px-4 py-3.5 text-[15px] font-medium text-black hover:border-black/[0.15] focus:border-black/[0.25] transition-all cursor-pointer focus:outline-none appearance-none shadow-sm hover:shadow-md"
                      >
                        {types.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div className="space-y-2.5">
                    <label className="text-[12px] font-semibold text-black/50 tracking-[0.05em] uppercase px-1">
                      Location
                    </label>
                    <div className="relative">
                      <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full bg-white border-2 border-black/[0.08] rounded-[14px] px-4 py-3.5 text-[15px] font-medium text-black hover:border-black/[0.15] focus:border-black/[0.25] transition-all cursor-pointer focus:outline-none appearance-none shadow-sm hover:shadow-md"
                      >
                        {locations.map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="space-y-2.5">
                    <label className="text-[12px] font-semibold text-black/50 tracking-[0.05em] uppercase px-1">
                      Price Range
                    </label>
                    <div className="relative">
                      <select
                        value={selectedPriceRange}
                        onChange={(e) => setSelectedPriceRange(e.target.value)}
                        className="w-full bg-white border-2 border-black/[0.08] rounded-[14px] px-4 py-3.5 text-[15px] font-medium text-black hover:border-black/[0.15] focus:border-black/[0.25] transition-all cursor-pointer focus:outline-none appearance-none shadow-sm hover:shadow-md"
                      >
                        <option value="">All Prices</option>
                        <option value="500k-1m">€500K - €1M</option>
                        <option value="1m-2m">€1M - €2M</option>
                        <option value="2m-5m">€2M - €5M</option>
                        <option value="5m+">€5M+</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Active Filters Tags */}
                <AnimatePresence>
                  {(selectedType !== 'All' || selectedLocation !== 'All' || selectedPriceRange) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-wrap gap-2 pt-2"
                    >
                      {selectedType !== 'All' && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/[0.04] rounded-full">
                          <span className="text-[12px] font-medium text-black/70">{selectedType}</span>
                          <button
                            onClick={() => setSelectedType('All')}
                            className="text-black/50 hover:text-black transition-colors"
                          >
                            <span className="text-[10px]">✕</span>
                          </button>
                        </div>
                      )}
                      {selectedLocation !== 'All' && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/[0.04] rounded-full">
                          <span className="text-[12px] font-medium text-black/70">{selectedLocation}</span>
                          <button
                            onClick={() => setSelectedLocation('All')}
                            className="text-black/50 hover:text-black transition-colors"
                          >
                            <span className="text-[10px]">✕</span>
                          </button>
                        </div>
                      )}
                      {selectedPriceRange && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/[0.04] rounded-full">
                          <span className="text-[12px] font-medium text-black/70">
                            {selectedPriceRange === '500k-1m' && '€500K - €1M'}
                            {selectedPriceRange === '1m-2m' && '€1M - €2M'}
                            {selectedPriceRange === '2m-5m' && '€2M - €5M'}
                            {selectedPriceRange === '5m+' && '€5M+'}
                          </span>
                          <button
                            onClick={() => setSelectedPriceRange('')}
                            className="text-black/50 hover:text-black transition-colors"
                          >
                            <span className="text-[10px]">✕</span>
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="relative py-12 md:py-20 bg-white">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
              <p className="text-black/60">Loading properties...</p>
            </div>
          ) : (
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
                      {formatPrice(property.price)}
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
          )}

          {!loading && filteredProperties.length === 0 && (
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
              onClick={() => window.open('https://calendly.com/jules-portugal/45min?month=2025-11', '_blank')}
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

