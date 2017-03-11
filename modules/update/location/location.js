var EventEmitter = require('events').EventEmitter;
var utils = require('util');

function location() {
	EventEmitter.call(this);
}
utils.inherits(location,EventEmitter);

location.prototype.location = function(req, res, userinfo) {
    
    userinfo.update({
        "last_lat": req.body.lat,
        "last_lng": req.body.lng
    })
    .then(() => {
		res.status(200).send("updated location");
    })
    .catch((error) => {
		res.status(400).send("failed to update location");
    })
}

module.exports = location;
