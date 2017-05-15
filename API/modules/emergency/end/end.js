const emergency = require('../../../models').emergency;

function end() {
}

end.prototype.end = function(req, res) {
    emergency.findById(req.body.emergencyid)
    .then(emer => {
        emer.update({
            "ended_at": new Date()
        })
        .then(() => {
	        res.status(200).send({"status": "200", "result": "updated emergency"});
        })
        .catch((error) => {
		    res.status(400).send({"status": "400", "result": "failed to update emergency"});
        })
    })
    .catch(error => {
		res.status(400).send({"status": "400", "result": "failed to update emergency"});
    })
}

module.exports = end;

