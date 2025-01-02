// Frontend: CartPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get("/api/cart", {
          withCredentials: true,
        });
        setCartItems(data.cart.items);
        setTotalPrice(data.cart.totalPrice);
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    };
    fetchCart();
  }, []);

  // Update cart item quantity
  const updateQuantity = async (id, quantity) => {
    try {
      const { data } = await axios.put("/api/cart/update", {
        foodItemId: id,
        quantity,
      });
      setCartItems(data.cart.items);
      setTotalPrice(data.cart.totalPrice);
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  // Remove item
  const removeItem = async (id) => {
    try {
      const { data } = await axios.delete("/api/cart/remove", {
        data: { foodItemId: id },
      });
      setCartItems(data.cart.items);
      setTotalPrice(data.cart.totalPrice);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      await axios.delete("/api/cart/clear");
      setCartItems([]);
      setTotalPrice(0);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Cart
      </h1>
      <div className="max-w-3xl mx-auto">
        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.foodItem._id}
                className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg"
              >
                <img
                  src={item.foodItem.image || "https://via.placeholder.com/100"}
                  alt={item.foodItem.name}
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="flex-1 px-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    {item.foodItem.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {item.foodItem.description || "Fresh food item"}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    ${item.foodItem.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    onClick={() =>
                      updateQuantity(item.foodItem._id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span className="px-4 text-gray-800">{item.quantity}</span>
                  <button
                    className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                    onClick={() =>
                      updateQuantity(item.foodItem._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className="ml-4 text-red-600 hover:text-red-800"
                  onClick={() => removeItem(item.foodItem._id)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="mt-6">
            <p className="text-xl font-bold text-gray-900">
              Total: ${totalPrice.toFixed(2)}
            </p>
            <div className="mt-4 flex justify-between">
              <button
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
