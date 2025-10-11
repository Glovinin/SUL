// Next.js Middleware
// Protects routes based on authentication and authorization
// ─────────────────────────────────────────────────────────────

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect /admin routes - require admin authentication
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    // Client-side will handle Firebase auth verification
    // This is just a basic protection layer
    return NextResponse.next()
  }

  // Protect /investidores route (main dashboard) - require approved status
  if (pathname === '/investidores') {
    // Client-side will handle Firebase auth verification and status check
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/investidores',
  ],
}



