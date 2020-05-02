"use strict";

const fs = require("fs");

var expr_linebreak = /\r\n|\r|\n/;

// ____ Write

let w_path_1 = "../";
let w_file_1 = "GB-Reg_deaths-hosp_series" + ".csv";
let w_pathfile_1 = w_path_1 + w_file_1;
console.log("w_pathfile_1 : " + w_pathfile_1);

// ____ ALL

let r_path_1 = "../";
let r_file_1 = "GB-Reg_deaths-All_series.csv";
let r_pathfile_1 = r_path_1 + r_file_1;
console.log("r_pathfile_1 : " + r_pathfile_1);

// ____ ENG-hosp

let r_path_2 = "../";
let r_file_2 = "GB-ENG-Reg_deaths-hosp_series.csv";
let r_pathfile_2 = r_path_2 + r_file_2;
console.log("r_pathfile_2 : " + r_pathfile_2);

// ____ PRE

// let date_length_st = 100;

var w_obj = {};

//____ 1

var raw_data_1 = fs.readFileSync(r_pathfile_1);
let r_lines_1 = raw_data_1.toString().split(expr_linebreak);
console.log("r_lines_1 : " + r_lines_1.length);

let date_arr = r_lines_1[0].split(",");
let date_name = date_arr.shift();
// date_arr.pop();
let date_length = date_arr.length;
console.log(date_length + " : " + date_arr);

for (let i = 1; i < r_lines_1.length; i++) {
  let line_str = r_lines_1[i];
  let line_arr = line_str.split(",");
  // console.log(i + " : " + line_arr);
  let ISO = line_arr.shift();
  // line_arr.pop();
  w_obj[ISO] = line_arr;
  console.log(ISO + " : " + line_arr);
}

//____ 2

var raw_data_2 = fs.readFileSync(r_pathfile_2);
let r_lines_2 = raw_data_2.toString().split(expr_linebreak);
console.log("r_lines_2 : " + r_lines_2.length);

for (let i = 1; i < r_lines_2.length; i++) {
  let line_str = r_lines_2[i];
  let line_arr = line_str.split(",");
  // console.log(i + " : " + line_arr);
  let ISO = line_arr.shift();
  w_obj[ISO] = line_arr;
  console.log(ISO + " : " + line_arr);
}

//____ GB_recalc

let reg_sum_list = ["GB-SCT", "GB-WLS", "GB-NIR", "GB-ENG"];

for (let i = 0; i < date_arr.length; i++) {
  let sum = 0;
  for (let j = 0; j < reg_sum_list.length; j++) {
    let val = w_obj[reg_sum_list[j]][i];
    if (val) {
      sum += parseInt(val);
    }
  }
  w_obj["GB"][i] = sum;
  // console.log(ISO + " : " + line_arr);
}

//____ Write

let w_data_1 = "ISO,";
w_data_1 += date_arr.toString();

for (var ISO in w_obj) {
  let w_line = ISO + "," + w_obj[ISO].toString();
  w_data_1 += "\n" + w_line;
}

fs.writeFileSync(w_pathfile_1, w_data_1);

console.log("___ end");
