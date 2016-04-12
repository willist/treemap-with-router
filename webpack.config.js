'use strict';

module.exports = {
  entry: './src/index.js',
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }]
  },
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
    publicPath: '/in-memory'
  },
  devServer: {
    historyApiFallback: true
  },
  devtool: 'inline-source-map'
};
