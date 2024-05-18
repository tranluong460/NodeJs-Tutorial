const http = require("node:http");
const { Worker } = require("node:worker_threads");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200);
    res.end("Home page");
  } else if (req.url === "/slow-page") {
    const worker = new Worker("./worker-thread.js");

    worker.on("message", (j) => {
      res.writeHead(200);
      res.end(`Slow Page ${j}`);
    });

    worker.on("error", (err) => {
      console.log(err);
    });
  }
});

server.listen(8080, () => console.log("Server is running on port 8080"));
