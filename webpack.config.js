const path = require('path'),
      webpack = require('webpack'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin,
      autoprefixer = require('autoprefixer'),
      srcPath = path.join(__dirname, 'src'),
      distPath = path.join(__dirname, 'dist');

const METADATA = {
  title: 'Testing',
  baseUrl: '/'
};

module.exports = {
  metadata: METADATA,
  entry: {
    polyfill: ['es6-shim/es6-shim.js', 'angular2/bundles/angular2-polyfills'],
    vendor: path.join(srcPath, 'lib', 'vendor.ts'),
    main: ['webpack/hot/dev-server', 'webpack-hot-middleware/client', path.join(srcPath, 'app', 'main.ts')]
  },
  output: {
    path: distPath,
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['', '.ts', '.js'],
    root: srcPath,
    modulesDirectories: ['node_modules']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.scss$/,
        exclude: [path.resolve('src', 'app', 'components'), path.resolve('src', 'app', 'views')],
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
      },
      {
        test: /\.scss$/,
        include: [path.resolve('src', 'app', 'components'), path.resolve('src', 'app', 'views')],
        loaders: ['raw', 'postcss', 'sass']
      },
      {
        test: /\.html$/,
        loader: 'raw',
        exclude: [path.join(srcPath, 'index.html')]
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        loader: 'file?name=assets/fonts/[name].[ext]'
      },
      {
        test: /\.svg$/,
        loader: 'file?name=assets/images/[name].[ext]'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?name=assets/images/[name].[ext]&limit=8192'
      }
    ]
  },
  plugins: [
    new ForkCheckerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'app', 'index.html'),
      chunksSortMode: packageSort(['polyfill','vendor','main'])
    }),
    new CopyWebpackPlugin([{
      from: path.join(srcPath, 'assets', 'images'),
      to: 'assets/images'
    }])
  ],
  node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  postcss: [autoprefixer({ browsers: ['last 2 versions'] })]
};



function packageSort(packages) {
  // packages = ['polyfills', 'vendor', 'app']
  var len = packages.length - 1;
  var first = packages[0];
  var last = packages[len];
  return function sort(a, b) {
    // polyfills always first
    if (a.names[0] === first) {
      return -1;
    }
    // main always last
    if (a.names[0] === last) {
      return 1;
    }
    // vendor before app
    if (a.names[0] !== first && b.names[0] === last) {
      return -1;
    } else {
      return 1;
    }
  }
}
