const express = require('express'),
  app = express(),
  port = process.env.port || 8080,
  http = require("http"),
  webpackconfig = require("./webpack.config"),
  webpack = require("webpack"),
  webpackMiddleware = require("webpack-dev-middleware"),
  webpackHotMiddleware = require('webpack-hot-middleware'),
  history = require('connect-history-api-fallback'),
  compiler = webpack(webpackconfig);

// var config = require('./server/config');
//
// app.locals = {
//     title: config.get('appTitle'),
// };

app.use(history({
}));

app.use(webpackHotMiddleware(compiler,{
  log: console.log
}));

app.use(webpackMiddleware(compiler ,{
  stats: {
    colors: true
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  hot: true
}));

var server = app.listen(port, function () {
  var host = server.address().address;

  console.log('Angular2Starter listening at http://%s:%s', host, port);
});
