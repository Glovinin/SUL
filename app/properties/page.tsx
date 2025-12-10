"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../components/ui/button'
import { GridPattern } from '../../components/ui/grid-pattern'
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
import { CallToAction } from '../../components/CallToAction'
import { useSearchParams, useRouter } from 'next/navigation'
import { useProperties } from '../../lib/properties-client'
import { formatPrice } from '../../lib/format-price'
import { ListingCard } from '@/components/listing-card'
import { useHeroImage } from '../../hooks/useHeroImage'

export default function PropertiesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { properties, loading } = useProperties()
  const heroImage = useHeroImage('properties', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&h=1080&fit=crop&q=80')
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

  // Use properties directly (sorted by order from the hook)
  const filteredProperties = properties.filter(property => {
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

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-black pt-[72px]">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroImage}
            alt="Properties"
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
              <span className="text-[12px] font-medium text-white/90">Premium Properties</span>
            </div> */ /* Removed to match Homepage clean style */}
            <h1 className="text-[48px] md:text-[72px] lg:text-[80px] font-semibold tracking-[-0.03em] text-white leading-[1.05] mb-6">
              PROPERTIES
            </h1>
            <p className="text-[18px] md:text-[22px] font-normal text-white/85 max-w-[800px] mx-auto leading-[1.6]">
              Discover our curated selection of premium properties across Portugal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Properties Section */}
      <section className="relative pt-16 md:pt-24 pb-8 md:pb-12 bg-white overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          {/* Filtros Premium - Estilo Apple */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
      <section className="relative pt-4 md:pt-6 pb-12 md:pb-20 bg-white">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
              <p className="text-black/60">Loading properties...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-0 py-4 md:p-8 lg:p-12 overflow-visible">
              {filteredProperties.map((property, index) => (
                <ListingCard
                  key={property.id}
                  id={property.id}
                  href={`/properties/${property.id}`}
                  image={property.image}
                  title={property.title}
                  location={property.location}
                  tag={property.tag}
                  price={property.price}
                  featured={property.featured}
                  stats={{
                    beds: property.beds,
                    baths: property.baths,
                    sqft: property.sqft
                  }}
                />
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

      {/* Find Property Section */}
      <section className="py-20 md:py-28 bg-white relative overflow-x-hidden">
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.02] stroke-black/[0.02]"
        />
        <div className="relative z-10 max-w-[1000px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            {/* Badge */}
            {/* <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6"
            >
              <span className="text-[12px] font-medium text-black/60">Property Search</span>
            </motion.div> */}

            {/* Main Title */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[40px] md:text-[52px] font-semibold text-black mb-6 tracking-[-0.02em] leading-[1.1] max-w-[900px] mx-auto"
            >
              Looking for your next home or investment?
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[17px] md:text-[19px] font-normal text-black/60 leading-[1.6] mb-10 max-w-[700px] mx-auto"
            >
              Tell us about your project and what matters to you —
              we'll source the perfect property, tailored to your criteria.
            </motion.p>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center"
            >
              <Button
                onClick={() => router.push('/find-property')}
                className="bg-black text-white hover:bg-black/90 border-0 px-8 py-3.5 rounded-full text-[16px] font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
              >
                Let's discuss your project
                <ArrowRight className="w-4 h-4" weight="bold" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section - Apple Style */}
      <CallToAction />

      {/* Footer */}
      <Footer />
    </div>
  )
}

