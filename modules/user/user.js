var EventEmitter = require('events').EventEmitter;
var utils = require('util');
var Expirable = require('expirable');
var cache = new Expirable('5 minutes');

/*
This doesn't actually work, but as long as you don't access data within cache time it will invalidate
cache.on('key:removed', function (expired) {
    console.log('A key was removed');
});
*/
function emergency() {
    EventEmitter.call(this);
}
utils.inherits(emergency,EventEmitter);

exports.user = function(req, res) {
    switch(req.params.type)
    {
    case "signup":
        var signuper = require('./signup/signup.js');
        var signup = new signuper();
        signup.once('signup',function(rcode) {
            res.status(rcode);
        });
        res.send(signup.signup(req, cache));
        break;
    case "validate":
        var validater = require('./validate/validate.js');
        var validate = new validater();
        validate.once('validate',function(refresh_token) {
            if(refresh_token == null)
                res.status(400).send('Bad!');
            else
                    res.send(refresh_token);
            });
        validate.validate(req, cache);
        break;
    case "signin":
        var signiner = require('./signin/signin.js');
        var signin = new signiner();
        signin.once('signin',function(access_token) {
            if(access_token == null)
                res.status(400).send('Not signed in correctly');
            else
                res.send(access_token);
        });
        signin.signin(req,res);
        break;
    default:
        res.sendStatus(404);
        break;
    }
};
