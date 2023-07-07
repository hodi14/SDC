/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    backendUrl: "https://43.202.44.172:8810/",
  },

  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://43.202.44.172:8810/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
