const {Worker} = require("worker_threads");
const k = parseInt(process.argv[2]);

if(isNaN(k) || k<=0){
    console.error("Vui lòng nhập k hợp lệ. Ví dụ:");
    console.error("node main.js 4");
    process.exit(1);
}

const n = 10000;
const arr = Array.from({length: n}, ()=>Math.random()*n);
const chunkSize = Math.ceil(n/k);
const workers = [];
let complete = 0;
let sum = 0;

console.log(`[main] Tính trung bình của mảng ${n} phần tử`);
console.log(`[main] Chia thành ${k} phần, tạo ${k} workers (mỗi worker cách nhau 5s)...\n`);

// Helper delay 5s
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
    for(let i = 0; i < k; i++){
        if (i > 0) {
            console.log(`[main] Chờ 5s trước khi tạo worker ${i}...`);
            await delay(5000);
        }

        const worker = new Worker("./worker.js");
        console.log(`[main] Đã tạo worker ${i}`);

        workers.push(worker);

        worker.postMessage({
            start: i*chunkSize,
            end: Math.min((i+1)*chunkSize, n),
            data: arr
        });

        worker.on("message",(result)=>{
            complete++;
            sum += result;
            console.log(`[main] Nhận kết quả từ worker ${i}, partial sum = ${result}, complete = ${complete}/${k}`);

            if(complete === k){
                const average = sum/n;
                console.log(`[main] Tổng sum = ${sum}`);
                console.log(`[main] Trung bình của mảng là: ${average}`);
                workers.forEach(w=>w.terminate());
            }
        });

        worker.on("error",(err)=>{
            console.error(`[main] Worker ${i} error: `,err);
        });

        worker.on("exit",(code)=>{
            console.log(`[main] Worker ${i} exit với code =`, code);
            if(code !==0){
                console.error(`[main] Worker ${i} stopped với code ${code}`);
            }
        });
    }
})().catch((err) => {
    console.error("[main] Lỗi trong vòng lặp tạo worker:", err);
});