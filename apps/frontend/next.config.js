/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@movie-app/ui", "@movie-app/shared-types"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Optimize for faster rebuilds
  experimental: {
    optimizePackageImports: ["@movie-app/ui"],
  },
  // Faster webpack builds
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig;
