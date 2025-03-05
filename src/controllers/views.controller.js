const { findAllPerfumesService } = require("../services/perfume.service");

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

    const perfumes = await findAllPerfumesService();
    res.render('home', { perfumes: perfumes, token });
}

module.exports = {
    renderRegister,
    renderLogin,
    renderHome
}