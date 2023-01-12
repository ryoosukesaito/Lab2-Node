const http = require("http");
const fs = require("fs");

const server = http.createServer();

server.on('request', (req, res) => {
  // console.log(req);
  // res.write("Hello World!!!");
  // res.end();

  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title> Home Page </title></head>");
    res.write(`<body>
    <h1>Hello Node!!</h1>
    <ul>
      <li><a href="./write-message">write-message</a>
      </li>
      <li><a href="./read-message">read-message</a></li>
    </ul>
  </body>`);
    res.write("</html>");
    res.end();
  }

  if (req.url === '/write-message' && req.method === 'GET') {
    res.write('<html>');
    res.write('<head><title> Write Message </title></head>');
    res.write(`
      <body>
        <h1>Write Your Message</h1>
          <form method="POST" action="write-message">
            <input type="text" name="message" placeholder="Enter your message">
            <button type="submit">Submit</button>
          </form>
            </br>
          <a href="../">Back to Home</a>
      </body>
      `);
    res.write('</html>');
    return res.end();
  }

  if(req.url === '/write-message' && req.method === 'POST'){
    const body = [];

    req.on('data', (chunk) => {
      console.log(`chunk: ${chunk}`);
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      // console.log(parsedBody);

      const message = parsedBody.split('=')[1];
      // console.log(message);

      fs.writeFile('./asset/text.txt', message, (err) => {
        if (err) throw err;
        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();
      });
    });

  }


  if (req.url === "/read-message") {
    fs.readFile('./asset/text.txt', 'utf-8', (err, data) => {
      if(err) {
        console.log(err);
        res.end(err);
      }else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        // data.split('+').join(`\/s/g`);
        // data.replace("+",' ');
        res.end(data, 'utf-8');
      }
      console.log(data);
    });
  }
});

server.listen(8000);