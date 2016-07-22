var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) { return next(); }

    bcrypt.genSalt(10, function (err, salt) {
        if (err) { return next(err); }

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) { return next(err); }

            user.password = hash;
            next();
        });
    });
});

exports.model = mongoose.model('User', UserSchema);