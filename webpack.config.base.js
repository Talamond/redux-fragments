// Common Webpack configuration used by webpack.config.development and webpack.config.production

const path = require('path');
const webpack = require('webpack');

module.exports = {
  output: {
    filename: 'fragmentHelper.js',
    path: path.resolve(__dirname, 'dist'),
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
    loaders: [
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel'
      }
    ]
  }
};
