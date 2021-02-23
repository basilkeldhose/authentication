const mongoose  = require("mongoose");
const passport = require("passport");
const _ =require('lodash');
const { pick } = require("lodash");
const jwt = require('jsonwebtoken');

const Register = mongoose.model("Register");


module.exports.register=("/",(req,res)=>{
    var register = new Register();
        register.name=req.body.name,
        register.email=req.body.email,
        register.phone=req.body.phone,
        register.password=req.body.password
    register.save((err,doc)=>{
        if(!err){
            res.send(doc);
            console.log(doc);
            console.log("registeration sucessfull");
        }
        else{
            console.log("erro in user registraion"+JSON.stringify(err,undefined,2));
        }
    });
});
module.exports.authenticate  = (req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err) return res.status(400).json(err);
        else if(user) return res.status(200).json({"token":user.generateJwt()});
        else return res.status(404).json(info)
    })(req,res);
}
module.exports.userProfile =(req,res,next)=>{
    Register.findOne({_id:req._id}),
    (err,user)=>{
        if(!user)
            return res.status(404).json({status:false,message:"User not found."});
            else
            return res.status(200).json({statu:true,user:_>pick(user,["name,email"])})
        
    }
}
