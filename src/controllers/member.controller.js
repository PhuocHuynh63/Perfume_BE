const { registerService, loginService } = require("../services/member.service");
const { successResponse } = require("../middlewares/http.response");

/**
 * Controller
 */

const register = async (req, res, next) => {
    try {
        const data = await registerService(req.body);
        return successResponse(res, data, "Tạo tài khoản thành công!", 201);
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { membername, password } = req.body;
        const data = await loginService(membername, password);
        return successResponse(res, data, "Đăng nhập thành công!", 200);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login
}