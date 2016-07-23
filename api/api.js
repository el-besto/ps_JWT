var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User');
var jwt = require('jwt-simple');

var app = express();

app.use(bodyParser.json());

// enable CORS for this server
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});

function createAndSendToken(user, req, res) {
    var payload = {
        iss: req.hostname,
        sub: user.id
    };

    var token = jwt.encode(payload, "temporarySecretKey");

    res.status(200).send({
        user: user.toJSON(),
        token: token
    });
}

app.post('/register', function (req, res) {
    var user = req.body;

    var newUser = new User.model({
        username: user.username,
        password: user.password
    });

    newUser.save(function (err) {
        createAndSendToken(newUser, req, res);
    });
});

app.post('/login', function (req, res) {
    req.user = req.body;
    var searchUser = {
        username: req.user.username
    };

    User.findOne(searchUser, function (err, foundUser) {
        if (err) { throw err; }
        if (!foundUser) {
            return res.status(401).send({
                message: 'Wrong username/password'
            });
        }
        foundUser.comparePasswords(req.user.password, function(err, isMatch) {
            if (err) { throw err; }
            if (!isMatch) {
                return res.status(401).send({
                    message: 'Wrong username/password'
                });
            }
            createAndSendToken(foundUser, req, res);
        });
    });
});

// securing an endpoint with jwt
var jobs = [
    'laundry',
    'trash',
    'yard work'
];
app.get('/jobs', function(req, res) {
    var token;
    var payload;
    if (!req.headers.authorization) {
        return res.status(401).send({
            message: 'You are not authorized'
        });
    }
    token = req.headers.authorization.split(' ')[1];
    payload = jwt.decode(token, "temporarySecretKey");

    if (!payload.sub) {
        res.status(401).send({
            message: 'You are not authorized.'
        });
    }

    res.json(jobs);
});

mongoose.connect('mongodb://localhost/psjwt');

var server = app.listen(3000, function () {
    console.log('api listening on ', server.address().port);
});
