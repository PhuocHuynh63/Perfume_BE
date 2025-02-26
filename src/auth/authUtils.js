'use strict'

const JWT = require('jsonwebtoken')
const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await JWT.sign(payload, privateKey, {
            expiresIn: '2 days'
        })

        const refeshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '7 days'
        })

        JWT.verify(accessToken, publicKey, (error, decoded) => {
            if (error) {
                console.log(`error verifying accessToken`, error);
            } else {
                console.log(`decoded accessToken`, decoded);
            }
        })

        return { accessToken, refeshToken }
    } catch (error) {

    }
}

module.exports = {
    createTokenPair
}