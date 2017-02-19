// Common Webpack configuration used by webpack.config.development and webpack.config.production

const path = require('path');
const webpack = require('webpack');

module.exports = {
  // TODO hmmm webpack 2 needs this, karma doesn't, error message results
  entry: {
    script: path.resolve(__dirname, "./entry.js")
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /(\/node_modules\/|test\.js$)/,
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [ require('autoprefixer')({ browsers: ['last 2 versions'] }) ]
            }
          },
          { loader: 'sass-loader', query: { outputStyle: 'expanded' } }
        ]
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }
    ]
  },

  output: {
    path: "./dist",
    filename: "script.js",
    pathinfo: true
  },

  resolve: {
    extensions: [".js"],
    modules: [
      __dirname,
      path.resolve(__dirname, "./node_modules")
    ]
  },
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true,
    'react/lib/ReactContext': 'window'
  },
};
