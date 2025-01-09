const CartCard = ({ foodItem, quantity, onRemove, onUpdateQuantity }) => {
  return (
    <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition duration-300">
      {/* Food Image */}
      <img
        src={foodItem.image}
        alt={foodItem.name}
        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
      />

      {/* Food Details */}
      <div className="flex-1 ml-4">
        <h3 className="text-lg font-semibold text-gray-800">{foodItem.name}</h3>
        <p className="text-sm text-gray-500 truncate">{foodItem.description}</p>
        <p className="text-base text-gray-800 font-semibold mt-1">
          ${foodItem.price}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onUpdateQuantity(foodItem._id, quantity - 1)}
          className="w-8 h-8 bg-gray-100 border border-gray-300 rounded-full text-gray-700 font-bold hover:bg-gray-200"
        >
          -
        </button>
        <span className="text-gray-800 font-semibold">{quantity}</span>
        <button
          onClick={() => onUpdateQuantity(foodItem._id, quantity + 1)}
          className="w-8 h-8 bg-gray-100 border border-gray-300 rounded-full text-gray-700 font-bold hover:bg-gray-200"
        >
          +
        </button>
      </div>

      {/* Remove Button */}
      <button
        className="text-red-500 text-sm font-semibold hover:underline ml-4"
        onClick={() => onRemove(foodItem._id)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartCard;
