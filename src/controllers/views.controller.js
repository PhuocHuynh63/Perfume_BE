const { findAllBrandsService } = require("../services/brand.service");
const { findPerfumeService, findPerfumeByNameService } = require("../services/perfume.service");

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

    //#region get all or search perfumes by name
    const { name } = req.query;
    const resultPerfumes = await findPerfumeByNameService(name);
    const perfumes = resultPerfumes.data;
    //#endregion

    //#region get all brands
    const resultBrands = await findAllBrandsService();
    const brands = resultBrands.data;
    //#endregion


    res.render('home', { perfumes, brands, token, search: name || "" });
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

module.exports = {
    renderRegister,
    renderLogin,
    renderHome,
    renderProductDetail
}