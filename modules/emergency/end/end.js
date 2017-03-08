var EventEmitter = require('events').EventEmitter;
var utils = require('util');

function end() {
	EventEmitter.call(this);
}
utils.inherits(end,EventEmitter);

end.prototype.end = function() {
	/* DB query that takes an access token and emergency ID and finishes up */
	/* Assisters can comment on emergency after the emergency */
	return "Bye";
}

module.exports = end;
