"use strict";

var mongoose = require('mongoose');


//define the scheme

var userSchema =  mongoose.Schema({
    name: String,
    email: String,
    password: String,
    pushtoken: String
});

userSchema.index({'email':1},{ unique: true });
userSchema.index({'token':1});

userSchema.statics.getUser = function( criteria, callback) {

    if(criteria!==null){
        var query = User.findOne(criteria);

        query.exec( function(err, rows) {
            if (err) {
                return callback(err);
            }

            return callback(null, rows);

        });

    } else {return callback('Not verified', 'no data'); }



};



var User = mongoose.model('User',userSchema);

module.exports = User;