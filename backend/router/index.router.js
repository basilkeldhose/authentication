const experss = require('express');
const router = experss.Router();
const ctrUser = require("../controllers/register.controller");
const jwt = require('../config/jwt');

router.post('/register',ctrUser.register);
router.post('/authenticate',ctrUser.authenticate);
router.get('/userProfile',jwt.verifyJwtToken,ctrUser.userProfile);

module.exports= router;