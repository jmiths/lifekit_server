var EventEmitter = require('events').EventEmitter;
var utils = require('util');
var crypto = require('crypto');
const userinfo = require('../../../models').userinfo;


function validate() {
    EventEmitter.call(this);
}
utils.inherits(validate,EventEmitter);

validate.prototype.validate = function(req,cache) {
    var number = req.query.phone;
    var code = req.query.code;
    var cache_code = cache.get(number,true);
    self = this;
    if(cache_code === code)
    {
        var refreshToken = null;
        console.log("We need to do some sql for refresh token: ");
        crypto.randomBytes(32, function(err,buffer) {
            refreshToken = buffer.toString('hex');
            userinfo.create({
                "phone_number": number,
                "refresh_token": refreshToken,
                 "access_token": "",
                 "access_token_expiration": new Date(),
                 "last_location": ""
                
            })
            .then(() => {
                self.emit('validate',refreshToken);
            })
            .catch((error) => {
                self.emit("validate", null);
            })
        });
    }
    else
    {
        console.log("Wrong code try again");
        self.emit('validate',null);
    }
}

module.exports = validate;
