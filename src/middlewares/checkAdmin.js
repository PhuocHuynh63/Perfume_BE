const { ForbiddenException } = require("../exceptions");

const authAdmin = (req, res, next) => {
    if (req.user.isAdmin !== true) {
        throw new ForbiddenException("You are not authorized to access this resource");
    }
    next();
};

exports.authAdmin = authAdmin;