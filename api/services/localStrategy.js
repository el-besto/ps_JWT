var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');

var strategyOptions = {
    usernameField: 'username'
};

exports.register = new LocalStrategy(strategyOptions, function (username, password, done) {
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

exports.login = new LocalStrategy(strategyOptions, function (username, password, done) {
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
