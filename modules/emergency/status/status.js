var EventEmitter = require('events').EventEmitter;
var utils = require('util');

function status() {
	EventEmitter.call(this);
}
utils.inherits(status,EventEmitter);

status.prototype.status = function() {
	return "Sup?";
}

module.exports = status;
