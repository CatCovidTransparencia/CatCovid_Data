"use strict";

const fs = require("fs");

let files_name_arr = ["EU", "BE", "ES", "IT", "FR", "GB", "DE"];

let r_path = "../";
let w_path = "../";

let w_pathfile_1 = w_path + "EU-Reg_infos.json";
let w_pathfile_2 = w_path + "EU-Reg_infos_ISO.json";

let w_obj_name = {};
let w_obj_ISO = {};

for (let i = 0; i < files_name_arr.length; i++) {
  let r_file = files_name_arr[i] + "_infos_ISO.json";
  let r_pathfile = r_path + r_file;
  console.log("r_pathfile : " + r_pathfile);

  var raw_data = fs.readFileSync(r_pathfile);
  var r_obj = JSON.parse(raw_data);

  for (var key in r_obj) {
    let r_k_obj = r_obj[key];
    let ISO = r_k_obj.ISO;
    let name = r_k_obj.name;
    console.log("ISO : " + ISO);

    w_obj_name[name] = r_k_obj;
    w_obj_ISO[ISO] = r_k_obj;
  }
}

var jsonContent_name = JSON.stringify(w_obj_name, null, 2);
fs.writeFileSync(w_pathfile_1, jsonContent_name);

var jsonContent_ISO = JSON.stringify(w_obj_ISO, null, 2);
fs.writeFileSync(w_pathfile_2, jsonContent_ISO);

console.log("_end");
