"use strict";

const fs = require("fs");

let r_file = "covid19_periods.json";
let r_path = "../";
let r_pathfile = r_path + r_file;

let w_file = "covid19_periods_accum.json";
let w_path = "../";
let w_pathfile = w_path + w_file;

let w_obj = {};

// ____ JSON
var raw_data = fs.readFileSync(r_pathfile);
var r_obj = JSON.parse(raw_data);

for (var key in r_obj) {
  let r_k_obj = r_obj[key];
  console.log("key : " + key);

  let w_k_obj = {};
  w_k_obj.offset = r_k_obj.offset;
  w_k_obj.length = r_k_obj.length;

  let w_k_vals_arr = [];
  w_k_vals_arr.push(r_k_obj.values[0]);

  for (let i = 1; i < r_k_obj.values.length; i++) {
    let val_accum = w_k_vals_arr[i - 1] + r_k_obj.values[i];
    val_accum = Math.round(val_accum * 100000)/100000;
    w_k_vals_arr.push(val_accum);
  }

  w_k_obj.values = w_k_vals_arr;
  w_obj[key] = w_k_obj;
  // console.log(w_line);
}

var jsonContent = JSON.stringify(w_obj);

fs.writeFileSync(w_pathfile, jsonContent);
fs.writeFileSync(w_pathfile, jsonContent);
