var crypto = require('crypto');


function base64Encode(str) {
    return new Buffer(str).toString('base64');
}
function base64Decode(str) {
    return new Buffer(str, 'base64').toString();
}
function sign(str, key) {
    return crypto
        .createHmac('sha256', key)
        .update(str)
        .digest('base64');
}
function verify(raw, secret, signature) {
    return signature === sign(raw, secret);
}

exports.encode = function (payload, secret) {
    var algorithm = 'HS256';

    var header = {
        typ: 'JWT',
        alg: algorithm
    };
    var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload));
    return jwt + '.' + sign(jwt, secret);

};

exports.decode = function (token, secret) {
    var header;
    var payload;
    var segments = token.split('.');
    var rawSignature;

    if (segments.length !== 3) {
        throw new Error('Token structure incorrect');
    }

    header = JSON.parse(base64Decode(segments[0]));
    payload = JSON.parse(base64Decode(segments[1]));
    // @todo: Figure out a more efficient way to do this next step. See resource below.
    // https://app.pluralsight.com/player?course=creating-apps-angular-node-token-authentication&author=alex-zanfir&name=token-authentication-m05&clip=7&mode=live
    rawSignature = segments[0] + '.' + segments[1];

    if (!verify(rawSignature, secret, segments[2])) {
        throw new Error('Verification failed.');
    }
    return payload;
};
