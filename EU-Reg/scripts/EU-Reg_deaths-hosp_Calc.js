"use strict";

const fs = require("fs");

// let index_start = 28;
var expr_linebreak = /\r\n|\r|\n/;

let r_path_1 = "../";
let r_file_1 = "EU_deaths-All_series.csv";
let r_pathfile_1 = r_path_1 + r_file_1;
console.log("r_pathfile_1 : " + r_pathfile_1);

// ____ JSON EU_infos

let r_path_2 = "../";
let r_file_2 = "EU-Reg_infos_ISO.json";
let r_pathfile_2 = r_path_2 + r_file_2;
console.log("r_pathfile_2 : " + r_pathfile_2);

var raw_data_2 = fs.readFileSync(r_pathfile_2);
var r_obj_2 = JSON.parse(raw_data_2);

// ____ Write

let w_path_1 = "../";
let w_file_1 = "EU-Reg_deaths-hosp_series" + ".csv";
let w_pathfile_1 = w_path_1 + w_file_1;
console.log("w_pathfile_1 : " + w_pathfile_1);

let val_length_actual = 0;

//____ EU

var raw_data_1 = fs.readFileSync(r_pathfile_1);
let r_lines_1 = raw_data_1.toString().split(expr_linebreak);
console.log("r_lines_1 : " + r_lines_1.length);

let dates_arr = r_lines_1[0].split(",");
let header_name = dates_arr.shift();
// let dates_arr_cut = dates_arr.slice(index_start);
let dates_length = dates_arr.length;

let w_data_1 = header_name + ",";
// let w_data_1 = "name,";
// w_data_1 += dates_arr_cut.toString();
w_data_1 += dates_arr.toString();

var w_obj_1 = {};

// r_obj_1.dates = dates_arr;

for (let i = 1; i < r_lines_1.length; i++) {
  let line_arr = r_lines_1[i].split(",");
  let name = line_arr.shift();
  // console.log("name : " + name);
  w_obj_1[name] = line_arr;
}

// ____ Reg full

let files_3_arr = ["ES", "FR", "IT"];

let r_path_3 = "../Units_series/";
let r_ext_3 = "-Reg_deaths-hosp_series.csv";
let r_pathfile_3 = r_path_3 + r_ext_3;

for (let i = 0; i < files_3_arr.length; i++) {
  r_pathfile_3 = r_path_3 + files_3_arr[i] + r_ext_3;
  var raw_data_3 = fs.readFileSync(r_pathfile_3);
  let r_lines_3 = raw_data_3.toString().split(expr_linebreak);
  console.log("r_lines_3 : " + r_lines_3.length);

  for (let j = 1; j < r_lines_3.length; j++) {
    let line_arr = r_lines_3[j].split(",");
    let name = line_arr.shift();
    console.log("name : " + name);
    w_obj_1[name] = line_arr;
  }
}

// ____ Reg part

// let files_4_arr = ["BE"];
let files_4_arr = ["BE", "GB", "DE"];

let r_path_4 = "../Units_series/";
let r_ext_4 = "-Reg_deaths-hosp_series.csv";
let r_pathfile_4 = r_path_4 + r_ext_4;

for (let i = 0; i < files_4_arr.length; i++) {
  r_pathfile_4 = r_path_4 + files_4_arr[i] + r_ext_4;
  var raw_data_4 = fs.readFileSync(r_pathfile_4);
  let r_lines_4 = raw_data_4.toString().split(expr_linebreak);
  console.log("r_lines_4 : " + r_lines_4.length);

  // let headers_4 = r_lines_4[0];
  let dates_4_arr = r_lines_4[0].split(",");
  let headers_4_name = dates_4_arr.shift();
  let date_start_4 = dates_4_arr[0];
  // let date_start_4 = r_lines_4[0][1];
  // console.log("date_start_4 : " + date_start_4);

  let date_index = dates_arr.indexOf(date_start_4);
  // console.log("date_index : " + date_index);

  for (let j = 1; j < r_lines_4.length; j++) {
    let line_arr = r_lines_4[j].split(",");
    let name = line_arr.shift();
    // console.log("name : " + name);
    if (!w_obj_1[name]) {
      // console.log("create : " + name);
      w_obj_1[name] = new Array(dates_length);
    }
    for (let k = 0; k < dates_4_arr.length; k++) {
      let val = line_arr[k];
      let index = k + date_index;
      w_obj_1[name][index] = val;
    }
    // w_obj_1[name] = line_arr;
  }
}

// ____ to csv

// let date_index = r_line_0_arr.length - 1;
// console.log("date_index : " + date_index);

for (var key in w_obj_1) {
  let r_k_obj = r_obj_2[key];
  let ISO = r_k_obj.ISO;
  let name = r_k_obj.name;
  // console.log("ISO : " + ISO);
  // console.log("name : " + name);

  if (w_obj_1[key]) {
    let vals_arr = w_obj_1[key];
    // let vals_arr = r_obj_1[key].slice(index_start);
    // let w_line = name + "," + vals_arr.toString();
    let w_line = ISO + "," + vals_arr.toString();
    // console.log(w_line);
    w_data_1 += "\n" + w_line;

    // if (r_obj_2[key]) {
  }
}

// for (var key in r_obj_2) {
//   let r_k_obj = r_obj_2[key];
//   let ISO = r_k_obj.ISO;
//   let name = r_k_obj.name;
//   // console.log("ISO : " + ISO);
//   console.log("name : " + name);

//   if (r_obj_1[key]) {
//     let vals_arr = r_obj_1[key].slice(index_start);
//     // let w_line = name + "," + vals_arr.toString();
//     let w_line = ISO + "," + vals_arr.toString();
//     // console.log(w_line);
//     w_data_1 += "\n" + w_line;

//     // if (r_obj_2[key]) {
//   }
// }

fs.writeFileSync(w_pathfile_1, w_data_1);

console.log("___ end");
