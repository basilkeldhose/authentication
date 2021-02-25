const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const registerShema =new mongoose.Schema( {
    name: {
        type: String,
        require:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        require:true
    },
    password: {
        type: String,
        require:true
    }
});

const Register = mongoose.model('Register', registerShema);
module.exports = Register;
