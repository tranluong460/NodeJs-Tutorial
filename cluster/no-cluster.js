const http = require("node:http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200);
    res.end("Home");
  } else if (req.url === "/slow") {
    for (let i = 0; i < 6000000000; i++) {}

    res.writeHead(200);
    res.end("Slow");
  }
});

server.listen(8080, () => console.log("Server running on port " + 8080));
