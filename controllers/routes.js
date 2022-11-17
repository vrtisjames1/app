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
router.get('/new', (req, res)=>{
  res.render('new.ejs');
});


router.post('/', (req, res)=>{
profile.create(req.body, ()=>{
  res.redirect("/");
});
});


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
router.get('/:id', (req, res)=>{
  profile.findById(req.params.id, (err, foundProfile)=>{ 
    res.render(
    'show.ejs',
    {
      profileIndex: foundProfile
    }
  );
});
});

module.exports = router;
