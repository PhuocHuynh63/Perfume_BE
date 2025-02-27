'use strict'

const findAllPerfumes = async (req,res) => {
    const data = await findAllPerfumesService();
    return res.status(200).json(data);
}

const createPerfume = async (req,res) => {
    const data = req.body;
    const result = await createPerfumeService(data);
    if (result) {
        return res.status(201).json(result);
    }
}

module.exports = {
    findAllPerfumes
}