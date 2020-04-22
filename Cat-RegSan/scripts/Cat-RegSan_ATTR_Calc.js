"use strict";

const fs = require("fs");

// Select one of the attribute to calculate the series

let attr = "deaths";
// let attr = "cases";
// let attr = "ICU";
// let attr = "recovered";
// let attr = "age";

let r_path = "../Units/";

let RegSan_files = [
  "Cataluña",
  "Cat-sin-Igua",
  "Igualada",
  "Barcelona",
  "Girona",
  "Central-sin-Igua",
  "Lleida-Pir",
  "Tarragona",
  "Ebre",
  "Central"
];

let files_end = "_series.csv";


let title = "Cat-RegSan";
let w_path = "../";
let w_file = "Cat-RegSan_" + attr + "_series.csv";
let w_pathfile = w_path + w_file;

let w_data = "";

for (let i = 0; i < RegSan_files.length; i++) {
  let r_pathfile = r_path + RegSan_files[i] + files_end;
  console.log("r_pathfile : " + r_pathfile);

  let rawdata = fs.readFileSync(r_pathfile);
  let lines = rawdata.toString().split("\n");
  console.log("lines.length : " + lines.length);

  if (i == 0) {
    w_data += lines[0];
  }

  // let line_out = "";
  for (let j = 1; j < lines.length; j++) {
    let line_slice = lines[j].indexOf(",");
    // console.log("line_slice : " + line_slice);
    let row_name = lines[j].slice(0, line_slice);

    if (row_name == attr) {
      console.log("row_name : " + row_name);
      let row_values = lines[j].slice(line_slice + 1);
      // console.log("row_values : " + row_values);
      w_data += "\n" + RegSan_files[i] + "," + row_values;
    }
  }
}

fs.writeFileSync(w_pathfile, w_data);
