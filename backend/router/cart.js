const express = require('express');
const router = express.Router();
const {addItemToCart, fetchCart, updateQuantity, removeProduct} = require('../controller/cartController')

router.post('/addtocart', addItemToCart);
router.get('/cart/:userid', fetchCart);
router.put('/cart/updatecart', updateQuantity);
router.put('/cart/remove', removeProduct);

module.exports = router;