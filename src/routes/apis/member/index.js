'use strict'

const express = require('express');
const {
    register,
    login,
    updateMember,
    changePassword,
    getAllMember,
    logout
} = require('../../../controllers/member.controller');
const { authAdmin } = require('../../../middlewares/checkAdmin');
const router = express.Router();

router.post('/member/register', register);
router.post('/member/login', login);
router.post('/member/logout', logout);
router.get('/member/collectors', authAdmin, getAllMember);
router.post('/member/update/:id', updateMember);
router.post('/member/change-password/:id', changePassword);

module.exports = router;