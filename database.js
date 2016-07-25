#!/usr/bin/env node
'use strict';
var mongodb = require('mongodb');
var storeProducts = function (JSONobjects) {
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/ffeeddoo'; // set database name (FORMAT: mongodb://localhost:27017/DATABASE_NAME )

    MongoClient.connect(url, function (err, db) { //connect to the database
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {
            //TODO -> drop the database / update the products
            console.log('Connection established to', url);
            db.collection('ffeeddoo').drop(); // delete the products
            db.collection('ffeeddoo').insert(JSONobjects); // insert products
            db.close();
        }
    })
}

module.exports.storeProducts = storeProducts;