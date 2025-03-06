const jwt = require('jsonwebtoken');
const { findAllBrandsService, findOneBrandService } = require("../services/brand.service");
const { findPerfumeService, findPerfumeByNameService } = require("../services/perfume.service");
const { getMemberByIdService, getAllMemberService } = require('../services/member.service');
const { findPerfumeByBrandName } = require('./perfume.controller');

const renderRegister = (req, res) => {
    res.render('register', { error: null, success: null });
}

const renderLogin = (req, res) => {
    res.render('login', { error: null, success: null });
}

const renderHome = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.redirect('/views/login');
    }
    const decoded = jwt.decode(token);

    //#region get all or search perfumes by name
    const { name, brandId } = req.query;

    const resultPerfumes = await findPerfumeByNameService(name, brandId);
    const perfumes = resultPerfumes.data;
    //#endregion

    //#region get all brands
    const resultBrands = await findAllBrandsService();
    const brands = resultBrands.data;
    //#endregion


    res.render('home', {
        perfumes,
        brands,
        token,
        user_id: decoded._id,
        search: name || "",
        selectedBrand: brandId || "",
    });
}

const renderProductDetail = async (req, res) => {
    const { id } = req.params

    const token = req.cookies.accessToken;
    if (!token) {
        return res.redirect('/views/login');
    }

    const perfume = await findPerfumeService(id);
    console.log(perfume);

    res.render(`product-detail`, { perfume: perfume, token });
}

const renderUserDetail = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.redirect('/views/login');
    }

    const { id } = req.params;
    const user = await getMemberByIdService(id);

    res.render('user-detail', { token, user });
}

const renderEditProfile = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.redirect('/views/login');
    }

    const { id } = req.params;
    const user = await getMemberByIdService(id);

    if (!user) {
        return res.render('edit-profile', { token, user: null, error: "User not found", success: null });
    }

    res.render('edit-profile', { token, user, error: null, success: null });
}

const renderChangePassword = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.redirect('/views/login');
    }

    const { id } = req.params;

    res.render('change-password', { token, userId: id, error: null, success: null });
}

const renderManger = async (req, res) => {
    try {
        const { name, brandId, current, pageSize } = req.query;
        const token = req.cookies.accessToken;
        if (!token) {
            return res.redirect('/views/login');
        }

        const decoded = jwt.decode(token);
        if (decoded.isAdmin === false) {
            return res.redirect('/views/home');
        }
        const perfumes = await findPerfumeByNameService(name, brandId, current, pageSize);
        res.render('manage', { token, perfumes: perfumes.data, error: null, success: null });
    } catch (error) {
        console.log(error);
        // return res.redirect('/views/login');
    }
}

const renderEditPerfume = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.cookies.accessToken;
        if (!token) {
            return res.redirect('/views/login');
        }

        const decoded = jwt.decode(token);
        if (decoded.isAdmin === false) {
            return res.redirect('/views/home');
        }

        const perfume = await findPerfumeService(id);
        res.render(`edit-perfume`, { token, perfume, error: null, success: null });
    } catch (error) {
        console.log(error);
        // return res.redirect('/views/login');
    }
}

const renderManageColectors = async (req, res) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            return res.redirect('/views/login');
        }

        const decoded = jwt.decode(token);
        if (decoded.isAdmin === false) {
            return res.redirect('/views/home');
        }

        const members = await getAllMemberService();

        res.render('manage-colectors', { token, members, error: null, success: null });
    } catch (error) {
        console.log(error);
        // return res.redirect('/views/login');
    }
}

const renderMangeBrands = async (req, res) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            return res.redirect('/views/login');
        }

        const decoded = jwt.decode(token);
        if (decoded.isAdmin === false) {
            return res.redirect('/views/home');
        }
        const brands = await findAllBrandsService();

        res.render('manage-brands', { token, brands: brands.data, error: null, success: null });
    } catch (error) {
        console.log(error);
        // return res.redirect('/views/login');
    }
}

const renderEditBrand = async (req, res) => {
    try {
        const { id } = req.params;

        const token = req.cookies.accessToken;
        if (!token) {
            return res.redirect('/views/login');
        }

        const decoded = jwt.decode(token);
        if (decoded.isAdmin === false) {
            return res.redirect('/views/home');
        }

        const brand = await findOneBrandService(id);
        res.render(`edit-brand`, { token, brand, error: null, success: null });
    } catch (error) {
        console.log(error);
        // return res.redirect('/views/login');
    }
}

module.exports = {
    renderRegister,
    renderLogin,
    renderHome,
    renderProductDetail,
    renderUserDetail,
    renderEditProfile,
    renderChangePassword,
    renderManger,
    renderEditPerfume,
    renderManageColectors,
    renderMangeBrands,
    renderEditBrand
}