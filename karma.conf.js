const webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: [
      'spec',
      // 'coverage',
      // 'coveralls'
    ],
    browsers: ['ChromeHeadless'],
    basePath: 'js/',
    files: [
      './index.js',
      './test/test.js',
    ],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap'],
    },
    // coverageReporter: {
    //   type: 'lcov',
    //   dir: 'coverage/'
    // },
    webpack: Object.assign(
      {},
      webpackConfig
    ),
  });
};