const {parentPort} = require("worker_threads");

console.log("[worker] worker.js được load");

// Lắng nghe message gửi từ main thread xuống worker thread
parentPort.on("message",(n) => {
    console.log("[worker] Nhận message từ main, n =", n);
    const result = n*n;
    console.log("[worker] Tính xong n*n, result =", result);
    // Gửi kết quả từ worker thread trở lại main thread
    parentPort.postMessage(result);
    console.log("[worker] Đã gửi result về cho main");
});