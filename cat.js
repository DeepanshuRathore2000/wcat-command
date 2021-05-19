#!/usr/bin/env node

// let fs=require('fs')    //fs=file system             // inbuilt method in js

// let str = fs.readFileSync("f.txt").toString()
let fs = require("fs");
(function () {
  let cmd = process.argv.slice(2);                // process.argv is inbuilt funcn in node which let us write while writing run command
                                                                  

  let options = [];
  let files = [];
  let str = ``;
  for (let i = 0; i < cmd.length; i++) {
    if (cmd[i].startsWith("-")) {                               // startsWith returns true or false
      options.push(cmd[i]);
    } else {
      files.push(cmd[i]);
    }
  }
  for (let j = 0; j < files.length; j++) {
    if (fs.existsSync(files[j])) {                            //existsSync -> to check if file exists
      str += fs.readFileSync(files[j]).toString();            //readFileSync -> to read files
    } else {
      console.log("invalid file");
      return;      // if our code comes to this return then it will stop and not go further to overcome this we made use of IIFE funcn.
    }
  }

  str = str.split("\n");
  if (options.includes("-s")) {
    console.log(str);
    str = removeLargeSpaces(str);
    console.log(str);
  }
  if(options.includes("-n")&& options.includes("-b")){
    if(options.indexOf("-n")>options.indexOf("-b")){
      //use -b
      str = addNonEmptyNum(str);
    }else{
      //use -n
      str = addAllNum(str);
    }

  }
  else{
    //either one is present or none is present
    if(options.includes("-b")){
      //use -b
      str = addNonEmptyNum(str);  
    }
    if(options.includes("-n")){
      //use -n
      str =addAllNum(str);
    }
  }
  str = str.join("\n");

  console.log(str);
})();
// console.log(options);
// console.log(files);
function removeLargeSpaces(arr) {
  let y = [];
  let flag = false;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "" || arr[i] == "\r") {
      if (flag === true) {
        continue;
      } else {
        y.push(arr[i]);
        flag = true;
      }
    }
    else {
      y.push(arr[i]);
      flag = false;
    }
  }
  return y;
}

// -n
function addAllNum(arr){
  for(let i=1;i<=arr.length;i++)
  {
    arr[i-1] = i+" "+ arr[i-1];
  }
  return arr;
}

// -b
function addNonEmptyNum(arr){
  let lineNumber = 1;
  for(let i=0;i<arr.length;i++){
    if(arr[i]!=="" && arr[i]!=="\r"){
      arr[i] = lineNumber + " " +arr[i];
      lineNumber++;
    }
  }
  return arr;
}