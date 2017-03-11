var EventEmitter = require('events').EventEmitter;
var utils = require('util');

const emergency = require('../../../models').emergency;

function end() {
	EventEmitter.call(this);
}
utils.inherits(end,EventEmitter);

end.prototype.end = function(req, res) {
    emergency.findById(req.body.emergencyid)
    .then(emer => emer
        .update({
            "ended_at": new Date()
        })
        .then(() => {
	        res.status(200).send("updated emergency");
        })
        .catch((error) => {
		    res.status(400).send("failed to update emergency");
        })
    )
    .catch((error) => {
		res.status(400).send("failed to update emergency");
    })
}

module.exports = end;
