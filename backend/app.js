require("./db");
require('./config/config');
require("./config/passportConfig");
const express =require('express');
const bodyparser =require("body-parser");
const index =require("./router/index.router");
const passport =require('passport');

var app =express();
var cors = require('cors');

app.use(bodyparser.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/api',index);
app.use(passport.initialize());

app.listen(3000,()=>{
    console.log("server connected on port 3000!!")
});