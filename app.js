//import xlsx library to import excel sheets
//Please make sure you indicate the Main column to contain all their personal details
//Please make sure the excel date format is converted into "dd/mm/yyyy"

// comment: require is not defined in ES module scope, you can use import instead
// var XLSX = require("xlsx");
import * as XLSX from "./node_modules/xlsx/xlsx.mjs";

/* load 'fs' for readFile and writeFile support */
import * as fs from "fs";
XLSX.set_fs(fs);

var workbook = XLSX.readFile("./1234.xlsx");
var worksheet = workbook.Sheets["Sheet1"];

//convert xlsx to JSON
const data = XLSX.utils.sheet_to_json(worksheet, { raw: true });

//Pull out dynamic values and declare each class

//Create a Client object
const Client = class {
  constructor(
    EntityID,
    Organisation,
    FirstName,
    LastName,
    Address,
    Postcode,
    Email,
    Phone,
    City,
    Country
  ) {
    this.EntityID = EntityID;
    this.Organisation = Organisation;
    this.FullName = FullName;
    this.Address = Address;
    this.Postcode = Postcode;
    this.Email = Email;
    this.Phone = Phone;
    this.City = City;
    this.Country = Country
  }
};

//collect personal details per individuals
for (const key in data) {
  if (data[key].Main == true) {
    Client.EntityID = data[key].EntityID;
    Client.FullName = data[key].Full;
    Client.Email = data[key].Email;
    if(data[key].Organisation != undefined){
      Client.Organisation = data[key].Organisation;
    }
    else{
      Client.Organisation = "";
    }

    if(data[key].Address != undefined){
      Client.Address = data[key].Address;
    }
    else{
      Client.Address = "";
    }

    if(data[key].Postcode != undefined){
      Client.Postcode = data[key].Postcode;
    }
    else{
      Client.Postcode = "";
    }
    
    if(data[key].Phone != undefined){
      Client.Phone = data[key].Phone;
    }
    else{
      Client.Phone = "N/A";
    }
    
    if(data[key].City != undefined){
      Client.City = data[key].City;
    }
    else{
      Client.City = "";
    }

    if(data[key].Country != undefined){
      Client.Country = data[key].Country;
    }
    else{
      Client.Country = "";
    }
  }
}

//Create JSON objects to collect yearly payment info

var JSONObj = [];

for (const key in data) {
  let item = {};
  let descriptionString = "Donation";
  for (const i in data[key]) {
    if (i == "PayDate") {
      // dates.push(data[key].PayDate);
      descriptionString += `, ${data[key].PayDate}`;
    }
    if (i == "PayAmount") {
      // payments.push(data[key].PayAmount);
      item["price"] = data[key].PayAmount;
      item["quantity"] = 1;
    }
    if (i == "PayType") {
      // types.push(data[key].PayType);
      descriptionString += `, ${data[key].PayType}`;
    }
  }
  item["description"] = descriptionString;
  JSONObj.push(item);
}

///Export your objects
export { Client, JSONObj};

