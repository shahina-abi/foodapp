import Cart from '../models/cartModel.js';
import FoodItem from '../models/foodModel.js';

// Add an item to the cart or update quantity if it exists
// export const addToCart = async (req, res) => {
//   try {
//     const { foodItemId, quantity } = req.body;

//     // Ensure the `userId` is attached from the `authUser` middleware
//     const userId = req.user?.id;
//     if (!userId) {
//       return res.status(400).json({ success: false, message: "User ID is required" });
//     }

//     const foodItem = await FoodItem.findById(foodItemId);
//     if (!foodItem) {
//       return res.status(404).json({ success: false, message: "Food item not found" });
//     }

//     let cart = await Cart.findOne({ userId });

//     if (cart) {
//       const existingItem = cart.items.find(item => item.foodItem.toString() === foodItemId);
//       if (existingItem) {
//         existingItem.quantity += quantity;
//       } else {
//         cart.items.push({ foodItem: foodItemId, quantity });
//       }
//     } else {
//       cart = new Cart({ userId, items: [{ foodItem: foodItemId, quantity }] });
//     }

//     await cart.calculateTotalPrice();
//     await cart.save();

//     res.status(201).json({ success: true, message: "Item added to cart", cart });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

export const addToCart = async (req, res) => {
  try {
    const { foodItemId, quantity = 1 } = req.body;

    // Ensure the `userId` is attached from the `authUser` middleware
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    if (!foodItemId) {
      return res.status(400).json({ success: false, message: "Food item ID is required" });
    }

    const foodItem = await FoodItem.findById(foodItemId);
    if (!foodItem) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (cart) {
      const existingItem = cart.items.find(item => item.foodItem.toString() === foodItemId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ foodItem: foodItemId, quantity });
      }
    } else {
      cart = new Cart({ userId, items: [{ foodItem: foodItemId, quantity }] });
    }

    await cart.calculateTotalPrice();
    await cart.save();

    res.status(201).json({ success: true, message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all items in the cart for the user
// export const getCart = async (req, res) => {
//   try {
//     // Ensure user ID is present
//     const userId = req.user?.id;
//     if (!userId) {
//       return res.status(401).json({ success: false, message: "User not authenticated" });
//     }

//     // Fetch the cart for the user
//     const cart = await Cart.findOne({ user: userId }).populate(
//       "items.foodItem",
//       "name price image description"
//     );

//     if (!cart || cart.items.length === 0) {
//       return res.status(404).json({ success: false, message: "No items in the cart" });
//     }

//     // Return the cart data
//     res.status(200).json({ success: true, cart });
//   } catch (error) {
//     console.error("Error fetching cart:", error.message);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

 export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.foodItem",
      "name price image description"
    );
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart is empty" });
    }
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



// Update the quantity of a specific item in the cart
export const updateCartItem = async (req, res) => {
  try {
    const { foodItemId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.foodItem.toString() === foodItemId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }

    item.quantity = quantity;
    await cart.calculateTotalPrice();
    res.json({ success: true, message: 'Cart item updated', cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove an item from the cart
export const removeCartItem = async (req, res) => {
  try {
    const { foodItemId } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.foodItem.toString() !== foodItemId);
    await cart.calculateTotalPrice();

    res.json({ success: true, message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Clear all items from the cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = [];
    cart.totalPrice = 0; // Reset totalPrice to zero
    await cart.save();

    res.json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
