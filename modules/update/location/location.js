var EventEmitter = require('events').EventEmitter;
var utils = require('util');

function location() {
	EventEmitter.call(this);
}
utils.inherits(location,EventEmitter);

location.prototype.location = function(req) {
	/*
		DB code to update location for access token
	*/
	return "Acknowledged";
}

module.exports = location;
