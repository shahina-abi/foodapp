
//   import Stripe from "stripe";
// import dotenv from 'dotenv';
// dotenv.config();
// // Config stripe
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//    const testStripe = async () => {
//   try {
//     const balance = await stripe.balance.retrieve();
//     console.log("Stripe Balance:", balance);
//   } catch (error) {
//     console.error("Stripe Error:", error.message);
//   }
// };

// testStripe();

//  console.log(process.env.STRIPE_SECRET_KEY);export const creatCheckout = async (req, res) => {
//   try {
//     const { cartItems } = req.body;

//     const lineItems = cartItems.map((item) => ({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: item.foodItem.name,
//           images: [item.foodItem.image],
//         },
//         unit_amount: Math.round(item.foodItem.price * 100),
//       },
//       quantity: item.quantity,
//     }));

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: "http://localhost:5173/user/payment/success",
//       cancel_url: "http://localhost:5173/user/payment/cancel",
//     });

//     res.status(200).json({ success: true, sessionId: session.id });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

   
// //   
// // 

//    export const sectionStatus   =   async (req, res) => {
//     try {
//         const sessionId = req.query.session_id;
//         const session = await stripe.checkout.sessions.retrieve(sessionId);

//         res.send({
//             status: session?.status,
//             customer_email: session?.customer_details?.email,
//             session_data: session,
//         });
//     } catch (error) {
//         res.status(error?.statusCode || 500).json(error.message || "internal server error");
//     }
// };

// export const creatCheckout = async (req, res) => {
//   try {
//     const { cartItems } = req.body;

//     if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
//       return res.status(400).json({ success: false, message: "Invalid cart items provided" });
//     }

//     console.log("Creating checkout session with cartItems:", cartItems);

//     const lineItems = cartItems.map((item) => {
//       if (!item.foodItem || !item.foodItem.name || !item.foodItem.price) {
//         throw new Error(`Invalid cart item: ${JSON.stringify(item)}`);
//       }
//       return {
//         price_data: {
//           currency: "inr",
//           product_data: {
//             name: item.foodItem.name,
//             images: [item.foodItem.image],
//           },
//           unit_amount: Math.round(item.foodItem.price * 100),
//         },
//         quantity: item.quantity,
//       };
//     });

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: "http://localhost:5173/user/payment/success",
//       cancel_url: "http://localhost:5173/user/payment/cancel",
//     });

//     console.log("Stripe session created successfully:", session.id);

//     res.status(200).json({ success: true, sessionId: session.id });
//   } catch (error) {
//     console.error("Error creating Stripe checkout session:", error.message);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };
// import stripe from "../config/stripeconfig.js";
// import  Order from "../models/orderModel.js"
// export const creatCheckout = async (req, res) => {
//   try {
//     const { cartItems } = req.body;

//     if (!cartItems || cartItems.length === 0) {
//       return res.status(400).json({ success: false, message: "Cart items are required" });
//     }

//     const lineItems = cartItems.map((item) => {
//       if (!item.foodItem || !item.foodItem.name || !item.foodItem.price) {
//         throw new Error(`Invalid cart item data: ${JSON.stringify(item)}`);
//       }
//       return {
//         price_data: {
//           currency: "inr",
//           product_data: {
//             name: item.foodItem.name,
//             images: [item.foodItem.image],
//           },
//           unit_amount: Math.round(item.foodItem.price * 100),
//         },
//         quantity: item.quantity,
//       };
//     });

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: "http://localhost:5173/user/payment/success",
//       cancel_url: "http://localhost:5173/user/payment/cancel",
//     });

//     res.status(200).json({ success: true, sessionId: session.id });
//   } catch (error) {
//     console.error("Error in createCheckout:", error.message);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };


// export const creatCheckout = async (req, res,next) => {
//   try {
//     const { cartItems } = req.body;

//     // Validate cartItems
//     if (!cartItems || cartItems.length === 0) {
//       return res.status(400).json({ success: false, message: "Cart items are required" });
//     }

//     // Calculate total amount
//     const totalAmountInINR = cartItems.reduce(
//       (total, item) => total + item.foodItem.price * item.quantity,
//       0
//     );

//     // Ensure the total is >= 50 cents (approx ₹41 in INR)
//     const MIN_AMOUNT_IN_INR = 41; // Adjust for currency fluctuations
//     if (totalAmountInINR < MIN_AMOUNT_IN_INR) {
//       return res.status(400).json({
//         success: false,
//         message: `Minimum cart total must be ₹${MIN_AMOUNT_IN_INR}. Current total: ₹${totalAmountInINR}`,
//       });
//     }

//     const lineItems = cartItems.map((item) => ({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: item.foodItem.name,
//           images: [item.foodItem.image],
//         },
//         unit_amount: Math.round(item.foodItem.price * 100),
//       },
//       quantity: item.quantity,
//     }));

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: "http://localhost:5173/user/payment/success",
//       cancel_url: "http://localhost:5173/user/payment/cancel",
//     });
// const Order = new Order({
//       user: req.user._id, // Ensure user authentication middleware is in place
//       items:items.map((items)) => ({itemId:items._id,quantity:items.quantity,})),
//       totalPrice,
//       discount,
//       finalPrice,
//       sessionId : session._id,
//       paymentMethod,
//       couponCode,
//       status: "Pending",
//     });

//     await Order.save();
//     res.status(200).json({ success: true, sessionId: session.id });
//   } catch (error) {
//     console.error("Error in createCheckout:", error.message);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// export const sectionStatus = async (req, res) => {
//   try {
//     const sessionId = req.query.session_id;

//     if (!sessionId) {
//       return res.status(400).json({ success: false, message: "Session ID is required" });
//     }

//     console.log("Retrieving session status for:", sessionId);

//     const session = await stripe.checkout.sessions.retrieve(sessionId);

//     res.status(200).json({
//       status: session?.status,
//       customer_email: session?.customer_details?.email,
//       session_data: session,
//     });
//   } catch (error) {
//     console.error("Error retrieving session status:", error.message);
//     res.status(500).json({ success: false, message: error.message || "Internal server error" });
//   }
// };
// export const createCheckout = async (req, res, next) => {
//   try {
//     const { cartItems } = req.body;

//     // Validate cartItems
//     if (!cartItems || cartItems.length === 0) {
//       return res.status(400).json({ success: false, message: "Cart items are required" });
//     }

//     // Calculate total amount
//     const totalAmountInINR = cartItems.reduce(
//       (total, item) => total + item.foodItem.price * item.quantity,
//       0
//     );

//     // Ensure the total is >= 50 cents (approx ₹41 in INR)
//     const MIN_AMOUNT_IN_INR = 41;
//     if (totalAmountInINR < MIN_AMOUNT_IN_INR) {
//       return res.status(400).json({
//         success: false,
//         message: `Minimum cart total must be ₹${MIN_AMOUNT_IN_INR}. Current total: ₹${totalAmountInINR}`,
//       });
//     }

//     // Prepare line items for Stripe
//     const lineItems = cartItems.map((item) => ({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: item.foodItem.name,
//           images: [item.foodItem.image],
//         },
//         unit_amount: Math.round(item.foodItem.price * 100),
//       },
//       quantity: item.quantity,
//     }));

//     // Create Stripe session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: "http://localhost:5173/user/payment/success",
//       cancel_url: "http://localhost:5173/user/payment/cancel",
//     });

//     // Calculate other order details
//     const discount = 0; // Logic for discount if any
//     const finalPrice = totalAmountInINR - discount;

//     // Save order in database
//     const order = new Order({
//       user: req.user._id,
//       items: cartItems.map((item) => ({
//         itemId: item.foodItem._id,
//         quantity: item.quantity,
//       })),
//       totalPrice: totalAmountInINR,
//       discount,
//       finalPrice,
//       sessionId: session.id,
//       paymentMethod: "card", // Placeholder for payment method
//       couponCode: null, // Placeholder for coupon code
//       status: "Pending",
//     });

//     await order.save();

//     res.status(200).json({ success: true, sessionId: session.id });
//   } catch (error) {
//     console.error("Error in createCheckout:", error.message);
//     next(error); // Propagate to error middleware
//   }
// };

// export const sectionStatus = async (req, res, next) => {
//   try {
//     const sessionId = req.query.session_id;

//     if (!sessionId) {
//       return res.status(400).json({ success: false, message: "Session ID is required" });
//     }

//     console.log("Retrieving session status for:", sessionId);

//     const session = await stripe.checkout.sessions.retrieve(sessionId);

//     res.status(200).json({
//       status: session?.status,
//       customer_email: session?.customer_details?.email,
//       session_data: session,
//     });
//   } catch (error) {
//     console.error("Error retrieving session status:", error.message);
//     next(error); // Propagate to error middleware
//   }
// };
// import Stripe from "stripe";
import stripe from "../config/stripeconfig.js";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

// const stripe = new Stripe(process.env.Stripe_Private_Api_Key);
const client_domain = process.env.CLIENT_DOMAIN;

/**
 * Create a new checkout session
 */
// export const createCheckout = async (req, res) => {
//   try {
//     const { cartItems, discount = 0 } = req.body;

//     if (!cartItems || cartItems.length === 0) {
//       return res.status(400).json({ success: false, message: "Cart items are required" });
//     }

//     // Calculate total amount in INR
//     const totalAmountInINR = cartItems.reduce(
//       (total, item) => total + item.foodItem.price * item.quantity,
//       0
//     );
//     const finalAmountInINR = totalAmountInINR - discount;

//     if (finalAmountInINR < 41) {
//       return res.status(400).json({
//         success: false,
//         message: `Minimum cart total must be ₹41 after discount. Current total: ₹${finalAmountInINR}`,
//       });
//     }

//     // Create Stripe line items
//     const lineItems = cartItems.map((item) => ({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: item.foodItem.name,
//           images: [item.foodItem.image],
//         },
//         unit_amount: Math.round(item.foodItem.price * 100),
//       },
//       quantity: item.quantity,
//     }));

//     // Add discount as a negative line item in Stripe
//     if (discount > 0) {
//       lineItems.push({
//         price_data: {
//           currency: "inr",
//           product_data: { name: "Discount" },
//           unit_amount: Math.round(-discount * 100), // Negative value for discount
//         },
//         quantity: 1,
//       });
//     }

//     // Create Stripe session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: `${process.env.CLIENT_DOMAIN}/user/payment/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.CLIENT_DOMAIN}/user/payment/cancel`,
//     });

//     // Save the order with sessionId for tracking
//     const order = new Order({
//       user: req.user.id,
//       items: cartItems.map((item) => ({
//         foodItem: item.foodItem._id,
//         quantity: item.quantity,
//       })),
//       totalPrice: totalAmountInINR,
//       discount,
//       finalPrice: finalAmountInINR,
//       sessionId: session.id,
//       status: "Pending",
//     });

//     await order.save();

//     res.status(200).json({ success: true, sessionId: session.id });
//   } catch (error) {
//     console.error("Error creating checkout session:", error.message);
//     res.status(500).json({ success: false, message: error.message || "Internal server error" });
//   }
// };

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
