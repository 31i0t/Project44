/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://project44.vercel.app/:path*",
      },
    ];
  },

  headers: [
    { key: "Access-Control-Allow-Credentials", value: "true" },
    { key: "Access-Control-Allow-Origin", value: "*" },
  ],
};

module.exports = nextConfig;
