var config = require('./config');
var createAndSendToken = require('./jwt');
var request = require('request');
var User = require('../models/User');

module.exports = function (req, res, next) {
    var url = 'https://accounts.google.com/o/oauth2/token';
    var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

    var params = {
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        code: req.body.code,
        grant_type: 'authorization_code',
        client_secret: config.GOOGLE_SECRET
    };

    request.post(url, {
        json: true,
        form: params
    }, function (err, response, token) {
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
};
