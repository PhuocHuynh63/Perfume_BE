const express = require('express');
const { renderRegister, renderLogin, renderHome, renderProductDetail, renderUserDetail, renderEditProfile, renderChangePassword, renderManger, renderEditPerfume, renderManageColectors, renderMangeBrands, renderEditBrand } = require('../../controllers/views.controller');
const router = express.Router();

//#region auth
router.get(`/register`, renderRegister);
router.get('/login', renderLogin);
//#endregion

//#region member
router.get('/home', renderHome);
router.get('/product-detail/:id', renderProductDetail);
router.get('/user-detail/:id', renderUserDetail);
router.get('/edit-profile/:id', renderEditProfile);
router.get('/change-password/:id', renderChangePassword);
//#endregion

//#region admin
router.get('/admin/manage', renderManger);
// router.get('/admin/add-perfume', renderEditPerfume);
router.get('/admin/edit-perfume/:id', renderEditPerfume);
router.get('/admin/colectors', renderManageColectors);
router.get('/admin/manage-brands', renderMangeBrands);
router.get('/admin/edit-brand/:id', renderEditBrand);

module.exports = router;