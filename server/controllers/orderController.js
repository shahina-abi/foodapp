
import Order from "../models/orderModel.js";
import Coupon from "../models/CouponModel.js";

// Place a new order
export const placeOrder = async (req, res) => {
  const { items, totalPrice, paymentMethod, couponCode } = req.body;

  try {
    let discount = 0;

    // Validate the coupon code if provided
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode, isActive: true });
      if (!coupon || new Date(coupon.expiryDate) < Date.now()) {
        return res.status(400).json({ message: "Invalid or expired coupon code" });
      }
      discount = (totalPrice * coupon.discount) / 100;
    }

    const finalPrice = Math.max(0, totalPrice - discount);

    const order = new Order({
      user: req.user._id, // Ensure user authentication middleware is in place
      items,
      totalPrice,
      discount,
      finalPrice,
      paymentMethod,
      couponCode,
      status: "Pending",
    });

    await order.save();

    res.status(201).json({ success: true, message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get specific order details
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.foodItem");
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.foodItem")
      .sort({ createdAt: -1 }); // Sort orders by most recent

    if (!orders) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

// Cancel an order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status === "Canceled") {
      return res.status(400).json({ message: "Order is already canceled" });
    }

    order.status = "Canceled";
    await order.save();

    res.status(200).json({ message: "Order canceled successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
