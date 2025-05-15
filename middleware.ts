import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  
  // Log incoming request details
  console.log(`Middleware processing: ${pathname}`);

  // Root path now serves the Next.js page - no rewrite needed
  // Removed rewrite to index.html to serve the Next.js page instead

  // Let all requests continue normally
  return NextResponse.next();
}

// Configure middleware to run only on specific paths
export const config = {
  matcher: [
    // Only process the root path with middleware
    '/'
  ],
};