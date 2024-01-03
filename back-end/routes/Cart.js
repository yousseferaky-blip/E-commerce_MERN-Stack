const express = require('express');
const router = express.Router();
const { addToCart, getCartByUserId, removeFromCart } = require('../controllers/Cart');

router.post('/addToCart', addToCart);
router.get('/getCart/:userId', getCartByUserId);
router.delete('/removeFromCart', removeFromCart);

module.exports = router;
