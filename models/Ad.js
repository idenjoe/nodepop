"use strict";

var mongoose = require('mongoose');


//define the scheme

var adSchema =  mongoose.Schema({
    name: String,
    onSale: Boolean,
    price: Number,
    photo: String,
    tags : [String]
});

// export the scheme

var Ad = mongoose.model('Ad',adSchema);

module.exports = Ad;