"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Ad = mongoose.model('Ad'); //

router.get('/', function(req, res) {


    var criteria = {};
    criteria.filtered = {};
    if (req.query.nombre) {
        criteria.filtered.name = new RegExp('^' + req.query.nombre, "i");
    }

    if (req.query.venta) {
        criteria.filtered.onSale = req.query.venta;
    }

    if (req.query.tags){
        criteria.filtered.tags = req.query.tags;
    }

    if (req.query.precio){
        var pricesRange = req.query.precio.split('-');

        if ( req.query.precio.indexOf('-') == -1 ){
            criteria.filtered.price = {'$eq' : req.query.precio};
        }else if ( ( pricesRange[0] !== '' && !isNaN(pricesRange[0]) ) && ( pricesRange[1] !== '') && !isNaN(pricesRange[1]) ){
            criteria.filtered.price = {'$gte' : pricesRange[0], '$lte' : pricesRange[1]};
        }else if ( pricesRange[0] !== '' && !isNaN(pricesRange[0]) ){
            criteria.filtered.price = {'$gte' : pricesRange[0]};
        }else if ( pricesRange[1] !== '' && !isNaN(pricesRange[1]) ){
            criteria.filtered.price = {'$lte': pricesRange[1]};
        }
    }

    if (req.query.sort ) {
        criteria.sort =  req.query.sort;
    }

    criteria.start = parseInt(req.query.start) || 0;
    criteria.limit = parseInt(req.query.limit) || 4;

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