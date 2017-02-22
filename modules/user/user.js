var EventEmitter = require('events').EventEmitter;
var utils = require('util');

function emergency() {
	EventEmitter.call(this);
}
utils.inherits(emergency,EventEmitter);

exports.user = function(req, res) {
	switch(req.params.type)
	{
	case "signin":
		var signer = require('./signin/signin.js');
		var signin = new signer();
		res.send(signin.signin());
		break;
	case "signup":
		var signer = require('./signup/signup.js');
		var signup = new signer();
		res.send(signup.signup());
		break;
	case "validate":
		var validater = require('./validate/validate.js');
		var validate = new validater();
		res.send(validate.validate());
		break;
	default:
		res.sendStatus(404);
		break;
	}
};
