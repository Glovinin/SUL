"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/button'
import { GridPattern } from '../../components/ui/grid-pattern'
import { NavBar } from '../../components/navbar'
import { Footer } from '../../components/Footer'
import { 
  EnvelopeSimple,
  Phone,
  MapPin,
  ArrowRight,
  User,
  ChatCircle,
  Clock,
  CaretDown,
  LinkedinLogo,
  InstagramLogo,
  FacebookLogo
} from '@phosphor-icons/react'
import Link from 'next/link'

export default function ContactPage() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic here
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <NavBar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-black pt-[72px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop&q=80"
            alt="Contact Us"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 md:px-12 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8"
            >
              <span className="text-[12px] font-medium text-white/90">Get In Touch</span>
            </motion.div>
            
            <motion.h1 
              className="text-[48px] md:text-[72px] lg:text-[80px] font-semibold tracking-[-0.03em] text-white leading-[1.05] mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Let's Start a Conversation
            </motion.h1>
            
            <motion.p 
              className="text-[18px] md:text-[22px] font-normal text-white/85 max-w-[800px] mx-auto leading-[1.6]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              We're here to help you find your perfect property in Portugal
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="relative py-20 md:py-32 bg-white overflow-hidden">
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.02] stroke-black/[0.02]"
        />
        
        <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-20">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mb-10"
              >
                <h2 className="text-[36px] md:text-[48px] font-semibold text-black mb-4 tracking-[-0.02em] leading-[1.1]">
                  Send us a message
                </h2>
                <p className="text-[17px] text-black/60 leading-[1.6]">
                  Fill out the form below and our team will get back to you within 24 hours
                </p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <label className="block text-[14px] font-medium text-black/70 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User 
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" 
                        weight="duotone" 
                      />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full bg-white border border-black/10 text-black placeholder-black/40 pl-12 pr-4 py-3.5 rounded-2xl focus:outline-none focus:border-black/30 focus:bg-black/[0.02] transition-all duration-200 text-[15px]"
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                  >
                    <label className="block text-[14px] font-medium text-black/70 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <EnvelopeSimple 
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" 
                        weight="duotone" 
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full bg-white border border-black/10 text-black placeholder-black/40 pl-12 pr-4 py-3.5 rounded-2xl focus:outline-none focus:border-black/30 focus:bg-black/[0.02] transition-all duration-200 text-[15px]"
                        required
                      />
                    </div>
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <label className="block text-[14px] font-medium text-black/70 mb-2">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone 
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" 
                        weight="duotone" 
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+351"
                        className="w-full bg-white border border-black/10 text-black placeholder-black/40 pl-12 pr-4 py-3.5 rounded-2xl focus:outline-none focus:border-black/30 focus:bg-black/[0.02] transition-all duration-200 text-[15px]"
                      />
                    </div>
                  </motion.div>

                  {/* Subject */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                  >
                    <label className="block text-[14px] font-medium text-black/70 mb-2">
                      Subject *
                    </label>
                    <div className="relative">
                      <ChatCircle 
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" 
                        weight="duotone" 
                      />
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-white border border-black/10 text-black pl-12 pr-4 py-3.5 rounded-2xl focus:outline-none focus:border-black/30 focus:bg-black/[0.02] transition-all duration-200 text-[15px] appearance-none"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="property-inquiry">Property Inquiry</option>
                        <option value="services">Services</option>
                        <option value="investment">Investment</option>
                        <option value="other">Other</option>
                      </select>
                      <CaretDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 pointer-events-none" weight="bold" />
                    </div>
                  </motion.div>
                </div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <label className="block text-[14px] font-medium text-black/70 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={6}
                    className="w-full bg-white border border-black/10 text-black placeholder-black/40 px-4 py-3.5 rounded-2xl focus:outline-none focus:border-black/30 focus:bg-black/[0.02] transition-all duration-200 text-[15px] resize-none"
                    required
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit"
                    className="w-full bg-black text-white hover:bg-black/90 border-0 px-8 py-4 rounded-full text-[15px] font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    Send Message
                    <ArrowRight className="w-5 h-5" weight="bold" />
                  </Button>
                </motion.div>
              </form>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <div className="space-y-6">
                {/* Email Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-[24px] p-6 border border-black/10 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center mb-4">
                    <EnvelopeSimple className="w-6 h-6 text-black/70" weight="duotone" />
                  </div>
                  <h3 className="text-[16px] font-semibold text-black mb-2">Email</h3>
                  <a href="mailto:info@sul.pt" className="text-[15px] text-black/60 hover:text-black transition-colors">
                    info@sul.pt
                  </a>
                </motion.div>

                {/* Phone Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="bg-white rounded-[24px] p-6 border border-black/10 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-black/70" weight="duotone" />
                  </div>
                  <h3 className="text-[16px] font-semibold text-black mb-2">Phone</h3>
                  <a href="tel:+351" className="text-[15px] text-black/60 hover:text-black transition-colors">
                    +351 XXX XXX XXX
                  </a>
                </motion.div>

                {/* Location Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white rounded-[24px] p-6 border border-black/10 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-black/70" weight="duotone" />
                  </div>
                  <h3 className="text-[16px] font-semibold text-black mb-2">Office</h3>
                  <p className="text-[15px] text-black/60 leading-[1.6]">
                    Lisbon, Portugal<br />
                    Avenida da Liberdade
                  </p>
                </motion.div>

                {/* Hours Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="bg-white rounded-[24px] p-6 border border-black/10 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-black/70" weight="duotone" />
                  </div>
                  <h3 className="text-[16px] font-semibold text-black mb-2">Hours</h3>
                  <p className="text-[15px] text-black/60 leading-[1.6]">
                    Monday - Friday<br />
                    9:00 AM - 6:00 PM
                  </p>
                </motion.div>
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="pt-6 border-t border-black/10"
              >
                <h3 className="text-[14px] font-medium text-black/70 mb-4">Follow Us</h3>
                <div className="flex items-center gap-3">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors"
                  >
                    <LinkedinLogo className="w-5 h-5 text-black/70" weight="fill" />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors"
                  >
                    <InstagramLogo className="w-5 h-5 text-black/70" weight="fill" />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors"
                  >
                    <FacebookLogo className="w-5 h-5 text-black/70" weight="fill" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 md:py-32 bg-gray-50 overflow-hidden">
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.02] stroke-black/[0.02]"
        />
        
        <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-[36px] md:text-[48px] font-semibold text-black mb-4 tracking-[-0.02em] leading-[1.1]">
              Frequently Asked Questions
            </h2>
            <p className="text-[17px] text-black/60 leading-[1.6]">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: 'How long does the property search process take?',
                answer: 'The timeline varies based on your requirements, but typically ranges from 2-6 months. We work efficiently while ensuring we find the perfect match for your needs.'
              },
              {
                question: 'Do you assist with financing and legal matters?',
                answer: 'Yes, we coordinate with trusted banking and legal partners to help structure financing and handle all legal aspects of your property transaction in Portugal.'
              },
              {
                question: 'Can you help with property renovation projects?',
                answer: 'Absolutely. We provide full project supervision services, managing contractors, timelines, and quality control from concept to completion.'
              },
              {
                question: 'What areas of Portugal do you cover?',
                answer: 'We focus on premium locations including Lisbon, Comporta, Algarve, Ericeira, and the Douro Valley, with deep local expertise in each region.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-[20px] p-6 border border-black/5 hover:border-black/10 transition-all duration-300"
              >
                <h3 className="text-[17px] font-semibold text-black mb-3">{faq.question}</h3>
                <p className="text-[15px] text-black/60 leading-[1.6]">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

