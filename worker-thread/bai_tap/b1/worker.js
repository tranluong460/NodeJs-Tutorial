const {parentPort} = require("worker_threads");
parentPort.on("message",(n) => {
    const result = n*n;
    parentPort.postMessage(result);
})