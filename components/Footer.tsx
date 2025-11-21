"use client"

import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'
import { motion } from 'framer-motion'
import { 
  EnvelopeSimple,
  Phone as PhoneIcon,
  MapPin,
  ArrowRight
} from '@phosphor-icons/react'

export function Footer() {

  return (
    <footer id="contact" className="bg-black text-white py-24 md:py-32">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        {/* Navigation Links */}
        <div className="mb-20 pb-20 border-b border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
            {/* Services */}
            <div>
              <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-6">Services</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/services" className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-light">
                    Investment Strategy
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-light">
                    Property Sourcing
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-light">
                    Project Oversight
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-light">
                    Management
                  </Link>
                </li>
              </ul>
            </div>

            {/* About Portugal */}
            <div>
              <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-6">About Portugal</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/portugal" className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-light">
                    Why Portugal
                  </Link>
                </li>
                <li>
                  <Link href="/portugal" className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-light">
                    Regions
                  </Link>
                </li>
                <li>
                  <Link href="/portugal" className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-light">
                    Investment Guide
                  </Link>
                </li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-6">About</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/about" className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-light">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-light">
                    Approach
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-light">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Collection */}
            <div>
              <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-6">Collection</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/properties" className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-light">
                    All Properties
                  </Link>
                </li>
                <li>
                  <Link href="/properties" className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-light">
                    Featured
                  </Link>
                </li>
                <li>
                  <Link href="/properties" className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-light">
                    New Listings
                  </Link>
                </li>
              </ul>
            </div>

            {/* Blog */}
            <div>
              <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-6">Blog</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/blog" className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-light">
                    Latest Posts
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-light">
                    Market Insights
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-light">
                    Guides
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-20">
          {/* Contact Info */}
          <div>
            <h3 className="text-[28px] font-semibold mb-12 tracking-tight">Contact</h3>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-white/50 mt-0.5 flex-shrink-0" weight="duotone" />
                <div>
                  <p className="text-[16px] font-normal text-white/70 leading-[1.6]">Portugal</p>
                  <p className="text-[16px] font-normal text-white/70 leading-[1.6]">Lisbon • Comporta • Algarve</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <EnvelopeSimple className="w-5 h-5 text-white/50 mt-0.5 flex-shrink-0" weight="duotone" />
                <a href="mailto:info@sul.pt" className="text-[16px] font-normal text-white/70 hover:text-white transition-colors duration-200">
                  info@sul.pt
                </a>
              </div>
              <div className="flex items-start space-x-4">
                <PhoneIcon className="w-5 h-5 text-white/50 mt-0.5 flex-shrink-0" weight="duotone" />
                <a href="tel:+351" className="text-[16px] font-normal text-white/70 hover:text-white transition-colors duration-200">
                  +351 XXX XXX XXX
                </a>
              </div>
            </div>
          </div>

          {/* Get in Touch - QR Code */}
          <div>
            <h3 className="text-[28px] font-semibold mb-12 tracking-tight">Get in Touch</h3>
            <p className="text-[16px] font-normal text-white/70 mb-8 leading-[1.6]">
              Scan the QR code to contact us on WhatsApp
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center"
            >
              <div className="bg-white p-4 rounded-2xl shadow-lg inline-block">
                <QRCodeSVG
                  value="https://wa.me/33662527879"
                  size={200}
                  level="H"
                  includeMargin={true}
                  className="rounded-lg"
                />
              </div>
            </motion.div>
            <p className="text-[14px] font-normal text-white/50 mt-6 text-center">
              Scan with your phone camera
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-[14px] font-normal text-white/50">
              © {new Date().getFullYear()} SUL. All rights reserved.
            </div>
            <div className="flex items-center space-x-8">
              <a href="#" className="text-[14px] font-normal text-white/50 hover:text-white/70 transition-colors duration-200">Privacy</a>
              <a href="#" className="text-[14px] font-normal text-white/50 hover:text-white/70 transition-colors duration-200">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}



