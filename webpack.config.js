const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const config = require('./config.json');
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
    app: './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js'
  },
  devtool: isProduction ? undefined : 'eval-source-map',
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
            isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ],
  },
  plugins: [
    new webpack.DefinePlugin({
      CONFIG: JSON.stringify(config)
    }),
    new VueLoaderPlugin(),
    ...(isProduction ? productionPlugins : devPlugins)
  ]
};
