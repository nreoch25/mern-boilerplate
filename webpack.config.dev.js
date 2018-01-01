var webpack = require("webpack");
var cssnext = require("postcss-cssnext");

module.exports = {
  entry: {
    app: [
      "webpack-hot-middleware/client",
      "webpack/hot/only-dev-server",
      "react-hot-loader/patch",
      "./client/index.js"
    ],
    vendor: [
      "react",
      "react-dom",
      "react-redux",
      "react-router",
      "redux",
      "redux-thunk"
    ]
  },
  output: {
    path: __dirname,
    filename: "app.js",
    publicPath: "http://0.0.0.0:8000/"
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"],
    modules: ["client", "node_modules"]
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: "style-loader!css-loader!postcss-loader"
      },
      {
        test: /\.jsx*$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
      filename: "vendor.js"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        CLIENT: JSON.stringify(true),
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [
          cssnext({
            browsers: ["last 2 versions", "IE > 10"]
          })
        ]
      }
    })
  ]
};
