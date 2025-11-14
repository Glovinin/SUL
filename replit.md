# SUL ESTATE - Boutique Real Estate Portugal

## Overview

SUL ESTATE (formerly GreenCheck) is a boutique real estate and investment consultancy platform based in Lisbon, Portugal. The platform serves international investors seeking premium property assets in Portugal, offering property search, investment advisory, project management, and market insights.

The application is built with Next.js 13+ (App Router), TypeScript, and Firebase, featuring a modern, minimalist design inspired by premium brands like OpenAI, Meta, and Apple. The platform includes a public-facing website, an admin dashboard for content management, and an investor portal.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: Next.js 13.5.1 with App Router and TypeScript
- **Styling**: TailwindCSS with custom design system featuring premium minimalism
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Animations**: Framer Motion for smooth page transitions and micro-interactions
- **Icons**: Phosphor Icons React for consistent iconography
- **Image Handling**: Next.js Image component with Firebase Storage support

**Design Philosophy**:
- Ultra-minimal, clean lines with generous white space
- Premium typography (Playfair Display for headings, Inter for body)
- Sophisticated color palette: Deep Charcoal (#2B2B2B), Warm Sand (#F5F3F0), Muted Gold (#B8956A)
- Mobile-first responsive design with iOS-specific optimizations

**Key Pages**:
- `/` - Homepage with hero section, featured properties, services overview
- `/about` - Company information and team
- `/services` - Detailed service offerings
- `/properties` - Property listings with filtering
- `/properties/[id]` - Individual property details
- `/blog` - Blog posts about market trends
- `/contact` - Contact form and information
- `/portugal` - Information about investing in Portugal

### Backend Architecture

**Authentication**: Firebase Authentication
- Email/password for admin users
- Session-based authentication with middleware protection
- Route protection via Next.js middleware (`middleware.ts`)

**Data Storage**: Firebase Firestore
- **Collections**:
  - `properties` - Property listings with images, details, pricing
  - `blog` - Blog posts with metadata and content
  - `leads` - Contact form submissions and inquiries
  - `investors` - Investor portal user data (legacy from GreenCheck)
  - `admins` - Admin user data (legacy from GreenCheck)
  - `analytics` - Usage tracking data

**File Storage**: Firebase Storage
- Property images and galleries
- Blog post images
- User-uploaded documents (admin dashboard)

**API Layer**:
- Client-side Firebase SDK for direct Firestore queries
- Server-side rendering with Next.js API routes when needed
- Helper functions in `/lib/admin-helpers.ts` for CRUD operations
- Type-safe interfaces defined in `/lib/admin-types.ts`

### State Management

**Context Providers**:
- `LoadingContext` - Global loading states for page transitions
- `LanguageContext` - Multi-language support (PT, EN, ES, FR)

**Client-Side Hooks**:
- `useProperties()` - Fetches and caches property listings
- `useFeaturedProperties()` - Filtered featured properties
- `useMobileOptimizedAnimation()` - Device-specific animation configs

### Admin Dashboard

**Routes**:
- `/admin` - Dashboard with KPIs and analytics
- `/admin/properties` - Property management (CRUD)
- `/admin/properties/[id]` - Property editor (supports `new` for creation)
- `/admin/blog` - Blog post management
- `/admin/blog/[id]` - Blog editor
- `/login` - Admin login page

**Features**:
- Real-time property and blog post management
- Image upload and gallery management
- Lead tracking and management
- Analytics dashboard with visit tracking
- Protected routes with authentication checks

### Performance Optimizations

**Loading Strategy**:
- Initial loading screen with brand animation
- Page transition loading states (currently disabled for smoother UX)
- Image optimization with Next.js Image component
- Hero image preloading and caching (24-hour localStorage cache)

**Mobile Optimizations**:
- Reduced animation complexity on mobile devices
- iOS-specific fixes for rendering issues
- GPU-accelerated transforms via `MotionOptimizer`
- Viewport-based lazy loading
- Touch-optimized UI components

### SEO & Discoverability

**Metadata Strategy**:
- Dynamic metadata generation per page
- Open Graph and Twitter Card support
- Multi-language meta tags (EN, PT, ES, FR)
- Structured data (JSON-LD) for Organization, Service, FAQ schemas
- Canonical URLs and robots meta tags

**Sitemaps & Indexing**:
- Dynamic sitemap generation (`/app/sitemap.ts`)
- Robots.txt configuration for optimal crawling
- PWA manifest for mobile installation

### Navigation & Routing

**Navigation System**:
- Responsive navbar with mobile hamburger menu
- Language switcher (PT/EN/ES/FR)
- Smooth scroll to sections
- Protected route middleware for admin areas

**URL Structure**:
- Clean, SEO-friendly URLs
- Permanent redirects from old Portuguese routes to English equivalents
- Query parameter support for property filtering

## External Dependencies

### Firebase Services
- **Firebase Authentication** - User authentication and session management
- **Cloud Firestore** - NoSQL database for properties, blog posts, leads
- **Firebase Storage** - File storage for images and documents
- **Firebase Admin SDK** - Server-side operations (configured but not actively used)

### Third-Party Libraries
- **Framer Motion** - Animation library for page transitions and UI animations
- **Radix UI** - Headless UI primitives for accessible components
- **shadcn/ui** - Pre-built component library based on Radix UI
- **Phosphor Icons** - Icon library for consistent visual language
- **TailwindCSS** - Utility-first CSS framework
- **jsPDF** - PDF generation (used in legacy investor NDA feature)
- **Axios** - HTTP client for API requests
- **clsx** & **tailwind-merge** - Utility for conditional class names
- **cmdk** - Command palette component

### Development Tools
- **TypeScript** - Type safety across the application
- **ESLint** - Code quality and consistency
- **Autoprefixer** - CSS vendor prefix automation
- **PostCSS** - CSS processing pipeline

### External APIs (Potential Future Integration)
- Google Maps API for property location visualization
- Email service (SendGrid/Mailgun) for contact form submissions
- Analytics platform (Google Analytics/Plausible) for visitor tracking

### Asset Sources
- **Unsplash** - Placeholder images for properties and blog posts
- Custom brand assets in `/public/images/`
- Firebase Storage for user-uploaded content

### Legacy Features (GreenCheck ESG Platform)
The codebase contains remnants of a previous ESG certification platform called "GreenCheck":
- Investor portal with NDA signing functionality (`/investors/*` routes)
- ESG document processing logic
- Blockchain NFT certificate generation code
- Audio narration system for page transitions

These features are currently inactive but the infrastructure remains in place.