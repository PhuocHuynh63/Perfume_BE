const express = require('express');
const { renderRegister, renderLogin, renderHome, renderProductDetail } = require('../../controllers/views.controller');
const router = express.Router();

//#region auth
router.get(`/register`, renderRegister);
router.get('/login', renderLogin);
//#endregion

router.get('/home', renderHome);
router.get('/product-detail/:id', renderProductDetail);

module.exports = router;