const {Worker} = require("worker_threads");
const worker = new Worker("./worker.js");

const n = 8;
worker.postMessage(n);

worker.on("message",(result)=>{
    console.log(`${n} * ${n} = ${result}`);
    worker.terminate();
});

worker.on("error",(err) => {
    console.error("Error: ",err);
});

worker.on("exit",(code) => {
    if(code !==0){
        console.error(`Worker stopped with ${code}`);
    }
});