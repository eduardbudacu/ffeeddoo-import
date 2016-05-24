'use strict';

module.exports = {
	getHeaders: function() {
		var headers = [];
		headers['Date'] = new Date(UTC).forma;
		headers['X-NodWS-User'] = 'abc';
		headers['X-NodWS-Accept'] = 'json';
		headers['X-NodWS-Auth'] = 'asdas';
		return headers;
	}
	
}