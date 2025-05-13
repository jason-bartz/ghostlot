import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the hostname (e.g. vercel.com, test.vercel.app, etc.)
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;
  
  // Define conditions for the main domain and its subdomain
  const isMainDomain = hostname.includes('ghostlot.com') && !hostname.includes('app.');
  
  // If it's the main domain and root path, redirect to index.html
  if (isMainDomain && pathname === '/') {
    // Rewrite to /index.html
    return NextResponse.rewrite(new URL('/index.html', request.url));
  }
  
  // Otherwise, continue with normal Next.js behavior
  return NextResponse.next();
}

// Run the middleware on the homepage only
export const config = {
  matcher: ['/'],
};