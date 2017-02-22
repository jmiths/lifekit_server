'use strict';

var EventEmitter = require('events').EventEmitter;
var utils = require('util');
var fs = require('fs');
var credentials = JSON.parse(fs.readFileSync('/root/.gmail_creds', 'UTF-8'));
var sendto = JSON.parse(fs.readFileSync('/root/.sendto', 'UTF-8'));


function signin(){
    EventEmitter.call(this);
}
utils.inherits(signin,EventEmitter);

const bunyan = require('bunyan');
const nodemailer = require('nodemailer');

signin.prototype.signin = function() {
	var creds = {
		user: credentials.user,
		pass: credentials.pass
	};

	let transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: creds,
		logger: bunyan.createLogger({
			name: 'nodemailer'
		}),
		debug: true
	});

	console.log('Mail ready');

	let message = {
		from: sendto.from,
		to: sendto.to,
		subject: 'Test message',
		text: 'Test'
	};

	console.log('Sending Mail');
	transporter.sendMail(message, (error, info) => {
    	if (error) {
        	console.log('Error occurred');
        	console.log(error.message);
        	return;
    	}
    	console.log('Message sent successfully!');
    	console.log('Server responded with "%s"', info.response);
    	transporter.close();
	});
};

module.exports = signin;
