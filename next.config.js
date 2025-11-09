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
  // Expose environment variables to the application
  env: {
    NEBBULON_AWS_REGION: process.env.NEBBULON_AWS_REGION || 'ap-south-1',
    NEBBULON_AWS_ACCESS_KEY_ID: process.env.NEBBULON_AWS_ACCESS_KEY_ID || '',
    NEBBULON_AWS_SECRET_ACCESS_KEY: process.env.NEBBULON_AWS_SECRET_ACCESS_KEY || '',
    DYNAMODB_TABLE_NEWS: process.env.DYNAMODB_TABLE_NEWS || 'nebbulon-news-articles',
    DYNAMODB_TABLE_ADMINS: process.env.DYNAMODB_TABLE_ADMINS || 'nebbulon-admins',
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || 'nebbulon-news-images',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'https://nebbulon.com',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || '',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@nebbulon.com',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'Admin@123',
  },
  // Server runtime config for server-side only variables
  serverRuntimeConfig: {
    NEBBULON_AWS_REGION: process.env.NEBBULON_AWS_REGION || 'ap-south-1',
    NEBBULON_AWS_ACCESS_KEY_ID: process.env.NEBBULON_AWS_ACCESS_KEY_ID,
    NEBBULON_AWS_SECRET_ACCESS_KEY: process.env.NEBBULON_AWS_SECRET_ACCESS_KEY,
    DYNAMODB_TABLE_NEWS: process.env.DYNAMODB_TABLE_NEWS || 'nebbulon-news-articles',
    DYNAMODB_TABLE_ADMINS: process.env.DYNAMODB_TABLE_ADMINS || 'nebbulon-admins',
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || 'nebbulon-news-images',
  },
}

module.exports = nextConfig
