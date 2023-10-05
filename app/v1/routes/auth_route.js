const express = require('express');
const authRouter = express.Router();
const authLogin = require('../../controller/AuthController');

authRouter.post('/user', authLogin);

module.exports = authRouter;