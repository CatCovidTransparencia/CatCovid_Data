"use strict";

const fs = require("fs");

var expr_linebreak = /\r\n|\r|\n/;

let date_length_st = 100;

let r_path_1 = "../sources/";
let r_file_1 = "dpc-covid19-ita-regioni.csv";
let r_pathfile_1 = r_path_1 + r_file_1;
console.log("r_pathfile_1 : " + r_pathfile_1);

// ____ JSON EU_infos

let r_path_2 = "../../";
let r_file_2 = "EU-Reg_infos.json";
let r_pathfile_2 = r_path_2 + r_file_2;
console.log("r_pathfile_2 : " + r_pathfile_2);

var raw_data_2 = fs.readFileSync(r_pathfile_2);
var r_obj_2 = JSON.parse(raw_data_2);

// ____ Write

let w_path_1 = "../";
let w_file_1 = "IT-Reg_deaths-hosp_series" + ".csv";
let w_pathfile_1 = w_path_1 + w_file_1;
console.log("w_pathfile_1 : " + w_pathfile_1);

let date_length = 0;

let date_arr = new Array(date_length_st);

var w_obj = {};

let reg_arr = [
  "Italy",
  "Abruzzo",
  "Basilicata",
  "Calabria",
  "Campania",
  "Emilia-Romagna",
  "Friuli-Venezia Giulia",
  "Lazio",
  "Liguria",
  "Lombardia",
  "Marche",
  "Molise",
  "Piemonte",
  "Puglia",
  "Sardegna",
  "Sicilia",
  "Toscana",
  "Trentino-Alto Adige",
  "Umbria",
  "Valle d'Aosta",
  "Veneto",
];
// let reg_arr = ["Abruzzo","Basilicata","Calabria","Campania","Emilia-Romagna","Friuli Venezia Giulia","Lazio","Liguria","Lombardia","Marche","Molise","Piemonte","Puglia","Sardegna","Sicilia","Toscana","P.A. Trento","Umbria","Valle d'Aosta","Veneto","P.A. Bolzano"];

for (let i = 0; i < reg_arr.length; i++) {
  w_obj[reg_arr[i]] = new Array(date_length_st);
}

//____ read

var raw_data_1 = fs.readFileSync(r_pathfile_1);
let r_lines_1 = raw_data_1.toString().split(expr_linebreak);
console.log("r_lines_1 : " + r_lines_1.length);

let date = "23/02/20";
let date_old = "";
let date_index = -1;

let IT_accum = 0;

// for (let i = 1; i < r_lines_1.length; i++) {
for (let i = 1; i < r_lines_1.length; i++) {
  let line_arr = r_lines_1[i].split(",");
  let date_ori = line_arr.shift();
  let date_new = dateConvert(date_ori);
  // console.log("date_new : " + date_new);
  if (date_new !== date) {
    if (i > 1) {
      w_obj["Italy"][date_index] = IT_accum;
      // console.log(date_index + " : " + date);
      IT_accum = 0;
    }
    date = date_new;
    date_index++;
    date_arr[date_index] = date;
    // console.log(date_index + " : " + date);
  }

  let name = line_arr[2];
  let val = parseInt(line_arr[13]);

  IT_accum += val;

  if (name == "P.A. Bolzano" || name == "P.A. Trento") {
    if (w_obj["Trentino-Alto Adige"][date_index] === undefined) {
      w_obj["Trentino-Alto Adige"][date_index] = 0;
    }
    w_obj["Trentino-Alto Adige"][date_index] += val;
  } else if (name == "Friuli Venezia Giulia") {
    w_obj["Friuli-Venezia Giulia"][date_index] = val;
  } else {
    w_obj[name][date_index] = val;
  }
}

w_obj["Italy"][date_index] = IT_accum;

let w_data_1 = "name,";
w_data_1 += date_arr.slice(0, date_index + 1);

for (let i = 0; i < reg_arr.length; i++) {
  let name = reg_arr[i];
  let ISO = r_obj_2[name].ISO;
  console.log(ISO + " : " + ISO);
  let w_arr = w_obj[reg_arr[i]].slice(0, date_index + 1);
  // console.log(name + " : " + w_arr);
  let w_line = ISO + "," + w_arr.toString();
  // let w_line = name + "," + w_arr.toString();
  w_data_1 += "\n" + w_line;
}

fs.writeFileSync(w_pathfile_1, w_data_1);

console.log("___ end");

function dateConvert(de) {
  let date_arr_1 = de.split("T");
  let date_arr_2 = date_arr_1[0].split("-");
  let date_str = date_arr_2[2] + "/" + date_arr_2[1] + "/20";
  return date_str;
}
