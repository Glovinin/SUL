"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export function CallToAction() {
    const router = useRouter()

    return (
        <section className="pt-20 md:pt-28 pb-0 bg-black">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[900px] mx-auto px-6 md:px-12 text-center"
            >
                <h2 className="text-[40px] md:text-[56px] font-semibold text-white mb-8 tracking-[-0.02em] leading-[1.15]">
                    Every search is unique
                </h2>
                <p className="text-[17px] md:text-[21px] font-normal text-white/80 mb-12 max-w-[640px] mx-auto leading-[1.5]">
                    Share your vision, we'll curate a personalized selection for you.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 w-full max-w-[480px] mx-auto">
                    {/* All buttons with consistent width */}
                    <Button
                        onClick={() => router.push('/find-property')}
                        className="bg-white text-black hover:bg-white/95 border-0 px-8 py-3.5 rounded-full text-[16px] font-medium transition-all duration-200 w-full shadow-sm hover:shadow-md"
                    >
                        Invest / Buy / Sell with us
                    </Button>

                    <Button
                        onClick={() => {
                            if (typeof window !== 'undefined') {
                                window.open('https://calendly.com/jules-portugal/45min', '_blank')
                            }
                        }}
                        className="bg-white text-black hover:bg-white/95 border-0 px-8 py-3.5 rounded-full text-[16px] font-medium transition-all duration-200 w-full shadow-sm hover:shadow-md"
                    >
                        Book a free call
                    </Button>

                    <Button
                        onClick={() => {
                            if (typeof window !== 'undefined') {
                                window.open('https://wa.me/33662527879', '_blank')
                            }
                        }}
                        className="bg-white text-black hover:bg-white/95 border-0 px-8 py-3.5 rounded-full text-[16px] font-medium transition-all duration-200 w-full shadow-sm hover:shadow-md"
                    >
                        Speak with us on WhatsApp
                    </Button>
                </div>
            </motion.div>
        </section>
    )
}
