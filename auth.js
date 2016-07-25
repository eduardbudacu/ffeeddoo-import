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
var now = moment(new Date()); // get actual date
var config = require("./config.js");


var auth = {};

auth.path = "products/full-feed/";
auth.HTTPverb = "GET";
auth.X_NodWS_Accept = "json";
auth.date = now.format("ddd, DD MMM YYYY HH:mm:ss ZZ",true);
auth.signature_string = auth.HTTPverb.concat(auth.path,config.X_NodWS_User,auth.date);
auth.X_NodWS_Auth = hmacsha1(config.keyApi,auth.signature_string);
auth.options = { //options for http request
    hostname: "api.b2b-stg.nod.ro",
    "rejectUnauthorized": false,
    uri: "api.b2b-stg.nod.ro",
    method: "GET",
    path: "/products/full-feed",
    headers: {
        "Date": auth.date,
        "X-NodWS-auth"  : auth.X_NodWS_Auth,
        "X-NodWS-User"  : config.X_NodWS_User,
        "X-NodWS-Accept": auth.X_NodWS_Accept

    }
};
module.exports = auth;