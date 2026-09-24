/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Allow images from external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
    ],
  },

  // Disable source maps in production for smaller bundles
  productionBrowserSourceMaps: false,

  // Experimental: enable turbopack for faster dev
  experimental: {
    turbo: {},
  },
};

module.exports = nextConfig;
