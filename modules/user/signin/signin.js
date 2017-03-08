'use strict';
var EventEmitter = require('events').EventEmitter;
var utils = require('util');
var crypto = require('crypto');
const userinfo = require('../../../models').userinfo;

function signin(){
    EventEmitter.call(this);
}
utils.inherits(signin,EventEmitter);

signin.prototype.signin = function(req,res) {
    var phone = req.query.phone;
    var refresh = req.query.refreshtoken;
    var accessToken = null;
    userinfo.findAll({
        where: {
            "phone_number": phone
        }
    })
    .then(userinfos => {
        var self = this;
        if(userinfos.length != 1) {
            self.emit('signin', null);
        }
        else {
            var date = new Date(new Date().getTime() + 24*60*60*1000);
            console.log(date);
            crypto.randomBytes(32, function(err,buffer) {
                accessToken = buffer.toString('hex');
                userinfos[0].update({
                    "access_token": accessToken,
                    "access_token_expiration": date
                })
                .then(() => {
                    self.emit('signin',accessToken);
                })
                .catch((error) => {
                    self.emit("signin", null);
                })
            });
        }
    })
    .catch((error) => {
        self.emit("validate", null);
    })
}

module.exports = signin;
