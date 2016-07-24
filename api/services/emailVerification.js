var _ = require('lodash');
var config = require('./config');
var fs = require('fs');
var jwt = require('jwt-simple');

var emailModel = {
    verifyUrl: 'http://localhost:3000/auth/verifyEmail?token=',
    title: 'psJWT',
    subtitle: 'Thanks for siging up!',
    body: 'Please verify your email address by clicking the button below.'
};
// Use custom template delimiters `{{ }}`. See: https://lodash.com/docs#template
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

function getHtml(token) {
    var path = 'views/emailVerification.html';
    // TODO: replace with async way to load a file
    var html = fs.readFileSync(path, encoding = 'utf8');
    var template = _.template(html);

    // add the token to the verifyUrl before compiling template
    emailModel.verifyUrl += token;
    return template(emailModel);
}

exports.send = function (email) {
    var payload = {
        sub: email
    };
    var token = jwt.encode(payload, config.EMAIL_SECRET);

    // Verify that the file is being read and template values injected.
    console.log(getHtml(token));
};
