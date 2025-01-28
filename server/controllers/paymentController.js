
import stripe from "../config/stripeconfig.js";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

// const stripe = new Stripe(process.env.Stripe_Private_Api_Key);
const client_domain = process.env.CLIENT_DOMAIN;
//create checkout

export const createCheckout = async (req, res) => {
  try {
    const { cartItems, discount = 0 } = req.body;

    // Validate cart items
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Cart items are required." });
    }

    // Calculate total amount in INR
    const totalAmountInINR = cartItems.reduce(
      (total, item) => total + item.foodItem.price * item.quantity,
      0
    );

    const finalAmountInINR = Math.max(totalAmountInINR - discount, 0);

    if (finalAmountInINR < 41) {
      return res.status(400).json({
        success: false,
        message: `Minimum cart total must be ₹41 after discount. Current total: ₹${finalAmountInINR}`,
      });
    }

    // Prepare Stripe line items
    const lineItems = cartItems.map((item) => {
      if (!item.foodItem.name || !item.foodItem.price) {
        throw new Error(`Invalid cart item: ${JSON.stringify(item)}`);
      }

      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.foodItem.name,
            images: item.foodItem.image ? [item.foodItem.image] : [], // Optional images
          },
          unit_amount: Math.round(item.foodItem.price * 100), // Convert to paise
        },
        quantity: item.quantity,
      };
    });

    // Add discount as a separate line item if applicable
    if (discount > 0) {
      lineItems.push({
        price_data: {
          currency: "inr",
          product_data: { name: "Discount" },
          unit_amount: Math.round(discount * 100), // Discount as positive
        },
        quantity: 1,
      });
    }

    // Debugging: Log line items before sending to Stripe
    console.log("Final Line Items:", JSON.stringify(lineItems));

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_DOMAIN}/user/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_DOMAIN}/user/payment/cancel`,
    });

    console.log("Stripe Session Created:", session.id);

    // Save order details
    const order = new Order({
      user: req.user.id,
      items: cartItems.map((item) => ({
        foodItem: item.foodItem._id,
        quantity: item.quantity,
      })),
      totalPrice: totalAmountInINR,
      discount,
      finalPrice: finalAmountInINR,
      sessionId: session.id,
      status: "Pending",
    });

    await order.save();

    res.status(200).json({ success: true, sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);

    res.status(400).json({
      success: false,
      message: error.message || "Invalid data passed to Stripe. Check line items and amounts.",
    });
  }
};

export const sectionStatus = async (req, res, next) => {
  try {
    const sessionId = req.query.session_id;

    if (!sessionId) {
      return res.status(400).json({ success: false, message: "Session ID is required" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Update order status to "Completed"
    const order = await Order.findOneAndUpdate(
      { sessionId },
      { status: "Completed" },
      { new: true }
    ).populate("items.foodItem"); // Populate foodItem details for frontend

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

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
