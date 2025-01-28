import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    EMPLOYEE_BASE_URL: "https://localhost:7258/api",
  },
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
