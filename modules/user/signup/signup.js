'use strict';

var EventEmitter = require('events').EventEmitter;
var utils = require('util');
var fs = require('fs');
var credentials = JSON.parse(fs.readFileSync('/root/.twilio_creds', 'UTF-8'));
var sendto = JSON.parse(fs.readFileSync('/root/.sendto', 'UTF-8'));


function signup(){
    EventEmitter.call(this);
}
utils.inherits(signup,EventEmitter);

function makeCode() {
	var high = 9999;
	var low = 0;
	var rand = Math.floor(Math.random() * (high - low + 1) + low);
	rand = rand.toString();
	while(rand.length < 4)
	{
		rand = "0" + rand;
	}
	return rand;
}

function getCodeForNum(phone,cache) {
	if(cache.has(phone))
		return cache.get(phone,true); // Will not update last used time
	else
	{
		var code = makeCode();
		cache.set(phone,code);
		return code;
	}
}

signup.prototype.signup = function(req,cache) {
	var accountSid = credentials.account_sid; // Your Account SID from www.twilio.com/console
	var authToken =  credentials.authToken;   // Your Auth Token from www.twilio.com/console
	var from = credentials.number;
	var to = req.query.phone;

	var code = getCodeForNum(req.query.phone,cache);


	var twilio = require('twilio');
	var client = new twilio.RestClient(accountSid, authToken);

	client.messages.create({
    		body: 'Verify code from lifekit: ' + code,
    		to: to,  // Text this number
    		from: from // From a valid Twilio number
	}, function(err, message) {
    		console.log(message,err);
	});

	return 200;
};

module.exports = signup;
