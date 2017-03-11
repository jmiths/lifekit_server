const emergency = require('../../../models').emergency;

function onduty() {
}

onduty.prototype.onduty = function(req, res) {
    // TODO
    // return only near current emergency
    console.log(req.query.lat, req.query.lng);

    emergency.findAll({
        attributes: {
            exclude:["userid"]
        },
        where: {
            "status": 0
        }
    })
    .then(emergencies => {
        res.status(200).send(emergencies);
    })
    .catch((error) => {
		res.status(400).send("failed to get current emergencies");
    })
}

module.exports = onduty;

