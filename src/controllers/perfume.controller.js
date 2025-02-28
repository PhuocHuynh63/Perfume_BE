'use strict'

const { successResponse } = require("../middlewares/http.response");
const {
    findAllPerfumesService,
    createPerfumeService,
    findPerfumeService,
    findPerfumeByNameService,
    findPerfumeByBrandNameService
} = require("../services/perfume.service");

/**
 * Controller
 */

const findAllPerfumes = async (req, res, next) => {
    const { page, limit } = req.query;
    try {
        const data = await findAllPerfumesService(page, limit);
        return successResponse(res, data, "Get all perfumes successful!!", 200);
    } catch (error) {
        next(error);
    }
}

const createPerfume = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await createPerfumeService(data);
        return successResponse(res, result, "Create perfume successful!!", 201);
    } catch (error) {
        next(error);
    }
}

const findPerfume = async (req, res, next) => {
    try {
        const data = req.params;
        const result = await findPerfumeService(data);
        return successResponse(res, result, "Find perfume successful!!", 200);
    } catch (error) {
        next(error);
    }
}

const findPerfumeByName = async (req, res, next) => {
    try {
        const data = req.params;
        const result = await findPerfumeByNameService(data);
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

module.exports = {
    findAllPerfumes,
    createPerfume,
    findPerfume,
    findPerfumeByName,
    findPerfumeByBrandName
}