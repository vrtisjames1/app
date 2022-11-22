// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv').config()



const app = express();
let PORT = 3000;
if(process.env.PORT){
	PORT = process.env.PORT
};
app.set('view engine', 'ejs');
// =======================================
//              Middleware
// =======================================
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
// end of body parser
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
app.use(methodOverride('_method'));
app.use(session({secret:process.env.SESSION_SECRET, saveUninitialized:false, resave:false}));// =======================================
// Must remain on bottom
// =======================================
const appRouter = require("./controllers/routes.js");
const appLogin = require("./controllers/login.js");
app.use("/home",appRouter);
app.use("/", appLogin);


// login routes


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
