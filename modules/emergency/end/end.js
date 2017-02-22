var EventEmitter = require('events').EventEmitter;
var utils = require('util');

function end() {
	EventEmitter.call(this);
}
utils.inherits(end,EventEmitter);

end.prototype.end = function() {
	return "Bye";
}

module.exports = end;
