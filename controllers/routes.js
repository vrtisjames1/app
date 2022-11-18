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
  if(req.body.spouse == ``){
    req.body.spouse = `none`
  }
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
//              SANTA
// =======================================
router.get(`/santa`, (req, res)=> {
  profile.find({}, (error, profileList)=> {
      if (error) console.log('error')
    res.render(`santa.ejs`, 
    {
      profileIndex: profileList
    });
  });
});
// =======================================
//              RESULTS
// =======================================
router.get(`/santa/results`, (req, res)=> {
  profile.find({}, (error, profileList)=> {

//////////
////array of names

let matchArray = null;
let nameArray = null;
let quit = null;

const array = [] 
for (let i = 0; i < profileList.length; i++) { 
array.push({name: profileList[i].name,spouse: profileList[i].spouse})
  }

  res.locals.array = array;
  console.log(array)

const start = () =>{
  nameArray = []
  for (let i = 0; i < profileList.length; i++) { 
    nameArray.push(array[i].name)
   }

///match array
matchArray = []
  for (let i = 0; i < profileList.length; i++) { 
  matchArray.push(array[i].name)
  }
}

start();

const partners = () =>{
quit = 0;

////////////////////
  for (let i = 0; i < profileList.length; i++) { 
     while((matchArray[i] === array[i].name) || (matchArray[i] === array[i].spouse)){
      quit ++
      let num = null;
      
      num = Math.floor(Math.random()* nameArray.length);

      matchArray[i] = nameArray[num];
    
      console.log(matchArray)

      if (quit === 20){
        return;
      }
      }
      nameArray.splice(nameArray.indexOf((matchArray[i])), 1)
    }
  } 

  
partners();

let results = null;

if ((matchArray[profileList.length - 1] == array[profileList.length - 1].name) || (matchArray[profileList.length - 1] == array[profileList.length - 1].spouse))
{
  results = "Draw Again";
} else {
  results = "Congrats the name has been decided"
}

res.locals.results = results;

 ///////////////
 //////render
    res.render(`results.ejs`, 
    {
      profileIndex: profileList,
      myArray: array,
      myResults: results
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

router.put('/:id', (req, res)=>{  
  req.body.wishList = req.body.wishList.split(",")
  profile.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
      res.redirect(`/`);
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



module.exports = router;
