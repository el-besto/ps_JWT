var config = require('./config');
var createAndSendToken = require('./jwt');
var qs = require('querystring');
var request = require('request');
var User = require('../models/User');

module.exports = function (req, res) {
    var accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/me';
    var params = {
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        client_secret: config.FACEBOOK_SECRET,
        code: req.body.code
    };

    request.get({
        url: accessTokenUrl,
        qs: params
    }, function (err, response, accessToken) {
        accessToken = qs.parse(accessToken);
        
        request.get({
            url: graphApiUrl,
            qs: accessToken,
            json: true
        }, function (err, response, profile) {
            var newUser;

            User.findOne({ facebookId: profile.id }, function (err, existingUser) {
                if (existingUser) {
                    return createAndSendToken(existingUser, req.hostname, res);
                }
                newUser = new User();
                newUser.facebookId = profile.id;
                newUser.displayName = profile.name;
                newUser.save(function (err) {
                    return createAndSendToken(newUser, req.hostname, res);
                });
            });
        });
    });
};
