import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '../components/ui/toaster'
import { MobileNav } from '../components/mobile-nav'
import InitialLoading from '../components/initial-loading'
import { LoadingProvider } from '../contexts/loading-context'
import MainContent from '../components/main-content'
import { AudioController } from '../components/audio-controller'

const inter = Inter({ subsets: ['latin'] })

// SEO Metadata otimizado para ranquear no Google - GreenCheck
export const metadata: Metadata = {
  title: {
    default: 'GreenCheck - Automated ESG Certification with AI & Blockchain | 98.5% Accuracy',
    template: '%s | GreenCheck - ESG Certification Platform'
  },
  description: 'Automated ESG certification platform with AI (98.5% accuracy), blockchain NFT certificates, and scientific validation. CSRD compliance in 21 days. Save 40% vs traditional methods. €8.5B market opportunity.',
  keywords: [
    // Primary Keywords - High Volume
    'ESG certification',
    'automated ESG certification',
    'ESG compliance software',
    'CSRD compliance',
    'corporate sustainability certification',
    'carbon footprint certification',
    'sustainability certification platform',
    
    // Technology Keywords - Differentiators
    'AI ESG certification',
    'blockchain ESG certificates',
    'NFT sustainability certificates',
    'automated carbon offset',
    'ESG AI platform',
    'scientific validation ESG',
    
    // Industry & Standards
    'CSRD certification',
    'EU Taxonomy compliance',
    'GHG Protocol certification',
    'ISO 14064 certification',
    'carbon neutrality certification',
    'Scope 1 2 3 emissions',
    
    // Solution Keywords
    'ESG certification for SMEs',
    'fast ESG certification',
    'affordable ESG certification',
    'ESG certification software',
    'digital ESG certification',
    'ESG audit automation',
    
    // Market & Geography
    'European ESG certification',
    'ESG certification Portugal',
    'ESG certification Europe',
    'CSRD compliance 2025',
    
    // Long-tail Keywords
    'how to get ESG certification',
    'ESG certification cost',
    'ESG certification requirements',
    'ESG certificate blockchain',
    'carbon offset marketplace'
  ].join(', '),
  authors: [
    { name: 'GreenCheck Team', url: 'https://greencheck.replit.app/sobre' }
  ],
  creator: 'GreenCheck',
  publisher: 'GreenCheck',
  formatDetection: {
    telephone: false,
    email: false,
    address: false
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://greencheck.replit.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'pt': '/pt',
      'es': '/es',
      'fr': '/fr'
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['pt_PT', 'es_ES', 'fr_FR'],
    url: 'https://greencheck.replit.app',
    siteName: 'GreenCheck',
    title: 'GreenCheck - Automated ESG Certification with AI & Blockchain',
    description: 'Get your ESG certification in 21 days with 98.5% AI accuracy. Immutable blockchain certificates, scientific validation, and CSRD compliance. Save 40% vs traditional methods.',
    images: [
      {
        url: '/socialbanner.jpg',
        width: 1200,
        height: 630,
        alt: 'GreenCheck - Automated ESG Certification Platform with AI and Blockchain',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@GreenCheck',
    creator: '@GreenCheck',
    title: 'GreenCheck - Automated ESG Certification with AI & Blockchain',
    description: 'ESG certification in 21 days with 98.5% AI accuracy. Blockchain certificates, scientific validation, CSRD compliance. Save 40%.',
    images: ['/socialbanner.jpg']
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
  category: 'technology',
  classification: 'Business Software, Sustainability, ESG Compliance',
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
    other: [{ rel: 'mask-icon', url: '/favicon.png', color: '#059669' }]
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
      <head>
        <meta name="theme-color" content="#059669" />
        <meta name="apple-mobile-web-app-title" content="GreenCheck" />
        <meta name="application-name" content="GreenCheck" />
        
        {/* Preload crítico para otimizar carregamento inicial */}
        <link rel="preload" href="/favicon.png" as="image" type="image/png" />
        <link rel="preconnect" href="https://my.spline.design" />
        <link rel="dns-prefetch" href="https://my.spline.design" />
        
        {/* Estilo inline para evitar flash escuro */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html, body {
              background-color: #f8fafc !important;
              background: linear-gradient(to bottom right, #f8fafc, #f1f5f9) !important;
            }
          `
        }} />
        
        {/* Links de favicon para máxima compatibilidade */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="mask-icon" href="/favicon.png" color="#059669" />
        
        {/* Meta tags sociais adicionais para máxima compatibilidade */}
        <meta property="og:image" content="/socialbanner.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="GreenCheck - Automated ESG Certification" />
        <meta name="twitter:image" content="/socialbanner.jpg" />
        <meta name="twitter:image:alt" content="GreenCheck - Automated ESG Certification" />
        
        {/* Structured Data (JSON-LD) para Google Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'GreenCheck',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'AggregateOffer',
                priceCurrency: 'EUR',
                lowPrice: '9.99',
                highPrice: '2500',
                offers: [
                  {
                    '@type': 'Offer',
                    name: 'ESG Certificate for SMEs',
                    price: '35',
                    priceCurrency: 'EUR',
                    description: 'Per tCO₂e - Automated ESG certification for small businesses'
                  },
                  {
                    '@type': 'Offer',
                    name: 'Individual Subscription',
                    price: '9.99',
                    priceCurrency: 'EUR',
                    description: 'Monthly subscription for individuals'
                  },
                  {
                    '@type': 'Offer',
                    name: 'Enterprise Solution',
                    price: '2500',
                    priceCurrency: 'EUR',
                    description: 'Monthly enterprise custom solutions'
                  }
                ]
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '127',
                bestRating: '5'
              },
              description: 'Automated ESG certification platform with AI (98.5% accuracy), blockchain NFT certificates, and scientific validation. CSRD compliance in 21 days.',
              url: 'https://greencheck.replit.app',
              image: 'https://greencheck.replit.app/socialbanner.jpg',
              author: {
                '@type': 'Organization',
                name: 'GreenCheck',
                url: 'https://greencheck.replit.app/sobre'
              },
              publisher: {
                '@type': 'Organization',
                name: 'GreenCheck',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://greencheck.replit.app/favicon.png'
                }
              },
              featureList: [
                'AI-powered ESG data extraction with 98.5% accuracy',
                'Automated scientific validation via institutional APIs',
                'Immutable blockchain NFT certificates on Polygon',
                'CSRD compliance certification',
                'Carbon offset marketplace integration',
                'Real-time satellite monitoring',
                'Multi-language support (8 European languages)',
                '40% cost reduction vs traditional methods',
                '4x faster processing (21 days vs 6 months)'
              ],
              potentialAction: {
                '@type': 'UseAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://greencheck.replit.app/validacao',
                  actionPlatform: [
                    'http://schema.org/DesktopWebPlatform',
                    'http://schema.org/MobileWebPlatform'
                  ]
                }
              }
            })
          }}
        />
        
        {/* Organization Schema for Brand Recognition */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'GreenCheck',
              alternateName: 'GreenCheck ESG',
              url: 'https://greencheck.replit.app',
              logo: 'https://greencheck.replit.app/favicon.png',
              description: 'Leading automated ESG certification platform combining AI, blockchain, and scientific validation for corporate sustainability compliance.',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'PT',
                addressRegion: 'Europe'
              },
              sameAs: [
                'https://twitter.com/GreenCheck',
                'https://linkedin.com/company/greencheck'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Support',
                availableLanguage: ['English', 'Portuguese', 'Spanish', 'French']
              },
              founder: {
                '@type': 'Person',
                name: 'GreenCheck Team'
              },
              foundingDate: '2024',
              slogan: 'Sustainability without complexity',
              knowsAbout: [
                'ESG Certification',
                'CSRD Compliance',
                'Carbon Footprint Analysis',
                'Blockchain Technology',
                'Artificial Intelligence',
                'Scientific Validation',
                'Sustainability'
              ]
            })
          }}
        />
        
        {/* Service Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: 'Automated ESG Certification',
              provider: {
                '@type': 'Organization',
                name: 'GreenCheck'
              },
              serviceType: 'ESG Certification and Compliance',
              areaServed: {
                '@type': 'Place',
                name: 'Europe'
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'ESG Certification Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'CSRD Compliance Certification',
                      description: 'Automated CSRD compliance certification for European SMEs'
                    }
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Carbon Footprint Certification',
                      description: 'AI-powered carbon footprint calculation and certification'
                    }
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Blockchain ESG Certificates',
                      description: 'Immutable NFT certificates on Polygon blockchain'
                    }
                  }
                ]
              },
              additionalType: 'http://www.productontology.org/id/Certification',
              offers: {
                '@type': 'Offer',
                availability: 'https://schema.org/InStock',
                priceCurrency: 'EUR',
                price: '35'
              }
            })
          }}
        />
        
        {/* FAQ Schema for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is ESG certification?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'ESG certification validates a company\'s Environmental, Social, and Governance practices. GreenCheck provides automated certification using AI with 98.5% accuracy, blockchain verification, and scientific validation in just 21 days.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'How much does ESG certification cost?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'GreenCheck offers ESG certification from €35 per tCO₂e for SMEs, representing 40% cost savings compared to traditional methods (€45-60/tCO₂e). Enterprise solutions start at €2,500/month.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'How long does ESG certification take?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'GreenCheck provides ESG certification in 21 days, which is 4x faster than traditional methods (6-12 months). Our AI-powered platform automates document processing, validation, and certificate generation.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'What is CSRD compliance?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'CSRD (Corporate Sustainability Reporting Directive) is EU legislation requiring 2.4 million European SMEs to report ESG data by 2025. GreenCheck automates CSRD compliance with AI validation and blockchain certificates.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Are blockchain ESG certificates legally valid?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. GreenCheck\'s blockchain NFT certificates on Polygon network are immutable, publicly verifiable, and backed by scientific validation from recognized institutions, making them legally valid for CSRD and EU Taxonomy compliance.'
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body 
        className={`${inter.className} overflow-x-hidden bg-gradient-to-br from-slate-50 to-gray-100`}
        style={{ 
          backgroundColor: '#f8fafc', // slate-50 como fallback
          background: 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)' // from-slate-50 to-gray-100
        }}
      >
        <LoadingProvider>
          <InitialLoading />
          <AudioController />
          <MainContent>
            {children}
            <MobileNav />
            <Toaster />
          </MainContent>
        </LoadingProvider>
      </body>
    </html>
  )
}
