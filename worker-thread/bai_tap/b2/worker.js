const {parentPort} = require("worker_threads");

console.log("[worker] worker.js được load");

parentPort.on("message",({start, end, data})=>{
    console.log(`[worker] Nhận việc: start=${start}, end=${end}`);
    let sum = 0;
    for(let i = start; i < end; i++){
        sum += data[i];
    }
    console.log(`[worker] Tính xong, partial sum = ${sum}`);
    parentPort.postMessage(sum);
    console.log("[worker] Đã gửi partial sum về main");
});