var EventEmitter = require('events').EventEmitter;
var utils = require('util');

function signup() {
	EventEmitter.call(this);
}
utils.inherits(signup,EventEmitter);

signup.prototype.signup = function() {
	return "Time to signup";
}

module.exports = signup;
