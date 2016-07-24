var config = require('./config');
var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function createAndSendToken(user, hostname, res) {
    var payload = {
        iss: hostname,
        sub: user.id,
        exp: moment().add(10, 'days').unix()
    };
    var token = jwt.encode(payload, config.TOKEN_SECRET);

    res.status(200).send({
        user: user.toJSON(),
        token: token
    });
};
