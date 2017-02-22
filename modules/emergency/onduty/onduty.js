var EventEmitter = require('events').EventEmitter;
var utils = require('util');

function onduty() {
	EventEmitter.call(this);
}
utils.inherits(onduty,EventEmitter);

onduty.prototype.onduty = function() {
	return "Here to serve";
}

module.exports = onduty;
