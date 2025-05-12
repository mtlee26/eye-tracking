/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          fs: false,
        },
      };
    }
    return config;
  },

  images: {
    domains: ["via.placeholder.com"],
  },
};

export default nextConfig;
