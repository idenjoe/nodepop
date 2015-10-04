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


// List all Ads
adSchema.statics.list = function (criteria, cb) {
    var query = Ad.find(criteria.filtered);

    query.sort(criteria.sort || 'name');
    query.sort(criteria.sort || 'price');

    query.skip(criteria.start || 0);
    query.limit(criteria.limit || 4);

    query.exec(function (err, rows) {
        if (err) {
            return cb(err);
        }

        return cb(null, rows);

    });
};

// export the scheme

var Ad = mongoose.model('Ad',adSchema);

module.exports = Ad;