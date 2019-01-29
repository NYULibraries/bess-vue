const webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: [
      'spec',
      // 'coverage',
      // 'coveralls'
    ],
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    basePath: 'js/',
    files: [
      './test/test.setup.js',
      './test/**/*.spec.js',
      './index.js',
    ],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap'],
      './test/**/*.js': ['webpack', 'sourcemap'],
    },
    // coverageReporter: {
    //   type: 'lcov',
    //   dir: 'coverage/'
    // },
    webpack: {
      ...webpackConfig,
      mode: 'development',
    },
  });
};