'use strict'

const express = require('express');
const { register, login } = require('../../controllers/member.controller');
const router = express.Router();


router.post('/user/register', register);
router.post('/user/login', login);

module.exports = router;