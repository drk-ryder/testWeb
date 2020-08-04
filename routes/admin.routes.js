const express = require("express");

const router = express.Router();

const adminController = require('../controllers/admin.controller');
const adminloginController = require('../controllers/adminlogin.controller');
router.get('/', adminController.login);
router.get('/login', adminController.login);
router.get('/users-list', adminController.userList);
router.get('/dashboard', adminController.dashboard);
router.get('/add-category', adminController.addCategories);
router.get('/delete/:id', adminController.deleteCategory);
router.get('/edit-category/:id', adminController.editCategory);
router.get('/delete-product/:id', adminController.deleteProduct);
router.get('/edit-product/:id', adminController.editProduct);

router.get('/category-list', adminController.categoryList);
router.get('/product-list', adminController.productList);

router.get('/create-product', adminController.addProduct);

router.get('/update-password', adminController.updatePassword);
router.get('/order-list', adminController.orderList);

// By Sohil

router.post('/login-submit', adminloginController.login);
router.post('/add-category', adminloginController.addCategories);
router.post('/edit-category', adminloginController.editCategory);
router.post('/create-product', adminloginController.addProduct);
router.post('/edit-product', adminloginController.editProduct);


module.exports = router;
