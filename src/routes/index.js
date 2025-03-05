'use strict';

const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

router.all('*', auth)
router.use('/views/', require('./views'));
router.use('/api/v1/', require('./apis/member'));
router.use('/api/v1/', require('./apis/brand'));
router.use('/api/v1/', require('./apis/perfume'));

module.exports = router;