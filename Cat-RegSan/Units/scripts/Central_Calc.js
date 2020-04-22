"use strict";

const fs = require("fs");

let r_path = "../";

let r_file_1 = "Central-sin-Igua_series.csv";
let r_pathfile_1 = r_path + r_file_1;
let r_file_2 = "Igualada_series.csv";
let r_pathfile_2 = r_path + r_file_2;
console.log("r_pathfile_1 : " + r_pathfile_1);

let title = "Central";
let w_file = "Central_series.csv";
let w_pathfile = r_path + w_file;

let rawdata_1 = fs.readFileSync(r_pathfile_1);
let rawdata_2 = fs.readFileSync(r_pathfile_2);
// console.log("rawdata : " + rawdata);

let lines_1 = rawdata_1.toString().split("\n");
console.log("lines_1.length : " + lines_1.length);

let lines_2 = rawdata_2.toString().split("\n");
console.log("lines_2.length : " + lines_2.length);

// w_data += lines_1[0] + '\r';
let w_data = lines_1[0];
// console.log("w_data : " + w_data);
// wdata += country_name + ';' + values_cut + '\n';
let cols_arr = lines_1[0].split(",");
console.log("cols_arr : " + cols_arr.length);

for (let i = 1; i <= 4; i++) {
  let line_1 = lines_1[i].split(",");
  let line_2 = lines_2[i].split(",");
  let header = line_1[0];
  console.log("lines_1_header : " + header);
  let line_out = "";
  for (let j = 1; j < cols_arr.length - 0; j++) {
    if (line_1[j] !== "" && line_2[j] !== "") {
      let result = parseInt(line_1[j]) + parseInt(line_2[j]);
      // line_out.push(line_1[j]);
      line_out += "," + result;
      // console.log("header : " + header);
    } else {
      line_out += ",";
    }
  }
  w_data += "\n" + header + line_out;
}

fs.writeFileSync(w_pathfile, w_data);
