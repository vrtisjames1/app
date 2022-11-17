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
  req.body.wishList = req.body.wishList.split(",")
profile.create(req.body, ()=>{
  res.redirect("/");
});
});


// =======================================
//              DELETE
// =======================================
router.delete('/:id', (req, res)=>{
  profile.findByIdAndRemove(req.params.id, (err, data)=>{
      res.redirect('/');//redirect back to fruits index
  });
});

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
router.get('/:id/edit', (req, res)=>{
  profile.findById(req.params.id, (err, foundProfile)=>{ 
      res.render(
      'edit.ejs',
      {
        profileIndex: foundProfile
      }
    );
  });
});

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

router.put('/:id', (req, res)=>{
  req.body.wishList = req.body.wishList.split(",")
  profile.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
      res.redirect(`/`);
  });
});

module.exports = router;
