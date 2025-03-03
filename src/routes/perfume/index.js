'use strict'

const express = require('express');
const {
    createPerfume,
    findAllPerfumes,
    findPerfume,
    findPerfumeByName,
    findPerfumeByBrandName
} = require('../../controllers/perfume.controller');
const router = express.Router();

router.post(`/perfume/create`, createPerfume);
router.get(`/perfume`, findAllPerfumes);
router.get(`/perfume/id=:id`, findPerfume);
router.get(`/perfume/search`, findPerfumeByName);
router.get(`/perfume/brandId=:id`, findPerfumeByBrandName);

module.exports = router;