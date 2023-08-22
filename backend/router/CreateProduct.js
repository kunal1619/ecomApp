const express = require('express');
const createProduct = require('../controller/Product');
const router = express.Router();


router.post('/createproduct', createProduct)

module.exports = router;