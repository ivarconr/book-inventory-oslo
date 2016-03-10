var http = require('http');

var server = http.createServer(function(req, res) {
  res.end('hello world');
});

server.listen(3000, function() {
  console.log('listen on http://localhost:3000');
});
