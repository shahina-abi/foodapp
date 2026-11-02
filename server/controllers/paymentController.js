

import stripe from "../config/stripeconfig.js";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

const localClientDomains = new Set([
  "http://localhost:5173",
  "http://localhost:5174",
]);

// ✅ Updated: Create Stripe Checkout Session
export const createCheckout = async (req, res) => {
  try {
    const { cartItems, discount = 0 } = req.body;
    const requestOrigin = req.get("origin");
    const clientDomain = process.env.CLIENT_DOMAIN ||
      (process.env.VERCEL
        ? null
        : localClientDomains.has(requestOrigin)
          ? requestOrigin
          : "http://localhost:5173");

    if (!clientDomain) {
      return res.status(500).json({
        success: false,
        message: "CLIENT_DOMAIN must be configured for checkout redirects.",
      });
    }

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Cart items are required." });
    }

    // ✅ Calculate total price before discount
    // REPLACE WITH:
const USD_TO_INR = 83;
const totalAmountInINR = cartItems.reduce(
  (total, item) => total + (item.foodItem.price * USD_TO_INR) * item.quantity,
  0
);

    // ✅ Apply discount correctly
    const finalAmountInINR = Math.max((totalAmountInINR - discount).toFixed(2), 0);
    const totalAmountInPaise = Math.round(finalAmountInINR * 100); // Convert to paise

    if (finalAmountInINR < 1) {
      return res.status(400).json({
        success: false,
        message: `Minimum cart total must be ₹41 after discount. Current total: ₹${finalAmountInINR}`,
      });
    }

    // ✅ Adjust item prices to include the discount proportionally
    const discountFactor = finalAmountInINR / totalAmountInINR; // Calculate proportional discount factor

    const lineItems = cartItems.map((item) => {
      const productData = { name: item.foodItem.name };
      if (/^https?:\/\//i.test(item.foodItem.image || "")) {
        productData.images = [item.foodItem.image];
      }

      return {
        price_data: {
          currency: "inr",
          product_data: productData,
          unit_amount: Math.round(item.foodItem.price * 83 * discountFactor * 100),
        },
        quantity: item.quantity,
      };
    });

    // ✅ Create Stripe checkout session with the correct final amount
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${clientDomain}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientDomain}/payment/cancel`,
    });

    console.log("Stripe Session Created:", session.id);

    // ✅ Save order details in database
    const order = new Order({
      user: req.user.id,
      items: cartItems.map((item) => ({
        foodItem: item.foodItem._id,
        quantity: item.quantity,
      })),
      totalPrice: totalAmountInINR.toFixed(2),
      discount: discount.toFixed(2),
      finalPrice: finalAmountInINR,
      sessionId: session.id,
      
      status: "Pending",
    });

    await order.save();

    res.status(200).json({ success: true, sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Invalid data passed to Stripe.",
    });
  }
};
// ✅ Check Stripe session status & update order

export const sectionStatus = async (req, res, next) => {
  try {
    const sessionId = req.query.session_id;

    if (!sessionId) {
      return res.status(400).json({ success: false, message: "Session ID is required" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const order = await Order.findOne({ sessionId });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (session.payment_status !== "paid") {
      return res.status(409).json({
        success: false,
        message: "Payment has not been completed.",
      });
    }

    order.status = "Completed";
    await order.save();

    const cart = await Cart.findOne({ userId: order.user });
    if (cart) {
      cart.items = [];
      cart.totalPrice = 0;
      await cart.save();
    }

    await order.populate("items.foodItem");

    res.status(200).json({
      success: true,
      message: "Payment successful",
      order, // Send the full order details
    });
  } catch (error) {
    console.error("Error retrieving session status:", error.message);
    res.status(500).json({ success: false, message: "Failed to retrieve session status" });
  }
};