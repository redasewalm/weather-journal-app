// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
//port number
const port = 3500;
const server = app.listen(port,listening);
function listening(){
    console.log(`running on localhost:${port}`);
}

// Initialize all route with a callback function
app.get('/all',getData);

 // Callback function to complete GET '/all'
 function getData(req , res) {
    res.send(projectData);
 }

 // POST route that adds incoming data to projectData
 app.post('/addData',postData);

 //postData function
function postData (req , res) {
     newData = {
        temperature : req.body.temperature,
        date : req.body.date,
        userResponse : req.body.userResponse,
     }
     projectData.push(newData);
     console.log(projectData);

 }