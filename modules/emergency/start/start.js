var EventEmitter = require('events').EventEmitter;
var utils = require('util');

const emergency = require('../../../models').emergency;

function start() {
	EventEmitter.call(this);
}
utils.inherits(start,EventEmitter);

start.prototype.start = function(req, res, userid) {

    emergency.create({
        "userid": userid,
        "status": 0,
        "emergency_lat": req.body.lat,
        "emergency_lng": req.body.lng,
        "emergency_address": req.body.address,
        "started_at": new Date()
    })
    .then((emer) => {
	    res.status(200).send({"emergencyid":emer.emergencyid});
    })
    .catch((error) => {
		res.status(400).send("failed to create emergency");
    })
}

module.exports = start;
