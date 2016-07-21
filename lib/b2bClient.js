'use strict';

var config = require('../config.js');
var http = require('http');
var mongodb = require('mongodb');

var makeRequest = function() {

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

}

module.exports.makeRequest = makeRequest;


