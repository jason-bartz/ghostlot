import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the hostname (e.g. vercel.com, test.vercel.app, etc.)
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;
  
  // Define conditions for the main domain and its subdomain
  const isMainDomain = hostname.includes('ghostlot.com') && !hostname.includes('app.');
  const isAppDomain = hostname.includes('app.ghostlot.com');
  
  console.log('Middleware hostname:', hostname, 'pathname:', pathname, 'isMainDomain:', isMainDomain, 'isAppDomain:', isAppDomain);
  
  // For local development
  const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1');
  
  // If it's the main domain and root path, redirect to index.html
  if (isMainDomain && pathname === '/') {
    console.log('Rewriting to /index.html');
    // Rewrite to /index.html
    return NextResponse.rewrite(new URL('/index.html', request.url));
  }
  
  // For localhost, we want to allow Next.js to handle all routes
  if (isLocalhost) {
    console.log('Localhost detected, allowing Next.js to handle all routes');
    return NextResponse.next();
  }
  
  // Otherwise, continue with normal Next.js behavior
  return NextResponse.next();
}

// Run the middleware on the specified paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};