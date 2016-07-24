var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');
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
var strategyOptions = {
    usernameField: 'username'
};
var registerStrategy = new LocalStrategy(strategyOptions, function (username, password, done) {
    var newUser;
    var searchUser = {
        username: username
    };
    User.findOne(searchUser, function (err, user) {
        if (err) { return done(err); }
        if (user) {
            return done(null, false, {
                message: 'Username already exists.'
            });
        }
        newUser = new User({
            username: username,
            password: password
        });

        newUser.save(function (err) {
            done(null, newUser);
        });
    });
});
var loginStrategy = new LocalStrategy(strategyOptions, function (username, password, done) {
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
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.use('local-register', registerStrategy);
passport.use('local-login', loginStrategy);

app.post('/register', passport.authenticate('local-register'), function (req, res) {
    createAndSendToken(req.user, req, res);
});
app.post('/login', passport.authenticate('local-login'), function (req, res) {
    createAndSendToken(req.user, req, res);
});
app.post('/auth/google', function (req, res, next) {
    var url = 'https://accounts.google.com/o/oauth2/token';
    var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    var googleClientSecret = 'someGoogleClientSecret';
    var params = {
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        code: req.body.code,
        grant_type: 'authorization_code',
        client_secret: googleClientSecret
    };

    request.post(url, {
        json: true,
        form: params
    }, function (err, response, token) {
        console.log(token);
        var accessToken = token.access_token;
        var headers = {
            Authorization: 'Bearer ' + accessToken
        };
        // get profile details from google
        request.get({
            url: apiUrl,
            headers: headers,
            json: true
        }, function (err, response, profile) {
            User.findOne({ googleId: profile.sub }, function (err, foundUser) {
                var newUser;
                if (foundUser) {
                    return createAndSendToken(foundUser, req, res);
                }
                newUser = new User();
                newUser.googleId = profile.sub;
                newUser.displayName = profile.name;
                newUser.save(function (err) {
                    if (err) { return next(err); }
                    createAndSendToken(newUser, req, res);
                });
            });
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
