// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const mongoose = require('mongoose');

// added by me
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
// end of added

const app = express();
let PORT = 3000;
if(process.env.PORT){
	PORT = process.env.PORT
};

const bodyParser = require('body-parser');
//body parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
// end of body parser

const methodOverride = require('method-override');

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
app.use(methodOverride('_method'));

// =======================================
// Must remain on bottom
// =======================================
const appRouter = require("./controllers/routes.js");
app.use("/",appRouter);

// mongoose.connection.dropDatabase();

// =======================================
//  console log commands for listening 
//  and connectivity
// =======================================

mongoose.connect('mongodb+srv://vrtisjames:NZLKOh1gH62iZn0d@cluster0.ctjxurb.mongodb.net/?retryWrites=true&w=majority', () => {
  console.log('The connection with mongod is established')
});

app.listen(PORT, ()=>{
	console.log('listening...');
})
