import Coupon from "../models/CouponModel.js";
import Cart from "../models/cartModel.js";

// Create a new coupon
export const createCoupon = async (req, res) => {
  const { code, discount, expiryDate } = req.body;

  try {
    const newCoupon = new Coupon({ code, discount, expiryDate });
    await newCoupon.save();
    res.status(201).json({ message: "Coupon created successfully!" });
  } catch (err) {
    res.status(400).json({ error: `Error creating coupon: ${err.message}` });
  }
};

// Validate a coupon
export const validateCoupon = async (req, res) => {
  const { code, totalPrice } = req.body;

  try {
    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res.status(404).json({ error: "Invalid coupon code" });
    }

    if (totalPrice < 10) {
      return res
        .status(400)
        .json({ error: "Coupon cannot be applied to orders less than $10" });
    }

    if (new Date(coupon.expiryDate) < Date.now() || !coupon.isActive) {
      return res.status(400).json({ error: "Coupon expired or inactive" });
    }

    res.status(200).json({ message: "Coupon is valid", discount: coupon.discount });
  } catch (err) {
    res.status(500).json({ error: `Server error: ${err.message}` });
  }
};

// Apply coupon at checkout
// export const applyCoupon = async (req, res) => {
//   const { couponCode, cartId } = req.body;

//   try {
//     const coupon = await Coupon.findOne({ code: couponCode, isActive: true });

//     if (!coupon) {
//       return res.status(400).json({ message: "Invalid or inactive coupon code" });
//     }

//     const cart = await Cart.findById(cartId);

//     if (!cart) {
//       return res.status(400).json({ message: "Cart not found" });
//     }

//     await cart.calculateTotalPrice();

//     const discount = (cart.totalPrice * coupon.discount) / 100;
//     const finalAmount = Math.max(0, cart.totalPrice - discount);

//     res.status(200).json({
//       message: "Coupon applied successfully",
//       finalAmount,
//       discountAmount: discount,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error applying coupon",
//       error: error.message || "An unknown error occurred",
//     });
//   }
// };
export const applyCoupon = async (req, res) => {
    const { couponCode, cartId } = req.body;

    try {
        const coupon = await Coupon.findOne({ code: couponCode, isActive: true });

        if (!coupon) {
            return res.status(400).json({ message: "Invalid or inactive coupon code" });
        }

        const cart = await Cart.findById(cartId);

        if (!cart) {
            return res.status(400).json({ message: "Cart not found" });
        }

        await cart.calculateTotalPrice();

        if (cart.totalPrice < 10) {
            return res
                .status(400)
                .json({ message: "Coupon cannot be applied to orders less than $10." });
        }

        const discount = (cart.totalPrice * coupon.discount) / 100;
        const finalAmount = Math.max(0, cart.totalPrice - discount);

        res.status(200).json({
            message: "Coupon applied successfully",
            finalAmount,
            discountAmount: discount,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error applying coupon",
            error: error.message || "An unknown error occurred",
        });
    }
};
