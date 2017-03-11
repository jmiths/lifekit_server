var EventEmitter = require('events').EventEmitter;
var utils = require('util');

const userinfo = require('../../models').userinfo;

function emergency() {
	EventEmitter.call(this);
}
utils.inherits(emergency,EventEmitter);

exports.emergency = function(req, res) {

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
            var path = req.route.path;
            if(path == "/emergency/:type" && (req.params.type != "start" && req.params.type != "end")) {
                path = "/emergency/" + req.params.type;
            }
            switch(path)
            {
            case "/emergency/start":
                var starter = require('./start/start.js');
                var start = new starter();
                start.start(req, res, userinfos[0].dataValues.userid);
                break;
            case "/emergency/onduty":
                var duty = require('./onduty/onduty.js');
                var onduty = new duty();
                onduty.onduty(req, res);
                break;
            case "/emergency/status":
                var state = require('./status/status.js');
                var status = new state();
                status.status(req, res);
                break;
            case "/emergency/end":
                var ender = require('./end/end.js');
                var end = new ender();
                end.end(req, res);
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

