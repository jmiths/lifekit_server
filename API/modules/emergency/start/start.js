const emergency = require('../../../models').emergency;

function start() {
}

start.prototype.start = function(req, res, userid) {
    console.log(req.body);

    emergency.create({
        "userid": userid,
        "user_nickname" : req.body.user_nickname,
        "status": 0,
        "emergency_lat": req.body.lat,
        "emergency_lng": req.body.lng,
        "emergency_address": req.body.address,
        "started_at": new Date()
    })
    .then((emer) => {
	    res.status(200).send({"status": "200","result":emer.emergencyid});
    })
    .catch((error) => {
		res.status(400).send({"status": "400","result":"failed to create emergency"});
    })
}

module.exports = start;
