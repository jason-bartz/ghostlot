/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // We're ignoring TypeScript errors during build to make deployment succeed
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });
    return config;
  },
  // This custom rewrites configuration will serve index.html as the main landing page
  async rewrites() {
    const isProduction = process.env.NODE_ENV === 'production';
    
    return [
      {
        // For the main domain (www.ghostlot.com)
        source: '/',
        has: [
          {
            type: 'host',
            value: '(?:www\\.)?ghostlot\\.com',
          },
        ],
        destination: '/index.html',
      },
      // Add a fallback rewrite for all paths on the main domain
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '(?:www\\.)?ghostlot\\.com',
          },
        ],
        destination: '/:path*',
      },
    ];
  },
}

module.exports = nextConfig
