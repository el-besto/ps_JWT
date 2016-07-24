var config = require('./config');
var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function createAndSendToken(user, req, res) {
    var payload = {
        iss: req.hostname,
        sub: user.id,
        ext: moment().add(10, 'days').unix()
    };
    var token = jwt.encode(payload, config.TOKEN_SECRET);

    res.status(200).send({
        user: user.toJSON(),
        token: token
    });
};
