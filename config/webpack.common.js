const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

const ENV = process.env.NODE_ENV;

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  //   optimization: {
  //     runtimeChunk: {
  //       name: "common"
  //     },
  //     splitChunks: {
  //       cacheGroups: {
  //         commons: {
  //           test: /[\\/]node_modules[\\/]/,
  //           name: "vendor",
  //           chunks: "all"
  //         }
  //       }
  //     }
  //   },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin({
      filename: "styles.css",
      disable: ENV !== "production" ? true : false
    })
  ],
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "../dist"),
    library: "demo", // 插件名称
    libraryTarget: "umd" // 插件支持CommonJS2，CommonJS，amd，var
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{ loader: "css-loader", options: { minimize: true } }]
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
};
