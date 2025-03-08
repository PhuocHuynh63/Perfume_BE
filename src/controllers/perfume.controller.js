'use strict'

const { successResponse } = require("../middlewares/http.response");
const {
    createPerfumeService,
    findPerfumeService,
    findPerfumeByNameService,
    findPerfumeByBrandNameService,
    deletePerfumeService,
    updatePerfumeService
} = require("../services/perfume.service");

/**
 * Controller
 */

const createPerfume = async (req, res, next) => {
    try {
        const data = req.body;
        const token = req.cookies.accessToken;

        const result = await createPerfumeService(token, data);
        return successResponse(res, result, "Create perfume successful!!", 201);
    } catch (error) {
        next(error);
    }
}

const findPerfume = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await findPerfumeService(id);
        return successResponse(res, result, "Find perfume successful!!", 200);
    } catch (error) {
        next(error);
    }
}

const findPerfumeByName = async (req, res, next) => {
    try {
        const { name, brandId, current, pageSize } = req.query;
        const result = await findPerfumeByNameService(name, brandId, current, pageSize);
        console.log(result);

        return successResponse(res, result, "Find perfume by name successful!!", 200);
    } catch (error) {
        next(error);
    }
}

const findPerfumeByBrandName = async (req, res, next) => {
    try {
        const data = req.params;
        const result = await findPerfumeByBrandNameService(data);
        return successResponse(res, result, "Find perfume by brand successful!!", 200);
    } catch (error) {
        next(error);
    }
}

const updatePerfume = async (req, res, next) => {
    try {
        const data = req.body;
        const token = req.cookies.accessToken;
        const { id } = req.params;
        const result = await updatePerfumeService(id, token, data);
        return successResponse(res, result, "Update perfume successful!!", 200);
    } catch (error) {
        next(error);
    }
}

const deletePerfume = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, brandId, limit, page } = req.query;
        const token = req.cookies.accessToken;
        const result = await deletePerfumeService(token, id);
        return successResponse(res, result, "Delete perfume successful!!", 200);
    } catch (error) {
        next(error);
        return res.render(`manage`, { error: error.message, success: null });
    }
}

module.exports = {
    createPerfume,
    findPerfume,
    findPerfumeByName,
    findPerfumeByBrandName,
    updatePerfume,
    deletePerfume
}