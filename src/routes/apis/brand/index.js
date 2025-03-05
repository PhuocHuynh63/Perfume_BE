const express = require('express');
const { createBrand,findAllBrand } = require('../../../controllers/brand.controller');
const router = express.Router();

router.get(`/brand`, findAllBrand);
router.post(`/brand/create`, createBrand);

module.exports = router;