/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
	headers: [
		{ key: "Access-Control-Allow-Credentials", value: "true" },
    { key: "Access-Control-Allow-Origin", value: "*" },
		{ key: 'Referrer-Policy', value: 'no-referrer' }
	]
}

module.exports = nextConfig
