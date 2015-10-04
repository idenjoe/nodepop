"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Ad = mongoose.model('Ad');

router.get('/', function(req, res, next){
    res.send('respond with a resource');
});

router.post('/', function(req, res, next){
    var ad = new Ad({name:'Ad1', onSale: false, price: 150, photo:'http://localhost:3000/images/ad/yoda.jpg' ,tags: ['yoda','Star Wars']});

    ad.save(function(err, created){
        if (err) {
            console.log(err);
            return next(err);
        }

        console.log(created);
    });

    res.send('respond with a resource');
});

module.exports = router;