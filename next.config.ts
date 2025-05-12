import CopyPlugin from 'copy-webpack-plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: { unoptimized: true },
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // append the CopyPlugin to copy the file to your public dir
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: './node_modules/@oiti/facetec-sdk',
            to: './static/chunks/facetec-sdk',
          },
          {
            from: './node_modules/@oiti/sdk-web/dist/src/shared/public',
            to: './static/chunks/public/',
          },
        ],
      })
    );

    // Important: return the modified config
    return config;
  },
};

export default nextConfig;
