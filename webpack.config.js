const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// webpack production configuration
var config = {
  entry: [path.resolve(__dirname, 'client')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'shared'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {plugins: []}
    }, {
      test: /\.(s)?css$/,
      loader: ExtractTextPlugin.extract("style", "css!postcss!sass")
    }, {
      test: /\.(jpg|jpeg|gif|png|ico)$/,
      exclude: /node_modules/,
      loader: 'file?name=media/[name].[ext]'
    }, {
      test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file?name=fonts/[name].[ext]"
    }]
  },
  postcss: [
    require('autoprefixer')({ browsers: ['last 2 versions'] })
  ],
  plugins: [
    new ExtractTextPlugin("screen.css"),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV ? process.env.NODE_ENV : 'dev'),
        BROWSER: JSON.stringify(true)
      }
    })
  ]
};

module.exports = config;
