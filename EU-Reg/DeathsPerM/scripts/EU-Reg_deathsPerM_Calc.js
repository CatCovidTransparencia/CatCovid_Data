"use strict";

const fs = require("fs");

let w_date = "2020-05-01";
let date_sel = "01/05/20";

//____ Write

let w_path_1 = "../";
let w_file_1 = "EU-Reg_deathsPerM_" + w_date + ".csv";
let w_pathfile_1 = w_path_1 + w_file_1;
console.log("w_pathfile_1 : " + w_pathfile_1);

// ____ JSON EU-Reg_infos_ISO

let r_file_1 = "EU-Reg_infos_ISO.json";
let r_path_1 = "../../";
let r_pathfile_1 = r_path_1 + r_file_1;
console.log("r_pathfile_1 : " + r_pathfile_1);

var raw_data_1 = fs.readFileSync(r_pathfile_1);
var infos_obj = JSON.parse(raw_data_1);

//____ Read

let r_file_2 = "EU-Reg_deaths-hosp_" + w_date + ".csv";
let r_path_2 = "../../EU-Reg_deaths_Day/";
let r_pathfile_2 = r_path_2 + r_file_2;
console.log("r_pathfile_2 : " + r_pathfile_2);

let val_length_actual = 0;

// headers

let w_data_1;
w_data_1 = "ISO,deathsPerM,name,deaths,popM";

// ____ world to Obj
var r_obj_2 = {};

var raw_data_2 = fs.readFileSync(r_pathfile_2);
let r_lines_2 = raw_data_2.toString().split("\n");

for (let i = 1; i < r_lines_2.length; i++) {
  let line_arr = r_lines_2[i].split(",");
  let ISO = line_arr[0];
  let deaths = line_arr[1];
  // console.log("name : " + name);

  let info = infos_obj[ISO];
  // console.log("c_obj : " + c_obj);
  let name = info.name;
  let pop = info.population;
  let pop_M = Math.round(pop / 100000, 0) / 10;
  // let pop_M = Math.round(pop / 10000, 0)/100;
  let deaths_per_M = Math.round((deaths / pop) * 1000000, 0);

  let w_line =
    ISO + "," + deaths_per_M + "," + name + "," + deaths + "," + pop_M;
  console.log("w_line : " + w_line);
  w_data_1 += "\n" + w_line;
  // w_val = c_obj[date_index];
}

fs.writeFileSync(w_pathfile_1, w_data_1);

console.log("_end");
