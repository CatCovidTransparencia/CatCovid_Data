"use strict";

const fs = require("fs");

let zeroing_first = true;

let val_min = 18;
let file_fold = "min" + val_min + "/";
let file_attr = "_deaths_min" + val_min + "_grow_%";

let index_min = 1;
let index_max = 15;
let headers_index_start = 13;


let title = "Cat-World_deaths";
let w_path = "../";
let w_file_root = "Cat-World";
let w_file = w_file_root + file_attr + ".csv";
let w_pathfile = w_path + file_fold + w_file;
console.log("w_pathfile : " + w_pathfile);

let r_path_1 = "../../Cat-RegSan/";
let r_file_root_1 = "Cat-RegSan";
let r_file_1 = r_file_root_1 + file_attr + ".csv";
let r_pathfile_1 = r_path_1 + file_fold + r_file_1;
console.log("r_pathfile_1 : " + r_pathfile_1);
let file_1_lines = ["Cataluña", "Cat-sin-Igua"];
// let file_1_lines = ["Cataluña", "Cat-sin-Igua", "Igualada"];

let r_path_2 = "../../EU-Reg/";
let r_file_root_2 = "EU-Reg";
let r_file_2 = r_file_root_2 + file_attr + ".csv";
let r_pathfile_2 = r_path_2 + file_fold + r_file_2;
console.log("r_pathfile_2 : " + r_pathfile_2);
let file_2_lines = ["Madrid", "Lombardia", "Occitanie"];

let r_path_3 = "../../World/";
let r_file_root_3 = "World";
let r_file_3 = r_file_root_3 + file_attr + ".csv";
let r_pathfile_3 = r_path_3 + file_fold + r_file_3;
console.log("r_pathfile_3 : " + r_pathfile_3);
// let file_2_lines = ["Madrid", "Lombardia", "Occitanie"];

let w_data = "";

// ___ HEADERS

let headers = "date,";

let vals_arr_length = index_max - index_min + 1;
let vals_arr = new Array(vals_arr_length);
for (let i = 0; i < vals_arr_length; i++) {
  vals_arr[i] = i + headers_index_start;
}
headers += vals_arr.toString();
w_data += headers;

// ___ 1

let rawdata_1 = fs.readFileSync(r_pathfile_1);
let lines_1 = rawdata_1.toString().split("\n");
console.log("lines_1 : " + lines_1.length);

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
    for (let i = 0; i < vals_arr_length; i++) {
      vals_arr[i] = line_arr[i + index_min];
    }
    if (zeroing_first) {
      vals_arr[0] = 0;
    }
    let w_line = name + "," + vals_arr.toString();
    console.log("w_line : " + w_line);
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
    console.log("w_line : " + w_line);
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
  console.log("w_line : " + w_line);
  w_data += "\n" + w_line;
}

fs.writeFileSync(w_pathfile, w_data);
