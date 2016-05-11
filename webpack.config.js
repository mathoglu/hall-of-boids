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

const RawStylePaths = [
  path.resolve('src', 'app', 'components'),
  path.resolve('src', 'app', 'views'),
  path.resolve('src', 'widget', 'views'),
  path.resolve('src', 'widget', 'components')
];

module.exports = {
  metadata: METADATA,
  entry: {
    polyfill: ['es6-shim/es6-shim.js', 'angular2/bundles/angular2-polyfills'],
    vendor: path.join(srcPath, 'lib', 'vendor.ts'),
    main: path.join(srcPath, 'app', 'main.ts'),
    widget: path.join(srcPath, 'widget', 'main.ts')
  },
  output: {
    path: distPath,
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['', '.ts', '.js'],
    root: srcPath,
    modulesDirectories: ['node_modules'],
    alias: {
      'app-config': path.join(__dirname, 'config.js')
    }
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
        exclude: RawStylePaths,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
      },
      {
        test: /\.scss$/,
        include: RawStylePaths,
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
    new webpack.optimize.OccurenceOrderPlugin(true),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'app', 'index.html'),
      excludeChunks: ['widget'],
      chunksSortMode: packageSort(['polyfill','vendor','main'])
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'widget', 'index.html'),
      excludeChunks: ['main'],
      chunksSortMode: packageSort(['polyfill','vendor','widget']),
      filename: 'widget/index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(srcPath, 'assets', 'images'),
        to: 'assets/images'
      },
      {
        from: path.join(srcPath, 'assets', 'favicon.ico'),
        to: 'assets'
      }
    ])
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
