/**
 * 
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
function add(a,b){
    return a+b;
}

/**
 * 
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
const mul = (a,b) => a*b

/**
 * 
 * @param {number[]} numbers 
 * @returns {number}
 * @throws {Error} 
 */
function mean(numbers){
    if(!Array.isArray(numbers)){
        throw new Error("numbers must be an array")
    }
    if(numbers.length===0){
        throw new Error("numbers array cannot be empty")
    }
    const sum = numbers.reduce((acc,num)=>acc+num,0)
    return sum/numbers.length;
}

module.exports = { add, mul, mean };