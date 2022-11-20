const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { db } = require("../models/app.js");
// added by me
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const nodemailer = require('nodemailer')
// end of added

// =======================================
//              MODELS and SEED Const
// =======================================
const profile = require('../models/app.js');

const { indexOf } = require("../models/seed.js");
const profileSeed = require('../models/seed.js');
const { match } = require("minimatch");
const { append } = require("vary");

// ARRAY FOR GENERATING SECRET SANTA PARTNERS
let matchArray = [];
let array = [];
// =======================================
//              SEED
// =======================================
// profile.create(profileSeed, (err, data) => {
//   if (err) console.log(err.message)
//   console.log(`added provided profiles data`)
// })

// onoff.create(buttonSeed, (err, data) => {
//   if (err) console.log(err.message)
//   console.log(`added provided button data`)
// })


// =======================================
//              ROUTES
// =======================================
// =======================================
//              EMAIL
// =======================================
router.get(`/email`, (req, res)=> {
  profile.find({}, (error, profileList)=> {
    console.log(array)
      if (error) console.log('error')
    res.render(`email.ejs`, 
    {
      profileIndex: profileList
    });
  });
});

router.post('/send', (req, res)=>{
  ////////////
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'secretsantaclause1235@gmail.com',
      pass: 'ymbu doyk mkyr refg' // naturally, replace both with your real credentials or an application-specific password
    }
  });
 array;
 let mailOptions = null;
 for (let i = 0 ; i < array.length ; i++ ){
  if (array[i].email == req.body.email){
    mailOptions = {
      from: `secretsantaclause1235@gmail.com`,
      to: `${req.body.email}`,
      subject: `Secret Santa Results`,
      text: `${array[i].name} you will be buying a gift for ${array[i].partner}`
    };
  }
 }

  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
    res.redirect(`/email`);
});
});


// =======================================
//              NEW (ALWAYS ON TOP)
// =======================================

router.get(`/new`, (req, res)=> {
  profile.find({}, (error, profileList)=> {

      if (error) console.log('error')
    res.render(`new.ejs`, 
    {
      profileIndex: profileList
    });
  });
});


router.post('/', (req, res)=>{
  req.body.wishList = req.body.wishList.split(",")
  if(req.body.spouse == "" ){
    req.body.spouse = "none";
      }
      if(req.body.image == "" ){
      req.body.image = "https://i.imgur.com/tdi3NGa.png";
      }
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



router.get(`/results`, (req, res)=> {
  profile.find({}, (error, profileList)=> {

//////////
////array of names

let matchArray = null;
let nameArray = null;
let quit = null;

array = [] 
for (let i = 0; i < profileList.length; i++) { 
array.push({name: profileList[i].name.split(" ").join("").toLowerCase(),spouse: profileList[i].spouse.split(" ").join("").toLowerCase() ,email: profileList[i].email.split(" ").join(""), partner: null})
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
    
      // console.log(matchArray)

      if (quit === 50){
        return;
      }
      }
      array[i].partner = matchArray[i]
      console.log(array)
      nameArray.splice(nameArray.indexOf((matchArray[i])), 1)
    }
  } 

partners();

let results = null;


if ((matchArray[profileList.length - 1] == array[profileList.length - 1].name) || (matchArray[profileList.length - 1] == array[profileList.length - 1].spouse))
{
  results = "Draw Again";
} else {
  results = 'Congrats the name has been decided. Click "NEXT" to email results'
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
