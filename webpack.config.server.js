var fs = require("fs");
var path = require("path");
var webpack = require("webpack");
var ExternalsPlugin = require("webpack2-externals-plugin");

module.exports = {
  entry: path.resolve(__dirname, "server/server.js"),
  output: {
    path: __dirname + "/dist/",
    filename: "server.bundle.js"
  },
  target: "node",
  node: {
    __filename: true,
    __dirname: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["react", "env", "stage-0"],
          plugins: ["transform-runtime"]
        }
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  },
  plugins: [
    new ExternalsPlugin({
      type: "commonjs",
      include: path.join(__dirname, "./node_modules/")
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    })
  ]
};
