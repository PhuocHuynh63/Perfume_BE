'use strict'

const express = require('express');
const {
    register,
    login,
    updateMember,
    changePassword
} = require('../../controllers/member.controller');
const router = express.Router();


router.post('/member/register', register);
router.post('/member/login', login);
router.put('/member/update/:id', updateMember);
router.patch('/member/change-password/:id', changePassword);

module.exports = router;