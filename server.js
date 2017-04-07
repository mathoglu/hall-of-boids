require('dotenv').config();
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

console.log("Process env:");
console.log(process.env);
const ipWhitelist = process.env.whitelist.split(',').filter(function (s) { return !(s || s.length === 0) });
console.log("Whitelist:");
console.log(ipWhitelist);

app.use(function (req, res, next) {
  if (process.env.whitelist) {
    const requestIp = req.ip.split(':').pop();
    console.log(requestIp);
    if (ipWhitelist.includes(requestIp)) {
      next();
    }
    else {
      console.error('Request received from ' + requestIp + ' which is not on whitelist: ' + ipWhitelist.toString());
    }
  }
  else {
    next();
  }
});

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public', 'scripts')));

var server = app.listen(port, function () {
  var host = server.address().address;

  console.log('Hall of boids server listening at http://%s:%s', host, port);
});
