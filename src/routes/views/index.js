const express = require('express');
const { renderRegister, renderLogin, renderHome } = require('../../controllers/views.controller');
const router = express.Router();

router.get(`/register`, renderRegister);

router.get('/login', renderLogin);

router.get('/home', renderHome);

module.exports = router;