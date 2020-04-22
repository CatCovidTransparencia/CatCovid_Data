"use strict";

const fs = require("fs");

let zeroing_first = false;

let val_min = 40;
let val_min_off = 7;

let file_attr = "min" + val_min + "_off" + val_min_off;

let index_min = 0;
let index_max = 24;
let index_1_min = 15;

let file_attr2 = "_len" + index_max;

let title = "Cat-world_deaths";

let w_path = "../" + file_attr + "/";
let w_file_root = "Cat-World_deaths_";
let w_file = w_file_root + file_attr + file_attr2 + ".csv";
let w_pathfile = w_path + w_file;
console.log("w_pathfile : " + w_pathfile);

let r_path_1 = "../../Cat-RegSan/";
let r_file_1 = "Cat-RegSan_deaths_series.csv";
let r_pathfile_1 = r_path_1 + r_file_1;
console.log("r_pathfile_1 : " + r_pathfile_1);
// let file_1_lines = ["Cat-sin-Igua"];
let file_1_lines = ["Cataluña", "Cat-sin-Igua"];
// let file_1_lines = ["Cataluña", "Cat-sin-Igua", "Igualada"];

let r_path_2 = "../../EU-Reg/" + file_attr + "/";
let r_file_root_2 = "EU-Reg_deaths_";
let r_file_2 = r_file_root_2 + file_attr + ".csv";
let r_pathfile_2 = r_path_2 + r_file_2;
console.log("r_pathfile_2 : " + r_pathfile_2);
let file_2_lines = ["Madrid", "Lombardia", "Occitanie"];
// let file_2_lines = ["Madrid", "Lombardia"];

let r_path_3 = "../../World/" + file_attr + "/";
let r_file_root_3 = "Countries_deaths_";
let r_file_3 = r_file_root_3 + file_attr + ".csv";
let r_pathfile_3 = r_path_3 + r_file_3;
console.log("r_pathfile_3 : " + r_pathfile_3);
// let file_2_lines = ["Madrid", "Lombardia", "Occitanie"];

let w_data = "";

// ___ HEADERS

let headers = "date,";

let vals_arr_length = index_max - index_min + 1;
let vals_arr = new Array(vals_arr_length);
for (let i = 0; i < vals_arr_length; i++) {
  vals_arr[i] = i + index_min + 10;
}
headers += vals_arr.toString();
w_data += headers;

// ___ 1

let rawdata_1 = fs.readFileSync(r_pathfile_1);
let lines_1 = rawdata_1.toString().split("\n");
console.log("lines_1 : " + lines_1.length);
vals_arr = new Array(vals_arr_length);
for (let i = 1; i < lines_1.length; i++) {
  let line_arr = lines_1[i].split(",");
  let name = line_arr.shift();
  // console.log("name : " + name);
  let is_selected = false;
  for (let j = 0; j < file_1_lines.length; j++) {
    if (name === file_1_lines[j]) is_selected = true;
  }
  // console.log("is_selected : " + is_selected);
  if (is_selected) {
    for (let k = 0; k < (vals_arr_length); k++) {
      vals_arr[k] = line_arr[k + index_1_min];
    }
    if (zeroing_first) {
      vals_arr[0] = 0;
    }
    let w_line = name + "," + vals_arr.toString();
    console.log(w_line);
    w_data += "\n" + w_line;
  }
}

// ___ 2

let rawdata_2 = fs.readFileSync(r_pathfile_2);
let lines_2 = rawdata_2.toString().split("\n");
console.log("lines_2 : " + lines_2.length);

for (let i = 1; i < lines_2.length; i++) {
  let line_arr = lines_2[i].split(",");
  let name = line_arr.shift();
  // console.log("name : " + name);
  let is_selected = false;
  for (let j = 0; j < file_2_lines.length; j++) {
    if (name === file_2_lines[j]) is_selected = true;
  }
  // console.log("is_selected : " + is_selected);
  if (is_selected) {
    for (let i = 0; i < vals_arr_length; i++) {
      vals_arr[i] = line_arr[i + index_min];
    }
    if (zeroing_first) {
      vals_arr[0] = 0;
    }
    let w_line = name + "," + vals_arr.toString();
    console.log(w_line);
    w_data += "\n" + w_line;
  }
}

// ___ 3

let rawdata_3 = fs.readFileSync(r_pathfile_3);
let lines_3 = rawdata_3.toString().split("\n");
console.log("lines_3 : " + lines_3.length);

for (let i = 1; i < lines_3.length; i++) {
  let line_arr = lines_3[i].split(",");
  let name = line_arr.shift();
  // console.log("name : " + name);
  for (let i = 0; i < vals_arr_length; i++) {
    vals_arr[i] = line_arr[i + index_min];
  }
  if (zeroing_first) {
    vals_arr[0] = 0;
  }
  let w_line = name + "," + vals_arr.toString();
  // console.log("w_line : " + w_line);
  w_data += "\n" + w_line;
}

fs.writeFileSync(w_pathfile, w_data);
