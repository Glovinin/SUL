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
  ArrowRight,
  InstagramLogo,
  LinkedinLogo,
  WhatsappLogo
} from '@phosphor-icons/react'

export function Footer() {

  return (
    <footer id="contact" className="bg-black text-white pt-12 pb-24 md:pt-16 md:pb-32">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0 mb-32 pt-10">

          {/* Contact Info - Aligned Left */}
          <div className="flex flex-col gap-6 max-w-[280px]">
            <h3 className="text-[24px] font-medium tracking-tight mb-2">Contact</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 group cursor-default">
                <MapPin className="w-5 h-5 text-white/40 group-hover:text-white transition-colors duration-300" weight="light" />
                <span className="text-[15px] font-light tracking-wide">Portugal • Lisboa</span>
              </div>

              <a href="mailto:vinsvs@hotmail.com" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 group">
                <EnvelopeSimple className="w-5 h-5 text-white/40 group-hover:text-white transition-colors duration-300" weight="light" />
                <span className="text-[15px] font-light tracking-wide">vinsvs@hotmail.com</span>
              </a>

              <a href="tel:+33662527879" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 group">
                <PhoneIcon className="w-5 h-5 text-white/40 group-hover:text-white transition-colors duration-300" weight="light" />
                <span className="text-[15px] font-light tracking-wide">+33 6 62 52 78 79</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-5 mt-4 pt-6 border-t border-white/10">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-300 hover:scale-110 transform">
                <InstagramLogo className="w-6 h-6" weight="regular" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-300 hover:scale-110 transform">
                <LinkedinLogo className="w-6 h-6" weight="regular" />
              </a>
              <a href="https://wa.me/33662527879" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-300 hover:scale-110 transform">
                <WhatsappLogo className="w-6 h-6" weight="regular" />
              </a>
            </div>
          </div>

          {/* Navigation - Centered */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[24px] font-medium tracking-tight mb-2">Explore</h3>
            <div className="grid grid-cols-2 gap-x-12 gap-y-3">
              <Link href="/" className="text-[15px] font-light text-white/50 hover:text-white transition-colors duration-300">Home</Link>
              <Link href="/portfolio" className="text-[15px] font-light text-white/50 hover:text-white transition-colors duration-300">Portfolio</Link>
              <Link href="/services" className="text-[15px] font-light text-white/50 hover:text-white transition-colors duration-300">Services</Link>
              <Link href="/properties" className="text-[15px] font-light text-white/50 hover:text-white transition-colors duration-300">Properties</Link>
              <Link href="/portugal" className="text-[15px] font-light text-white/50 hover:text-white transition-colors duration-300">Portugal</Link>
              <Link href="/blog" className="text-[15px] font-light text-white/50 hover:text-white transition-colors duration-300">Blog</Link>
              <Link href="/about" className="text-[15px] font-light text-white/50 hover:text-white transition-colors duration-300">About</Link>
              <Link href="/login" className="text-[15px] font-light text-white/50 hover:text-white transition-colors duration-300">Login</Link>
            </div>
          </div>

          {/* Get in Touch - Aligned Right */}
          <div className="flex flex-col items-start md:items-end text-left md:text-right">
            <h3 className="text-[24px] font-medium tracking-tight mb-2">Get in Touch</h3>
            <p className="text-[15px] font-light text-white/50 mb-6 max-w-[200px] leading-relaxed">
              Scan via WhatsApp for direct assistance
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-white p-2.5 rounded-xl shadow-2xl relative group">
                {/* Decorative corner accent */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white/20 rounded-full blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <QRCodeSVG
                  value="https://wa.me/33662527879"
                  size={100}
                  level="H"
                  includeMargin={false}
                  className="rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Bottom - Minimalist Divider */}
        <div className="border-t border-white/5 pt-8 flex flex-col items-center justify-center text-center">
          <p className="text-[12px] font-light text-white/30 tracking-wider uppercase">
            © {new Date().getFullYear()} SUL Estate • All rights reserved
          </p>
          <div className="flex gap-6 mt-4">
            <a href="#" className="text-[12px] text-white/20 hover:text-white/50 transition-colors">Privacy</a>
            <a href="#" className="text-[12px] text-white/20 hover:text-white/50 transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* Elegant Infinite Scrolling Text */}
      <div className="w-full overflow-hidden pt-20 pb-0 mt-auto select-none pointer-events-none fade-mask relative z-0">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 5
          }}
          style={{ willChange: "transform" }}
        >
          {/* Duplicated text for seamless loop - Premium Apple aesthetic */}
          {[...Array(12)].map((_, i) => (
            <span key={i} className="text-[8vh] md:text-[13vh] font-semibold text-white/90 leading-none mr-16 md:mr-32 tracking-[-0.03em] antialiased">
              SUL • Exclusive Real Estate
            </span>
          ))}
        </motion.div>
      </div>
    </footer>
  )
}



