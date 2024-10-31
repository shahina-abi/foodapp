import Order from '../models/orderModel.js';

// Place a new order
export const placeOrder = async (req, res) => {
  try {
    const { items, totalPrice, paymentMethod, couponCode } = req.body;
    const order = new Order({
      user: req.user._id,
      items,
      totalPrice,
      paymentMethod,
      couponCode,
    });

    await order.save();
    res.status(201).json({ success: true, message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get specific order details
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user items.foodItem');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all orders for the logged-in user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.foodItem', 'name price');
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel an order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    order.status = 'Canceled';
    await order.save();
    res.json({ success: true, message: 'Order canceled successfully', order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
