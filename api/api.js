var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/User');


var app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

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

// PASSPORT config
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
var strategy = new LocalStrategy({}, function (username, password, done) {
    var searchUser = {
        username: username
    };
    User.findOne(searchUser, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, {
                message: 'Wrong username/password'
            });
        }
        user.comparePasswords(password, function (err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) {
                return done(null, false, {
                    message: 'Wrong username/password'
                });
            }
            return done(null, user);
        });
    });
});
passport.use(strategy);

app.post('/register', function (req, res) {
    var user = req.body;

    var newUser = new User({
        username: user.username,
        password: user.password
    });

    newUser.save(function (err) {
        createAndSendToken(newUser, req, res);
    });
});

app.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (err) { next(err); }
        req.login(user, function (err) {
            if (err) { next(err); }
            createAndSendToken(user, req, res);
        });
    })(req, res, next);
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
