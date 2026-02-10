/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
      
      // Provide jQuery globally
      config.plugins.push(
        new (require('webpack').ProvidePlugin)({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
          'window.$': 'jquery',
        })
      );
    }
    
    return config;
  },
};

module.exports = nextConfig;