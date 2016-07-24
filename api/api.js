var bodyParser = require('body-parser');
var config = require('./services/config');
var cors = require('./services/cors');
var createAndSendToken = require('./services/jwt');
var emailVerification = require('./services/emailVerification');
var express = require('express');
var facebookAuth = require('./services/facebookAuth');
var googleAuth = require('./services/googleAuth');
var jobs = require('./services/jobs');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('./services/localStrategy');


var app = express();
app.use(bodyParser.json());
app.use(cors); // enable CORS for this server
// PASSPORT config
app.use(passport.initialize());
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.use('local-register', LocalStrategy.register);
passport.use('local-login', LocalStrategy.login);


// ROUTES
app.post('/register', passport.authenticate('local-register'), function (req, res) {
    emailVerification.send(req.user.username, res);
    createAndSendToken(req.user, req.hostname, res);
});
app.post('/login', passport.authenticate('local-login'), function (req, res) {
    createAndSendToken(req.user, req.hostname, res);
});
app.post('/auth/facebook', facebookAuth);
app.post('/auth/google', googleAuth);
app.get('/auth/verifyEmail', emailVerification.handler);
// secured resource
app.get('/jobs', jobs);


// Connect to Mongoose and Start server
mongoose.connect('mongodb://localhost/psjwt');
var server = app.listen(config.SERVER_PORT, function () {
    console.log('api listening on ', server.address().port);
});
