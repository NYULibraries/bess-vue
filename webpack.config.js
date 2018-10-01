const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const yaml = require('yaml');
const fs = require('fs');

const yamlFile = fs.readFileSync('./config.yml', 'utf8');
const config = yaml.parse(yamlFile, { merge: true });

const isProduction = process.env.NODE_ENV === 'production';
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
  devtool: isProduction ? undefined : 'eval-source-map',
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: isProduction ? undefined : /node_modules/, // must transform modules in case using es6+ syntax
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
      CONFIG: JSON.stringify(config),
    }),
    new VueLoaderPlugin(),
    ...(isProduction ? productionPlugins : devPlugins)
  ]
};
