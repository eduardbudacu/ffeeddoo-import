#!/usr/bin/env node
'use strict';

var program = require('commander');
var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;

program.parse(process.argv);

var apiEndpoint = 'https://api.b2b-stg.nod.ro/';

var getHeaders = function() {
	
}