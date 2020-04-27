"use strict";

const fs = require("fs");

let date_sel = "2020-04-24";
// gives us 50 countries
// let slim_over = 42;

let r_path_1 = "../../";
let r_file_1 = "EU_infos.json";
let r_pathfile_1 = r_path_1 + r_file_1;
console.log("r_pathfile_1 : " + r_pathfile_1);

let r_path_2 = "../../../World/";
let r_file_2 = "Countries_deaths_series.csv";
let r_pathfile_2 = r_path_2 + r_file_2;
console.log("r_pathfile_2 : " + r_pathfile_2);

let r_path_3 = "../Countries-Reg/";
let r_ext_3 = "_ISO_deathPer_2020-04-24.csv";
let r_pathfile_3 = r_path_3 + r_ext_3;
console.log("r_pathfile_3 : " + r_pathfile_3);
let r_files_3 = ["ES", "IT", "FR"];

let w_path_1 = "../";
let w_file_1 = "EU_Reg-SIF_deathsPer_" + date_sel + ".csv";
let w_pathfile_1 = w_path_1 + w_file_1;
console.log("w_pathfile_1 : " + w_pathfile_1);

let val_length_actual = 0;

// headers

let w_data_1;
w_data_1 = "ISO,value";

// ____ JSON EU_infos
var raw_data_1 = fs.readFileSync(r_pathfile_1);
var r_obj_1 = JSON.parse(raw_data_1);

// ____ world to Obj
var r_obj_2 = {};

var raw_data_2 = fs.readFileSync(r_pathfile_2);
let r_lines_2 = raw_data_2.toString().split("\n");

let r_line_0_arr = r_lines_2[0].split(",");
let name_0 = r_line_0_arr.shift();
r_obj_2.dates = r_line_0_arr;
// console.log("dates : " + r_line_0_arr);

for (let i = 1; i < r_lines_2.length; i++) {
  let line_arr = r_lines_2[i].split(",");
  let name = line_arr.shift();
  // console.log("name : " + name);
  r_obj_2[name] = line_arr;
}

// ____ EU-World

let date_index = r_line_0_arr.length - 1;
console.log("date_index : " + date_index);

for (var key in r_obj_1) {
  let r_k_obj = r_obj_1[key];
  // console.log("key : " + key);

  let w_val = 0;
  if (r_obj_2[key]) {
    let c_obj = r_obj_2[key];
    // console.log("c_obj : " + c_obj);
    let pop = r_k_obj.population
    let deaths = c_obj[date_index]
    w_val = Math.round(deaths/pop*100000, 0);

    // w_val = c_obj[date_index];
  }

  let w_line = r_k_obj.ISO + "," + w_val;
  console.log("w_line : " + w_line);
  w_data_1 += "\n" + w_line;
  // w_data_1 += "\n" + r_k_obj.ISO + "," + w_val.toString();
}

// ____ EU_Countries-Reg

for (let i = 0; i < r_files_3.length; i++) {
  r_pathfile_3 = r_path_3 + r_files_3[i] + r_ext_3;
  console.log("r_pathfile_3 : " + r_pathfile_3);

  var raw_data = fs.readFileSync(r_pathfile_3);
  let lines = raw_data.toString().split("\n");

  for (let j = 1; j < lines.length; j++) {
    w_data_1 += "\n" + lines[j];
    console.log("w_data_1 : " + w_data_1);
  }
}

fs.writeFileSync(w_pathfile_1, w_data_1);
