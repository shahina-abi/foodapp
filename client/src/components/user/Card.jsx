import React, { useState } from "react";
import { Link } from "react-router-dom";

export const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const styles = {
    cart: {
      border: "1px solid #ccc",
      borderRadius: "5px",
      padding: "10px",
      margin: "10px 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    textCenter: {
      textAlign: "center",
    },
    itemName: {
      fontSize: "20px",
      fontWeight: "bold",
    },
    itemPrice: {
      fontSize: "18px",
      color: "#333",
    },
    itemQuantity: {
      fontSize: "16px",
    },
    removeButton: {
      padding: "5px 10px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "3px",
      cursor: "pointer",
    },
    incrementButton: {
      padding: "5px 10px",
      backgroundColor: "#ff9800",
      color: "white",
      border: "none",
      borderRadius: "3px",
      cursor: "pointer",
    },
    decrementButton: {
      padding: "5px 10px",
      backgroundColor: "#ff9800",
      color: "white",
      border: "none",
      borderRadius: "3px",
      cursor: "pointer",
    },
  };

  const handleRemove = async () => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this item from your cart?"
    );
    if (confirmRemove) {
      await onRemove(item.foodItemId);
    }
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(item.foodItemId, newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = quantity - 1;
    if (newQuantity === 0) {
      setQuantity(1);
      return;
    }
    setQuantity(newQuantity);
    onQuantityChange(item.foodItemId, newQuantity);
  };

  return (
    <div style={styles.cart}>
      <div style={styles.textCenter}>
        <h2 style={styles.itemName}>{item.name}</h2>
        <h3 style={styles.itemPrice}>${(item.price * quantity).toFixed(2)}</h3>
        <p style={styles.itemQuantity}>Quantity:</p>
        <div style={styles.buttonGroup}>
          <button onClick={handleDecrement} style={styles.decrementButton}>
            -
          </button>
          <span>{quantity}</span>
          <button onClick={handleIncrement} style={styles.incrementButton}>
            +
          </button>
        </div>
        <button onClick={handleRemove} style={styles.removeButton}>
          Remove
        </button>
      </div>
    </div>
  );
};
