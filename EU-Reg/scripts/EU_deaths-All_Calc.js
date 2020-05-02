"use strict";

const fs = require("fs");

// let date_sel = "2020-04-25";
// gives us 50 countries
let index_start = 28;

let r_path_1 = "../../World/World_series/";
let r_file_1 = "World-All_deaths_series.csv";
let r_pathfile_1 = r_path_1 + r_file_1;
console.log("r_pathfile_1 : " + r_pathfile_1);

// ____ JSON EU_infos

let r_path_2 = "../Units_infos/";
let r_file_2 = "EU_infos.json";
let r_pathfile_2 = r_path_2 + r_file_2;
console.log("r_pathfile_2 : " + r_pathfile_2);

var raw_data_2 = fs.readFileSync(r_pathfile_2);
var r_obj_2 = JSON.parse(raw_data_2);

// ____ Write

let w_path_1 = "../";
let w_file_1 = "EU_deaths-All_series" + ".csv";
let w_pathfile_1 = w_path_1 + w_file_1;
console.log("w_pathfile_1 : " + w_pathfile_1);

let val_length_actual = 0;

//____ World

var raw_data_1 = fs.readFileSync(r_pathfile_1);
let r_lines_1 = raw_data_1.toString().split("\n");
console.log("r_lines_1 : " + r_lines_1.length);

let dates_arr = r_lines_1[0].split(",");;
let name = dates_arr.shift();
let dates_arr_cut = dates_arr.slice(index_start);

let w_data_1 = "ISO,";
// let w_data_1 = "name,";
w_data_1 += dates_arr_cut.toString();

var r_obj_1 = {};

// r_obj_1.dates = dates_arr;

for (let i = 1; i < r_lines_1.length; i++) {
  let line_arr = r_lines_1[i].split(",");
  let name = line_arr.shift();
  // console.log("name : " + name);
  r_obj_1[name] = line_arr;
}

// ____ JSON EU_infos

var raw_data_2 = fs.readFileSync(r_pathfile_2);
var r_obj_2 = JSON.parse(raw_data_2);

// ____ EU-World

// let date_index = r_line_0_arr.length - 1;
// console.log("date_index : " + date_index);

for (var key in r_obj_2) {
  let r_k_obj = r_obj_2[key];
  let ISO = r_k_obj.ISO;
  let name = r_k_obj.name;
  // console.log("ISO : " + ISO);
  console.log("name : " + name);

  if (r_obj_1[key]) {
    let vals_arr = r_obj_1[key].slice(index_start);
    // let w_line = name + "," + vals_arr.toString();
    let w_line = ISO + "," + vals_arr.toString();
    // console.log(w_line);
    w_data_1 += "\n" + w_line;

    // if (r_obj_2[key]) {
  }
}

fs.writeFileSync(w_pathfile_1, w_data_1);

console.log("___ end");
