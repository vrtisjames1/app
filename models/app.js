const mongoose = require('mongoose');
const Schema = mongoose.Schema; // create a shorthand for the mongoose Schema constructor


const profileSchema = new Schema({
    name: {type: String, unique: true},
    spouse: {type: String},
    image: String,
    wishList: [{type: String}],
    funFact: {type: String},
    favSong: {type: String},
    email: {type: String, unique: true},
    });

    const profile = mongoose.model('Profile', profileSchema);

    //make this exportable to be accessed in `app.js`
    module.exports = profile;