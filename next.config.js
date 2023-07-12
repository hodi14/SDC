/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    backendUrl: "http://43.202.44.172:8000/",
  },

  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://43.202.44.172:8000/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
