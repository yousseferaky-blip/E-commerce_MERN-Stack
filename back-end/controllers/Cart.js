// controllers/Cart.js

const Cart = require('../models/Cart');

exports.addToCart = async (req, res, next) => {
  try {
    const { userId, productId } = req.body;
    let userCart = await Cart.findOne({ userId });

    if (!userCart) {
      userCart = new Cart({ userId, products: [] });
    }

    const existingProductIndex = userCart.products.findIndex((product) => product.productId && product.productId.equals(productId));

    if (existingProductIndex !== -1) {
      userCart.products[existingProductIndex].quantity += 1;
    } else {
      userCart.products.push({ productId, quantity: 1 });
    }

    await userCart.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getCartByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (userId) {
      const userCart = await Cart.findOne({ userId }).populate('products.productId', 'name price avatar');

      if (userCart) {
        res.status(200).json({ cart: userCart.products });
      } else {
        res.status(404).json({ message: 'Cart not found' });
      }
    } else {
      res.status(400).json({ message: 'Invalid userId' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.removeFromCart = async (req, res, next) => {
  try {
    const { userId, productId } = req.body;
    let userCart = await Cart.findOne({ userId });

    if (!userCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const existingProductIndex = userCart.products.findIndex(
      (product) => product.productId && product.productId.equals(productId)
    );

    if (existingProductIndex !== -1) {
      const product = userCart.products[existingProductIndex];

      if (product.quantity > 1) {
        product.quantity -= 1;
      } else {
        userCart.products.splice(existingProductIndex, 1);
      }

      await userCart.save();

      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ message: 'Product not found in the cart' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
