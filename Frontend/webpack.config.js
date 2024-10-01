const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv').config();  // Load environment variables from .env file

module.exports = {
  entry: './Src/index.js', // Ensure this path is correct
  output: {
    path: path.resolve(__dirname, 'dist'), // Use lowercase 'dist' if the folder is lowercase
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
    }),
    new HtmlWebpackPlugin({
      template: './Public/index.html', // Ensure this path is correct
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed)  // Inject environment variables
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    static: path.join(__dirname, 'Public'), // Ensure this matches your actual folder
    hot: true,
    historyApiFallback: true,
    port: 3000 // Add this line to specify the port
},
};
