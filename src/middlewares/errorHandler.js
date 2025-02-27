const { ERROR } = require("../constants/httpResponse");
const {
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    ConflictException,
    InternalServerException
} = require("../exceptions/index");

const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (
        err instanceof BadRequestException ||
        err instanceof UnauthorizedException ||
        err instanceof ForbiddenException ||
        err instanceof NotFoundException ||
        err instanceof ConflictException ||
        err instanceof InternalServerException
    ) {
        return res.status(err.statusCode).json({
            success: false,
            code: err.statusCode,
            message: err.message
        });
    }

    return res.status(ERROR.INTERNAL_SERVER_ERROR.code).json({
        success: false,
        code: ERROR.INTERNAL_SERVER_ERROR.code,
        message: ERROR.INTERNAL_SERVER_ERROR.message
    });
};

module.exports = errorHandler;