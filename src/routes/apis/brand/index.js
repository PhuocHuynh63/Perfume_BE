const express = require('express');
const { createBrand, findAllBrand, findOneBrand, updateBrand, deleteBrand } = require('../../../controllers/brand.controller');
const router = express.Router();

router.get(`/brand`, findAllBrand);
router.get(`/brand/:id`, findOneBrand);
router.post(`/brand/create`, createBrand);
router.post(`/brand/update/:id`, updateBrand);
router.post(`/brand/delete/:id`, deleteBrand);

module.exports = router;