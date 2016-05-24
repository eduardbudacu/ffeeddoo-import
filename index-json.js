#!/usr/bin/env node
'use strict';

var program = require('commander');
var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;

program.parse(process.argv);


var contents = fs.readFileSync(program.args[0]);
var jsonContent = JSON.parse(contents);

var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, function(err, db) {
	if(err) {
		console.log(err);
	} else {
		db.collection('products_nodb2b').insertMany(jsonContent['products'], function(err, r) {
		  console.log(err);
		  console.log(r.insertedCount);
		  db.close();
		});
	}
});