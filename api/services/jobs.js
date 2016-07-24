var config = require('./config');
var jwt = require('jwt-simple');
var jobs = [
    'laundry',
    'trash',
    'yard work'
];
module.exports = function(req, res) {
    var token;
    var payload;
    if (!req.headers.authorization) {
        return res.status(401).send({
            message: 'You are not authorized'
        });
    }
    token = req.headers.authorization.split(' ')[1];
    payload = jwt.decode(token, config.TOKEN_SECRET);

    if (!payload.sub) {
        res.status(401).send({
            message: 'You are not authorized.'
        });
    }

    res.json(jobs);
}
