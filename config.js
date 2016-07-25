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

var config = {};

config.userApi = "8695dbb59b48077ec4693739717a33d4";
config.keyApi = "92cc0a43d2469cb3e21d3da3126270c346595fab";
config.host = "https://api.b2b-stg.nod.ro";
config.X_NodWS_User = "8695dbb59b48077ec4693739717a33d4";

module.exports = config;