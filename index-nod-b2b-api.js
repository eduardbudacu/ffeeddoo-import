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
program.parse(process.argv);

var apiEndpoint = 'https://api.b2b-stg.nod.ro/';

var getHeaders = function() {

}

var userApi = "8695dbb59b48077ec4693739717a33d4"; // USER API
var keyApi = "92cc0a43d2469cb3e21d3da3126270c346595fab"; //KEY API
var host = "https://api.b2b-stg.nod.ro";
var X_NodWS_User = "8695dbb59b48077ec4693739717a33d4";
var path = "products/full-feed/"; // add / at the end (example : products/ , products/?count=40/) --- /full-feed -> for all products
var HTTPverb = "GET"; // request method
var X_NodWS_Accept = "json"; //response output format

var now = moment(new Date()); // get actual date

var date = now.format("ddd, DD MMM YYYY HH:mm:ss ZZ",true); // date -> Thu, 17 Aug 2011 14:52:54 GMT format

var signature_string = HTTPverb.concat(path,X_NodWS_User,date); //construct the signature string

//show signature_string
//console.log("Signature_string : " + signature_string);

//verify the date
//console.log(date);


var X_NodWS_Auth = hmacsha1(keyApi,signature_string); //constructing the hash for authentification


var options = { 	//options for http request
    hostname: "api.b2b-stg.nod.ro",
    "rejectUnauthorized": false,
    uri: "api.b2b-stg.nod.ro",
    method: "GET",
    path: "/products/full-feed",
    headers: {
        "Date": date,
        "X-NodWS-Auth"  : X_NodWS_Auth,
        "X-NodWS-User"  : X_NodWS_User,
        "X-NodWS-Accept": X_NodWS_Accept

    }
};



http.get(options, function(res) {
    var body = '';
    res.on('data', function(chunk) {
        body += chunk;
    });
    res.on('end', function() {
        for (header in res.headers) { //Response Headers
            var value = res.headers[header];
            console.log(header + ': ' + value);
        }
        //console.log("---------------------------------------------------");
        //console.log("BODY: " + body); //verifying the response
        //console.log("---------------------------------------------------");
        var objects = body.substring(body.indexOf('['),body.lastIndexOf(']')+1); // get only the products from the requests
        //console.log(objects); // verify the response
        JSONobject = JSON.parse(objects); // convert string to JSON

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