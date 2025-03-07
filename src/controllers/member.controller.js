const { registerService, loginService, changePasswordService, getAllMemberService, getMemberByIdService, updateMemberService } = require("../services/member.service");
const { successResponse } = require("../middlewares/http.response");
const { findAllPerfumesService } = require("../services/perfume.service");

/**
 * Controller
 */

const register = async (req, res, next) => {
    try {
        const data = await registerService(req.body);
        return successResponse(res, data, "Create account successful!", 201);

    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const data = await loginService(email, password);

        // res.cookie("accessToken", data.accessToken, {
        //     maxAge: 7 * 24 * 60 * 60 * 1000,
        // })
        return successResponse(res, data, "Login successful!", 200);


    } catch (error) {
        next(error);
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
        return successResponse(res, data, "Get all member successful!!", 200);
    } catch (error) {
        next(error);
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
        return successResponse(res, result, "Update user successful!!", 200);
    } catch (error) {
        next(error);
    }
}

const changePassword = async (req, res, next) => {
    const { id } = req.params;
    try {
        const data = req.body;
        const result = await changePasswordService(id, data);
        return successResponse(res, result, "Change password successful!!", 200);
    } catch (error) {
        next(error);
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