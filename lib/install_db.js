var async   = require('async');
var dbMongo = require('../lib/dbMongo');
var mongoose= require('mongoose');
var fs = require('fs');
var adsJSON = JSON.parse(fs.readFileSync('data/ads_data.json', 'utf8'));
var usersJSON = JSON.parse(fs.readFileSync('data/users_data.json','utf8'));

require('../models/Ad');
require('../models/User');

function initializeDB() {

    async.series([

            function (cb) {
                initGenericModel("User",usersJSON,cb)
            },

            function (cb) {
                initGenericModel("Ad",adsJSON,cb)
            }

        ], function (err, results) {
            if (err) {
                console.error('error: ', err);

                return process.exit(1);
            }
            return process.exit(0);
        }
    );
}

function initGenericModel(genericModel,objects,callback){

    var GenericModel  = mongoose.model(genericModel);
    GenericModel.remove({}, function(err,deleted){

        if (err)
            callback(err);
        console.log('Droped ' + genericModel + ' DB succesfully');
        // Create generic model objects
        GenericModel.create(objects,function(err,genericObject) {
            if (err)
                return (err)

            console.log('Imported ' + genericModel + ' DB succesfully');
            return callback(null);
        });

    });

}


initializeDB();