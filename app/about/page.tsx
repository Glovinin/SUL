"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/button'
import { GridPattern } from '../../components/ui/grid-pattern'
import { NavBar } from '../../components/navbar'
import { Footer } from '../../components/Footer'
import Link from 'next/link'
import { 
  ArrowRight,
  User,
  Briefcase,
  Sparkle,
  Handshake,
  Eye,
  Target,
  CheckCircle
} from '@phosphor-icons/react'

export default function AboutPage() {
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

      {/* About SUL Section */}
      <section className="relative py-32 md:py-40 bg-white overflow-visible">
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
      <section className="relative py-32 md:py-40 bg-gray-50 overflow-visible">
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
      <section className="relative py-32 md:py-40 bg-white overflow-visible">
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
      <section className="relative py-32 md:py-40 bg-gray-50 overflow-visible">
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

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-black">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2 
              className="text-[36px] md:text-[52px] font-semibold text-white mb-6 tracking-[-0.02em] leading-[1.1]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Ready to Start Your Journey?
            </motion.h2>
            <motion.p 
              className="text-[17px] md:text-[20px] font-normal text-white/80 mb-10 max-w-[700px] mx-auto leading-[1.6]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Let us guide you through Portugal's premium real estate market with precision, taste, and strategic vision.
            </motion.p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                >
                  <Button 
                    className="bg-white text-black hover:bg-white/90 border-0 px-8 py-3 rounded-full text-[15px] font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
                  >
                    Get In Touch
                    <ArrowRight className="w-4 h-4" weight="bold" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/properties">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                >
                  <Button 
                    variant="ghost"
                    className="bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/30 px-8 py-3 rounded-full text-[15px] font-semibold transition-all duration-200"
                  >
                    View Properties
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

