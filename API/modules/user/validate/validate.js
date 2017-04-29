var crypto = require('crypto');
const userinfo = require('../../../models').userinfo;


function validate() {
}

validate.prototype.validate = function(req,res,cache) {
    var number = req.query.phone;
    var code = req.query.code;
    var cache_code = cache.get(number,true);
    self = this;
    if(cache_code === code)
    {
        var refreshToken = null;
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
                res.status(200).send({"status":"200","result":refreshToken});
            })
            .catch((error) => {
                res.status(400).send({"status":"400","result":"Could not validate"});
            })
        });
    }
    else
    {
        res.status(400).send({"status":"400","result":"Wrong code"});
    }
}

module.exports = validate;
