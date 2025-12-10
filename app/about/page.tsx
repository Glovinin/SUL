"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/button'
import { GridPattern } from '../../components/ui/grid-pattern'
import { Footer } from '../../components/Footer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { NumberTicker } from '../../components/ui/number-ticker'
import { CallToAction } from '../../components/CallToAction'
import { useHomepageSettings } from '../../lib/properties-client'
import {
  ArrowRight,
  User,
  Sparkle,
  Handshake,
  Eye,
  Target,
  CheckCircle,
  MagnifyingGlass,
  Shield,
  ChartLine
} from '@phosphor-icons/react'
import { useHeroImage } from '../../hooks/useHeroImage'

export default function AboutPage() {
  const router = useRouter()
  const { settings: homepageSettings } = useHomepageSettings()
  const heroImage = useHeroImage('about', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop&q=80')

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-black pt-[72px]">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroImage}
            alt="About SUL"
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
              <span className="text-[12px] font-medium text-white/90">About SUL</span>
            </div> */ /* Removed to match Homepage clean style */}
            <h1 className="text-[48px] md:text-[72px] lg:text-[80px] font-semibold tracking-[-0.03em] text-white leading-[1.05] mb-6">
              The Story Behind SUL
            </h1>
            <p className="text-[18px] md:text-[22px] font-normal text-white/85 max-w-[800px] mx-auto leading-[1.6]">
              Local expertise with a global perspective, delivering discreet, tailored and detail-driven property advisory for exceptional opportunities in Portugal.
            </p>
          </motion.div>
        </div>
      </section>


      {/* About SUL Section - From Homepage */}
      <section id="about" className="relative py-12 md:py-20 bg-white overflow-visible">
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
              /* Removed entrance animation to match homepage performance */
              viewport={{ once: true }}
              className="group relative aspect-[4/5] w-full max-w-[500px] mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-black/[0.04] hover:border-black/[0.08]"
            >
              {homepageSettings?.aboutUsImage ? (
                <img
                  src={homepageSettings.aboutUsImage}
                  alt="About Us"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[14px] font-medium text-black/20 group-hover:text-black/30 transition-colors duration-300">Vincent Santos</span>
                </div>
              )}
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
              {/* <div className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6">
                <span className="text-[12px] font-medium text-black/60">About Us</span>
              </div> */}

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
                  Founded by Vincent Santos, trained in International Business Law, SUL brings over a decade of experience in real estate investment, project management, and premium property advisory in Portugal. Living in Lisbon with his family, Vincent has invested personally in key regions such as Lisboa (Estrela, Chiado), the Algarve (Lagos), Azeitão (vineyard estates), and Sesimbra (South Coast), combining local experience with international perspective.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[17px] md:text-[19px] font-normal"
                >
                  Surrounded by a handpicked network of professionals (lawyers, architects, engineers, designers, and bankers), SUL acts as the conductor of each project, from strategy to delivery. SUL believes in a human, bespoke, and demanding approach.
                </motion.p>
              </div>

              {/* Stats Section - Moved from Hero */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-3 gap-4 md:gap-6 mt-12 pt-12 border-t border-black/10"
              >
                <div className="text-center">
                  <div className="text-[32px] md:text-[40px] font-semibold text-black mb-1 tracking-tight">
                    <NumberTicker value={10} startValue={0} className="text-black" />
                  </div>
                  <div className="text-[12px] md:text-[13px] font-medium text-black/60">years experience</div>
                </div>
                <div className="text-center">
                  <div className="text-[32px] md:text-[40px] font-semibold text-black mb-1 tracking-tight">
                    <NumberTicker value={200} startValue={0} className="text-black" />+
                  </div>
                  <div className="text-[12px] md:text-[13px] font-medium text-black/60">clients advised</div>
                </div>
                <div className="text-center">
                  <div className="text-[32px] md:text-[40px] font-semibold text-black mb-1 tracking-tight">
                    <NumberTicker value={23} startValue={0} className="text-black" />
                  </div>
                  <div className="text-[12px] md:text-[13px] font-medium text-black/60">nationalities</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-black/[0.03]"></div>



      {/* Our Values Section */}
      <section className="relative py-12 md:py-20 bg-white overflow-visible">
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.02] stroke-black/[0.02]"
        />

        <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            {/* Badge */}
            {/* <div className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6">
              <span className="text-[12px] font-medium text-black/60">Our Values & Approach</span>
            </div> */}

            {/* Main Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[40px] md:text-[56px] font-semibold text-black mb-8 tracking-[-0.02em] leading-[1.1] max-w-[900px] mx-auto"
            >
              Our Values & Approach
            </motion.h2>
          </motion.div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 overflow-visible px-0 py-4 md:p-8">
            {[
              {
                icon: MagnifyingGlass,
                title: 'Clarity & Transparency',
                subtitle: 'Clear process, clear costs, clear timelines.',
                description: 'We guide every step with total visibility and honest communication.'
              },
              {
                icon: Shield,
                title: 'Integrity & Discretion',
                subtitle: 'Ethical decisions and absolute confidentiality.',
                description: 'Your privacy and long-term interests always come first.'
              },
              {
                icon: Handshake,
                title: 'Trusted Network',
                subtitle: 'Architects, lawyers, designers and financial advisors.',
                description: 'A curated ecosystem of excellence bridging international investors with the Portuguese market.'
              },
              {
                icon: ChartLine,
                title: 'Long-Term Vision',
                subtitle: 'Strategy, optimization and enduring value.',
                description: 'We craft and refine projects for lasting aesthetic and financial performance.'
              }
            ].map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  /* Removed entrance animation to match homepage performance */
                  viewport={{ once: true }}
                  className="group relative bg-white rounded-3xl p-8 text-center cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 border border-black/[0.06] hover:border-black/[0.1] hover:-translate-y-1"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Icon className="w-8 h-8 text-black/70 group-hover:text-black transition-colors duration-300" weight="duotone" />
                  </div>
                  <h3 className="text-[20px] font-semibold text-black mb-2 tracking-tight group-hover:text-black/80 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-[14px] font-semibold text-black/80 mb-2 leading-[1.4]">
                    {value.subtitle}
                  </p>
                  <p className="text-[15px] font-normal text-black/60 leading-[1.6]">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>


      {/* Call to Action Section - Apple Style */}
      <CallToAction />

      {/* Footer */}
      <Footer />
    </div>
  )
}

