const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
// =======================================
//              MODELS and SEED Const
// =======================================
const profile = require('../models/app.js');
const profileSeed = require('../models/seed.js');


// =======================================
//              SEED
// =======================================
// profile.create(profileSeed, (err, data) => {
//   if (err) console.log(err.message)
//   console.log(`added provided profiles data`)
// })


// =======================================
//              ROUTES
// =======================================
// =======================================
//              NEW (ALWAYS ON TOP)
// =======================================


// =======================================
//              DELETE
// =======================================


// =======================================
//              HOME
// =======================================
router.get(`/`, (req, res)=> {
    profile.find({}, (error, profileList)=> {
        if (error) console.log('error')
      res.render(`index.ejs`, 
      {
        profileIndex: profileList
      });
    });
  });

// =======================================
//              EDIT
// =======================================


// =======================================
//              SHOW
// =======================================

module.exports = router;
