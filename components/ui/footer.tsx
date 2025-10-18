'use client'

import React, { useState, useEffect } from 'react'

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

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleFeatureClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    // Disparar evento customizado para a notificação da homepage
    window.dispatchEvent(new CustomEvent('show-notification', {
      detail: {
        title: "Under Development",
        message: "Our team is currently developing this feature. Stay tuned!"
      }
    }))
  }

  if (!mounted) {
    return null
  }

  const maxWidth = 'max-w-7xl'
  const containerPadding = breakpoints.isXs ? 'px-3' : breakpoints.isSm ? 'px-4' : breakpoints.isMd ? 'px-6' : 'px-4 sm:px-6 lg:px-8'

  return (
    <footer className={`bg-[#044050] text-white ${className}`}>
        <div className={`${maxWidth} mx-auto ${containerPadding}`}>
        {/* Links Grid */}
        <div className={`${breakpoints.isMobile ? 'py-12' : 'py-16'} border-b border-white/10`}>
          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-2 gap-x-8 gap-y-12' : breakpoints.isTablet ? 'grid-cols-3 gap-12' : 'grid-cols-5 gap-8'}`}>
            
            {/* Platform */}
            <div>
              <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-4">Platform</h4>
              <ul className="space-y-3">
                <li><a href="#" onClick={handleFeatureClick} className="text-sm text-white/70 hover:text-[#5FA037] transition-colors font-light cursor-pointer">ESG Validation</a></li>
                <li><a href="#" onClick={handleFeatureClick} className="text-sm text-white/70 hover:text-[#5FA037] transition-colors font-light cursor-pointer">Marketplace</a></li>
                <li><a href="#" onClick={handleFeatureClick} className="text-sm text-white/70 hover:text-[#5FA037] transition-colors font-light cursor-pointer">NFT Certificates</a></li>
                <li><a href="#" onClick={handleFeatureClick} className="text-sm text-white/70 hover:text-[#5FA037] transition-colors font-light cursor-pointer">API</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="/about" className="text-sm text-white/70 hover:text-[#5FA037] transition-colors font-light">About</a></li>
                <li><a href="/investors/login" className="text-sm text-white/70 hover:text-[#5FA037] transition-colors font-light">Investors</a></li>
                <li><a href="#" onClick={handleFeatureClick} className="text-sm text-white/70 hover:text-[#5FA037] transition-colors font-light cursor-pointer">Careers</a></li>
                <li><a href="#" onClick={handleFeatureClick} className="text-sm text-white/70 hover:text-[#5FA037] transition-colors font-light cursor-pointer">Press</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-4">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" onClick={handleFeatureClick} className="text-sm text-white/70 hover:text-[#5FA037] transition-colors font-light cursor-pointer">Help Center</a></li>
                <li><a href="#" onClick={handleFeatureClick} className="text-sm text-white/70 hover:text-[#5FA037] transition-colors font-light cursor-pointer">Documentation</a></li>
                <li><a href="#" onClick={handleFeatureClick} className="text-sm text-white/70 hover:text-[#5FA037] transition-colors font-light cursor-pointer">Contact</a></li>
                <li><a href="#" onClick={handleFeatureClick} className="text-sm text-white/70 hover:text-[#5FA037] transition-colors font-light cursor-pointer">Status</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" onClick={handleFeatureClick} className="text-sm text-white/70 hover:text-[#5FA037] transition-colors font-light cursor-pointer">Privacy</a></li>
                <li><a href="#" onClick={handleFeatureClick} className="text-sm text-white/70 hover:text-[#5FA037] transition-colors font-light cursor-pointer">Terms</a></li>
                <li><a href="#" onClick={handleFeatureClick} className="text-sm text-white/70 hover:text-[#5FA037] transition-colors font-light cursor-pointer">Cookies</a></li>
                <li><a href="#" onClick={handleFeatureClick} className="text-sm text-white/70 hover:text-[#5FA037] transition-colors font-light cursor-pointer">Licenses</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-4">Connect</h4>
              <ul className="space-y-3">
                <li><a href="#" onClick={handleFeatureClick} className="text-sm text-white/70 hover:text-[#5FA037] transition-colors font-light cursor-pointer">LinkedIn</a></li>
                <li><a href="#" onClick={handleFeatureClick} className="text-sm text-white/70 hover:text-[#5FA037] transition-colors font-light cursor-pointer">Twitter</a></li>
                <li><a href="#" onClick={handleFeatureClick} className="text-sm text-white/70 hover:text-[#5FA037] transition-colors font-light cursor-pointer">GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className={`${breakpoints.isMobile ? 'py-12' : 'py-16'} border-b border-white/10`}>
          <div className={`grid ${breakpoints.isMobile ? 'grid-cols-1 gap-12' : 'md:grid-cols-2 gap-16'} max-w-4xl`}>
            
            {/* Portugal Office */}
            <div>
              <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-4">Portugal Office</h4>
              <div className="space-y-2">
                <p className="text-sm text-white/70 font-light">ESG Veritas Solutions Ltd.</p>
                <p className="text-sm text-white/70 font-light">Rua do Salvador, 20, 1A</p>
                <p className="text-sm text-white/70 font-light">1100-466 Lisboa, Portugal</p>
              </div>
              <div className="mt-6 space-y-2">
                <p className="text-sm text-white/70 font-light">
                  <a href="tel:+351931721901" className="hover:text-[#5FA037] transition-colors">+351 931 721 901</a>
                </p>
                <p className="text-sm text-white/70 font-light">
                  <a href="mailto:info@esgveritas.eu" className="hover:text-[#5FA037] transition-colors">info@esgveritas.eu</a>
                </p>
              </div>
            </div>

            {/* Brazil Office */}
            <div>
              <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-4">Brazil Office</h4>
              <div className="space-y-2">
                <p className="text-sm text-white/70 font-light">Bureau Social – Instituto Brasileiro de Negócios Sociais</p>
                <p className="text-sm text-white/70 font-light">Avenida Horácio Lafer, 160 – Conj. 22, Sala B</p>
                <p className="text-sm text-white/70 font-light">Itaim Bibi – São Paulo/SP – CEP 04538-080</p>
              </div>
              <div className="mt-6 space-y-2">
                <p className="text-sm text-white/70 font-light">
                  <a href="tel:+5511911381183" className="hover:text-[#5FA037] transition-colors">+55 11 91138-1183</a>
                </p>
                <p className="text-sm text-white/70 font-light">
                  <a href="mailto:faleconosco@bureausocial.org.br" className="hover:text-[#5FA037] transition-colors">faleconosco@bureausocial.org.br</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`${breakpoints.isMobile ? 'py-8' : 'py-10'} flex ${breakpoints.isMobile ? 'flex-col gap-4 text-center' : 'flex-row justify-between items-center'}`}>
          <p className="text-sm text-white/60 font-light">
            © 2025 GreenCheck. All rights reserved.
          </p>
          {showSpecialMessage && (
            <p className="text-sm text-white/60 font-light">
              {specialMessage}
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}




