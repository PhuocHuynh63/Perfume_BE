'use strict'

const express = require('express');
const {
    createPerfume,
    findPerfume,
    findPerfumeByName,
    findPerfumeByBrandName
} = require('../../../controllers/perfume.controller');
const router = express.Router();

router.post(`/perfume/create`, createPerfume);
router.get(`/perfume/:id`, findPerfume);
router.get(`/perfume/search`, findPerfumeByName);
router.get(`/perfume/brand/:id`, findPerfumeByBrandName);

module.exports = router;