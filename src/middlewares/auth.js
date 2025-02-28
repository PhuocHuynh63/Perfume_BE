require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const whiteList = ['/', '/member/login', '/member/register'];

    if (whiteList.find(item => '/api/v1' + item === req.originalUrl)) {
        next();
    } else {
        if (req?.headers?.authorization?.split(' ')?.[1]) {
            const token = req.headers.authorization.split(' ')[1];

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log("Check Token: ", decoded);
                next();
            } catch (error) {
                return res.status(401).json({
                    message: "Unauthorized"
                })
            }
        }
    }
}

module.exports = auth;