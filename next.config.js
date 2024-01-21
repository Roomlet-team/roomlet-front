const stylexPlugin = require('@stylexjs/nextjs-plugin');
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = stylexPlugin({
  rootDir: __dirname,
})(nextConfig);
