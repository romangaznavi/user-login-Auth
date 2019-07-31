const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 255
    }, 
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    saltSecrete: String
});

userSchema.pre("save", function(next) {
    let user = this;
    if(user.password) {
        let hash = crypto.pbkdf2Sync(user.password,"salt",32,10,"sha512");
        user.password = hash.toString("hex");
    }
    next();
});

userSchema.methods.validatePassword = function(password) {
    let cryptoHash = crypto.pbkdf2Sync(password,"salt",32,10,"sha512");
    if (this.password) {
      // Below == is used to compare and return true if matched and false otherwise
      return this.password == cryptoHash.toString("hex");
    }
    return false;
  }

userSchema.methods.generateJwt = function() {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 2);

    let payloadObj = {
        _id: this._id,
        email: this.email,
        exp:parseInt(expiry.getTime() / 1000)
    };
    return jwt.sign(payloadObj, "qazwsx");
};

module.exports = mongoose.model('User', userSchema);