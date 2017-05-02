const emergency = require('../../../models').emergency;
const assister = require('../../../models').assister;

function onduty() {
}

onduty.prototype.onduty = function(req, res, userid) {
    // TODO
    // return only near current emergency
    console.log(req.query.lat, req.query.lng);

    var previous_emergencies = [];
    assister.findAll({
        attributes: ['emergencyid'],
        where: {
            $and: [
                {"userid" : userid},
                {"com": {
                    $not: null
                    }
                }
            ]
        }
    })
    .then((emergencies) => {
        for(var i = 0; i < emergencies.length; i++)
            previous_emergencies.push(emergencies[i].dataValues.emergencyid);
        emergency.findAll({
            attributes: {
                exclude:["userid"]
            },
            where: {
                $and: [
                    { "status": 0 },
                    { "emergencyid": {
                        $not: previous_emergencies
                        }
                    }
                ]
            }
        })
        .then(send_emergency => {
            res.status(200).send({"status":"200","result":send_emergency});
        })
        .catch((error) => {
		    res.status(400).send({"status":"200","result":"failed to get current emergencies"});
        })
    })
    .catch((error) => {
        res.status(400).send({"status":"400","result":"could not find emergencies"});
    })
    console.log(previous_emergencies);

}

module.exports = onduty;
