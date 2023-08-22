const express = require('express');
const router = express.Router();
const {allProducts, categoryWiseProducts, selectedSingleProduct} = require('../controller/AllProducts');


router.get('/all-products', allProducts);
router.get('/products/:categories', categoryWiseProducts);
router.get('/selectedProduct/:id', selectedSingleProduct);


module.exports = router