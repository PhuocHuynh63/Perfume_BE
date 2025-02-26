'use strict';

const express = require('express');
const { apiKey } = require('../auth/checkAuth');
const router = express.Router();

//check apiKey
router.use(apiKey);

router.use('/api/v1/', require('./access/index'));
// router.get('/', (req, res) => {
//     return res.status(200).json({ message: 'Hello World' });
// });

module.exports = router;