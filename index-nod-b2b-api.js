#!/usr/bin/env node
'use strict';

var program = require('commander');
var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;
var http = require('http'); // http module for request
var moment = require('moment'); //for date
var hmacsha1 = require('hmacsha1'); // for X_NodWS_Auth header
var request = require('request');
var gmdate = require('phpdate-js').gmdate;
var mongodb = require('mongodb'); // database
var config = require('./config.js');
program.parse(process.argv);

var apiEndpoint = 'https://api.b2b-stg.nod.ro/';

var getHeaders = function() {

}

http.get(config.options, function(res) {
    var body = '';
    res.on('data', function(chunk) {
        body += chunk;
    });
    res.on('end', function() {
        for (var header in res.headers) { //Response Headers
            var value = res.headers[header];
            console.log(header + ': ' + value);
        }
        //console.log("---------------------------------------------------");
        //console.log("BODY: " + body); //verifying the response
        //console.log("---------------------------------------------------");
        var objects = body.substring(body.indexOf('['),body.lastIndexOf(']')+1); // get only the products from the requests
        //console.log(objects); // verify the response
        var JSONobject = JSON.parse(objects); // convert string to JSON

        var MongoClient = mongodb.MongoClient;
        var url = 'mongodb://localhost:27017/ffeeddoo'; // set database name (FORMAT: mongodb://localhost:27017/DATABASE_NAME )

        //Working
        MongoClient.connect(url, function (err, db) { //connect to the database
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            }
            else {
                //TODO -> drop the database / update the products
                console.log('Connection established to', url);
                db.collection('ffeeddoo').drop(); // delete the products
                db.collection('ffeeddoo').insert(JSONobject); // insert products
                db.close();
            }
        })

    })


}).on('error', function(e) {
    console.log("Got error: " + e.message);
});
