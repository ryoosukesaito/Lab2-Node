const http = require("http");
const fs = require("fs");

const server = http.createServer();

server.on(function (req, res) {
  // console.log(req);
  // res.write("Hello World!!!");
  // res.end();

  if(req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title> Home Page </title></head>')
    res.write('<body><h1></h1></body>')
  }
  if(req.url === '/read-message') {

  }
  if(req.url === '/write-message') {

  }
});

server.listen(8000);
