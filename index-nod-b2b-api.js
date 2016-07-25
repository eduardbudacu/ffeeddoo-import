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
//var req = require('./req.js');
var req = require('./lib/b2bClient.js');
program.parse(process.argv);

var apiEndpoint = 'https://api.b2b-stg.nod.ro/';

req.makeRequest(); //make the request

var getHeaders = function() {

}
