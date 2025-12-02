import { add, mul } from "./index.js";

console.log("1+2=",add(1,2));
console.log("1+2=",add("1","2"));
console.log("1+2+3+4+5=",add(1,2,3,4,5));
console.log("-1+2=",add(-1,2));
console.log("3*4=",mul(3,4));
console.log("-3*4=",mul(-3,4));
console.log("-3*-4=",mul(-3,-4));
console.log("3*4=",mul("3","4"));