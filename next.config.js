/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  basePath: "/jungmocha",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/**',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
