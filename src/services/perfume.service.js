const { BadRequestException, NotFoundException } = require('../exceptions');
const perfumeModel = require('../models/perfume.model');
const jwt = require('jsonwebtoken');


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

const findPerfumeService = async (id) => {
    if (!id) {
        throw new BadRequestException(`${id} is required`);
    }

    let result = await perfumeModel
        .findOne({ _id: id })
        .populate('brand')
        .populate('comments.author', 'name')
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

const updatePerfumeService = async (id, data) => {
    try {
        let result = await perfumeModel.updateOne({ _id: id }, data);
        return result;
    } catch (error) {
        console.log(error);
        return null
    }
}

const addCommentIntoPerfumeService = async (id, data) => {
    const perfume = await findPerfumeService(id);
    const existingComment = perfume.comments.some(comment => {
        return comment.author._id.toString() === data.author
    });

    if (existingComment) {
        throw new BadRequestException(`You have already commented on this perfume`);
    }

    const result = await perfumeModel.updateOne({ _id: id }, { $push: { comments: data } });
    return result;
}

const deletePerfumeService = async (id) => {
    const perfume = await findPerfumeService(id);
    if (perfume.comments.length > 0) {
        throw new BadRequestException(`You can't delete this perfume because it has comments`);
    }

    let result = await perfumeModel.deleteOne({ _id: id });
    return result;
}

module.exports = {
    createPerfumeService,
    findPerfumeService,
    findPerfumeByNameService,
    findPerfumeByBrandNameService,
    updatePerfumeService,
    addCommentIntoPerfumeService,
    deletePerfumeService,
}