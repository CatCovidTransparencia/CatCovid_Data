"use strict";

const fs = require("fs");

var expr_linebreak = /\r\n|\r|\n/;

let r_file = "EU_infos.csv";
let r_path = "../";
let r_pathfile = r_path + r_file;
console.log("r_pathfile : " + r_pathfile);

let w_file = "EU_infos.json";
let w_path = "../../../../../../CatCovid_data/EU-Reg/";
let w_pathfile = w_path + w_file;
console.log("w_pathfile : " + w_pathfile);

let raw_data = fs.readFileSync(r_pathfile);
let lines = raw_data.toString().split(expr_linebreak);

let headers = [];
let headers_arr = lines[0].split(",");
console.log("headers_arr : " + headers_arr);

let file_obj = {};
// file_obj["attr"] = "ert";

for (let i = 1; i < lines.length; i++) {
  let line_arr = lines[i].split(",");
  let ISO = line_arr[0];
  let name = line_arr[1];
  let pop = line_arr[2];
  let km2 = line_arr[3];
  console.log(name);
  let line_obj = {};
  for (let j = 0; j < line_arr.length; j++) {
    let attr = headers_arr[j];
    let value = line_arr[j];
    let value_num = Number(value);
    if (value_num) {
      line_obj[attr] = value_num;
    } else {
      line_obj[attr] = value;
    }
  }
  file_obj[name] = line_obj;
}

var jsonContent = JSON.stringify(file_obj, null, 2);

fs.writeFileSync(w_pathfile, jsonContent);

console.log("_end");
