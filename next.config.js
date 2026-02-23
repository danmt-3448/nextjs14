/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Tắt strict mode trong dev để tránh double render
  transpilePackages: ['antd', '@ant-design/nextjs-registry'],
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Output optimization
  output: 'standalone',
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['antd', '@ant-design/icons', 'lodash'],
  },
  
  // Modularize imports để tree-shake tốt hơn
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
  
  // Webpack optimization
  webpack: (config, { isServer, dev }) => {
    // Enable caching trong dev mode
    if (dev) {
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      }
    }
    
    // Bundle analyzer (run with ANALYZE=true yarn build)
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
  },
}

module.exports = nextConfig
