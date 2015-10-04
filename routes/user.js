"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = mongoose.model('User');

router.get('/', function(req, res, next){
    res.send('respond with a resource');
});

router.post('/', function(req, res, next){
    var user = new User({name: 'José Manuel', email: 'idenjoe@idenjoe.es', password: '123456'});

    user.save(function(err, created){
        if (err) {
            console.log(err);
            return next(err);
        }

        console.log(created);
    });

    res.send('respond with a resource');
});

module.exports = router;