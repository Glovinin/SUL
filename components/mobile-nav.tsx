"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '../lib/utils'
import { useTheme } from "next-themes"
import { playESGAudio, playMarketplaceAudio } from '../lib/audio-manager'
import { 
  House,
  MagnifyingGlass,
  Calendar,
  ForkKnife,
  ChatCircle,
  UserCircle,
  Info,
  List,
  X,
  SunDim,
  Moon,
  InstagramLogo,
  FacebookLogo,
  Waves,
  CaretDown,
  Image as ImageIcon,
  CalendarCheck,
  Camera,
  // Novos ícones mais elegantes
  Leaf,
  Storefront,
  Shield,
  Upload,
  CheckCircle,
  Globe,
  ChartLine,
  FileText,
  WhatsappLogo
} from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useLoading } from '../contexts/loading-context'
import Image from 'next/image'

// Bottom navigation items
const bottomNavItems = [
  { href: '/', label: 'Home', icon: House },
  { href: '/validation', label: 'Validation', icon: Shield },
  { href: '/marketplace', label: 'Marketplace', icon: Storefront },
  { href: '/about', label: 'About', icon: Info },
]

// All navigation items (for expanded menu)
const allNavItems = [
  { href: '/', label: 'Home', icon: House },
  { href: '/validation', label: 'Validation', icon: Shield },
  { href: '/marketplace', label: 'Marketplace', icon: Storefront },
  { href: '/about', label: 'About', icon: Info },
  { href: '/investors', label: 'Investors', icon: ChartLine },
  { href: '/login', label: 'Login', icon: UserCircle },
]

export function MobileNav() {
  const { isInitialLoading, isCartOpen } = useLoading()
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [lastScrollPosition, setLastScrollPosition] = useState(0)
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const [isOutOfHero, setIsOutOfHero] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const menuRef = useRef<HTMLDivElement>(null)
  const menuContentRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<HTMLUListElement>(null)
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // Handle navigation to validation page with audio
  const handleValidationNavigation = () => {
    playESGAudio()
    setMenuOpen(false) // Close mobile menu
    router.push('/validation')
  }

  // Handle navigation to marketplace page with audio
  const handleMarketplaceNavigation = () => {
    playMarketplaceAudio()
    setMenuOpen(false) // Close mobile menu
    router.push('/marketplace')
  }

  // Handle navigation to investors page
  const handleInvestorsNavigation = () => {
    setMenuOpen(false) // Close mobile menu
    router.push('/investors')
  }

  // Handle Invest Now - Opens WhatsApp Web
  const handleInvestNow = () => {
    const phone = '+351931721901' // Diego Rocha's phone
    const message = encodeURIComponent('Hi Diego, I\'m interested in investing in GreenCheck. I\'d like to learn more about the investment opportunities.')
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  // Check if we're on investors page
  const isInvestorsPage = pathname.startsWith('/investors')

  // Prevenir scroll quando o menu está aberto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [menuOpen])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Fechar menu ao navegar
    setMenuOpen(false)
  }, [pathname])

  // Detectar direção do scroll e posição na hero section
  useEffect(() => {
    if (menuOpen) return;

    let ticking = false;

    const handlePageScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollPos = window.scrollY;
          // Aparecer logo ao começar o scroll - 20% da viewport (bem cedo)
          const heroTransitionPoint = window.innerHeight * 0.2;
          
          // Verificar direção do scroll
          const isScrollDown = currentScrollPos > lastScrollPosition;
          setIsScrollingDown(isScrollDown);
          
          // Mostrar navegação quando passar do ponto de transição
          const shouldShow = currentScrollPos > heroTransitionPoint;
          setIsOutOfHero(shouldShow);
          
          // Expandir a navegação quando o scroll for para baixo
          if (isScrollDown && shouldShow) {
            setIsNavExpanded(true);
          } else {
            setIsNavExpanded(false);
          }
          
          setLastScrollPosition(currentScrollPos);
          
          // Reset após período de inatividade
          clearTimeout(scrollTimeout.current);
          scrollTimeout.current = setTimeout(() => {
            setIsNavExpanded(false);
          }, 1500);
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handlePageScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handlePageScroll);
    };
  }, [lastScrollPosition, menuOpen]);

  // Monitorar scroll e calcular alturas para o indicador de posição
  useEffect(() => {
    if (!menuOpen || !menuContentRef.current || !menuItemsRef.current) return

    const handleResize = () => {
      if (menuContentRef.current && menuItemsRef.current) {
        setContainerHeight(menuContentRef.current.clientHeight)
        setContentHeight(menuItemsRef.current.scrollHeight)
      }
    }
    
    const handleScroll = () => {
      if (menuContentRef.current) {
        setScrollPosition(menuContentRef.current.scrollTop)
        
        // Ativar estado de scrolling
        setIsScrolling(true)
        
        // Desativar após 1 segundo sem scroll
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current)
        }
        scrollTimeout.current = setTimeout(() => {
          setIsScrolling(false)
        }, 1000)
      }
    }
    
    // Inicializar valores
    handleResize()
    
    // Event listeners
    window.addEventListener('resize', handleResize)
    menuContentRef.current.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      if (menuContentRef.current) {
        menuContentRef.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [menuOpen])

  // Esconder mobile nav na página de login e área de investidores (login, NDA, pending-approval)
  const isInvestorAuthPage = pathname === '/investors/login' || 
                             pathname === '/investors/nda' || 
                             pathname === '/investors/pending-approval'
  
  // Esconder mobile nav na área de admin (login e dashboard)
  const isAdminPage = pathname.startsWith('/admin')
  
  if (!mounted || isInitialLoading || pathname === '/login' || isInvestorAuthPage || isAdminPage) return null

  const isDark = true

  // Calcular progresso de scroll (0-100)
  const scrollPercentage = containerHeight && contentHeight 
    ? Math.min(100, Math.max(0, (scrollPosition / (contentHeight - containerHeight)) * 10))
    : 0
    
  // Verificar se há mais conteúdo abaixo (para mostrar o indicador)
  const hasMoreContent = true // Sempre mostrar o indicador

  return (
    <>
      {/* Barra de navegação inferior - Esconde para baixo da tela na hero section e quando carrinho abre */}
      <motion.nav 
        className={cn(
          "fixed left-0 right-0 z-50 backdrop-blur-xl border-t rounded-t-[2rem] block xl:hidden",
          // Altura segura para não sobrepor com controles do browser
          "pb-safe-area-inset-bottom",
          // Cor fixa sempre
          "bg-white/95 border-gray-200/50 shadow-lg shadow-black/10"
        )}
        style={{
          position: 'fixed',
          bottom: '0',
          transform: (isOutOfHero && !isCartOpen) ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          willChange: 'transform'
        }}
      >
        <div className="flex items-center justify-around px-4 py-4 pb-safe">
          {/* Show Invest Now button only on investors page */}
          {isInvestorsPage ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.3,
                ease: "easeOut"
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-2"
            >
              <button
                onClick={handleInvestNow}
                className={cn(
                  "group w-full flex items-center justify-center gap-3 py-4 px-6",
                  "bg-[#5FA037] text-white font-medium rounded-full",
                  "shadow-md hover:shadow-lg hover:shadow-[#5FA037]/25",
                  "transition-all duration-500 ease-out",
                  "hover:bg-[#4d8c2d]",
                  "border-0 relative overflow-hidden"
                )}
              >
                {/* Subtle shine effect on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                
                <WhatsappLogo 
                  weight="fill" 
                  className="h-5 w-5 transition-transform duration-300 group-hover:scale-105" 
                />
                <span className="text-sm font-medium tracking-tight relative">
                  Invest Now
                </span>
              </button>
            </motion.div>
          ) : (
            // Show regular navigation items on other pages
            bottomNavItems.map((item, index) => {
            const ItemIcon = item.icon
            const isActive = pathname === item.href
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.href === '/validation' ? (
                  <button
                    onClick={handleValidationNavigation}
                    className={cn(
                      "flex flex-col items-center justify-center flex-1 transition-all duration-300 ease-spring",
                      isActive 
                        ? "text-[#5FA037]" 
                        : "text-[#044050]/70 hover:text-[#5FA037]"
                    )}
                  >
                    <div className="relative p-2 rounded-2xl transition-all duration-300">
                      {isActive && (
                        <motion.div 
                          layoutId="activeNavBackground"
                          className="absolute inset-0 rounded-2xl -z-10 bg-[#5FA037]/10"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                          }}
                        />
                      )}
                      <ItemIcon 
                        weight={isActive ? "fill" : "regular"} 
                        className="h-6 w-6 transition-all duration-300 sm:h-7 sm:w-7" 
                      />
                    </div>
                    <span className={cn(
                      "text-xs mt-1 font-medium transition-all duration-300 sm:text-sm",
                      isActive && "font-bold"
                    )}>{item.label}</span>
                  </button>
                ) : item.href === '/marketplace' ? (
                  <button
                    onClick={handleMarketplaceNavigation}
                    className={cn(
                      "flex flex-col items-center justify-center flex-1 transition-all duration-300 ease-spring",
                      isActive 
                        ? "text-[#5FA037]" 
                        : "text-[#044050]/70 hover:text-[#5FA037]"
                    )}
                  >
                    <div className="relative p-2 rounded-2xl transition-all duration-300">
                      {isActive && (
                        <motion.div 
                          layoutId="activeNavBackground"
                          className="absolute inset-0 rounded-2xl -z-10 bg-[#5FA037]/10"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                          }}
                        />
                      )}
                      <ItemIcon 
                        weight={isActive ? "fill" : "regular"} 
                        className="h-6 w-6 transition-all duration-300 sm:h-7 sm:w-7" 
                      />
                    </div>
                    <span className={cn(
                      "text-xs mt-1 font-medium transition-all duration-300 sm:text-sm",
                      isActive && "font-bold"
                    )}>{item.label}</span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center justify-center flex-1 transition-all duration-300 ease-spring",
                      isActive 
                        ? "text-[#5FA037]" 
                        : "text-[#044050]/70 hover:text-[#5FA037]"
                    )}
                  >
                    <div className="relative p-2 rounded-2xl transition-all duration-300">
                      {isActive && (
                        <motion.div 
                          layoutId="activeNavBackground"
                          className="absolute inset-0 rounded-2xl -z-10 bg-[#5FA037]/10"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                          }}
                        />
                      )}
                      <ItemIcon 
                        weight={isActive ? "fill" : "regular"} 
                        className="h-6 w-6 transition-all duration-300 sm:h-7 sm:w-7" 
                      />
                    </div>
                    <span className={cn(
                      "text-xs mt-1 font-medium transition-all duration-300 sm:text-sm",
                      isActive && "font-bold"
                    )}>{item.label}</span>
                  </Link>
                )}
              </motion.div>
            )
          })
          )}
          
          {/* Botão do menu - Adaptativo com animação */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.3,
              delay: bottomNavItems.length * 0.05,
              ease: "easeOut"
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button 
              onClick={() => setMenuOpen(true)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 transition-all duration-300 ease-spring",
                "text-[#044050]/70 hover:text-[#5FA037]"
              )}
            >
              <div className="relative p-2 rounded-2xl transition-all duration-300">
                <List 
                  weight="bold" 
                  className="h-6 w-6 transition-all duration-300 sm:h-7 sm:w-7" 
                />
              </div>
              <span className="text-xs mt-1 font-medium transition-all duration-300 sm:text-sm">Menu</span>
            </button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Estilos para comportamento de App Nativo */}
      <style jsx global>{`
        /* Safe areas para dispositivos iOS */
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom, 0.5rem);
        }
        
        .pb-safe-area-inset-bottom {
          padding-bottom: env(safe-area-inset-bottom, 0.75rem);
        }
        
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          .pb-safe {
            padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
          }
          .pb-safe-area-inset-bottom {
            padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
          }
        }

        /* Comportamento de App Nativo - Evitar que controles do browser desapareçam */
        @media (max-width: 1024px) {
          html {
            /* Evitar zoom ao tocar em inputs */
            -webkit-text-size-adjust: 100%;
            /* Melhorar scroll em dispositivos móveis */
            -webkit-overflow-scrolling: touch;
            /* Comportamento de app nativo */
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }

          body {
            /* Evitar bounce scroll no iOS */
            overscroll-behavior: none;
            /* Altura total considerando área segura */
            min-height: 100vh;
            min-height: -webkit-fill-available;
            /* Evitar scroll horizontal */
            overflow-x: hidden;
          }

          /* Forçar que a navegação fique sempre visível */
          nav[class*="fixed bottom-0"] {
            position: fixed !important;
            bottom: 0 !important;
            transform: translateY(0) !important;
            transition: background-color 0.5s ease, border-color 0.5s ease !important;
            /* Não aplicar transform durante scroll */
            will-change: auto !important;
          }

          /* Viewport específico para mobile */
          @supports (-webkit-touch-callout: none) {
            html {
              height: -webkit-fill-available;
            }
          }
        }
      `}</style>

      {/* Menu fullscreen moderno */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[100] xl:hidden flex flex-col overflow-hidden bg-white"
            ref={menuRef}
          >
            {/* Header moderno */}
            <div className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Image
                  src="/favicon.png"
                  alt="GreenCheck Logo"
                  width={32}
                  height={32}
                  className="transition-all duration-300"
                  priority
                />
                <span className="text-[#044050] font-light text-xl tracking-wide">
                  <span className="font-extralight">Green</span><span className="font-medium">Check</span>
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="h-10 w-10 rounded-full flex items-center justify-center transition-all hover:bg-gray-100 text-[#044050]"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu items */}
            <div className="flex-1 py-8 px-6">
              <div className="space-y-2">
                {allNavItems.map((item, index) => {
                  const ItemIcon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: index * 0.04,
                        duration: 0.2,
                        ease: "easeOut"
                      }}
                    >
                      {item.href === '/validation' ? (
                        <button
                          onClick={handleValidationNavigation}
                          className={cn(
                            "flex items-center py-4 px-4 rounded-2xl transition-all w-full text-left",
                            isActive 
                              ? "bg-[#5FA037]/10 border border-[#5FA037]/20"
                              : "hover:bg-gray-50"
                          )}
                        >
                          <div className={cn(
                            "h-12 w-12 rounded-xl flex items-center justify-center",
                            isActive 
                              ? "bg-[#5FA037] text-white"
                              : "bg-gray-100 text-[#044050]"
                          )}>
                            <ItemIcon weight={isActive ? "fill" : "regular"} className="h-6 w-6" />
                          </div>
                          
                          <span className={cn(
                            "text-lg ml-4 font-medium",
                            isActive 
                              ? "text-[#5FA037]"
                              : "text-[#044050]"
                          )}>
                            {item.label}
                          </span>
                          
                          {isActive && (
                            <div className="ml-auto h-2 w-2 rounded-full bg-[#5FA037]" />
                          )}
                        </button>
                      ) : item.href === '/marketplace' ? (
                        <button
                          onClick={handleMarketplaceNavigation}
                          className={cn(
                            "flex items-center py-4 px-4 rounded-2xl transition-all w-full text-left",
                            isActive 
                              ? "bg-[#5FA037]/10 border border-[#5FA037]/20"
                              : "hover:bg-gray-50"
                          )}
                        >
                          <div className={cn(
                            "h-12 w-12 rounded-xl flex items-center justify-center",
                            isActive 
                              ? "bg-[#5FA037] text-white"
                              : "bg-gray-100 text-[#044050]"
                          )}>
                            <ItemIcon weight={isActive ? "fill" : "regular"} className="h-6 w-6" />
                          </div>
                          
                          <span className={cn(
                            "text-lg ml-4 font-medium",
                            isActive 
                              ? "text-[#5FA037]"
                              : "text-[#044050]"
                          )}>
                            {item.label}
                          </span>
                          
                          {isActive && (
                            <div className="ml-auto h-2 w-2 rounded-full bg-[#5FA037]" />
                          )}
                        </button>
                      ) : item.href === '/investors' ? (
                        <button
                          onClick={handleInvestorsNavigation}
                          className={cn(
                            "flex items-center py-4 px-4 rounded-2xl transition-all w-full text-left",
                            isActive 
                              ? "bg-[#5FA037]/10 border border-[#5FA037]/20"
                              : "hover:bg-gray-50"
                          )}
                        >
                          <div className={cn(
                            "h-12 w-12 rounded-xl flex items-center justify-center",
                            isActive 
                              ? "bg-[#5FA037] text-white"
                              : "bg-gray-100 text-[#044050]"
                          )}>
                            <ItemIcon weight={isActive ? "fill" : "regular"} className="h-6 w-6" />
                          </div>
                          
                          <span className={cn(
                            "text-lg ml-4 font-medium",
                            isActive 
                              ? "text-[#5FA037]"
                              : "text-[#044050]"
                          )}>
                            {item.label}
                          </span>
                          
                          {isActive && (
                            <div className="ml-auto h-2 w-2 rounded-full bg-[#5FA037]" />
                          )}
                        </button>
                      ) : (
                        <Link 
                          href={item.href}
                          className={cn(
                            "flex items-center py-4 px-4 rounded-2xl transition-all",
                            isActive 
                              ? "bg-[#5FA037]/10 border border-[#5FA037]/20"
                              : "hover:bg-gray-50"
                          )}
                        >
                          <div className={cn(
                            "h-12 w-12 rounded-xl flex items-center justify-center",
                            isActive 
                              ? "bg-[#5FA037] text-white"
                              : "bg-gray-100 text-[#044050]"
                          )}>
                            <ItemIcon weight={isActive ? "fill" : "regular"} className="h-6 w-6" />
                          </div>
                          
                          <span className={cn(
                            "text-lg ml-4 font-medium",
                            isActive 
                              ? "text-[#5FA037]"
                              : "text-[#044050]"
                          )}>
                            {item.label}
                          </span>
                          
                          {isActive && (
                            <div className="ml-auto h-2 w-2 rounded-full bg-[#5FA037]" />
                          )}
                        </Link>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Simple footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <p className="text-center text-sm text-gray-500">
                © 2025 GreenCheck. All rights reserved.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}