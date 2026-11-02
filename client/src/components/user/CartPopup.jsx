import React, { useEffect, useState } from "react";

/**
 * CartPopup — shows a slide-in notification when item is added to cart
 *
 * USAGE in FoodItemsPage.jsx:
 *
 * 1. Import this component:
 *    import CartPopup from "../../components/user/CartPopup";
 *
 * 2. Add state:
 *    const [popupItem, setPopupItem] = useState(null);
 *
 * 3. In handleAddToCart, after success:
 *    setPopupItem({ name: foodItem.name, image: foodItem.image, price: foodItem.price });
 *
 * 4. Add component to JSX (anywhere inside return):
 *    <CartPopup item={popupItem} onClose={() => setPopupItem(null)} />
 */

const CartPopup = ({ item, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!item) return;
    // Trigger slide-in
    setTimeout(() => setVisible(true), 10);
    // Auto close after 3 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 400); // wait for slide-out animation
    }, 3000);
    return () => clearTimeout(timer);
  }, [item]);

  if (!item) return null;

  const rupeePrice = item.price ? `₹${(item.price * 83).toFixed(0)}` : "";

  return (
    <div
      className={`fixed top-20 right-4 z-[999] transition-all duration-400 ease-in-out ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      }`}
      style={{ transitionDuration: "380ms" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 flex items-center gap-3 min-w-[280px] max-w-[340px]">
        {/* Green check circle */}
        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-green-200">
          <svg
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Food image */}
        {item.image && (
          <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-green-600 mb-0.5">
            Added to cart!
          </p>
          <p className="text-sm font-bold text-gray-900 truncate">
            {item.name}
          </p>
          {rupeePrice && (
            <p className="text-xs text-gray-500 mt-0.5">{rupeePrice}</p>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 400);
          }}
          className="p-1 text-gray-300 hover:text-gray-500 flex-shrink-0 transition-colors"
        >
          <svg
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      {visible && (
        <div className="mt-1 h-1 bg-gray-100 rounded-full overflow-hidden mx-1">
          <div
            className="h-full bg-green-500 rounded-full"
            style={{
              animation: "shrink 3s linear forwards",
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default CartPopup;
