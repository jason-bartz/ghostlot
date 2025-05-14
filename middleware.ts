import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  
  // Log incoming request details
  console.log(`Middleware processing: ${pathname}`);

  // Handle root path specifically - direct to index.html
  if (pathname === '/') {
    console.log('Root path detected, rewriting to /index.html');
    return NextResponse.rewrite(new URL('/index.html', request.url));
  }

  // Let all other requests continue normally
  return NextResponse.next();
}

// Configure middleware to run only on specific paths
export const config = {
  matcher: [
    // Only process the root path with middleware
    '/'
  ],
};