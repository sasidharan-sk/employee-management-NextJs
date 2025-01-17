import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "7258",
        pathname: "/Images/**",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
