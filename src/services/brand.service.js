'use strict'

const { ConflictException } = require('../exceptions');
const brandModel = require('../models/brand.model');

/**
 * Service
 */

const isBrandExist = async (brandName) => {
    let brand = await brandModel.findOne({ brandName }).lean();
    return brand;
}

const findAllBrandsService = async (page,limit) => {
    let brands = await brandModel.find().lean();
    if (!page && !limit) {
        return brands
    }

    const total = brands.length;
    const startIndex = (page - 1) * limit;
    const paginatedBrands = brands.slice(startIndex,startIndex + limit);
    const totalPage = Math.ceil(total / limit);


    return {
        data: paginatedBrands,
        pagination: {
            total: total,
            page: page,
            limit: limit,
            totalPage: totalPage
        }
    }
}

const createBrandService = async (data) => {
    const isExist = await isBrandExist(data.brandName);
    if (isExist) return ConflictException(`Brand ${data.brandName} is already exist!`);

    let result = await brandModel.create(data);
    return {
        data: result
    };
}

module.exports = {
    createBrandService,
    findAllBrandsService
}