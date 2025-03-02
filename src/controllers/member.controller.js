const { registerService, loginService, changePasswordService, getAllMemberService } = require("../services/member.service");
const { successResponse } = require("../middlewares/http.response");

/**
 * Controller
 */

const register = async (req, res, next) => {
    try {
        const data = await registerService(req.body);
        if (req.headers.accept === 'application/json') {
            return successResponse(res, data, "Create account successful!", 201);
        }

        return res.redirect(302, '/views/login');
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

const getAllMember = async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const data = await getAllMemberService(page, limit);
        if (req.headers.accept === 'application/json') {
            return successResponse(res, data, "Get all member successful!!", 200);
        }
        return res.redirect('/views/login', { data });
    } catch (error) {
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            return res.status(error.status || 400).json({
                success: false,
                message: error.message
            });
        }

        return res.render('register', { error: error.message, success: null });
    }
}

const updateMember = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await updateMemberService(data);
        return successResponse(res, result, "Update user successful!!", 200);
    } catch (error) {
        next(error);
    }
}

const changePassword = async (req, res, next) => {
    try {
        const data = req.body;
        const { id } = req.params;
        const result = await changePasswordService(id, data);
        return successResponse(res, result, "Change password successful!!", 200);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login,
    updateMember,
    changePassword,
    getAllMember
}