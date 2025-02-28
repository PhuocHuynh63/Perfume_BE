'use strict';

const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

router.all('*',auth)
router.use('/api/v1/',require('./member'));
router.use('/api/v1/',require('./brand'));
router.use('/api/v1/',require('./perfume'));

module.exports = router;