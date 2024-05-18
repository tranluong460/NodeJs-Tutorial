const cluster = require("cluster");
const http = require("http");
const numOfCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);

  for (let i = 0; i < numOfCPUs; i++) {
    console.log(`Forking process number ${i}...`);
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const server = http.createServer((req, res) => {
    if (req.url === "/") {
      res.writeHead(200);
      res.end("Home page");
    } else if (req.url === "/slow-page") {
      for (let i = 0; i < 6000000000; i++) {}

      res.writeHead(200);
      res.end("Slow Page");
    }
  });

  server.listen(8080, () => console.log("Server is running on port 8000"));

  console.log(`Worker ${process.pid} started`);
}
