// DEV::wepack.config

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './src/index.js'
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.ico'
    })
  ],
  module: {
    loaders: [{
      exclude: /node_modules/,
      test: /\.jsx?$/,
      loader: 'babel'
    }, {
      test: /\.(png|jpg|ico)$/,
      loader: 'url-loader'
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass'
    }]
  },

  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    hot: true
  }
};
