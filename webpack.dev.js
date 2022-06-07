const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    path: path.join(__dirname, "public_dev"),
    filename: "[name].js",
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
          "style-loader",
          { loader: "css-loader", options: { sourceMap: true } },
        ]
      },
      {
        test: /\.(jpe?g|png)$/i,
        type: 'asset/resource',
        generator: { filename: 'image/[name][ext]' }
      },
      {
        test: /font.*\.+(woff|woff2|eot|ttf|otf|svg)$/i,
        type: 'asset/resource',
        generator: { filename: 'font/[name][ext]' }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: "index.html",
      template: path.join(__dirname, "src", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new StylelintPlugin({
      context: 'src',
      files: ['**/*.css'],
      emitWarning: false,
      emitError: false
    })
  ],
  devServer: {
    compress: false,
    open: "/",
    port: 3001,
  }
}