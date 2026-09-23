import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: process.env.FLO_LOW_DISK_MODE !== "1",
    turbopackFileSystemCacheForBuild: process.env.FLO_LOW_DISK_MODE !== "1",
  },
  allowedDevOrigins: ["127.0.0.1", "localhost", "cursor", "0.0.0.0"],
  images: {
    qualities: [75, 90, 95],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2560, 3200, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 768],
  },
};

export default nextConfig;
