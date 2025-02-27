'use strict'

const { findAllBrandsService,createBrandService } = require("../services/brand.service");

/**
 * Controller
 */

const findAllBrand = async (req,res) => {
    const { page,limit } = req.query;
    const data = await findAllBrandsService(page,limit);
    return res.status(200).json(data);
}

const createBrand = async (req,res) => {
    const { brandName } = req.body;
    const data = await createBrandService({ brandName });
    return res.status(201).json(data);
}

module.exports = {
    findAllBrand,
    createBrand
}