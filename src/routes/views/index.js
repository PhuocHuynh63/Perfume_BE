const express = require('express');
const router = express.Router();

router.get(`/register`, (req, res) => {
    res.render('register', { error: null, success: null });
});

router.get('/login', (req, res) => {
    res.render('login', { error: null, success: null });
})

module.exports = router;