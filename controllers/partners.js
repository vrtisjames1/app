const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { db } = require("../models/app.js");


// =======================================
//              MODELS and SEED Const
// =======================================
const profile = require('../models/app.js');
const { indexOf } = require("../models/seed.js");
const profileSeed = require('../models/seed.js');


// =======================================
// =======================================
//              EDIT Partners
// =======================================
// =======================================
router.get(`/`, (req, res)=> {
    profile.find({}, (error, profileList)=> {
        if (error) console.log('error')
      res.render(`newsanta.ejs`, 
      {
        profileIndex: profileList
      });
    });
  });
  
  router.put('/:id', (req, res)=>{  
    profile.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
      res.redirect(`/partners`);
        // res.redirect(`/home`);
    });
  });

  module.exports = router;