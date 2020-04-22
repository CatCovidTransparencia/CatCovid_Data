"use strict";

const fs = require("fs");

let slim_over = 90;
// gives us 50 countries
// let slim_over = 42;

let r_path = "../World_series/CSSE/";
let r_file = "time_series_covid19_deaths_global_2020-04-20_corrected.csv";
let r_pathfile = r_path + r_file;
console.log("r_pathfile : " + r_pathfile);

let w_path_1 = "../";
let w_file_1 = "Countries_deaths_series.csv";
let w_pathfile_1 = w_path_1 + w_file_1;
console.log("w_pathfile_1 : " + w_pathfile_1);

let w_path_2 = "../";
let w_file_2 = "Countries_LatLong.csv";
let w_pathfile_2 = w_path_2 + w_file_2;
console.log("w_pathfile_2 : " + w_pathfile_2);

let val_length_actual = 0;

let r_rawdata = fs.readFileSync(r_pathfile);

let r_lines = r_rawdata.toString().split("\n");
console.log("r_lines.length : " + r_lines.length);

let w_data_1;
let w_data_2;

let headers_2 = "country,lat,long";
w_data_2 = headers_2;

// headers of date Euro style
let headers_1 = "country";
let r_lines_0_arr = r_lines[0].split(",");
for (let k = 4; k < r_lines_0_arr.length; k++) {
    let date_EU = dateUSConvert(r_lines_0_arr[k]);
    headers_1 += "," + date_EU;
}
// console.log("headers : " + headers);
w_data_1 = headers_1;

console.log("slim_over:" + slim_over);

let countries_max_ok = 0;
// for (var i = 1; i < r_lines.length; i++) {
for (let i = 1; i < r_lines.length; i++) {
  // console.log(i + " : " + lines[i]);
  let line_arr = r_lines[i].split(",");

  let country_name = line_arr[1];
  // there is a province
  if (line_arr[0]) {
    // console.log("Prov:" + line_arr[0]);
    country_name = line_arr[1] + "-" + line_arr[0];
  }
  // console.log("country_name:" + country_name);

  let lat = line_arr[2];
  let long = line_arr[3];

  let vals_arr = line_arr.slice(4);
  // console.log("vals_arr.length:" + vals_arr.length);
  // console.log("values_ori:" + vals_arr_ori);

  // let values_arr_cut = new Array();
  let max = -Infinity;
  for (let j = 0; j < vals_arr.length; j++) {
    let val = parseInt(vals_arr[j]);
    if (val > max) {
      max = vals_arr[j];
    }
  }
  // console.log("max:" + max);

  if (max >= slim_over) {
    countries_max_ok ++;
    w_data_1 += "\n" + country_name + "," + vals_arr.toString();
    w_data_2 += "\n" + country_name + "," + lat +  "," + long;
  }
}
console.log("countries_max_ok:" + countries_max_ok);

fs.writeFileSync(w_pathfile_1, w_data_1);

fs.writeFileSync(w_pathfile_2, w_data_2);

function dateUSConvert(de) {
  let d_arr = de.split("/");
  let d = "20" + d_arr[2] + "-" + d_arr[0] + "-" + d_arr[1];
  return d;
}