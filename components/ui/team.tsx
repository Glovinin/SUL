import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TeamMember {
  name: string
  role: string
  avatar: string
  link?: string
}

interface TeamSectionProps {
  members?: TeamMember[]
  title?: string
  titleHighlight?: string
  subtitle?: string
  className?: string
}

interface ScreenBreakpoints {
  isXs: boolean
  isSm: boolean
  isMd: boolean
  isTablet: boolean
  isLg: boolean
  isXl: boolean
  isMobile: boolean
  isDesktop: boolean
  width: number
  height: number
}

const useSmartBreakpoints = (): ScreenBreakpoints => {
  const [viewport, setViewport] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)
    window.addEventListener('orientationchange', updateViewport)

    return () => {
      window.removeEventListener('resize', updateViewport)
      window.removeEventListener('orientationchange', updateViewport)
    }
  }, [])

  return {
    isXs: viewport.width < 380,
    isSm: viewport.width >= 380 && viewport.width < 640,
    isMd: viewport.width >= 640 && viewport.width < 768,
    isTablet: viewport.width >= 768 && viewport.width < 1024,
    isLg: viewport.width >= 1024 && viewport.width < 1280,
    isXl: viewport.width >= 1280,
    isMobile: viewport.width < 768,
    isDesktop: viewport.width >= 1024,
    width: viewport.width,
    height: viewport.height
  }
}

const defaultMembers: TeamMember[] = [
  {
    name: 'Bruno Santos',
    role: 'CTO & Co-founder',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop&crop=faces',
    link: '#',
  },
  {
    name: 'Maria Silva',
    role: 'AI Engineer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1200&fit=crop&crop=faces',
    link: '#',
  },
  {
    name: 'João Costa',
    role: 'Blockchain Developer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1200&fit=crop&crop=faces',
    link: '#',
  },
  {
    name: 'Ana Rodrigues',
    role: 'Data Scientist',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=1200&fit=crop&crop=faces',
    link: '#',
  },
  {
    name: 'Carlos Mendes',
    role: 'ESG Specialist',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=1200&fit=crop&crop=faces',
    link: '#',
  },
  {
    name: 'Sofia Almeida',
    role: 'Product Designer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1200&fit=crop&crop=faces',
    link: '#',
  },
]

export default function TeamSection({ 
  members = defaultMembers, 
  title = "Experts",
  titleHighlight = "in sustainability",
  subtitle = "Team combining technical expertise with scientific knowledge to revolutionize ESG certification.",
  className = ""
}: TeamSectionProps) {
  const breakpoints = useSmartBreakpoints()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const sectionPadding = breakpoints.isMobile ? 'py-16' : 'py-24'
  const maxWidth = 'max-w-7xl'
  const containerPadding = breakpoints.isXs ? 'px-3' : breakpoints.isSm ? 'px-4' : breakpoints.isMd ? 'px-6' : 'px-4 sm:px-6 lg:px-8'
  const gap = breakpoints.isMobile ? 'gap-8' : 'gap-6'
  const cardPadding = breakpoints.isXs ? 'p-0' : 'p-0'

  return (
    <section className={`${sectionPadding} relative bg-gray-50 ${className}`}>
      <div className={`${maxWidth} mx-auto ${containerPadding}`}>
        {/* Header Section - Consistent with page design */}
        <div className={`text-center ${breakpoints.isMobile ? 'mb-16' : 'mb-24'}`}>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4"
          >
            Our Team
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className={`${breakpoints.isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-light ${breakpoints.isMobile ? 'mb-6' : 'mb-8'} tracking-tight leading-[1.1]`}
          >
            <span className="font-extralight text-[#044050]">{title}</span>
            <br />
            <span className="font-normal text-[#044050]">{titleHighlight}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className={`${breakpoints.isMobile ? 'text-lg' : 'text-xl'} ${breakpoints.isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-gray-600 font-light leading-relaxed`}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Team Grid - Adjusted for 13 members */}
        <div className={`grid ${
          breakpoints.isMobile 
            ? 'grid-cols-1' 
            : breakpoints.isTablet 
            ? 'grid-cols-2' 
            : breakpoints.isLg
            ? 'grid-cols-3'
            : 'grid-cols-4'
        } ${gap}`}>
          {members.map((member, index) => (
            <motion.div 
              key={index} 
              className="group overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Image Container */}
              <div className={`relative overflow-hidden ${breakpoints.isMobile ? 'rounded-2xl' : 'rounded-3xl'} mb-4`}>
                <img 
                  className="h-[400px] w-full object-cover object-top grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" 
                  src={member.avatar} 
                  alt={member.name} 
                  width="826" 
                  height="1239" 
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#044050]/80 via-[#044050]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Number Badge */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-xs font-medium text-[#044050]">0{index + 1}</span>
                </div>
              </div>

              {/* Info Container */}
              <div className={`${cardPadding}`}>
                <h3 className={`${breakpoints.isXs ? 'text-lg' : 'text-xl'} font-medium text-[#044050] mb-2 group-hover:text-[#5FA037] transition-colors duration-300`}>
                  {member.name}
                </h3>
                <p className={`${breakpoints.isXs ? 'text-sm' : 'text-base'} text-gray-600 font-light mb-3`}>
                  {member.role}
                </p>
                
                {/* Profile Link */}
                {member.link && (
                  <a 
                    href={member.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-[#5FA037] hover:text-[#4d8c2d] font-medium transition-colors duration-300 group/link"
                  >
                    View Profile
                    <svg 
                      className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

