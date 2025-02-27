'use strict'

const { successResponse } = require("../middlewares/http.response");
const { findAllBrandsService, createBrandService } = require("../services/brand.service");

/**
 * Controller
 */

const findAllBrand = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const data = await findAllBrandsService(page, limit);
        return successResponse(res, data, "Get all brands successful!!", 200);
    } catch (error) {
        next(error);
    }
}

const createBrand = async (req, res) => {
    try {
        const { brandName } = req.body;
        const data = await createBrandService({ brandName });
        return successResponse(res, data, "Create brand successful!!", 201);
    } catch (error) {
        next(error);
    }

}

module.exports = {
    findAllBrand,
    createBrand
}