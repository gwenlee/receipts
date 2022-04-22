//Create PDF Invoice
// comment: require is not defined in ES module scope, you can use import instead
import easyinvoice from 'easyinvoice';

//Bring File system to import/export files
import * as fs from 'fs';

//import variable from app.js
import {Client, JSONObj} from './app.js';

var products = JSON.stringify(JSONObj);
//"Cannot read property 'toString' of undefined"
var parsedProducts = JSON.parse(products);

var data = {
    // Customize enables you to provide your own templates
    // Please review the documentation for instructions and examples
    
    "customize": {
         "template": fs.readFileSync('Template.html', 'base64') // Must be base64 encoded html 
    },
    "images": {
        // The logo on top of your invoice
        "logo": "Enter the image link",
        // The invoice background
        "background": "Enter the background link"
    },
    // Your own data
    "sender": {
        "company": "Cpmpany Name",
        "address": "Company Address",
        "zip": "Company Postcode",
        "city": "Company City",
        "country": "Company Country",
        "custom1": "custom value 1",
        "custom2": "custom value 2",
        "custom3": "custom value 2"
    },
    // Your recipient
    "client": {
        "company": Client.Organisation,
        "address": Client.Address,
        "zip":  Client.Postcode,
        "city": Client.City,
        "country": Client.Country,
        "custom1": Client.EntityID,
        "custom2": Client.Phone,
        "custom3": Client.FullName
    },
    "information": {
        // Invoice number
        "number": "Enter your Invoice number",
        // Invoice date
        "date": "Enter the date issued",
        // Invoice due date
        "due-date": "Enter the due-date of invoice"
    },

    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    "products": parsedProducts,
    // The message you would like to display on the bottom of your invoice
    "bottom-notice": "Enter your notice message",
    // Settings to customize your invoice
    "settings": {
        "currency": "NZD", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
        // "tax-notation": "gst", // Defaults to 'vat'
        // "margin-top": 25, // Defaults to '25'
        // "margin-right": 25, // Defaults to '25'
        // "margin-left": 25, // Defaults to '25'
        // "margin-bottom": 25, // Defaults to '25'
        // "format": "A4" // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
    },
    // Translate your invoice to your preferred language
    "translate": {
        "invoice": "Annual Receipt",  // Default to 'INVOICE'
        // "number": "Nummer", // Defaults to 'Number'
        // "date": "Datum", // Default to 'Date'
        // "due-date": "Verloopdatum", // Defaults to 'Due Date'
        "subtotal": "Total", // Defaults to 'Subtotal'
        "products": "Payment Details", // Defaults to 'Products'
        "quantity": "Quantity", // Default to 'Quantity'
        "price": "Donation Amount", // Defaults to 'Price'
        "product-total": "Sub Total", // Defaults to 'Total'
        // "total": "Totaal" // Defaults to 'Total'
    },
};


// //To store the file locally
const result = await easyinvoice.createInvoice(data);
await fs.writeFileSync(`${Client.EntityID}.pdf`, result.pdf, 'base64');

// //Create your invoice! Easy!
// easyinvoice.createInvoice(data, async function (result) {
//     //The response will contain a base64 encoded PDF file
    
    
//     //Save the file in a local folder
//     await fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
// });


//Export the result
var base64_result = result.pdf;
var Select_email = Client.Email;
var Select_name = Client.FullName.split(" ")[0];

export {base64_result, Select_email, Select_name};
