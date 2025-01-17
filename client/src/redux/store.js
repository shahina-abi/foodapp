// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/UserSlice";
import foodReducer from "./features/FoodSlice";
import adminReducer from "./features/AdminSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    food: foodReducer,
    admin: adminReducer 
  },
});

export default store;
