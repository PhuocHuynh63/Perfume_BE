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

const findAllPerfumesService = async (page, limit) => {
    const total = await perfumeModel.countDocuments();
    const totalPage = Math.ceil(total / limit);

    let result = await perfumeModel
        .find()
        .select('perfumeName uri targetAudience brand')
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('brand', 'brandName')
        .lean();

    if (!page && !limit) {
        return result
    }

    return {
        data: paginatedPerfumes,
        pagination: {
            total: total,
            page: page,
            limit: limit,
            totalPage: totalPage
        }
    };
}

const findPerfumeService = async (data) => {
    if (!data) {
        throw new BadRequestException(`${data} is required`);
    }

    let result = await perfumeModel
        .findOne({ _id: data.id })
        .populate('brand')
        .lean();
    if (!result) {
        throw new NotFoundException(`Perfume not found`);
    }
    return result;
}

const findPerfumeByNameService = async (data) => {
    const regex = new RegExp(data.name, 'i');

    if (!data) {
        return null;
    }

    let result = await perfumeModel
        .find({ perfumeName: regex })
        .select('_id perfumeName uri price')
        .lean();
    if (!result) {
        throw new NotFoundException(`Perfume not found`);
    }
    return result;
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
    findAllPerfumesService,
    findPerfumeService,
    findPerfumeByNameService,
    findPerfumeByBrandNameService
}