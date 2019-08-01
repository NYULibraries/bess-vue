const webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: [
      'spec',
    ],
    browsers: ['ChromiumHeadlessNoSandbox'],
    customLaunchers: {
      ChromiumHeadlessNoSandbox: {
        base: 'ChromiumHeadless',
        flags: [
          "--no-sandbox",
          "--disable-gpu",
          "--disable-software-rasterizer",
          "--disable-dev-shm-usage",
        ]
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
    webpack: {
      ...webpackConfig,
      mode: 'development',
    },
  });
};