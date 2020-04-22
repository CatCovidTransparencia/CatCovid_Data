"use strict";

const fs = require("fs");

var expr_linebreak = /\r\n|\r|\n/;

let r_file = "covid19_periods.json";
let r_path = "../../";
let r_pathfile = r_path + r_file;

// let w_name = "infection-to-death_Lancet_65-75";
let w_name = "infection-to-ICU";
let w_file = w_name + ".json";
let w_path = "../";
let w_pathfile = w_path + w_file;

// var r_periods = {};

// JSON
var raw_data = fs.readFileSync(r_pathfile);
var r_periods = JSON.parse(raw_data);

for (var key in r_periods) {
  let obj = r_periods[key];
  console.log("key : " + key);
  // console.log("vals : " + r_periods[key]);
}

var name_1 = "infection-to-symptom";
// var name_1 = "infection-to-symptom_Japan";
// var name_2 = "symptom-to-death_65-75";
var name_2 = "symptom-to-ICU";

let res_arr_offset = r_periods[name_1].offset + r_periods[name_2].offset;
let res_arr_length = r_periods[name_1].length + r_periods[name_2].length - 1;
console.log("res_arr_offset : " + res_arr_offset);
console.log("res_arr_length : " + res_arr_length);

var res_arr = [];
for (let i = 0; i < res_arr_length; i++) {
  res_arr.push(0);
}
console.log("res_arr : " + res_arr);

for (let i = 0; i < r_periods[name_1].length; i++) {
  let val_1 = r_periods[name_1]["values"][i];
  for (let j = 0; j < r_periods[name_2].length; j++) {
    let arr_pos = i + j;
    let val_2 = r_periods[name_2]["values"][j];
    let res_val = val_1 * val_2;
    // console.log(arr_pos + " : " + res_val);

    res_arr[arr_pos] += res_val;
    // res_arr.push(0);
  }
}
console.log("res_arr : " + res_arr);

let arr_sum = 0.;
let arr_sum2 = 0.;
for (let i = 0; i < res_arr_length; i++) {
  arr_sum += res_arr[i];
  res_arr[i] = Math.round(1000000 * res_arr[i]) / 1000000;
  arr_sum2 += res_arr[i];
}
console.log("arr_sum : " + arr_sum);
console.log("arr_sum2 : " + arr_sum2);

console.log("res_arr : " + res_arr);

var res_period = {};
res_period["offset"] = res_arr_offset;
res_period["length"] = res_arr_length;
res_period["values"] = res_arr;

var jsonContent = JSON.stringify(res_period);
// var jsonContent = JSON.stringify(r_periods, null, 2);
// var jsonContent = JSON.stringify(r_periods, null, '\t');
let w_pathfile_json = w_path + w_name + ".json";
fs.writeFileSync(w_pathfile_json, jsonContent);

// let w_pathfile_json = w_path + w_name + ".json";


console.log("_end");
