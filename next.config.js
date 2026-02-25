/** @type {import('next').NextConfig} */
const isTurbo = !!process.env.TURBOPACK
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['antd', '@ant-design/nextjs-registry'],

  compress: true,
  poweredByHeader: false,
  output: 'standalone',

  experimental: {
    optimizePackageImports: ['antd', '@ant-design/icons', 'lodash', '@tanstack/react-query'],
    cssChunking: 'loose',
    turbo: {
      dev: {
        memoryLimit: 4096,
      },
    },
  },

  modularizeImports: {
    '@ant-design/icons': {
      transform: '@ant-design/icons/{{member}}',
    },
  },

  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
}

if (!isTurbo) {
  nextConfig.compiler = {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  }

  nextConfig.webpack = (config, { isServer, dev }) => {
    if (dev) {
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      }
    }

    if (process.env.ANALYZE === 'true' && !isServer) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: true,
          reportFilename: '../analyze.html',
        })
      )
    }

    return config
  }
}

module.exports = nextConfig
