const express = require('express'),
  app = express(),
  port = process.env.port || 8080,
  http = require("http"),
  webpackconfig = require("./webpack.dev.config"),
  webpack = require("webpack"),
  webpackMiddleware = require("webpack-dev-middleware"),
  webpackHotMiddleware = require('webpack-hot-middleware'),
  history = require('connect-history-api-fallback'),
  compiler = webpack(webpackconfig);

app.use(history({
  rewrites: [
    { from: /\/widget\//, to: '/widget/index.html'}
  ]
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

  console.log('Hall of boids server listening at http://%s:%s', host, port);
});
