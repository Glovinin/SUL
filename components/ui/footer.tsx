'use client'

import React, { useState, useEffect } from 'react'
import { Notification, useNotification } from './notification'

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

interface FooterProps {
  className?: string
  showSpecialMessage?: boolean
  specialMessage?: string
}

export default function Footer({ 
  className = "",
  showSpecialMessage = true,
  specialMessage = "Made with care for the planet"
}: FooterProps) {
  const breakpoints = useSmartBreakpoints()
  const [mounted, setMounted] = useState(false)
  const { notification, showNotification, closeNotification } = useNotification()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleFeatureClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    showNotification(
      "Under Development",
      "Our team is currently developing this feature. Stay tuned!"
    )
  }

  const handlePageClick = (e: React.MouseEvent<HTMLAnchorElement>, pageName: string) => {
    e.preventDefault()
    showNotification(
      "Page Under Development",
      `Our team is currently developing the ${pageName} page. Stay tuned for updates!`
    )
  }

  if (!mounted) {
    return null
  }

  const maxWidth = 'max-w-7xl'
  const containerPadding = breakpoints.isXs ? 'px-3' : breakpoints.isSm ? 'px-4' : breakpoints.isMd ? 'px-6' : 'px-4 sm:px-6 lg:px-8'

  return (
    <>
      <Notification 
        show={notification.show}
        onClose={closeNotification}
        title={notification.title}
        message={notification.message}
      />
      <footer className={`bg-[#2C5F7C] text-white ${className}`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
        {/* Links Grid */}
        <div className={`${breakpoints.isMobile ? 'py-12' : 'py-16'} border-b border-white/10`}>
          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-2 gap-x-8 gap-y-12' : breakpoints.isTablet ? 'grid-cols-3 gap-12' : 'grid-cols-4 gap-8'}`}>
            
            {/* Services */}
            <div>
              <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-4">Services</h4>
              <ul className="space-y-3">
                <li><a href="/services" onClick={(e) => handlePageClick(e, "Services")} className="text-sm text-white/70 hover:text-[#F5F0E8] transition-colors font-light cursor-pointer">Investment Strategy</a></li>
                <li><a href="/services" onClick={(e) => handlePageClick(e, "Services")} className="text-sm text-white/70 hover:text-[#F5F0E8] transition-colors font-light cursor-pointer">Property Sourcing</a></li>
                <li><a href="/services" onClick={(e) => handlePageClick(e, "Services")} className="text-sm text-white/70 hover:text-[#F5F0E8] transition-colors font-light cursor-pointer">Project Oversight</a></li>
                <li><a href="/services" onClick={(e) => handlePageClick(e, "Services")} className="text-sm text-white/70 hover:text-[#F5F0E8] transition-colors font-light cursor-pointer">Management</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="/about" onClick={(e) => handlePageClick(e, "About")} className="text-sm text-white/70 hover:text-[#F5F0E8] transition-colors font-light cursor-pointer">About</a></li>
                <li><a href="/why-portugal" onClick={(e) => handlePageClick(e, "Why Portugal")} className="text-sm text-white/70 hover:text-[#F5F0E8] transition-colors font-light cursor-pointer">Why Portugal</a></li>
                <li><a href="/projects" onClick={(e) => handlePageClick(e, "Projects")} className="text-sm text-white/70 hover:text-[#F5F0E8] transition-colors font-light cursor-pointer">Projects</a></li>
                <li><a href="/contact" onClick={(e) => handlePageClick(e, "Contact")} className="text-sm text-white/70 hover:text-[#F5F0E8] transition-colors font-light cursor-pointer">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" onClick={handleFeatureClick} className="text-sm text-white/70 hover:text-[#F5F0E8] transition-colors font-light cursor-pointer">Privacy</a></li>
                <li><a href="#" onClick={handleFeatureClick} className="text-sm text-white/70 hover:text-[#F5F0E8] transition-colors font-light cursor-pointer">Terms</a></li>
                <li><a href="#" onClick={handleFeatureClick} className="text-sm text-white/70 hover:text-[#F5F0E8] transition-colors font-light cursor-pointer">Cookies</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-4">Connect</h4>
              <ul className="space-y-3">
                <li><a href="#" onClick={handleFeatureClick} className="text-sm text-white/70 hover:text-[#F5F0E8] transition-colors font-light cursor-pointer">LinkedIn</a></li>
                <li><a href="#" onClick={handleFeatureClick} className="text-sm text-white/70 hover:text-[#F5F0E8] transition-colors font-light cursor-pointer">WhatsApp</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className={`${breakpoints.isMobile ? 'py-12' : 'py-16'} border-b border-white/10`}>
          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1 gap-12' : 'md:grid-cols-3 gap-16'}`}>
            
            {/* Lisbon Office */}
            <div>
              <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-4">Lisbon</h4>
              <div className="space-y-2">
                <p className="text-sm text-white/70 font-light">SUL ESTATE</p>
                <p className="text-sm text-white/70 font-light">Boutique Real Estate Consultancy</p>
                <p className="text-sm text-white/70 font-light">Lisbon, Portugal</p>
              </div>
              <div className="mt-6 space-y-2">
                <p className="text-sm text-white/70 font-light">
                  <a href="mailto:hello@sulbyvs.com" className="hover:text-[#F5F0E8] transition-colors">hello@sulbyvs.com</a>
                </p>
              </div>
            </div>

            {/* Azeitão */}
            <div>
              <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-4">Azeitão</h4>
              <div className="space-y-2">
                <p className="text-sm text-white/70 font-light">Project Management Office</p>
                <p className="text-sm text-white/70 font-light">Azeitão, Portugal</p>
              </div>
            </div>

            {/* Algarve */}
            <div>
              <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-4">Algarve</h4>
              <div className="space-y-2">
                <p className="text-sm text-white/70 font-light">Southern Properties</p>
                <p className="text-sm text-white/70 font-light">Lagos, Portugal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`${breakpoints.isMobile ? 'py-8' : 'py-10'} flex ${breakpoints.isMobile ? 'flex-col gap-4 text-center' : 'flex-row justify-between items-center'}`}>
          <p className="text-sm text-white/60 font-light">
            © 2025 SUL ESTATE. All rights reserved.
          </p>
          {showSpecialMessage && (
            <p className="text-sm text-white/60 font-light">
              {specialMessage || "Where strategy meets aesthetics"}
            </p>
          )}
        </div>
      </div>
    </footer>
    </>
  )
}




