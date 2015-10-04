"use strict";

var mongoose = require('mongoose');


//define the scheme

var userSchema =  mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// export the scheme

var User = mongoose.model('User',userSchema);

module.exports = User;