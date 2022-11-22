const mongoose = require('mongoose');
const Schema = mongoose.Schema; // create a shorthand for the mongoose Schema constructor

let usersSchema = new Schema({
    email: {type:String, require:true},
    pwd: {type:String, require:true},
    entryDate: {type:Date, default:Date.now}
});


const users = mongoose.model('users', usersSchema);

//make this exportable to be accessed in `app.js`
module.exports = users;