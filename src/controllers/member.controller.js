const { registerService, loginService, changePasswordService, getAllMemberService, getMemberByIdService, updateMemberService } = require("../services/member.service");
const { successResponse } = require("../middlewares/http.response");
const { findAllPerfumesService } = require("../services/perfume.service");

/**
 * Controller
 */

const register = async (req, res, next) => {
    try {
        const data = await registerService(req.body);

        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            return successResponse(res, data, "Create account successful!", 201);
        }

        return res.render("register-success", { message: "Tạo tài khoản thành công!" });
    } catch (error) {
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            return res.status(error.status || 400).json({
                success: false,
                message: error.message
            });
        }

        return res.render("register", { error: error.message, success: null });
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const data = await loginService(email, password);
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            return successResponse(res, data, "Login successful!", 200);
        }

        res.cookie("accessToken", data.accessToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.redirect("/views/home");
    } catch (error) {
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            next(error);
        }
        return res.render("login", { error: error.message, success: null });
    }
};

const logout = async (req, res, next) => {
    try {
        res.clearCookie("accessToken");
        return res.redirect("/views/login");
    } catch (error) {
        next(error);
    }
}

const getAllMember = async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const data = await getAllMemberService(page, limit);
        if (req.headers.accept === 'application/json') {
            return successResponse(res, data, "Get all member successful!!", 200);
        }
        return res.render('manage-colectors', { members: data, error: null, success: null });
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

const getMemberById = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const result = await getMemberByIdService(_id);
        return successResponse(res, result, "Get user by id successful!!", 200);
    } catch (error) {
        next(error);
    }
}

const updateMember = async (req, res, next) => {
    const { id } = req.params;
    try {
        const data = req.body;

        const result = await updateMemberService(id, data);
        if (req.headers.accept === 'application/json') {
            return successResponse(res, result, "Update user successful!!", 200);
        }

        return res.redirect(`/views/user-detail/${id}`);
    } catch (error) {
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            return res.status(error.status || 400).json({
                success: false,
                message: error.message
            });
        }

        return res.render(`edit-profile`, { error: error.message, success: null });
    }
}

const changePassword = async (req, res, next) => {
    const { id } = req.params;
    try {
        const data = req.body;
        const result = await changePasswordService(id, data);
        if (req.headers.accept === 'application/json') {
            return successResponse(res, result, "Change password successful!!", 200);
        }
        return res.redirect(`/views/user-detail/${id}`);
    } catch (error) {
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            return res.status(error.status || 400).json({
                success: false,
                message: error.message
            });
        }

        return res.render(`change-password`, { userId: id, error: error.message, success: null });
    }
}

module.exports = {
    register,
    login,
    logout,
    updateMember,
    changePassword,
    getAllMember,
    getMemberById,
}