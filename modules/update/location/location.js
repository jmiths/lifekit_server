var EventEmitter = require('events').EventEmitter;
var utils = require('util');

function location() {
	EventEmitter.call(this);
}
utils.inherits(location,EventEmitter);

location.prototype.location = function() {
	return "Find me please";
}

module.exports = location;
