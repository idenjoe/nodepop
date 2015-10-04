"use strict";

var mongoose = require('mongoose');

var db = mongoose.connection;

// Error conection handler
db.on('error', function(err) {
    console.log(err);
    process.exit(1);
});


// Connection handler

db.once('open', function() {
   console.log('Conected to MongoDB');
});

// Connect to the DB

mongoose.connect('mongodb://localhost/nodepop');

