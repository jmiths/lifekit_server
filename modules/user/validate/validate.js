var EventEmitter = require('events').EventEmitter;
var utils = require('util');

function validate() {
	EventEmitter.call(this);
}
utils.inherits(validate,EventEmitter);

validate.prototype.validate = function() {
	return "Time to have people believe in me";
}

module.exports = validate;
