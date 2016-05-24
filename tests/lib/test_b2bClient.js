'use strict';

var test = require('tape');
var b2bClient = require('../../lib/b2bClient.js');

test('b2b api wrapper', function(t) {	
	t.test('get headers', function(t) {
		var headers = b2bClient.getHeaders();
		console.log(headers);
		t.notEqual(headers.length, 0);
		t.end();
	});
});