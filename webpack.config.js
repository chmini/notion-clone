const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const DotenvPlugin = require('dotenv-webpack');

module.exports = {
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
    new MiniCSSExtractPlugin(),
    new DotenvPlugin({
      systemvars: true,
    }),
  ],
  devServer: {
    port: 4000,
    historyApiFallback: true,
  },
};
