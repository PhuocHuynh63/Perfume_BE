'use strict'

const express = require('express');
const {
    createPerfume,
    findPerfume,
    findPerfumeByName,
    findPerfumeByBrandName,
    deletePerfume,
    updatePerfume,
    addCommentIntoPerfume
} = require('../../../controllers/perfume.controller');
const router = express.Router();

router.post(`/perfume/create`, createPerfume);
router.get(`/perfume/id/:id`, findPerfume);
router.get(`/perfume/search`, findPerfumeByName);
router.get(`/perfume/brand/:id`, findPerfumeByBrandName);
router.put(`/perfume/update/:id`, updatePerfume);
router.post(`/perfume/:id/comment/create`, addCommentIntoPerfume);
router.delete(`/perfume/delete/:id`, deletePerfume);

module.exports = router;