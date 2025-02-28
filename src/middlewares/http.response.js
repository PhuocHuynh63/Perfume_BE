const { ERROR } = require("../constants/httpResponse");

const successResponse = (res,data,message = SUCCESS.OK.message,code = SUCCESS.OK.code) => {
    return res.status(code).json({ success: true,code,message,data });
};

const errorResponse = (res,errorKey,details = null) => {
    const error = ERROR[errorKey] || ERROR.INTERNAL_SERVER_ERROR;
    return res.status(error.code).json({ success: false,code: error.code,message: error.message,details });
};

module.exports = { successResponse,errorResponse };