// We are using ES module and make sure you downloaded REST client extension
import express from 'express';
const app = express();

app.use(express.json());

//import environmental variable and save your credentials in .env
import dotenv from 'dotenv';
dotenv.config();

//import variable from CreatePDF.js
import {base64_result, Select_email, Select_name} from './CreatePDF2.js';


// campaign Monitor
import createsend from 'createsend-node';

//provide api
var auth = {apiKey : process.env.API_KEY}
var api = new createsend(auth);


//transactional email triggers

var details = {
    smartEmailID: process.env.TRANSACTIONAL_ID, // The ID of the transactional email
    To: Select_email,           // The email address to send it to
    Data: {"firstname": Select_name}, // Any data fields required for the email
    Attachments: [
      {
        "Content": base64_result,
        "Name": "Annual receipt.pdf",
        "Type": "application/pdf"
      }
    ]
  };

// 
// var message = {
//     to: 'YourEmail@emails.com',
//     from: 'MyEmail@emails.com',
//     subject: 'transactional email test',
//     text: 'this is your contents',
//     html: '<strong>this is your html contents</strong>'
// };

  // Send the smart email(and provide a callback function that takes an error and a response parameter)
  api.transactional.sendSmartEmail(details, (err, res) => {
    if (err)  console.log(err);
  });



  //find smart email listing

app.get('https://api.createsend.com/api/v3.3/transactional/smartEmail?status=all&clientID=${process.env.CLIENT_ID}', function (req, res) {
  if (err) console.log(err);
});

