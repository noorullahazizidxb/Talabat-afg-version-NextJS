/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'http', hostname: '**' },
      { protocol: 'https', hostname: '**' },
    ],
    unoptimized: true,
  },

  distDir: '.next-temp',
  productionBrowserSourceMaps: false,

  // 'output: export' removed — incompatible with API routes (/api/theme-tokens).
  // Pages without server-side data are automatically statically pre-rendered by Next.js.
};

module.exports = nextConfig;
