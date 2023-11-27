var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
const apiKeyMiddleware = require('../middlewares/apiMiddleware');


router.post('/addItem', apiKeyMiddleware, productController.addItem);
router.get('/', productController.getHome);
router.get('/api/product/categories', apiKeyMiddleware, productController.getCategories);
router.get('/api/product/list', apiKeyMiddleware, productController.getProduct);
router.get('/category', productController.category);
router.get('/products', productController.products);










module.exports = router;