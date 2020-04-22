"use strict";

const fs = require("fs");

let r_path = "../";

let r_file_1 = "Cataluña_series.csv";
let r_pathfile_1 = r_path + r_file_1;

let r_file_3 = "Barcelona_age.csv";
let r_pathfile_3 = r_path + r_file_3;

let RegSan_files = [
  "Igualada",
  "Girona",
  "Central-sin-Igua",
  "Lleida-Pir",
  "Tarragona",
  "Ebre"
];

// let RegSan_files = ['Cataluña'];
let files_end = "_series.csv";

let title = "Barcelona";
let w_path = "../";
let w_file = "Barcelona_series.csv";
let w_pathfile = w_path + w_file;

console.log("r_pathfile_1 : " + r_pathfile_1);
let rawdata_1 = fs.readFileSync(r_pathfile_1);
// let rawdata_2 = fs.readFileSync(r_pathfile_2);
// console.log("rawdata : " + rawdata);

let lines_1 = rawdata_1.toString().split("\n");
console.log("lines_1.length : " + lines_1.length);

var rows_names = ["date", "deaths", "cases", "ICU", "recovered"];

// var rows_obj = {deaths:[], cases:[], ICU:[], recovered:[]};
var rows_obj = {};

// fill an object with properties, each one has an arrays as value ;

for (let i = 0; i <= 4; i++) {
  let cols_arr = lines_1[i].split(",");
  // let row_name = (cols_arr[0]).toString();
  let row_name = cols_arr[0];
  console.log("row_name : " + row_name);
  let row_vals = cols_arr.slice(1);
  // rows_obj[row_name]('rt');
  rows_obj[rows_names[i]] = row_vals;
  // console.log("rows_obj[rows_name] : " + rows_obj[rows_names[i]]);
}

// iter all the files

for (let j = 0; j < RegSan_files.length; j++) {
  // for (let j = 0; j < 2; j++) {
  let p_pathfile = r_path + RegSan_files[j] + files_end;
  console.log("p_pathfile : " + p_pathfile);

  let rawdata = fs.readFileSync(p_pathfile);
  let lines = rawdata.toString().split("\n");
  // console.log("lines.length : " + lines.length);

  // iter all the rows

  for (let k = 1; k <= 4; k++) {
    let cols_arr = lines[k].split(",");
    // let row_name = (cols_arr[0]).toString();
    var row_name = cols_arr[0];
    console.log("row_name_2 : " + row_name);
    let row_vals = cols_arr.slice(1);
    let old_arr = rows_obj[row_name];
    let new_arr = [];

    // iter all the values in the rows

    for (let m = 0; m < row_vals.length; m++) {
      let old_val = old_arr[m];
      let in_val = row_vals[m];
      // console.log("in_val : " + in_val);
      if (old_val !== "" && in_val !== "") {
      // if (old_val !== "") {
          // console.log("old_val : " + old_val);
        let in_val = row_vals[m];
        // console.log("in_val : " + in_val);
        let new_val = old_val - in_val;
        // console.log("new_val : " + new_val);
        new_arr[m] = new_val;
        // rows_obj[row_names][m] = new_val;
      } else {
        new_arr[m] = "";
      }
      // console.log("new_arr[m] : " + new_arr[m]);
    }
    rows_obj[row_name] = new_arr;
    // console.log("rows_obj[row_name] : " + rows_obj[row_name]);
  }
}

let w_data = lines_1[0];

for (let i = 1; i < rows_names.length; i++) {
  let new_line = rows_names[i];
  let new_arr = rows_obj[rows_names[i]];

  for (let j = 0; j < new_arr.length; j++) {
    new_line += "," + new_arr[j];
  }

  w_data += "\n" + new_line;
}

let rawdata = fs.readFileSync(r_pathfile_3);
let lines = rawdata.toString().split("\n");

w_data += "\n" + lines[1];

fs.writeFileSync(w_pathfile, w_data);
