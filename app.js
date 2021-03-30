const http = require('http');

const requestListener = function (req, res) {
  res.end('Test');
  console.log("Test")
}

const server = http.createServer(requestListener);
server.listen(8080);