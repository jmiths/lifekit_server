var EventEmitter = require('events').EventEmitter;
var utils = require('util');

function start() {
	EventEmitter.call(this);
}
utils.inherits(start,EventEmitter);

start.prototype.start = function() {
	return "I am so started";
}

module.exports = start;
