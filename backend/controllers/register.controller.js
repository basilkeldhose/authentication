const mongoose = require("mongoose");
const passport = require("passport");
const _ = require('lodash');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');
require("../config/config.json")
const Register = mongoose.model("Register");

module.exports.register = async (req, res) => {
    //Validate Datas before send
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking user is already exists in database
    const emailExist = await Register.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exist")

    //hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    var register = new Register();
    register.name = req.body.name,
        register.email = req.body.email,
        register.phone = req.body.phone,
        register.password = hashedPassword
    register.save((err, doc) => {
        if (!err) {
            res.send(doc);
            console.log(doc);
            console.log("registeration sucessfull");
        }
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }
    });
};

module.exports.login = async (req, res) => {

    //Validate Datas before Login
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking user is already exists in database
    const emailExist = await Register.findOne({ email: req.body.email });
    if (!emailExist) return res.status(400).send("Email is wrong");

    //check Password 
    let validatePassword = bcrypt.compare(req.body.password, Register.password);
    if (!validatePassword) return res.status(400).send("Invalied password");

    //Create JWT Token
    const token = jwt.sign({ _id: Register._id }, process.env.JWT_SECRET);
    res.header('auth-token', token).send(token);
    console.log("token:",token);
};

module.exports.userProfile = (req, res) => {

    Register.findOne({ _id: req._id }),
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: "User not found." });
            else
                return res.status(200).json({ statu: true, user: _.pick(user, ["name,email"]) })
        }
}
