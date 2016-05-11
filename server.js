const express = require('express'),
  path = require('path'),
  morgan = require('morgan'),
  app = express(),
  port = process.env.PORT || 8080,
  http = require("http"),
  history = require('connect-history-api-fallback');

app.use(history({
  rewrites: [
    { from: /\/widget\//, to: '/widget/index.html'}
  ]
}));

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'dist')));

var server = app.listen(port, function () {
  var host = server.address().address;

  console.log('Hall of boids server listening at http://%s:%s', host, port);
});
