'use strict'

const express = require('express');
const {
    register,
    login,
    updateMember,
    changePassword,
    getAllMember
} = require('../../controllers/member.controller');
const { authAdmin } = require('../../middlewares/checkAdmin');
const router = express.Router();

router.post('/member/register', register);
router.post('/member/login', login);
router.get('/member/collectors', authAdmin, getAllMember);
router.put('/member/update/:id', updateMember);
router.patch('/member/change-password/:id', changePassword);

module.exports = router;