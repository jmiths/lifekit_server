const assister = require('../../../models').assister;

function comment() {
}

comment.prototype.comment = function(req, res, userid) {
    assister.findAll({
        where: {
            "userid": userid,
            "emergencyid": req.body.emergencyid
        }
    })
    .then(assisters => {
        assisters[0].update({
            "com": req.body.comment
        })
        .then(() => {
            res.status(200).send("Comment recorded");
        })
        .catch((error) => {
            res.status(400).send("Could not add comment");
        });
    })
    .catch(error => {
        res.status(400).send("nothing found");
    });
}

module.exports = comment;
