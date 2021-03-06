// const withOffline = require('next-offline');
const withFirepressConfig = require('@firepress/core/config');
const path = require('path');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies

let firebaseConfig;
try {
  firebaseConfig = require('./config/firebase.config'); // eslint-disable-line global-require
} catch {
  firebaseConfig = {};
}

module.exports = withFirepressConfig({
  distDir: process.env.NODE_ENV === 'development' ? './tmp/.next' : './dist/build',
  dontAutoRegisterSw: true,
  firepress: {
    projectId: firebaseConfig.projectId,
    cloudRenderedPages: [],
    firebaseConfig,
  },
  webpack(config) {
    config.resolve.alias = { // eslint-disable-line no-param-reassign
      ...config.resolve.alias || {},
      '@elements': path.resolve(__dirname, './src/app/components/elements'),
      '@partials': path.resolve(__dirname, './src/app/components/partials'),
      '@templates': path.resolve(__dirname, './src/app/components/templates'),
      '@hocs': path.resolve(__dirname, './src/app/components/hocs'),
      '@config': path.resolve(__dirname, './src/app/config'),
      '@plugins': path.resolve(__dirname, './src/app/plugins'),
      '@store': path.resolve(__dirname, './src/app/store'),
      react: path.resolve('node_modules/react'),
    };

    config.resolve.plugins = [ // eslint-disable-line no-param-reassign
      ...config.resolve.plugins || [],
      new DirectoryNamedWebpackPlugin({
        honorIndex: true,
        exclude: /node_modules/,
      }),
    ];

    config.module.rules.push(
      {
        test: /\.(eot|woff|woff2|ttf|svg|bmp|png|jpe?g|gif)$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    );

    return config;
  },
  sassLoaderOptions: {
    includePaths: ['node_modules'],
  },
});
