const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const registerShema =new mongoose.Schema( {
    name: {
        type: String,
        require:true
    },
    email: {
        type: String,
        require:true
    },
    phone: {
        type: Number,
        require:true
    },
    password: {
        type: String,
        require:true
    },
    saltSecret: String
});

registerShema.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

registerShema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

registerShema.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}

const Register = mongoose.model('Register', registerShema);
module.exports = Register;
