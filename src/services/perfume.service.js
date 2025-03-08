const { BadRequestException, NotFoundException } = require('../exceptions');
const perfumeModel = require('../models/perfume.model');
const jwt = require('jsonwebtoken');


/**
 * Service
 */

const createPerfumeService = async (token, data) => {
    try {
        const decoded = jwt.decode(token);
        if (decoded.isAdmin === false) {
            throw new BadRequestException(`You are not allowed to create perfume`);
        }
        let result = await perfumeModel.create(data);
        return result;
    } catch (error) {
        console.log(error);
        return null
    }
}

const findPerfumeService = async (id) => {
    if (!id) {
        throw new BadRequestException(`${id} is required`);
    }

    let result = await perfumeModel
        .findOne({ _id: id })
        .populate('brand')
        .lean();
    if (!result) {
        throw new NotFoundException(`Perfume not found`);
    }
    return result;
}

const findPerfumeByNameService = async (name = "", brandId = "", current = 1, pageSize = 10) => {
    const regex = new RegExp(name, 'i');

    let filter = { perfumeName: regex };

    if (brandId.trim()) {
        filter["brand"] = brandId;
    }

    let skip = (current - 1) * pageSize;

    let result = await perfumeModel
        .find(filter)
        .populate('brand', 'brandName')
        .skip(skip)
        .limit(pageSize)
        .lean();

    const totalItem = await perfumeModel.countDocuments(filter);
    const totalPage = Math.ceil(totalItem / pageSize);

    return {
        data: result,
        pagination: {
            current: Number(current),
            pageSize: Number(pageSize),
            totalPage: totalPage,
            totalItem: totalItem
        }
    };
}

// const findPerfumeByBrandNameService = async (data) => {
//     if (!brandName) {
//         throw new BadRequestException("Brand name is required");
//     }

//     const regex = new RegExp(brandName, 'i');
//     const brand = await brandModel.findOne({ brandName: regex }).lean();
//     if (!brand) {
//         return null;
//     }

//     let result = await perfumeModel
//         .findOne({ brand: brand._id })
//         .select('_id perfumeName uri price')
//         .populate('brand', 'brandName')
//         .lean();
//     if (!result) {
//         return null;
//     }
//     return result;
// }

const findPerfumeByBrandNameService = async (data) => {
    if (!data) {
        return null;
    }

    let result = await perfumeModel
        .find({ brand: data.id })
        .select('_id perfumeName uri price')
        .populate('brand', 'brandName')
        .lean();
    if (!result) {
        throw new NotFoundException(`Perfume not found`);
    }
    return result;
}

const updatePerfumeService = async (id, token, data) => {
    try {
        const decoded = jwt.decode(token);
        if (decoded.isAdmin === false) {
            throw new BadRequestException(`You are not allowed to update perfume`);
        }
        let result = await perfumeModel.updateOne({ _id: id }, data);
        return result;
    } catch (error) {
        console.log(error);
        return null
    }
}

const deletePerfumeService = async (token, data) => {
    try {
        const decoded = jwt.decode(token);
        if (decoded.isAdmin === false) {
            throw new BadRequestException(`You are not allowed to delete perfume`);
        }
        let result = await perfumeModel.deleteOne({ _id: data });
        return result;
    } catch (error) {
        console.log(error);
        return null
    }
}

module.exports = {
    createPerfumeService,
    findPerfumeService,
    findPerfumeByNameService,
    findPerfumeByBrandNameService,
    updatePerfumeService,
    deletePerfumeService
}