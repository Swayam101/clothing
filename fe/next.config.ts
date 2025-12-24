import type { NextConfig } from 'next';
import { resolve } from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Fix for multiple lockfiles warning
  outputFileTracingRoot: resolve(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

export default nextConfig;