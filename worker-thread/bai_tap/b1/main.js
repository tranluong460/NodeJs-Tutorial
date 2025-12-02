const {Worker} = require("worker_threads");

console.log("[main] Bắt đầu main.js");

// Tạo worker mới chạy file worker.js
const worker = new Worker("./worker.js");
console.log("[main] Đã tạo worker ./worker.js");

const n = 8;

console.log("[main] Chuẩn bị gửi n sang worker:", n);
// Gửi message (dữ liệu n) từ main thread sang worker thread
worker.postMessage(n);

// Lắng nghe message (kết quả) do worker gửi về cho main thread
worker.on("message",(result)=>{
    console.log("[main] Nhận message từ worker, result =", result);
    console.log(`${n} * ${n} = ${result}`);
    console.log("[main] Gọi worker.terminate()");
    worker.terminate();
});

// Lắng nghe sự kiện lỗi từ worker thread
worker.on("error",(err) => {
    console.error("[main] Worker error: ",err);
});

// Lắng nghe sự kiện worker kết thúc (exit) và kiểm tra mã thoát
worker.on("exit",(code) => {
    console.log("[main] Worker exit với code =", code);
    if(code !==0){
        console.error(`Worker stopped with ${code}`);
    }
});