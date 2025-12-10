"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Button } from '../components/ui/button'
import { GridPattern } from '../components/ui/grid-pattern'
import { Footer } from '../components/Footer'
import { CallToAction } from '../components/CallToAction'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useFeaturedProperties, useProperties, usePortfolio } from '../lib/properties-client'
import { formatPrice } from '../lib/format-price'
import { useLoading } from '../contexts/loading-context'
import { TypingEffect } from '../components/typing-effect'
import {
  ArrowRight,
  Bed,
  Bathtub,
  ArrowsOut,
  User,
  Star,
  Buildings
} from '@phosphor-icons/react'
import { ListingCard } from '@/components/listing-card'

// Featured projects will be loaded from Firebase

export default function Home() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const { featuredProperties, loading: propertiesLoading } = useFeaturedProperties()
  const { properties: allProperties } = useProperties()
  const { portfolioItems, loading: portfolioLoading } = usePortfolio()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Optimized animation props for mobile
  const getAnimationProps = (delay = 0) => ({
    transition: {
      duration: isMobile ? 0.4 : 0.8,
      delay: isMobile ? delay * 0.5 : delay,
      ease: (isMobile ? [0.25, 0.1, 0.25, 1] : [0.22, 1, 0.36, 1]) as [number, number, number, number]
    },
    viewport: {
      once: true,
      margin: isMobile ? '0px' : '-50px',
      amount: isMobile ? 0.2 : undefined
    }
  })
  const videoRef = React.useRef<HTMLVideoElement>(null)
  // We can assume local files load reliably, simplified state
  const [videoLoaded, setVideoLoaded] = useState(false)
  // Direct local video source - utilizing the optimized WebM first
  const heroVideoWebM = '/videos/herovideo.webm'
  const heroVideoMp4 = '/videos/herovideo.mp4'
  const heroVideoPoster = '/images/hero-poster.jpg'

  const { isInitialLoading } = useLoading()
  const [pageCanAppear, setPageCanAppear] = useState(false)

  // Escutar evento para permitir que a página apareça suavemente
  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const handlePageCanAppear = () => {
      setPageCanAppear(true)
    }

    window.addEventListener('page-can-appear', handlePageCanAppear)

    // Se o loading já terminou, permitir que a página apareça
    if (!isInitialLoading) {
      setPageCanAppear(true)
    }

    return () => {
      window.removeEventListener('page-can-appear', handlePageCanAppear)
    }
  }, [isInitialLoading])

  // Instant visual feedback when video is ready
  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Force play on mount to ensure autoplay works
    const playVideo = async () => {
      try {
        await video.play()
        setVideoLoaded(true)
      } catch (err) {
        console.error("Video play failed:", err)
      }
    }

    playVideo()
  }, [])

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section - Ultra-Premium Design */}
      <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        {/* Background Video with Elegant Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Black fallback / Poster while loading */}
          <div className="absolute inset-0 bg-black z-0" />

          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={heroVideoPoster}
            className="absolute inset-0 w-full h-full object-cover scale-105 z-0"
          >
            <source src={heroVideoWebM} type="video/webm" />
            <source src={heroVideoMp4} type="video/mp4" />
          </video>

          {/* Vignette effect - Premium depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_60%,rgba(0,0,0,0.6)_100%)] z-1" />
          {/* Subtle cinematic grain */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] z-1 mix-blend-overlay pointer-events-none" />
          {/* Modern gradient overlays - Refined for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-1" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20 z-1" />
        </div>



        {/* Hero Content - Ultra Elegant Typography - iOS Style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: pageCanAppear ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.2 }} // Slightly smoother entry after loading
          className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-20"
        >
          <div className="text-center flex flex-col items-center justify-center min-h-[60vh] gap-10">
            {/* Main Heading - Large, Elegant, Minimalist - iOS Spring Animation */}
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={pageCanAppear ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.2
              }}
              className="text-[40px] sm:text-[52px] md:text-[64px] lg:text-[72px] xl:text-[80px] font-light tracking-[-0.03em] text-white leading-[1.05] max-w-[1200px] mx-auto"
            >
              <span className="inline-block drop-shadow-2xl">
                Real Estate & Investment<br className="hidden md:block" /> in Portugal
              </span>
            </motion.h1>

            {/* Subtitle - Refined, Harmonious - iOS Fade with Typing */}
            <div
              className="text-[18px] md:text-[22px] lg:text-[24px] font-light text-white/90 leading-[1.5] max-w-[720px] mx-auto tracking-[-0.02em] drop-shadow-lg"
            >
              {pageCanAppear && (
                <TypingEffect
                  text="We assist international clients finding their ideal home or investment."
                  speed={0.03}
                  delay={800} // This delay runs AFTER mount, so it adds to the fade-in time nicely
                  staggerDelay={0.02}
                />
              )}
            </div>
          </div>

        </motion.div>

        {/* Scroll Indicator - Premium - iOS Style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 2.5,
            ease: "easeOut"
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[10] hidden md:block"
        >
          <motion.div
            className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent relative overflow-hidden"
          >
            <motion.div
              animate={{ top: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
              className="absolute w-full h-1/2 bg-gradient-to-b from-transparent to-white"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Divider - Smooth Transition */}
      <div className="border-t border-black/[0.03] bg-white"></div>

      {/* About SUL Section - Premium Design */}
      <section className="relative py-12 md:py-20 bg-white overflow-hidden">
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.015] stroke-black/[0.015]"
        />

        {/* Ambient Light Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] max-w-full h-[400px] bg-gradient-radial from-black/[0.02] via-transparent to-transparent blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-[1000px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            {/* Main Description - Title replaced by text as primary focus */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[24px] md:text-[32px] lg:text-[36px] font-normal text-black/80 leading-[1.3] max-w-[900px] mx-auto"
            >
              SUL is an independent boutique real estate advisory, offering bespoke guidance in property acquisition, development, and management across Portugal.
            </motion.h2>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-black/[0.03]"></div>

      {/* Portfolio Section - Modern Apple Grid */}
      <section id="portfolio" className="py-12 md:py-20 bg-white overflow-visible">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12 overflow-visible pb-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-10"
          >
            {/* Main Title */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[36px] md:text-[48px] font-semibold text-black mb-4 tracking-[-0.02em] leading-[1.1] max-w-[900px] mx-auto"
            >
              SUL Collection Success Stories
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[17px] md:text-[19px] font-normal text-black/60 leading-[1.6] mb-8 max-w-[700px] mx-auto"
            >
              A selection of projects led, coordinated, or orchestrated by SUL, for our clients or our own portfolio.
            </motion.p>
          </motion.div>

          {/* Sort portfolio items: respect admin order */}
          {(() => {
            return (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-0 py-4 md:p-8 lg:p-12 overflow-visible">
                {portfolioLoading ? (
                  <div className="col-span-full text-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                    <p className="text-black/60">Loading portfolio...</p>
                  </div>
                ) : portfolioItems.length === 0 ? (
                  <div className="col-span-full text-center py-20">
                    <p className="text-black/60">No portfolio items available yet.</p>
                  </div>
                ) : (
                  portfolioItems.slice(0, 3).map((item, index) => (
                    <ListingCard
                      key={item.id}
                      id={item.id}
                      href={`/ portfolio / ${item.id} `}
                      image={item.image}
                      title={item.title}
                      location={item.location}
                      tag={item.tag}
                      featured={item.featured}
                      stats={{
                        beds: item.beds,
                        baths: item.baths,
                        sqft: item.sqft
                      }}
                    />
                  ))
                )}
              </div>
            )
          })()}

          {/* View Portfolio Button */}
          {portfolioItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12"
            >
              <Button
                onClick={() => router.push('/portfolio')}
                className="bg-black text-white hover:bg-black/90 border-0 px-8 py-3 rounded-full text-[15px] font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 mx-auto"
              >
                View our portfolio
                <ArrowRight className="w-4 h-4" weight="bold" />
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Find Property Section */}
      <section className="py-12 md:py-20 bg-white relative overflow-x-hidden">
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
            {/* Main Title */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[36px] md:text-[48px] font-semibold text-black mb-4 tracking-[-0.02em] leading-[1.1] max-w-[900px] mx-auto"
            >
              Looking for your next home or investment?
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[17px] md:text-[19px] font-normal text-black/60 leading-[1.6] mb-8 max-w-[700px] mx-auto"
            >
              Tell us about your project and what matters to you,
              we’ll source the perfect property, tailored to your criteria.
            </motion.p>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center"
            >
              <Button
                onClick={() => router.push('/find-property')}
                className="bg-black text-white hover:bg-black/90 border-0 px-8 py-3.5 rounded-full text-[16px] font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
              >
                Let’s discuss your project
                <ArrowRight className="w-4 h-4" weight="bold" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-black/[0.03]"></div>

      {/* Featured Projects Section - Modern Apple Grid */}
      <section id="projects" className="py-12 md:py-20 bg-white overflow-visible">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12 overflow-visible pb-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-10"
          >
            {/* Main Title */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[36px] md:text-[48px] font-semibold text-black mb-4 tracking-[-0.02em] leading-[1.1] max-w-[900px] mx-auto"
            >
              Exclusive collection of Properties
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[17px] md:text-[19px] font-normal text-black/60 leading-[1.6] mb-8 max-w-[700px] mx-auto"
            >
              Discover our curated selection of premium properties across Portugal.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-0 py-4 md:p-8 lg:p-12 overflow-visible">
            {propertiesLoading ? (
              <div className="col-span-full text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                <p className="text-black/60">Loading properties...</p>
              </div>
            ) : featuredProperties.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className="text-black/60">No properties available yet.</p>
              </div>
            ) : (
              featuredProperties.slice(0, 3).map((project, index) => (
                <ListingCard
                  key={project.id}
                  id={project.id}
                  href={`/ properties / ${project.id} `}
                  image={project.image}
                  title={project.title}
                  location={project.location}
                  tag={project.tag}
                  featured={project.featured}
                  price={project.price}
                  stats={{
                    beds: project.beds,
                    baths: project.baths,
                    sqft: project.sqft
                  }}
                />
              ))
            )}
          </div>

          {/* View All Properties Button */}
          {featuredProperties.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12"
            >
              <Button
                onClick={() => router.push('/properties')}
                className="bg-black text-white hover:bg-black/90 border-0 px-8 py-3 rounded-full text-[15px] font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 mx-auto"
              >
                View all Properties
                <ArrowRight className="w-4 h-4" weight="bold" />
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action Section - Apple Style */}
      <CallToAction />

      {/* Footer */}
      <Footer />
    </div>
  )
}
