/** @type {import('next').NextConfig} */
const nextConfig = {}
const path = require('path')
// module.exports = nextConfig
module.exports = {
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
    nextConfig,
    images:{
      domains:['firebasestorage.googleapis.com'],
      dangerouslyAllowSVG: true,
      contentDispositionType: 'attachment',
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    webpack : (config) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      });

      return config;
  }
  }
