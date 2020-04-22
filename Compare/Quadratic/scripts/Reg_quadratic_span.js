"use strict";

const fs = require("fs");

let val_min = 2;

let index_min = 0;
let index_max = 32;
let index_length = index_max - index_min + 1;

let res_index_length = 61;

let file_attr = "_quadratic.csv";

let file_attr2 = "_len" + index_max;

let title = "Reg_quadratic_span";

let w_path = "../";
let w_file_root = "Reg_quadratic_span";
let w_file = w_file_root + ".csv";
let w_pathfile = w_path + w_file;
console.log("w_pathfile : " + w_pathfile);

let files_attr = {
  "Cat-sin-Igua": {
    name: "Cat-sin-Igua",
    path: "../../../Cat-RegSan/Quadratic/Units/",
    offset: 0,
    rows: ["values", "mid", "high", "low-4d"],
  },
  Lombardia: {
    name: "Lombardia",
    path: "../../../EU-Reg/Quadratic/Units/",
    offset: 15,
    rows: ["values", "mid", "high"],
  },
  Madrid: {
    name: "Madrid",
    path: "../../../EU-Reg/Quadratic/Units/",
    offset: 28,
    rows: ["values", "mid", "high"],
  },
  Belgium: {
    name: "Belgium",
    path: "../../../EU-Reg/Quadratic/Units/",
    offset: 35,
    rows: ["values", "mid", "high"],
  },
  Occitanie: {
    name: "Occitanie",
    path: "../../../EU-Reg/Quadratic/Units/",
    offset: 45,
    rows: ["values", "mid", "high"],
  }
  // },
  // Valencia: {
  //   name: "Valencia",
  //   path: "../../../EU-Reg/Quadratic/Units/",
  //   offset: 28,
  //   rows: ["values", "mid", "high"],
  // }
};

let w_data = "";

// ___ HEADERS

let w_headers = "date,";

let header_arr = new Array(res_index_length);
for (let i = 0; i < res_index_length; i++) {
  header_arr[i] = i;
}
w_headers += header_arr.toString();
console.log("w_headers : " + w_headers);

w_data += w_headers;

// ___ 1

for (var key in files_attr) {
  console.log("key : " + key);
  let obj_attr = files_attr[key];
  let r_pathfile = obj_attr.path + obj_attr.name + file_attr;
  console.log("r_pathfile : " + r_pathfile);
  let rawdata = fs.readFileSync(r_pathfile);
  let lines = rawdata.toString().split("\n");

  for (let i = 1; i < lines.length; i++) {
    let line_arr = lines[i].split(",");
    let row_name = line_arr.shift();
    let is_selected = false;
    for (let j = 0; j < obj_attr.rows.length; j++) {
      if (row_name === obj_attr.rows[j]) is_selected = true;
    }
    // console.log("is_selected : " + is_selected);
    if (is_selected) {
      // console.log("row_name : " + row_name);
      let w_row_name = "";
      if (row_name == "values") {
        w_row_name = obj_attr.name;
      } else {
        w_row_name = obj_attr.name + "_" + row_name;
      }
      console.log("w_row_name : " + w_row_name);

      let vals_arr = new Array(res_index_length);

      for (let k = 0; k < index_length; k++) {
        let val_index = index_min + k;
        let val = line_arr[val_index];
        let res_index = k + obj_attr.offset;
        if (val >= val_min && res_index < res_index_length) {
          vals_arr[res_index] = val;
        }
      }
      let w_line = w_row_name + "," + vals_arr.toString();
      w_data += "\n" + w_line;
    }
  }
}

fs.writeFileSync(w_pathfile, w_data);
