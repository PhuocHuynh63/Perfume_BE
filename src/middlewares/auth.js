require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const whiteList = [
        '/', '/member/login', '/member/register',
        '/views/login', '/views/register'
    ];

    if (whiteList.includes(req.originalUrl.replace('/api/v1', ''))) {
        return next();
    }

    const authHeader = req.headers.authorization;
    const cookies = req.cookies.accessToken;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : cookies;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = auth;