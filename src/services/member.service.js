'use strict'

const memberModel = require("../models/member.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const crypto = require('crypto');
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");

const registerService = async ({ membername,password }) => {
    try {
        let result = await memberModel.create({
            membername,
            password: await bcrypt.hash(password,10)
        });
        return result;
    } catch (error) {
        console.log(error);
        return null
    }
}

const loginService = async (membername,password) => {
    try {
        let member = await memberModel.findOne({ membername }).lean();
        if (!member) return null;
        let checkPassword = await bcrypt.compare(password,member.password);
        if (!checkPassword) {
            return {
                message: "Emmail/Password is incorrect"
            }
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
    } catch (error) {
        console.log(error);
        return null
    }
}

module.exports = {
    registerService,
    loginService
};