import Order from '../models/orderModel.js';

// Place an order
export const placeOrder = async (req, res) => {
  const { foodItems, totalPrice, paymentMethod } = req.body;
  const order = await Order.create({
    user: req.user._id,
    foodItems,
    totalPrice,
    paymentMethod,
  });
  res.status(201).json(order);
};

// Get user's orders
export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};
