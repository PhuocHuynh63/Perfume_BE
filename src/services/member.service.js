'use strict'

const memberModel = require("../models/member.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const crypto = require('crypto');
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { ConflictException, BadRequestException, NotFoundException } = require("../exceptions");

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

const getAllMemberService = async (page, limit) => {
    const totalMembers = await memberModel.countDocuments();
    const totalPage = Math.ceil(totalMembers / limit);
    let members = await memberModel
        .find()
        .skip(page * limit)
        .select("-password")
        .limit(limit).lean();

    if (!page && !limit) {
        return members;
    }

    return {
        data: members,
        pagination: {
            total: totalMembers,
            page: page,
            limit: limit,
            totalPage: totalPage
        }
    };
}

const updateMemberService = async (data) => {
    const { membername, password } = data;
    let member = await memberModel({ membername, password });
    return await member.save();
}

const changePasswordService = async (id, data) => {
    const { password, newPassword, confirmPassword } = data;
    if (!password || !newPassword || !confirmPassword) {
        throw new BadRequestException("Missing required fields");
    }

    let member = await memberModel.findOne({ _id: id });
    if (!member) {
        throw new NotFoundException("Member not found");
    }

    //Check password
    let checkPassword = await bcrypt.compare(password, member.password);
    if (!checkPassword) {
        throw new BadRequestException("Password is incorrect");
    };

    //Change password from request
    const newPasswordData = newPassword;

    if (newPasswordData !== confirmPassword) {
        throw new BadRequestException("Password and Confirm Password are not match");
    }

    if (newPasswordData === password) {
        throw new BadRequestException("New password must be different from the old password");
    }
    member.password = await bcrypt.hash(newPasswordData, 10);
    return await member.save();
}

module.exports = {
    registerService,
    loginService,
    updateMemberService,
    changePasswordService,
    getAllMemberService,
};