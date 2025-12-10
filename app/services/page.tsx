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
  Lightbulb,
  Scales,
  Palette,
  Briefcase
} from '@phosphor-icons/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CallToAction } from '../../components/CallToAction'
import { useHeroImage } from '../../hooks/useHeroImage'

// Detailed services data
const detailedServices = [
  {
    number: '01',
    icon: Buildings,
    title: 'Strategy & Advisory',
    image: '/assets/services-images/Strategy & Advisory.jpg',
    description: 'We deliver sharp market analysis and strategic guidance to help you make informed real estate decisions in Portugal, from identifying opportunities to optimizing your investments.'
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
    description: 'We oversee your renovation or construction project from concept to completion, ensuring quality, timelines, and budget are respected, with clear coordination, rigorous control, and regular reporting at every stage.'
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
    description: 'We manage and optimize your property to preserve its value and maximize returns, handling everything from rentals and maintenance to financial reporting and strategic enhancements, all in full regulatory compliance.'
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
  const heroImage = useHeroImage('services', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&h=1080&fit=crop&q=80')

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-black pt-[72px]">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroImage}
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
            {/* <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8">
              <span className="text-[12px] font-medium text-white/90">Our Services</span>
            </div> */ /* Removed to match Homepage clean style */}
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
      {/* Detailed Services Section */}
      <section className="py-12 md:py-20 bg-gray-50 overflow-visible">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            {/* <div className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6">
              <span className="text-[12px] font-medium text-black/60">Services</span>
            </div> */ /* Removed to match Homepage clean style */}

            <h2 className="text-[36px] md:text-[48px] font-semibold text-black mb-6 tracking-[-0.02em] leading-[1.1]">
              What We Offer
            </h2>

            <p className="text-[17px] md:text-[20px] font-normal text-black/60 max-w-[700px] mx-auto leading-[1.6]">
              Five core services designed to guide you through every stage of your real estate journey in Portugal
            </p>
          </motion.div>

          {/* Services Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {detailedServices.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={index}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group relative h-[420px] rounded-[2rem] overflow-hidden"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-gray-900">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover opacity-90 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                    />
                    {/* Gradient Overlay - ensuring text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/90 opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* Content Overlay */}
                  <div className="relative h-full p-8 flex flex-col justify-between z-10">
                    {/* Top: Icon and Number */}
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <Icon className="w-5 h-5 text-white" weight="bold" />
                      </div>
                      <span className="text-[14px] font-mono font-medium text-white/50 tracking-widest">{service.number}</span>
                    </div>

                    {/* Bottom: Title and Description */}
                    <div>
                      <h3 className="text-[24px] font-semibold text-white mb-3 leading-[1.1] tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-[14px] font-medium text-white/70 leading-[1.5] line-clamp-3 group-hover:text-white/90 transition-colors duration-300">
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
      <section id="partners" className="relative py-12 md:py-20 bg-white overflow-visible">
        {/* Static Grid Background */}
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.03] stroke-black/[0.03]"
        />

        <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12 overflow-visible">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            {/* Badge Removed */}
            {/* <div className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6">
              <span className="text-[12px] font-medium text-black/60">Trusted Ecosystem</span>
            </div> */}

            {/* Main Title */}
            <h2 className="text-[40px] md:text-[56px] font-semibold text-black mb-8 tracking-[-0.02em] leading-[1.1] max-w-[900px] mx-auto">
              Trusted Ecosystem
            </h2>

            {/* Subtitle */}
            <p className="text-[17px] md:text-[21px] font-normal text-black/60 max-w-[900px] mx-auto leading-[1.6]">
              Surrounded by a handpicked network of professionals (lawyers, architects, engineers, designers and financial partners), SUL acts as the conductor of each project, from strategy to delivery.
            </p>
          </motion.div>

          {/* Partners Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 overflow-visible px-0 py-4 md:p-8">
            {/* Legal Advisors */}
            <div
              className="group bg-white border border-black/[0.06] hover:border-black/[0.12] rounded-3xl p-8 text-center transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] cursor-pointer hover:-translate-y-1 z-[1] hover:z-[10]"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Scales className="w-10 h-10 text-black/70 group-hover:text-black transition-colors duration-300" weight="duotone" />
              </div>
              <h3 className="text-[18px] font-semibold text-black mb-3 tracking-tight group-hover:text-black/80 transition-colors duration-300">
                Legal Advisors
              </h3>
              <p className="text-[14px] font-semibold text-black/80 mb-2 leading-[1.4]">
                Secure Transactions
              </p>
              <p className="text-[14px] font-normal text-black/60 leading-[1.6]">
                Expert lawyers ensuring safe, compliant and efficient legal processes from start to finish.
              </p>
            </div>

            {/* Architects & Engineers */}
            <div
              className="group bg-white border border-black/[0.06] hover:border-black/[0.12] rounded-3xl p-8 text-center transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] cursor-pointer hover:-translate-y-1 z-[1] hover:z-[10]"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Buildings className="w-10 h-10 text-black/70 group-hover:text-black transition-colors duration-300" weight="duotone" />
              </div>
              <h3 className="text-[18px] font-semibold text-black mb-3 tracking-tight group-hover:text-black/80 transition-colors duration-300">
                Architects & Engineers
              </h3>
              <p className="text-[14px] font-semibold text-black/80 mb-2 leading-[1.4]">
                Structural & Architectural Excellence
              </p>
              <p className="text-[14px] font-normal text-black/60 leading-[1.6]">
                Award-winning studios and engineering teams creating solid foundations and timeless, context-driven design.
              </p>
            </div>

            {/* Designers */}
            <div
              className="group bg-white border border-black/[0.06] hover:border-black/[0.12] rounded-3xl p-8 text-center transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] cursor-pointer hover:-translate-y-1 z-[1] hover:z-[10]"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Palette className="w-10 h-10 text-black/70 group-hover:text-black transition-colors duration-300" weight="duotone" />
              </div>
              <h3 className="text-[18px] font-semibold text-black mb-3 tracking-tight group-hover:text-black/80 transition-colors duration-300">
                Designers
              </h3>
              <p className="text-[14px] font-semibold text-black/80 mb-2 leading-[1.4]">
                Refined Interior Aesthetics
              </p>
              <p className="text-[14px] font-normal text-black/60 leading-[1.6]">
                Interior specialists crafting coherent, elegant and long-lasting atmospheres tailored to each project.
              </p>
            </div>

            {/* Financial Partners */}
            <div
              className="group bg-white border border-black/[0.06] hover:border-black/[0.12] rounded-3xl p-8 text-center transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] cursor-pointer hover:-translate-y-1 z-[1] hover:z-[10]"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Briefcase className="w-10 h-10 text-black/70 group-hover:text-black transition-colors duration-300" weight="duotone" />
              </div>
              <h3 className="text-[18px] font-semibold text-black mb-3 tracking-tight group-hover:text-black/80 transition-colors duration-300">
                Financial Partners
              </h3>
              <p className="text-[14px] font-semibold text-black/80 mb-2 leading-[1.4]">
                Strategic Financial Guidance
              </p>
              <p className="text-[14px] font-normal text-black/60 leading-[1.6]">
                Banks and financial advisors providing optimal financing solutions, investment structure and long-term planning.
              </p>
            </div>
          </div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.25 }}
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
      <CallToAction />

      {/* Footer */}
      <Footer />
    </div>
  )
}

