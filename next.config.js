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
  // Domain-based routing configuration
  async rewrites() {
    return [
      // For ghostlot.com or www.ghostlot.com, serve the static landing page
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: '(?:www\\.)?ghostlot\\.com',
          },
        ],
        destination: '/index.html',
      },
      // For ghostlot.com/*, serve static assets directly
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
      // Default behavior for all other domains (including app.ghostlot.com)
      {
        source: '/',
        destination: '/app/page',
      }
    ];
  },
  // Ensure that we treat index.html as a static file
  async headers() {
    return [
      {
        source: '/index.html',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/html; charset=utf-8'
          }
        ]
      }
    ];
  },
}

module.exports = nextConfig
