var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    facebookId: String,
    googleId: String,
    displayName: String
});

UserSchema.methods.comparePasswords = function (password, next) {
    bcrypt.compare(password, this.password, next);
};

UserSchema.methods.toJSON = function () {
    var user = this.toObject();
    delete user.password;

    return user;
};

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

module.exports = mongoose.model('User', UserSchema);
