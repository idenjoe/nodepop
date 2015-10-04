"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Ad = mongoose.model('Ad'); //

router.get('/', function(req, res) {

    var criteria = {};
    if (req.query.name) {
        criteria.name = req.query.name;
    }

    Ad.list(criteria, function(err, list) {
        if (err) {
            console.log(err);
            return res.json({ok:false, error: err});
        }

        res.json({ok:true, data: list});

    });

});

router.post('/', function(req, res, next) {

    var newAd = req.body;

    var ad = new Ad(newAd);

    ad.save( function(err, created) {
        if (err) {
            console.log(err);
            return res.json({ok:false, error: err});
        }

        res.json({ok:true, ad: created});

    });

});

module.exports = router;