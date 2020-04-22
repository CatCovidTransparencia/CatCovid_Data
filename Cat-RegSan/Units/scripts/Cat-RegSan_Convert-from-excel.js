"use strict";

const fs = require("fs");

var expr_linebreak = /\r\n|\r|\n/;

let r_path = "../../../../CatCovid_Data_WORK/CatCovid_Data_Excel/Cat-RegSan/Units/";
let w_path = "../";

let RegSan_files = [
  "Barcelona_age",
  "Cataluña_series",
  "Central-sin-Igua_series",
  "Ebre_series",
  "Girona_series",
  "Igualada_series",
  "Lleida-Pir_series",
  "Tarragona_series",
];
//   "Cat_RegSan_infos",
//   "Cat_RegSan_deaths_min6",

for (let i = 0; i < RegSan_files.length; i++) {
  // for (let j = 0; j < 2; j++) {
  let p_file = RegSan_files[i] + ".csv";
  let p_pathfile = r_path + p_file;
  let w_pathfile = w_path + p_file;
  // console.log("p_pathfile : " + p_pathfile);

  let raw_data = fs.readFileSync(p_pathfile);
  // let lines = raw_data.toString().split("\r");
  let lines = raw_data.toString().split(expr_linebreak);
  console.log(p_file + " : " + lines.length);

  // iter headers
  let headers_arr = lines[0].split(",");
  let w_line = headers_arr.shift();
  for (let j = 0; j < headers_arr.length; j++) {
    w_line += "," + dateExcelConvert(headers_arr[j]);
  }
  let w_data = w_line;
  // console.log("w_line : " + w_line);

  // iter all the rows
  for (let k = 1; k < lines.length; k++) {
    w_data += "\n" + lines[k];
  }
  fs.writeFileSync(w_pathfile, w_data);
}
console.log("_end");

function dateExcelConvert(de) {
  let d_arr = de.split("/");
  let d = "20" + d_arr[2] + "-" + d_arr[1] + "-" + d_arr[0];
  return d;
}
