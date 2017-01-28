// Common Webpack configuration used by webpack.config.development and webpack.config.production

const path = require('path');
const webpack = require('webpack');

module.exports = {
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'build/client'),
    publicPath: '/'
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ],
    extensions: ['.js']
  },
  module: {
    preloaders: [
      {
        test: /\.js$/,
        include: [/src/, /tests/],
        exclude: /(node_modules)/,
        loader: 'babel'
      },
      {
        test: /\.js?$/,
        include: /src/,
        exclude: /node_modules/,
        loader: 'babel-istanbul'
      }
    ],
    loaders: [
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, './src'),
        exclude: path.resolve(__dirname, './tests'),
        loader: 'babel'
      }
    ]
  }
};
