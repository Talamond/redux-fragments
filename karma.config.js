var path = require('path');
var webpackConfig = require('./webpack.config.test.js');

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    coverageReporter: {
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'lcovonly', subdir: '.' },
      ],
    },
    files: [
      'tests/fragmentHelper.spec.js',
    ],
    frameworks: [
      'jasmine',
    ],
    preprocessors: {
      'tests/fragmentHelper.spec.js': ['webpack', 'sourcemap'],
    },
    reporters: ['progress', 'coverage'],
    webpack: webpackConfig
  });
};
