var express = require('express');
var router = express.Router();

const userAuth = require('../userAuth.js');

//other modules
var displayProducts = require("./displayProducts");
var addProducttoCart = require("./addProducttoCart");
var saveProducttoCart = require("./saveProducttoCart");
var showCart = require("./showCart");
var editCart  =require("./editCart");
var confirmEditCart = require("./confirmEditCart");
var deleteCart = require("./deleteCart");

var searchProduct = require("./searchProduct");
var displayUsers = require("./displayUsers");
//router specs

router.get('/shop',displayProducts);

router.get('/shop/add/:id/:pname/:quantity',userAuth.loginRestricted,addProducttoCart);
router.post('/shop/save',userAuth.loginRestricted,saveProducttoCart);

router.get('/cart',userAuth.loginRestricted,showCart);
router.get('/cart/edit/:pid',userAuth.loginRestricted,editCart);
router.post('/cart/edit',userAuth.loginRestricted,confirmEditCart);
router.get('/cart/delete/:pid',userAuth.loginRestricted,deleteCart);

// router.post('/shop/placeorder',placetheOrder);
//router.post('/shop/search',searchProduct);
//router.get('/shop/orders');

//search by produt name or description
router.get('/shop/search/:text',searchProduct);
router.get('/admin/users',userAuth.adminRestricted,displayUsers);
module.exports = router;
