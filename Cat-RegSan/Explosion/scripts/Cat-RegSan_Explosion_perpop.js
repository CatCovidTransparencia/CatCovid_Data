"use strict";

const fs = require("fs");

// let file_fold = "min6/";

let index_min = 12;
let index_max = 31;
// let index_max = 31;

let file_attr = "_" + index_min + "-" + index_max;

let w_title = "Cat-RegSan_Explosion";
let w_path = "../";
let w_file = w_title + file_attr + "_perpop" + ".csv";
let w_pathfile = w_path + w_file;
console.log("w_pathfile : " + w_pathfile);

let r_path_1 = "../";
let r_file_1 = w_title + file_attr + ".csv";
let r_pathfile_1 = r_path_1 + r_file_1;
console.log("r_pathfile_1 : " + r_pathfile_1);

let r_path_2 = "../../";
let r_file_2 = "Cat-RegSan_infos" + ".json";
let r_pathfile_2 = r_path_2 + r_file_2;

let info_1_attr = "pop/100000";

// ___ 2
console.log("r_pathfile_2 : " + r_pathfile_2);

let rawdata_2 = fs.readFileSync(r_pathfile_2);
let infos = JSON.parse(rawdata_2);
console.log("infos : " + infos);
// console.log("infos : " + infos["Cataluña"]["CODE"]);

// ___ 1

let rawdata_1 = fs.readFileSync(r_pathfile_1);
let lines_1 = rawdata_1.toString().split("\n");
console.log("lines_1 : " + lines_1.length);

let val_arr_length = lines_1[0].split(",").length - 1;
console.log("val_arr_length : " + val_arr_length);

let w_data = lines_1[0];

for (let i = 1; i < lines_1.length; i++) {
  let line_arr = lines_1[i].split(",");
  let name = line_arr.shift();
  console.log("name : " + name);
  let info_name = infos[name];

  // let info_val = info_name["pop/100000"];
  let info_val = info_name[info_1_attr];
  console.log("info_val : " + info_val);

  let vals_arr = [];
  for (let k = 0; k < val_arr_length; k++) {
    if (line_arr[k] !== "") {
      vals_arr[k] = line_arr[k] / info_val;
    } else {
      vals_arr[k] = "";
    }
  }
  let w_line = name + "," + vals_arr.toString();
  console.log("w_line : " + w_line);
  w_data += "\n" + w_line;
}

fs.writeFileSync(w_pathfile, w_data);
