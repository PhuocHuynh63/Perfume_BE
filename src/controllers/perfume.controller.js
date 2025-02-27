'use strict'

const { successResponse } = require("../middlewares/http.response");

/**
 * Controller
 */

const findAllPerfumes = async (req, res) => {
    try {
        const data = await findAllPerfumesService();
        return successResponse(res, data, "Get all perfumes successful!!", 200);
    } catch (error) {
        next(error);
    }
}

const createPerfume = async (req, res) => {
    try {
        const data = req.body;
        const result = await createPerfumeService(data);
        return successResponse(res, result, "Create perfume successful!!", 201);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    findAllPerfumes,
    createPerfume
}