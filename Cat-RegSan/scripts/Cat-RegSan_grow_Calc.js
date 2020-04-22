"use strict";

const fs = require("fs");

let convert_to_percent = true;
// convert_to_percent = false;

let val_min = 18;

let file_attr_1 = "min" + val_min;
let val_length_max = 15;
let val_length_min = 8;

let r_path = "../" + file_attr_1 + "/";
let r_file = "Cat-RegSan_deaths_" + file_attr_1 + ".csv";
let r_pathfile = r_path + r_file;
console.log("r_pathfile : " + r_pathfile);

let w_path_1 = "../" + file_attr_1 + "/";
let w_file_1 = "Cat-RegSan_deaths_" + file_attr_1 + "_grow";
if (convert_to_percent) {
  w_file_1 += "_%";
}
w_file_1 += ".csv";
let w_pathfile_1 = w_path_1 + w_file_1;
console.log("w_pathfile_1 : " + w_pathfile_1);

let val_length_actual = 0;

let r_rawdata = fs.readFileSync(r_pathfile);
let r_lines = r_rawdata.toString().split("\n");
console.log("r_lines.length : " + r_lines.length);

let w_data_1;

// headers of date Euro style
let headers_1 = "country";
for (let k = 0; k < val_length_max + 1; k++) {
  headers_1 += "," + k;
}
console.log("headers : " + headers_1);

w_data_1 = headers_1;

// for (var i = 1; i < r_lines.length; i++) {
for (let i = 1; i < (r_lines.length -1); i++) {
  // console.log(i + " : " + lines[i]);
  let line_arr = r_lines[i].split(",");

  let country_name = line_arr.shift();
  console.log(country_name);

  let vals_out = [0];

  for (let k = 0; k < val_length_max; k++) {
    let val1_ok = line_arr[k] > 0 && line_arr[k] != "";
    let val2_ok = line_arr[k + 1] > 0 && line_arr[k + 1] != "";
    let op_exists = val1_ok && val2_ok;

    if (op_exists) {
      let val_op = (line_arr[k + 1] / line_arr[k]) - 1;
      if (convert_to_percent) {
        val_op = Math.round(val_op * 1000.) / 10.;
      }      
      vals_out.push(val_op);
    } else {
      vals_out.push("");
    }
  }
  // console.log("vals_out : " + vals_out);

  w_data_1 += "\n" + country_name + "," + vals_out.toString();
}

fs.writeFileSync(w_pathfile_1, w_data_1);
