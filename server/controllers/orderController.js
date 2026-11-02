
// import Order from "../models/orderModel.js";
// import Coupon from "../models/CouponModel.js";

// // Place a new order
// export const placeOrder = async (req, res) => {
//   const { items, totalPrice, paymentMethod, couponCode } = req.body;

//   try {
//     let discount = 0;

//     // Validate the coupon code if provided
//     if (couponCode) {
//       const coupon = await Coupon.findOne({ code: couponCode, isActive: true });
//       if (!coupon || new Date(coupon.expiryDate) < Date.now()) {
//         return res.status(400).json({ message: "Invalid or expired coupon code" });
//       }
//       discount = (totalPrice * coupon.discount) / 100;
//     }

//     const finalPrice = Math.max(0, totalPrice - discount);

//     const order = new Order({
//       user: req.user._id, // Ensure user authentication middleware is in place
//       items,
//       totalPrice,
//       discount,
//       finalPrice,
//       paymentMethod,
//       couponCode,
//       status: "Pending",
//     });

//     await order.save();

//     res.status(201).json({ success: true, message: "Order placed successfully", order });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get specific order details
// export const getOrder = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate("items.foodItem");
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     res.status(200).json({ success: true, order });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getUserOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user.id })
//       .populate("items.foodItem")
//       .sort({ createdAt: -1 }); // Sort orders by most recent

//     if (!orders) {
//       return res.status(404).json({ success: false, message: "No orders found" });
//     }

//     res.status(200).json({ success: true, orders });
//   } catch (error) {
//     console.error("Error fetching user orders:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch orders" });
//   }
// };

// // Cancel an order
// export const cancelOrder = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     if (order.status === "Canceled") {
//       return res.status(400).json({ message: "Order is already canceled" });
//     }

//     order.status = "Canceled";
//     await order.save();

//     res.status(200).json({ message: "Order canceled successfully", order });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
import Order from "../models/orderModel.js";
import Coupon from "../models/CouponModel.js";
import sendEmail from "../utils/emailService.js"; // Import email service
import FoodItem from "../models/foodModel.js";

export const placeOrder = async (req, res) => {
  const { items, totalPrice, paymentMethod, couponCode, restaurant } = req.body;

  try {
    let discount = 0;

    // Validate coupon code if provided
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode, isActive: true });
      if (!coupon || new Date(coupon.expiryDate) < Date.now()) {
        return res.status(400).json({ message: "Invalid or expired coupon code" });
      }
      discount = (totalPrice * coupon.discount) / 100;
    }

    const finalPrice = Math.max(0, totalPrice - discount);

    // Create new order
    const order = new Order({
      user: req.user._id,
      items,
      totalPrice,
      discount,
      finalPrice,
      paymentMethod,
      couponCode,
      restaurant, // Include the restaurant field
      status: "Pending", // Default status
    });

    await order.save();

    // Send order confirmation email
    const emailSubject = `Order Confirmation - #${order._id}`;
    const emailBody = `
      <h2>Thank you for your order!</h2>
      <p>Your order ID: <strong>${order._id}</strong></p>
      <p>Status: <strong>${order.status}</strong></p>
      <h3>Order Summary:</h3>
      <ul>
        ${items.map((item) => `<li>${item.foodItem.name} x ${item.quantity} - ₹${item.foodItem.price * item.quantity}</li>`).join("")}
      </ul>
      <p><strong>Total Price:</strong> ₹${totalPrice}</p>
      <p><strong>Discount:</strong> -₹${discount}</p>
      <p><strong>Final Price:</strong> ₹${finalPrice}</p>
      <p>We will notify you once your order is ready.</p>
    `;
    await sendEmail(req.user.email, emailSubject, emailBody);

    res.status(201).json({ success: true, message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Get specific order details
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.foodItem");
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all orders for a specific user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.foodItem")
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

// ✅ Cancel an order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status === "Canceled") {
      return res.status(400).json({ message: "Order is already canceled" });
    }

    // ❌ Update order status to canceled
    order.status = "Canceled";
    await order.save();

    // 📧 Send cancellation email
    const emailSubject = `Order Canceled - #${order._id}`;
    const emailBody = `
      <h2>Your order has been canceled.</h2>
      <p>Order ID: <strong>${order._id}</strong></p>
      <p>Status: <strong>${order.status}</strong></p>
      <p>If this was a mistake, please contact support.</p>
    `;
    await sendEmail(req.user.email, emailSubject, emailBody);

    res.status(200).json({ success: true, message: "Order canceled successfully", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getOrdersByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // Validate restaurantId
    if (!mongoose.isValidObjectId(restaurantId)) {
      return res.status(400).json({ success: false, message: "Invalid restaurant ID." });
    }

    // Find all orders that contain food items from the specified restaurant
    const orders = await Order.aggregate([
      {
        $unwind: "$items", // Unwind the items array
      },
      {
        $lookup: {
          from: "fooditems", // Collection name for FoodItem model
          localField: "items.foodItem",
          foreignField: "_id",
          as: "foodItemDetails",
        },
      },
      {
        $unwind: "$foodItemDetails", // Unwind the foodItemDetails array
      },
      {
        $match: {
          "foodItemDetails.restaurant": new mongoose.Types.ObjectId(restaurantId), // Filter by restaurant
        },
      },
      {
        $group: {
          _id: "$_id", // Group by order ID
          items: { $push: "$items" }, // Rebuild the items array
          totalPrice: { $first: "$totalPrice" },
          discount: { $first: "$discount" },
          finalPrice: { $first: "$finalPrice" },
          status: { $first: "$status" },
          createdAt: { $first: "$createdAt" },
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort by creation date (newest first)
      },
    ]);

    if (!orders.length) {
      return res.status(404).json({ success: false, message: "No orders found for this restaurant." });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders by restaurant:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders." });
  }
};
