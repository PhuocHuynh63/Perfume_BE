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

const findAllBrandsService = async (current = 1, pageSize = 10) => {
    let brands = await brandModel.find().lean();
    if (!current && !pageSize) {
        return brands
    }

    const total = brands.length;
    const startIndex = (current - 1) * pageSize;
    const paginatedBrands = brands.slice(startIndex, startIndex + pageSize);
    const totalPage = Math.ceil(total / pageSize);
    const totalItem = await brandModel.countDocuments().lean();

    return {
        data: paginatedBrands,
        pagination: {
            current: current,
            pageSize: pageSize,
            totalPage: totalPage,
            totalItem: totalItem
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