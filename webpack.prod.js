const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  mode: 'production',
  output: {
    path: path.join(__dirname, "public"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
        ]
      },
      {
        test: /\.(jpe?g|png)$/i,
        type: 'asset/resource',
        generator: { filename: 'image/[name][ext]' }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: { filename: 'font/[name][ext]' }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production',
      filename: "index.html",
      template: path.join(__dirname, "src", "index.html"),
    }),
    new MiniCssExtractPlugin({
      ignoreOrder: true,
      filename: "[name].[contenthash].css",
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
    ]
  }
}