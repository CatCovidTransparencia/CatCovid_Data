"use strict";

const fs = require("fs");

var expr_linebreak = /\r\n|\r|\n/;

let w_date = "2020-04-27";
let date_EU = "2020-04-27";
let date_Reg = "27/04/20";

let files_name_arr = ["BE", "ES", "IT", "FR", "GB", "DE"];

let r_file_1 = "EU_deaths_series.csv";
// let r_file_1 = "EU_deaths-hosp_series.csv";
let r_path_1 = "../../EU-Reg_series/";
let r_pathfile_1 = r_path_1 + r_file_1;

let r_file_2_attr = "-Reg_deaths-hosp_series.csv";
let r_path_2 = "../../EU-Reg_series/";
let r_pathfile_2 = r_path_2 + r_file_2_attr;

let w_path_1 = "../";
let w_file_1 = "EU-Reg_deaths-hosp_" + w_date + ".csv";
let w_pathfile_1 = w_path_1 + w_file_1;
console.log("w_pathfile_1 : " + w_pathfile_1);

let w_obj = {};

//____ EU

var raw_data = fs.readFileSync(r_pathfile_1);
let r_lines = raw_data.toString().split("\n");
let r_line_0_arr = r_lines[0].split(",");
let name_0 = r_line_0_arr.shift();
let dates_arr = r_line_0_arr;
// console.log("dates_arr : " + dates_arr);

let date_index = dateFindIndex(dates_arr, date_EU);
console.log("date_index : " + date_index);

for (let i = 1; i < r_lines.length; i++) {
  let line_arr = r_lines[i].split(",");
  let ISO = line_arr.shift();
  let val = line_arr[date_index];
  console.log(ISO + " : " + val);

  w_obj[ISO] = val;
}


//____ Reg

for (let i = 0; i < files_name_arr.length; i++) {
  let r_pathfile = r_path_2 + files_name_arr[i] + r_file_2_attr;
  console.log("r_pathfile : " + r_pathfile);

  var raw_data = fs.readFileSync(r_pathfile);
  let r_lines = raw_data.toString().split(expr_linebreak);
  let r_line_0_arr = r_lines[0].split(",");
  let name_0 = r_line_0_arr.shift();
  let dates_arr = r_line_0_arr;

  let date_index = dateFindIndex(dates_arr, date_Reg);
  console.log("date_index : " + date_index);

  for (let i = 1; i < r_lines.length; i++) {
    let line_arr = r_lines[i].split(",");
    let ISO = line_arr.shift();
    let val = line_arr[date_index];
    console.log(ISO + " : " + val);
    w_obj[ISO] = val;
  }
}

// ____ Obj to CSV

let w_data = "ISO," + date_EU;

for (var ISO in w_obj) {
  let val = w_obj[ISO];

  w_data += "\n" + ISO + "," + val;
}

fs.writeFileSync(w_pathfile_1, w_data);

// var jsonContent_name = JSON.stringify(w_obj_name, null, 2);
// fs.writeFileSync(w_pathfile_1, jsonContent_name);

console.log("_end");

function dateFindIndex(arr, target) {
  let index = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      index = i;
      break;
    }
  }
  return index;
}