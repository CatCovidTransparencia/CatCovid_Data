"use strict";

const fs = require("fs");

var expr_linebreak = /\r\n|\r|\n/;

let r_file_1 = "World_infos_pre_CSSE.csv";
let r_path_1 = "../";
let r_pathfile_1 = r_path_1 + r_file_1;
console.log("r_pathfile_1 : " + r_pathfile_1);

let r_file_2 = "World_infos_pre_worldometers.csv";
let r_path_2 = "../";
let r_pathfile_2 = r_path_2 + r_file_2;
console.log("r_pathfile_2 : " + r_pathfile_2);

let w_path_1 = "../../";
let w_file_1 = "World_infos.csv";
let w_pathfile_1 = w_path_1 + w_file_1;
console.log("w_pathfile_1 : " + w_pathfile_1);

// let w_path_2 = "../../";
// let w_file_2 = "World_infos.csv";
// let w_pathfile_2 = w_path_2 + w_file_2;
// console.log("w_pathfile_2 : " + w_pathfile_2);

//_____ Worldometers

let r_rawdata_2 = fs.readFileSync(r_pathfile_2);
let r_lines_2 = r_rawdata_2.toString().split(expr_linebreak);
console.log("r_lines_2.length : " + r_lines_2.length);

let r_obj_2 = {};

// for (let i = 1; i < r_lines_2.length; i++) {
for (let i = 1; i < r_lines_2.length; i++) {
  let line_arr = r_lines_2[i].split(",");
  let name = line_arr[0];
  let w_attr = {};
  w_attr.name = line_arr[0];
  w_attr.population = line_arr[1];
  w_attr.km2 = line_arr[2];
  r_obj_2[name] = w_attr;
  // console.log(name + " km2: " + r_obj_2[name].km2);
}

//_____ infos.csv

let w_data_1 = "";

let r_rawdata_1 = fs.readFileSync(r_pathfile_1);
let r_lines_1 = r_rawdata_1.toString().split(expr_linebreak);
console.log("r_lines_1.length : " + r_lines_1.length);

w_data_1 += r_lines_1[0];

// for (let i = 1; i < r_lines_1.length; i++) {
for (let i = 1; i < r_lines_1.length; i++) {
  let line_arr = r_lines_1[i].split(",");
  let name = line_arr[1];
  if (r_obj_2[name]) {
    line_arr[3] = r_obj_2[name].km2;
    console.log(r_obj_2[name].name + " : " + r_obj_2[name].km2);
  }
  w_data_1 += "\n" + line_arr.toString();
}

fs.writeFileSync(w_pathfile_1, w_data_1);
