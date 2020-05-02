"use strict";

const fs = require("fs");

var expr_linebreak = /\r\n|\r|\n/;

let r_path_1 = "../sources/";
let r_file_1 = "GB_coronavirus-deaths_latest_2020-05-01.csv";
let r_pathfile_1 = r_path_1 + r_file_1;
console.log("r_pathfile_1 : " + r_pathfile_1);

// ____ JSON EU_infos

let r_path_2 = "../../";
let r_file_2 = "EU-Reg_infos.json";
let r_pathfile_2 = r_path_2 + r_file_2;
console.log("r_pathfile_2 : " + r_pathfile_2);

var raw_data_2 = fs.readFileSync(r_pathfile_2);
var r_obj_2 = JSON.parse(raw_data_2);

// ____ Write

let w_path_1 = "../";
let w_file_1 = "GB-Reg_deaths-All_series" + ".csv";
let w_pathfile_1 = w_path_1 + w_file_1;
console.log("w_pathfile_1 : " + w_pathfile_1);

// ____ PRE

let date_length_st = 100;

var w_obj = {};

let reg_arr = [
  "United Kingdom",
  "Scotland",
  "Wales",
  "Northern Ireland",
  "England",
];

for (let i = 0; i < reg_arr.length; i++) {
  w_obj[reg_arr[i]] = new Array(date_length_st);
}

//____ date

let date_arr = new Array(date_length_st);
let date_off = 5;

for (let i = 1; i < 6; i++) {
  let date_new = "0" + i + "/03/20";
  date_arr[i] = date_new;
}

let date = "05/03/20";

let date_index = 5;

//____ read


var raw_data_1 = fs.readFileSync(r_pathfile_1);
let r_lines_1 = raw_data_1.toString().split(expr_linebreak);
console.log("r_lines_1 : " + r_lines_1.length);

// let date = "23/02/20";
let date_old = "";
// let date_index = -1;

// let IT_accum = 0;

// for (let i = r_lines_1.length; i >= 1; i--) {

for (let i = (r_lines_1.length - 1); i >= 2; i--) {
  let line_str = r_lines_1[i-1];
  let line_arr = line_str.split(",");
  console.log(i + " : " + line_arr);
  let date_new = dateConvertFromComp(line_arr[3]);
  let name = line_arr[0];
  let val = parseInt(line_arr[5]);

  if (date_new !== date) {
    // if (i > 1) {
    //   w_obj["Italy"][date_index] = IT_accum;
    //   // console.log(date_index + " : " + date);
    //   IT_accum = 0;
    // }
    date = date_new;
    date_index++;
    date_arr[date_index] = date;
    console.log(date_index + " : " + date);
  }

  w_obj[name][date_index - 1] = val;

}

// w_obj["Italy"][date_index] = IT_accum;

let w_data_1 = "ISO";
w_data_1 += date_arr.slice(0, date_index + 1);

for (let i = 0; i < reg_arr.length; i++) {
  let name = reg_arr[i];
  let ISO = r_obj_2[name].ISO;
  // console.log(ISO + " : " + ISO);
  let w_arr = w_obj[reg_arr[i]].slice(0, date_index + 0);
  console.log(name + " : " + w_arr);
  let w_line = ISO + "," + w_arr.toString();
  // let w_line = name + "," + w_arr.toString();
  w_data_1 += "\n" + w_line;
}

fs.writeFileSync(w_pathfile_1, w_data_1);

console.log("___ end");

function dateConvertFromComp(de) {
  let date_arr_2 = de.split("-");
  let date_str = date_arr_2[2] + "/" + date_arr_2[1] + "/20";
  return date_str;
}

function dateConvert(de) {
  let date_arr_1 = de.split("T");
  let date_arr_2 = date_arr_[0].split("-");
  let date_str = date_arr_2[2] + "/" + date_arr_2[1] + "/20";
  return date_str;
}
