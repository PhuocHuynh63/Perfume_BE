'use strict'

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {

    static createKeyToken = async ({ user, publicKey, privateKey }) => {
        try {
            const token = await keytokenModel.create({
                user,
                publicKey,
                privateKey
            });
            return token ? token.publicKey : null;
        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = KeyTokenService;