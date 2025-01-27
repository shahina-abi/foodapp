import Cart from '../models/cartModel.js';
import FoodItem from '../models/foodModel.js';

export const addToCart = async (req, res) => {
  try {
    const { foodItemId, quantity = 1 } = req.body;
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

    // Find or create a cart for the user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the item already exists in the cart
    const existingItem = cart.items.find((item) => item.foodItem.toString() === foodItemId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ foodItem: foodItemId, quantity });
    }

    // Recalculate total price and save the cart
    await cart.calculateTotalPrice();
    await cart.save();

    res.status(201).json({ success: true, message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error in addToCart:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate(
      "items.foodItem",
      "name price image description"
    );

    // If no cart exists, create an empty cart for the user
    // if (!cart) {
    //   cart = new Cart({ user: req.user._id, items: [], totalPrice: 0 });
    //   await cart.save();
    // }
 if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
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
      // Create a new empty cart for the user if none exists
      const newCart = new Cart({ user: req.user._id, items: [], totalPrice: 0 });
      await newCart.save();
      return res.status(200).json({ success: true, message: "Cart cleared successfully", cart: newCart });
    }

    // Clear existing cart
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(200).json({ success: true, message: "Cart cleared successfully", cart });
  } catch (error) {
    console.error("Error clearing cart:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


