const express = require('express');
const { createBrand, findAllBrand, findOneBrand, updateBrand, deleteBrand } = require('../../../controllers/brand.controller');
const router = express.Router();

router.get(`/brand`, findAllBrand);
router.get(`/brand/:id`, findOneBrand);
router.post(`/brand/create`, createBrand);
router.put(`/brand/update/:id`, updateBrand);
router.delete(`/brand/delete/:id`, deleteBrand);

module.exports = router;