const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
// =======================================
//              MODELS and SEED Const
// =======================================
// const movie = require('../models/app.js');
// const movieSeed = require('../models/seed.js');


// =======================================
//              SEED
// =======================================
// movie.create(movieSeed, (err, data) => {
//   if (err) console.log(err.message)
//   console.log(`added provided movie data`)
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
    res.render(`index.ejs`)
});

// =======================================
//              EDIT
// =======================================


// =======================================
//              SHOW
// =======================================

module.exports = router;
