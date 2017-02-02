var path = require('path');

module.exports = {
  entry: {
    app: ['./src/fragmentHelper.js']
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'fragment-helper.js',
    chunkFilename: '[name].fragment-helper.js',
    library: 'ReduxFragments',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /.js$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      loaders: ['babel-loader']
    }]
  }

};
