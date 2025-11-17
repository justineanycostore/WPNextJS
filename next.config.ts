import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: '**' }, // tighten to your WP host or CDN in prod
    ],
  },
  reactStrictMode: true,
};
module.exports = nextConfig;


export default nextConfig;
