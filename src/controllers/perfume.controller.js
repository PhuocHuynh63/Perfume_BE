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
        const data = req.params;
        const result = await findPerfumeService(data);
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            return successResponse(res, result, "Find perfume successful!!", 200);
        }
        return res.render(`product-detail`, { data: result });
    } catch (error) {
        next(error);
    }
}

const findPerfumeByName = async (req, res, next) => {
    try {
        const { name, brandId, current, pageSize } = req.query;
        const result = await findPerfumeByNameService(name, brandId, current, pageSize);
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
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            return successResponse(res, result, "Update perfume successful!!", 200);
        }
        const perfumes = await findPerfumeByNameService(data.name, data.brandId, data.limit, data.page);
        return res.render(`manage`, { error: null, success: "Update perfume successful!!", perfumes: perfumes.data });
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
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            return successResponse(res, result, "Delete perfume successful!!", 200);
        }
        const perfumes = await findPerfumeByNameService(name, brandId, limit, page);
        return res.render(`manage`, { error: null, success: "Delete perfume successful!!", perfumes: perfumes.data });
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