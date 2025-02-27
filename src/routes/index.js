'use strict';

const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

router.all('*',auth)
router.use('/api/v1/',require('./user'));
router.use('/api/v1/',require('./brand'));

module.exports = router;