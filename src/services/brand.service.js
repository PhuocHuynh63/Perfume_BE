'use strict'

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
        return brands;
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
    try {
        const isExist = await isBrandExist(data.brandName);
        if (isExist) return null;

        let result = await brandModel.create(data);
        return result;
    } catch (error) {
        console.log(error);
        return null
    }
}

module.exports = {
    createBrandService,
    findAllBrandsService
}