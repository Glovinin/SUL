"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Checkbox } from '../../components/ui/checkbox'
import { GridPattern } from '../../components/ui/grid-pattern'
import { Footer } from '../../components/Footer'
import { 
  ArrowRight,
  MagnifyingGlass,
  MapPin,
  Buildings,
  CurrencyEur,
  Ruler,
  Bed,
  User,
  EnvelopeSimple,
  Phone,
  ChatCircle
} from '@phosphor-icons/react'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'

export default function FindPropertyPage() {
  const [formData, setFormData] = useState({
    location: '',
    propertyType: '',
    maxPrice: '',
    minArea: '',
    rooms: '1',
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    message: '',
    receiveCommunications: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      receiveCommunications: checked
    })
  }

  const incrementRooms = () => {
    const current = parseInt(formData.rooms) || 1
    setFormData({
      ...formData,
      rooms: Math.min(current + 1, 20).toString()
    })
  }

  const decrementRooms = () => {
    const current = parseInt(formData.rooms) || 1
    setFormData({
      ...formData,
      rooms: Math.max(current - 1, 1).toString()
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/find-property', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form')
      }

      setSubmitSuccess(true)
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          location: '',
          propertyType: '',
          maxPrice: '',
          minArea: '',
          rooms: '1',
          lastName: '',
          firstName: '',
          email: '',
          phone: '',
          message: '',
          receiveCommunications: false
        })
        setSubmitSuccess(false)
      }, 5000)
    } catch (error: any) {
      // Handle error - você pode adicionar um estado de erro aqui
      alert('Erro ao enviar formulário. Por favor, tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-black pt-[72px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop&q=80"
            alt="Find Your Property"
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />
          {/* Vignette effect - Premium depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_40%,rgba(0,0,0,0.5)_100%)]" />
          {/* Modern gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 md:px-12 py-24 md:py-40">
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full mb-8"
            >
              <MagnifyingGlass className="w-4 h-4 text-white/90" weight="bold" />
              <span className="text-[12px] font-medium text-white/90 tracking-[0.05em]">Property Search</span>
            </motion.div>
            
            <motion.h1 
              className="text-[48px] md:text-[72px] lg:text-[88px] font-semibold tracking-[-0.03em] text-white leading-[1.05] mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Looking for your next home or investment?
            </motion.h1>
            
            <motion.p 
              className="text-[18px] md:text-[22px] lg:text-[24px] font-normal text-white/90 max-w-[800px] mx-auto leading-[1.65]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Fill out the form below and our team will help you find the perfect property that matches your criteria
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative pt-12 md:pt-20 pb-24 md:pb-40 bg-white overflow-hidden">
        <GridPattern
          width={40}
          height={40}
          className="fill-black/[0.015] stroke-black/[0.015]"
        />
        
        <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 text-center"
          >
          </motion.div>

          <form onSubmit={handleSubmit} className="max-w-[900px] mx-auto bg-white rounded-[32px] border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8 md:p-12">
            {/* LOCATION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-10"
            >
              <label className="block text-[13px] font-semibold text-black mb-3 uppercase tracking-[0.12em]">
                Location
              </label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/30 group-focus-within:text-black/50 transition-colors" weight="duotone" />
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, postal code, region, department..."
                  className="pl-12 h-14 border border-black/10 bg-white/50 text-black placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:border-black/20 rounded-xl transition-all duration-200 text-[15px]"
                />
              </div>
            </motion.div>

            {/* PROPERTY FEATURES */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10"
            >
              <label className="block text-[13px] font-semibold text-black mb-4 uppercase tracking-[0.12em]">
                Property Features
              </label>
              
              {/* Property Type */}
              <div className="mb-6">
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) => handleSelectChange('propertyType', value)}
                  required
                >
                  <SelectTrigger className="h-14 border border-black/10 bg-white/50 text-black focus:ring-2 focus:ring-black/20 rounded-xl transition-all duration-200">
                    <Buildings className="w-5 h-5 mr-2 text-black/30" weight="duotone" />
                    <SelectValue placeholder="Property*" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price and Area */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="relative group">
                  <CurrencyEur className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/30 group-focus-within:text-black/50 transition-colors" weight="duotone" />
                  <Input
                    name="maxPrice"
                    type="number"
                    value={formData.maxPrice}
                    onChange={handleChange}
                    placeholder="Maximum price*"
                    required
                    min="0"
                    className="pl-12 h-14 border border-black/10 bg-white/50 text-black placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:border-black/20 rounded-xl transition-all duration-200 text-[15px]"
                  />
                </div>
                <div className="relative group">
                  <Input
                    name="minArea"
                    type="number"
                    value={formData.minArea}
                    onChange={handleChange}
                    placeholder="Minimum area*"
                    required
                    min="0"
                    className="pr-14 h-14 border border-black/10 bg-white/50 text-black placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:border-black/20 rounded-xl transition-all duration-200 text-[15px]"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-black/50 text-sm font-medium">m²</span>
                </div>
              </div>

              {/* Number of Rooms */}
              <div>
                <label className="block text-[13px] font-semibold text-black mb-3 uppercase tracking-[0.12em]">
                  Number of rooms*
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={decrementRooms}
                    className="w-12 h-12 rounded-xl border border-black/10 bg-white hover:bg-black/5 hover:border-black/20 flex items-center justify-center transition-all duration-200"
                  >
                    <span className="text-black/60 text-xl font-medium">−</span>
                  </button>
                  <Input
                    name="rooms"
                    type="number"
                    value={formData.rooms}
                    onChange={handleChange}
                    min="1"
                    max="20"
                    className="w-24 h-14 border border-black/10 bg-white/50 text-black text-center text-lg font-semibold focus-visible:ring-2 focus-visible:ring-black/20 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={incrementRooms}
                    className="w-12 h-12 rounded-xl border border-black/10 bg-white hover:bg-black/5 hover:border-black/20 flex items-center justify-center transition-all duration-200"
                  >
                    <span className="text-black/60 text-xl font-medium">+</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* PERSONAL DETAILS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-10"
            >
              <label className="block text-[13px] font-semibold text-black mb-4 uppercase tracking-[0.12em]">
                Personal Details
              </label>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/30 group-focus-within:text-black/50 transition-colors" weight="duotone" />
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name*"
                    required
                    className="pl-12 h-14 border border-black/10 bg-white/50 text-black placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:border-black/20 rounded-xl transition-all duration-200 text-[15px]"
                  />
                </div>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/30 group-focus-within:text-black/50 transition-colors" weight="duotone" />
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name*"
                    required
                    className="pl-12 h-14 border border-black/10 bg-white/50 text-black placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:border-black/20 rounded-xl transition-all duration-200 text-[15px]"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative group">
                  <EnvelopeSimple className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/30 group-focus-within:text-black/50 transition-colors" weight="duotone" />
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email*"
                    required
                    className="pl-12 h-14 border border-black/10 bg-white/50 text-black placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:border-black/20 rounded-xl transition-all duration-200 text-[15px]"
                  />
                </div>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/30 group-focus-within:text-black/50 transition-colors" weight="duotone" />
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your number*"
                    required
                    className="pl-12 h-14 border border-black/10 bg-white/50 text-black placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:border-black/20 rounded-xl transition-all duration-200 text-[15px]"
                  />
                </div>
              </div>
            </motion.div>

            {/* ABOUT YOUR PROJECT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-10"
            >
              <label className="block text-[13px] font-semibold text-black mb-3 uppercase tracking-[0.12em]">
                About Your Project
              </label>
              <div className="relative group">
                <ChatCircle className="absolute left-4 top-4 w-5 h-5 text-black/30 group-focus-within:text-black/50 transition-colors" weight="duotone" />
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your project, preferences, timeline..."
                  rows={6}
                  className="pl-12 pt-4 border border-black/10 bg-white/50 text-black placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:border-black/20 rounded-xl resize-none transition-all duration-200 text-[15px]"
                />
              </div>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-black/[0.06] my-10"></div>

            {/* Checkbox */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-8"
            >
              <div className="flex items-start gap-3 p-4 rounded-xl bg-black/[0.02] hover:bg-black/[0.03] transition-colors">
                <Checkbox
                  id="communications"
                  checked={formData.receiveCommunications}
                  onCheckedChange={handleCheckboxChange}
                  className="mt-0.5"
                />
                <label
                  htmlFor="communications"
                  className="text-[14px] text-black/70 leading-[1.65] cursor-pointer flex-1"
                >
                  I would like to receive communication of real estate ads offered by SUL ESTATE.
                </label>
              </div>
            </motion.div>

            {/* Legal Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-10"
            >
              <p className="text-[12px] text-black/50 leading-[1.7]">
                SUL ESTATE processes your personal data in order to allow you to receive new similar real estate ads by e-mail. As such, you have a right of access, rectification, deletion, limitation, portability and withdrawal of your consent, under certain conditions. To know more about it:{' '}
                <Link href="/privacy" className="text-black/70 underline hover:text-black transition-colors font-medium">
                  Click here
                </Link>
              </p>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-center pt-4"
            >
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6"
                >
                  <p className="text-green-800 text-[15px] font-medium">Thank you! We'll contact you soon.</p>
                </motion.div>
              ) : null}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white hover:bg-black/90 border-0 px-12 py-4 rounded-xl text-[16px] font-semibold transition-all duration-200 shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] min-w-[220px] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-sm"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    SEND REQUEST
                    <ArrowRight className="w-4 h-4" weight="bold" />
                  </span>
                )}
              </Button>
            </motion.div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

