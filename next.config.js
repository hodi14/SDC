/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    backendUrl: "https://speechdc.ir/",
  },

  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: "https://speechdc.ir/:path*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
