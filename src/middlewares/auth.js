require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const whiteList = ['/', '/member/login', '/member/register', '/views/login', '/views/register'];

    if (whiteList.includes(req.originalUrl.replace('/api/v1', ''))) {
        return next();
    }
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Check Token: ", decoded);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = auth;