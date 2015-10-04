"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var config  = require('../../config/config');

router.post('/', function(req, res) {
    var criteria = {};

    if (req.body.email ) {
        criteria.email = req.body.email;
    }

    if (req.body.password ) {
        criteria.password = req.body.password;
    }

    User.getUser(criteria, function(err, user) {

        if (user == null) {
            res.json({ok: false, mensaje: 'Not autheticated'});
        }
        else {
            var token = jwt.sign(user, config.jwt.secret, {
                expiresInMinutes: config.jwt.expiresInMinutes
            });

            res.json({ok: true, token: token});
        }
    });
});

module.exports = router;