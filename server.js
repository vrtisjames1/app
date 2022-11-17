// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
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
app.listen(port, () => {
    console.log(`Movies app listening on port: ${port}`)
  });

mongoose.connect('mongodb://localhost:27017/Movies', () => {
  console.log('The connection with mongod is established')
});