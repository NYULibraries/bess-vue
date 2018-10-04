process.env.CHROME_BIN = process.env.CHROME_BIN || require('puppeteer').executablePath();

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
      './test/test.setup.js',
      './test/test.js',
      './index.js',
    ],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap'],
      './test/index.js': ['webpack', 'sourcemap'],
    },
    // coverageReporter: {
    //   type: 'lcov',
    //   dir: 'coverage/'
    // },
    webpack: webpackConfig,
  });
};