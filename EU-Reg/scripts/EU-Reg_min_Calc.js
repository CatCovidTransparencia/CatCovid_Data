"use strict";

const fs = require("fs");

let val_min = 27;

let val_length_max = 29;
let val_length_min = 8;

let file_attr_1 = "min" + val_min;

let r_path = "../";
let r_file = "EU_deaths_series.csv";
let r_pathfile = r_path + r_file;
console.log("r_pathfile : " + r_pathfile);

let w_path_1 = "../" + file_attr_1 + "/";
let w_file_1 = "EU-Reg_deaths_" + file_attr_1 + ".csv";
let w_pathfile_1 = w_path_1 + w_file_1;
console.log("w_pathfile_1 : " + w_pathfile_1);

let val_length_actual = 0;

let r_rawdata = fs.readFileSync(r_pathfile);

let r_lines = r_rawdata.toString().split("\n");
console.log("r_lines.length : " + r_lines.length);

let w_data_1;

// headers of date Euro style
let headers_1 = "country";
for (let k = 0; k < val_length_max; k++) {
  headers_1 += "," + k;
}
console.log("headers : " + headers_1);

w_data_1 = headers_1;
// w_data_1 = headers_1 + "\r";

// for (var i = 1; i < r_lines.length; i++) {
for (let i = 1; i < r_lines.length; i++) {
  // console.log(i + " : " + lines[i]);
  let line_arr = r_lines[i].split(",");

  let country_name = line_arr.shift();
  // console.log(country_name);

  let values_arr_ori = line_arr.slice(4);
  // console.log("values_ori:" + values_arr_ori);

  let val_arr_cut = new Array();

  for (let j = 0; j < line_arr.length; j++) {
    if (line_arr[j] >= val_min) {
      val_arr_cut.push(line_arr[j]);
    }
  }
  // console.log(val_arr_cut.length);

  let vals_out = [];

  for (let k = 0; k < val_length_max; k++) {
    if (k < val_arr_cut.length) {
      vals_out.push(val_arr_cut[k]);
    } else {
      vals_out.push("");
    }
  }

  let line_out = country_name + "," + vals_out.toString();
  console.log(line_out);

  w_data_1 += "\r\n" + line_out;
}

fs.writeFileSync(w_pathfile_1, w_data_1);
