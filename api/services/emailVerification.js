var _ = require('lodash');
var config = require('./config');
var fs = require('fs');
var jwt = require('jwt-simple');
var nodemailer = require('nodemailer');

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

exports.send = function (email, res) {
    var payload = {
        sub: email
    };
    var token = jwt.encode(payload, config.EMAIL_SECRET);

    var transporter = nodemailer.createTransport({
        host: config.EMAIL_HOST,
        port: config.EMAIL_HOST_PORT,
        secure: true,
        auth: {
            user: config.EMAIL_USERNAME,
            pass: config.EMAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: 'Accounts <'+ config.EMAIL_ADMIN_EMAIL +'>',
        to: email,
        subject: 'psJWT Account Verification',
        html: getHtml(token)
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) { return res.status(500, err); }
        console.log('email sent ', info.response);
    })
};
