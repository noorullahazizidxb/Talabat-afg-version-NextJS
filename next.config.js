/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic configuration
  reactStrictMode: false,
  
  // Configure images to allow external domains
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
  
  // Use custom directory to avoid permission issues
  distDir: '.next-temp',
  
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  
  // Enable static HTML export
  output: 'export',
};

module.exports = nextConfig;
