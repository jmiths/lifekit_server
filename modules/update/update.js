var EventEmitter = require('events').EventEmitter;
var utils = require('util');

const userinfo = require('../../models').userinfo;

function update() {
	EventEmitter.call(this);
}
utils.inherits(update,EventEmitter);

exports.update = function(req, res) {

    userinfo.findAll({
        where: {
            "access_token": req.query.accesstoken
        }
    })
    .then(userinfos => {
        var date = new Date();
        
        if(userinfos.length != 1) {
		    res.status(404).send("access token invalid");
        }
        else if(date.valueOf() > userinfos[0].dataValues.access_token_expiration.valueOf()) {
		    res.status(405).send("expired access token");
        }
        else {
            switch(req.params.type)
            {
            case "location":
                var locator = require('./location/location.js');
                var location = new locator();
                location.location(req, res, userinfos[0]);
                break;
            default:
                res.sendStatus(404);
                break;
            }
        }
    })
    .catch((error) => {
		res.status(405).send("fail");
    });
};

