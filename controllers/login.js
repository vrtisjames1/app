const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { db } = require("../models/app.js");
// added by me
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const nodemailer = require('nodemailer')
// end of added
const bcrypt = require('bcrypt');
const users = require("../models/users.js");

router.get('/', (req, res) => {
  res.render(`login.ejs`);
});

router.get('/new-acct', (req, res) => {
  res.render('new-acct.ejs');
});

router.post('/', async(req, res) => {
  let email = req.body.emailInput;
  let pass = req.body.pwdInput;
  let loginSuccess = false;
  let sesh = req.session;
  sesh.loggedIn = false;

  // let users = users;
  let qry = {email:email};

  if (email != '' && pass != '') {
    // find account using email
    let usersResult = await users.findOne(qry).then( async(data) => {
      if (data) {
        // check if password matches
        let passResult = await bcrypt.compare(pass, data.pwd).then( (isMatch) => {
          if (isMatch) {
            // ok - set sessions
            sesh.loggedIn = true;
            loginSuccess = true;
          }
        });
      }
    });
  }

  if (loginSuccess === true) {
    res.redirect('/home');
  } else {
    res.render('login.ejs', {loggedIn:false, error:'Invalid Login!'});
  }
});


router.post('/new', async(req, res) => {
  let email = req.body.emailInput;
  let pass = req.body.pwdInput;

  if (email != '' && pass != '') {
    // let users = schemas.users;
    let qry = {email:email};

    let userSearch = await users.findOne(qry).then( async(data) => {
      if (!data) {
        // password encryption
        let saltRounds = 10;
        let passSalt = await bcrypt.genSalt(saltRounds, async(err, salt) => {
          let passHash = await bcrypt.hash(pass, salt, async(err, hash) => {
            let acct = {email:email, pwd:hash, level:'admin'};
            let newUser = new users(acct);
            let saveUser = await newUser.save();
          });
        });
      }
    });

    res.render('login.ejs', {title:'Login', loggedIn:false, error:'Please login with your new account'});
  } else {
    res.render('new-acct.ejs', {title:'New Account', loggedIn:false, error:'All fields are required. Please check and try again.'});
  }
});

module.exports = router;