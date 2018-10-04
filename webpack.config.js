const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('./config.js');

const isProduction = process.env.NODE_ENV === 'production';
const isStaging = process.env.NODE_ENV === 'staging';
const isOnServer = isProduction || isStaging;

const productionPlugins = [
  new MiniCssExtractPlugin({
    filename: 'primo_explore_search_embed.min.css'
  }),
];
const devPlugins = [

];

module.exports = {
  context: path.resolve(__dirname, 'js'),
  entry: {
    app: [
      './index.js',
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js'
  },
  devtool: isProduction ? undefined : isStaging ? 'source-map' : 'eval-source-map',
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.scss$/,
          use: [
            isOnServer ? MiniCssExtractPlugin.loader : 'vue-style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ],
  },
  plugins: [
    new webpack.DefinePlugin({
      CONFIG: JSON.stringify(config),
    }),
    new VueLoaderPlugin(),
    ...(isOnServer ? productionPlugins : devPlugins)
  ]
};
