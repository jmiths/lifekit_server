var EventEmitter = require('events').EventEmitter;
var utils = require('util');

function emergency() {
	EventEmitter.call(this);
}
utils.inherits(emergency,EventEmitter);

exports.emergency = function(req, res) {
	switch(req.params.type)
	{
	case "start":
		var starter = require('./start/start.js');
		var start = new starter();
		res.send(start.start());
		break;
	case "onduty":
		var duty = require('./onduty/onduty.js');
		var onduty = new duty();
		res.send(onduty.onduty());
		break;
	case "status":
		var state = require('./status/status.js');
		var status = new state();
		res.send(status.status());
		break;
	case "end":
		var ender = require('./end/end.js');
		var end = new ender();
		res.send(end.end());
		break;
	default:
		res.sendStatus(404);
		break;
	}
};
