"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Star, Bed, Bathtub, ArrowsOut, ArrowRight } from '@phosphor-icons/react'
import { formatPrice } from '@/lib/format-price'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface ListingCardProps {
    id: string
    image: string
    title: string
    location: string
    tag?: string
    featured?: boolean
    href: string
    price?: number
    stats?: {
        beds?: string
        baths?: string
        sqft?: string
    }
    className?: string
    index?: number // kept for potential staggered delays if ever needed, but unused for entrance now
}

export function ListingCard({
    id,
    image,
    title,
    location,
    tag,
    featured,
    href,
    price,
    stats,
    className
}: ListingCardProps) {
    const [isImageLoaded, setIsImageLoaded] = useState(false)

    return (
        <Link href={href} className={cn("block group cursor-pointer", className)}>
            <div
                className="relative z-[1] hover:z-[10] hover:-translate-y-1 transition-transform duration-300 ease-out"
                style={{ willChange: 'transform' }}
            >
                {/* Image Container */}
                <div className="relative aspect-[4/5] md:aspect-[16/11] lg:aspect-[4/5] overflow-hidden mb-7 rounded-[24px] shadow-sm group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out bg-gray-100">

                    {/* Skeleton Loader - Visible only when NOT loaded */}
                    {!isImageLoaded && (
                        <Skeleton className="absolute inset-0 w-full h-full bg-gray-200 z-10" />
                    )}

                    {/* Image with Fade-in */}
                    <img
                        src={image}
                        alt={title}
                        onLoad={() => setIsImageLoaded(true)}
                        className={cn(
                            "absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-[1.08]",
                            isImageLoaded ? "opacity-100" : "opacity-0"
                        )}
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            minWidth: '100%',
                            minHeight: '100%'
                        }}
                    />

                    {/* Tag Badge */}
                    <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                        {featured && (
                            <div className="bg-black text-white px-4 py-2 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.2)] flex items-center gap-1.5">
                                <Star className="w-3 h-3" weight="fill" />
                                <span className="text-[10px] font-semibold tracking-[0.08em] uppercase">Featured</span>
                            </div>
                        )}
                        {tag && tag !== 'Featured' && (
                            <div className="bg-white/95 backdrop-blur-2xl px-4 py-2 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                                <span className="text-[10px] font-semibold text-black tracking-[0.08em] uppercase">{tag}</span>
                            </div>
                        )}
                    </div>

                    {/* Hover Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                    </div>
                </div>

                {/* Details */}
                <div className="px-1">
                    {/* Location */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-1 rounded-full bg-black/20" />
                        <p className="text-[11px] font-medium text-black/40 tracking-[0.1em] uppercase">
                            {location}
                        </p>
                    </div>

                    {/* Title */}
                    <h3 className="text-[20px] md:text-[22px] font-semibold text-black mb-4 tracking-[-0.02em] leading-[1.2] group-hover:text-black/60 transition-colors duration-500">
                        {title}
                    </h3>

                    {/* Price (Properties Only) */}
                    {typeof price === 'number' && (
                        <div className="mb-6">
                            <p className="text-[32px] md:text-[36px] font-semibold text-black tracking-[-0.02em] leading-none">
                                {formatPrice(price)}
                            </p>
                        </div>
                    )}

                    {/* Stats */}
                    {stats && (
                        <div className="flex items-center gap-6 pt-5 border-t border-black/[0.06]">
                            {stats.beds && stats.beds !== '0' && (
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-full bg-black/[0.03] flex items-center justify-center group-hover:bg-black/[0.05] transition-colors duration-300">
                                        <Bed className="w-[17px] h-[17px] text-black/50" weight="duotone" />
                                    </div>
                                    <span className="text-[14px] font-medium text-black/70">{stats.beds}</span>
                                </div>
                            )}
                            {stats.baths && stats.baths !== '0' && (
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-full bg-black/[0.03] flex items-center justify-center group-hover:bg-black/[0.05] transition-colors duration-300">
                                        <Bathtub className="w-[17px] h-[17px] text-black/50" weight="duotone" />
                                    </div>
                                    <span className="text-[14px] font-medium text-black/70">{stats.baths}</span>
                                </div>
                            )}
                            {stats.sqft && stats.sqft !== '0' && (
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-full bg-black/[0.03] flex items-center justify-center group-hover:bg-black/[0.05] transition-colors duration-300">
                                        <ArrowsOut className="w-[17px] h-[17px] text-black/50" weight="duotone" />
                                    </div>
                                    <span className="text-[14px] font-medium text-black/70">{stats.sqft}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
}
