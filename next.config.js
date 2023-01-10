/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  scope: '/app',
  sw: 'service-worker.js'
})

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.wp.com'
      },
      {
        protocol: 'https',
        hostname: '**.javcdn.info'
      },
    ],
    minimumCacheTTL: 2630000,
    imageSizes: [16, 32, 48, 64, 96, 160, 179, 288, 292],
    formats: ['image/avif', 'image/webp']

  }
}

module.exports = withPWA(nextConfig)
