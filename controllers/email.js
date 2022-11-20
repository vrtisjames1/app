const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

// added by me
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
// end of added

const profile = require('../models/app.js');
// =======================================
//              EMAIL
// =======================================
router.get(`/email`, (req, res)=> {
    profile.find({}, (error, profileList)=> {
        if (error) console.log('error')
      res.render(`email.ejs`, 
      {
        profileIndex: profileList
      });
    });
  });
  
  router.post('/email', (req, res)=>{
  console.log(req.body);
  });

  module.exports = router;

 