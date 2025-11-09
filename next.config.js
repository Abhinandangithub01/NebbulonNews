/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  // Disable static optimization for pages with dynamic data
  output: 'standalone',
  // Ensure proper module resolution for Mantine
  transpilePackages: ['@mantine/core', '@mantine/hooks', '@mantine/form', '@mantine/notifications', '@mantine/tiptap'],
}

module.exports = nextConfig
