"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/button'
import { GridPattern } from '../../components/ui/grid-pattern'
import { NavBar } from '../../components/navbar'
import { Footer } from '../../components/Footer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { NumberTicker } from '../../components/ui/number-ticker'
import { useHomepageSettings } from '../../lib/properties-client'
import { 
  ArrowRight,
  User,
  Briefcase,
  Sparkle,
  Handshake,
  Eye,
  Target,
  CheckCircle,
  HardHat,
  Scales,
  Palette
} from '@phosphor-icons/react'

export default function AboutPage() {
  const router = useRouter()
  const { settings: homepageSettings } = useHomepageSettings()
  
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
              <span className="text-[12px] font-medium text-black/60">About SUL</span>
            </div>
            
            <h1 className="text-[40px] md:text-[64px] lg:text-[72px] font-semibold text-black mb-6 tracking-[-0.03em] leading-[1.1]">
              Boutique Real Estate<br />and Investment Consultancy
            </h1>
            
            <p className="text-[17px] md:text-[21px] font-normal text-black/60 max-w-[800px] mx-auto leading-[1.6]">
              A premium, independent and selective structure based in Lisbon, dedicated to guiding international investors through refined and stable real estate projects in Portugal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-black/[0.03]"></div>

      {/* About SUL Section - From Homepage */}
      <section id="about" className="relative py-20 md:py-28 bg-white overflow-visible">
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
                    <NumberTicker value={15} startValue={0} className="text-black" />+
                  </div>
                  <div className="text-[12px] md:text-[13px] font-medium text-black/60">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-[32px] md:text-[40px] font-semibold text-black mb-1 tracking-tight">
                    €<NumberTicker value={500} startValue={0} className="text-black" />M+
                  </div>
                  <div className="text-[12px] md:text-[13px] font-medium text-black/60">Portfolio</div>
                </div>
                <div className="text-center">
                  <div className="text-[32px] md:text-[40px] font-semibold text-black mb-1 tracking-tight">
                    <NumberTicker value={98} startValue={0} className="text-black" />%
                  </div>
                  <div className="text-[12px] md:text-[13px] font-medium text-black/60">Satisfaction</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-black/[0.03]"></div>

      {/* About SUL Section */}
      <section className="relative py-20 md:py-28 bg-white overflow-visible">
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.02] stroke-black/[0.02]"
        />
        
        <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center overflow-visible px-0 py-4 md:p-8">
            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[560px]"
            >
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6">
                <span className="text-[12px] font-medium text-black/60">Who We Are</span>
              </div>
              
              {/* Main Title */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-[40px] md:text-[52px] font-semibold text-black mb-8 tracking-[-0.02em] leading-[1.1]"
              >
                Independent. Experienced. Human.
              </motion.h2>
              
              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-[17px] md:text-[19px] font-normal text-black/60 mb-6 leading-[1.6]"
              >
                SUL by VS is a Lisbon-based boutique real estate and investment consultancy helping international investors secure, structure, and optimize refined property assets in Portugal.
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-[17px] md:text-[19px] font-normal text-black/60 leading-[1.6]"
              >
                We combine precision, rentability and long-term vision with strategy, taste, and trust — a human and discreet approach. We act as a bridge of confidence between investors and the Portuguese market — orchestrating every project with refinement and stability.
              </motion.p>
            </motion.div>

            {/* Visual Element */}
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] w-full max-w-[500px] mx-auto md:ml-auto md:mr-0"
            >
              <div className="group absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-black/[0.04] hover:border-black/[0.08]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(0,0,0,0.02)_0%,transparent_70%)] group-hover:bg-[radial-gradient(circle_at_70%_40%,rgba(0,0,0,0.04)_0%,transparent_70%)] transition-all duration-300"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-black/[0.03]"></div>

      {/* Vincent Santos Section */}
      <section className="relative py-20 md:py-28 bg-gray-50 overflow-visible">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12 overflow-visible">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center overflow-visible px-0 py-4 md:p-8">
            {/* Visual Element */}
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] w-full max-w-[500px] mx-auto md:mr-auto md:ml-0 order-2 md:order-1"
            >
              <div className="group absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-150 rounded-3xl shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-black/[0.04] hover:border-black/[0.08]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(0,0,0,0.02)_0%,transparent_70%)] group-hover:bg-[radial-gradient(circle_at_30%_60%,rgba(0,0,0,0.04)_0%,transparent_70%)] transition-all duration-300"></div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[560px] order-1 md:order-2"
            >
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6">
                <span className="text-[12px] font-medium text-black/60">Founder</span>
              </div>
              
              {/* Main Title */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-[40px] md:text-[52px] font-semibold text-black mb-8 tracking-[-0.02em] leading-[1.1]"
              >
                Vincent Santos
              </motion.h2>
              
              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-[17px] md:text-[19px] font-normal text-black/60 mb-6 leading-[1.6]"
              >
                Founded by Vincent Santos, trained in International Business Law in France and specialized for almost ten years in real estate investment and project management, the company brings together expertise, taste, and strategy.
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-[17px] md:text-[19px] font-normal text-black/60 leading-[1.6]"
              >
                Vincent's professionalism, network, and experience with international clients make him a trusted advisor for investors seeking stability, rentability, and design-led value. Being an investor himself, he brings the perspective of someone who has been on both sides — understanding the importance of returns, discretion, and long-term vision.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-black/[0.03]"></div>

      {/* Our Values Section */}
      <section className="relative py-20 md:py-28 bg-white overflow-visible">
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
            <div className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6">
              <span className="text-[12px] font-medium text-black/60">Our Values</span>
            </div>

            {/* Main Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[40px] md:text-[56px] font-semibold text-black mb-8 tracking-[-0.02em] leading-[1.1] max-w-[900px] mx-auto"
            >
              Trust, discretion, and long-term value
            </motion.h2>
          </motion.div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 overflow-visible px-0 py-4 md:p-8">
            {[
              {
                icon: Handshake,
                title: 'Trusted Partners',
                description: 'Surrounded by recognized professionals — architects, lawyers, designers, and financing partners — we act as a bridge of trust between international investors and the Portuguese market.'
              },
              {
                icon: Eye,
                title: 'Full Transparency',
                description: 'Our role is to curate, coordinate, and optimize every stage of a project, ensuring transparency, aesthetic consistency, and sustainable performance.'
              },
              {
                icon: Target,
                title: 'Long-term Vision',
                description: 'We believe the most successful investments are those that stand the test of time — both financially and aesthetically.'
              }
            ].map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative bg-white rounded-3xl p-8 text-center cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 border border-black/[0.06] hover:border-black/[0.1] hover:-translate-y-1"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Icon className="w-8 h-8 text-black/70 group-hover:text-black transition-colors duration-300" weight="duotone" />
                  </div>
                  <h3 className="text-[20px] font-semibold text-black mb-3 tracking-tight group-hover:text-black/80 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-[15px] font-normal text-black/60 leading-[1.6]">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-black/[0.03]"></div>

      {/* Approach Section */}
      <section className="relative py-20 md:py-28 bg-gray-50 overflow-visible">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12 overflow-visible">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[560px] mx-auto text-center"
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
            
            {/* Quote */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-6 border-l-2 border-black/20 mb-12 text-left"
            >
              <p className="text-[19px] md:text-[21px] font-normal text-black/80 italic leading-[1.6]">
                "We believe in strategy, discretion and beauty that endures."
              </p>
            </motion.div>

            {/* Method Points */}
            <div className="space-y-6 text-left">
              {[
                {
                  title: "Personalized Strategy",
                  description: "Every project begins with your goals"
                },
                {
                  title: "Trusted Partners",
                  description: "Legal, architectural, and financial experts with proven track records"
                },
                {
                  title: "Full Transparency",
                  description: "Clear costs, timelines, and objectives"
                },
                {
                  title: "Continuous Optimization",
                  description: "We refine, manage, and enhance value over time"
                }
              ].map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-4"
                >
                  <CheckCircle className="w-6 h-6 text-black/60 flex-shrink-0 mt-0.5" weight="fill" />
                  <div>
                    <h3 className="text-[17px] font-semibold text-black mb-1">
                      {point.title}
                    </h3>
                    <p className="text-[15px] font-normal text-black/60 leading-[1.6]">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
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

      {/* Divider */}
      <div className="border-t border-black/[0.03]"></div>

      {/* Call to Action Section - Apple Style */}
      <section className="py-20 md:py-28 bg-black">
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
          <div className="flex flex-col items-center justify-center gap-4 mb-8">
            <Button 
              onClick={() => router.push('/find-property')}
              className="bg-white text-black hover:bg-white/95 border-0 px-8 py-3.5 rounded-full text-[16px] font-medium transition-all duration-200 w-[280px] shadow-sm hover:shadow-md"
            >
              Invest / Buy with us
            </Button>
            <Button 
              onClick={() => router.push('/find-property')}
              className="bg-white text-black hover:bg-white/95 border-0 px-8 py-3.5 rounded-full text-[16px] font-medium transition-all duration-200 w-[280px] shadow-sm hover:shadow-md"
            >
              Sell with us
            </Button>
            <Button 
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.open('https://calendly.com/jules-portugal/45min', '_blank')
                }
              }}
              className="bg-white text-black hover:bg-white/95 border-0 px-8 py-3.5 rounded-full text-[16px] font-medium transition-all duration-200 w-[280px] shadow-sm hover:shadow-md"
            >
              Book a free call
            </Button>
            <Button 
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.open('https://wa.me/33662527879', '_blank')
                }
              }}
              className="bg-white text-black hover:bg-white/95 border-0 px-8 py-3.5 rounded-full text-[16px] font-medium transition-all duration-200 w-[280px] shadow-sm hover:shadow-md"
            >
              Speak with us on WhatsApp
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

