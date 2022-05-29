const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    path: path.join(__dirname, "public"),
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
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
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
    })
  ],
  devServer: {
    compress: false,
    open: "/",
    port: 3001,
  }
}