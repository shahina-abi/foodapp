// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/UserSlice";
import foodReducer from "./features/FoodSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    food: foodReducer, // Add food slice
  },
});

export default store;
