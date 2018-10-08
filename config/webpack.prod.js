const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const ManifestPlugin = require("webpack-manifest-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const webpack = require("webpack");

module.exports = merge(common, {
    mode: "production",
    // devtool: "source-map",
    plugins: [
      new ManifestPlugin(),
      new UglifyJSPlugin({
        sourceMap: true
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production")
      })
    ]
  });