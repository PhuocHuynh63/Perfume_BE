const { BadRequestException, NotFoundException } = require('../exceptions');
const perfumeModel = require('../models/perfume.model');


/**
 * Service
 */

const createPerfumeService = async (data) => {
    try {
        let result = await perfumeModel.create(data);
        return result;
    } catch (error) {
        console.log(error);
        return null
    }
}

const findPerfumeService = async (data) => {
    console.log(data);

    if (!data) {
        throw new BadRequestException(`${data} is required`);
    }

    let result = await perfumeModel
        .findOne({ _id: data })
        .populate('brand')
        .lean();
    if (!result) {
        throw new NotFoundException(`Perfume not found`);
    }
    return result;
}

const findPerfumeByNameService = async (name, brandId = "", current = 1, pageSize = 10) => {
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
            current: current,
            pageSize: pageSize,
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

module.exports = {
    createPerfumeService,
    findPerfumeService,
    findPerfumeByNameService,
    findPerfumeByBrandNameService
}