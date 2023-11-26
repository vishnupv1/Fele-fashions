var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
const apiKeyMiddleware = require('../middlewares/apiMiddleware');


router.post('/addItem', apiKeyMiddleware, productController.addItem);
router.get('/', productController.getHome);
router.get('/getCategories', productController.getCategories);
router.get('/getProduct', productController.getProduct);






module.exports = router;