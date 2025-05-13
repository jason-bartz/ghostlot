import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Check for test user cookie - this will bypass all auth for demo purposes
  const testUserCookie = req.cookies.get('test_user_bypass');
  if (testUserCookie?.value === 'test@test.com') {
    // If this is our test user, allow access to all routes
    return res;
  }

  try {
    // Create a Supabase client configured to use cookies
    const supabase = createMiddlewareClient({ req, res });

    // Refresh session if expired - required for Server Components
    await supabase.auth.getSession();

    // Get the pathname
    const pathname = req.nextUrl.pathname;

    // Skip middleware for static assets and API routes
    if (
      pathname.startsWith('/_next') ||
      pathname.startsWith('/api') ||
      pathname.includes('.') // Skip files with extensions (images, etc.)
    ) {
      return res;
    }

    // Special handling for admin/test-data and dashboard routes for demo purposes
    if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/vehicle')) {
      // For demo purposes, we'll skip auth checks for these paths
      console.log(`Bypassing auth check for demo path: ${pathname}`);
      return res;
    }

    // Get the session
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Error in middleware getting session:', error);
      // Continue despite error to prevent blocking user
      return res;
    }

    // If user is not logged in and trying to access protected routes
    if (!session && (pathname.startsWith('/dashboard') || pathname.startsWith('/profile'))) {
      // Store the original URL to redirect back after login
      const url = new URL('/login', req.url);
      url.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(url);
    }

    // If user is logged in and trying to access auth routes
    if (session && (pathname === '/login' || pathname === '/signup')) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return res;
  } catch (error) {
    console.error('Unexpected error in middleware:', error);
    // Return the original response in case of error to avoid blocking the request
    return res;
  }
}

export const config = {
  matcher: [
    // Optional: Match all request paths except for these
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};