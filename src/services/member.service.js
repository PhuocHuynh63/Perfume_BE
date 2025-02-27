'use strict'

const memberModel = require("../models/member.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const crypto = require('crypto');
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { ConflictException, BadRequestException } = require("../exceptions");

/**
 * Service
 */

const registerService = async ({ membername, password }) => {
    const existingUser = await memberModel.findOne({ membername });
    if (existingUser) throw new ConflictException(`Membername ${membername} is already taken!`);

    return await memberModel.create({
        membername,
        password: await bcrypt.hash(password, 10),
    });
};

const loginService = async (membername, password) => {
    let member = await memberModel.findOne({ membername }).lean();
    if (!member) {
        throw new BadRequestException("Email/Password is incorrect");
    }

    let checkPassword = await bcrypt.compare(password, member.password);
    if (!checkPassword) {
        throw new BadRequestException("Email/Password is incorrect");
    };
    const payload = {
        _id: member._id,
        membername: member.membername,
    }
    const accessToken = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
    return {
        user: {
            member: membername
        },
        accessToken
    };
}


module.exports = {
    registerService,
    loginService
};