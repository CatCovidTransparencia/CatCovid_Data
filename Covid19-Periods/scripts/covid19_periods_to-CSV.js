"use strict";

const fs = require("fs");

let vals_arr_length = 51;

// let r_file = "covid19_periods.json";
let r_file = "covid19_periods_accum.json";
let r_path = "../";
let r_pathfile = r_path + r_file;

// let w_file = "covid19_periods.csv";
// let w_file_2 = "covid19_periods_%.csv";
let w_file = "covid19_periods_accum.csv";
let w_file_2 = "covid19_periods_accum_%.csv";
let w_path = "../";
let w_pathfile = w_path + w_file;
let w_pathfile_2 = w_path + w_file_2;

// ___ START

let w_data = "";
let w_data_2 = "";

// ___ HEADERS

let headers = "date,";

// let vals_arr_length = index_max - index_min + 1;
let vals_arr = new Array(vals_arr_length);
for (let i = 0; i < vals_arr_length; i++) {
  vals_arr[i] = i;
}
headers += vals_arr.toString();
w_data += headers;
w_data_2 += headers;

// ____ JSON
var raw_data = fs.readFileSync(r_pathfile);
var r_periods = JSON.parse(raw_data);

for (var key in r_periods) {
  let obj = r_periods[key];
  // console.log("key : " + key);
  let w_line = key;
  let w_line_2 = key;

  let obj_in  = obj.offset
  let obj_out  = obj.offset + obj.length - 1;
  for (let i = 0; i < vals_arr_length; i++) {
    if ( i < obj_in){
      w_line += ",";
      w_line_2 += ",";
    }
    if ( i >= obj_in && i <= obj_out){
      let val_index  = i - obj.offset
      w_line += "," + obj.values[val_index];
      let val_percent = Math.round(obj.values[val_index] * 1000.) / 10.;
      w_line_2 += "," + val_percent;
    }
    if ( i > obj_out){
      w_line += ",";
      w_line_2 += ",";
    }
  }
  console.log(w_line);
  w_data += "\n" + w_line;
  w_data_2 += "\n" + w_line_2;
  // console.log("vals : " + r_periods[key]);
}

fs.writeFileSync(w_pathfile, w_data);

fs.writeFileSync(w_pathfile_2, w_data_2);
