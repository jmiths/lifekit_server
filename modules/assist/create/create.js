const assister = require('../../../models').assister;

function create() {
}

create.prototype.create = function(req, res, userid) {
    assister.create({
        "userid": userid,
        "emergencyid": req.body.emergencyid,
        "response": req.body.response
    })
    .then(() => {
        res.status(200).send("Acknowledged");
    })
    .catch((error) => {
        res.status(400).send("Failed to add to emergency");
    })
}

module.exports = create;
