const fs = require('fs');
const readStream = fs.createReadStream("./Questions.txt", "UTF-8");
const readline = require('readline');
const writeStream = fs.createWriteStream("jsonQ.json", "utf-8");
const pathName = writeStream.path;

// Intitializing the readFileLines with the file
const readFileLines = filename =>
   fs.readFileSync(filename)
   .toString('UTF8')
   .split('\n');

// Calling the readFiles function with file name
let arr = readFileLines('Questions.txt');

// Printing the response array
console.log(arr);
let qtype = arr[0].slice(5)
console.log(qtype)
//arr.split('"').join("'")
writeStream.write('[')
for(let i = 1 ; i < arr.length; i++){
  if(arr[i].slice(0,5) === 'Type:'){
    qtype = arr[i].slice(5)
    continue;
  }
  writeStream.write(`{"question":"${arr[i].split('"').join("'")}", "qtype":"${qtype}", "qsource": "Leon#100Devs"},\n`)
}
writeStream.write(']')
//arr.forEach(value => value.includes('Type:') writeStream.write(`{"question":"${value}"}\n`));

// the finish event is emitted when all data has been flushed from the stream
writeStream.on('finish', () => {
   console.log(`wrote all the array data to file ${pathName}`);
});

// handle the errors on the write process
writeStream.on('error', (err) => {
    console.error(`There is an error writing the file ${pathName} => ${err}`)
});

// close the stream
writeStream.end();
