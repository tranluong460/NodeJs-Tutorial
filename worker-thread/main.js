const {
  Worker,
  workerData,
  isMainThread,
  parentPort,
} = require("node:worker_threads");

if (isMainThread) {
  const worker = new Worker(__filename, { workerData: 20 });

  worker.on("message", (msg) => console.log(`Fibonacci: ${msg}`));

  worker.on("error", (err) => console.error(err));

  worker.on("exit", (code) => console.error(code));
} else {
  const fibonacci = (n) => {
    var i;
    var fib = [];

    fib[0] = 0;
    fib[1] = 1;
    for (i = 2; i <= n; i++) {
      fib[i] = fib[i - 2] + fib[i - 1];
    }

    parentPort.postMessage(fib);
  };

  fibonacci(workerData);
}
