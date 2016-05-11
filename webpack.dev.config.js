const webpack = require('webpack'),
      path = require('path');

var config = require('./webpack.config');

config.entry.main = ['webpack/hot/dev-server', 'webpack-hot-middleware/client', path.join(__dirname, 'src', 'app', 'main.ts')];
config.plugins.push(new webpack.HotModuleReplacementPlugin())

module.exports = config;
