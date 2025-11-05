
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['firebasestorage.googleapis.com', 'images.unsplash.com'],
  },
  transpilePackages: ['@phosphor-icons/react'],
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      ...config.watchOptions,
      poll: 1000,
      aggregateTimeout: 300,
    };
    
    // Handle @phosphor-icons/react ESM module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    return config;
  },
  async redirects() {
    return [
      // Redirect old Portuguese routes to new English routes
      {
        source: '/sobre',
        destination: '/about',
        permanent: true, // 301 redirect for SEO
      },
      {
        source: '/validacao',
        destination: '/validation',
        permanent: true,
      },
      {
        source: '/investidores',
        destination: '/investors',
        permanent: true,
      },
      {
        source: '/investidores/login',
        destination: '/investors/login',
        permanent: true,
      },
      {
        source: '/investidores/nda',
        destination: '/investors/nda',
        permanent: true,
      },
      {
        source: '/investidores/pending-approval',
        destination: '/investors/pending-approval',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig;
