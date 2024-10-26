import Cart from '../models/cartModel.js';

// Add item to cart
export const addToCart = async (req, res) => {
  const { food, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [{ food, quantity }],
      totalPrice: 0,
    });
  } else {
    const itemIndex = cart.cartItems.findIndex((item) => item.food.toString() === food);

    if (itemIndex >= 0) {
      cart.cartItems[itemIndex].quantity += quantity;
    } else {
      cart.cartItems.push({ food, quantity });
    }
  }

  cart.totalPrice = cart.cartItems.reduce((acc, item) => acc + item.quantity * item.food.price, 0);
  await cart.save();

  res.json(cart);
};

// Get user cart
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.food', 'name price');
  res.json(cart);
};
