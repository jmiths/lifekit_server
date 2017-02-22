var EventEmitter = require('events').EventEmitter;
var utils = require('util');

function update() {
	EventEmitter.call(this);
}
utils.inherits(update,EventEmitter);

exports.update = function(req, res) {
	console.log(req.params.type);
	switch(req.params.type)
	{
	case "location":
		var locator = require('./location/location.js');
		var location = new locator();
		res.send(location.location());
		break;
	default:
		res.sendStatus(404);
		break;
	}
};
