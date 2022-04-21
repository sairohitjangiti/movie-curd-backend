// console.log("max !!!!!!");
// console.log(process.argv);

// const [, , num] = process.argv;
// console.log("Input String:", num);
// string to array
// const nums = JSON.parse(num);
// console.log("Converted array:", nums);
// console.log(nums[2]);
// console.log("Max Number:", Math.max(...nums));


// os.js

const os=require("os")
console.log("OS version:",os.version())
console.log("Free Memory:",os.freemem())
console.log("Total Memory:",os.totalmem())
console.log("CPU:",os.cpus())
console.log("Uptime:",os.uptime())
console.log("Info:",os.userInfo([5]))
console.log("Type:",os.type());
console.log("Interface",os.networkInterfaces())
console.log("Constant:",os.constants)