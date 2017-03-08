var EventEmitter = require('events').EventEmitter;
var utils = require('util');

function start() {
	EventEmitter.call(this);
}
utils.inherits(start,EventEmitter);

start.prototype.start = function() {
	/* DB code to start an emergency, as in just add an emergency to the table and return an emergency ID */
	/* Gets both location and access token for user who started */
	return "I am so started";
}

module.exports = start;
