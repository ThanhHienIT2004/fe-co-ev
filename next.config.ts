import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'], // nếu có ảnh từ localhost
  },
};

export default nextConfig;
