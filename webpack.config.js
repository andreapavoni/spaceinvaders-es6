var ExtractText = require("extract-text-webpack-plugin");
var webpack = require("webpack");
var path = require("path");
const glob = require('glob');

var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: false, //(!isProduction && 'source-map'),
  entry: {
    app:   [
      path.resolve(__dirname, './css/style.css'),
      path.resolve(__dirname, './js/app.js'),
    ]
  },
  stats: {
    assets: true,
    hash: false,
    version: true,
    chunks: false,
    modules: false,
    children: false,
    source: false,
    timings: false
  },
  output: {
    path: path.resolve(__dirname, "./assets"),
    filename: "js/[name].js"
  },
  resolve: {
    extensions: ['.js', '.vue'],
    modules: [
      path.resolve(__dirname, './js'),
      path.resolve(__dirname, './node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: __dirname,
        loader: "babel-loader"
      },
      {
        test: /\.(css)$/,
        include: __dirname,
        loader: ExtractText.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' }
          ]
        }),
      }
    ]
  },
  plugins: [
    new ExtractText({filename: 'css/[name].css'})
  ]
};

if (isProduction) {
  module.exports.devtool = false
  module.exports.plugins = module.exports.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: { warnings: false }
    })
  ])
}
