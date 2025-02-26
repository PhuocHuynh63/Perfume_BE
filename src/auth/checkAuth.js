'use strict'

const { findById } = require("../services/apikey.service");

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            return res.status(403).json({
                message: 'Unauthorized'
            });
        }

        const objetKey = await findById(key);
        if (!objetKey) {
            return res.status(403).json({
                message: 'Unauthorized'
            });
        }
        req.apiKey = objetKey;
        return next();
    } catch (error) {

    }
}

module.exports = {
    apiKey
};