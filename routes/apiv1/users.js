var express = require('express');
var router  = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt     = require('jsonwebtoken');
var jwtAuth = require('../../lib/jwtAuth');

router.post('/', function(req, res, next) {
    if (!req.body.name)
        return next("Invalid credentials");

    if (!req.body.email)
        return next("Invalid credentials");

    if (!req.body.password)
        return next("Invalid credentials");

    User.findOne({email: req.body.email},function(err,data,cb){

        if (err) {
            console.log(err);
            return cb(err);
        }

        if (data==null){
            var newUser = new User({name: req.body.name, email: req.body.email, password: req.body.password});
            newUser.save(function (err, record) {
                if (err) {
                    return next(err);
                }
                return res.status(200).json({success:true, data:record});
            });
        }else{
            return res.status(409).json({success:false, data:null});
        }
    });
});

router.use(jwtAuth());

router.put('/', function(req, res, next) {
    User.findOne({email: req.body.email}, function (err, data, cb) {
        if (err){
            console.log(err);
            return cb(err);
        }

        if (data!=null) {
            data.name       = req.body.name || data.name;
            data.password   = req.body.password || data.password;
            data.email      = req.body.email || data.email;
            data.pushtoken  = req.body.pushtoken || data.pushtoken;


            data.save(function (err, record) {
                if (err) {
                    console.log(err);
                    return next(err);
                }

                return res.status(200).json({success:true, data:record});
            });
        }else{
            return res.status(409).json({success:false, data:null});
        }
    });
});

module.exports = router;
