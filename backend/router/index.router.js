const experss = require('express');
const router = experss.Router();
const ctrUser = require("../controllers/register.controller");
const varify = require("../config/jwt")

router.post('/register',ctrUser.register);
router.post('/login',ctrUser.login);
router.get('/userprofile',varify,ctrUser.userProfile);

module.exports= router;