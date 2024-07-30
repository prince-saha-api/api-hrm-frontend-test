/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "10.10.23.64", //
      "10.10.23.61",
      "10.10.20.20",
      "113.212.109.147",
    ],
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "http",
  //       hostname: "10.10.23.64",
  //       port: "8000",
  //       pathname: "/**",
  //     },
  //   ],
  // },
};

module.exports = nextConfig;
