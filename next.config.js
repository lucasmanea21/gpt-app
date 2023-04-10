const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    // Add the plugin only in development mode
    if (!options.isServer && options.dev) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    return config;
  },
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
