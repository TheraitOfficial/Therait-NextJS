/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    EXPRESS_URL: process.env.EXPRESS_URL,
    IMAGE_DOMAIN: process.env.IMAGE_DOMAIN,
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    IMAGE_DOMAIN: process.env.IMAGE_DOMAIN,
  },
  images: {
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96],
    domains: [process.env.IMAGE_DOMAIN],
    path: '/_next/image',
    loader: 'default',
    unoptimized: true,
  },
};

module.exports = nextConfig;
