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

const perfumeService = async (data) => {
    try {
        let result = await perfumeModel.find(data);
        return result;
    } catch (error) {
        console.log(error);
        return null
    }
}

module.exports = {
    createPerfumeService,
    perfumeService
}