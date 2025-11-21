import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '../components/ui/toaster'
import InitialLoading from '../components/initial-loading'
import { LoadingProvider } from '../contexts/loading-context'
import MainContent from '../components/main-content'
import { AudioController } from '../components/audio-controller'
import FloatingContactButton from '../components/FloatingContactButton'
import { NavBar } from '../components/navbar'

const inter = Inter({ subsets: ['latin'] })

// SEO Metadata otimizado para SUL ESTATE - Real Estate Portugal
export const metadata: Metadata = {
  title: {
    default: 'SUL ESTATE - Boutique Real Estate & Investment Consultancy in Portugal',
    template: '%s | SUL ESTATE - Premium Real Estate Portugal'
  },
  description: 'Boutique real estate and investment consultancy in Portugal. Premium property sourcing, investment strategy, and project management for international investors. Lisbon, Azeitão, Algarve.',
  keywords: [
    // Primary Keywords - Real Estate Portugal
    'real estate Portugal',
    'property investment Portugal',
    'boutique real estate consultancy',
    'premium real estate Portugal',
    'property sourcing Portugal',
    'real estate investment consultancy',
    'property management Portugal',
    
    // Location Keywords - High Volume
    'real estate Lisbon',
    'property investment Lisbon',
    'real estate Algarve',
    'property investment Algarve',
    'real estate Azeitão',
    'property investment Azeitão',
    'Portuguese real estate',
    'Portugal property market',
    
    // Investment Keywords
    'property investment strategy',
    'real estate investment advisory',
    'property portfolio management',
    'real estate project management',
    'property investment consultancy',
    'real estate investment guidance',
    'property investment planning',
    
    // International Keywords
    'international property investment',
    'foreign investment Portugal',
    'expat real estate Portugal',
    'international property consultancy',
    'European property investment',
    'Portugal investment opportunities',
    'real estate for foreigners',
    
    // Premium Keywords
    'luxury real estate Portugal',
    'premium property Portugal',
    'high-end real estate',
    'boutique property consultancy',
    'exclusive real estate',
    'premium property investment',
    'luxury property management',
    
    // Service Keywords
    'property sourcing service',
    'real estate project oversight',
    'property investment advisory',
    'real estate network Portugal',
    'property due diligence',
    'real estate legal support',
    'property financing assistance',
    
    // Long-tail Keywords
    'how to invest in Portugal real estate',
    'best real estate investment Portugal',
    'Portugal property investment guide',
    'real estate investment opportunities Portugal',
    'property investment consultancy Lisbon',
    'premium real estate services Portugal'
  ].join(', '),
  authors: [
    { name: 'Vincent Santos', url: 'https://sulbyvs.com/about' }
  ],
  creator: 'SUL ESTATE',
  publisher: 'SUL ESTATE',
  formatDetection: {
    telephone: false,
    email: false,
    address: false
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://sulbyvs.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'pt': '/pt',
      'fr': '/fr'
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['pt_PT', 'fr_FR'],
    url: 'https://sulbyvs.com',
    siteName: 'SUL ESTATE',
    title: 'SUL ESTATE - Boutique Real Estate & Investment Consultancy in Portugal',
    description: 'Premium real estate and investment consultancy in Portugal. Expert property sourcing, investment strategy, and project management for international investors. Lisbon, Azeitão, Algarve.',
    images: [
      {
        url: '/images/herobg.jpg',
        width: 1200,
        height: 630,
        alt: 'SUL ESTATE - Boutique Real Estate & Investment Consultancy in Portugal',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SULESTATE',
    creator: '@SULESTATE',
    title: 'SUL ESTATE - Boutique Real Estate & Investment Consultancy in Portugal',
    description: 'Premium real estate and investment consultancy in Portugal. Expert property sourcing, investment strategy, and project management for international investors.',
    images: ['/images/herobg.jpg']
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'verification_token', // Adicione seu Google Search Console token
    // yandex: 'yandex_token',
    // bing: 'bing_token'
  },
  category: 'real estate',
  classification: 'Real Estate, Property Investment, Business Services, Consultancy',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
    interactiveWidget: 'resizes-content',
    height: 'device-height'
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon.png', type: 'image/png', sizes: '16x16' }
    ],
    shortcut: [{ url: '/favicon.png', type: 'image/png' }],
    apple: [{ url: '/favicon.png', type: 'image/png', sizes: '180x180' }],
    other: [{ rel: 'mask-icon', url: '/favicon.png', color: '#2C5F7C' }]
  },
  manifest: '/manifest.json',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'GreenCheck',
    'application-name': 'GreenCheck',
    'msapplication-TileColor': '#34C759',
    'format-detection': 'telephone=no'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <meta name="theme-color" content="#2C5F7C" />
        <meta name="apple-mobile-web-app-title" content="SUL ESTATE" />
        <meta name="application-name" content="SUL ESTATE" />
        
        {/* Preload crítico para otimizar carregamento inicial - removido preload do favicon para evitar warning */}
        <link rel="preconnect" href="https://my.spline.design" />
        <link rel="dns-prefetch" href="https://my.spline.design" />
        {/* Firebase Storage preconnect for faster video/image loading */}
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
        <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
        
        {/* Links de favicon para máxima compatibilidade */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="mask-icon" href="/favicon.png" color="#2C5F7C" />
        
        {/* Meta tags sociais adicionais para máxima compatibilidade */}
        <meta property="og:image" content="/images/herobg.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="SUL ESTATE - Boutique Real Estate & Investment Consultancy in Portugal" />
        <meta name="twitter:image" content="/images/herobg.jpg" />
        <meta name="twitter:image:alt" content="SUL ESTATE - Boutique Real Estate & Investment Consultancy in Portugal" />
        
        {/* Structured Data (JSON-LD) para Google Rich Snippets */}
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateAgent',
              name: 'SUL ESTATE',
              alternateName: 'SUL by VS',
              description: 'Boutique real estate and investment consultancy in Portugal. Premium property sourcing, investment strategy, and project management for international investors.',
              url: 'https://sulbyvs.com',
              image: 'https://sulbyvs.com/images/herobg.jpg',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'PT',
                addressRegion: 'Lisbon',
                addressLocality: 'Lisbon'
              },
              areaServed: [
                {
                  '@type': 'Place',
                  name: 'Lisbon'
                },
                {
                  '@type': 'Place',
                  name: 'Azeitão'
                },
                {
                  '@type': 'Place',
                  name: 'Algarve'
                }
              ],
              serviceType: [
                'Real Estate Investment Advisory',
                'Property Sourcing',
                'Project Management',
                'Investment Strategy',
                'Property Portfolio Management'
              ],
              founder: {
                '@type': 'Person',
                name: 'Vincent Santos',
                jobTitle: 'Founder & CEO'
              },
              foundingDate: '2024',
              slogan: 'We invest, we curate, we orchestrate',
              knowsAbout: [
                'Real Estate Investment',
                'Property Sourcing',
                'Investment Strategy',
                'Project Management',
                'Portuguese Real Estate Market',
                'International Property Investment',
                'Property Portfolio Management'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                email: 'hello@sulbyvs.com',
                availableLanguage: ['English', 'Portuguese', 'French']
              },
              sameAs: [
                'https://linkedin.com/company/sul-estate'
              ]
            })
          }}
        />
        
        {/* Organization Schema for Brand Recognition */}
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'SUL ESTATE',
              alternateName: 'SUL by VS',
              url: 'https://sulbyvs.com',
              logo: 'https://sulbyvs.com/favicon.png',
              description: 'Boutique real estate and investment consultancy in Portugal. Premium property sourcing, investment strategy, and project management for international investors.',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'PT',
                addressRegion: 'Lisbon',
                addressLocality: 'Lisbon'
              },
              sameAs: [
                'https://linkedin.com/company/sul-estate'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Support',
                email: 'hello@sulbyvs.com',
                availableLanguage: ['English', 'Portuguese', 'French']
              },
              founder: {
                '@type': 'Person',
                name: 'Vincent Santos',
                jobTitle: 'Founder & CEO'
              },
              foundingDate: '2024',
              slogan: 'We invest, we curate, we orchestrate',
              knowsAbout: [
                'Real Estate Investment',
                'Property Sourcing',
                'Investment Strategy',
                'Project Management',
                'Portuguese Real Estate Market',
                'International Property Investment',
                'Property Portfolio Management'
              ]
            })
          }}
        />
        
        {/* Service Schema for SEO */}
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: 'Real Estate Investment Consultancy',
              provider: {
                '@type': 'Organization',
                name: 'SUL ESTATE'
              },
              serviceType: 'Real Estate Investment Advisory',
              areaServed: [
                {
                  '@type': 'Place',
                  name: 'Lisbon'
                },
                {
                  '@type': 'Place',
                  name: 'Azeitão'
                },
                {
                  '@type': 'Place',
                  name: 'Algarve'
                }
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Real Estate Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Investment Strategy & Advisory',
                      description: 'Personalized strategy based on your goals, risk profile, and long-term vision'
                    }
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Property Sourcing',
                      description: 'Curated selection of premium properties matching your investment criteria'
                    }
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Project Oversight',
                      description: 'End-to-end project management from acquisition to delivery'
                    }
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Management & Optimization',
                      description: 'Ongoing asset management to maximize returns and value'
                    }
                  }
                ]
              },
              additionalType: 'http://www.productontology.org/id/RealEstateAgent',
              offers: {
                '@type': 'Offer',
                availability: 'https://schema.org/InStock',
                priceCurrency: 'EUR'
              }
            })
          }}
        />
        
        {/* FAQ Schema for Rich Snippets */}
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is SUL ESTATE?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'SUL ESTATE is a boutique real estate and investment consultancy in Portugal, helping international investors secure, structure, and optimize refined property assets. We provide premium property sourcing, investment strategy, and project management services.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Where does SUL ESTATE operate?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'SUL ESTATE operates in Lisbon, Azeitão, and Algarve, Portugal. We serve international investors looking for premium real estate opportunities in these key Portuguese locations.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'What services does SUL ESTATE offer?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'We offer investment strategy & advisory, property sourcing, project oversight, partners & network access, management & optimization, and co-investment opportunities. Our services cover the entire real estate investment journey.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Who is Vincent Santos?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Vincent Santos is the founder of SUL ESTATE, trained in International Business Law in France and specialized for almost ten years in real estate investment and project management. Being an investor himself, he brings precision, long-term vision, and refined understanding of value.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Why invest in Portugal real estate?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Portugal offers a rare equilibrium between lifestyle, stability, and opportunity. With exceptional quality of life, political and economic stability, and a growing international community, it has become one of Europe\'s most attractive real estate markets.'
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body 
        className={`${inter.className} overflow-x-hidden overflow-y-auto bg-white antialiased`}
        style={{ 
          backgroundColor: '#ffffff',
          background: '#ffffff',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
          overscrollBehavior: 'none'
        }}
      >
        <LoadingProvider>
          <InitialLoading />
          <AudioController />
          <NavBar />
          <MainContent>
            {children}
            <FloatingContactButton />
            <Toaster />
          </MainContent>
        </LoadingProvider>
      </body>
    </html>
  )
}
