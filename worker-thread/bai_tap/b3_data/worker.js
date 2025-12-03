const {workerData, parentPort} = require("worker_threads");

console.log("[worker] worker.js được load");

const {name, age, score} = workerData;
const year = new Date().getFullYear() - age;
const khoiA = (score.math + score.physics + score.chemistry);
const khoiB = (score.math + score.biology + score.chemistry);
const khoiA0 = (score.math + score.english + score.physics);
const khoiD = (score.math + score.english + score.literature);

// Gửi tất cả kết quả về main thread
parentPort.postMessage({
    message: `Hello ${name}, bạn sinh năm ${year} và có điểm các khối như sau:`,
    khoiA: khoiA,
    khoiB: khoiB,
    khoiA0: khoiA0,
    khoiD: khoiD
});

console.log("[worker] Đã gửi kết quả về main");