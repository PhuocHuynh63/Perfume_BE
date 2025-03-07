'use strict'

const { successResponse } = require("../middlewares/http.response");
const { findAllBrandsService, createBrandService, findOneBrandService, updateBrandService, deleteBrandService } = require("../services/brand.service");

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

const findOneBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await findOneBrandService(id);
        return successResponse(res, data, "Get brand successful!!", 200);
    } catch (error) {
        next(error);
    }
}

const updateBrand = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { brandName } = req.body;
        const data = await updateBrandService(id, brandName);
        return successResponse(res, data, "Update brand successful!!", 200);
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

const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await deleteBrandService(id);
        return successResponse(res, data, "Delete brand successful!!", 200);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    findAllBrand,
    findOneBrand,
    createBrand,
    updateBrand,
    deleteBrand
}