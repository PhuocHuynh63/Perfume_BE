'use strict'

const express = require('express');
const {
    register,
    login,
    updateMember,
    changePassword,
    getAllMember,
    logout,
    getMemberById
} = require('../../../controllers/member.controller');
const { authAdmin } = require('../../../middlewares/checkAdmin');
const router = express.Router();

router.post('/member/register', register);
router.post('/member/login', login);
router.post('/member/logout', logout);
router.get('/member/collectors', authAdmin, getAllMember);
router.get('/member/id/:id', getMemberById);
router.put('/member/update/id/:id', updateMember);
router.patch('/member/change-password/id/:id', changePassword);

module.exports = router;