// Dynamic Sitemap for GreenCheck - Next.js 13+ App Router
// This generates sitemap.xml automatically at build time

import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://greencheck.replit.app'
  
  // Current date for lastModified
  const now = new Date()
  
  // Static pages with high priority
  const staticPages = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/validacao`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/marketplace`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/investidores/acesso`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/investidores/nda`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/admin/login`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Language variations for key pages (i18n SEO)
  const languages = ['en', 'pt', 'es', 'fr']
  const languagePages = languages.flatMap(lang => [
    {
      url: `${baseUrl}/${lang}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  ])

  return [...staticPages, ...languagePages]
}

