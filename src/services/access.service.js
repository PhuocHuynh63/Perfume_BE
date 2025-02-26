'use strict'

const memberModel = require("../models/member.model");
const bycrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");

class AccessService {

    static signUp = async ({ membername, password }) => {
        try {
            const member = await memberModel.findOne({ membername }).lean();
            if (member) {
                return {
                    code: 'xxx',
                    message: 'Member already exists',
                }
            }

            const passwordHash = await bycrypt.hash(password, 10);
            const newMember = await memberModel.create({ membername, password: passwordHash });
            if (newMember) {
                // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                //     modulusLength: 4096,
                //     publicKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem'
                //     },
                //     privateKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem'
                //     }
                // });

                const privateKey = crypto.randomBytes(64).toString('hex');
                const publicKey = crypto.randomBytes(64).toString('hex');

                const keyMember = await KeyTokenService.createKeyToken({
                    user: newMember._id,
                    publicKey,
                    privateKey
                });

                if (!keyMember) {
                    return {
                        code: 'xxx',
                        message: 'Error creating key token',
                    }
                }

                const tokens = await createTokenPair({ userId: newMember._id }, publicKey, privateKey);
                console.log('Create token pair', tokens);

                return {
                    code: 201,
                    message: 'Member created',
                    metadata: {
                        member: getInfoData({ fields: ['_id', 'membername'], object: newMember }),
                        tokens
                    }
                }
            }
            return {
                code: 200,
                metadata: null,
            }
        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService;