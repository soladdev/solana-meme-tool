/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Mock the 'fs' module on the client side
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
      config.cache = {
        type: 'filesystem',
        compression: false, // Disable compression
        maxMemoryGenerations: 1,
      };
    }
    return config;
  }
};

export default nextConfig;
