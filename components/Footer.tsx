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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 mb-16 text-center md:text-left">
                    {/* Contact Info */}
                    <div>
                        <h4 className="text-[17px] font-medium text-white mb-8 tracking-wide">Contact</h4>
                        <div className="space-y-6">
                            <div className="flex items-center justify-center md:justify-start space-x-4 group">
                                <MapPin className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" weight="duotone" />
                                <div>
                                    <p className="text-[15px] font-normal text-white/60 leading-[1.6]">Lisboa</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center md:justify-start space-x-4 group">
                                <EnvelopeSimple className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" weight="duotone" />
                                <a href="mailto:vinsvs@hotmail.com" className="text-[15px] font-normal text-white/60 hover:text-white transition-colors duration-200">
                                    vinsvs@hotmail.com
                                </a>
                            </div>
                            <div className="flex items-center justify-center md:justify-start space-x-4 group">
                                <PhoneIcon className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" weight="duotone" />
                                <a href="tel:+33662527879" className="text-[15px] font-normal text-white/60 hover:text-white transition-colors duration-200">
                                    +33 6 62 52 78 79
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Menu Section */}
                    <div>
                        <h4 className="text-[17px] font-medium text-white mb-8 tracking-wide">Menu</h4>
                        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                            <Link href="/" className="text-[15px] text-white/60 hover:text-white transition-colors duration-200 font-light">
                                Home
                            </Link>
                            <Link href="/services" className="text-[15px] text-white/60 hover:text-white transition-colors duration-200 font-light">
                                Services
                            </Link>
                            <Link href="/properties" className="text-[15px] text-white/60 hover:text-white transition-colors duration-200 font-light">
                                Properties
                            </Link>
                            <Link href="/portfolio" className="text-[15px] text-white/60 hover:text-white transition-colors duration-200 font-light">
                                Portfolio
                            </Link>
                            <Link href="/about" className="text-[15px] text-white/60 hover:text-white transition-colors duration-200 font-light">
                                About Us
                            </Link>
                            <Link href="/portugal" className="text-[15px] text-white/60 hover:text-white transition-colors duration-200 font-light">
                                About Portugal
                            </Link>
                            <Link href="/blog" className="text-[15px] text-white/60 hover:text-white transition-colors duration-200 font-light">
                                Blog
                            </Link>
                            <Link href="/contact" className="text-[15px] text-white/60 hover:text-white transition-colors duration-200 font-light">
                                Contact
                            </Link>
                            <Link href="/login" className="text-[15px] text-white/60 hover:text-white transition-colors duration-200 font-light">
                                Login
                            </Link>
                        </nav>
                    </div>

                    {/* Get in Touch - QR Code */}
                    <div className="flex flex-col items-center md:items-center text-center md:text-center">
                        <h4 className="text-[17px] font-medium text-white mb-8 tracking-wide">Get in Touch</h4>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-white p-2.5 rounded-xl shadow-lg inline-block mb-4"
                        >
                            <QRCodeSVG
                                value="https://wa.me/33662527879"
                                size={120}
                                level="H"
                                includeMargin={true}
                                className="rounded-lg"
                            />
                        </motion.div>
                        <p className="text-[13px] font-normal text-white/40 max-w-[200px] leading-relaxed mx-auto">
                            Scan to chat on WhatsApp
                        </p>
                    </div>
                </div>
            </div>

            {/* Infinite Scrolling Text */}
            <div className="w-full overflow-hidden border-t border-white/[0.08] border-b mb-8">
                <div className="flex whitespace-nowrap py-6 md:py-10">
                    <motion.div
                        className="flex-shrink-0 flex items-center gap-8 md:gap-16 px-4"
                        animate={{ x: "-100%" }}
                        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
                    >
                        {[...Array(10)].map((_, i) => (
                            <span key={i} className="text-[60px] md:text-[120px] font-bold tracking-tighter text-white uppercase">
                                SUL • REAL ESTATE •
                            </span>
                        ))}
                    </motion.div>
                    <motion.div
                        className="flex-shrink-0 flex items-center gap-8 md:gap-16 px-4"
                        animate={{ x: "-100%" }}
                        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
                    >
                        {[...Array(10)].map((_, i) => (
                            <span key={`dup-${i}`} className="text-[60px] md:text-[120px] font-bold tracking-tighter text-white uppercase">
                                SUL • REAL ESTATE •
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="max-w-[1300px] mx-auto px-6 md:px-12">
                <div className="pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-center text-center">
                        <p className="text-[13px] font-light text-white/40">
                            © {new Date().getFullYear()} SUL. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
