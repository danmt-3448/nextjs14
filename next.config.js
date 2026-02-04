/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd', '@ant-design/nextjs-registry'],
  images: {
    domains: [],
  },
}

module.exports = nextConfig
