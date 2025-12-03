const {Worker} = require("worker_threads");
const worker = new Worker("./worker.js",{
    workerData: {
        name: "May",
        age: 22,
        score:{
            math: 8.6,
            english: 7.8,
            physics: 7.75,
            chemistry: 8.75,
            biology: 7.5,
            literature: 7.5
        }
    }
});
worker.on("message",(result)=>{
    console.log(result.message);
    console.log("Khoi A:", result.khoiA.toFixed(2));
    console.log("Khoi B:", result.khoiB.toFixed(2));
    console.log("Khoi A0:", result.khoiA0.toFixed(2));
    console.log("Khoi D:", result.khoiD.toFixed(2));
    worker.terminate();
});
worker.on("error",(err)=>{
    console.error("Lỗi:", err);
});
worker.on("exit",(code)=>{
    console.log("Worker exited with code:", code);
});
