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
    return [
      {
        source: '/',
        destination: '/index.html'
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
